<?php
declare(strict_types=1);

/** Read literal KEY=value settings; process environment always has precedence. */
function app_env(string $name, ?string $default = null): ?string
{
    $value = getenv($name);
    if ($value !== false) {
        return $value;
    }
    static $settings = null;
    if ($settings === null) {
        $settings = [];
        $path = dirname(__DIR__) . '/.env';
        if (is_file($path)) {
            $lines = file($path, FILE_IGNORE_NEW_LINES);
            if ($lines === false) {
                throw new RuntimeException('Cannot read application configuration.');
            }
            foreach ($lines as $number => $line) {
                $line = trim($line);
                if ($line === '' || str_starts_with($line, '#')) {
                    continue;
                }
                if (!preg_match('/^([A-Z][A-Z0-9_]*)\s*=\s*(.*)$/D', $line, $parts)) {
                    throw new RuntimeException('Invalid configuration on line ' . ($number + 1) . '.');
                }
                $literal = trim($parts[2]);
                if (strlen($literal) >= 2 &&
                    (($literal[0] === '"' && str_ends_with($literal, '"')) ||
                     ($literal[0] === "'" && str_ends_with($literal, "'")))) {
                    $literal = substr($literal, 1, -1);
                }
                $settings[$parts[1]] = $literal;
            }
        }
    }
    return $settings[$name] ?? $default;
}

function db(): PDO
{
    static $connection = null;
    if ($connection instanceof PDO) {
        return $connection;
    }
    $host = app_env('DB_HOST', '127.0.0.1');
    $port = app_env('DB_PORT', '3306');
    $database = app_env('DB_NAME', 'todo_db');
    $user = app_env('DB_USER', 'todo_app');
    $password = app_env('DB_PASSWORD', '');
    if ($host === '' || preg_match('/[;\s]/', $host) ||
        !ctype_digit($port) || (int) $port < 1 || (int) $port > 65535 ||
        !preg_match('/^[A-Za-z0-9_]+$/D', $database) || $user === '' || $password === '') {
        throw new RuntimeException('Configure database credentials in .env before using the application.');
    }
    $connection = new PDO(
        "mysql:host={$host};port={$port};dbname={$database};charset=utf8mb4",
        $user,
        $password,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
         PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
         PDO::ATTR_EMULATE_PREPARES => false]
    );
    return $connection;
}

/** Log categories, never SQL, credentials, or user-provided content. */
function app_log_error(Throwable $error): void
{
    $code = (string) $error->getCode();
    $safeCode = preg_match('/^[A-Za-z0-9_-]{0,20}$/D', $code) ? $code : 'unknown';
    error_log('ToDo: ' . get_class($error) . ' (code ' . $safeCode . ')');
}
