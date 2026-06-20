export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'
import { generatePayFastSignature } from '@/lib/utils'

export async function POST(req: NextRequest) {
  try {
    const text = await req.text()
    const params = new URLSearchParams(text)
    const data: Record<string, string> = {}
    params.forEach((value, key) => { data[key] = value })

    const passPhrase = process.env.PAYFAST_PASSPHRASE || ''

    // Verify signature
    const receivedSig = data.signature
    delete data.signature
    const expectedSig = generatePayFastSignature(data, passPhrase)

    if (receivedSig !== expectedSig) {
      console.warn('PayFast signature mismatch')
      return new NextResponse('Invalid signature', { status: 400 })
    }

    const bookingRef = data.m_payment_id
    const paymentStatus = data.payment_status
    const pfPaymentId = data.pf_payment_id

    let bookingStatus = 'pending'
    let dbPaymentStatus = 'pending'

    if (paymentStatus === 'COMPLETE') {
      dbPaymentStatus = 'paid'
      bookingStatus = 'confirmed'
    } else if (paymentStatus === 'FAILED') {
      dbPaymentStatus = 'failed'
      bookingStatus = 'cancelled'
    } else if (paymentStatus === 'CANCELLED') {
      dbPaymentStatus = 'cancelled'
      bookingStatus = 'cancelled'
    }

    // Update booking
    const bookingResult = await sql`
      UPDATE bookings
      SET
        payment_status = ${dbPaymentStatus},
        booking_status = ${bookingStatus},
        updated_at = NOW()
      WHERE booking_reference = ${bookingRef}
      RETURNING id, price
    `

    if (bookingResult[0]) {
      const b = bookingResult[0] as { id: number; price: number }
      // Record payment
      await sql`
        INSERT INTO payments (booking_id, amount, payment_status, gateway_payment_id, gateway_response, paid_at)
        VALUES (
          ${b.id},
          ${b.price},
          ${dbPaymentStatus},
          ${pfPaymentId || null},
          ${JSON.stringify(data)},
          ${dbPaymentStatus === 'paid' ? new Date().toISOString() : null}
        )
      `
    }

    return new NextResponse('OK', { status: 200 })
  } catch (error) {
    console.error('Payment notify error:', error)
    return new NextResponse('Error', { status: 500 })
  }
}
