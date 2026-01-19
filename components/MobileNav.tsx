'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-2 text-gray-300 hover:text-white"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/95 z-50 pt-20">
          <nav className="flex flex-col items-center gap-6 text-xl">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-blue-400 transition">
              Home
            </Link>
            <Link href="/manifesto" onClick={() => setIsOpen(false)} className="hover:text-blue-400 transition">
              Manifesto
            </Link>
            <Link href="/store" onClick={() => setIsOpen(false)} className="hover:text-blue-400 transition">
              Store
            </Link>
            <Link href="/store/cart" onClick={() => setIsOpen(false)} className="hover:text-blue-400 transition">
              Cart
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
