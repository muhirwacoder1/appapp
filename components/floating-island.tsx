"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, User, Settings, LogOut, X, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { supabaseClient } from '@/lib/supabaseClient'

// Mock notifications data
const notifications = [
  {
    id: 1,
    title: "Appointment Reminder",
    message: "You have an appointment with Dr. Kalisa Jackson tomorrow at 11:00 AM",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 2,
    title: "Pressure Alert",
    message: "Unusual pressure detected on your left foot",
    time: "3 hours ago",
    read: false,
  },
  {
    id: 3,
    title: "Device Update",
    message: "Your insole device firmware has been updated successfully",
    time: "Yesterday",
    read: true,
  },
]

// Mock user data - this would typically come from your authentication system
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "/avatar-placeholder.jpg",
  initials: "JD"
}

export function FloatingIsland() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [notificationsList, setNotificationsList] = useState(notifications)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [user, setUser] = useState(userData)
  const router = useRouter()
  
  const unreadCount = notificationsList.filter(n => !n.read).length
  
  const markAllAsRead = () => {
    setNotificationsList(notificationsList.map(n => ({ ...n, read: true })))
  }
  
  const handleLogout = async () => {
    await supabaseClient.auth.signOut()
    router.push('/signup')
  }

  const navigateToProfile = () => {
    router.push("/profile")
  }

  const navigateToRegisterInsole = () => {
    router.push("/register-insole")
  }

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-4">
      {/* Notifications Panel */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg border border-gray-100"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell className="h-5 w-5 text-gray-700" />
          {unreadCount > 0 && (
            <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 p-0 text-[10px] text-white">
              {unreadCount}
            </Badge>
          )}
        </motion.button>
        
        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-80 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-gray-200"
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                <h3 className="font-medium text-gray-900">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-blue-600 hover:text-blue-700"
                    >
                      Mark all as read
                    </button>
                  )}
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="rounded-full p-1 hover:bg-gray-100"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>
              
              <div className="max-h-[350px] overflow-y-auto p-2">
                {notificationsList.length > 0 ? (
                  <div className="space-y-1">
                    {notificationsList.map((notification) => (
                      <div
                        key={notification.id}
                        className={`rounded-lg p-3 transition-colors ${
                          notification.read ? "bg-white hover:bg-gray-50" : "bg-blue-50 hover:bg-blue-100"
                        }`}
                      >
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        <p className="mt-1 text-xs text-gray-700">{notification.message}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6">
                    <Bell className="h-8 w-8 text-gray-300" />
                    <p className="mt-2 text-sm text-gray-500">No notifications yet</p>
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-100 p-3">
                <button className="w-full rounded-lg bg-gray-100 py-2 text-xs font-medium text-gray-700 hover:bg-gray-200">
                  View all notifications
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* User Profile Dropdown */}
      <div className="relative">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full bg-white pl-2 pr-3 py-1.5 shadow-lg border border-gray-100 cursor-pointer"
            >
              <Avatar className="h-7 w-7 border border-gray-200">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">{user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
                <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
              </div>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl">
            <div className="flex items-center gap-2 px-2 py-1.5">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-blue-100 text-blue-600">{user.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5"
              onSelect={(e) => {
                e.preventDefault();
                navigateToProfile();
              }}
            >
              <User className="h-4 w-4 text-gray-700" />
              <span>My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5"
              onSelect={(e) => {
                e.preventDefault();
                navigateToRegisterInsole();
              }}
            >
              <Settings className="h-4 w-4 text-gray-700" />
              <span>Register Insole</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-red-600 hover:bg-red-50 hover:text-red-700"
                  onSelect={(e) => {
                    e.preventDefault();
                    setShowLogoutDialog(true);
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] rounded-xl">
                <DialogHeader>
                  <DialogTitle>Confirm Logout</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to log out of your account?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-row justify-end gap-2 mt-4">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button 
                    variant="destructive" 
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Logout
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
