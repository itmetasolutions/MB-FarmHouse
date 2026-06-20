import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'MB Farmhouse Privacy Policy — how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-farmhouse-white pt-20">
        <div className="bg-farmhouse-dark py-10">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="font-serif text-4xl text-white font-bold">Privacy Policy</h1>
            <p className="text-farmhouse-tan text-sm mt-2">Last updated: January 2025</p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-16 prose prose-sm max-w-none">
          <div className="space-y-10 text-farmhouse-dark">
            <section>
              <h2 className="font-serif text-2xl text-farmhouse-dark mb-4">1. Introduction</h2>
              <p className="text-farmhouse-muted leading-relaxed">
                MB Farmhouse ("we", "our", "us") is committed to protecting your personal information.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                when you visit our website or make a booking with us. By using our services, you agree to
                the collection and use of information in accordance with this policy.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-farmhouse-dark mb-4">2. Information We Collect</h2>
              <p className="text-farmhouse-muted leading-relaxed mb-3">We collect the following types of personal information:</p>
              <ul className="list-disc list-inside space-y-2 text-farmhouse-muted">
                <li><strong className="text-farmhouse-dark">Contact Information:</strong> Name, phone number, and email address provided during booking</li>
                <li><strong className="text-farmhouse-dark">Booking Data:</strong> Venue selection, booking dates, slot preferences, and event notes</li>
                <li><strong className="text-farmhouse-dark">Payment Information:</strong> Payment transactions are processed by PayFast; we do not store card details</li>
                <li><strong className="text-farmhouse-dark">Usage Data:</strong> IP address, browser type, pages visited, and time spent on our site</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-farmhouse-dark mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2 text-farmhouse-muted">
                <li>To process and confirm your venue bookings</li>
                <li>To communicate booking confirmations, reminders, and updates</li>
                <li>To respond to your enquiries and provide customer support</li>
                <li>To improve our website, services, and user experience</li>
                <li>To comply with legal obligations and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-farmhouse-dark mb-4">4. Data Sharing</h2>
              <p className="text-farmhouse-muted leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties.
                We may share your information with trusted service providers who assist us in operating
                our website and conducting our business (including payment processor PayFast),
                provided those parties agree to keep this information confidential.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-farmhouse-dark mb-4">5. Data Security</h2>
              <p className="text-farmhouse-muted leading-relaxed">
                We implement appropriate technical and organisational measures to protect your personal
                information against unauthorised access, alteration, disclosure, or destruction.
                All data is stored on secure servers and transmitted over encrypted connections (HTTPS).
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-farmhouse-dark mb-4">6. Cookies</h2>
              <p className="text-farmhouse-muted leading-relaxed">
                Our website uses cookies to enhance your browsing experience. Cookies are small data files
                stored on your device. You may disable cookies in your browser settings, however some
                features of our website may not function correctly without them.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-farmhouse-dark mb-4">7. Your Rights (POPIA)</h2>
              <p className="text-farmhouse-muted leading-relaxed mb-3">
                In accordance with the Protection of Personal Information Act (POPIA) of South Africa, you have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-farmhouse-muted">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to the processing of your personal information</li>
              </ul>
              <p className="text-farmhouse-muted mt-3">
                To exercise these rights, please contact us at {process.env.NEXT_PUBLIC_EMAIL || 'info@mbfarmhouse.co.za'}.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-farmhouse-dark mb-4">8. Data Retention</h2>
              <p className="text-farmhouse-muted leading-relaxed">
                We retain your personal information for as long as necessary to fulfil the purposes outlined
                in this policy, and to comply with legal and regulatory requirements. Booking records are
                typically retained for 5 years.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-farmhouse-dark mb-4">9. Contact Us</h2>
              <p className="text-farmhouse-muted leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="mt-3 space-y-1 text-farmhouse-muted">
                <p><strong className="text-farmhouse-dark">Email:</strong> {process.env.NEXT_PUBLIC_EMAIL || 'info@mbfarmhouse.co.za'}</p>
                <p><strong className="text-farmhouse-dark">Phone:</strong> {process.env.NEXT_PUBLIC_PHONE || '+27 XX XXX XXXX'}</p>
                <p><strong className="text-farmhouse-dark">Address:</strong> {process.env.NEXT_PUBLIC_ADDRESS || 'Pretoria, South Africa'}</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
