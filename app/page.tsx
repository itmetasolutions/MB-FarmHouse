import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import HeroBanner from '@/components/home/HeroBanner'
import FarmhouseOverview from '@/components/home/FarmhouseOverview'
import EventCTA from '@/components/home/EventCTA'
import PoolCTA from '@/components/home/PoolCTA'
import GalleryPreview from '@/components/home/GalleryPreview'
import Testimonials from '@/components/home/Testimonials'
import Link from 'next/link'
import { Phone } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroBanner />

        {/* Trust bar */}
        <div className="bg-farmhouse-brown">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-farmhouse-cream/20">
              {[
                { num: '2', label: 'Premium Venues' },
                { num: '500+', label: 'Events Hosted' },
                { num: '100%', label: 'Private Booking' },
                { num: '5★', label: 'Client Rating' },
              ].map((item) => (
                <div key={item.label} className="text-center py-2 px-4">
                  <p className="font-serif text-2xl font-bold text-farmhouse-cream">{item.num}</p>
                  <p className="text-farmhouse-tan text-xs tracking-wide uppercase">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <FarmhouseOverview />
        <EventCTA />
        <PoolCTA />
        <GalleryPreview />
        <Testimonials />

        {/* Final CTA */}
        <section className="py-20 bg-farmhouse-cream">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-farmhouse-tan text-xs font-semibold tracking-[0.4em] uppercase mb-4">
              Ready to Celebrate?
            </p>
            <h2 className="section-heading mb-5">
              Your Dream Event Starts Here
            </h2>
            <p className="section-subheading mb-10">
              Browse our exclusive farmhouse venues, choose your date, and secure your booking in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-event" className="btn-primary">Book an Event</Link>
              <Link href="/book-pool" className="btn-secondary">Book Pool Party</Link>
            </div>
            <div className="flex items-center justify-center gap-3 mt-8 text-farmhouse-muted text-sm">
              <Phone size={15} />
              <span>Or call us at</span>
              <a
                href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
                className="text-farmhouse-brown font-semibold hover:underline"
              >
                {process.env.NEXT_PUBLIC_PHONE || '+27 XX XXX XXXX'}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
