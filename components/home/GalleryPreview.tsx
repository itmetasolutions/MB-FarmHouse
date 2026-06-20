import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const previewImages = [
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80', alt: 'Farmhouse exterior', span: 'col-span-2 row-span-2' },
  { src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=400&q=80', alt: 'Pool area', span: '' },
  { src: 'https://images.unsplash.com/photo-1519671282429-b8d070e96c3c?auto=format&fit=crop&w=400&q=80', alt: 'Event setup', span: '' },
  { src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80', alt: 'Outdoor dining', span: '' },
  { src: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=400&q=80', alt: 'Garden area', span: '' },
  { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80', alt: 'Modern interior', span: '' },
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
