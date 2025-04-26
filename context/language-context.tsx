"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { getTranslations, languages, TranslationKeys, Language } from "@/lib/translations"

// Define the context type
type LanguageContextType = {
  currentLanguage: string
  setLanguage: (code: string) => void
  t: TranslationKeys
  languages: Language[]
  getCurrentLanguageInfo: () => Language
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: "en",
  setLanguage: () => {},
  t: getTranslations("en"),
  languages: languages,
  getCurrentLanguageInfo: () => languages[0]
})

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext)

// Provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Try to get the language from localStorage, default to "en"
  const [currentLanguage, setCurrentLanguage] = useState<string>("en")
  const [translations, setTranslations] = useState<TranslationKeys>(getTranslations("en"))

  // Initialize language from localStorage when component mounts
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en"
    setCurrentLanguage(savedLanguage)
    setTranslations(getTranslations(savedLanguage))
  }, [])

  // Function to change the language
  const setLanguage = (code: string) => {
    setCurrentLanguage(code)
    setTranslations(getTranslations(code))
    localStorage.setItem("language", code)
    // You could also update the HTML lang attribute here
    document.documentElement.lang = code
  }

  // Get the current language information
  const getCurrentLanguageInfo = (): Language => {
    return languages.find(lang => lang.code === currentLanguage) || languages[0]
  }

  // Context value
  const contextValue: LanguageContextType = {
    currentLanguage,
    setLanguage,
    t: translations,
    languages,
    getCurrentLanguageInfo
  }

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}
