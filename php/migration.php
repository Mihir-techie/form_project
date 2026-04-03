<?php
/**
 * Database migration — run once to create the submissions table.
 * After running, restrict or delete this file for security.
 *
 * CLI usage: php migration.php
 * Web usage: visit /php/migration.php (requires admin session or CLI only)
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/Database.php';

$isCli = PHP_SAPI === 'cli';

if (!$isCli) {
    header('Content-Type: text/html; charset=utf-8');
    echo '<!DOCTYPE html><html><head><title>Migration</title></head><body><pre>';
}

function out(string $msg): void
{
    echo $msg . (PHP_SAPI === 'cli' ? PHP_EOL : '<br>');
}

try {
    $pdo = Database::connect();
    out('Connected to database: ' . DB_NAME);

    // ── Create submissions table ───────────────────────────
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS submissions (
            id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            created_at   TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at   TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            status       VARCHAR(20) NOT NULL DEFAULT 'pending',
            student_name VARCHAR(255) NOT NULL DEFAULT '',
            emis_number  VARCHAR(50)  NOT NULL DEFAULT '',
            school10_name TEXT,
            school12_name TEXT,
            data         LONGTEXT     COMMENT 'Full form JSON',
            files        TEXT         COMMENT 'File paths JSON'
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");
    out('Table `submissions` created or already exists.');

    // ── Indexes ────────────────────────────────────────────
    // Wrap each in try/catch so duplicate-key errors are ignored
    $indexes = [
        'idx_status'     => 'CREATE INDEX idx_status     ON submissions (status)',
        'idx_created_at' => 'CREATE INDEX idx_created_at ON submissions (created_at)',
    ];

    foreach ($indexes as $name => $sql) {
        try {
            $pdo->exec($sql);
            out("Index `{$name}` created.");
        } catch (PDOException $e) {
            // 1061 = Duplicate key name — index already exists
            if (str_contains($e->getMessage(), 'Duplicate key name')) {
                out("Index `{$name}` already exists, skipping.");
            } else {
                throw $e;
            }
        }
    }

    out('');
    out('Migration completed successfully.');
} catch (Throwable $e) {
    out('ERROR: ' . $e->getMessage());
}

if (!$isCli) {
    echo '</pre></body></html>';
}
