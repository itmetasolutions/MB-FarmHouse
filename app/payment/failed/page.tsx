import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { XCircle, RefreshCw, Phone } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Payment Failed' }

export default function PaymentFailedPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-farmhouse-white pt-20">
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 bg-red-50 border-2 border-red-200 flex items-center justify-center mx-auto mb-8">
            <XCircle size={40} className="text-red-500" />
          </div>

          <h1 className="font-serif text-4xl md:text-5xl text-farmhouse-dark font-bold mb-4">
            Payment Unsuccessful
          </h1>
          <p className="text-farmhouse-muted text-lg font-light mb-8 leading-relaxed">
            Unfortunately your payment could not be processed. Your booking reservation
            has been released. No charges were made to your account.
          </p>

          <div className="bg-farmhouse-cream border border-farmhouse-beige p-6 mb-8 text-sm text-farmhouse-muted text-left space-y-2">
            <p className="font-semibold text-farmhouse-dark mb-3">Common reasons for payment failure:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Insufficient funds or card limit reached</li>
              <li>Payment was cancelled during the process</li>
              <li>Card declined by your bank</li>
              <li>Network or session timeout</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/book-event" className="btn-primary">
              <RefreshCw size={15} /> Try Again
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>

          <div className="flex items-center justify-center gap-3 text-farmhouse-muted text-sm">
            <Phone size={14} />
            <span>For immediate help, call:</span>
            <a href={`tel:${process.env.NEXT_PUBLIC_PHONE}`} className="text-farmhouse-brown font-semibold hover:underline">
              {process.env.NEXT_PUBLIC_PHONE || '+27 XX XXX XXXX'}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
