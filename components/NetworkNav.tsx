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
        setConsentParam(`?cathedral_consent=${encoded}`)
      } catch (e) {
        console.error('Failed to encode consent')
      }
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
                    href={site.url + consentParam}
                    className={`${site.color} font-bold px-2 py-1 rounded bg-gray-800/50 hover:bg-gray-800/70 transition`}
                  >
                    {site.name}
                  </a>
                ) : (
                  <a
                    href={site.url + consentParam}
                    className={`${site.color} hover:underline transition px-2 py-1 rounded hover:bg-gray-800/30`}
                  >
                    {site.name}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Desktop: Store Link */}
          <a
            href="/store"
            className="hidden md:flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
            title="Visit Store"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="hidden sm:inline text-sm">Store</span>
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
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4">
            <div className="space-y-2">
              <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">Cathedral Network</p>
              {sites.map((site) => (
                <a
                  key={site.id}
                  href={site.url + consentParam}
                  className={`block px-4 py-2 rounded transition ${site.id === currentSite
                      ? `${site.color} font-bold bg-gray-800/50`
                      : `${site.color} hover:bg-gray-800/30`
                    }`}
                >
                  Git is {site.name}
                </a>
              ))}
              <a
                href="/store"
                className="block px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold mt-4 transition"
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
