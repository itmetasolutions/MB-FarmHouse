'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { formatCurrency, formatDate, SLOT_LABELS } from '@/lib/utils'
import { Calendar, Clock, MapPin, Shield, AlertCircle, Loader } from 'lucide-react'
import type { Booking } from '@/types'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const ref = searchParams.get('ref')
  const [booking, setBooking] = useState<Booking & { farmhouse: { name: string; image_url: string }; customer: { name: string; email: string; phone: string } } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [payFastData, setPayFastData] = useState<Record<string, string> | null>(null)

  useEffect(() => {
    if (!ref) return
    const fetchBooking = async () => {
      try {
        const res = await fetch(`/api/checkout?ref=${ref}`)
        if (!res.ok) throw new Error('Booking not found')
        const data = await res.json()
        setBooking(data.booking)
        setPayFastData(data.payfast)
      } catch {
        setError('Unable to load booking. Please contact us.')
      } finally {
        setLoading(false)
      }
    }
    fetchBooking()
  }, [ref])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader size={32} className="text-farmhouse-brown animate-spin" />
          <p className="text-farmhouse-muted text-sm">Loading your booking...</p>
        </div>
      </div>
    )
  }

  if (error || !booking) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-sm">
          <AlertCircle size={40} className="text-red-400 mx-auto mb-4" />
          <h2 className="font-serif text-2xl text-farmhouse-dark mb-2">Booking Not Found</h2>
          <p className="text-farmhouse-muted text-sm mb-6">{error}</p>
          <Link href="/book-event" className="btn-primary">Start New Booking</Link>
        </div>
      </div>
    )
  }

  const payfastUrl = process.env.NEXT_PUBLIC_PAYFAST_URL || 'https://sandbox.payfast.co.za/eng/process'

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <p className="text-farmhouse-tan text-xs font-semibold tracking-[0.4em] uppercase mb-3">
          Final Step
        </p>
        <h1 className="font-serif text-4xl text-farmhouse-dark font-bold">Complete Your Booking</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Order Summary */}
        <div className="space-y-5">
          <h2 className="font-serif text-2xl text-farmhouse-dark">Order Summary</h2>

          {/* Venue Card */}
          <div className="flex gap-4 p-5 bg-farmhouse-cream border border-farmhouse-beige">
            <div className="relative w-24 h-20 shrink-0 overflow-hidden">
              <Image
                src={booking.farmhouse.image_url}
                alt={booking.farmhouse.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            <div>
              <p className="text-xs text-farmhouse-muted uppercase tracking-wide mb-1">Venue</p>
              <h3 className="font-serif text-lg text-farmhouse-dark">{booking.farmhouse.name}</h3>
              <div className="flex items-center gap-1.5 text-farmhouse-muted text-xs mt-1">
                <MapPin size={11} /> Pretoria, South Africa
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-farmhouse-beige">
              <div className="flex items-center gap-2 text-farmhouse-muted text-sm">
                <Calendar size={14} /> Date
              </div>
              <span className="text-farmhouse-dark text-sm font-medium">{formatDate(booking.booking_date)}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-farmhouse-beige">
              <div className="flex items-center gap-2 text-farmhouse-muted text-sm">
                <Clock size={14} /> Slot
              </div>
              <span className="text-farmhouse-dark text-sm font-medium">
                {SLOT_LABELS[booking.slot_name] || booking.slot_name}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-farmhouse-beige">
              <span className="text-farmhouse-muted text-sm">Booking Type</span>
              <span className="text-farmhouse-dark text-sm font-medium capitalize">{booking.booking_type}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-farmhouse-beige">
              <span className="text-farmhouse-muted text-sm">Reference</span>
              <span className="text-farmhouse-dark text-sm font-mono">{booking.booking_reference}</span>
            </div>
            <div className="flex items-center justify-between py-4 bg-farmhouse-brown text-farmhouse-cream px-4">
              <span className="font-semibold">Total Amount</span>
              <span className="font-serif text-2xl font-bold">{formatCurrency(booking.price)}</span>
            </div>
          </div>

          {/* Security Note */}
          <div className="flex items-start gap-3 bg-green-50 border border-green-200 p-4">
            <Shield size={16} className="text-green-600 shrink-0 mt-0.5" />
            <p className="text-green-800 text-xs leading-relaxed">
              Your payment is processed securely via PayFast. We do not store your card details.
            </p>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-farmhouse-cream border border-farmhouse-beige p-8">
          <h2 className="font-serif text-2xl text-farmhouse-dark mb-2">Secure Payment</h2>
          <p className="text-farmhouse-muted text-sm mb-6">
            You'll be redirected to PayFast to complete your payment securely.
          </p>

          {/* Guest Summary */}
          <div className="p-4 bg-white border border-farmhouse-beige mb-6">
            <p className="text-xs text-farmhouse-muted uppercase tracking-wide mb-3">Booking For</p>
            <p className="text-farmhouse-dark font-semibold">{booking.customer.name}</p>
            <p className="text-farmhouse-muted text-sm">{booking.customer.phone}</p>
            {booking.customer.email && (
              <p className="text-farmhouse-muted text-sm">{booking.customer.email}</p>
            )}
          </div>

          {/* PayFast form - auto-submits */}
          {payFastData && (
            <form
              action={payfastUrl}
              method="POST"
              id="payfast-form"
            >
              {Object.entries(payFastData).map(([key, value]) => (
                <input key={key} type="hidden" name={key} value={value} />
              ))}
              <button
                type="submit"
                className="btn-primary w-full text-base py-4"
              >
                Pay {formatCurrency(booking.price)} with PayFast
              </button>
            </form>
          )}

          <p className="text-center text-farmhouse-muted text-xs mt-4">
            By proceeding you agree to our{' '}
            <Link href="/terms" className="underline hover:text-farmhouse-brown">Terms & Conditions</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-farmhouse-white pt-20 pb-16">
        <Suspense fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <Loader size={32} className="text-farmhouse-brown animate-spin" />
          </div>
        }>
          <CheckoutContent />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
