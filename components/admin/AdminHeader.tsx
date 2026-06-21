'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { Bell, ChevronDown, ExternalLink, LogOut } from 'lucide-react'

interface Props {
  userName?: string | null
  userEmail?: string | null
}

export default function AdminHeader({ userName, userEmail }: Props) {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const initials = userName
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) ?? 'A'

  return (
    <header className="bg-white border-b border-farmhouse-beige/70 px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-[0_1px_3px_0_rgba(0,0,0,0.05)]">
      {/* Mobile spacer for hamburger */}
      <div className="lg:hidden w-10" />

      {/* Left side — empty on desktop, could hold breadcrumbs */}
      <div className="hidden lg:block" />

      {/* Right: actions */}
      <div className="flex items-center gap-1.5">
        {/* Notification bell */}
        <button className="w-9 h-9 rounded-xl hover:bg-farmhouse-cream flex items-center justify-center text-farmhouse-muted hover:text-farmhouse-dark transition-colors">
          <Bell size={16} />
        </button>

        <div className="w-px h-5 bg-farmhouse-beige mx-1" />

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 pl-1 pr-2.5 py-1.5 rounded-xl hover:bg-farmhouse-cream transition-colors"
          >
            <div className="w-8 h-8 bg-farmhouse-brown rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0 font-serif">
              {initials}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-farmhouse-dark text-sm font-medium leading-tight">{userName ?? 'Admin'}</p>
              <p className="text-farmhouse-muted text-[11px] leading-tight">{userEmail ?? ''}</p>
            </div>
            <ChevronDown
              size={13}
              className={`text-farmhouse-muted transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {userMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-farmhouse-beige/80 rounded-2xl shadow-xl z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-farmhouse-beige/70">
                  <p className="text-farmhouse-dark text-sm font-semibold leading-tight">{userName ?? 'Admin'}</p>
                  <p className="text-farmhouse-muted text-xs mt-0.5">{userEmail ?? ''}</p>
                </div>
                <div className="py-1.5">
                  <Link
                    href="/"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-farmhouse-dark hover:bg-farmhouse-cream transition-colors"
                  >
                    <ExternalLink size={14} className="text-farmhouse-muted" />
                    View Website
                  </Link>
                  <div className="mx-3 my-1 border-t border-farmhouse-beige/60" />
                  <button
                    onClick={() => signOut({ callbackUrl: '/admin/login' })}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
