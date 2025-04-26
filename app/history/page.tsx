"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface HistoricalDataPoint {
  heel: number
  middle: number
  toe: number
  heartRate: number
  temperature: number
  timestamp: string
}

// Backend API URL - change this to your Express server URL
const API_BASE_URL = ""

export default function HistoryPage() {
  const [data, setData] = useState<HistoricalDataPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHistoricalData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Fetch from our Express backend
        const response = await fetch(`${API_BASE_URL}/api/historical-data`)

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const historicalData = await response.json()
        setData(historicalData)
      } catch (err) {
        console.error("Failed to fetch historical data:", err)
        setError("Failed to connect to the backend server. Please make sure the Express server is running.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistoricalData()
  }, [])

  // Format data for charts
  const formattedData = data.map((point) => ({
    time: new Date(point.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    heel: point.heel,
    middle: point.middle,
    toe: point.toe,
    heartRate: point.heartRate,
    temperature: point.temperature,
  }))

  if (isLoading) {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6">Health History</h1>
        <div className="flex items-center justify-center h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6">Health History</h1>
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">{error}</div>
      </div>
    )
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Health History</h1>

      <Tabs defaultValue="pressure">
        <TabsList className="mb-6">
          <TabsTrigger value="pressure">Foot Pressure</TabsTrigger>
          <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
        </TabsList>

        <TabsContent value="pressure">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">24-Hour Foot Pressure History</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formattedData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 200]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="heel" stroke="#60A5FA" name="Heel (mmHg)" />
                  <Line type="monotone" dataKey="middle" stroke="#FBBF24" name="Middle (mmHg)" />
                  <Line type="monotone" dataKey="toe" stroke="#4ADE80" name="Toe (mmHg)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="vitals">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">24-Hour Vital Signs History</h2>
            <div className="grid grid-cols-1 gap-6">
              <div className="h-[300px]">
                <h3 className="text-lg font-medium mb-2">Heart Rate</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={formattedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[50, 110]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="heartRate" stroke="#F87171" name="Heart Rate (bpm)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="h-[300px]">
                <h3 className="text-lg font-medium mb-2">Temperature</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={formattedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[36, 38]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="temperature" stroke="#60A5FA" name="Temperature (°C)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6 text-sm text-gray-500">
        <p>Data is collected every hour. Last updated: {new Date().toLocaleString()}</p>
      </div>
    </div>
  )
}
