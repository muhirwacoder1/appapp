"use client"

import { useState, useRef } from "react"
import { User, Mail, Phone, MapPin, Edit, Camera, Check, X, Smartphone, Globe, Battery, Calendar, ChevronRight, Plus } from "lucide-react"
import { motion } from "framer-motion"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useLanguage } from "@/context/language-context"
import Link from "next/link"

// Initial profile data
const initialProfile = {
  fullName: "Moni Ray",
  email: "moni.ray@example.com",
  phone: "+1234567890",
  location: "New York, USA",
  profilePicture: ""
}

// Connected devices data
const connectedDevices = [
  {
    id: 1,
    name: "Smart Insole #1",
    status: "active",
    lastConnected: "2025-03-25T14:30:00Z",
    batteryLevel: 85,
    image: "/device-insole.png" // You'll need to add this image to your public folder
  }
]

export function ProfileForm() {
  const { t, languages, currentLanguage, setLanguage, getCurrentLanguageInfo } = useLanguage()
  const [profile, setProfile] = useState(initialProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [tempProfile, setTempProfile] = useState(initialProfile)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Handle profile picture upload
  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
        setTempProfile({
          ...tempProfile,
          profilePicture: reader.result as string
        })
      }
      reader.readAsDataURL(file)
    }
  }
  
  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }
  
  // Start editing profile
  const startEditing = () => {
    setTempProfile(profile)
    setIsEditing(true)
  }
  
  // Cancel editing
  const cancelEditing = () => {
    setIsEditing(false)
    setPreviewImage(null)
  }
  
  // Save profile changes
  const saveProfile = () => {
    setProfile(tempProfile)
    setIsEditing(false)
    // Here you would typically send the updated profile to your backend
  }
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTempProfile({
      ...tempProfile,
      [name]: value
    })
  }

  // Handle language change
  const handleLanguageChange = (value: string) => {
    setLanguage(value)
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Tabs defaultValue="information" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-xl p-1 mb-6">
          <TabsTrigger 
            value="information" 
            className="rounded-lg py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all"
          >
            {t.profile.information}
          </TabsTrigger>
          <TabsTrigger 
            value="devices" 
            className="rounded-lg py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all"
          >
            {t.profile.devices}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="information">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Summary Card */}
            <Card className="bg-white shadow-md rounded-xl overflow-hidden border-0 md:col-span-1">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 h-32"></div>
              <div className="px-6 pb-6 -mt-16 flex flex-col items-center">
                <div className="relative group mb-4">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg bg-white">
                    {(profile.profilePicture || previewImage) ? (
                      <AvatarImage 
                        src={previewImage || profile.profilePicture} 
                        alt={profile.fullName} 
                      />
                    ) : (
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-4xl">
                        {profile.fullName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  
                  {isEditing && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 cursor-pointer"
                      onClick={triggerFileInput}
                    >
                      <Camera className="w-8 h-8 text-white" />
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        className="hidden" 
                        accept="image/*"
                        onChange={handleProfilePictureUpload}
                      />
                    </motion.div>
                  )}
                </div>
                
                <h2 className="text-xl font-semibold text-gray-800 text-center">{profile.fullName}</h2>
                <p className="text-gray-500 text-sm mt-1">{profile.location}</p>
                
                <div className="w-full mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-gray-700 p-3 rounded-lg bg-gray-50">
                    <Mail className="h-5 w-5 text-blue-500" />
                    <span className="text-sm">{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 p-3 rounded-lg bg-gray-50">
                    <Phone className="h-5 w-5 text-blue-500" />
                    <span className="text-sm">{profile.phone}</span>
                  </div>
                </div>
                
                {!isEditing && (
                  <Button 
                    onClick={startEditing} 
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Edit className="mr-2 h-4 w-4" /> {t.profile.updateProfile}
                  </Button>
                )}
              </div>
            </Card>

            {/* Profile Edit Card */}
            <Card className="bg-white shadow-md rounded-xl overflow-hidden border-0 md:col-span-2">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
                <CardTitle className="text-xl font-semibold">{t.profile.information}</CardTitle>
                <CardDescription className="text-blue-100 mt-1">
                  {isEditing ? "Edit your profile information below" : "Your personal information and settings"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {isEditing ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="flex items-center gap-2 text-gray-700">
                          <User className="h-4 w-4 text-blue-500" /> {t.profile.fullName}
                        </Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={tempProfile.fullName}
                          onChange={handleInputChange}
                          className="h-11"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2 text-gray-700">
                          <Mail className="h-4 w-4 text-blue-500" /> {t.profile.email}
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={tempProfile.email}
                          onChange={handleInputChange}
                          className="h-11"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2 text-gray-700">
                          <Phone className="h-4 w-4 text-blue-500" /> {t.profile.phone}
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={tempProfile.phone}
                          onChange={handleInputChange}
                          className="h-11"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location" className="flex items-center gap-2 text-gray-700">
                          <MapPin className="h-4 w-4 text-blue-500" /> {t.profile.location}
                        </Label>
                        <Input
                          id="location"
                          name="location"
                          value={tempProfile.location}
                          onChange={handleInputChange}
                          className="h-11"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 pt-4">
                      <Button variant="outline" onClick={cancelEditing} className="border-gray-300">
                        <X className="mr-2 h-4 w-4" /> {t.common.cancel}
                      </Button>
                      <Button onClick={saveProfile} className="bg-blue-600 hover:bg-blue-700">
                        <Check className="mr-2 h-4 w-4" /> {t.profile.saveChanges}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-500">{t.profile.fullName}</Label>
                        <div className="p-3 rounded-md bg-gray-50 border border-gray-200 text-gray-800">
                          {profile.fullName}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-500">{t.profile.email}</Label>
                        <div className="p-3 rounded-md bg-gray-50 border border-gray-200 text-gray-800">
                          {profile.email}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-500">{t.profile.phone}</Label>
                        <div className="p-3 rounded-md bg-gray-50 border border-gray-200 text-gray-800">
                          {profile.phone}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-500">{t.profile.location}</Label>
                        <div className="p-3 rounded-md bg-gray-50 border border-gray-200 text-gray-800">
                          {profile.location}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Language Selection */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-800">
                      <Globe className="h-5 w-5 text-blue-500" /> 
                      <h3 className="text-lg font-semibold">{t.profile.language}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{t.profile.changeLanguage}</p>
                    
                    <RadioGroup 
                      value={currentLanguage} 
                      onValueChange={handleLanguageChange}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      {languages.map((language) => (
                        <div 
                          key={language.code} 
                          className={`flex items-center p-3 rounded-lg border ${
                            currentLanguage === language.code 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          } transition-all cursor-pointer`}
                          onClick={() => handleLanguageChange(language.code)}
                        >
                          <RadioGroupItem 
                            value={language.code} 
                            id={`language-${language.code}`} 
                            className="sr-only"
                          />
                          <div className="flex items-center gap-3 w-full">
                            <div className="text-2xl">{language.flag}</div>
                            <div>
                              <div className="font-medium text-gray-800">{language.name}</div>
                              <div className="text-sm text-gray-600">{language.nativeName}</div>
                            </div>
                            {currentLanguage === language.code && (
                              <div className="ml-auto">
                                <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="devices">
          <Card className="bg-white shadow-md rounded-xl overflow-hidden border-0">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
              <CardTitle className="text-xl font-semibold">{t.profile.connectedDevices}</CardTitle>
              <CardDescription className="text-blue-100 mt-1">
                {t.profile.manageDevices}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {connectedDevices.map((device) => (
                  <div 
                    key={device.id}
                    className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="h-24 bg-gradient-to-r from-green-400 to-green-500 flex items-center px-6">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                        <img 
                          src={device.image} 
                          alt={device.name}
                          className="w-10 h-10 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://placehold.co/200x200/e2e8f0/64748b?text=Device";
                          }}
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-white">{device.name}</h3>
                        <div className="flex items-center mt-1">
                          <div className={`w-2 h-2 rounded-full ${device.status === 'active' ? 'bg-green-200' : 'bg-gray-300'} mr-2`}></div>
                          <span className="text-sm text-white opacity-90">
                            {device.status === 'active' ? t.profile.active : t.profile.inactive}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">{t.profile.lastConnected}</span>
                        </div>
                        <span className="text-sm font-medium">
                          {new Date(device.lastConnected).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Battery className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">{t.profile.battery}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                            <div 
                              className={`h-full rounded-full ${
                                device.batteryLevel > 60 ? 'bg-green-500' : 
                                device.batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${device.batteryLevel}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{device.batteryLevel}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-gray-700">Status</span>
                        <div className="flex items-center gap-2">
                          <Switch id={`device-${device.id}`} defaultChecked={device.status === 'active'} />
                          <Label htmlFor={`device-${device.id}`} className="text-sm text-gray-700 cursor-pointer">
                            {device.status === 'active' ? 'On' : 'Off'}
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Add New Device Card */}
                <div className="bg-white rounded-xl overflow-hidden border border-dashed border-gray-300 flex flex-col items-center justify-center p-8 h-full min-h-[220px]">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Plus className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">{t.profile.addNewDevice}</h3>
                  <p className="text-sm text-gray-500 text-center mb-4">Connect a new smart insole to your account</p>
                  <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                    <Link href="/register-insole">
                      {t.profile.addNewDevice}
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
