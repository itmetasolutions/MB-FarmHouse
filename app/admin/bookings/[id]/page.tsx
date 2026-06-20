'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, MapPin, User, Phone, Mail, AlertCircle } from 'lucide-react'
import { formatCurrency, formatDate, SLOT_LABELS, BOOKING_STATUS_COLORS, PAYMENT_STATUS_COLORS } from '@/lib/utils'

interface BookingDetail {
  id: number
  booking_reference: string
  booking_date: string
  booking_type: string
  slot_name: string
  price: number
  booking_status: string
  payment_status: string
  is_manual: boolean
  notes: string | null
  created_at: string
  customer_name: string
  customer_phone: string
  customer_email: string | null
  farmhouse_name: string
  farmhouse_theme: string
}

export default function BookingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [booking, setBooking] = useState<BookingDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/bookings/${params.id}`)
      .then((r) => r.json())
      .then(setBooking)
      .catch(() => setError('Failed to load booking'))
      .finally(() => setLoading(false))
  }, [params.id])

  const updateStatus = async (field: 'booking_status' | 'payment_status', value: string) => {
    setUpdating(true)
    try {
      const res = await fetch(`/api/bookings/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value }),
      })
      if (!res.ok) throw new Error('Update failed')
      const updated = await res.json()
      setBooking(updated)
    } catch {
      setError('Failed to update status')
    } finally {
      setUpdating(false)
    }
  }

  if (loading) return <div className="text-center py-20 text-farmhouse-muted">Loading booking...</div>
  if (!booking) return (
    <div className="text-center py-20">
      <AlertCircle size={32} className="text-red-400 mx-auto mb-3" />
      <p className="text-farmhouse-muted">Booking not found</p>
      <Link href="/admin/bookings" className="btn-primary mt-4 inline-flex">Back to Bookings</Link>
    </div>
  )

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/bookings" className="flex items-center gap-2 text-farmhouse-muted hover:text-farmhouse-dark text-sm">
          <ArrowLeft size={15} /> Back
        </Link>
        <div>
          <h1 className="font-serif text-3xl text-farmhouse-dark font-bold">Booking Detail</h1>
          <p className="text-farmhouse-muted text-sm font-mono">{booking.booking_reference}</p>
        </div>
        {booking.is_manual && (
          <span className="bg-farmhouse-brown/10 text-farmhouse-brown text-xs font-semibold px-2.5 py-1">Manual</span>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Info */}
        <div className="bg-white border border-farmhouse-beige p-6 space-y-5">
          <h2 className="font-serif text-xl text-farmhouse-dark border-b border-farmhouse-beige pb-3">Booking Information</h2>
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <MapPin size={15} className="text-farmhouse-tan shrink-0" />
              <div>
                <p className="text-farmhouse-muted text-xs">Venue</p>
                <p className="text-farmhouse-dark font-medium">{booking.farmhouse_name}</p>
                <p className="text-farmhouse-muted text-xs">{booking.farmhouse_theme}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={15} className="text-farmhouse-tan shrink-0" />
              <div>
                <p className="text-farmhouse-muted text-xs">Date</p>
                <p className="text-farmhouse-dark font-medium">{formatDate(booking.booking_date)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={15} className="text-farmhouse-tan shrink-0" />
              <div>
                <p className="text-farmhouse-muted text-xs">Slot</p>
                <p className="text-farmhouse-dark font-medium">{SLOT_LABELS[booking.slot_name] || booking.slot_name}</p>
                <p className="text-farmhouse-muted text-xs capitalize">{booking.booking_type} booking</p>
              </div>
            </div>
            <div className="pt-3 border-t border-farmhouse-beige">
              <p className="text-farmhouse-muted text-xs mb-1">Amount</p>
              <p className="font-serif text-2xl text-farmhouse-dark font-bold">{formatCurrency(Number(booking.price))}</p>
            </div>
            {booking.notes && (
              <div className="bg-farmhouse-cream p-3">
                <p className="text-xs text-farmhouse-muted mb-1">Notes</p>
                <p className="text-farmhouse-dark text-sm">{booking.notes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-white border border-farmhouse-beige p-6 space-y-5">
          <h2 className="font-serif text-xl text-farmhouse-dark border-b border-farmhouse-beige pb-3">Customer</h2>
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <User size={15} className="text-farmhouse-tan" />
              <p className="text-farmhouse-dark font-medium">{booking.customer_name}</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={15} className="text-farmhouse-tan" />
              <a href={`tel:${booking.customer_phone}`} className="text-farmhouse-brown hover:underline">{booking.customer_phone}</a>
            </div>
            {booking.customer_email && (
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-farmhouse-tan" />
                <a href={`mailto:${booking.customer_email}`} className="text-farmhouse-brown hover:underline">{booking.customer_email}</a>
              </div>
            )}
          </div>
        </div>

        {/* Status Management */}
        <div className="bg-white border border-farmhouse-beige p-6 space-y-5">
          <h2 className="font-serif text-xl text-farmhouse-dark border-b border-farmhouse-beige pb-3">Booking Status</h2>
          <div className="flex items-center gap-3 mb-4">
            <span className={`inline-block px-3 py-1.5 text-xs font-semibold ${BOOKING_STATUS_COLORS[booking.booking_status] || ''}`}>
              {booking.booking_status}
            </span>
          </div>
          <div className="flex gap-3 flex-wrap">
            {['pending', 'confirmed', 'cancelled'].map((s) => (
              <button
                key={s}
                onClick={() => updateStatus('booking_status', s)}
                disabled={updating || booking.booking_status === s}
                className="px-4 py-2 text-xs font-semibold border border-farmhouse-beige hover:border-farmhouse-brown hover:text-farmhouse-brown transition-colors capitalize disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Set {s}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Status */}
        <div className="bg-white border border-farmhouse-beige p-6 space-y-5">
          <h2 className="font-serif text-xl text-farmhouse-dark border-b border-farmhouse-beige pb-3">Payment Status</h2>
          <div className="flex items-center gap-3 mb-4">
            <span className={`inline-block px-3 py-1.5 text-xs font-semibold ${PAYMENT_STATUS_COLORS[booking.payment_status] || ''}`}>
              {booking.payment_status}
            </span>
          </div>
          <div className="flex gap-3 flex-wrap">
            {['pending', 'paid', 'failed', 'cancelled'].map((s) => (
              <button
                key={s}
                onClick={() => updateStatus('payment_status', s)}
                disabled={updating || booking.payment_status === s}
                className="px-4 py-2 text-xs font-semibold border border-farmhouse-beige hover:border-farmhouse-brown hover:text-farmhouse-brown transition-colors capitalize disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Set {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="text-farmhouse-muted text-xs">
        Created: {new Date(booking.created_at).toLocaleString('en-ZA')}
      </div>
    </div>
  )
}
