<?php
/**
 * Handles file upload validation, storage, and deletion.
 */
class FileHandler
{
    public function __construct()
    {
        if (!is_dir(UPLOAD_DIR)) {
            mkdir(UPLOAD_DIR, 0750, true);
        }
    }

    /**
     * Validate and move an uploaded file.
     * Returns the stored filename on success, null if no file was uploaded.
     *
     * @param array  $file  Entry from $_FILES
     * @param string $field Field name (for error messages)
     * @param int    $id    Submission ID (used in filename)
     */
    public function handle(array $file, string $field, int $id): ?string
    {
        if (!isset($file['tmp_name']) || $file['error'] === UPLOAD_ERR_NO_FILE) {
            return null;
        }
        if ($file['error'] !== UPLOAD_ERR_OK) {
            throw new RuntimeException("Upload error on {$field}: code {$file['error']}");
        }
        if ($file['size'] > MAX_FILE_SIZE) {
            throw new RuntimeException("{$field} exceeds maximum file size of 5 MB");
        }

        $mime = $this->mime($file['tmp_name']);
        if (!in_array($mime, ALLOWED_MIME, true)) {
            throw new RuntimeException("{$field} has disallowed MIME type: {$mime}");
        }

        $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if (!in_array($ext, ALLOWED_EXT, true)) {
            throw new RuntimeException("{$field} has disallowed extension: {$ext}");
        }

        $filename = sprintf('%d_%s_%s.%s', $id, $field, bin2hex(random_bytes(6)), $ext);
        $dest = UPLOAD_DIR . $filename;

        if (!move_uploaded_file($file['tmp_name'], $dest)) {
            throw new RuntimeException("Failed to move uploaded file for {$field}");
        }

        return $filename;
    }

    /**
     * Delete a file from the upload directory.
     */
    public function delete(string $filename): void
    {
        $path = $this->path($filename);
        if (file_exists($path)) {
            unlink($path);
        }
    }

    /**
     * Return the absolute path for a filename in UPLOAD_DIR.
     */
    public function path(string $filename): string
    {
        return UPLOAD_DIR . basename($filename);
    }

    /**
     * Detect the MIME type of a file using finfo.
     */
    private function mime(string $path): string
    {
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        return (string)$finfo->file($path);
    }
}
