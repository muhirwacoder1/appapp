"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Language = {
  code: string
  name: string
  flag?: string
}

const languages: Language[] = [
  { code: "US", name: "English", flag: "🇺🇸" },
  { code: "RW", name: "Kinyarwanda", flag: "🇷🇼" },
  { code: "FR", name: "French", flag: "🇫🇷" }
]

export function LanguageSettings() {
  const [selectedLanguage, setSelectedLanguage] = useState("US")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Language Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {languages.map((language) => (
            <motion.div
              key={language.code}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedLanguage(language.code)}
              className={`flex items-center p-4 rounded-lg cursor-pointer transition-all ${
                selectedLanguage === language.code
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{language.flag}</span>
                <div>
                  <div className="font-medium">{language.code}</div>
                  <div className="text-sm">{language.name}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
