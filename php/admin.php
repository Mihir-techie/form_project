<?php
/**
 * Admin panel: login + submission list.
 */
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/Database.php';
require_once __DIR__ . '/AdminAuth.php';
require_once __DIR__ . '/SubmissionRepo.php';

$auth = new AdminAuth();
$loginError = '';

// ── Handle logout ──────────────────────────────────────────
if (isset($_GET['logout'])) {
    $auth->logout();
    header('Location: admin.php');
    exit;
}

// ── Handle login POST ──────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['username'])) {
    if ($auth->attempt($_POST['username'] ?? '', $_POST['password'] ?? '')) {
        header('Location: admin.php');
        exit;
    }
    $loginError = 'Invalid username or password.';
}

// ── Not logged in → show login form ───────────────────────
if (!$auth->check()) { ?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Agaram Admin — Login</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, sans-serif; background: #f0f2f5; min-height: 100vh;
         display: flex; flex-direction: column; }
  .admin-header { background: #1a1a2e; color: white; padding: 1rem 2rem;
                  font-size: 1.2rem; font-weight: 700; letter-spacing: 0.03em; }
  .login-wrap { flex: 1; display: flex; align-items: center; justify-content: center; padding: 2rem; }
  .login-card { background: white; border-radius: 10px; padding: 2.5rem; width: 100%;
                max-width: 380px; box-shadow: 0 4px 24px rgba(0,0,0,0.1); }
  .login-card h2 { margin-bottom: 1.5rem; font-size: 1.25rem; color: #1a1a2e; }
  label { display: block; font-size: 0.85rem; font-weight: 600; color: #555; margin-bottom: 0.3rem; }
  input { width: 100%; padding: 0.6rem 0.8rem; border: 1px solid #ddd; border-radius: 6px;
          font-size: 0.95rem; margin-bottom: 1rem; outline: none; transition: border-color 0.2s; }
  input:focus { border-color: #e8621a; }
  .btn { width: 100%; padding: 0.7rem; background: #e8621a; color: white; border: none;
         border-radius: 6px; font-size: 1rem; font-weight: 600; cursor: pointer;
         transition: background 0.2s; }
  .btn:hover { background: #c9501a; }
  .error { background: #fff0ee; color: #c0392b; border: 1px solid #fcc; border-radius: 6px;
           padding: 0.6rem 0.8rem; margin-bottom: 1rem; font-size: 0.875rem; }
</style>
</head>
<body>
  <div class="admin-header">Agaram Admin</div>
  <div class="login-wrap">
    <div class="login-card">
      <h2>Admin Login</h2>
      <?php if ($loginError): ?>
        <p class="error"><?= htmlspecialchars($loginError) ?></p>
      <?php endif; ?>
      <form method="POST">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" autocomplete="username" required>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" autocomplete="current-password" required>
        <button class="btn" type="submit">Login</button>
      </form>
    </div>
  </div>
</body>
</html>
<?php
    exit;
}

// ── Logged in → show submission list ──────────────────────
$repo  = new SubmissionRepo();
$rows  = $repo->list();
$total = count($rows);
$deleted = isset($_GET['deleted']) ? 'Submission deleted successfully.' : '';

$statusColors = [
    'pending'  => '#e67e22',
    'reviewed' => '#2980b9',
    'accepted' => '#27ae60',
    'rejected' => '#c0392b',
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Agaram Scholarship Admin</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, sans-serif; background: #f0f2f5; color: #333; }
  .admin-header { background: #1a1a2e; color: white; padding: 1rem 2rem;
                  display: flex; align-items: center; justify-content: space-between; }
  .admin-header h1 { font-size: 1.15rem; font-weight: 700; }
  .admin-header a { color: #ffc; text-decoration: none; font-size: 0.85rem;
                    padding: 0.4rem 0.9rem; border: 1px solid rgba(255,255,255,0.3);
                    border-radius: 5px; transition: background 0.2s; }
  .admin-header a:hover { background: rgba(255,255,255,0.1); }
  .stats-bar { background: white; padding: 1rem 2rem;
               border-bottom: 1px solid #e0e0e0; display: flex; gap: 2rem; }
  .stat { font-size: 0.9rem; color: #555; }
  .stat strong { font-size: 1.3rem; color: #1a1a2e; display: block; }
  .main { padding: 1.5rem 2rem; }
  .notice { background: #d4edda; color: #155724; border: 1px solid #c3e6cb;
            border-radius: 6px; padding: 0.6rem 1rem; margin-bottom: 1rem; font-size: 0.875rem; }
  table { width: 100%; background: white; border-radius: 8px; overflow: hidden;
          box-shadow: 0 1px 6px rgba(0,0,0,0.07); border-collapse: collapse; }
  th { background: #1a1a2e; color: white; padding: 0.75rem 1rem; text-align: left;
       font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
  td { padding: 0.75rem 1rem; border-bottom: 1px solid #f0f0f0; font-size: 0.875rem;
       vertical-align: middle; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: #fafafa; }
  .badge { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 999px;
           font-size: 0.75rem; font-weight: 700; color: white; text-transform: capitalize; }
  .actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }
  .btn-sm { padding: 0.3rem 0.7rem; border-radius: 5px; font-size: 0.8rem;
            font-weight: 600; cursor: pointer; text-decoration: none; border: none;
            display: inline-block; transition: opacity 0.2s; }
  .btn-sm:hover { opacity: 0.85; }
  .btn-view   { background: #2980b9; color: white; }
  .btn-pdf    { background: #27ae60; color: white; }
  .btn-delete { background: #c0392b; color: white; }
  .empty { text-align: center; padding: 3rem; color: #999; }
  @media (max-width: 768px) { .main { padding: 1rem; } th, td { padding: 0.5rem 0.6rem; } }
</style>
</head>
<body>
  <div class="admin-header">
    <h1>Agaram Scholarship Admin</h1>
    <a href="admin.php?logout=1">Logout</a>
  </div>

  <div class="stats-bar">
    <div class="stat"><strong><?= $total ?></strong>Total Submissions</div>
  </div>

  <div class="main">
    <?php if ($deleted): ?>
      <p class="notice"><?= htmlspecialchars($deleted) ?></p>
    <?php endif; ?>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Student Name</th>
          <th>EMIS No.</th>
          <th>School 10th</th>
          <th>School 12th</th>
          <th>Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <?php if (empty($rows)): ?>
          <tr><td colspan="8" class="empty">No submissions yet.</td></tr>
        <?php else: ?>
          <?php foreach ($rows as $r): ?>
            <?php $color = $statusColors[$r['status']] ?? '#888'; ?>
            <tr>
              <td><?= (int)$r['id'] ?></td>
              <td><?= htmlspecialchars($r['student_name']) ?></td>
              <td><?= htmlspecialchars($r['emis_number']) ?></td>
              <td><?= htmlspecialchars((string)$r['school10_name']) ?></td>
              <td><?= htmlspecialchars((string)$r['school12_name']) ?></td>
              <td><?= htmlspecialchars(substr($r['created_at'], 0, 10)) ?></td>
              <td><span class="badge" style="background:<?= $color ?>"><?= htmlspecialchars($r['status']) ?></span></td>
              <td class="actions">
                <a class="btn-sm btn-view" href="admin_view.php?id=<?= (int)$r['id'] ?>">View</a>
                <a class="btn-sm btn-pdf" href="pdf.php?id=<?= (int)$r['id'] ?>" target="_blank">PDF</a>
                <form method="POST" action="admin_delete.php" style="display:inline"
                      onsubmit="return confirm('Delete submission #<?= (int)$r['id'] ?>?')">
                  <input type="hidden" name="id" value="<?= (int)$r['id'] ?>">
                  <button class="btn-sm btn-delete" type="submit">Delete</button>
                </form>
              </td>
            </tr>
          <?php endforeach; ?>
        <?php endif; ?>
      </tbody>
    </table>
  </div>
</body>
</html>
