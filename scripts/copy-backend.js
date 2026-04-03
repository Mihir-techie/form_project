/**
 * Post-build script: copies PHP backend and uploads folder into dist/.
 * Run automatically via: npm run build
 */
import { cpSync, mkdirSync, existsSync, copyFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const dist = resolve(root, 'dist')

function step(msg) {
  console.log(`  ✓ ${msg}`)
}

// ── Copy php/ → dist/php/ ──────────────────────────────────
cpSync(resolve(root, 'php'), resolve(dist, 'php'), { recursive: true })
step('Copied php/ → dist/php/')

// ── Create dist/uploads/ ───────────────────────────────────
const uploadsDir = resolve(dist, 'uploads')
mkdirSync(uploadsDir, { recursive: true })
step('Created dist/uploads/')

// ── Copy uploads/.htaccess → dist/uploads/.htaccess ────────
const srcHtaccess = resolve(root, 'uploads', '.htaccess')
if (existsSync(srcHtaccess)) {
  copyFileSync(srcHtaccess, resolve(uploadsDir, '.htaccess'))
  step('Copied uploads/.htaccess → dist/uploads/.htaccess')
} else {
  console.warn('  ! uploads/.htaccess not found — skipping')
}

// ── Copy root .htaccess → dist/.htaccess ──────────────────
const rootHtaccess = resolve(root, '.htaccess')
if (existsSync(rootHtaccess)) {
  copyFileSync(rootHtaccess, resolve(dist, '.htaccess'))
  step('Copied .htaccess → dist/.htaccess')
} else {
  console.warn('  ! .htaccess not found — skipping')
}

console.log('\nBackend copy complete.')
