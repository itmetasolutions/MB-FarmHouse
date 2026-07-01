import Link from 'next/link'
import Image from 'next/image'
import { Users, ArrowRight } from 'lucide-react'
import { FARMHOUSES } from '@/lib/farmhouses'

export default function FarmhouseOverview() {
  return (
    <section className="py-24 bg-farmhouse-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-farmhouse-tan text-xs font-semibold tracking-[0.4em] uppercase mb-4">
            Our Exclusive Venues
          </p>
          <h2 className="section-heading mb-4">Our Farmhouses</h2>
          <p className="section-subheading max-w-2xl mx-auto">
            Each venue tells its own story — choose the one that speaks to your event's soul.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-12 h-px bg-farmhouse-tan" />
            <div className="w-2 h-2 rotate-45 bg-farmhouse-tan" />
            <div className="w-12 h-px bg-farmhouse-tan" />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FARMHOUSES.map((fh, idx) => (
            <Link key={fh.id} href={`/farmhouses#${fh.slug}`} className="group card-farmhouse block">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={fh.image_url}
                  alt={fh.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-farmhouse-dark/70 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-farmhouse-brown text-farmhouse-cream text-xs font-semibold tracking-widest uppercase px-3 py-1.5">
                  {fh.theme}
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-farmhouse-cream/80 text-xs">
                  <Users size={12} />
                  Up to {fh.capacity} guests
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl text-farmhouse-dark mb-2 group-hover:text-farmhouse-brown transition-colors">
                  {fh.name}
                </h3>
                <p className="text-farmhouse-muted text-sm leading-relaxed line-clamp-2 mb-4">
                  {fh.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {fh.features.slice(0, 3).map((f) => (
                    <span
                      key={f}
                      className="text-xs text-farmhouse-brown border border-farmhouse-beige bg-farmhouse-cream px-2.5 py-1"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-farmhouse-brown text-sm font-semibold group-hover:gap-3 gap-2 transition-all">
                  View Venue <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/farmhouses" className="btn-secondary">
            View All Venues
          </Link>
        </div>
      </div>
    </section>
  )
}
