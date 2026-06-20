export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import sql from '@/lib/db'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const result = await sql`
      SELECT
        b.*,
        c.name as customer_name,
        c.phone as customer_phone,
        c.email as customer_email,
        f.name as farmhouse_name,
        f.theme as farmhouse_theme
      FROM bookings b
      LEFT JOIN customers c ON b.customer_id = c.id
      LEFT JOIN farmhouses f ON b.farmhouse_id = f.id
      WHERE b.id = ${Number(params.id)}
    `
    if (!result[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(result[0])
  } catch {
    return NextResponse.json({ error: 'Failed to fetch booking' }, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { booking_status, payment_status } = body

    const updates: Record<string, string> = {}
    if (booking_status) updates.booking_status = booking_status
    if (payment_status) updates.payment_status = payment_status

    if (booking_status === 'confirmed' && payment_status !== 'paid') {
      // Auto-set payment to paid if confirming
    }

    const result = await sql`
      UPDATE bookings
      SET
        booking_status = COALESCE(${updates.booking_status || null}, booking_status),
        payment_status = COALESCE(${updates.payment_status || null}, payment_status),
        updated_at = NOW()
      WHERE id = ${Number(params.id)}
      RETURNING *
    `
    if (!result[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    // Re-fetch with joins
    const full = await sql`
      SELECT
        b.*,
        c.name as customer_name, c.phone as customer_phone, c.email as customer_email,
        f.name as farmhouse_name, f.theme as farmhouse_theme
      FROM bookings b
      LEFT JOIN customers c ON b.customer_id = c.id
      LEFT JOIN farmhouses f ON b.farmhouse_id = f.id
      WHERE b.id = ${Number(params.id)}
    `

    return NextResponse.json(full[0])
  } catch {
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
  }
}
