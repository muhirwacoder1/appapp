import { NextResponse } from 'next/server'
import axios from 'axios'
import { transformLatest, generateHistoricalData, generateFallbackHistoricalData, HealthData } from '@/lib/apiHelpers'

export async function GET() {
  try {
    const response = await axios.get('https://testit-theta.vercel.app/api/latest', { timeout: 5000 })
    const latest: HealthData = transformLatest(response.data)
    const historical = generateHistoricalData(latest)
    return NextResponse.json(historical)
  } catch (error) {
    console.error('Error fetching historical data:', error)
    return NextResponse.json(generateFallbackHistoricalData())
  }
}
