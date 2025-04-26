"use client"

import { useState } from "react"
import { Smartphone, Battery, Bluetooth, Plus } from "lucide-react"
import { motion } from "framer-motion"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

type Device = {
  id: string
  name: string
  connected: boolean
  batteryLevel: number
  lastConnected: string
  image?: string
}

// Sample devices data
const initialDevices: Device[] = [
  {
    id: "device-1",
    name: "Smart Insole #1",
    connected: true,
    batteryLevel: 85,
    lastConnected: "2025-03-25T14:30:00Z"
  }
]

export function DeviceManagement() {
  const [devices, setDevices] = useState<Device[]>(initialDevices)

  const toggleDeviceConnection = (deviceId: string) => {
    setDevices(devices.map(device => 
      device.id === deviceId 
        ? { ...device, connected: !device.connected } 
        : device
    ))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Devices</CardTitle>
        <CardDescription>
          Manage your foot pressure monitoring devices
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {devices.map((device) => (
          <motion.div
            key={device.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${device.connected ? 'bg-green-100' : 'bg-gray-100'} rounded-lg flex items-center justify-center`}>
                <Smartphone className={`w-6 h-6 ${device.connected ? 'text-green-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <h3 className="font-medium">{device.name}</h3>
                <p className="text-sm text-gray-500">
                  {device.connected 
                    ? 'Currently connected' 
                    : `Last connected: ${new Date(device.lastConnected).toLocaleDateString()}`}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Battery className={`h-5 w-5 ${
                  device.batteryLevel > 70 ? 'text-green-500' : 
                  device.batteryLevel > 30 ? 'text-yellow-500' : 
                  'text-red-500'
                }`} />
                <span className="text-sm font-medium">{device.batteryLevel}%</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Switch 
                  id={device.id}
                  checked={device.connected}
                  onCheckedChange={() => toggleDeviceConnection(device.id)}
                />
                <Label htmlFor={device.id} className="text-sm">
                  {device.connected ? 'Active' : 'Inactive'}
                </Label>
              </div>
            </div>
          </motion.div>
        ))}
        
        {devices.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400">
            <Bluetooth className="h-12 w-12 mb-4 opacity-50" />
            <p className="text-lg">No devices connected</p>
            <p className="text-sm">Connect a device to start monitoring</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Add New Device
        </Button>
      </CardFooter>
    </Card>
  )
}
