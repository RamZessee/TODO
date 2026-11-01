<?php
declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

$target = dirname(__DIR__) . '/.env';
$stream = null;

try {
    $example = file_get_contents(dirname(__DIR__) . '/.env.example');
    if ($example === false) {
        throw new RuntimeException('Cannot read .env.example.');
    }
    $example = str_replace("\r\n", "\n", $example);
    foreach (['DB_PASSWORD', 'MYSQL_ROOT_PASSWORD'] as $name) {
        $example = preg_replace('/^' . $name . '=\h*$/m', $name . '=' . bin2hex(random_bytes(32)), $example, -1, $count);
        if ($example === null || $count !== 1) {
            throw new RuntimeException('Expected one empty ' . $name . ' entry in .env.example.');
        }
    }

    // Exclusive creation refuses to overwrite an existing file, even if another process creates it now.
    $stream = @fopen($target, 'x+b');
    if ($stream === false) {
        throw new RuntimeException('Cannot create .env: it already exists or the project directory is not writable. Existing configuration was not overwritten.');
    }
    @chmod($target, 0600);
    $offset = 0;
    while ($offset < strlen($example)) {
        $written = fwrite($stream, substr($example, $offset));
        if ($written === false || $written === 0) {
            throw new RuntimeException('Could not finish writing .env. Inspect the new local file before using it.');
        }
        $offset += $written;
    }
    if (!fflush($stream)) {
        throw new RuntimeException('Could not flush .env to disk. Inspect the new local file before using it.');
    }
    fwrite(STDOUT, "Created .env with random database passwords. Passwords were not printed.\n");
    fwrite(STDOUT, "For native PHP, create the matching MySQL database/user and adjust DB_* as needed.\n");
    fwrite(STDOUT, "For Docker, the database container uses these passwords on its first initialization.\n");
    fwrite(STDOUT, "Keep .env private and out of Git.\n");
} catch (Throwable $error) {
    fwrite(STDERR, 'Setup failed: ' . $error->getMessage() . PHP_EOL);
    $exitCode = 1;
} finally {
    if (is_resource($stream)) {
        fclose($stream);
    }
}

exit($exitCode ?? 0);
