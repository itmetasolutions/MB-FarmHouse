import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email').or(z.literal('')),
  notes: z.string().optional(),
})

export type CustomerFormValues = z.infer<typeof schema>

interface Props {
  defaultValues?: Partial<CustomerFormValues>
  onSubmit: (data: CustomerFormValues) => void
}

export default function CustomerDetailsForm({ defaultValues, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-serif text-3xl text-farmhouse-dark mb-2">Your Details</h2>
        <p className="text-farmhouse-muted text-sm">Please provide your contact information to complete the booking.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" id="customer-details-form">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs text-farmhouse-muted uppercase tracking-wide mb-2">
              Full Name *
            </label>
            <input
              type="text"
              {...register('name')}
              placeholder="Your full name"
              className="input-field"
            />
            {errors.name && (
              <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-xs text-farmhouse-muted uppercase tracking-wide mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              {...register('phone')}
              placeholder="+27 XX XXX XXXX"
              className="input-field"
            />
            {errors.phone && (
              <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs text-farmhouse-muted uppercase tracking-wide mb-2">
            Email Address
          </label>
          <input
            type="email"
            {...register('email')}
            placeholder="your@email.com (for booking confirmation)"
            className="input-field"
          />
          {errors.email && (
            <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs text-farmhouse-muted uppercase tracking-wide mb-2">
            Special Requests / Notes
          </label>
          <textarea
            {...register('notes')}
            rows={4}
            placeholder="Any special arrangements, requirements, or notes..."
            className="input-field resize-none"
          />
        </div>
      </form>
    </div>
  )
}
