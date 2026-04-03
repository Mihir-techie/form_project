<?php
/**
 * Input validation and sanitization helpers.
 */
class Validator
{
    /** @var array<string, string> */
    private array $errors = [];

    /**
     * Sanitize a string: trim, htmlspecialchars, truncate.
     */
    public function str(mixed $val, int $max = 255): string
    {
        $s = trim((string)($val ?? ''));
        $s = htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
        return mb_substr($s, 0, $max);
    }

    /**
     * Cast to int or return null if empty/non-numeric.
     */
    public function int(mixed $val): ?int
    {
        if ($val === '' || $val === null) return null;
        return is_numeric($val) ? (int)$val : null;
    }

    /**
     * Cast to float or return null if empty/non-numeric.
     */
    public function decimal(mixed $val): ?float
    {
        if ($val === '' || $val === null) return null;
        return is_numeric($val) ? (float)$val : null;
    }

    /**
     * Validate and return a YYYY-MM-DD date string, or null.
     */
    public function date(mixed $val): ?string
    {
        $s = trim((string)($val ?? ''));
        if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $s)) {
            $d = DateTime::createFromFormat('Y-m-d', $s);
            if ($d && $d->format('Y-m-d') === $s) return $s;
        }
        return null;
    }

    /**
     * Ensure value is a JSON array string.
     * Accepts a JSON string or a PHP array.
     */
    public function json(mixed $val): string
    {
        if (is_string($val)) {
            $decoded = json_decode($val, true);
            $val = is_array($decoded) ? $decoded : [];
        }
        if (!is_array($val)) $val = [];
        return json_encode($val, JSON_UNESCAPED_UNICODE);
    }

    /**
     * Record an error if value is empty.
     */
    public function required(string $field, mixed $val): void
    {
        if ($val === '' || $val === null) {
            $this->errors[$field] = "{$field} is required";
        }
    }

    /** @return array<string, string> */
    public function errors(): array
    {
        return $this->errors;
    }

    public function fails(): bool
    {
        return count($this->errors) > 0;
    }
}
