<?php
declare(strict_types=1);

require_once __DIR__ . '/../app/bootstrap.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

$sendJson = static function (array $payload, int $statusCode = 200): never {
    http_response_code($statusCode);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
};
$fail = static function (string $message, int $statusCode) use ($sendJson): never {
    $sendJson(['success' => false, 'message' => $message], $statusCode);
};

if (!isset($_SESSION['user_id'])) {
    $fail('Authorization is required.', 401);
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if (!in_array($method, ['GET', 'POST'], true)) {
    header('Allow: GET, POST');
    $fail('Method not allowed.', 405);
}

$body = [];
if ($method === 'POST') {
    if (!csrf_is_valid($_SERVER['HTTP_X_CSRF_TOKEN'] ?? null)) {
        $fail('Session token is invalid. Refresh the page.', 403);
    }
    $contentType = strtolower(trim(explode(';', $_SERVER['CONTENT_TYPE'] ?? '')[0]));
    if ($contentType !== 'application/json') {
        $fail('Send a JSON object with Content-Type: application/json.', 415);
    }
    $rawBody = file_get_contents('php://input', false, null, 0, 65537);
    if ($rawBody === false || strlen($rawBody) > 65536) {
        $fail('Request body is too large.', 413);
    }
    try {
        $decoded = json_decode($rawBody, false, 16, JSON_THROW_ON_ERROR);
    } catch (JsonException $e) {
        $fail('Invalid JSON body.', 400);
    }
    if (!$decoded instanceof stdClass) {
        $fail('The JSON body must be an object.', 400);
    }
    $body = (array) $decoded;
}

$action = $_GET['action'] ?? $body['action'] ?? 'list';
if (!is_string($action) || !in_array($action, ['list', 'add', 'update', 'delete', 'move'], true)) {
    $fail('Unknown action.', 400);
}
if (isset($_GET['action'], $body['action']) && $_GET['action'] !== $body['action']) {
    $fail('Conflicting action parameters.', 400);
}
if ($action !== 'list' && $method !== 'POST') {
    header('Allow: POST');
    $fail('This action requires POST.', 405);
}

$allowedStatuses = ['new', 'inProgress', 'done'];
$allowedPriorities = ['low', 'medium', 'high'];
$id = null;
if (in_array($action, ['update', 'delete', 'move'], true)) {
    $rawId = $body['id'] ?? null;
    if ((!is_int($rawId) && !is_string($rawId)) ||
        !preg_match('/^[1-9][0-9]*$/D', (string) $rawId) ||
        filter_var($rawId, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]) === false) {
        $fail('Invalid task id.', 422);
    }
    $id = (int) $rawId;
}

$task = '';
$status = 'new';
$priority = 'medium';
if (in_array($action, ['add', 'update'], true)) {
    if (!isset($body['task']) || !is_string($body['task'])) {
        $fail('Task text must be a string.', 422);
    }
    $task = trim($body['task']);
    $length = preg_match_all('/./us', $task);
    if ($task === '' || $length === false || $length > 255) {
        $fail('Task text must contain 1 to 255 characters.', 422);
    }
    $status = array_key_exists('status', $body) ? $body['status'] : 'new';
    $priority = array_key_exists('priority', $body) ? $body['priority'] : 'medium';
    if (!is_string($status) || !in_array($status, $allowedStatuses, true)) {
        $fail('Invalid task status.', 422);
    }
    if (!is_string($priority) || !in_array($priority, $allowedPriorities, true)) {
        $fail('Invalid task priority.', 422);
    }
}
if ($action === 'move' && !in_array($body['direction'] ?? null, ['forward', 'back'], true)) {
    $fail('Invalid move direction.', 422);
}

// Optional fields are patched only when supplied, so moving an older card never clears its details.
$details = [];
if (in_array($action, ['add', 'update'], true)) {
    if (array_key_exists('description', $body)) {
        if (!is_string($body['description']) || !preg_match('//u', $body['description']) || preg_match_all('/./us', $body['description']) > 5000) $fail('Invalid description.', 422);
        $details['description'] = trim($body['description']);
    }
    if (array_key_exists('dueDate', $body)) {
        $date = $body['dueDate'];
        if ($date !== null) {
            if (!is_string($date) || !preg_match('/^[1-9][0-9]{3}-[0-9]{2}-[0-9]{2}$/D', $date)) $fail('Invalid due date.', 422);
            [$y, $m, $d] = array_map('intval', explode('-', $date));
            if (!checkdate($m, $d, $y)) $fail('Invalid due date.', 422);
        }
        $details['due_date'] = $date;
    }
    foreach (['labels' => 5, 'checklist' => 30] as $field => $limit) {
        if (!array_key_exists($field, $body)) continue;
        if (!is_array($body[$field]) || !array_is_list($body[$field]) || count($body[$field]) > $limit) $fail('Invalid ' . $field . '.', 422);
        $items = [];
        foreach ($body[$field] as $item) {
            if (!$item instanceof stdClass) $fail('Invalid ' . $field . ' item.', 422);
            $text = $field === 'labels' ? ($item->name ?? null) : ($item->text ?? null);
            if (!is_string($text) || trim($text) === '' || !preg_match('//u', $text) || preg_match_all('/./us', $text) > ($field === 'labels' ? 30 : 200)) $fail('Invalid item text.', 422);
            if ($field === 'labels') {
                if (!in_array($item->color ?? null, ['green', 'blue', 'purple', 'orange', 'pink'], true)) $fail('Invalid label color.', 422);
                $items[] = ['name' => trim($text), 'color' => $item->color];
            } else {
                if (!is_bool($item->done ?? null)) $fail('Invalid checklist state.', 422);
                $items[] = ['text' => trim($text), 'done' => $item->done];
            }
        }
        $details[$field] = json_encode($items, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }
}

$normalizeTaskDto = static function (array $row) use ($allowedStatuses, $allowedPriorities): array {
    $status = match ($row['status']) {
        'CREATED', 'ready' => 'new',
        'process' => 'inProgress',
        default => $row['status'],
    };
    return [
        'id' => (int) $row['id'],
        'task' => (string) $row['task'],
        'status' => in_array($status, $allowedStatuses, true) ? $status : 'new',
        'priority' => in_array($row['priority'], $allowedPriorities, true) ? $row['priority'] : 'medium',
        'createdAt' => (string) $row['created_at'],
        'description' => (string) ($row['description'] ?? ''),
        'dueDate' => $row['due_date'],
        'labels' => json_decode($row['labels'] ?? '[]', true),
        'checklist' => json_decode($row['checklist'] ?? '[]', true),
    ];
};

$pdo = null;
try {
    $pdo = db();
    $userId = (int) $_SESSION['user_id'];
    $userStmt = $pdo->prepare('SELECT id FROM todo WHERE id = ?');
    $userStmt->execute([$userId]);
    if (!$userStmt->fetchColumn()) {
        $_SESSION = [];
        session_destroy();
        $fail('Authorization is required.', 401);
    }

    if ($action === 'add') {
        $extraColumns = $details ? ', ' . implode(', ', array_keys($details)) : '';
        $extraValues = str_repeat(', ?', count($details));
        $stmt = $pdo->prepare('INSERT INTO tasks (task, status, priority, todo_id' . $extraColumns . ') VALUES (?, ?, ?, ?' . $extraValues . ')');
        $stmt->execute([$task, $status, $priority, $userId, ...array_values($details)]);
    } elseif (in_array($action, ['update', 'delete', 'move'], true)) {
        // Lock the owned row so concurrent requests cannot change it between checking and updating.
        $pdo->beginTransaction();
        $stmt = $pdo->prepare('SELECT status FROM tasks WHERE id = ? AND todo_id = ? FOR UPDATE');
        $stmt->execute([$id, $userId]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$row) {
            $pdo->rollBack();
            $fail('Task not found.', 404);
        }
        if ($action === 'update') {
            $extra = '';
            foreach (array_keys($details) as $column) $extra .= ', ' . $column . ' = ?';
            $stmt = $pdo->prepare('UPDATE tasks SET task = ?, status = ?, priority = ?' . $extra . ' WHERE id = ? AND todo_id = ?');
            $stmt->execute([$task, $status, $priority, ...array_values($details), $id, $userId]);
        } elseif ($action === 'delete') {
            $stmt = $pdo->prepare('DELETE FROM tasks WHERE id = ? AND todo_id = ?');
            $stmt->execute([$id, $userId]);
        } else {
            $currentStatus = match ($row['status']) {
                'CREATED', 'ready' => 'new',
                'process' => 'inProgress',
                default => $row['status'],
            };
            $position = array_search($currentStatus, $allowedStatuses, true);
            $position = $position === false ? 0 : $position;
            $next = max(0, min(2, $position + ($body['direction'] === 'forward' ? 1 : -1)));
            $stmt = $pdo->prepare('UPDATE tasks SET status = ? WHERE id = ? AND todo_id = ?');
            $stmt->execute([$allowedStatuses[$next], $id, $userId]);
        }
        $pdo->commit();
    }

    $stmt = $pdo->prepare('SELECT id, task, status, priority, created_at, description, due_date, labels, checklist FROM tasks WHERE todo_id = ? ORDER BY id DESC');
    $stmt->execute([$userId]);
    $tasks = array_map($normalizeTaskDto, $stmt->fetchAll(PDO::FETCH_ASSOC));
    $sendJson(['success' => true, 'tasks' => $tasks]);
} catch (Throwable $e) {
    if ($pdo instanceof PDO && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    app_log_error($e);
    $fail('Database error. Check the server configuration and migrations.', 500);
}
