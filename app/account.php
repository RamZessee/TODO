<?php
require_login();
if ($_SERVER['REQUEST_METHOD'] === 'POST' && post_string('action') === 'logout') {
    logout_user();
}
$userData = [];
$errorMessage = '';
try {
    $stmt = db()->prepare('SELECT id, login, email FROM todo WHERE id = ? LIMIT 1');
    $stmt->execute([(int) $_SESSION['user_id']]);
    $userData = $stmt->fetch() ?: [];
    if (!$userData) {
        $_SESSION = [];
        session_regenerate_id(true);
        header('Location: index.php?page=home', true, 303);
        exit;
    }
} catch (Throwable $error) {
    app_log_error($error);
    $errorMessage = 'Не удалось подключиться к базе. Попробуйте позже.';
    http_response_code(503);
}
$userLogin = (string) ($_SESSION['user_login'] ?? 'User');
?>
