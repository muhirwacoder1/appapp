"use client"

import { SimpleRegisterForm } from "@/components/simple-register-form"
import { useLanguage } from "@/context/language-context"

export default function RegisterInsolePage() {
  const { t } = useLanguage()
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{t.registerInsole.title}</h1>
        <p className="mt-2 text-gray-600">{t.registerInsole.description}</p>
      </div>
      <SimpleRegisterForm />
    </div>
  )
}
