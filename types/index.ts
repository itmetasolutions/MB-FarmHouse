export type BookingType = 'event' | 'pool'
export type SlotName = 'afternoon' | 'evening' | 'morning' | 'night' | 'full_day'
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'cancelled'

export interface Farmhouse {
  id: number
  name: string
  slug: string
  description: string
  theme: string
  image_url: string
  gallery_images: string[]
  features: string[]
  capacity: number
  is_active: boolean
  created_at: string
}

export interface PricingSlot {
  id: number
  farmhouse_id: number
  booking_type: BookingType
  slot_name: SlotName
  day_of_week: number
  price: number
  start_time: string
  end_time: string
  is_active: boolean
  updated_at: string
}

export interface Customer {
  id: number
  name: string
  email: string | null
  phone: string
  created_at: string
  updated_at: string
  total_bookings?: number
}

export interface Booking {
  id: number
  booking_reference: string
  customer_id: number
  farmhouse_id: number
  booking_type: BookingType
  booking_date: string
  slot_name: SlotName
  price: number
  booking_status: BookingStatus
  payment_status: PaymentStatus
  is_manual: boolean
  notes: string | null
  created_at: string
  updated_at: string
  customer?: Customer
  farmhouse?: Farmhouse
}

export interface Payment {
  id: number
  booking_id: number
  amount: number
  payment_status: PaymentStatus
  payment_gateway: string
  gateway_payment_id: string | null
  gateway_response: string | null
  paid_at: string | null
  created_at: string
}

export interface SlotAvailability {
  slot_name: SlotName
  start_time: string
  end_time: string
  price: number
  status: 'available' | 'pending' | 'booked'
}

export interface BookingFormData {
  farmhouse_id: number
  booking_type: BookingType
  booking_date: string
  slot_name: SlotName
  name: string
  email: string
  phone: string
  notes?: string
}

export interface DashboardStats {
  total_bookings: number
  confirmed_bookings: number
  pending_payments: number
  cancelled_bookings: number
  total_revenue: number
  monthly_bookings: { month: string; count: number; revenue: number }[]
}
