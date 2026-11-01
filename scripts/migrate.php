<?php
declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

require_once __DIR__ . '/../app/config.php';

$pdo = null;
$locked = false;
$lockName = '';

try {
    $pdo = db();
    $database = (string) $pdo->query('SELECT DATABASE()')->fetchColumn();
    $lockName = 'todo_migrate_' . substr(hash('sha256', $database), 0, 40);
    $lock = $pdo->prepare('SELECT GET_LOCK(?, 30)');
    $lock->execute([$lockName]);
    if ((int) $lock->fetchColumn() !== 1) {
        throw new RuntimeException('Another migration process is running. Retry after it finishes.');
    }
    $locked = true;

    $tables = $pdo->query('SHOW TABLES')->fetchAll(PDO::FETCH_COLUMN);
    $applied = [];
    if (in_array('schema_migrations', $tables, true)) {
        $rows = $pdo->query('SELECT version, checksum FROM schema_migrations')->fetchAll(PDO::FETCH_ASSOC);
        foreach ($rows as $row) {
            $applied[$row['version']] = $row['checksum'];
        }
    }

    if (!isset($applied['001_initial.sql']) && (in_array('todo', $tables, true) || in_array('tasks', $tables, true))) {
        throw new RuntimeException(
            'Existing todo/tasks tables have no recorded initial migration. Nothing was changed. '
            . 'Use an empty database, or back up and migrate the old schema/passwords separately. '
            . 'A previously interrupted initial migration also requires manual inspection.'
        );
    }

    $pdo->exec("CREATE TABLE IF NOT EXISTS schema_migrations (
        version VARCHAR(190) NOT NULL PRIMARY KEY,
        checksum CHAR(64) NOT NULL,
        applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $files = glob(__DIR__ . '/../database/migrations/*.sql') ?: [];
    sort($files, SORT_STRING);
    $count = 0;
    foreach ($files as $file) {
        $version = basename($file);
        $sql = file_get_contents($file);
        if ($sql === false) {
            throw new RuntimeException('Cannot read migration: ' . $version);
        }
        $checksum = hash('sha256', str_replace("\r\n", "\n", $sql));
        if (isset($applied[$version])) {
            if (!hash_equals($applied[$version], $checksum)) {
                throw new RuntimeException('Applied migration was modified: ' . $version . '. Restore it and add a new migration instead.');
            }
            continue;
        }

        // These migrations contain plain SQL statements, not stored routines or DELIMITER commands.
        // MySQL DDL commits implicitly; a failed migration must be inspected before retrying.
        $statements = preg_split('/;\s*(?:\r?\n|$)/', $sql) ?: [];
        foreach ($statements as $statement) {
            if (trim($statement) !== '') {
                $pdo->exec($statement);
            }
        }
        $record = $pdo->prepare('INSERT INTO schema_migrations (version, checksum) VALUES (?, ?)');
        $record->execute([$version, $checksum]);
        fwrite(STDOUT, 'Applied ' . $version . PHP_EOL);
        ++$count;
    }
    fwrite(STDOUT, $count === 0 ? "Database is up to date.\n" : "Migrations completed.\n");
} catch (Throwable $error) {
    // PDO messages may contain connection details or data; do not print those.
    $message = $error instanceof PDOException
        ? 'Database operation failed. Check DB_* settings, pdo_mysql, server availability and privileges. Inspect partial migrations before retrying.'
        : $error->getMessage();
    fwrite(STDERR, 'Migration failed: ' . $message . PHP_EOL);
    $exitCode = 1;
} finally {
    if ($locked && $pdo instanceof PDO) {
        try {
            $release = $pdo->prepare('SELECT RELEASE_LOCK(?)');
            $release->execute([$lockName]);
        } catch (Throwable $error) {
            // A closed/disconnected connection releases its own advisory lock.
            fwrite(STDERR, "Could not explicitly release the migration lock; closing the connection releases it.\n");
            $exitCode = 1;
        }
    }
}

exit($exitCode ?? 0);
