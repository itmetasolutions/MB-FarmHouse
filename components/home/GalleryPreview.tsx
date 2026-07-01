import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const previewImages = [
  { src: '/images/Farm One Images/Farm One Image (5).webp', alt: 'MB Farm 1 pool and lawn', span: 'col-span-2 row-span-2' },
  { src: '/images/Farm Two Images/Farm Two Image (13).webp', alt: 'MB Farm 2 pool', span: '' },
  { src: '/images/Farm One Images/Farm One Image (9).webp', alt: 'MB Farm 1 pool party wall', span: '' },
  { src: '/images/Farm Two Images/Farm Two Image (12).webp', alt: 'MB Farm 2 jacuzzi at night', span: '' },
  { src: '/images/Farm One Images/Farm One Image (10).webp', alt: 'MB Farm 1 garden lounge', span: '' },
  { src: '/images/Farm Two Images/Farm Two Image (8).webp', alt: 'MB Farm 2 cave lounge room', span: '' },
]

export default function GalleryPreview() {
  return (
    <section className="py-24 bg-farmhouse-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-farmhouse-tan text-xs font-semibold tracking-[0.4em] uppercase mb-4">
            Photo Gallery
          </p>
          <h2 className="section-heading mb-4">A Glimpse of the Experience</h2>
          <p className="section-subheading max-w-2xl mx-auto">
            Let our venues speak for themselves — lush surroundings, elegant spaces, and breathtaking moments.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[200px]">
          {previewImages.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden group ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-farmhouse-dark/0 group-hover:bg-farmhouse-dark/30 transition-colors duration-300" />
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/gallery" className="btn-secondary">
            View Full Gallery <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
