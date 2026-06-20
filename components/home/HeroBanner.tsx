import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function HeroBanner() {
  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] flex items-center overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-r from-farmhouse-dark/80 via-farmhouse-dark/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="max-w-2xl">
          <p className="text-farmhouse-tan text-sm font-medium tracking-[0.4em] uppercase mb-4">
            Welcome to MB Farmhouse
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-[1.05] mb-6 text-shadow-lg">
            Where Every<br />
            <span className="text-farmhouse-tan italic">Celebration</span><br />
            Becomes a Memory
          </h1>
          <p className="text-farmhouse-beige/90 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl">
            Four exclusive farmhouse venues set in the heart of South Africa's countryside.
            Crafted for events, pool parties, weddings, and unforgettable gatherings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/book-event" className="btn-primary text-sm">
              Book an Event
              <ArrowRight size={16} />
            </Link>
            <Link href="/farmhouses" className="btn-cream text-sm">
              Explore Venues
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-farmhouse-white to-transparent z-10" />

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-farmhouse-cream/50 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-farmhouse-cream/50 to-transparent" />
      </div>
    </section>
  )
}
