<?php
/**
 * Destroy admin session and redirect to login.
 */
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/AdminAuth.php';

(new AdminAuth())->logout();

header('Location: admin.php');
exit;
