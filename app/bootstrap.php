<?php
declare(strict_types=1);
require_once __DIR__ . '/config.php';
ini_set('display_errors', '0');
error_reporting(E_ALL);

if (session_status() !== PHP_SESSION_ACTIVE) {
    ini_set('session.use_strict_mode', '1');
    ini_set('session.use_only_cookies', '1');
    session_name('todo_session');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => filter_var(app_env('SESSION_SECURE', 'false'), FILTER_VALIDATE_BOOLEAN),
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
}
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: same-origin');

function csrf_token(): string
{
    if (!isset($_SESSION['csrf_token']) || !is_string($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function csrf_is_valid(mixed $token): bool
{
    return is_string($token) && isset($_SESSION['csrf_token']) &&
        is_string($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

function csrf_field(): string
{
    return '<input type="hidden" name="csrf_token" value="' . csrf_token() . '">';
}

function e(string|int $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function post_string(string $name): string
{
    return isset($_POST[$name]) && is_string($_POST[$name]) ? $_POST[$name] : '';
}

function require_login(): void
{
    if (!isset($_SESSION['user_id'])) {
        header('Location: index.php?page=home', true, 303);
        exit;
    }
}

function logout_user(): never
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !csrf_is_valid($_POST['csrf_token'] ?? null)) {
        http_response_code(403);
        exit('Invalid request token. Refresh the page and try again.');
    }
    $_SESSION = [];
    $cookie = session_get_cookie_params();
    setcookie(session_name(), '', [
        'expires' => time() - 3600,
        'path' => $cookie['path'],
        'domain' => $cookie['domain'],
        'secure' => $cookie['secure'],
        'httponly' => $cookie['httponly'],
        'samesite' => $cookie['samesite'],
    ]);
    session_destroy();
    header('Location: index.php?page=home', true, 303);
    exit;
}
