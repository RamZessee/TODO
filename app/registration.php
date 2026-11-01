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
