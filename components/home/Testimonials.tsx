import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Fatima & Yusuf',
    event: 'Birthday Celebration – MB Farm 1',
    text: 'Our daughter\'s birthday pool party was absolutely magical. MB Farm 1 exceeded every expectation — the garden, the pool, and the cottage were perfection. Our guests are still talking about it.',
    rating: 5,
    initials: 'FY',
  },
  {
    name: 'Thabo Mokoena',
    event: 'Family Gathering – MB Farm 1',
    text: 'MB Farm 1 provided the perfect setting for our family day out. The lawn, the pool, and the whimsical cottage were beautifully maintained. The booking process was seamless and professional.',
    rating: 5,
    initials: 'TM',
  },
  {
    name: 'Sarah van der Berg',
    event: 'Pool Party – MB Farm 2',
    text: 'Booked the full-day pool party for my daughter\'s 21st. MB Farm 2 is breathtaking! The jacuzzi, the rock grotto walls, and the wooden bridge made for incredible photos.',
    rating: 5,
    initials: 'SB',
  },
  {
    name: 'Ahmed & Zainab',
    event: 'Evening Celebration – MB Farm 2',
    text: 'The rock-grotto charm of MB Farm 2 made for the most intimate and warm evening celebration. The fairy lights, the pool, and the cosy cave lounge — simply perfect.',
    rating: 5,
    initials: 'AZ',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-farmhouse-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-farmhouse-tan text-xs font-semibold tracking-[0.4em] uppercase mb-4">
            Client Stories
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-white font-bold mb-4">
            Memories Shared by Our Guests
          </h2>
          <p className="text-farmhouse-beige/60 text-lg font-light max-w-2xl mx-auto">
            Don't just take our word for it — hear from those who've celebrated with us.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-farmhouse-brown/20 border border-farmhouse-brown/30 p-8 hover:border-farmhouse-tan/40 transition-colors"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-farmhouse-tan text-farmhouse-tan" />
                ))}
              </div>
              {/* Quote */}
              <p className="text-farmhouse-beige/80 text-sm leading-relaxed mb-7 italic">
                "{t.text}"
              </p>
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-farmhouse-brown flex items-center justify-center text-farmhouse-cream font-serif text-sm font-bold shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-farmhouse-cream font-semibold text-sm">{t.name}</p>
                  <p className="text-farmhouse-tan text-xs mt-0.5">{t.event}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
