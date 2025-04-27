"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabaseClient } from '@/lib/supabaseClient'
import type { Session } from '@supabase/supabase-js'

interface SupabaseProviderProps {
  session: Session | null
  children: React.ReactNode
}

// Create auth context
const SupabaseAuthContext = createContext<{
  session: import('@supabase/supabase-js').Session | null;
  user: import('@supabase/supabase-js').User | null;
}>({ session: null, user: null });

export default function SupabaseProvider({ session, children }: SupabaseProviderProps) {
  const [supabaseSession, setSupabaseSession] = useState(session);
  useEffect(() => {
    const { data: listener } = supabaseClient.auth.onAuthStateChange((_event, newSession) => {
      setSupabaseSession(newSession);
    });
    return () => listener?.unsubscribe();
  }, []);
  const user = supabaseSession?.user ?? null;
  return (
    <SupabaseAuthContext.Provider value={{ session: supabaseSession, user }}>
      {children}
    </SupabaseAuthContext.Provider>
  );
}

export function useSupabaseAuth() {
  return useContext(SupabaseAuthContext);
}
