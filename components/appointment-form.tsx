"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Clock, User, Check, Search, ArrowRight, MapPin } from "lucide-react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// Healthcare professionals data
const healthcareProfessionals = [
  {
    id: 1,
    name: "Nyirarukundo Grace",
    title: "Orthopaedist",
    availability: ["9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM"],
    color: "bg-blue-100",
    accent: "bg-blue-500",
  },
  {
    id: 2,
    name: "Dr. Kalisa Jackson",
    title: "Orthopedic Surgeon",
    availability: ["11:00 AM", "1:00 PM", "4:00 PM", "5:00 PM"],
    color: "bg-green-100",
    accent: "bg-green-500",
  },
  {
    id: 3,
    name: "Irera Peace",
    title: "Physical Therapist",
    availability: ["8:00 AM", "12:00 PM", "3:30 PM", "4:30 PM"],
    color: "bg-purple-100",
    accent: "bg-purple-500",
  },
]

// Categories for filtering
const categories = [
  { id: "all", name: "All" },
  { id: "orthopaedist", name: "Orthopaedist" },
  { id: "surgeon", name: "Surgeon" },
  { id: "therapist", name: "Therapist" }
]

export function AppointmentForm() {
  const [date, setDate] = useState<Date>()
  const [selectedProfessional, setSelectedProfessional] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [bookingStep, setBookingStep] = useState(1)
  const [bookingComplete, setBookingComplete] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const handleProfessionalSelect = (id: number) => {
    setSelectedProfessional(id)
    setSelectedTime(null)
    if (bookingStep === 1) setBookingStep(2)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    if (bookingStep === 2) setBookingStep(3)
  }

  const handleBookAppointment = () => {
    // Here you would typically send the booking data to your backend
    setBookingComplete(true)
  }

  const resetForm = () => {
    setDate(undefined)
    setSelectedProfessional(null)
    setSelectedTime(null)
    setBookingStep(1)
    setBookingComplete(false)
  }

  // Get the selected professional's data
  const professional = selectedProfessional 
    ? healthcareProfessionals.find(p => p.id === selectedProfessional) 
    : null

  // Filter professionals based on search and category
  const filteredProfessionals = healthcareProfessionals.filter(pro => {
    const matchesSearch = searchQuery === "" || 
      pro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pro.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || 
      pro.title.toLowerCase().includes(selectedCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });

  if (bookingComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-lg"
      >
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Appointment Confirmed!</h2>
        <p className="text-gray-600 mb-6 text-center">
          Your appointment has been scheduled for {date ? format(date, "PPP") : ""} at {selectedTime} with {professional?.name}.
        </p>
        <Button onClick={resetForm} className="bg-blue-600 hover:bg-blue-700">
          Book Another Appointment
        </Button>
      </motion.div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Tabs defaultValue="booking" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-xl p-1">
          <TabsTrigger 
            value="booking" 
            className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Book Appointment
          </TabsTrigger>
          <TabsTrigger 
            value="upcoming" 
            className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Upcoming Appointments
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="booking" className="mt-6">
          {/* Search and Filter Section */}
          <Card className="mb-6 border-0 shadow-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
              <CardTitle className="text-xl font-semibold">Find Healthcare Professionals</CardTitle>
              <CardDescription className="text-blue-100">
                Search for specialists and book your appointment
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Input
                    placeholder="Search by name or specialty"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-11 pr-10"
                  />
                  <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap",
                        selectedCategory === category.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      )}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Booking Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1: Select Date */}
            <Card className={cn(
              "col-span-1 transition-all duration-300 bg-white shadow-sm border-0 rounded-xl overflow-hidden",
              bookingStep === 1 ? "ring-2 ring-blue-500" : ""
            )}>
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 p-6">
                <CardTitle className="flex items-center text-gray-800">
                  <CalendarIcon className="mr-2 h-5 w-5 text-blue-600" />
                  Select Date
                </CardTitle>
                <CardDescription className="text-gray-600">Choose your preferred appointment date</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border-gray-200 h-11",
                        !date && "text-gray-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-blue-600" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                      className="rounded-md border-0"
                    />
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>

            {/* Step 2: Select Healthcare Professional */}
            <Card className={cn(
              "col-span-1 transition-all duration-300 bg-white shadow-sm border-0 rounded-xl overflow-hidden",
              bookingStep === 2 ? "ring-2 ring-blue-500" : ""
            )}>
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 p-6">
                <CardTitle className="flex items-center text-gray-800">
                  <User className="mr-2 h-5 w-5 text-blue-600" />
                  Select Professional
                </CardTitle>
                <CardDescription className="text-gray-600">Choose your healthcare provider</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                {filteredProfessionals.length > 0 ? (
                  filteredProfessionals.map((professional) => (
                    <motion.div
                      key={professional.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleProfessionalSelect(professional.id)}
                      className={cn(
                        "flex items-center p-4 rounded-xl cursor-pointer transition-all",
                        selectedProfessional === professional.id
                          ? "bg-blue-50 border-2 border-blue-500"
                          : "bg-white hover:bg-gray-50 border border-gray-200"
                      )}
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0 bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-lg">
                          {professional.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{professional.name}</p>
                        <p className="text-sm text-gray-500">{professional.title}</p>
                      </div>
                      {selectedProfessional === professional.id && (
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Check className="h-5 w-5 text-blue-600" />
                        </div>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                    <User className="h-12 w-12 mb-4 opacity-50" />
                    <p className="text-lg">No professionals found</p>
                    <p className="text-sm">Try adjusting your search criteria</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Step 3: Select Time */}
            <Card className={cn(
              "col-span-1 transition-all duration-300 bg-white shadow-sm border-0 rounded-xl overflow-hidden",
              bookingStep === 3 ? "ring-2 ring-blue-500" : ""
            )}>
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 p-6">
                <CardTitle className="flex items-center text-gray-800">
                  <Clock className="mr-2 h-5 w-5 text-blue-600" />
                  Select Time
                </CardTitle>
                <CardDescription className="text-gray-600">Choose an available time slot</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {selectedProfessional ? (
                  <div className="grid grid-cols-2 gap-2">
                    {professional?.availability.map((time) => (
                      <motion.button
                        key={time}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleTimeSelect(time)}
                        className={cn(
                          "p-3 rounded-lg text-sm font-medium transition-all",
                          selectedTime === time
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        )}
                      >
                        {time}
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                    <Clock className="h-8 w-8 mb-2 opacity-50" />
                    <p>Select a professional first</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Summary and Booking Button */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: date && selectedProfessional && selectedTime ? 1 : 0,
              height: date && selectedProfessional && selectedTime ? "auto" : 0
            }}
            transition={{ duration: 0.3 }}
            className="mt-8 bg-white rounded-xl p-6 overflow-hidden shadow-sm border-0"
          >
            {date && selectedProfessional && selectedTime && (
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Appointment Summary</h3>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-gray-700">{format(date, "PPP")}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-gray-700">{selectedTime}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-gray-700">{professional?.name} ({professional?.title})</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-gray-700">Main Hospital, Floor 3</span>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={handleBookAppointment}
                  className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 rounded-lg px-6 py-3 h-auto"
                >
                  <span>Confirm Appointment</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </motion.div>
        </TabsContent>
        
        <TabsContent value="upcoming" className="mt-6">
          <Card className="bg-white shadow-sm border-0 rounded-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
              <CardTitle className="text-xl font-semibold">Your Upcoming Appointments</CardTitle>
              <CardDescription className="text-blue-100">
                View and manage your scheduled appointments
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                <CalendarIcon className="h-12 w-12 mb-4 opacity-50" />
                <p className="text-lg">No upcoming appointments</p>
                <p className="text-sm">Your scheduled appointments will appear here</p>
                <Button 
                  onClick={() => document.querySelector('[data-state="inactive"][value="booking"]')?.click()}
                  className="mt-4 bg-blue-600 hover:bg-blue-700"
                >
                  Book New Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
