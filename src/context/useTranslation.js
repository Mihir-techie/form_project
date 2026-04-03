import { useLang } from './LanguageContext'
import translations from '../constants/translations'

export function useTranslation() {
  const { lang } = useLang()

  // t('key') → string in current language
  const t = (key) => {
    const entry = translations[key]
    if (!entry) return key
    return entry[lang] ?? entry.ta
  }

  // opt(option) → label string from { ta, en, label? } option object
  const opt = (option) => {
    if (option.ta && option.en) return option[lang] ?? option.ta
    return option.label ?? ''
  }

  return { t, opt, lang }
}
