'use client'

import { useState } from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isBefore,
  isToday,
  isSameDay,
  addMonths,
  subMonths,
  getDay,
} from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  selected: Date | null
  onSelect: (date: Date) => void
}

export default function DatePickerCalendar({ selected, onSelect }: Props) {
  const [viewDate, setViewDate] = useState(() => new Date())
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const monthStart = startOfMonth(viewDate)
  const monthEnd = endOfMonth(viewDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const startPadding = getDay(monthStart)
  const paddingDays = Array.from({ length: startPadding })

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-serif text-3xl text-farmhouse-dark mb-2">Select Your Date</h2>
        <p className="text-farmhouse-muted text-sm">Choose a date for your event. Dates must be at least 1 day in advance.</p>
      </div>

      <div className="bg-farmhouse-cream border border-farmhouse-beige p-6 max-w-md">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-5">
          <button
            type="button"
            onClick={() => setViewDate(subMonths(viewDate, 1))}
            className="w-8 h-8 flex items-center justify-center hover:bg-farmhouse-beige transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>
          <h3 className="font-serif text-lg text-farmhouse-dark font-semibold">
            {format(viewDate, 'MMMM yyyy')}
          </h3>
          <button
            type="button"
            onClick={() => setViewDate(addMonths(viewDate, 1))}
            className="w-8 h-8 flex items-center justify-center hover:bg-farmhouse-beige transition-colors"
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Day labels */}
        <div className="grid grid-cols-7 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="text-center text-xs font-semibold text-farmhouse-muted py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-y-1">
          {paddingDays.map((_, i) => (
            <div key={`pad-${i}`} />
          ))}
          {days.map((day) => {
            const isPast = isBefore(day, today) && !isToday(day)
            const isSelected = selected ? isSameDay(day, selected) : false
            const isToday_ = isToday(day)

            return (
              <button
                key={day.toISOString()}
                type="button"
                disabled={isPast}
                onClick={() => onSelect(day)}
                className={cn(
                  'aspect-square flex items-center justify-center text-sm transition-colors mx-auto w-9 h-9',
                  isPast && 'text-farmhouse-beige cursor-not-allowed',
                  !isPast && !isSelected && 'hover:bg-farmhouse-beige text-farmhouse-dark',
                  isSelected && 'bg-farmhouse-brown text-white font-semibold',
                  isToday_ && !isSelected && 'border border-farmhouse-brown text-farmhouse-brown font-semibold'
                )}
              >
                {format(day, 'd')}
              </button>
            )
          })}
        </div>
      </div>

      {selected && (
        <div className="bg-farmhouse-brown/10 border border-farmhouse-brown/20 px-5 py-3 text-farmhouse-brown text-sm font-medium">
          Selected: {format(selected, 'EEEE, dd MMMM yyyy')}
        </div>
      )}
    </div>
  )
}
