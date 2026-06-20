'use client'

import { useEffect, useState } from 'react'
import { Save, RefreshCw } from 'lucide-react'
import { FARMHOUSES } from '@/lib/farmhouses'
import { formatCurrency } from '@/lib/utils'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const EVENT_SLOTS = [
  { key: 'afternoon', label: 'Afternoon' },
  { key: 'evening', label: 'Evening' },
]
const POOL_SLOTS = [
  { key: 'morning', label: 'Morning' },
  { key: 'evening', label: 'Evening' },
  { key: 'night', label: 'Night' },
  { key: 'full_day', label: 'Full Day' },
]

interface PriceRow {
  id?: number
  farmhouse_id: number
  booking_type: string
  slot_name: string
  day_of_week: number
  price: number
  start_time: string
  end_time: string
}

export default function AdminPricesPage() {
  const [prices, setPrices] = useState<PriceRow[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [selectedFarmhouse, setSelectedFarmhouse] = useState(1)
  const [selectedType, setSelectedType] = useState<'event' | 'pool'>('event')

  const slots = selectedType === 'event' ? EVENT_SLOTS : POOL_SLOTS

  useEffect(() => {
    setLoading(true)
    fetch(`/api/prices?farmhouse_id=${selectedFarmhouse}&booking_type=${selectedType}`)
      .then((r) => r.json())
      .then((data) => {
        // Fill in missing entries with defaults
        const filled: PriceRow[] = []
        for (let day = 0; day < 7; day++) {
          for (const slot of slots) {
            const existing = data.find(
              (p: PriceRow) =>
                p.day_of_week === day &&
                p.slot_name === slot.key &&
                p.booking_type === selectedType
            )
            filled.push(existing || {
              farmhouse_id: selectedFarmhouse,
              booking_type: selectedType,
              slot_name: slot.key,
              day_of_week: day,
              price: 0,
              start_time: slot.key === 'morning' ? '08:00' : slot.key === 'afternoon' ? '12:00' : slot.key === 'evening' ? '14:00' : slot.key === 'night' ? '19:00' : '08:00',
              end_time: slot.key === 'morning' ? '14:00' : slot.key === 'afternoon' ? '18:00' : slot.key === 'evening' ? '22:00' : slot.key === 'night' ? '01:00' : '23:00',
            })
          }
        }
        setPrices(filled)
      })
      .finally(() => setLoading(false))
  }, [selectedFarmhouse, selectedType])

  const updateRow = (dayOfWeek: number, slotName: string, field: keyof PriceRow, value: string | number) => {
    setPrices((prev) =>
      prev.map((p) =>
        p.day_of_week === dayOfWeek && p.slot_name === slotName
          ? { ...p, [field]: value }
          : p
      )
    )
  }

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    try {
      const res = await fetch('/api/prices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prices }),
      })
      if (!res.ok) throw new Error('Save failed')
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-3xl text-farmhouse-dark font-bold">Prices & Slots</h1>
          <p className="text-farmhouse-muted text-sm mt-1">Set prices and timings for each day of the week</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary text-xs">
          {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Prices'}
        </button>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-800 text-sm px-4 py-3">
          Prices updated successfully. They will reflect on the customer website immediately.
        </div>
      )}

      {/* Selectors */}
      <div className="flex flex-wrap gap-4 bg-white border border-farmhouse-beige p-4">
        <div>
          <label className="block text-xs text-farmhouse-muted uppercase tracking-wide mb-2">Venue</label>
          <select
            className="input-field text-sm"
            value={selectedFarmhouse}
            onChange={(e) => setSelectedFarmhouse(Number(e.target.value))}
          >
            {FARMHOUSES.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-farmhouse-muted uppercase tracking-wide mb-2">Booking Type</label>
          <div className="flex gap-2">
            {(['event', 'pool'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  selectedType === t
                    ? 'bg-farmhouse-brown text-farmhouse-cream'
                    : 'bg-farmhouse-cream border border-farmhouse-beige text-farmhouse-dark hover:border-farmhouse-brown'
                }`}
              >
                {t === 'event' ? 'Event Slots' : 'Pool Party Slots'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Price Table */}
      <div className="bg-white border border-farmhouse-beige">
        {loading ? (
          <div className="text-center py-16 text-farmhouse-muted">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-farmhouse-cream">
                <tr>
                  <th className="text-left px-5 py-3 text-farmhouse-muted text-xs uppercase tracking-wide">Day</th>
                  {slots.map((s) => (
                    <th key={s.key} colSpan={3} className="text-center px-3 py-3 text-farmhouse-brown text-xs uppercase tracking-wide border-l border-farmhouse-beige">
                      {s.label}
                    </th>
                  ))}
                </tr>
                <tr className="border-t border-farmhouse-beige">
                  <th className="px-5 py-2"></th>
                  {slots.map((s) => (
                    <>
                      <th key={`${s.key}-start`} className="px-3 py-2 text-xs text-farmhouse-muted font-normal border-l border-farmhouse-beige">Start</th>
                      <th key={`${s.key}-end`} className="px-3 py-2 text-xs text-farmhouse-muted font-normal">End</th>
                      <th key={`${s.key}-price`} className="px-3 py-2 text-xs text-farmhouse-muted font-normal">Price (ZAR)</th>
                    </>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-farmhouse-beige">
                {DAYS.map((day, dayIdx) => (
                  <tr key={day} className="hover:bg-farmhouse-cream/30">
                    <td className="px-5 py-3 font-medium text-farmhouse-dark whitespace-nowrap">{day}</td>
                    {slots.map((slot) => {
                      const row = prices.find((p) => p.day_of_week === dayIdx && p.slot_name === slot.key)
                      if (!row) return <td key={slot.key} colSpan={3} />
                      return (
                        <>
                          <td key={`${slot.key}-start`} className="px-2 py-2 border-l border-farmhouse-beige">
                            <input
                              type="time"
                              value={row.start_time}
                              onChange={(e) => updateRow(dayIdx, slot.key, 'start_time', e.target.value)}
                              className="border border-farmhouse-beige bg-farmhouse-cream text-farmhouse-dark text-xs px-2 py-1.5 w-24 focus:outline-none focus:border-farmhouse-brown"
                            />
                          </td>
                          <td key={`${slot.key}-end`} className="px-2 py-2">
                            <input
                              type="time"
                              value={row.end_time}
                              onChange={(e) => updateRow(dayIdx, slot.key, 'end_time', e.target.value)}
                              className="border border-farmhouse-beige bg-farmhouse-cream text-farmhouse-dark text-xs px-2 py-1.5 w-24 focus:outline-none focus:border-farmhouse-brown"
                            />
                          </td>
                          <td key={`${slot.key}-price`} className="px-2 py-2">
                            <div className="relative">
                              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-farmhouse-muted text-xs">R</span>
                              <input
                                type="number"
                                min="0"
                                step="50"
                                value={row.price}
                                onChange={(e) => updateRow(dayIdx, slot.key, 'price', Number(e.target.value))}
                                className="border border-farmhouse-beige bg-farmhouse-cream text-farmhouse-dark text-xs pl-6 pr-2 py-1.5 w-28 focus:outline-none focus:border-farmhouse-brown"
                              />
                            </div>
                          </td>
                        </>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-farmhouse-muted text-xs">
        * Prices set to R0 will display as "Contact us for pricing". Changes are reflected on the customer website immediately after saving.
      </p>
    </div>
  )
}
