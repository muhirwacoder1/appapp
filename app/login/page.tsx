"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseClient } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') router.replace('/')
    })
    return () => subscription.unsubscribe()
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Login to Godwatch</h1>
      <form onSubmit={handleLogin} className="space-y-4 w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Login
        </Button>
      </form>
      {error && <p className="mt-4 text-red-600">{error}</p>}
      <p className="mt-4">
        Don't have an account? <Link href="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
      </p>
    </div>
  )
}
