<?php
require_once __DIR__ . '/Database.php';

/**
 * Data-access layer for the submissions table.
 */
class SubmissionRepo
{
    /**
     * Insert a new submission and return the new row ID.
     */
    public function create(
        string $studentName,
        string $emisNumber,
        string $school10,
        string $school12,
        string $dataJson
    ): int {
        Database::run(
            'INSERT INTO submissions (student_name, emis_number, school10_name, school12_name, data)
             VALUES (?, ?, ?, ?, ?)',
            [$studentName, $emisNumber, $school10, $school12, $dataJson]
        );
        return (int)Database::lastId();
    }

    /**
     * Update the files JSON column for a submission.
     */
    public function updateFiles(int $id, string $filesJson): void
    {
        Database::run(
            'UPDATE submissions SET files = ? WHERE id = ?',
            [$filesJson, $id]
        );
    }

    /**
     * Return all submissions for the admin list, newest first.
     *
     * @return array<int, array<string, mixed>>
     */
    public function list(): array
    {
        return Database::run(
            'SELECT id, student_name, emis_number, school10_name, school12_name, status, created_at
             FROM submissions
             ORDER BY id DESC'
        )->fetchAll();
    }

    /**
     * Return a single submission by ID, or null if not found.
     *
     * @return array<string, mixed>|null
     */
    public function find(int $id): ?array
    {
        $row = Database::run(
            'SELECT * FROM submissions WHERE id = ?',
            [$id]
        )->fetch();
        return $row ?: null;
    }

    /**
     * Delete a submission and return the row that was deleted (or null).
     *
     * @return array<string, mixed>|null
     */
    public function delete(int $id): ?array
    {
        $row = $this->find($id);
        if ($row) {
            Database::run('DELETE FROM submissions WHERE id = ?', [$id]);
        }
        return $row;
    }

    /**
     * Update the status field for a submission.
     */
    public function updateStatus(int $id, string $status): void
    {
        Database::run(
            'UPDATE submissions SET status = ? WHERE id = ?',
            [$status, $id]
        );
    }
}
