'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search, Eye, Phone } from 'lucide-react'

interface Customer {
  id: number
  name: string
  email: string | null
  phone: string
  created_at: string
  total_bookings: number
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    fetch(`/api/customers?${params}`)
      .then((r) => r.json())
      .then(setCustomers)
      .finally(() => setLoading(false))
  }, [search])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-farmhouse-dark font-bold">Customers</h1>
        <p className="text-farmhouse-muted text-sm mt-1">View all registered customers</p>
      </div>

      {/* Search */}
      <div className="bg-white border border-farmhouse-beige p-4">
        <div className="relative max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-farmhouse-muted" />
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-9 py-2 text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-farmhouse-beige">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-farmhouse-cream text-farmhouse-muted text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-6 py-3">Customer</th>
                <th className="text-left px-6 py-3">Phone</th>
                <th className="text-left px-6 py-3">Email</th>
                <th className="text-left px-6 py-3">Bookings</th>
                <th className="text-left px-6 py-3">Member Since</th>
                <th className="text-left px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-farmhouse-beige">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-10 text-farmhouse-muted">Loading...</td></tr>
              ) : customers.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-10 text-farmhouse-muted">No customers found</td></tr>
              ) : customers.map((c) => (
                <tr key={c.id} className="hover:bg-farmhouse-cream/40">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-farmhouse-brown/20 flex items-center justify-center text-farmhouse-brown font-serif font-bold text-sm shrink-0">
                        {c.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-farmhouse-dark font-medium">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a href={`tel:${c.phone}`} className="flex items-center gap-1.5 text-farmhouse-brown hover:underline">
                      <Phone size={12} /> {c.phone}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-farmhouse-muted">{c.email || '—'}</td>
                  <td className="px-6 py-4">
                    <span className="bg-farmhouse-brown/10 text-farmhouse-brown text-xs font-semibold px-2.5 py-1">
                      {c.total_bookings} booking{Number(c.total_bookings) !== 1 ? 's' : ''}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-farmhouse-muted">
                    {new Date(c.created_at).toLocaleDateString('en-ZA')}
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/customers/${c.id}`} className="text-farmhouse-brown hover:text-farmhouse-dark">
                      <Eye size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
