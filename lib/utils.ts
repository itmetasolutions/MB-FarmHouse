import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, parseISO } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, 'dd MMMM yyyy')
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(amount)
}

export function generateBookingReference(): string {
  const prefix = 'MBF'
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

export function generatePayFastSignature(
  data: Record<string, string>,
  passPhrase: string
): string {
  const pfOutput = Object.entries(data)
    .filter(([, v]) => v !== '')
    .map(([k, v]) => `${k}=${encodeURIComponent(v).replace(/%20/g, '+')}`)
    .join('&')

  const pfString = passPhrase
    ? `${pfOutput}&passphrase=${encodeURIComponent(passPhrase).replace(/%20/g, '+')}`
    : pfOutput

  const crypto = require('crypto')
  return crypto.createHash('md5').update(pfString).digest('hex')
}

export const SLOT_LABELS: Record<string, string> = {
  morning: 'Morning Session',
  afternoon: 'Afternoon Session',
  evening: 'Evening Session',
  night: 'Night Session',
  full_day: 'Full Day',
}

export const BOOKING_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

export const PAYMENT_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-800',
}
