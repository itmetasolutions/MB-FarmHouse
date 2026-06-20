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
    const customerResult = await sql`SELECT * FROM customers WHERE id = ${Number(params.id)}`
    if (!customerResult[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const bookings = await sql`
      SELECT b.*, f.name as farmhouse_name
      FROM bookings b
      LEFT JOIN farmhouses f ON b.farmhouse_id = f.id
      WHERE b.customer_id = ${Number(params.id)}
      ORDER BY b.booking_date DESC
    `

    return NextResponse.json({
      ...customerResult[0],
      bookings,
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch customer' }, { status: 500 })
  }
}
