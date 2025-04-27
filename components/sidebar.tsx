"use client"

import { useState } from "react"
import { Heart, Bell, User, Calendar, LogOut, Plus, ChevronLeft, ChevronRight, Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }
  const openMobile = () => setMobileOpen(true)
  const closeMobile = () => setMobileOpen(false)

  const handleLogout = () => {
    // Redirect to Google.com
    window.location.href = "https://www.google.com"
  }

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn("fixed inset-0 bg-black/50 z-40 md:hidden", {
          block: mobileOpen,
          hidden: !mobileOpen,
        })}
        onClick={closeMobile}
      />
      {/* Mobile menu button */}
      <button
        className="p-2 fixed top-4 left-4 z-50 md:hidden"
        onClick={openMobile}
      >
        <Menu className="h-6 w-6 text-gray-700" />
      </button>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r transition-transform duration-300 ease-in-out",
          collapsed ? "w-[80px]" : "w-[310px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "md:static md:translate-x-0"
        )}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="absolute -right-4 top-6 h-8 w-8 rounded-full border bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md z-10 hover:from-blue-600 hover:to-blue-700 border-none md:hidden"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>

        <div className={cn(
          "p-6 flex flex-col h-full", 
          collapsed ? "items-center" : ""
        )}>
          <div className={cn(
            "flex items-center gap-2 mb-10", 
            collapsed ? "justify-center" : ""
          )}>
            {collapsed ? (
              <div className="w-12 h-12 relative">
                <Image 
                  src="/appo-logo.png" 
                  alt="Appo Logo" 
                  width={48} 
                  height={48} 
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="h-12 relative">
                <Image 
                  src="/appo-logo.png" 
                  alt="Appo Logo" 
                  width={120} 
                  height={48} 
                  className="object-contain"
                />
              </div>
            )}
          </div>

          <nav className="flex-1 flex flex-col gap-4 w-full">
            <Link
              href="/"
              className={cn(
                "flex items-center rounded-lg font-medium transition-colors",
                isActive("/") 
                  ? "text-white bg-blue-600" 
                  : "text-gray-700 hover:bg-gray-100",
                collapsed 
                  ? "justify-center p-3" 
                  : "p-4 gap-3"
              )}
              title="Dashboard"
            >
              <Heart className={cn("h-5 w-5", isActive("/") ? "text-white" : "text-gray-700")} />
              {!collapsed && <span>Dashboard</span>}
            </Link>
            <Link
              href="/appointments"
              className={cn(
                "flex items-center rounded-lg font-medium transition-colors",
                isActive("/appointments") 
                  ? "text-white bg-blue-600" 
                  : "text-gray-700 hover:bg-gray-100",
                collapsed 
                  ? "justify-center p-3" 
                  : "p-4 gap-3"
              )}
              title="Appointments"
            >
              <Calendar className={cn("h-5 w-5", isActive("/appointments") ? "text-white" : "text-gray-700")} />
              {!collapsed && <span>Appointments</span>}
            </Link>
            <Link
              href="/notifications"
              className={cn(
                "flex items-center rounded-lg font-medium transition-colors",
                isActive("/notifications") 
                  ? "text-white bg-blue-600" 
                  : "text-gray-700 hover:bg-gray-100",
                collapsed 
                  ? "justify-center p-3" 
                  : "p-4 gap-3"
              )}
              title="Notifications"
            >
              <Bell className={cn("h-5 w-5", isActive("/notifications") ? "text-white" : "text-gray-700")} />
              {!collapsed && <span>Notifications</span>}
            </Link>
            <Link
              href="/profile"
              className={cn(
                "flex items-center rounded-lg font-medium transition-colors",
                isActive("/profile") 
                  ? "text-white bg-blue-600" 
                  : "text-gray-700 hover:bg-gray-100",
                collapsed 
                  ? "justify-center p-3" 
                  : "p-4 gap-3"
              )}
              title="Profile"
            >
              <User className={cn("h-5 w-5", isActive("/profile") ? "text-white" : "text-gray-700")} />
              {!collapsed && <span>Profile</span>}
            </Link>
            <Link
              href="/register-insole"
              className={cn(
                "flex items-center rounded-lg font-medium transition-colors",
                isActive("/register-insole") 
                  ? "text-white bg-blue-600" 
                  : "text-gray-700 hover:bg-gray-100",
                collapsed 
                  ? "justify-center p-3" 
                  : "p-4 gap-3"
              )}
              title="Register New Insole"
            >
              <Plus className={cn("h-5 w-5", isActive("/register-insole") ? "text-white" : "text-gray-700")} />
              {!collapsed && <span>Register New Insole</span>}
            </Link>
          </nav>

          <div className="mt-auto pt-6">
            {!collapsed && (
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-blue-900">New Appointment</h3>
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <Plus className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <p className="text-sm text-blue-700 mb-3">
                  Book your next appointment quickly and easily
                </p>
                <Button 
                  size="sm" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  asChild
                >
                  <Link href="/appointments">Book Now</Link>
                </Button>
              </div>
            )}
            
            <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className={cn(
                    "w-full border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                    collapsed ? "justify-center p-3" : "gap-2"
                  )}
                >
                  <LogOut className="h-5 w-5" />
                  {!collapsed && <span>Logout</span>}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
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
          </div>
        </div>
      </div>
    </>
  )
}
