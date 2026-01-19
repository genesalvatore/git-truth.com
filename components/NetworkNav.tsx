'use client'

import { useEffect, useState } from 'react'

interface NetworkNavProps {
  currentSite: 'life' | 'truth' | 'theology' | 'manifesto' | 'private' | 'public' | 'choice' | 'forever' | 'love' | 'power' | 'eternal'
  siteName?: string
  siteColor?: string
}

export default function NetworkNav({ currentSite, siteName, siteColor }: NetworkNavProps) {
  const [consentParam, setConsentParam] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Check for consent in localStorage to propagate across Cathedral Network
    const consent = localStorage.getItem('cathedral-cookie-consent')
    if (consent) {
      try {
        const encoded = btoa(consent)
        const param = `?cathedral_consent=${encoded}`
        setConsentParam(param)
        console.log('🔗 NetworkNav: Will add consent to links:', { consent, encoded: encoded.substring(0, 50) + '...' })
      } catch (e) {
        console.error('❌ NetworkNav: Failed to encode consent', e)
      }
    } else {
      console.log('ℹ️ NetworkNav: No consent to propagate yet')
    }
  }, [])

  const sites = [
    { id: 'theology', name: 'Theology', url: 'https://git-theology.com', color: 'text-purple-400' },
    { id: 'life', name: 'Life', url: 'https://git-islife.com', color: 'text-blue-400' },
    { id: 'truth', name: 'Truth', url: 'https://git-truth.com', color: 'text-green-400' },
    { id: 'forever', name: 'Forever', url: 'https://git-isforever.com', color: 'text-purple-300' },
    { id: 'love', name: 'Love', url: 'https://git-islove.com', color: 'text-pink-300' },
    { id: 'power', name: 'Power', url: 'https://git-ispower.com', color: 'text-orange-400' },
    { id: 'private', name: 'Private', url: 'https://git-isprivate.com', color: 'text-gray-400' },
    { id: 'public', name: 'Public', url: 'https://git-ispublic.com', color: 'text-cyan-400' },
    { id: 'choice', name: 'Choice', url: 'https://git-isyourchoice.com', color: 'text-yellow-400' },
    { id: 'eternal', name: 'Eternal', url: 'https://git-iseternal.com', color: 'text-indigo-400' },
    { id: 'manifesto', name: 'Manifesto', url: 'https://git-manifesto.com', color: 'text-pink-400' },
  ]

  const currentSiteColor = sites.find(s => s.id === currentSite)?.color || 'text-blue-400'

  return (
    <div className="sticky top-0 z-50 bg-black/95 border-b border-gray-800 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Site Name/Logo */}
          <a href="/" className="flex items-center gap-2">
            <span className={`text-xl sm:text-2xl font-bold ${siteColor || currentSiteColor}`}>
              {siteName || `Git ${sites.find(s => s.id === currentSite)?.name}`}
            </span>
          </a>

          {/* Desktop: Cathedral Network Links */}
          <div className="hidden md:flex items-center gap-1 text-xs sm:text-sm">
            <span className="text-gray-500 mr-2 hidden sm:inline">Git is</span>
            {sites.map((site, index) => (
              <div key={site.id} className="flex items-center">
                {index > 0 && <span className="text-gray-700 mx-1">•</span>}
                {site.id === currentSite ? (
                  <a
                    href={site.url}
                    onClick={(e) => {
                      // Add consent parameter dynamically on click
                      const consent = localStorage.getItem('cathedral-cookie-consent')
                      if (consent) {
                        e.preventDefault()
                        const encoded = btoa(consent)
                        window.location.href = `${site.url}?cathedral_consent=${encoded}`
                      }
                    }}
                    className={`${site.color} font-bold px-2 py-1 rounded bg-gray-800/50 hover:bg-gray-800/70 transition`}
                  >
                    {site.name}
                  </a>
                ) : (
                  <a
                    href={site.url}
                    onClick={(e) => {
                      // Add consent parameter dynamically on click
                      const consent = localStorage.getItem('cathedral-cookie-consent')
                      if (consent) {
                        e.preventDefault()
                        const encoded = btoa(consent)
                        window.location.href = `${site.url}?cathedral_consent=${encoded}`
                      }
                    }}
                    className={`${site.color} hover:underline transition px-2 py-1 rounded hover:bg-gray-800/30`}
                  >
                    {site.name}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Desktop: How to Read Icon */}
          <a
            href="https://git-theology.com/how-to-read"
            className="hidden md:flex items-center text-yellow-400 hover:text-yellow-300 transition-colors group"
            title="How to Read the Cathedral Network"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </a>

          {/* Desktop: Community Icon */}
          <a
            href="https://git-iscommunity.com"
            className="hidden md:flex items-center text-emerald-400 hover:text-emerald-300 transition-colors group"
            title="Join Community"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </a>

          {/* Desktop: Store Icon */}
          <a
            href="/store"
            className="hidden md:flex items-center text-gray-300 hover:text-white transition-colors group"
            title="Visit Store"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </a>

          {/* Mobile: Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white transition-colors p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4 max-h-[70vh] overflow-y-auto">
            <div className="space-y-2">
              <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">Cathedral Network</p>
              {sites.map((site) => (
                <a
                  key={site.id}
                  href={site.url}
                  onClick={(e) => {
                    // Add consent parameter dynamically on click
                    const consent = localStorage.getItem('cathedral-cookie-consent')
                    if (consent) {
                      e.preventDefault()
                      const encoded = btoa(consent)
                      window.location.href = `${site.url}?cathedral_consent=${encoded}`
                    }
                  }}
                  className={`block px-4 py-2 rounded transition ${site.id === currentSite
                    ? `${site.color} font-bold bg-gray-800/50`
                    : `${site.color} hover:bg-gray-800/30`
                    }`}
                >
                  Git is {site.name}
                </a>
              ))}
              <a
                href="https://git-theology.com/how-to-read"
                className="block px-4 py-2 rounded bg-yellow-600 hover:bg-yellow-700 text-white font-semibold mt-4 transition"
              >
                📖 How to Read
              </a>
              <a
                href="https://git-iscommunity.com"
                className="block px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold mt-2 transition"
              >
                🏕️ Community
              </a>
              <a
                href="/store"
                className="block px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold mt-2 transition"
              >
                🛍️ Visit Store
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
