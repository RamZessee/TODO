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
<main class="container account-page">
    <div class="tasks-topbar">
        <div>
            <h2 class="auth-title tasks-title">Мой профиль</h2>
            <p class="auth-message tasks-user">Ваш аккаунт: <?= e($userLogin) ?></p>
        </div>
        <div class="topbar-actions">
            <a href="index.php?page=tasks" class="auth-btn secondary account-link">На доску</a>
            <form action="index.php?page=account" method="post" class="auth-form inline logout-form">
                <?= csrf_field() ?>
                <input type="hidden" name="action" value="logout">
                <input type="submit" value="Выйти" class="auth-btn secondary">
            </form>
        </div>
    </div>
    <?php if ($errorMessage !== ''): ?>
        <p class="auth-message"><?= e($errorMessage) ?></p>
    <?php else: ?>
        <table class="auth-table account-table"><tbody>
            <?php foreach ($userData as $field => $value): ?>
                <tr><td class="account-field"><?= e(['id' => 'Номер аккаунта', 'login' => 'Имя', 'email' => 'Почта'][$field] ?? $field) ?></td><td><?= e((string) $value) ?></td></tr>
            <?php endforeach; ?>
        </tbody></table>
    <?php endif; ?>
</main>
