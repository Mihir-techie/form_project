# Agaram Foundation Scholarship Form

A bilingual (Tamil / English) scholarship application form built with **React + Vite** on the frontend and **PHP + MySQL** on the backend.

---

## Prerequisites

| Tool | Minimum Version |
|------|----------------|
| Node.js | 18+ |
| PHP | 8.0+ |
| MySQL / MariaDB | 5.7+ / 10.3+ |
| Apache | 2.4+ with `mod_rewrite` enabled |

---

## Quick Start — Development Mode

> In dev mode, only the React UI runs. PHP endpoints are not active.

```bash
# Install dependencies
npm install

# Start Vite dev server (http://localhost:5173)
npm run dev
```

---

## Production Deployment

### 1. Build the frontend

```bash
npm run build
```

This runs `vite build` and then `scripts/copy-backend.js`, which copies `php/`, `uploads/.htaccess`, and `.htaccess` into `dist/`.

### 2. Upload `dist/` contents to your web root

Upload everything inside `dist/` to your Apache web root (e.g., `/var/www/html/` or a virtual host document root).

```
dist/
├── index.html
├── assets/
├── php/
├── uploads/
└── .htaccess
```

### 3. Create the MySQL database

```sql
CREATE DATABASE agaram_scholarship CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'agaram'@'localhost' IDENTIFIED BY 'strong_password_here';
GRANT ALL PRIVILEGES ON agaram_scholarship.* TO 'agaram'@'localhost';
FLUSH PRIVILEGES;
```

### 4. Edit `php/config.php`

Set your database credentials:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'agaram_scholarship');
define('DB_USER', 'agaram');
define('DB_PASS', 'strong_password_here');
```

Generate a new admin password hash (see [Changing the Admin Password](#changing-the-admin-password)) and update `ADMIN_PASS`.

### 5. Run the database migration

Visit `https://yourdomain.com/php/migration.php` once in your browser, or run via CLI:

```bash
php php/migration.php
```

**Delete or restrict `migration.php` after running it.** You can add a `Deny from all` rule or simply remove the file.

### 6. Set uploads directory permissions

```bash
chmod 750 uploads/
chown www-data:www-data uploads/   # adjust to your web server user
```

### 7. Enable mod_rewrite on Apache

```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

Ensure your virtual host has `AllowOverride All` for the document root so `.htaccess` rules take effect.

---

## Admin Panel

Access the admin panel at:

```
https://yourdomain.com/php/admin.php
```

Default credentials (change before deploying):
- **Username:** `admin`
- **Password:** `Admin@2025`

---

## Changing the Admin Password

Generate a bcrypt hash for your new password:

```bash
php -r "echo password_hash('YourNewPassword', PASSWORD_BCRYPT, ['cost'=>12]);"
```

Copy the output hash and paste it as the value of `ADMIN_PASS` in `php/config.php`:

```php
define('ADMIN_PASS', '$2y$12$...');
```

---

## Security Notes

- **Change the default admin password** before going live.
- **Restrict `migration.php`** after the initial setup — delete it or block access via `.htaccess`.
- All user inputs are sanitized with `htmlspecialchars` and prepared statements (PDO) are used for every query.
- Uploaded files are stored outside the web root (UPLOAD_DIR defaults to `uploads/` which has `Deny from all` in `.htaccess`) and served only to authenticated admins via `file.php`.
- The `uploads/` directory `.htaccess` blocks direct HTTP access.
- Class files (config, Database, Validator, etc.) are blocked from direct HTTP access via `php/.htaccess`.
- MIME type and file extension whitelisting is enforced on uploads (PDF, JPEG, PNG only, max 5 MB).
- A simple rate limit (3 submissions per IP per 60 seconds) is applied to `submit.php`.
- Security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy) are set via root `.htaccess`.

---

## File Structure

```
form/
├── src/                        # React source
│   ├── components/
│   │   ├── ui/
│   │   │   └── LanguageSwitcher.jsx
│   │   ├── FormHeader.jsx
│   │   ├── PersonalInfo.jsx
│   │   └── ... (other sections)
│   ├── context/
│   │   ├── FormContext.jsx
│   │   ├── LanguageContext.jsx
│   │   └── useTranslation.js
│   └── styles/
│       └── theme.css
├── php/                        # PHP backend
│   ├── config.php              # Constants (DB, admin, uploads)
│   ├── Database.php            # PDO singleton
│   ├── Validator.php           # Input sanitization
│   ├── FileHandler.php         # Upload handling
│   ├── SubmissionRepo.php      # DB queries
│   ├── AdminAuth.php           # Session auth
│   ├── submit.php              # Form submission endpoint
│   ├── admin.php               # Admin list + login
│   ├── admin_view.php          # View single submission
│   ├── admin_delete.php        # Delete submission
│   ├── file.php                # Secure file download
│   ├── pdf.php                 # Print-friendly view
│   ├── logout.php              # Session destroy
│   ├── migration.php           # DB setup (run once)
│   └── .htaccess
├── uploads/                    # Uploaded files (chmod 750)
│   └── .htaccess
├── scripts/
│   └── copy-backend.js         # Post-build copy script
├── .htaccess                   # Root Apache rules
├── package.json
├── vite.config.js
└── README.md
```
