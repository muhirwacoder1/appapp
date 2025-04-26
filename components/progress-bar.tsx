interface ProgressBarProps {
  value: number
  max: number
  color: string
  label?: string
  unit?: string
  showRange?: boolean
  minLabel?: string
  maxLabel?: string
}

export function ProgressBar({
  value,
  max,
  color,
  label,
  unit,
  showRange = true,
  minLabel = "0",
  maxLabel,
}: ProgressBarProps) {
  const percentage = (value / max) * 100

  return (
    <div className="space-y-2">
      {(label || unit) && (
        <div className="flex justify-between items-end">
          {label && (
            <span className="text-6xl font-bold" style={{ color }}>
              {value}
            </span>
          )}
          {unit && <span className="text-gray-400">{unit}</span>}
        </div>
      )}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${percentage}%`, backgroundColor: color }}></div>
      </div>
      {showRange && (
        <div className="flex justify-between text-sm text-gray-500">
          <span>{minLabel}</span>
          {label && <span>{label}</span>}
          <span>{maxLabel || `${max} ${unit}`}</span>
        </div>
      )}
    </div>
  )
}

