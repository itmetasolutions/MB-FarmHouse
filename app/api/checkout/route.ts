export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'
import { generatePayFastSignature } from '@/lib/utils'
import crypto from 'crypto'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const ref = searchParams.get('ref')

  if (!ref) return NextResponse.json({ error: 'Missing booking reference' }, { status: 400 })

  try {
    const result = await sql`
      SELECT
        b.*,
        c.name as customer_name,
        c.email as customer_email,
        c.phone as customer_phone,
        f.name as farmhouse_name,
        f.image_url
      FROM bookings b
      LEFT JOIN customers c ON b.customer_id = c.id
      LEFT JOIN farmhouses f ON b.farmhouse_id = f.id
      WHERE b.booking_reference = ${ref}
        AND b.payment_status = 'pending'
    `

    if (!result[0]) {
      return NextResponse.json({ error: 'Booking not found or already paid' }, { status: 404 })
    }

    const booking = result[0] as {
      id: number
      booking_reference: string
      price: number
      slot_name: string
      booking_date: string
      farmhouse_name: string
      image_url: string
      customer_name: string
      customer_email: string | null
      customer_phone: string
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const merchantId = process.env.PAYFAST_MERCHANT_ID || '10000100'
    const merchantKey = process.env.PAYFAST_MERCHANT_KEY || '46f0cd694581a'
    const passPhrase = process.env.PAYFAST_PASSPHRASE || ''

    const pfData: Record<string, string> = {
      merchant_id: merchantId,
      merchant_key: merchantKey,
      return_url: `${baseUrl}/payment/success?ref=${booking.booking_reference}`,
      cancel_url: `${baseUrl}/payment/failed?ref=${booking.booking_reference}`,
      notify_url: `${baseUrl}/api/payment/notify`,
      name_first: booking.customer_name.split(' ')[0],
      name_last: booking.customer_name.split(' ').slice(1).join(' ') || booking.customer_name.split(' ')[0],
      email_address: booking.customer_email || 'noreply@mbfarmhouse.co.za',
      cell_number: booking.customer_phone,
      m_payment_id: booking.booking_reference,
      amount: Number(booking.price).toFixed(2),
      item_name: `${booking.farmhouse_name} - ${booking.slot_name} booking`,
      item_description: `Booking for ${booking.booking_date}`,
    }

    const signature = generatePayFastSignature(pfData, passPhrase)
    pfData.signature = signature

    return NextResponse.json({
      booking: {
        ...booking,
        farmhouse: {
          name: booking.farmhouse_name,
          image_url: booking.image_url,
        },
        customer: {
          name: booking.customer_name,
          email: booking.customer_email,
          phone: booking.customer_phone,
        },
      },
      payfast: pfData,
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Failed to prepare checkout' }, { status: 500 })
  }
}
