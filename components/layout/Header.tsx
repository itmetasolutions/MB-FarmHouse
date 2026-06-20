'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/farmhouses', label: 'Farmhouses' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About Us' },
  {
    href: '#book',
    label: 'Book Now',
    children: [
      { href: '/book-event', label: 'Book an Event' },
      { href: '/book-pool', label: 'Pool Party' },
    ],
  },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isHome = pathname === '/'

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled || !isHome
          ? 'bg-farmhouse-dark shadow-lg py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-serif text-2xl font-bold text-farmhouse-cream tracking-wider">
            MB FARMHOUSE
          </span>
          <span className="text-farmhouse-tan text-xs tracking-[0.3em] uppercase font-light">
            Premium Venues
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button className="flex items-center gap-1 text-farmhouse-cream hover:text-farmhouse-tan transition-colors text-sm font-medium tracking-wide">
                  {link.label}
                  <ChevronDown size={14} />
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-farmhouse-dark border border-farmhouse-brown shadow-xl">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-5 py-3 text-sm text-farmhouse-cream hover:bg-farmhouse-brown hover:text-white transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium tracking-wide transition-colors',
                  pathname === link.href
                    ? 'text-farmhouse-tan'
                    : 'text-farmhouse-cream hover:text-farmhouse-tan'
                )}
              >
                {link.label}
              </Link>
            )
          )}
          <Link href="/book-event" className="btn-primary text-xs py-2 px-6">
            Book Now
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-farmhouse-cream"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden bg-farmhouse-dark border-t border-farmhouse-brown">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.href}>
                <div className="px-6 py-3 text-farmhouse-tan text-sm font-semibold tracking-widest uppercase">
                  {link.label}
                </div>
                {link.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-10 py-2.5 text-sm text-farmhouse-cream hover:text-farmhouse-tan transition-colors"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'block px-6 py-3 text-sm font-medium transition-colors border-b border-farmhouse-brown/30',
                  pathname === link.href
                    ? 'text-farmhouse-tan'
                    : 'text-farmhouse-cream hover:text-farmhouse-tan'
                )}
              >
                {link.label}
              </Link>
            )
          )}
          <div className="px-6 py-4">
            <Link
              href="/book-event"
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full text-center text-xs"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
