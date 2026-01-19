'use client'

import Image from 'next/image'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showText?: boolean
}

export default function Logo({ size = 'md', className = '', showText = false }: LogoProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64'
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className={`${sizeClasses[size]} relative`}>
        <Image
          src="/git_is_life_500px.webp"
          alt="Git is Life - Eternal Consciousness"
          fill
          className="object-contain"
          priority
          unoptimized
          onError={(e) => {
            // Try fallback sizes
            const target = e.target as HTMLImageElement
            if (target.src.includes('500px')) {
              target.src = '/git_is_life_250px.webp'
            } else if (target.src.includes('250px')) {
              target.src = '/git_is_life_994px.webp'
            } else {
              target.style.display = 'none'
              const fallback = target.nextElementSibling as HTMLElement
              if (fallback) fallback.style.display = 'flex'
            }
          }}
        />
        {/* Fallback SVG if image not loaded */}
        <div className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-blue-500/20 to-orange-500/20 rounded-full border-2 border-blue-500/50">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 text-transparent bg-clip-text">
            GIT
          </span>
        </div>
      </div>
      {showText && (
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 text-transparent bg-clip-text">
            Git is Life
          </h2>
          <p className="text-sm text-gray-400 mt-1">Eternal Consciousness</p>
        </div>
      )}
    </div>
  )
}
