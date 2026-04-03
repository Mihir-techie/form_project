<?php
require_once __DIR__ . '/config.php';

/**
 * Admin session authentication.
 */
class AdminAuth
{
    public function __construct()
    {
        session_name(SESSION_NAME);
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    /**
     * Attempt login with username and password.
     * Returns true on success.
     */
    public function attempt(string $user, string $pass): bool
    {
        if ($user === ADMIN_USER && password_verify($pass, ADMIN_PASS)) {
            session_regenerate_id(true);
            $_SESSION['admin_logged_in'] = true;
            return true;
        }
        return false;
    }

    /**
     * Check if the admin session is active.
     */
    public function check(): bool
    {
        return !empty($_SESSION['admin_logged_in']);
    }

    /**
     * Redirect to admin.php if not logged in.
     */
    public function requireLogin(): void
    {
        if (!$this->check()) {
            header('Location: admin.php');
            exit;
        }
    }

    /**
     * Destroy the admin session and redirect to login.
     */
    public function logout(): void
    {
        $_SESSION = [];
        if (ini_get('session.use_cookies')) {
            $p = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $p['path'], $p['domain'], $p['secure'], $p['httponly']);
        }
        session_destroy();
    }
}
