import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import { FARMHOUSES } from '@/lib/farmhouses'
import { Users, Check, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Farmhouses',
  description: 'Explore our exclusive farmhouse venues — each with its own unique theme, character, and charm.',
}

export default function FarmhousesPage() {
  return (
    <>
      <Header />
      <main>
        {/* Page Hero */}
        <section className="relative h-72 md:h-96 flex items-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=80"
              alt="MB Farmhouse Venues"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-farmhouse-dark/60" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <p className="text-farmhouse-tan text-xs font-semibold tracking-[0.4em] uppercase mb-3">
              Exclusive Venues
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-white font-bold text-shadow">
              Our Farmhouses
            </h1>
          </div>
        </section>

        {/* Intro */}
        <div className="bg-farmhouse-cream py-12">
          <div className="max-w-3xl mx-auto text-center px-4">
            <p className="text-farmhouse-muted text-lg font-light leading-relaxed">
              Each of our venues offers a distinct atmosphere — from the whimsical garden pool escape
              of MB Farm 1 to the rock-grotto getaway of MB Farm 2. Every farmhouse is exclusively
              yours for the duration of your booking.
            </p>
          </div>
        </div>

        {/* Farmhouse List */}
        <section className="py-16 bg-farmhouse-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
            {FARMHOUSES.map((fh, idx) => (
              <div
                key={fh.id}
                id={fh.slug}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center ${
                  idx % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Image Block */}
                <div className={`relative ${idx % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative h-[420px] md:h-[500px] overflow-hidden">
                    <Image
                      src={fh.image_url}
                      alt={fh.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  {/* Gallery strip */}
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {fh.gallery_images.map((img, i) => (
                      <div key={i} className="relative h-24 overflow-hidden">
                        <Image
                          src={img}
                          alt={`${fh.name} gallery ${i + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                          sizes="150px"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content Block */}
                <div className={idx % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="inline-block bg-farmhouse-brown text-farmhouse-cream text-xs font-semibold tracking-widest uppercase px-3 py-1.5 mb-5">
                    {fh.theme}
                  </div>
                  <h2 className="font-serif text-4xl md:text-5xl text-farmhouse-dark font-bold mb-5">
                    {fh.name}
                  </h2>
                  <p className="text-farmhouse-muted text-base leading-relaxed mb-7">
                    {fh.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {fh.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5">
                        <Check size={14} className="text-farmhouse-green shrink-0" />
                        <span className="text-farmhouse-dark text-sm">{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 text-farmhouse-muted text-sm mb-8">
                    <Users size={16} />
                    <span>Capacity: up to <strong className="text-farmhouse-dark">{fh.capacity} guests</strong></span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/book-event" className="btn-primary">
                      Book Event <ArrowRight size={16} />
                    </Link>
                    <Link href="/book-pool" className="btn-secondary">
                      Book Pool Party
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 bg-farmhouse-beige">
          <div className="max-w-3xl mx-auto text-center px-4">
            <h2 className="section-heading mb-4">Can't Decide? Let Us Help.</h2>
            <p className="section-subheading mb-8">
              Get in touch with our team and we'll guide you to the perfect venue for your event.
            </p>
            <Link href="/contact" className="btn-primary">Contact Us</Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
