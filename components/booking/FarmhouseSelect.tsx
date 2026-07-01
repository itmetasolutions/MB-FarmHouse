import Image from 'next/image'
import { Check, Users } from 'lucide-react'
import { FARMHOUSES } from '@/lib/farmhouses'
import { cn } from '@/lib/utils'

interface Props {
  selected: number | null
  onSelect: (id: number) => void
}

export default function FarmhouseSelect({ selected, onSelect }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-serif text-3xl text-farmhouse-dark mb-2">Choose Your Venue</h2>
        <p className="text-farmhouse-muted text-sm">Select the farmhouse you'd like to book for your event.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {FARMHOUSES.map((fh) => (
          <button
            key={fh.id}
            type="button"
            onClick={() => onSelect(fh.id)}
            className={cn(
              'text-left w-full border-2 transition-all duration-200 overflow-hidden group',
              selected === fh.id
                ? 'border-farmhouse-brown shadow-lg'
                : 'border-farmhouse-beige hover:border-farmhouse-tan hover:shadow-md'
            )}
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={fh.image_url}
                alt={fh.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-farmhouse-dark/60 to-transparent" />
              <div className="absolute top-3 left-3 bg-farmhouse-brown text-farmhouse-cream text-xs font-semibold tracking-wide px-2.5 py-1">
                {fh.theme}
              </div>
              {selected === fh.id && (
                <div className="absolute top-3 right-3 w-7 h-7 bg-farmhouse-brown flex items-center justify-center">
                  <Check size={14} className="text-white" />
                </div>
              )}
            </div>
            <div className="p-5">
              <h3 className="font-serif text-xl text-farmhouse-dark mb-1.5">{fh.name}</h3>
              <p className="text-farmhouse-muted text-xs leading-relaxed line-clamp-2 mb-3">{fh.description}</p>
              <div className="flex items-center gap-1.5 text-farmhouse-muted text-xs">
                <Users size={12} />
                Up to {fh.capacity} guests
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
