import { NextResponse } from 'next/server'
import axios from 'axios'
import { transformLatest, generateFallbackData, HealthData } from '@/lib/apiHelpers'

export async function GET() {
  try {
    const response = await axios.get('https://testit-theta.vercel.app/api/latest', { timeout: 5000 })
    const data: HealthData = transformLatest(response.data)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching health data:', error)
    return NextResponse.json(generateFallbackData())
  }
}
