'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import BookingProgress from '@/components/booking/BookingProgress'
import FarmhouseSelect from '@/components/booking/FarmhouseSelect'
import DatePickerCalendar from '@/components/booking/DatePickerCalendar'
import SlotSelector from '@/components/booking/SlotSelector'
import CustomerDetailsForm, { type CustomerFormValues } from '@/components/booking/CustomerDetailsForm'
import BookingSummary from '@/components/booking/BookingSummary'
import { FARMHOUSES } from '@/lib/farmhouses'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function BookEventPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [farmhouseId, setFarmhouseId] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [slotPrice, setSlotPrice] = useState<number>(0)
  const [customerData, setCustomerData] = useState<CustomerFormValues | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const farmhouse = FARMHOUSES.find((f) => f.id === farmhouseId)

  const canProceed = () => {
    if (step === 1) return farmhouseId !== null
    if (step === 2) return selectedDate !== null
    if (step === 3) return selectedSlot !== null
    if (step === 4) return true
    return false
  }

  const handleNext = () => {
    if (step < 5 && canProceed()) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleCustomerSubmit = (data: CustomerFormValues) => {
    setCustomerData(data)
    setStep(5)
  }

  const handleCheckout = async () => {
    if (!farmhouseId || !selectedDate || !selectedSlot || !customerData) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          farmhouse_id: farmhouseId,
          booking_type: 'event',
          booking_date: format(selectedDate, 'yyyy-MM-dd'),
          slot_name: selectedSlot,
          price: slotPrice,
          name: customerData.name,
          phone: customerData.phone,
          email: customerData.email,
          notes: customerData.notes,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Booking failed')
      router.push(`/checkout?ref=${data.booking_reference}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-farmhouse-white pt-24 pb-20">
        {/* Hero Strip */}
        <div className="bg-farmhouse-dark py-10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-farmhouse-tan text-xs font-semibold tracking-[0.4em] uppercase mb-3">
              Event Booking
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-white font-bold">
              Book Your Event Venue
            </h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {/* Progress */}
          <div className="mb-10">
            <BookingProgress currentStep={step} />
          </div>

          {/* Step Content */}
          <div className="bg-white border border-farmhouse-beige p-6 md:p-10 mb-6">
            {step === 1 && (
              <FarmhouseSelect selected={farmhouseId} onSelect={setFarmhouseId} />
            )}
            {step === 2 && (
              <DatePickerCalendar selected={selectedDate} onSelect={setSelectedDate} />
            )}
            {step === 3 && farmhouseId && selectedDate && (
              <SlotSelector
                farmhouseId={farmhouseId}
                date={selectedDate}
                bookingType="event"
                selectedSlot={selectedSlot}
                onSelect={(slot, price) => { setSelectedSlot(slot); setSlotPrice(price) }}
              />
            )}
            {step === 4 && (
              <CustomerDetailsForm
                defaultValues={customerData || undefined}
                onSubmit={handleCustomerSubmit}
              />
            )}
            {step === 5 && farmhouse && selectedDate && selectedSlot && customerData && (
              <BookingSummary
                farmhouse={farmhouse}
                date={selectedDate}
                slot={selectedSlot}
                price={slotPrice}
                customer={customerData}
                bookingType="event"
              />
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-5 py-4 mb-5">
              {error}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              className={`flex items-center gap-2 text-sm font-medium text-farmhouse-muted hover:text-farmhouse-dark transition-colors ${step === 1 ? 'invisible' : ''}`}
            >
              <ChevronLeft size={16} /> Back
            </button>

            {step < 4 && (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed()}
                className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue <ChevronRight size={16} />
              </button>
            )}

            {step === 4 && (
              <button
                type="submit"
                form="customer-details-form"
                className="btn-primary"
              >
                Review Booking <ChevronRight size={16} />
              </button>
            )}

            {step === 5 && (
              <button
                type="button"
                onClick={handleCheckout}
                disabled={submitting}
                className="btn-primary"
              >
                {submitting ? 'Processing...' : 'Proceed to Payment'}
                {!submitting && <ChevronRight size={16} />}
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
