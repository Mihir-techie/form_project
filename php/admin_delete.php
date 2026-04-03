<?php
/**
 * Delete a submission and its associated uploaded files.
 * Accepts POST only, then redirects to admin.php.
 */
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/Database.php';
require_once __DIR__ . '/AdminAuth.php';
require_once __DIR__ . '/FileHandler.php';
require_once __DIR__ . '/SubmissionRepo.php';

$auth = new AdminAuth();
$auth->requireLogin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: admin.php');
    exit;
}

$id   = (int)($_POST['id'] ?? 0);
$repo = new SubmissionRepo();
$row  = $repo->delete($id);

// Delete uploaded files from disk
if ($row) {
    $files = json_decode($row['files'] ?? '{}', true) ?? [];
    $fh    = new FileHandler();
    foreach ($files as $filename) {
        $fh->delete((string)$filename);
    }
}

header('Location: admin.php?deleted=1');
exit;
