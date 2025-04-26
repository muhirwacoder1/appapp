"use client"

import { useState } from "react"
import { Mail, Smartphone, User, QrCode, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { useLanguage } from "@/context/language-context"

export function SimpleRegisterForm() {
  const { t } = useLanguage()
  const [serialNumber, setSerialNumber] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [fullName, setFullName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would handle the form submission
    console.log({ serialNumber, email, phone, fullName })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Main Form Card */}
      <Card className="md:col-span-2 bg-white shadow-md rounded-xl overflow-hidden border-0">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
          <CardTitle className="text-xl font-semibold">{t.registerInsole.title}</CardTitle>
          <CardDescription className="text-blue-100 mt-1">
            {t.registerInsole.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Serial Number Field */}
            <div className="space-y-2">
              <Label 
                htmlFor="serialNumber" 
                className="text-sm font-medium text-gray-700 flex items-center gap-2"
              >
                <QrCode className="h-4 w-4 text-blue-500" />
                {t.registerInsole.serialNumber}
              </Label>
              <Input
                id="serialNumber"
                placeholder={t.registerInsole.enterSerialNumber}
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                className="h-11"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label 
                htmlFor="email" 
                className="text-sm font-medium text-gray-700 flex items-center gap-2"
              >
                <Mail className="h-4 w-4 text-blue-500" />
                {t.registerInsole.email}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={t.registerInsole.enterEmail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
              />
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <Label 
                htmlFor="phone" 
                className="text-sm font-medium text-gray-700 flex items-center gap-2"
              >
                <Smartphone className="h-4 w-4 text-blue-500" />
                {t.registerInsole.phone}
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder={t.registerInsole.enterPhone}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-11"
              />
            </div>

            {/* Full Name Field */}
            <div className="space-y-2">
              <Label 
                htmlFor="fullName" 
                className="text-sm font-medium text-gray-700 flex items-center gap-2"
              >
                <User className="h-4 w-4 text-blue-500" />
                {t.registerInsole.fullName}
              </Label>
              <Input
                id="fullName"
                placeholder={t.registerInsole.enterFullName}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-11"
              />
            </div>

            {/* Register Button */}
            <Button 
              type="submit" 
              className="w-full h-12 mt-4 text-base font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center gap-2"
            >
              {t.registerInsole.register}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card className="bg-white shadow-md rounded-xl overflow-hidden border-0">
        <div className="h-40 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
            <img 
              src="/device-insole.png" 
              alt="Smart Insole" 
              className="w-16 h-16 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://placehold.co/200x200/e2e8f0/64748b?text=Insole";
              }}
            />
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{t.registerInsole.benefits}</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                <span className="text-blue-600 text-xs">1</span>
              </div>
              <span>{t.registerInsole.benefit1}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                <span className="text-blue-600 text-xs">2</span>
              </div>
              <span>{t.registerInsole.benefit2}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                <span className="text-blue-600 text-xs">3</span>
              </div>
              <span>{t.registerInsole.benefit3}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                <span className="text-blue-600 text-xs">4</span>
              </div>
              <span>{t.registerInsole.benefit4}</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            {t.registerInsole.footerText}
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
