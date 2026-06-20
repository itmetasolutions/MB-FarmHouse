export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import sql from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const farmhouseId = searchParams.get('farmhouse_id')
  const bookingType = searchParams.get('booking_type')

  try {
    const conditions: string[] = []
    const values: (string | number)[] = []

    if (farmhouseId) {
      const rows = await sql`
        SELECT * FROM pricing
        WHERE farmhouse_id = ${Number(farmhouseId)}
          AND booking_type = ${bookingType || 'event'}
        ORDER BY day_of_week, start_time
      `
      return NextResponse.json(rows)
    }

    const rows = await sql`SELECT * FROM pricing ORDER BY farmhouse_id, booking_type, day_of_week, start_time`
    return NextResponse.json(rows)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch prices' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { prices } = await req.json()

    for (const p of prices) {
      await sql`
        INSERT INTO pricing (farmhouse_id, booking_type, slot_name, day_of_week, price, start_time, end_time, is_active)
        VALUES (${p.farmhouse_id}, ${p.booking_type}, ${p.slot_name}, ${p.day_of_week}, ${p.price}, ${p.start_time}, ${p.end_time}, true)
        ON CONFLICT (farmhouse_id, booking_type, slot_name, day_of_week)
        DO UPDATE SET
          price = EXCLUDED.price,
          start_time = EXCLUDED.start_time,
          end_time = EXCLUDED.end_time,
          updated_at = NOW()
      `
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Price save error:', error)
    return NextResponse.json({ error: 'Failed to save prices' }, { status: 500 })
  }
}
