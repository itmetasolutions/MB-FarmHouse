import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Step {
  label: string
  num: number
}

const steps: Step[] = [
  { num: 1, label: 'Select Venue' },
  { num: 2, label: 'Choose Date' },
  { num: 3, label: 'Select Slot' },
  { num: 4, label: 'Your Details' },
  { num: 5, label: 'Checkout' },
]

interface Props {
  currentStep: number
}

export default function BookingProgress({ currentStep }: Props) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* connecting line */}
        <div className="absolute left-0 right-0 top-5 h-0.5 bg-farmhouse-beige -z-0" />
        <div
          className="absolute left-0 top-5 h-0.5 bg-farmhouse-brown -z-0 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step) => {
          const done = step.num < currentStep
          const active = step.num === currentStep
          return (
            <div key={step.num} className="flex flex-col items-center gap-2 z-10 bg-transparent">
              <div
                className={cn(
                  'w-10 h-10 flex items-center justify-center font-semibold text-sm transition-all duration-300 border-2',
                  done
                    ? 'bg-farmhouse-brown border-farmhouse-brown text-white'
                    : active
                    ? 'bg-white border-farmhouse-brown text-farmhouse-brown'
                    : 'bg-white border-farmhouse-beige text-farmhouse-muted'
                )}
              >
                {done ? <Check size={16} /> : step.num}
              </div>
              <span
                className={cn(
                  'text-xs font-medium hidden sm:block',
                  active ? 'text-farmhouse-brown' : done ? 'text-farmhouse-brown' : 'text-farmhouse-muted'
                )}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
