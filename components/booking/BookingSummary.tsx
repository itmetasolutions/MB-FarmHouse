import Image from 'next/image'
import { format } from 'date-fns'
import { MapPin, Calendar, Clock, User, Phone, Mail } from 'lucide-react'
import { formatCurrency, SLOT_LABELS } from '@/lib/utils'
import type { CustomerFormValues } from './CustomerDetailsForm'

interface Props {
  farmhouse: { name: string; image_url: string; theme: string }
  date: Date
  slot: string
  price: number
  customer: CustomerFormValues
  bookingType: 'event' | 'pool'
}

export default function BookingSummary({ farmhouse, date, slot, price, customer, bookingType }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-3xl text-farmhouse-dark mb-2">Booking Summary</h2>
        <p className="text-farmhouse-muted text-sm">Please review your booking details before proceeding to payment.</p>
      </div>

      {/* Venue */}
      <div className="flex gap-4 p-5 bg-farmhouse-cream border border-farmhouse-beige">
        <div className="relative w-24 h-20 shrink-0 overflow-hidden">
          <Image src={farmhouse.image_url} alt={farmhouse.name} fill className="object-cover" sizes="96px" />
        </div>
        <div>
          <p className="text-xs text-farmhouse-tan font-semibold uppercase tracking-wide mb-1">{farmhouse.theme}</p>
          <h3 className="font-serif text-xl text-farmhouse-dark">{farmhouse.name}</h3>
          <div className="flex items-center gap-1.5 text-farmhouse-muted text-xs mt-1">
            <MapPin size={11} />
            Pretoria, South Africa
          </div>
        </div>
      </div>

      {/* Booking Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-farmhouse-cream border border-farmhouse-beige">
          <div className="flex items-center gap-2 text-farmhouse-muted text-xs uppercase tracking-wide mb-2">
            <Calendar size={12} /> Date
          </div>
          <p className="text-farmhouse-dark font-semibold text-sm">{format(date, 'EEE, dd MMM yyyy')}</p>
        </div>
        <div className="p-4 bg-farmhouse-cream border border-farmhouse-beige">
          <div className="flex items-center gap-2 text-farmhouse-muted text-xs uppercase tracking-wide mb-2">
            <Clock size={12} /> Slot
          </div>
          <p className="text-farmhouse-dark font-semibold text-sm">{SLOT_LABELS[slot] || slot}</p>
          <p className="text-xs text-farmhouse-muted capitalize">{bookingType} booking</p>
        </div>
        <div className="p-4 bg-farmhouse-brown text-farmhouse-cream">
          <div className="text-farmhouse-tan text-xs uppercase tracking-wide mb-2">Total Price</div>
          <p className="font-serif text-2xl font-bold">{formatCurrency(price)}</p>
        </div>
      </div>

      {/* Customer */}
      <div className="p-5 border border-farmhouse-beige">
        <h4 className="text-farmhouse-muted text-xs uppercase tracking-wide mb-4">Guest Information</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <User size={14} className="text-farmhouse-tan shrink-0" />
            <span className="text-farmhouse-dark font-medium">{customer.name}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone size={14} className="text-farmhouse-tan shrink-0" />
            <span className="text-farmhouse-dark">{customer.phone}</span>
          </div>
          {customer.email && (
            <div className="flex items-center gap-3 text-sm">
              <Mail size={14} className="text-farmhouse-tan shrink-0" />
              <span className="text-farmhouse-dark">{customer.email}</span>
            </div>
          )}
          {customer.notes && (
            <div className="bg-farmhouse-cream p-3 text-farmhouse-muted text-sm mt-2">
              <p className="text-xs uppercase tracking-wide mb-1 text-farmhouse-muted">Notes</p>
              {customer.notes}
            </div>
          )}
        </div>
      </div>

      <div className="bg-farmhouse-beige p-4 text-xs text-farmhouse-muted">
        <strong className="text-farmhouse-dark">Note:</strong> Your booking will be confirmed once payment is completed.
        Pending slots are held temporarily. Please complete payment within 30 minutes.
      </div>
    </div>
  )
}
