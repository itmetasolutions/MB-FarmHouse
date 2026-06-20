import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  color?: 'brown' | 'green' | 'yellow' | 'red' | 'blue'
}

const colorMap = {
  brown: { bg: 'bg-farmhouse-brown/10', icon: 'text-farmhouse-brown', border: 'border-farmhouse-brown/20' },
  green: { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-200' },
  yellow: { bg: 'bg-yellow-50', icon: 'text-yellow-600', border: 'border-yellow-200' },
  red: { bg: 'bg-red-50', icon: 'text-red-500', border: 'border-red-200' },
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-200' },
}

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'brown' }: Props) {
  const c = colorMap[color]
  return (
    <div className={cn('bg-white border p-6 flex items-start gap-4', c.border)}>
      <div className={cn('w-12 h-12 flex items-center justify-center shrink-0', c.bg)}>
        <Icon size={22} className={c.icon} />
      </div>
      <div>
        <p className="text-farmhouse-muted text-sm">{title}</p>
        <p className="font-serif text-3xl font-bold text-farmhouse-dark mt-1">{value}</p>
        {subtitle && <p className="text-farmhouse-muted text-xs mt-1">{subtitle}</p>}
      </div>
    </div>
  )
}
