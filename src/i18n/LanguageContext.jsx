import { createContext, useContext, useState, useCallback } from 'react'
import tr from './tr.json'
import en from './en.json'
import de from './de.json'

const translations = { tr, en, de }
const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('lang') || 'tr'
    document.documentElement.lang = saved
    return saved
  })

  const switchLang = useCallback((newLang) => {
    setLang(newLang)
    localStorage.setItem('lang', newLang)
    document.documentElement.lang = newLang
  }, [])

  const t = useCallback((key) => {
    return translations[lang]?.[key] || translations.tr[key] || key
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, switchLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useTranslation must be used within LanguageProvider')
  return ctx
}
