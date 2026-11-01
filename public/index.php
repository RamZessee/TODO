<?php
declare(strict_types=1);
require_once dirname(__DIR__) . '/app/bootstrap.php';
require_once dirname(__DIR__) . '/app/ui.php';
$pages = ['home', 'tasks', 'registration', 'account'];
$page = isset($_GET['page']) && is_string($_GET['page']) ? $_GET['page'] : 'home';
// PHP's development server can route missing files to index.php via PATH_INFO.
// Only the entry point itself is a page; never present missing/private paths as valid pages.
if (!empty($_SERVER['PATH_INFO']) || !in_array($page, $pages, true)) {
    $page = '404';
    http_response_code(404);
}
// Process controllers before emitting the layout so redirects and cookies work.
ob_start();
if (!in_array($_SERVER['REQUEST_METHOD'], ['GET', 'POST', 'HEAD'], true)) {
    http_response_code(405);
    header('Allow: GET, HEAD, POST');
    echo '<main class="container"><p class="auth-message">Method not allowed.</p></main>';
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && !csrf_is_valid($_POST['csrf_token'] ?? null)) {
    http_response_code(403);
    echo '<main class="container"><p class="auth-message">Invalid request token. Refresh the page and try again.</p></main>';
} else {
    require dirname(__DIR__) . '/app/' . $page . '.php';
}
$content = ob_get_clean();
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ToDo — пространство для важных дел</title>
    <script src="theme.js?v=2"></script>
    <link rel="stylesheet" href="style.css?v=7">
</head>
<body class="page-<?= e($page) ?>">
    <?php require dirname(__DIR__) . '/app/header.php'; ?>
    <?= $content ?>
    <?php require dirname(__DIR__) . '/app/footer.php'; ?>
    <script src="ToDoListJs.js?v=7"></script>
</body>
</html>
