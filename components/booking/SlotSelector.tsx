'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Clock, AlertCircle } from 'lucide-react'
import { cn, formatCurrency, SLOT_LABELS } from '@/lib/utils'
import type { SlotAvailability, BookingType } from '@/types'

interface Props {
  farmhouseId: number
  date: Date
  bookingType: BookingType
  selectedSlot: string | null
  onSelect: (slot: string, price: number) => void
}

export default function SlotSelector({ farmhouseId, date, bookingType, selectedSlot, onSelect }: Props) {
  const [slots, setSlots] = useState<SlotAvailability[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true)
      setError(null)
      try {
        const params = new URLSearchParams({
          farmhouse_id: String(farmhouseId),
          date: format(date, 'yyyy-MM-dd'),
          booking_type: bookingType,
        })
        const res = await fetch(`/api/slots?${params}`)
        if (!res.ok) throw new Error('Failed to fetch slots')
        const data = await res.json()
        setSlots(data)
      } catch {
        setError('Unable to load slot availability. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchSlots()
  }, [farmhouseId, date, bookingType])

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-serif text-3xl text-farmhouse-dark mb-2">Select Your Time Slot</h2>
        <p className="text-farmhouse-muted text-sm">Choose an available slot for {format(date, 'EEEE, dd MMMM yyyy')}.</p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 text-xs text-farmhouse-muted">
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-green-500 rounded-full" /> Available</div>
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-yellow-500 rounded-full" /> Pending</div>
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-red-400 rounded-full" /> Booked</div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-farmhouse-beige animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 p-4 text-red-700 text-sm">
          <AlertCircle size={16} />
          {error}
        </div>
      ) : (
        <div className="space-y-3">
          {slots.map((slot) => {
            const isAvailable = slot.status === 'available'
            const isPending = slot.status === 'pending'
            const isBooked = slot.status === 'booked'
            const isSelected = selectedSlot === slot.slot_name

            return (
              <button
                key={slot.slot_name}
                type="button"
                disabled={!isAvailable}
                onClick={() => isAvailable && onSelect(slot.slot_name, slot.price)}
                className={cn(
                  'w-full border-2 p-5 flex items-center justify-between transition-all duration-200',
                  isAvailable && !isSelected && 'border-green-200 bg-green-50 hover:border-green-400 hover:shadow-md cursor-pointer',
                  isAvailable && isSelected && 'border-farmhouse-brown bg-farmhouse-brown/5 shadow-md',
                  isPending && 'border-yellow-200 bg-yellow-50 cursor-not-allowed opacity-80',
                  isBooked && 'border-red-200 bg-red-50 cursor-not-allowed opacity-60'
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      'w-3 h-3 rounded-full mt-1 shrink-0',
                      isAvailable && 'bg-green-500',
                      isPending && 'bg-yellow-500',
                      isBooked && 'bg-red-400'
                    )}
                  />
                  <div className="text-left">
                    <p className={cn(
                      'font-semibold text-sm',
                      isAvailable && 'text-farmhouse-dark',
                      isPending && 'text-yellow-800',
                      isBooked && 'text-red-800'
                    )}>
                      {SLOT_LABELS[slot.slot_name] || slot.slot_name}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Clock size={12} className="text-farmhouse-muted" />
                      <span className="text-farmhouse-muted text-xs">{slot.start_time} – {slot.end_time}</span>
                    </div>
                    {isPending && (
                      <p className="text-yellow-700 text-xs mt-1">Pending payment — temporarily held</p>
                    )}
                    {isBooked && (
                      <p className="text-red-700 text-xs mt-1">This slot is fully booked</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn(
                    'font-bold text-lg font-serif',
                    isAvailable ? 'text-farmhouse-brown' : 'text-farmhouse-muted'
                  )}>
                    {formatCurrency(slot.price)}
                  </p>
                  <p className="text-farmhouse-muted text-xs">per booking</p>
                </div>
              </button>
            )
          })}
          {slots.length === 0 && (
            <div className="text-center py-10 text-farmhouse-muted">
              <p className="text-sm">No slots configured for this day. Please choose another date or contact us.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
