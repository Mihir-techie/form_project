import { useRef, useState, useEffect } from 'react'
import { useLang } from '../../context/LanguageContext'

const LANGUAGES = [
  { code: 'ta', flag: '🇮🇳', name: 'தமிழ்', subtitle: 'Tamil' },
  { code: 'en', flag: '🌍', name: 'English', subtitle: 'ஆங்கிலம்' },
]

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0]

  useEffect(() => {
    function handleMouseDown(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [])

  return (
    <div className="lang-switcher" ref={containerRef}>
      {open && (
        <div className="lang-switcher__panel">
          <p className="lang-switcher__heading">Change Language</p>
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              className={`lang-switcher__option${lang === l.code ? ' lang-switcher__option--active' : ''}`}
              onClick={() => { setLang(l.code); setOpen(false) }}
            >
              <span className="lang-switcher__option-flag">{l.flag}</span>
              <span className="lang-switcher__option-text">
                <strong>{l.name}</strong>
                <small>{l.subtitle}</small>
              </span>
              {lang === l.code && <span className="lang-switcher__check">✓</span>}
            </button>
          ))}
        </div>
      )}

      <button
        type="button"
        className="lang-switcher__trigger"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>🌐</span>
        <span>{current.name}</span>
        <span className={`lang-switcher__chevron${open ? ' lang-switcher__chevron--up' : ''}`}>▾</span>
      </button>
    </div>
  )
}
