'use client'

import { useState } from 'react'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle, Send, Check } from 'lucide-react'

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-64 md:h-80 flex items-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=2000&q=80"
              alt="Contact MB Farmhouse"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-farmhouse-dark/65" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
            <p className="text-farmhouse-tan text-xs font-semibold tracking-[0.4em] uppercase mb-3">We'd Love to Hear from You</p>
            <h1 className="font-serif text-4xl md:text-5xl text-white font-bold text-shadow">Contact Us</h1>
          </div>
        </section>

        <section className="py-20 bg-farmhouse-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
              {/* Contact Info */}
              <div className="lg:col-span-1 space-y-8">
                <div>
                  <h2 className="font-serif text-3xl text-farmhouse-dark mb-3">Get in Touch</h2>
                  <p className="text-farmhouse-muted text-sm leading-relaxed">
                    Have a question about a venue, need a quote, or want to discuss your upcoming event?
                    Our team is ready to assist.
                  </p>
                </div>

                <div className="space-y-5">
                  <a href={`tel:${process.env.NEXT_PUBLIC_PHONE}`} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-farmhouse-cream border border-farmhouse-beige flex items-center justify-center shrink-0 group-hover:bg-farmhouse-brown group-hover:border-farmhouse-brown transition-colors">
                      <Phone size={16} className="text-farmhouse-brown group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-farmhouse-muted uppercase tracking-wide mb-0.5">Phone</p>
                      <p className="text-farmhouse-dark font-medium text-sm">{process.env.NEXT_PUBLIC_PHONE || '+27 XX XXX XXXX'}</p>
                    </div>
                  </a>

                  <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-farmhouse-cream border border-farmhouse-beige flex items-center justify-center shrink-0 group-hover:bg-farmhouse-brown group-hover:border-farmhouse-brown transition-colors">
                      <Mail size={16} className="text-farmhouse-brown group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-farmhouse-muted uppercase tracking-wide mb-0.5">Email</p>
                      <p className="text-farmhouse-dark font-medium text-sm">{process.env.NEXT_PUBLIC_EMAIL || 'info@mbfarmhouse.co.za'}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-farmhouse-cream border border-farmhouse-beige flex items-center justify-center shrink-0">
                      <MapPin size={16} className="text-farmhouse-brown" />
                    </div>
                    <div>
                      <p className="text-xs text-farmhouse-muted uppercase tracking-wide mb-0.5">Address</p>
                      <p className="text-farmhouse-dark font-medium text-sm">{process.env.NEXT_PUBLIC_ADDRESS || 'Pretoria, Gauteng, South Africa'}</p>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || '27000000000'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center shrink-0 group-hover:bg-[#25D366] transition-colors">
                      <MessageCircle size={16} className="text-[#25D366] group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-farmhouse-muted uppercase tracking-wide mb-0.5">WhatsApp</p>
                      <p className="text-farmhouse-dark font-medium text-sm">Chat with us directly</p>
                    </div>
                  </a>
                </div>

                {/* Social Links */}
                <div className="pt-4 border-t border-farmhouse-beige">
                  <p className="text-xs text-farmhouse-muted uppercase tracking-wide mb-4">Follow Us</p>
                  <div className="flex gap-3">
                    <a
                      href={process.env.NEXT_PUBLIC_FACEBOOK_URL || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-farmhouse-dark text-farmhouse-cream px-4 py-2.5 text-xs font-medium hover:bg-farmhouse-brown transition-colors"
                    >
                      <Facebook size={14} /> Facebook
                    </a>
                    <a
                      href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-farmhouse-dark text-farmhouse-cream px-4 py-2.5 text-xs font-medium hover:bg-farmhouse-brown transition-colors"
                    >
                      <Instagram size={14} /> Instagram
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2 bg-farmhouse-cream p-8 md:p-12 border border-farmhouse-beige">
                {submitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 bg-green-50 border border-green-200 flex items-center justify-center mb-5">
                      <Check size={28} className="text-green-600" />
                    </div>
                    <h3 className="font-serif text-3xl text-farmhouse-dark mb-3">Message Sent!</h3>
                    <p className="text-farmhouse-muted text-sm max-w-sm">
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="font-serif text-2xl text-farmhouse-dark mb-7">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs text-farmhouse-muted uppercase tracking-wide mb-2">Full Name *</label>
                          <input
                            type="text"
                            required
                            className="input-field"
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-farmhouse-muted uppercase tracking-wide mb-2">Phone Number *</label>
                          <input
                            type="tel"
                            required
                            className="input-field"
                            value={formState.phone}
                            onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                            placeholder="+27 XX XXX XXXX"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-farmhouse-muted uppercase tracking-wide mb-2">Email Address</label>
                        <input
                          type="email"
                          className="input-field"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-farmhouse-muted uppercase tracking-wide mb-2">Subject *</label>
                        <select
                          required
                          className="input-field"
                          value={formState.subject}
                          onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        >
                          <option value="">Select a topic</option>
                          <option>Event Booking Enquiry</option>
                          <option>Pool Party Booking</option>
                          <option>Venue Information</option>
                          <option>Pricing Enquiry</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-farmhouse-muted uppercase tracking-wide mb-2">Message *</label>
                        <textarea
                          required
                          rows={5}
                          className="input-field resize-none"
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          placeholder="Tell us about your event or enquiry..."
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full flex items-center justify-center gap-2"
                      >
                        {loading ? 'Sending...' : (<><Send size={15} /> Send Message</>)}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Map Placeholder */}
        <section className="h-80 bg-farmhouse-beige relative overflow-hidden">
          <iframe
            title="MB Farmhouse Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229770.7282530437!2d28.01716!3d-25.74486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e956024f9c9e3a7%3A0xa79db9c23afc8f3b!2sPretoria!5e0!3m2!1sen!2sza!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
