"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseClient } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin + '/' }
    })
    if (error) {
      setError(error.message)
    } else {
      setMessage('Check your email for the confirmation link.')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Sign Up for Godwatch</h1>
      <form onSubmit={handleSignUp} className="space-y-4 w-full max-w-sm">
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
        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
          Sign Up
        </Button>
      </form>
      {error && <p className="mt-4 text-red-600">{error}</p>}
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  )
}
