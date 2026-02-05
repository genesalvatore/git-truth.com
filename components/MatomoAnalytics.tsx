'use client';

import { useEffect } from 'react';
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
 * 
 * @param siteId - Unique Matomo site ID for this Cathedral site
 * @param serverUrl - Matomo server URL (default: stats.greentreehosting.net)
 */
export default function MatomoAnalytics({ 
  siteId, 
  serverUrl = 'stats.greentreehosting.net' 
}: MatomoAnalyticsProps) {
  useEffect(() => {
    // Initialize Matomo tracker
    window._paq = window._paq || [];
    
    // Track page view
    window._paq.push(['trackPageView']);
    
    // Enable automatic link tracking
    window._paq.push(['enableLinkTracking']);
    
    // Set tracker URL and site ID
    window._paq.push(['setTrackerUrl', `https://${serverUrl}/matomo.php`]);
    window._paq.push(['setSiteId', siteId]);
    
    // Optional: Disable cookies for enhanced privacy
    window._paq.push(['disableCookies']);
    
    // Optional: Respect Do Not Track browser setting
    window._paq.push(['setDoNotTrack', true]);
  }, [siteId, serverUrl]);

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
