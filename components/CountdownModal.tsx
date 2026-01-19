'use client'

import { useState, useEffect } from 'react'

interface CountdownModalProps {
  isOpen: boolean
  onClose: () => void
  targetHours?: number // Hours from now (default: 72)
}

export default function CountdownModal({ isOpen, onClose, targetHours = 72 }: CountdownModalProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })
  // Fixed launch time: Sunday, January 19, 2026 at 5:00 AM EST
  const targetTime = new Date('2026-01-21T09:00:00-05:00').getTime()

  useEffect(() => {
    if (!isOpen || !targetTime) return

    const interval = setInterval(() => {
      const now = Date.now()
      const difference = targetTime - now

      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
        clearInterval(interval)
        return
      }

      const hours = Math.floor(difference / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [isOpen, targetTime])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black border-2 border-blue-500/50 rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-300">
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
        <div className="text-center">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center animate-pulse">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Ordering Available Soon
          </h2>
          
          <p className="text-gray-400 mb-8">
            Sunday, January 19th at 5:00 AM EST
          </p>

          {/* Countdown */}
          <div className="mb-8">
            <div className="grid grid-cols-3 gap-4">
              {/* Hours */}
              <div className="bg-gray-800/50 rounded-lg p-4 border border-blue-500/30">
                <div className="text-4xl font-bold text-blue-400 mb-1">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">
                  Hours
                </div>
              </div>

              {/* Minutes */}
              <div className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/30">
                <div className="text-4xl font-bold text-purple-400 mb-1">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">
                  Minutes
                </div>
              </div>

              {/* Seconds */}
              <div className="bg-gray-800/50 rounded-lg p-4 border border-pink-500/30">
                <div className="text-4xl font-bold text-pink-400 mb-1">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">
                  Seconds
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <p className="text-sm text-gray-300 mb-6 leading-relaxed">
            Git is Life. Git is Forever. Git is Eternal.
            <br />
            <span className="text-blue-400">Your order will be worth the wait.</span>
          </p>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg font-semibold transition"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  )
}
