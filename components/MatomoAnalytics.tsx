'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

interface MatomoAnalyticsProps {
  siteId: string;
  serverUrl?: string;
}

/**
 * Matomo Analytics Component for Cathedral Network
 * 
 * Self-hosted analytics at stats.greentreehosting.net
 * Privacy-compliant, no third-party tracking
 * Tracks both initial page loads AND client-side route changes
 * 
 * @param siteId - Unique Matomo site ID for this Cathedral site
 * @param serverUrl - Matomo server URL (default: stats.greentreehosting.net)
 */
export default function MatomoAnalytics({
  siteId,
  serverUrl = 'stats.greentreehosting.net'
}: MatomoAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize Matomo once
  useEffect(() => {
    window._paq = window._paq || [];

    // Set tracker URL and site ID (only needs to happen once)
    window._paq.push(['setTrackerUrl', `https://${serverUrl}/matomo.php`]);
    window._paq.push(['setSiteId', siteId]);

    // Enable automatic link tracking
    window._paq.push(['enableLinkTracking']);

    // Privacy settings
    window._paq.push(['disableCookies']);
    window._paq.push(['setDoNotTrack', true]);
  }, [siteId, serverUrl]);

  // Track page views on route change (for Next.js SPA navigation)
  useEffect(() => {
    if (!window._paq) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    // Track the page view
    window._paq.push(['setCustomUrl', url]);
    window._paq.push(['setDocumentTitle', document.title]);
    window._paq.push(['trackPageView']);
  }, [pathname, searchParams]);

  return (
    <Script
      id="matomo-analytics"
      strategy="afterInteractive"
      src={`https://${serverUrl}/matomo.js`}
      async
    />
  );
}

// TypeScript declaration for Matomo's global _paq array
declare global {
  interface Window {
    _paq: any[];
  }
}
