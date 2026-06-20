'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard,
  CalendarCheck,
  DollarSign,
  Users,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { href: '/admin/prices', label: 'Prices & Slots', icon: DollarSign },
  { href: '/admin/customers', label: 'Customers', icon: Users },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const content = (
    <>
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <Link href="/admin/dashboard" onClick={() => setMobileOpen(false)}>
          <p className="font-serif text-xl font-bold text-white tracking-wider">MB FARMHOUSE</p>
          <p className="text-farmhouse-tan text-xs tracking-widest uppercase mt-0.5">Admin Portal</p>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors',
              pathname.startsWith(href)
                ? 'bg-farmhouse-brown text-white'
                : 'text-farmhouse-beige/70 hover:bg-white/10 hover:text-white'
            )}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Sign Out */}
      <div className="px-4 py-4 border-t border-white/10">
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-farmhouse-beige/70 hover:text-red-400 hover:bg-red-400/10 w-full transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
        <Link href="/" className="flex items-center gap-3 px-4 py-2 text-xs text-farmhouse-beige/40 hover:text-farmhouse-tan transition-colors mt-1">
          ← View Website
        </Link>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-farmhouse-dark flex items-center justify-center text-white shadow-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-farmhouse-dark min-h-screen fixed left-0 top-0 bottom-0 z-40">
        {content}
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="lg:hidden flex flex-col w-60 bg-farmhouse-dark fixed left-0 top-0 bottom-0 z-50">
            {content}
          </aside>
        </>
      )}
    </>
  )
}
