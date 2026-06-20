import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import { Shield, Heart, Star, MapPin, Clock, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about MB Farmhouse — our story, vision, and commitment to creating unforgettable farmhouse experiences in South Africa.',
}

const facilities = [
  { icon: Shield, label: 'Private & Secure', desc: 'Each farmhouse is exclusively yours for your booking period. No shared spaces, no strangers.' },
  { icon: Heart, label: 'Meticulously Maintained', desc: 'Every venue is professionally cleaned, landscaped, and inspected before each booking.' },
  { icon: Star, label: 'Premium Experience', desc: 'From the moment you book to the moment you leave, our team ensures a 5-star experience.' },
  { icon: MapPin, label: 'Prime Locations', desc: 'Our venues are situated in scenic countryside locations, easily accessible from major cities.' },
  { icon: Clock, label: 'Flexible Bookings', desc: 'Choose your preferred date, time slot, and venue. Modifications and cancellations handled fairly.' },
  { icon: Users, label: 'Expert Support', desc: 'Our venue team is available to assist with setup, queries, and any special requirements.' },
]

const values = [
  { title: 'Authenticity', desc: 'We celebrate genuine South African farmhouse character — natural, warm, and welcoming.' },
  { title: 'Exclusivity', desc: 'Your booking means the entire venue is yours. No other parties. Complete privacy.' },
  { title: 'Quality', desc: 'We invest continuously in our venues to maintain premium standards at every visit.' },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Page Hero */}
        <section className="relative h-72 md:h-96 flex items-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=2000&q=80"
              alt="About MB Farmhouse"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-farmhouse-dark/65" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <p className="text-farmhouse-tan text-xs font-semibold tracking-[0.4em] uppercase mb-3">Our Story</p>
            <h1 className="font-serif text-4xl md:text-5xl text-white font-bold text-shadow">About MB Farmhouse</h1>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-farmhouse-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-farmhouse-tan text-xs font-semibold tracking-[0.4em] uppercase mb-5">Who We Are</p>
                <h2 className="font-serif text-4xl text-farmhouse-dark font-bold mb-6 leading-tight">
                  Rooted in the Land,<br />Built for Your Moments
                </h2>
                <div className="space-y-5 text-farmhouse-muted leading-relaxed">
                  <p>
                    MB Farmhouse was born from a deep love of South Africa's countryside and a passion for
                    creating spaces where families, friends, and communities come together to celebrate life.
                    What started as a single heritage property has grown into four distinct, premium farmhouse venues.
                  </p>
                  <p>
                    Each of our venues has been carefully curated to offer a unique experience — whether you seek
                    the timeless elegance of The Willows Estate, the rustic warmth of Sunset Barn, the natural
                    beauty of The Orchard House, or the contemporary charm of Meadow Haven.
                  </p>
                  <p>
                    We believe that your celebrations deserve more than a generic event space. Our venues offer
                    exclusivity, character, and beauty that create genuinely memorable experiences.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="relative h-[440px] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80"
                    alt="MB Farmhouse grounds"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-5 -left-5 bg-farmhouse-brown p-8 text-farmhouse-cream shadow-xl hidden md:block">
                  <p className="font-serif text-3xl font-bold">10+</p>
                  <p className="text-xs tracking-widest uppercase text-farmhouse-tan mt-1">Years of Experience</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-farmhouse-beige">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-heading mb-3">Our Values</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((v) => (
                <div key={v.title} className="bg-farmhouse-white p-8 border-t-4 border-farmhouse-brown">
                  <h3 className="font-serif text-2xl text-farmhouse-dark mb-3">{v.title}</h3>
                  <p className="text-farmhouse-muted text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Facilities */}
        <section className="py-20 bg-farmhouse-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-farmhouse-tan text-xs font-semibold tracking-[0.4em] uppercase mb-4">Why Choose Us</p>
              <h2 className="section-heading mb-4">What Sets Us Apart</h2>
              <p className="section-subheading max-w-2xl mx-auto">
                We don't just rent venues — we craft experiences that leave lasting impressions.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilities.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex gap-5 p-6 border border-farmhouse-beige hover:border-farmhouse-tan transition-colors">
                  <div className="w-12 h-12 bg-farmhouse-cream border border-farmhouse-beige flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-farmhouse-brown" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-farmhouse-dark mb-2">{label}</h3>
                    <p className="text-farmhouse-muted text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-farmhouse-dark">
          <div className="max-w-3xl mx-auto text-center px-4">
            <h2 className="font-serif text-4xl text-white font-bold mb-4">
              Ready to Experience MB Farmhouse?
            </h2>
            <p className="text-farmhouse-beige/70 text-lg mb-8">
              Book one of our exclusive venues today and create memories that last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-event" className="btn-cream">Book an Event</Link>
              <Link href="/contact" className="btn-secondary border-farmhouse-cream text-farmhouse-cream hover:bg-farmhouse-cream hover:text-farmhouse-dark">Get in Touch</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
