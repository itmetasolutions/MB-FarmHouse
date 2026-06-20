import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/components/Providers'

export const metadata: Metadata = {
  title: {
    default: 'MB Farmhouse — Premium Venue & Event Booking',
    template: '%s | MB Farmhouse',
  },
  description:
    'Experience the charm of premium farmhouse venues in South Africa. Book exclusive farmhouses for events, pool parties, weddings, and celebrations.',
  keywords: ['farmhouse', 'venue', 'event booking', 'pool party', 'wedding venue', 'South Africa'],
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: 'MB Farmhouse',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
