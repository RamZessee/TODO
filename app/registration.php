<?php
if (isset($_SESSION['user_id'])) {
    header('Location: index.php?page=tasks', true, 303);
    exit;
}
$message = '';
$login = '';
$email = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $login = trim(post_string('login'));
    $email = trim(post_string('email'));
    $password = post_string('password');
    $loginLength = preg_match_all('/./us', $login);
    if ($login === '' || $loginLength === false || $loginLength > 100) {
        $message = 'Введите имя от 1 до 100 символов.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254) {
        $message = 'Введите корректный адрес электронной почты.';
    } elseif (strlen($password) < 8 || strlen($password) > 72 || str_contains($password, "\0")) {
        $message = 'Пароль должен занимать от 8 до 72 байт. Буквы кириллицы занимают несколько байт.';
    } else {
        try {
            $pdo = db();
            $stmt = $pdo->prepare('INSERT INTO todo (login, email, password) VALUES (?, ?, ?)');
            $stmt->execute([$login, $email, password_hash($password, PASSWORD_DEFAULT)]);
            $message = 'Аккаунт создан! Теперь можно войти в своё пространство.';
            $login = '';
            $email = '';
        } catch (PDOException $error) {
            if ($error->getCode() === '23000' && (int) ($error->errorInfo[1] ?? 0) === 1062) {
                $message = 'Аккаунт с такой почтой уже существует.';
            } else {
                app_log_error($error);
                $message = 'Не удалось подключиться к базе. Попробуйте позже.';
                http_response_code(503);
            }
        } catch (Throwable $error) {
            app_log_error($error);
            $message = 'Не удалось подключиться к базе. Попробуйте позже.';
            http_response_code(503);
        }
    }
}
?>
<main class="auth-layout"><?php require __DIR__ . '/auth-visual.php'; ?><section class="auth-container"><span class="eyebrow">ЛИЧНОЕ ПРОСТРАНСТВО</span><h2 class="auth-title">Начнём с чистого листа</h2><p class="auth-subtitle">Создайте аккаунт, остальное сложится.</p><?php if ($message !== ''): ?><p class="auth-message"><?= e($message) ?></p><?php endif; ?><form action="index.php?page=registration" method="post" class="auth-form"><?= csrf_field() ?><table class="auth-table"><tbody><tr><td><label for="register-login">Как вас зовут?</label></td><td><input id="register-login" type="text" name="login" value="<?= e($login) ?>" maxlength="100" autocomplete="nickname" placeholder="Ваше имя" required class="auth-input"></td></tr><tr><td><label for="register-email">Электронная почта</label></td><td><input id="register-email" type="email" name="email" value="<?= e($email) ?>" maxlength="254" autocomplete="username" placeholder="you@example.com" required class="auth-input"></td></tr><tr><td><label for="register-password">Пароль</label></td><td><input id="register-password" type="password" name="password" minlength="8" autocomplete="new-password" placeholder="Не менее 8 символов" required class="auth-input"></td></tr><tr><td colspan="2"><button type="submit" name="send" value="1" class="auth-btn primary">Создать аккаунт <?= icon('arrow') ?></button></td></tr></tbody></table></form><p class="auth-switch">Уже есть аккаунт? <a href="index.php?page=home">Войти</a></p></section></main>
