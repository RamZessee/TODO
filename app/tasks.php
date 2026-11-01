<?php
require_login();
$userLogin = (string) ($_SESSION['user_login'] ?? 'Пользователь');
if ($_SERVER['REQUEST_METHOD'] === 'POST' && post_string('action') === 'logout') logout_user();
$statusLabels = ['new' => 'Нужно сделать', 'inProgress' => 'В работе', 'done' => 'Готово'];
$priorityLabels = ['low' => 'Низкий', 'medium' => 'Средний', 'high' => 'Высокий'];
?>
