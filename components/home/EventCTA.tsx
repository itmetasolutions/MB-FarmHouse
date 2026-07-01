import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check } from 'lucide-react'

const highlights = [
  'Exclusive venue access for your event',
  'Afternoon & Evening slot options',
  'Catering-friendly kitchens',
  'Professional décor support',
  'Ample parking and security',
]

export default function EventCTA() {
  return (
    <section className="py-24 bg-farmhouse-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative h-[480px] overflow-hidden">
              <Image
                src="/images/Farm One Images/Farm One Image (2).webp"
                alt="Event Booking at MB Farmhouse"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-farmhouse-brown text-farmhouse-cream p-6 w-40 text-center shadow-xl hidden sm:block">
              <p className="font-serif text-3xl font-bold">2</p>
              <p className="text-xs tracking-widest uppercase mt-1">Exclusive<br />Venues</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-farmhouse-tan text-xs font-semibold tracking-[0.4em] uppercase mb-4">
              Event Bookings
            </p>
            <h2 className="section-heading mb-6">
              Host Your Perfect<br />Event in Style
            </h2>
            <p className="text-farmhouse-muted text-lg font-light leading-relaxed mb-8">
              Whether it's a birthday, anniversary, corporate function, or wedding reception —
              our farmhouse venues provide the perfect canvas for your vision. Book your
              preferred venue, choose your slot, and let us handle the rest.
            </p>
            <ul className="space-y-3 mb-10">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-farmhouse-green/10 flex items-center justify-center rounded-full shrink-0 mt-0.5">
                    <Check size={12} className="text-farmhouse-green" />
                  </span>
                  <span className="text-farmhouse-dark text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/book-event" className="btn-primary inline-flex">
              Start Booking <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
