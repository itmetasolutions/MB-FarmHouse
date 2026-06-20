export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import sql from '@/lib/db'
import { generateBookingReference } from '@/lib/utils'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search') || ''
  const status = searchParams.get('status') || ''
  const type = searchParams.get('type') || ''

  try {
    const bookings = await sql`
      SELECT
        b.*,
        c.name as customer_name,
        c.phone as customer_phone,
        f.name as farmhouse_name
      FROM bookings b
      LEFT JOIN customers c ON b.customer_id = c.id
      LEFT JOIN farmhouses f ON b.farmhouse_id = f.id
      WHERE (
        ${search} = '' OR
        LOWER(c.name) LIKE LOWER(${'%' + search + '%'}) OR
        LOWER(b.booking_reference) LIKE LOWER(${'%' + search + '%'}) OR
        c.phone LIKE ${'%' + search + '%'}
      )
      AND (${status} = '' OR b.booking_status = ${status})
      AND (${type} = '' OR b.booking_type = ${type})
      ORDER BY b.created_at DESC
      LIMIT 100
    `
    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Bookings GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      farmhouse_id,
      booking_type,
      booking_date,
      slot_name,
      price,
      name,
      phone,
      email,
      notes,
      is_manual = false,
    } = body

    if (!farmhouse_id || !booking_date || !slot_name || !name || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check slot availability
    const existing = await sql`
      SELECT id, slot_name, payment_status, booking_status
      FROM bookings
      WHERE farmhouse_id = ${farmhouse_id}
        AND booking_date = ${booking_date}
        AND booking_type = ${booking_type}
        AND booking_status != 'cancelled'
    `

    const conflict = (existing as Array<{slot_name: string; payment_status: string; booking_status: string}>).find((b) => {
      if (b.slot_name === 'full_day' || slot_name === 'full_day') return true
      return b.slot_name === slot_name
    })

    if (conflict) {
      const isPending = conflict.payment_status === 'pending'
      return NextResponse.json(
        { error: isPending ? 'This slot has a pending payment. Please try again shortly.' : 'This slot is already booked.' },
        { status: 409 }
      )
    }

    // Upsert customer
    const customerResult = await sql`
      INSERT INTO customers (name, phone, email)
      VALUES (${name}, ${phone}, ${email || null})
      ON CONFLICT (phone) DO UPDATE SET
        name = EXCLUDED.name,
        email = COALESCE(EXCLUDED.email, customers.email),
        updated_at = NOW()
      RETURNING id
    `
    const customerId = (customerResult[0] as { id: number }).id

    // Get price from DB if not manually set
    let finalPrice = price
    if (!finalPrice || finalPrice === 0) {
      const dayOfWeek = new Date(booking_date).getDay()
      const pricingRow = await sql`
        SELECT price FROM pricing
        WHERE farmhouse_id = ${farmhouse_id}
          AND booking_type = ${booking_type}
          AND slot_name = ${slot_name}
          AND day_of_week = ${dayOfWeek}
          AND is_active = true
        LIMIT 1
      `
      if (pricingRow[0]) {
        finalPrice = Number((pricingRow[0] as { price: number }).price)
      }
    }

    const bookingRef = generateBookingReference()

    const bookingResult = await sql`
      INSERT INTO bookings (
        booking_reference, customer_id, farmhouse_id, booking_type,
        booking_date, slot_name, price, booking_status, payment_status,
        is_manual, notes
      ) VALUES (
        ${bookingRef}, ${customerId}, ${farmhouse_id}, ${booking_type},
        ${booking_date}, ${slot_name}, ${finalPrice}, 'pending', 'pending',
        ${is_manual}, ${notes || null}
      )
      RETURNING *
    `

    const booking = bookingResult[0] as { id: number; booking_reference: string }

    // If manual, mark as confirmed immediately
    if (is_manual) {
      await sql`
        UPDATE bookings
        SET booking_status = 'confirmed', payment_status = 'paid'
        WHERE id = ${booking.id}
      `
    }

    return NextResponse.json({
      id: booking.id,
      booking_reference: booking.booking_reference,
    })
  } catch (error) {
    console.error('Booking POST error:', error)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}
