<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON data']);
    exit();
}

// Validate required fields
$requiredFields = ['name', 'phone', 'birthDate', 'region', 'career', 'reason', 'privacyConsent'];
foreach ($requiredFields as $field) {
    if (!isset($data[$field]) || (is_string($data[$field]) && trim($data[$field]) === '')) {
        http_response_code(400);
        echo json_encode(['error' => "Missing required field: {$field}"]);
        exit();
    }
}

// Validate privacy consent
if ($data['privacyConsent'] !== true) {
    http_response_code(400);
    echo json_encode(['error' => 'Privacy consent is required']);
    exit();
}

// Sanitize data
$application = [
    'name' => htmlspecialchars(trim($data['name']), ENT_QUOTES, 'UTF-8'),
    'phone' => htmlspecialchars(trim($data['phone']), ENT_QUOTES, 'UTF-8'),
    'birthDate' => htmlspecialchars(trim($data['birthDate']), ENT_QUOTES, 'UTF-8'),
    'region' => htmlspecialchars(trim($data['region']), ENT_QUOTES, 'UTF-8'),
    'career' => htmlspecialchars(trim($data['career']), ENT_QUOTES, 'UTF-8'),
    'reason' => htmlspecialchars(trim($data['reason']), ENT_QUOTES, 'UTF-8'),
    'privacyConsent' => true,
    'createdAt' => date('c'),
    'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
    'userAgent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
];

// Data directory
$dataDir = __DIR__ . '/data';
if (!is_dir($dataDir)) {
    if (!mkdir($dataDir, 0755, true)) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create data directory']);
        exit();
    }
}

// Protect data directory
$htaccessPath = $dataDir . '/.htaccess';
if (!file_exists($htaccessPath)) {
    file_put_contents($htaccessPath, "Deny from all\n");
}

// Applications file
$filePath = $dataDir . '/applications.json';

// Read existing applications
$applications = [];
if (file_exists($filePath)) {
    $content = file_get_contents($filePath);
    $applications = json_decode($content, true) ?? [];
}

// Generate ID
$maxId = 0;
foreach ($applications as $app) {
    if (isset($app['id']) && $app['id'] > $maxId) {
        $maxId = $app['id'];
    }
}
$application['id'] = $maxId + 1;

// Add to applications
$applications[] = $application;

// Save to file
$result = file_put_contents($filePath, json_encode($applications, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

if ($result === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save application']);
    exit();
}

// Success response
http_response_code(201);
echo json_encode([
    'success' => true,
    'message' => '지원서가 성공적으로 제출되었습니다.',
    'id' => $application['id'],
]);
