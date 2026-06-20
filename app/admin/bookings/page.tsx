'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search, Plus, Filter, Eye } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import AddBookingModal from '@/components/admin/AddBookingModal'

const statusStyle: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}
const paymentStyle: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-700',
}

interface Booking {
  id: number
  booking_reference: string
  booking_date: string
  booking_type: string
  slot_name: string
  booking_status: string
  payment_status: string
  price: number
  is_manual: boolean
  customer_name: string
  customer_phone: string
  farmhouse_name: string
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterType, setFilterType] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (filterStatus) params.set('status', filterStatus)
      if (filterType) params.set('type', filterType)
      const res = await fetch(`/api/bookings?${params}`)
      const data = await res.json()
      setBookings(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchBookings() }, [search, filterStatus, filterType])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-farmhouse-dark font-bold">Bookings</h1>
          <p className="text-farmhouse-muted text-sm mt-1">Manage all venue bookings</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary text-xs">
          <Plus size={15} /> Add Manual Booking
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-farmhouse-beige p-4 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-farmhouse-muted" />
          <input
            type="text"
            placeholder="Search reference, customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-9 py-2 text-sm"
          />
        </div>
        <div className="flex items-center gap-3">
          <Filter size={14} className="text-farmhouse-muted" />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="input-field py-2 text-sm w-40">
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="input-field py-2 text-sm w-36">
            <option value="">All Types</option>
            <option value="event">Event</option>
            <option value="pool">Pool Party</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-farmhouse-beige">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-farmhouse-cream text-farmhouse-muted text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-5 py-3">Reference</th>
                <th className="text-left px-5 py-3">Customer</th>
                <th className="text-left px-5 py-3">Venue</th>
                <th className="text-left px-5 py-3">Date</th>
                <th className="text-left px-5 py-3">Type</th>
                <th className="text-left px-5 py-3">Slot</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-left px-5 py-3">Payment</th>
                <th className="text-left px-5 py-3">Amount</th>
                <th className="text-left px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-farmhouse-beige">
              {loading ? (
                <tr><td colSpan={10} className="text-center py-10 text-farmhouse-muted">Loading...</td></tr>
              ) : bookings.length === 0 ? (
                <tr><td colSpan={10} className="text-center py-10 text-farmhouse-muted">No bookings found</td></tr>
              ) : bookings.map((b) => (
                <tr key={b.id} className="hover:bg-farmhouse-cream/40">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-farmhouse-brown">{b.booking_reference}</span>
                      {b.is_manual && <span className="text-xs bg-farmhouse-brown/10 text-farmhouse-brown px-1.5 py-0.5">Manual</span>}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-farmhouse-dark font-medium">{b.customer_name}</p>
                    <p className="text-farmhouse-muted text-xs">{b.customer_phone}</p>
                  </td>
                  <td className="px-5 py-4 text-farmhouse-dark">{b.farmhouse_name}</td>
                  <td className="px-5 py-4 text-farmhouse-muted">{new Date(b.booking_date).toLocaleDateString('en-ZA')}</td>
                  <td className="px-5 py-4 text-farmhouse-muted capitalize">{b.booking_type}</td>
                  <td className="px-5 py-4 text-farmhouse-muted capitalize">{b.slot_name.replace('_', ' ')}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-block px-2.5 py-1 text-xs font-semibold ${statusStyle[b.booking_status] || ''}`}>
                      {b.booking_status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-block px-2.5 py-1 text-xs font-semibold ${paymentStyle[b.payment_status] || ''}`}>
                      {b.payment_status}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-medium text-farmhouse-dark">{formatCurrency(Number(b.price))}</td>
                  <td className="px-5 py-4">
                    <Link href={`/admin/bookings/${b.id}`} className="text-farmhouse-brown hover:text-farmhouse-dark">
                      <Eye size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <AddBookingModal
          onClose={() => setShowAddModal(false)}
          onSaved={() => { setShowAddModal(false); fetchBookings() }}
        />
      )}
    </div>
  )
}
