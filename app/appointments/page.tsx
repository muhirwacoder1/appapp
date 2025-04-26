import { Calendar } from "lucide-react"
import { AppointmentForm } from "@/components/appointment-form"

export default function AppointmentsPage() {
  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Appointments</h1>
      <AppointmentForm />
    </div>
  )
}
