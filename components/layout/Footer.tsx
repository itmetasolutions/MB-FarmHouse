import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-farmhouse-dark text-farmhouse-cream">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="font-serif text-2xl font-bold text-white tracking-wider">MB FARMHOUSE</h3>
              <p className="text-farmhouse-tan text-xs tracking-[0.3em] uppercase mt-1">Premium Venues</p>
            </div>
            <p className="text-farmhouse-beige/70 text-sm leading-relaxed mb-6">
              Creating unforgettable moments in South Africa's most beautiful farmhouse venues.
              From intimate gatherings to grand celebrations.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://facebook.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-farmhouse-brown/50 hover:bg-farmhouse-brown flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-farmhouse-brown/50 hover:bg-farmhouse-brown flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-6 text-white">Explore</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/farmhouses', label: 'Our Farmhouses' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-farmhouse-beige/70 hover:text-farmhouse-tan text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bookings */}
          <div>
            <h4 className="font-serif text-lg mb-6 text-white">Book a Venue</h4>
            <ul className="space-y-3">
              {[
                { href: '/book-event', label: 'Event Booking' },
                { href: '/book-pool', label: 'Pool Party Booking' },
                { href: '/farmhouses#willows-estate', label: 'The Willows Estate' },
                { href: '/farmhouses#sunset-barn', label: 'Sunset Barn' },
                { href: '/farmhouses#orchard-house', label: 'The Orchard House' },
                { href: '/farmhouses#meadow-haven', label: 'Meadow Haven' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-farmhouse-beige/70 hover:text-farmhouse-tan text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg mb-6 text-white">Get In Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={15} className="text-farmhouse-tan mt-0.5 shrink-0" />
                <a
                  href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
                  className="text-farmhouse-beige/70 hover:text-farmhouse-tan text-sm transition-colors"
                >
                  {process.env.NEXT_PUBLIC_PHONE || '+27 XX XXX XXXX'}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-farmhouse-tan mt-0.5 shrink-0" />
                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                  className="text-farmhouse-beige/70 hover:text-farmhouse-tan text-sm transition-colors"
                >
                  {process.env.NEXT_PUBLIC_EMAIL || 'info@mbfarmhouse.co.za'}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-farmhouse-tan mt-0.5 shrink-0" />
                <span className="text-farmhouse-beige/70 text-sm">
                  {process.env.NEXT_PUBLIC_ADDRESS || 'Pretoria, Gauteng, South Africa'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-farmhouse-brown/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-farmhouse-beige/50 text-xs">
            © {year} MB Farmhouse. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="text-farmhouse-beige/50 hover:text-farmhouse-tan text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-farmhouse-beige/50 hover:text-farmhouse-tan text-xs transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
