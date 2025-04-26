import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { LanguageProvider } from "@/context/language-context"
import { FloatingIsland } from "@/components/floating-island"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Foot Pressure Dashboard",
  description: "Monitor foot pressure and health stats in real-time",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LanguageProvider>
            <div className="flex h-screen bg-white">
              <Sidebar />
              <div className="flex-1 overflow-auto relative">
                <FloatingIsland />
                {children}
              </div>
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

import './globals.css'