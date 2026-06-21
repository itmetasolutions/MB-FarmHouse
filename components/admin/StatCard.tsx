import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  color?: 'brown' | 'green' | 'yellow' | 'red' | 'blue'
  trend?: { label: string; up: boolean }
}

const colorMap = {
  brown: {
    iconBg: 'bg-farmhouse-brown/10',
    iconColor: 'text-farmhouse-brown',
    bar: 'bg-farmhouse-brown',
  },
  green: {
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    bar: 'bg-emerald-500',
  },
  yellow: {
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    bar: 'bg-amber-400',
  },
  red: {
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
    bar: 'bg-red-400',
  },
  blue: {
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    bar: 'bg-blue-500',
  },
}

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'brown', trend }: Props) {
  const c = colorMap[color]
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-black/[0.05] p-5 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center shrink-0', c.iconBg)}>
          <Icon size={20} className={c.iconColor} />
        </div>
        {trend && (
          <span className={cn(
            'text-[11px] font-semibold px-2 py-1 rounded-full',
            trend.up ? 'text-emerald-700 bg-emerald-50' : 'text-red-600 bg-red-50'
          )}>
            {trend.up ? '↑' : '↓'} {trend.label}
          </span>
        )}
      </div>
      <div>
        <p className="text-farmhouse-muted text-[11px] font-semibold uppercase tracking-wider">{title}</p>
        <p className="font-serif text-[1.875rem] font-bold text-farmhouse-dark mt-1 leading-none">{value}</p>
        {subtitle && <p className="text-farmhouse-muted text-xs mt-1.5">{subtitle}</p>}
      </div>
      <div className={cn('h-[3px] rounded-full w-10', c.bar)} />
    </div>
  )
}
