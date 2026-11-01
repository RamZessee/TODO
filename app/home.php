<?php
if (isset($_SESSION['user_id'])) {
    header('Location: index.php?page=tasks', true, 303);
    exit;
}
$message = '';
$email = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim(post_string('email'));
    $password = post_string('password');
    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254 ||
        strlen($password) < 8 || strlen($password) > 72 || str_contains($password, "\0")) {
        $message = 'Неверная почта или пароль.';
    } else {
        try {
            $pdo = db();
            $stmt = $pdo->prepare('SELECT id, login, email, password FROM todo WHERE email = ? LIMIT 1');
            $stmt->execute([$email]);
            $user = $stmt->fetch();
            if ($user && password_verify($password, $user['password'])) {
                if (password_needs_rehash($user['password'], PASSWORD_DEFAULT)) {
                    $stmt = $pdo->prepare('UPDATE todo SET password = ? WHERE id = ?');
                    $stmt->execute([password_hash($password, PASSWORD_DEFAULT), $user['id']]);
                }
                session_regenerate_id(true);
                $_SESSION['user_id'] = (int) $user['id'];
                $_SESSION['user_email'] = (string) $user['email'];
                $_SESSION['user_login'] = (string) $user['login'];
                $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
                header('Location: index.php?page=tasks', true, 303);
                exit;
            }
            $message = 'Неверная почта или пароль.';
        } catch (Throwable $error) {
            app_log_error($error);
            $message = 'Не удалось подключиться к базе. Попробуйте позже.';
            http_response_code(503);
        }
    }
}
?>
<main class="auth-layout"><?php require __DIR__ . '/auth-visual.php'; ?><section class="auth-container"><span class="eyebrow">ЛИЧНОЕ ПРОСТРАНСТВО</span><h2 class="auth-title">С возвращением</h2><p class="auth-subtitle">Ваши планы уже ждут. Продолжим?</p><?php if ($message !== ''): ?><p class="auth-message"><?= e($message) ?></p><?php endif; ?><form action="index.php?page=home" method="post" class="auth-form"><?= csrf_field() ?><table class="auth-table"><tbody><tr><td><label for="login-email">Электронная почта</label></td><td><input id="login-email" type="email" name="email" value="<?= e($email) ?>" maxlength="254" autocomplete="username" placeholder="you@example.com" required class="auth-input"></td></tr><tr><td><label for="login-password">Пароль</label></td><td><input id="login-password" type="password" name="password" autocomplete="current-password" placeholder="Ваш пароль" required class="auth-input"></td></tr><tr><td colspan="2"><button type="submit" name="send" value="1" class="auth-btn primary">Войти в пространство <?= icon('arrow') ?></button></td></tr></tbody></table></form><p class="auth-switch">Впервые здесь? <a href="index.php?page=registration">Создать аккаунт</a></p></section></main>
