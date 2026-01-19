'use client'

import { useEffect } from 'react'

interface LegalModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: React.ReactNode
}

export default function LegalModal({ isOpen, onClose, title, content }: LegalModalProps) {
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
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black border-2 border-blue-500/50 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 px-6 py-4 rounded-t-2xl flex justify-between items-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition p-2"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="prose prose-invert prose-lg max-w-none space-y-8 text-white">
            {content}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 px-6 py-4 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
