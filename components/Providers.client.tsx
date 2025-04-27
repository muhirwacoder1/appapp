"use client";

import React, { useEffect } from 'react'
import SupabaseProvider, { useSupabaseAuth } from '@/components/SupabaseProvider.client'
import { LanguageProvider } from '@/context/language-context'
import { Sidebar } from '@/components/sidebar'
import { FloatingIsland } from '@/components/floating-island'
import { usePathname, useRouter } from 'next/navigation'

// ThemeProvider removed to avoid dynamic html class injection/hydration mismatch

// Auth guard to protect routes and handle redirects based on auth state
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { session } = useSupabaseAuth() || { session: null }
  const router = useRouter()
  const pathname = usePathname()
  useEffect(() => {
    if (session === null && !pathname.startsWith('/signup') && !pathname.startsWith('/login')) {
      router.replace('/login')
    }
  }, [session, pathname, router])
  if (session === undefined) return <div className="p-10">Loading...</div>
  return <>{children}</>
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SupabaseProvider>
      <AuthGuard>
        <LanguageProvider>
          <div className="flex h-screen bg-white">
            <Sidebar />
            <div className="flex-1 overflow-auto relative">
              <FloatingIsland />
              {children}
            </div>
          </div>
        </LanguageProvider>
      </AuthGuard>
    </SupabaseProvider>
  )
}
