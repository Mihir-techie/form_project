<?php
/**
 * Application configuration constants.
 * Edit DB credentials and ADMIN_PASS before deploying.
 */

// ── Database ──────────────────────────────────────────────
define('DB_HOST',    'localhost');
define('DB_NAME',    'agaram_scholarship');
define('DB_USER',    'root');
define('DB_PASS',    '');
define('DB_CHARSET', 'utf8mb4');

// ── Admin credentials ─────────────────────────────────────
// Default password: Admin@2025
// Regenerate: php -r "echo password_hash('YourNewPassword', PASSWORD_BCRYPT);"
define('ADMIN_USER', 'admin');
define('ADMIN_PASS', '$2y$12$K8QzV3mN5pL9wR2xT6uYOeJ4hF7cG1sA0dE3bI9nM5qP8vX2yZ4Wu');

// ── File uploads ──────────────────────────────────────────
define('UPLOAD_DIR',  dirname(__DIR__) . '/uploads/');
define('MAX_FILE_SIZE', 5 * 1024 * 1024); // 5 MB

define('ALLOWED_MIME', ['application/pdf', 'image/jpeg', 'image/png']);
define('ALLOWED_EXT',  ['pdf', 'jpg', 'jpeg', 'png']);

// ── Session ───────────────────────────────────────────────
define('SESSION_NAME', 'agaram_admin');
