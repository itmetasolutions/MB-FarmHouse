import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sun, Sunset, Moon } from 'lucide-react'

const slots = [
  { icon: Sun, label: 'Morning', time: '08:00 – 14:00', desc: 'Start your day refreshed' },
  { icon: Sunset, label: 'Evening', time: '14:00 – 20:00', desc: 'Golden hour vibes' },
  { icon: Moon, label: 'Night', time: '19:00 – 01:00', desc: 'Twilight pool parties' },
]

export default function PoolCTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Farm One Images/Farm One Image (1).webp"
          alt="Pool Party at MB Farmhouse"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-farmhouse-dark/75" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-farmhouse-tan text-xs font-semibold tracking-[0.4em] uppercase mb-4">
            Pool Party Bookings
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-white font-bold mb-5 text-shadow-lg">
            Splash Into Summer in<br />
            <span className="text-farmhouse-tan italic">Luxury</span>
          </h2>
          <p className="text-farmhouse-beige/80 text-lg font-light max-w-2xl mx-auto">
            Our private farmhouse pools are yours for the day. Three dedicated slots daily —
            or book the Full Day for the ultimate pool experience.
          </p>
        </div>

        {/* Slot Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {slots.map(({ icon: Icon, label, time, desc }) => (
            <div
              key={label}
              className="bg-white/10 backdrop-blur-sm border border-white/20 p-7 text-center hover:bg-white/15 transition-colors"
            >
              <Icon size={28} className="text-farmhouse-tan mx-auto mb-4" />
              <h3 className="font-serif text-xl text-white mb-1">{label} Session</h3>
              <p className="text-farmhouse-tan text-sm font-medium mb-2">{time}</p>
              <p className="text-farmhouse-beige/70 text-sm">{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <Link href="/book-pool" className="btn-cream">
              Book Pool Party <ArrowRight size={16} />
            </Link>
            <span className="text-farmhouse-beige/60 text-sm">Full Day booking available</span>
          </div>
        </div>
      </div>
    </section>
  )
}
