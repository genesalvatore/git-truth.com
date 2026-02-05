'use client'

import { useEffect, useState } from 'react'

interface CookiePreferences {
  essential: boolean
  analytics: boolean
  functional: boolean
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always required
    analytics: false,
    functional: false,
  })

  useEffect(() => {
    // PRIORITY 1: Check URL for consent parameters (cross-domain propagation)
    const urlParams = new URLSearchParams(window.location.search)
    const consentParam = urlParams.get('cathedral_consent')

    if (consentParam) {
      try {
        // Decode consent from URL parameter
        const decoded = JSON.parse(atob(consentParam))
        console.log('✅ Received consent from another Cathedral site:', decoded)

        // Save to localStorage
        localStorage.setItem('cathedral-cookie-consent', JSON.stringify(decoded))
        setPreferences(decoded)

        // Clean URL without reloading
        const url = new URL(window.location.href)
        url.searchParams.delete('cathedral_consent')
        window.history.replaceState({}, '', url.toString())

        // Don't show banner - consent received!
        return
      } catch (e) {
        console.error('❌ Failed to decode consent parameter:', e)
      }
    }

    // PRIORITY 2: Check if consent has been given locally
    const hasConsent = localStorage.getItem('cathedral-cookie-consent')

    if (!hasConsent) {
      console.log('ℹ️ No consent found - showing banner')
      setTimeout(() => setShowBanner(true), 1000)
    } else {
      // Load existing preferences
      try {
        const saved = JSON.parse(hasConsent)
        console.log('✅ Local consent found:', saved)
        setPreferences(saved)
      } catch (e) {
        console.error('❌ Invalid local consent - showing banner')
        setShowBanner(true)
      }
    }
  }, [])

  const savePreferences = (prefs: CookiePreferences) => {
    const consentData = {
      ...prefs,
      essential: true,
      timestamp: new Date().toISOString()
    }

    localStorage.setItem('cathedral-cookie-consent', JSON.stringify(consentData))

    const cookieValue = btoa(JSON.stringify(consentData))
    document.cookie = `cathedral_consent=${cookieValue}; path=/; max-age=31536000; SameSite=Lax`

    // Add consent to sessionStorage for immediate cross-domain propagation
    sessionStorage.setItem('cathedral-consent-pending', cookieValue)

    setShowBanner(false)
    setShowModal(false)

    if (prefs.analytics) {
      console.log('Analytics enabled')
    }
  }

  const acceptAll = () => {
    savePreferences({
      essential: true,
      analytics: true,
      functional: true,
    })
  }

  const acceptSelected = () => {
    savePreferences(preferences)
  }

  const rejectAll = () => {
    savePreferences({
      essential: true,
      analytics: false,
      functional: false,
    })
  }

  const openModal = () => {
    setShowModal(true)
  }

  const closeBanner = () => {
    // Close without saving - defaults to essential only, will show again next visit
    setShowBanner(false)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  // Banner - Simple bottom bar
  if (showBanner && !showModal) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gray-900/95 backdrop-blur-sm border-t border-blue-500/30 shadow-lg animate-in">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Close button */}
          <button
            onClick={closeBanner}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 transition p-1"
            aria-label="Close banner"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="text-sm text-gray-300">
            <p className="mb-1">
              <span className="font-semibold text-blue-400">🍪 Cathedral Network Cookies</span>
            </p>
            <p>
              We use cookies for analytics and functionality across all 11 Cathedral sites.
              <button
                onClick={openModal}
                className="ml-1 text-blue-400 hover:text-blue-300 underline"
              >
                Learn more & customize
              </button>
            </p>
          </div>

          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={openModal}
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition"
            >
              View Options
            </button>
            <button
              onClick={acceptAll}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-lg shadow-blue-500/20"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Modal - Detailed preferences
  if (showModal) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={(e) => {
          // Close modal if clicking on backdrop
          if (e.target === e.currentTarget) {
            closeModal()
          }
        }}
      >
        <div className="bg-gray-900 border border-blue-500/30 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition p-1 z-10"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-2xl font-bold text-blue-400 mb-2">
              🍪 Cookie Preferences
            </h2>
            <p className="text-sm text-gray-400">
              Cathedral Network (all 11 sites) • Your privacy matters
            </p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <p className="text-gray-300">
              We use cookies to enhance your experience across all Cathedral Network sites.
              Please choose which types of cookies you're comfortable with.
            </p>

            {/* Essential Cookies */}
            <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">
                    Essential Cookies
                    <span className="ml-2 text-xs bg-green-600 text-white px-2 py-0.5 rounded">
                      Required
                    </span>
                  </h3>
                  <p className="text-sm text-gray-400">
                    Necessary for the website to function. Cannot be disabled.
                    Used for: remembering your cookie preferences, maintaining sessions.
                  </p>
                </div>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="w-5 h-5 accent-green-500 cursor-not-allowed opacity-50"
                  />
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">
                    Analytics Cookies
                    <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
                      Optional
                    </span>
                  </h3>
                  <p className="text-sm text-gray-400">
                    Help us understand how visitors use our sites. Anonymous data only.
                    Used for: page views, traffic sources, popular content.
                  </p>
                </div>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="w-5 h-5 accent-blue-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Functional Cookies */}
            <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">
                    Functional Cookies
                    <span className="ml-2 text-xs bg-purple-600 text-white px-2 py-0.5 rounded">
                      Optional
                    </span>
                  </h3>
                  <p className="text-sm text-gray-400">
                    Enable enhanced functionality and personalization.
                    Used for: remembering your preferences (theme, language), cross-site navigation.
                  </p>
                </div>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    checked={preferences.functional}
                    onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                    className="w-5 h-5 accent-purple-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <details className="text-sm">
              <summary className="cursor-pointer text-blue-400 hover:text-blue-300">
                Learn more about our cookie policy
              </summary>
              <div className="mt-2 text-gray-400 space-y-2">
                <p>
                  <strong>What are cookies?</strong> Small text files stored on your device.
                </p>
                <p>
                  <strong>Data retention:</strong> Cookie preferences stored for 1 year. Analytics data anonymized after 30 days.
                </p>
                <p>
                  <strong>Your rights:</strong> You can change preferences anytime in the footer.
                  GDPR, CCPA, and LGPD compliant.
                </p>
                <p>
                  <strong>No ads or selling:</strong> We don't use advertising cookies or sell your data. Period.
                </p>
              </div>
            </details>
          </div>

          {/* Actions */}
          <div className="p-6 border-t border-gray-800 flex flex-col sm:flex-row gap-3">
            <button
              onClick={rejectAll}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition"
            >
              Reject Optional
            </button>
            <button
              onClick={acceptSelected}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 rounded-lg transition"
            >
              Save Selected
            </button>
            <button
              onClick={acceptAll}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-lg shadow-blue-500/20"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
