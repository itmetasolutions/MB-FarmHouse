export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'
import { getDay } from 'date-fns'
import type { SlotAvailability } from '@/types'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const farmhouseId = searchParams.get('farmhouse_id')
  const date = searchParams.get('date')
  const bookingType = searchParams.get('booking_type')

  if (!farmhouseId || !date || !bookingType) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  }

  try {
    const dayOfWeek = getDay(new Date(date))

    // Get configured pricing slots for this day
    const pricingRows = await sql`
      SELECT slot_name, price, start_time, end_time
      FROM pricing
      WHERE farmhouse_id = ${Number(farmhouseId)}
        AND booking_type = ${bookingType}
        AND day_of_week = ${dayOfWeek}
        AND is_active = true
      ORDER BY start_time
    `

    // Get existing bookings for this date/farmhouse/type
    const bookingRows = await sql`
      SELECT slot_name, booking_status, payment_status
      FROM bookings
      WHERE farmhouse_id = ${Number(farmhouseId)}
        AND booking_date = ${date}
        AND booking_type = ${bookingType}
        AND booking_status != 'cancelled'
    `

    const slots: SlotAvailability[] = pricingRows.map((p) => {
      const booking = (bookingRows as Array<{slot_name: string; booking_status: string; payment_status: string}>).find((b) => {
        // Full day blocks all slots
        if (b.slot_name === 'full_day') return true
        // A booking of this specific slot
        if (b.slot_name === p.slot_name) return true
        // If this is full_day slot, any existing booking blocks it
        if (p.slot_name === 'full_day' && b.slot_name !== p.slot_name) return true
        return false
      })

      let status: 'available' | 'pending' | 'booked' = 'available'
      if (booking) {
        if (booking.payment_status === 'paid' || booking.booking_status === 'confirmed') {
          status = 'booked'
        } else if (booking.payment_status === 'pending') {
          status = 'pending'
        }
      }

      return {
        slot_name: p.slot_name as SlotAvailability['slot_name'],
        start_time: p.start_time,
        end_time: p.end_time,
        price: Number(p.price),
        status,
      }
    })

    return NextResponse.json(slots)
  } catch (error) {
    console.error('Slots error:', error)
    return NextResponse.json({ error: 'Failed to fetch slots' }, { status: 500 })
  }
}
