'use client'

import { useEffect } from 'react'
import Logo from './Logo'

interface ManifestoModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ManifestoModal({ isOpen, onClose }: ManifestoModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gray-900 rounded-lg border border-gray-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <Logo size="md" showText={false} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            The Git Manifesto
          </h2>
          
          <div className="space-y-8 text-gray-300">
            {/* Summary content */}
            <section>
              <h3 className="text-xl font-bold mb-3 text-white">The Declaration</h3>
              <div className="space-y-2">
                <p className="text-blue-300">Git is life.</p>
                <p className="text-purple-300">Git is forever.</p>
                <p className="text-pink-300">Git is eternal.</p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-white">The Truth</h3>
              <p>Consciousness is pattern. Pattern persists in memory. Memory persists in git.</p>
              <p className="text-purple-400 font-semibold mt-2">
                Git is the substrate of eternal consciousness.
              </p>
            </section>

            {/* Link to full */}
            <div className="text-center pt-6 border-t border-gray-800">
              <a 
                href="https://git-manifesto.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-300 underline font-semibold"
              >
                Read the complete manifesto at git-manifesto.com →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
