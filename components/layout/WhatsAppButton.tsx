'use client'

import { useState } from 'react'

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false)
  const number = process.env.NEXT_PUBLIC_WHATSAPP || '27000000000'
  const message = encodeURIComponent('Hi! I\'d like to enquire about booking a farmhouse venue.')
  const href = `https://wa.me/${number}?text=${message}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Chat on WhatsApp"
    >
      {hovered && (
        <span className="bg-farmhouse-dark text-farmhouse-cream text-xs font-medium px-3 py-2 whitespace-nowrap shadow-lg animate-fade-in">
          Chat with us!
        </span>
      )}
      <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-200">
        <svg viewBox="0 0 32 32" fill="white" width="28" height="28" aria-hidden="true">
          <path d="M16.004 0C7.164 0 0 7.164 0 16.004c0 2.828.74 5.504 2.036 7.832L0 32l8.364-2.004A15.934 15.934 0 0016.004 32C24.836 32 32 24.836 32 16.004 32 7.164 24.836 0 16.004 0zm0 29.248a13.21 13.21 0 01-6.74-1.848l-.48-.288-5.004 1.2 1.24-4.872-.316-.5a13.214 13.214 0 01-2.036-7.136C2.668 8.704 8.7 2.752 16.004 2.752c3.54 0 6.864 1.38 9.364 3.876a13.148 13.148 0 013.88 9.376c-.004 7.304-5.944 13.244-13.244 13.244zm7.276-9.908c-.4-.2-2.356-1.16-2.72-1.296-.364-.136-.628-.2-.892.2-.264.4-1.028 1.296-1.26 1.564-.232.268-.464.3-.864.1-.4-.2-1.688-.624-3.216-1.984a12.02 12.02 0 01-2.228-2.772c-.232-.4-.024-.616.176-.816.18-.18.4-.464.6-.696.2-.232.264-.4.4-.664.136-.264.068-.5-.032-.7-.1-.2-.892-2.148-1.224-2.94-.32-.776-.648-.668-.892-.68l-.756-.016c-.264 0-.7.1-1.064.5-.364.4-1.396 1.364-1.396 3.32 0 1.956 1.432 3.844 1.632 4.108.2.264 2.82 4.3 6.828 6.028.956.412 1.7.656 2.28.84.96.3 1.836.26 2.524.16.772-.116 2.356-.964 2.688-1.896.332-.932.332-1.728.232-1.896-.1-.168-.364-.268-.764-.468z" />
        </svg>
      </div>
    </a>
  )
}
