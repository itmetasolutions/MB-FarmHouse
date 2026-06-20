import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { CheckCircle, Phone, Mail, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Payment Successful' }

export default function PaymentSuccessPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-farmhouse-white pt-20">
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={40} className="text-green-500" />
          </div>

          <h1 className="font-serif text-4xl md:text-5xl text-farmhouse-dark font-bold mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-farmhouse-muted text-lg font-light mb-8 leading-relaxed">
            Your payment was successful and your farmhouse venue has been secured.
            We're so excited to host your celebration!
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-px bg-farmhouse-beige" />
            <div className="w-2 h-2 rotate-45 bg-farmhouse-tan" />
            <div className="w-12 h-px bg-farmhouse-beige" />
          </div>

          {/* Info boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left">
            <div className="bg-farmhouse-cream border border-farmhouse-beige p-5">
              <p className="text-xs text-farmhouse-muted uppercase tracking-wide mb-2">Confirmation</p>
              <p className="text-farmhouse-dark text-sm">
                A booking confirmation has been sent to your email address (if provided).
                Please keep your booking reference handy.
              </p>
            </div>
            <div className="bg-farmhouse-cream border border-farmhouse-beige p-5">
              <p className="text-xs text-farmhouse-muted uppercase tracking-wide mb-2">On the Day</p>
              <p className="text-farmhouse-dark text-sm">
                Our team will contact you 48 hours before your event with arrival instructions
                and any final details.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-farmhouse-dark text-farmhouse-cream p-6 mb-8">
            <p className="text-xs text-farmhouse-tan uppercase tracking-wide mb-3">Need Help?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
              <a href={`tel:${process.env.NEXT_PUBLIC_PHONE}`} className="flex items-center gap-2 hover:text-farmhouse-tan transition-colors">
                <Phone size={14} />
                {process.env.NEXT_PUBLIC_PHONE || '+27 XX XXX XXXX'}
              </a>
              <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`} className="flex items-center gap-2 hover:text-farmhouse-tan transition-colors">
                <Mail size={14} />
                {process.env.NEXT_PUBLIC_EMAIL || 'info@mbfarmhouse.co.za'}
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary">
              Back to Home <ArrowRight size={16} />
            </Link>
            <Link href="/gallery" className="btn-secondary">
              View Gallery
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
