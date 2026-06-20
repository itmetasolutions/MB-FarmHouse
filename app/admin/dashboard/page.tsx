export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import { CalendarCheck, DollarSign, Clock, XCircle, TrendingUp, Users } from 'lucide-react'
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

    const monthly = await sql`
      SELECT
        TO_CHAR(booking_date, 'Mon YY') AS month,
        COUNT(*) AS count,
        COALESCE(SUM(price) FILTER (WHERE payment_status = 'paid'), 0) AS revenue
      FROM bookings
      WHERE booking_date >= NOW() - INTERVAL '6 months'
        AND booking_status != 'cancelled'
      GROUP BY TO_CHAR(booking_date, 'Mon YY'), DATE_TRUNC('month', booking_date)
      ORDER BY DATE_TRUNC('month', booking_date)
    `

    const recentBookings = await sql`
      SELECT b.*, c.name as customer_name, c.phone, f.name as farmhouse_name
      FROM bookings b
      LEFT JOIN customers c ON b.customer_id = c.id
      LEFT JOIN farmhouses f ON b.farmhouse_id = f.id
      ORDER BY b.created_at DESC
      LIMIT 8
    `

    return { totals, monthly, recentBookings }
  } catch {
    return {
      totals: { total_bookings: '0', confirmed_bookings: '0', pending_payments: '0', cancelled_bookings: '0', total_revenue: '0' },
      monthly: [],
      recentBookings: [],
    }
  }
}

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

export default async function DashboardPage() {
  const { totals, recentBookings } = await getDashboardStats()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-farmhouse-dark font-bold">Dashboard</h1>
        <p className="text-farmhouse-muted text-sm mt-1">Welcome back. Here's an overview of your bookings.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <StatCard
          title="Total Bookings"
          value={totals.total_bookings}
          subtitle="All time"
          icon={CalendarCheck}
          color="brown"
        />
        <StatCard
          title="Confirmed & Paid"
          value={totals.confirmed_bookings}
          subtitle="Active bookings"
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

      {/* Recent Bookings */}
      <div className="bg-white border border-farmhouse-beige">
        <div className="px-6 py-4 border-b border-farmhouse-beige flex items-center justify-between">
          <h2 className="font-serif text-xl text-farmhouse-dark">Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-farmhouse-brown text-sm font-medium hover:underline">
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-farmhouse-cream text-farmhouse-muted text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-6 py-3">Reference</th>
                <th className="text-left px-6 py-3">Customer</th>
                <th className="text-left px-6 py-3">Venue</th>
                <th className="text-left px-6 py-3">Date</th>
                <th className="text-left px-6 py-3">Slot</th>
                <th className="text-left px-6 py-3">Status</th>
                <th className="text-left px-6 py-3">Payment</th>
                <th className="text-left px-6 py-3">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-farmhouse-beige">
              {(recentBookings as Array<{
                booking_reference: string
                customer_name: string
                farmhouse_name: string
                booking_date: string
                slot_name: string
                booking_status: string
                payment_status: string
                price: number
                id: number
              }>).map((b) => (
                <tr key={b.id} className="hover:bg-farmhouse-cream/50">
                  <td className="px-6 py-4">
                    <Link href={`/admin/bookings/${b.id}`} className="text-farmhouse-brown font-mono text-xs hover:underline">
                      {b.booking_reference}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-farmhouse-dark">{b.customer_name}</td>
                  <td className="px-6 py-4 text-farmhouse-dark">{b.farmhouse_name}</td>
                  <td className="px-6 py-4 text-farmhouse-muted">{new Date(b.booking_date).toLocaleDateString('en-ZA')}</td>
                  <td className="px-6 py-4 text-farmhouse-muted capitalize">{b.slot_name}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2.5 py-1 text-xs font-semibold ${statusStyle[b.booking_status] || 'bg-gray-100 text-gray-700'}`}>
                      {b.booking_status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2.5 py-1 text-xs font-semibold ${paymentStyle[b.payment_status] || 'bg-gray-100 text-gray-700'}`}>
                      {b.payment_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-farmhouse-dark font-medium">{formatCurrency(Number(b.price))}</td>
                </tr>
              ))}
              {recentBookings.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-farmhouse-muted text-sm">
                    No bookings yet. The first booking will appear here.
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
