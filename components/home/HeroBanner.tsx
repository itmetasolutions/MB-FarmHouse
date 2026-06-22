import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Waves, Calendar, MapPin } from 'lucide-react'

const cards = [
  { href: '/book-pool', label: 'Book A Pool Party', desc: 'Splash events & pool day packages', icon: Waves },
  { href: '/book-event', label: 'Book An Event', desc: 'Weddings, birthdays & corporate', icon: Calendar },
  { href: '/farmhouses', label: 'Explore Venues', desc: 'Browse our 4 exclusive farmhouses', icon: MapPin },
]

export default function HeroBanner() {
  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] flex items-start lg:items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=2000&q=85"
          alt="MB Farmhouse — Premium Farmhouse Venue"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-farmhouse-dark/85 via-farmhouse-dark/60 to-farmhouse-dark/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 lg:pt-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-8 xl:gap-16">

          {/* Text */}
          <div className="lg:max-w-2xl">
            <p className="text-farmhouse-tan text-xs lg:text-sm font-medium tracking-[0.4em] uppercase mb-2 lg:mb-4">
              Welcome to MB Farmhouse
            </p>
            <h1 className="font-serif text-[2rem] leading-[1.08] md:text-6xl lg:text-7xl text-white font-bold lg:leading-[1.05] mb-3 lg:mb-6 text-shadow-lg">
              Where Every<br />
              <span className="text-farmhouse-tan italic">Celebration</span><br />
              Becomes a Memory
            </h1>
            <p className="text-farmhouse-beige/90 text-sm lg:text-xl font-light leading-relaxed max-w-xl mb-3 lg:mb-0">
              Four exclusive farmhouse venues set in the heart of South Africa&apos;s countryside.
              Crafted for events, pool parties, weddings, and unforgettable gatherings.
            </p>
          </div>

          {/* Action Cards */}
          <div className="flex flex-col gap-2 lg:gap-3 lg:w-72 xl:w-80 lg:flex-shrink-0">
            {cards.map(({ href, label, desc, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-3 lg:gap-4 bg-farmhouse-dark/70 backdrop-blur-sm border border-farmhouse-tan/30 hover:border-farmhouse-tan hover:bg-farmhouse-dark/90 px-4 py-3 lg:px-5 lg:py-4 transition-all duration-300"
              >
                <div className="w-9 h-9 lg:w-12 lg:h-12 bg-farmhouse-tan/20 flex items-center justify-center flex-shrink-0 rounded-sm">
                  <Icon size={18} className="text-farmhouse-tan" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">{label}</p>
                  <p className="text-farmhouse-cream/70 text-xs mt-0.5 hidden lg:block">{desc}</p>
                </div>
                <ArrowRight size={14} className="text-farmhouse-tan opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-farmhouse-white to-transparent z-10" />

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2">
        <span className="text-farmhouse-cream/50 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-farmhouse-cream/50 to-transparent" />
      </div>
    </section>
  )
}
