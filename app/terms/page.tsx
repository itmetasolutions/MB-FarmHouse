import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'MB Farmhouse Terms and Conditions — please read before making a booking.',
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-farmhouse-white pt-20">
        <div className="bg-farmhouse-dark py-10">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="font-serif text-4xl text-white font-bold">Terms & Conditions</h1>
            <p className="text-farmhouse-tan text-sm mt-2">Last updated: January 2025</p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="space-y-10 text-farmhouse-dark">
            <section>
              <h2 className="font-serif text-2xl text-farmhouse-dark mb-4">1. Agreement to Terms</h2>
              <p className="text-farmhouse-muted leading-relaxed">
                By accessing our website or making a booking with MB Farmhouse, you agree to be bound by
                these Terms and Conditions. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-farmhouse-dark mb-4">2. Booking Terms</h2>
              <div className="space-y-4 text-farmhouse-muted">
                <p><strong className="text-farmhouse-dark">2.1 Booking Confirmation:</strong> A booking is only confirmed upon full payment. A pending booking holds your slot temporarily but does not guarantee the reservation.</p>
                <p><strong className="text-farmhouse-dark">2.2 Payment:</strong> Full payment is required at time of booking. We accept payment via PayFast (credit/debit card, EFT, SnapScan, and other supported methods).</p>
                <p><strong className="text-farmhouse-dark">2.3 Pending Bookings:</strong> Unpaid bookings are held for a maximum of 30 minutes, after which the slot is released for other customers.</p>
                <p><strong className="text-farmhouse-dark">2.4 Booking Reference:</strong> Keep your booking reference number safe. You may be asked to provide it upon arrival at the venue.</p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-farmhouse-dark mb-4">3. Cancellations & Refunds</h2>
              <div className="space-y-3 text-farmhouse-muted">
                <p><strong className="text-farmhouse-dark">3.1 Cancellations by Customer:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>More than 14 days before the event: 80% refund</li>
                  <li>7–14 days before the event: 50% refund</li>
                  <li>Less than 7 days before the event: No refund</li>
                  <li>No-show: No refund</li>
                </ul>
                <p><strong className="text-farmhouse-dark">3.2 Cancellations by MB Farmhouse:</strong> In the unlikely event that we need to cancel your booking, you will receive a full refund or the option to reschedule at no cost.</p>
                <p><strong className="text-farmhouse-dark">3.3 Refund Processing:</strong> Approved refunds are processed within 5–7 business days to the original payment method.</p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-farmhouse-dark mb-4">4. Venue Rules</h2>
              <ul className="list-disc list-inside space-y-2 text-farmhouse-muted">
                <li>Guests must vacate the premises by the end of the booked slot time</li>
                <li>The venue capacity limit must not be exceeded for safety reasons</li>
                <li>Excessive noise that disturbs the surrounding area is prohibited</li>
                <li>Guests are responsible for any damage caused to the property</li>
                <li>No illegal substances on the property</li>
                <li>MB Farmhouse reserves the right to end any booking for violation of these rules without refund</li>
                <li>Glass bottles are not permitted in pool areas</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-farmhouse-dark mb-4">5. Pool Party Specific Terms</h2>
              <ul className="list-disc list-inside space-y-2 text-farmhouse-muted">
                <li>Pool rules must be observed at all times for the safety of all guests</li>
                <li>Children must be supervised by adults at all times near the pool</li>
                <li>Full Day booking blocks all individual slots for that date — no partial overlap allowed</li>
                <li>MB Farmhouse is not liable for injuries sustained due to negligent behaviour</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-farmhouse-dark mb-4">6. Liability</h2>
              <p className="text-farmhouse-muted leading-relaxed">
                MB Farmhouse shall not be liable for any indirect, incidental, or consequential damages
                arising from the use of our venues or services. Our total liability shall not exceed the
                amount paid for the specific booking in question. Guests attend events at their own risk
                and MB Farmhouse recommends that guests obtain appropriate event insurance.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-farmhouse-dark mb-4">7. Intellectual Property</h2>
              <p className="text-farmhouse-muted leading-relaxed">
                All content on this website including text, images, logos, and design is the property of
                MB Farmhouse and may not be reproduced without express written permission.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-farmhouse-dark mb-4">8. Changes to Terms</h2>
              <p className="text-farmhouse-muted leading-relaxed">
                MB Farmhouse reserves the right to modify these terms at any time. Changes will be
                effective immediately upon posting to the website. Continued use of our services
                constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-farmhouse-dark mb-4">9. Governing Law</h2>
              <p className="text-farmhouse-muted leading-relaxed">
                These Terms and Conditions are governed by the laws of the Republic of South Africa.
                Any disputes shall be resolved in the courts of South Africa.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-farmhouse-dark mb-4">10. Contact</h2>
              <div className="space-y-1 text-farmhouse-muted">
                <p><strong className="text-farmhouse-dark">Email:</strong> {process.env.NEXT_PUBLIC_EMAIL || 'info@mbfarmhouse.co.za'}</p>
                <p><strong className="text-farmhouse-dark">Phone:</strong> {process.env.NEXT_PUBLIC_PHONE || '+27 XX XXX XXXX'}</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
