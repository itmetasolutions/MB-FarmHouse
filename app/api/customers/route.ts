export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import sql from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search') || ''

  try {
    const customers = await sql`
      SELECT
        c.*,
        COUNT(b.id) AS total_bookings
      FROM customers c
      LEFT JOIN bookings b ON b.customer_id = c.id
      WHERE (
        ${search} = '' OR
        LOWER(c.name) LIKE LOWER(${'%' + search + '%'}) OR
        c.phone LIKE ${'%' + search + '%'} OR
        LOWER(COALESCE(c.email, '')) LIKE LOWER(${'%' + search + '%'})
      )
      GROUP BY c.id
      ORDER BY c.created_at DESC
      LIMIT 100
    `
    return NextResponse.json(customers)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 })
  }
}
