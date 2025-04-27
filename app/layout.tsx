import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Providers from "@/components/Providers.client";

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
  // All auth is client-side in Providers

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}