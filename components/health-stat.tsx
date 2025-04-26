import type { LucideIcon } from "lucide-react"

interface HealthStatProps {
  icon: LucideIcon
  iconColor: string
  iconBgColor: string
  label: string
  value: number | string
  unit: string
  min: number
  max: number
  current: number
}

export function HealthStat({
  icon: Icon,
  iconColor,
  iconBgColor,
  label,
  value,
  unit,
  min,
  max,
  current,
}: HealthStatProps) {
  const percentage = ((current - min) / (max - min)) * 100

  return (
    <div className="flex items-center gap-6">
      <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: iconBgColor }}>
        <Icon className="w-10 h-10" style={{ color: iconColor }} />
      </div>
      <div className="space-y-2 flex-1">
        <div className="text-gray-500">{label}</div>
        <div className="flex items-end gap-2">
          <span className="text-5xl font-bold" style={{ color: iconColor }}>
            {value}
          </span>
          <span className="text-gray-400 mb-1">{unit}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${percentage}%`, backgroundColor: iconColor }}></div>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>
            {min}
            {unit}
          </span>
          <span>
            {max}
            {unit}
          </span>
        </div>
      </div>
    </div>
  )
}

