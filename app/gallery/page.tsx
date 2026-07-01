'use client'

import { useState } from 'react'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'

type GalleryCategory = 'all' | 'farmhouse' | 'pool' | 'events' | 'rooms' | 'outdoor'

interface GalleryImage {
  src: string
  alt: string
  category: GalleryCategory[]
}

const galleryImages: GalleryImage[] = [
  { src: '/images/Farm One Images/Farm One Image (1).webp', alt: 'MB Farm 1 indoor pool and waterfall wall', category: ['pool', 'events'] },
  { src: '/images/Farm One Images/Farm One Image (5).webp', alt: 'MB Farm 1 lawn and pool', category: ['farmhouse', 'outdoor'] },
  { src: '/images/Farm Two Images/Farm Two Image (13).webp', alt: 'MB Farm 2 pool by day', category: ['pool'] },
  { src: '/images/Farm Two Images/Farm Two Image (4).webp', alt: 'MB Farm 2 exterior', category: ['farmhouse', 'outdoor'] },
  { src: '/images/Farm One Images/Farm One Image (14).webp', alt: 'MB Farm 1 storybook cottage exterior', category: ['farmhouse'] },
  { src: '/images/Farm Two Images/Farm Two Image (8).webp', alt: 'MB Farm 2 cave-style lounge room', category: ['rooms'] },
  { src: '/images/Farm One Images/Farm One Image (9).webp', alt: 'MB Farm 1 Pool Party neon wall', category: ['pool', 'events'] },
  { src: '/images/Farm Two Images/Farm Two Image (15).webp', alt: 'MB Farm 2 pool and wooden bridge', category: ['pool', 'outdoor'] },
  { src: '/images/Farm One Images/Farm One Image (10).webp', alt: 'MB Farm 1 garden lounge chairs', category: ['outdoor'] },
  { src: '/images/Farm Two Images/Farm Two Image (12).webp', alt: 'MB Farm 2 jacuzzi corner at night', category: ['pool', 'events'] },
  { src: '/images/Farm One Images/Farm One Image (7).webp', alt: 'MB Farm 1 pergola swing lounge at night', category: ['events', 'outdoor'] },
  { src: '/images/Farm Two Images/Farm Two Image (5).webp', alt: 'MB Farm 2 poolside lounge seating', category: ['pool', 'events'] },
  { src: '/images/Farm One Images/Farm One Image (2).webp', alt: 'MB Farm 1 lawn seating area at night', category: ['outdoor', 'events'] },
  { src: '/images/Farm Two Images/Farm Two Image (10).webp', alt: 'MB Farm 2 pool at night', category: ['pool'] },
  { src: '/images/Farm One Images/Farm One Image (12).webp', alt: 'MB Farm 1 moonlit feature wall', category: ['events'] },
  { src: '/images/Farm Two Images/Farm Two Image (17).webp', alt: 'MB Farm 2 carved stone façade', category: ['farmhouse'] },
]

const filters: { label: string; value: GalleryCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Farmhouses', value: 'farmhouse' },
  { label: 'Pool & Water', value: 'pool' },
  { label: 'Events', value: 'events' },
  { label: 'Rooms & Interiors', value: 'rooms' },
  { label: 'Outdoor & Gardens', value: 'outdoor' },
]

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>('all')
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

  const filtered =
    activeFilter === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category.includes(activeFilter))

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-64 md:h-80 flex items-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80"
              alt="Gallery"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-farmhouse-dark/60" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
            <p className="text-farmhouse-tan text-xs font-semibold tracking-[0.4em] uppercase mb-3">Visual Journey</p>
            <h1 className="font-serif text-4xl md:text-5xl text-white font-bold text-shadow">Gallery</h1>
          </div>
        </section>

        {/* Filters */}
        <div className="bg-farmhouse-cream border-b border-farmhouse-beige sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-2 overflow-x-auto scrollbar-none">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`whitespace-nowrap px-5 py-2 text-xs font-semibold tracking-wide uppercase transition-colors ${
                  activeFilter === f.value
                    ? 'bg-farmhouse-brown text-farmhouse-cream'
                    : 'bg-white text-farmhouse-dark hover:bg-farmhouse-beige border border-farmhouse-beige'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <section className="py-12 bg-farmhouse-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
              {filtered.map((img, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden cursor-pointer group break-inside-avoid"
                  onClick={() => setLightboxSrc(img.src)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-farmhouse-dark/0 group-hover:bg-farmhouse-dark/30 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      View
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-farmhouse-muted">
                No images in this category yet.
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 bg-farmhouse-dark/95 flex items-center justify-center p-4"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            className="absolute top-5 right-5 text-farmhouse-cream hover:text-farmhouse-tan text-3xl leading-none"
            onClick={() => setLightboxSrc(null)}
            aria-label="Close"
          >
            ×
          </button>
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightboxSrc}
              alt="Gallery lightbox"
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppButton />
    </>
  )
}
