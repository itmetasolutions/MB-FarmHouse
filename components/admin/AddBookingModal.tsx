'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { FARMHOUSES } from '@/lib/farmhouses'
import { SLOT_LABELS } from '@/lib/utils'

interface Props {
  onClose: () => void
  onSaved: () => void
}

export default function AddBookingModal({ onClose, onSaved }: Props) {
  const [form, setForm] = useState({
    farmhouse_id: '',
    booking_type: 'event',
    booking_date: '',
    slot_name: '',
    name: '',
    phone: '',
    email: '',
    notes: '',
    price: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const eventSlots = ['afternoon', 'evening']
  const poolSlots = ['morning', 'evening', 'night', 'full_day']
  const slots = form.booking_type === 'event' ? eventSlots : poolSlots

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.farmhouse_id || !form.booking_date || !form.slot_name) {
      setError('Please fill in all required fields')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, is_manual: true }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create booking')
      onSaved()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-farmhouse-beige">
          <h2 className="font-serif text-xl text-farmhouse-dark">Add Manual Booking</h2>
          <button onClick={onClose} className="text-farmhouse-muted hover:text-farmhouse-dark">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">{error}</div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-farmhouse-muted uppercase tracking-wide mb-2">Venue *</label>
              <select value={form.farmhouse_id} onChange={(e) => setForm({ ...form, farmhouse_id: e.target.value })} className="input-field text-sm" required>
                <option value="">Select venue</option>
                {FARMHOUSES.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-farmhouse-muted uppercase tracking-wide mb-2">Booking Type *</label>
              <select value={form.booking_type} onChange={(e) => setForm({ ...form, booking_type: e.target.value, slot_name: '' })} className="input-field text-sm">
                <option value="event">Event</option>
                <option value="pool">Pool Party</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-farmhouse-muted uppercase tracking-wide mb-2">Date *</label>
              <input type="date" required className="input-field text-sm" value={form.booking_date} onChange={(e) => setForm({ ...form, booking_date: e.target.value })} min={new Date().toISOString().split('T')[0]} />
            </div>
            <div>
              <label className="block text-xs text-farmhouse-muted uppercase tracking-wide mb-2">Slot *</label>
              <select value={form.slot_name} onChange={(e) => setForm({ ...form, slot_name: e.target.value })} className="input-field text-sm" required>
                <option value="">Select slot</option>
                {slots.map((s) => <option key={s} value={s}>{SLOT_LABELS[s] || s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs text-farmhouse-muted uppercase tracking-wide mb-2">Price (ZAR)</label>
            <input type="number" className="input-field text-sm" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0.00" min="0" step="0.01" />
          </div>
          <div className="border-t border-farmhouse-beige pt-4">
            <p className="text-xs text-farmhouse-muted uppercase tracking-wide mb-3">Customer Details</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-farmhouse-muted mb-2">Full Name *</label>
                <input type="text" required className="input-field text-sm" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs text-farmhouse-muted mb-2">Phone *</label>
                <input type="tel" required className="input-field text-sm" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs text-farmhouse-muted mb-2">Email</label>
              <input type="email" className="input-field text-sm" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="mt-4">
              <label className="block text-xs text-farmhouse-muted mb-2">Notes</label>
              <textarea rows={3} className="input-field text-sm resize-none" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 text-xs">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 text-xs disabled:opacity-50">
              {loading ? 'Saving...' : 'Create Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
