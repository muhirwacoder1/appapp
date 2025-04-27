"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabaseClient } from '@/lib/supabaseClient'
import type { Session } from '@supabase/supabase-js'

interface SupabaseProviderProps {
  children: React.ReactNode
}

// Create auth context
const SupabaseAuthContext = createContext<{
  session: Session | null
  user: import('@supabase/supabase-js').User | null
}>({ session: null, user: null })

export default function SupabaseProvider({ children }: SupabaseProviderProps) {
  const [supabaseSession, setSupabaseSession] = useState<Session | null | undefined>(undefined)

  useEffect(() => {
    // get initial session
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSupabaseSession(session)
    })
    // listen for auth changes
    const { data: listener } = supabaseClient.auth.onAuthStateChange((_event, newSession) => {
      setSupabaseSession(newSession)
    })
    return () => listener?.unsubscribe()
  }, [])

  const user = supabaseSession?.user ?? null

  return (
    <SupabaseAuthContext.Provider value={{ session: supabaseSession, user }}>
      {children}
    </SupabaseAuthContext.Provider>
  )
}

export function useSupabaseAuth() {
  return useContext(SupabaseAuthContext)
}
