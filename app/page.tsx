"use client"

import { RealTimeMonitor } from "@/components/real-time-monitor"
import { useSupabaseAuth } from '@/components/SupabaseProvider.client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const { session } = useSupabaseAuth() || { session: null }
  const router = useRouter()
  useEffect(() => {
    if (session === null) router.replace('/login')
  }, [session, router])
  if (session === undefined) {
    return <div className="p-10">Loading...</div>
  }
  return (
    <div className="p-10">
      <RealTimeMonitor />
    </div>
  )
}
