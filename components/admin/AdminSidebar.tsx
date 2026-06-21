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
  ExternalLink,
  TreePine,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const mainNav = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { href: '/admin/prices', label: 'Prices & Slots', icon: DollarSign },
  { href: '/admin/customers', label: 'Customers', icon: Users },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const content = (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-white/[0.07] shrink-0">
        <Link href="/admin/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
          <div className="w-9 h-9 bg-farmhouse-brown rounded-xl flex items-center justify-center shadow-md shrink-0">
            <TreePine size={17} className="text-white" />
          </div>
          <div className="min-w-0">
            <p className="font-serif text-[15px] font-bold text-white tracking-wide leading-tight truncate">MB Farmhouse</p>
            <p className="text-[10px] text-white/30 tracking-widest uppercase mt-0.5">Admin Portal</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25 px-3 mb-2">Main Menu</p>
          <div className="space-y-0.5">
            {mainNav.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || (href !== '/admin/dashboard' && pathname.startsWith(href))
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                    active
                      ? 'bg-farmhouse-brown text-white shadow-md shadow-farmhouse-brown/25'
                      : 'text-white/55 hover:bg-white/[0.07] hover:text-white/90'
                  )}
                >
                  <div className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center transition-all shrink-0',
                    active ? 'bg-white/20' : 'bg-white/[0.06]'
                  )}>
                    <Icon size={15} />
                  </div>
                  <span className="flex-1 truncate">{label}</span>
                  {active && <ChevronRight size={13} className="opacity-50 shrink-0" />}
                </Link>
              )
            })}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25 px-3 mb-2">General</p>
          <div className="space-y-0.5">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/55 hover:bg-white/[0.07] hover:text-white/90 transition-all"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.06] shrink-0">
                <ExternalLink size={15} />
              </div>
              <span>View Website</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Sign Out */}
      <div className="px-3 py-3 border-t border-white/[0.07] shrink-0">
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/45 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.06] shrink-0">
            <LogOut size={15} />
          </div>
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-[#1C1917] rounded-xl flex items-center justify-center text-white shadow-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#1C1917] min-h-screen fixed left-0 top-0 bottom-0 z-40 border-r border-white/[0.05]">
        {content}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="lg:hidden flex flex-col w-64 bg-[#1C1917] fixed left-0 top-0 bottom-0 z-50">
            {content}
          </aside>
        </>
      )}
    </>
  )
}
