<?php
/**
 * Shared helpers for admin_view.php and pdf.php.
 * Provides: val(), adminCardCss(), pdfCss()
 */

/**
 * Safely display a value from decoded JSON data.
 * Returns htmlspecialchars'd value or a dash placeholder.
 */
function val(array $data, string $key, string $default = '—'): string
{
    $v = $data[$key] ?? '';
    if ($v === '' || $v === null) return $default;
    return htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8');
}

/** Decode a JSON array field; returns PHP array. */
function jsonArr(array $data, string $key): array
{
    $raw = $data[$key] ?? '[]';
    if (is_array($raw)) return $raw;
    return json_decode((string)$raw, true) ?? [];
}

/** Shared CSS for admin card views (admin_view.php). */
function adminCardCss(): string
{
    return '
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{font-family:system-ui,sans-serif;background:#f0f2f5;color:#333}
  .admin-header{background:#1a1a2e;color:white;padding:1rem 2rem;
    display:flex;align-items:center;justify-content:space-between}
  .admin-header h1{font-size:1.1rem;font-weight:700}
  .nav-btns{display:flex;gap:.5rem}
  .btn-nav{padding:.4rem .9rem;border-radius:5px;font-size:.85rem;font-weight:600;
    cursor:pointer;text-decoration:none;border:none;display:inline-block}
  .btn-back{background:rgba(255,255,255,.15);color:white}
  .btn-pdf{background:#27ae60;color:white}
  .main{padding:1.5rem 2rem;max-width:960px;margin:0 auto}
  .notice{background:#d4edda;color:#155724;border:1px solid #c3e6cb;
    border-radius:6px;padding:.6rem 1rem;margin-bottom:1rem;font-size:.875rem}
  .card{background:white;border-radius:8px;box-shadow:0 1px 6px rgba(0,0,0,.07);
    margin-bottom:1.25rem;overflow:hidden}
  .section-head{padding:.65rem 1.25rem;font-weight:700;font-size:.8rem;
    text-transform:uppercase;letter-spacing:.05em;color:#1a1a2e;
    border-left:4px solid #e8621a;background:#fafafa;border-bottom:1px solid #eee}
  .field-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr))}
  .fld{padding:.6rem 1.25rem;border-bottom:1px solid #f5f5f5}
  .fld label{font-size:.72rem;font-weight:600;color:#888;text-transform:uppercase;
    letter-spacing:.04em;display:block;margin-bottom:.15rem}
  .fld span{font-size:.875rem;color:#1a1a2e}
  .badge{display:inline-block;padding:.2rem .7rem;border-radius:999px;
    font-size:.8rem;font-weight:700;color:white}
  table.inner{width:100%;border-collapse:collapse;font-size:.82rem}
  table.inner th{background:#f5f5f5;padding:.45rem 1rem;text-align:left;
    font-size:.75rem;color:#666;font-weight:700;text-transform:uppercase}
  table.inner td{padding:.45rem 1rem;border-bottom:1px solid #f5f5f5}
  .file-list{padding:.75rem 1.25rem}
  .file-link{color:#2980b9;font-size:.875rem}
  .status-form{padding:.9rem 1.25rem;display:flex;align-items:center;gap:1rem;flex-wrap:wrap}
  select{padding:.4rem .65rem;border:1px solid #ddd;border-radius:6px;font-size:.875rem}
  .btn-save{padding:.4rem 1.1rem;background:#e8621a;color:white;border:none;
    border-radius:6px;font-weight:600;cursor:pointer;font-size:.875rem}
  @media(max-width:600px){.main{padding:1rem}.field-grid{grid-template-columns:1fr}}';
}

/** Shared CSS for pdf.php print view. */
function pdfCss(): string
{
    return '
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{font-family:"Noto Sans Tamil","Noto Sans",sans-serif;font-size:13px;
    color:#1a1a1a;background:#f5f5f5}
  .page{max-width:860px;margin:1.5rem auto;background:white;
    padding:2rem;box-shadow:0 2px 16px rgba(0,0,0,.1)}
  .doc-header{text-align:center;border-bottom:3px double #e8621a;
    padding-bottom:1rem;margin-bottom:1.25rem}
  .org-name{font-size:1.3rem;font-weight:700;color:#1a1a2e}
  .org-addr{font-size:.78rem;color:#666;margin-top:.2rem}
  .app-id{margin-top:.4rem;font-size:.85rem;color:#e8621a;font-weight:600}
  .sec-head{font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;
    color:#1a1a2e;padding:.35rem .75rem;border-left:4px solid #e8621a;
    background:#fdf4ee;margin:1rem 0 .6rem}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:0;border:1px solid #eee}
  .fld{padding:.3rem .6rem;border-bottom:1px solid #f0f0f0}
  .fld:nth-child(odd){border-right:1px solid #f0f0f0}
  .flabel{display:block;font-size:.68rem;font-weight:600;color:#999;
    text-transform:uppercase;letter-spacing:.04em}
  .fval{display:block;font-size:.82rem;color:#1a1a2e;
    font-family:"Noto Sans Tamil","Noto Sans",sans-serif}
  .fld-full{grid-column:1/-1}
  table.fam{width:100%;border-collapse:collapse;font-size:.78rem;margin-top:.4rem}
  table.fam th{background:#f5f5f5;padding:.35rem .5rem;text-align:left;
    border:1px solid #ddd;font-weight:700}
  table.fam td{padding:.35rem .5rem;border:1px solid #ddd}
  .doc-footer{margin-top:1.5rem;padding-top:.75rem;border-top:1px solid #e0e0e0;
    font-size:.75rem;color:#888;text-align:center}
  .no-print{display:flex;gap:1rem;justify-content:center;margin-bottom:1.25rem}
  .btn-print{padding:.55rem 1.4rem;background:#e8621a;color:white;border:none;
    border-radius:6px;font-size:.875rem;font-weight:600;cursor:pointer}
  .btn-back-link{padding:.55rem 1.1rem;background:#eee;color:#333;border:none;
    border-radius:6px;font-size:.875rem;font-weight:600;cursor:pointer;text-decoration:none}
  @media print{body{background:white}.page{box-shadow:none;margin:0;max-width:100%}
    .no-print{display:none!important}}';
}
