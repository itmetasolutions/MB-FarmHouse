export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import { CalendarCheck, DollarSign, Clock, XCircle, TrendingUp, Users, ArrowRight, Plus } from 'lucide-react'
import StatCard from '@/components/admin/StatCard'
import { formatCurrency } from '@/lib/utils'
import sql from '@/lib/db'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Dashboard' }

async function getDashboardStats() {
  try {
    const [totals] = await sql`
      SELECT
        COUNT(*) FILTER (WHERE booking_status != 'cancelled') AS total_bookings,
        COUNT(*) FILTER (WHERE booking_status = 'confirmed' AND payment_status = 'paid') AS confirmed_bookings,
        COUNT(*) FILTER (WHERE payment_status = 'pending' AND booking_status != 'cancelled') AS pending_payments,
        COUNT(*) FILTER (WHERE booking_status = 'cancelled') AS cancelled_bookings,
        COALESCE(SUM(price) FILTER (WHERE payment_status = 'paid'), 0) AS total_revenue
      FROM bookings
    ` as unknown as [{
      total_bookings: string
      confirmed_bookings: string
      pending_payments: string
      cancelled_bookings: string
      total_revenue: string
    }]

    const recentBookings = await sql`
      SELECT b.*, c.name as customer_name, c.phone, f.name as farmhouse_name
      FROM bookings b
      LEFT JOIN customers c ON b.customer_id = c.id
      LEFT JOIN farmhouses f ON b.farmhouse_id = f.id
      ORDER BY b.created_at DESC
      LIMIT 8
    `

    return { totals, recentBookings }
  } catch {
    return {
      totals: {
        total_bookings: '0',
        confirmed_bookings: '0',
        pending_payments: '0',
        cancelled_bookings: '0',
        total_revenue: '0',
      },
      recentBookings: [],
    }
  }
}

const statusStyle: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700 border border-amber-200/80',
  confirmed: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
  cancelled: 'bg-red-50 text-red-600 border border-red-200/80',
}

const paymentStyle: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700 border border-amber-200/80',
  paid: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
  failed: 'bg-red-50 text-red-600 border border-red-200/80',
  cancelled: 'bg-gray-50 text-gray-500 border border-gray-200/80',
}

const quickActions = [
  { label: 'All Bookings', href: '/admin/bookings', style: 'bg-farmhouse-brown text-white hover:bg-farmhouse-dark shadow-sm' },
  { label: 'Prices & Slots', href: '/admin/prices', style: 'bg-white text-farmhouse-dark border border-farmhouse-beige hover:bg-farmhouse-cream' },
  { label: 'Customers', href: '/admin/customers', style: 'bg-white text-farmhouse-dark border border-farmhouse-beige hover:bg-farmhouse-cream' },
  { label: 'View Website', href: '/', style: 'bg-white text-farmhouse-dark border border-farmhouse-beige hover:bg-farmhouse-cream' },
]

export default async function DashboardPage() {
  const { totals, recentBookings } = await getDashboardStats()

  const today = new Date().toLocaleDateString('en-ZA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="space-y-8 max-w-[1400px]">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-farmhouse-muted text-xs font-medium tracking-wide">{today}</p>
          <h1 className="font-serif text-3xl text-farmhouse-dark font-bold mt-1">Welcome back</h1>
          <p className="text-farmhouse-muted text-sm mt-1">Here's an overview of your farmhouse bookings.</p>
        </div>
        <Link
          href="/admin/bookings"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-farmhouse-brown text-white rounded-xl text-sm font-medium hover:bg-farmhouse-dark transition-colors shadow-sm shrink-0"
        >
          <Plus size={15} />
          New Booking
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard
          title="Total Bookings"
          value={totals.total_bookings}
          subtitle="All active bookings"
          icon={CalendarCheck}
          color="brown"
        />
        <StatCard
          title="Confirmed & Paid"
          value={totals.confirmed_bookings}
          subtitle="Successfully completed"
          icon={TrendingUp}
          color="green"
        />
        <StatCard
          title="Pending Payments"
          value={totals.pending_payments}
          subtitle="Awaiting payment"
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title="Cancelled"
          value={totals.cancelled_bookings}
          subtitle="Cancelled bookings"
          icon={XCircle}
          color="red"
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(Number(totals.total_revenue))}
          subtitle="From confirmed bookings"
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title="Venues"
          value="4"
          subtitle="Active farmhouses"
          icon={Users}
          color="blue"
        />
      </div>

      {/* Quick actions */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-farmhouse-muted mb-3">Quick Actions</p>
        <div className="flex flex-wrap gap-2.5">
          {quickActions.map(({ label, href, style }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${style}`}
            >
              {label}
              <ArrowRight size={13} className="opacity-60" />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent bookings */}
      <div className="bg-white rounded-2xl border border-black/[0.05] shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-farmhouse-beige/60 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl text-farmhouse-dark font-semibold">Recent Bookings</h2>
            <p className="text-farmhouse-muted text-xs mt-0.5">Latest 8 bookings across all venues</p>
          </div>
          <Link
            href="/admin/bookings"
            className="flex items-center gap-1.5 text-farmhouse-brown text-sm font-medium hover:text-farmhouse-dark transition-colors"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F5F3EF]">
                {['Reference', 'Customer', 'Venue', 'Date', 'Slot', 'Status', 'Payment', 'Amount'].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-[10px] font-semibold text-farmhouse-muted uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-farmhouse-beige/40">
              {(recentBookings as Array<{
                id: number
                booking_reference: string
                customer_name: string
                farmhouse_name: string
                booking_date: string
                slot_name: string
                booking_status: string
                payment_status: string
                price: number
              }>).map((b) => (
                <tr key={b.id} className="hover:bg-farmhouse-cream/40 transition-colors">
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/bookings/${b.id}`}
                      className="text-farmhouse-brown font-mono text-xs font-semibold hover:underline"
                    >
                      {b.booking_reference}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-farmhouse-beige flex items-center justify-center text-farmhouse-brown font-bold text-xs shrink-0 font-serif">
                        {b.customer_name?.charAt(0)?.toUpperCase() ?? '?'}
                      </div>
                      <span className="text-farmhouse-dark font-medium whitespace-nowrap">{b.customer_name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-farmhouse-dark whitespace-nowrap">{b.farmhouse_name}</td>
                  <td className="px-6 py-4 text-farmhouse-muted text-xs whitespace-nowrap">
                    {new Date(b.booking_date).toLocaleDateString('en-ZA')}
                  </td>
                  <td className="px-6 py-4 text-farmhouse-muted text-xs capitalize whitespace-nowrap">{b.slot_name}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize whitespace-nowrap ${statusStyle[b.booking_status] ?? 'bg-gray-50 text-gray-500 border border-gray-200/80'}`}>
                      {b.booking_status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize whitespace-nowrap ${paymentStyle[b.payment_status] ?? 'bg-gray-50 text-gray-500 border border-gray-200/80'}`}>
                      {b.payment_status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-farmhouse-dark font-semibold whitespace-nowrap">
                      {formatCurrency(Number(b.price))}
                    </span>
                  </td>
                </tr>
              ))}

              {recentBookings.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-farmhouse-cream flex items-center justify-center">
                        <CalendarCheck size={22} className="text-farmhouse-muted" />
                      </div>
                      <div>
                        <p className="text-farmhouse-dark font-medium text-sm">No bookings yet</p>
                        <p className="text-farmhouse-muted text-xs mt-0.5">The first booking will appear here.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
