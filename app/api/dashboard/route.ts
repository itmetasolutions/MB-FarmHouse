export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import sql from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const [stats] = await sql`
      SELECT
        COUNT(*) FILTER (WHERE booking_status != 'cancelled') AS total_bookings,
        COUNT(*) FILTER (WHERE booking_status = 'confirmed' AND payment_status = 'paid') AS confirmed_bookings,
        COUNT(*) FILTER (WHERE payment_status = 'pending' AND booking_status != 'cancelled') AS pending_payments,
        COUNT(*) FILTER (WHERE booking_status = 'cancelled') AS cancelled_bookings,
        COALESCE(SUM(price) FILTER (WHERE payment_status = 'paid'), 0) AS total_revenue
      FROM bookings
    `

    const monthly = await sql`
      SELECT
        TO_CHAR(booking_date, 'Mon YY') AS month,
        COUNT(*) AS count,
        COALESCE(SUM(price) FILTER (WHERE payment_status = 'paid'), 0) AS revenue
      FROM bookings
      WHERE booking_date >= NOW() - INTERVAL '6 months'
        AND booking_status != 'cancelled'
      GROUP BY TO_CHAR(booking_date, 'Mon YY'), DATE_TRUNC('month', booking_date)
      ORDER BY DATE_TRUNC('month', booking_date)
    `

    return NextResponse.json({ stats, monthly })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 })
  }
}
