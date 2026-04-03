<?php
/**
 * Secure file download endpoint.
 * Requires admin session. Serves files from UPLOAD_DIR.
 */
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/AdminAuth.php';

$auth = new AdminAuth();
$auth->requireLogin();

$raw  = $_GET['file'] ?? '';
$name = basename($raw); // strip any path traversal

if ($name === '' || $name !== $raw) {
    http_response_code(400);
    echo 'Invalid file name.';
    exit;
}

$path = UPLOAD_DIR . $name;

if (!file_exists($path) || !is_file($path)) {
    http_response_code(404);
    echo 'File not found.';
    exit;
}

// Verify the file is really inside UPLOAD_DIR (realpath check)
$real      = realpath($path);
$uploadDir = realpath(UPLOAD_DIR);
if ($real === false || strpos($real, $uploadDir) !== 0) {
    http_response_code(403);
    echo 'Access denied.';
    exit;
}

$finfo    = new finfo(FILEINFO_MIME_TYPE);
$mimeType = $finfo->file($real);

// Whitelist output MIME types
$allowed = ['application/pdf', 'image/jpeg', 'image/png'];
if (!in_array($mimeType, $allowed, true)) {
    http_response_code(403);
    echo 'File type not allowed.';
    exit;
}

header('Content-Type: ' . $mimeType);
header('Content-Length: ' . filesize($real));
header('Content-Disposition: attachment; filename="' . addslashes($name) . '"');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: private, no-cache');

readfile($real);
exit;
