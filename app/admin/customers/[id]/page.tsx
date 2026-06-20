'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Phone, Mail, Calendar } from 'lucide-react'
import { formatCurrency, formatDate, SLOT_LABELS, BOOKING_STATUS_COLORS, PAYMENT_STATUS_COLORS } from '@/lib/utils'

interface CustomerDetail {
  id: number
  name: string
  email: string | null
  phone: string
  created_at: string
  bookings: Array<{
    id: number
    booking_reference: string
    booking_date: string
    booking_type: string
    slot_name: string
    booking_status: string
    payment_status: string
    price: number
    farmhouse_name: string
  }>
}

export default function CustomerDetailPage() {
  const params = useParams()
  const [customer, setCustomer] = useState<CustomerDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/customers/${params.id}`)
      .then((r) => r.json())
      .then(setCustomer)
      .finally(() => setLoading(false))
  }, [params.id])

  if (loading) return <div className="text-center py-20 text-farmhouse-muted">Loading...</div>
  if (!customer) return (
    <div className="text-center py-20">
      <p className="text-farmhouse-muted">Customer not found</p>
      <Link href="/admin/customers" className="btn-primary mt-4 inline-flex">Back</Link>
    </div>
  )

  const totalSpent = customer.bookings
    .filter((b) => b.payment_status === 'paid')
    .reduce((sum, b) => sum + Number(b.price), 0)

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/customers" className="flex items-center gap-2 text-farmhouse-muted hover:text-farmhouse-dark text-sm">
          <ArrowLeft size={15} /> Back
        </Link>
        <h1 className="font-serif text-3xl text-farmhouse-dark font-bold">Customer Profile</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Profile Card */}
        <div className="bg-white border border-farmhouse-beige p-6 col-span-1">
          <div className="w-16 h-16 bg-farmhouse-brown flex items-center justify-center text-farmhouse-cream font-serif text-2xl font-bold mb-4">
            {customer.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="font-serif text-xl text-farmhouse-dark mb-1">{customer.name}</h2>
          <div className="space-y-3 mt-4 text-sm">
            {customer.phone && (
              <div className="flex items-center gap-2 text-farmhouse-muted">
                <Phone size={13} />
                <a href={`tel:${customer.phone}`} className="hover:text-farmhouse-brown">{customer.phone}</a>
              </div>
            )}
            {customer.email && (
              <div className="flex items-center gap-2 text-farmhouse-muted">
                <Mail size={13} />
                <a href={`mailto:${customer.email}`} className="hover:text-farmhouse-brown">{customer.email}</a>
              </div>
            )}
            <div className="flex items-center gap-2 text-farmhouse-muted">
              <Calendar size={13} />
              <span>Member since {new Date(customer.created_at).toLocaleDateString('en-ZA')}</span>
            </div>
          </div>
          <div className="border-t border-farmhouse-beige mt-5 pt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-farmhouse-muted">Total Bookings</span>
              <span className="font-bold text-farmhouse-dark">{customer.bookings.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-farmhouse-muted">Total Spent</span>
              <span className="font-bold text-farmhouse-brown">{formatCurrency(totalSpent)}</span>
            </div>
          </div>
        </div>

        {/* Bookings */}
        <div className="bg-white border border-farmhouse-beige col-span-2">
          <div className="px-6 py-4 border-b border-farmhouse-beige">
            <h2 className="font-serif text-xl text-farmhouse-dark">Booking History</h2>
          </div>
          <div className="divide-y divide-farmhouse-beige">
            {customer.bookings.length === 0 ? (
              <p className="text-center py-10 text-farmhouse-muted text-sm">No bookings yet</p>
            ) : customer.bookings.map((b) => (
              <div key={b.id} className="p-5 hover:bg-farmhouse-cream/30">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Link href={`/admin/bookings/${b.id}`} className="font-mono text-xs text-farmhouse-brown hover:underline">
                        {b.booking_reference}
                      </Link>
                      <span className={`inline-block px-2 py-0.5 text-xs font-semibold ${BOOKING_STATUS_COLORS[b.booking_status] || ''}`}>
                        {b.booking_status}
                      </span>
                      <span className={`inline-block px-2 py-0.5 text-xs font-semibold ${PAYMENT_STATUS_COLORS[b.payment_status] || ''}`}>
                        {b.payment_status}
                      </span>
                    </div>
                    <p className="text-farmhouse-dark text-sm font-medium">{b.farmhouse_name}</p>
                    <p className="text-farmhouse-muted text-xs mt-0.5">
                      {formatDate(b.booking_date)} · {SLOT_LABELS[b.slot_name] || b.slot_name} · {b.booking_type}
                    </p>
                  </div>
                  <span className="font-serif text-lg font-bold text-farmhouse-dark whitespace-nowrap">
                    {formatCurrency(Number(b.price))}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
