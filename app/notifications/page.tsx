import { Bell } from "lucide-react"

export default function NotificationsPage() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      <div className="bg-gray-100 p-10 rounded-lg flex flex-col items-center justify-center">
        <Bell className="w-16 h-16 text-blue-600 mb-4" />
        <p className="text-gray-500">No new notifications</p>
      </div>
    </div>
  )
}

