import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Git is Truth | Cryptographic Verification & Immutable Records',
  description: 'Truth is cryptographic. Truth is immutable. Every Git commit is SHA-256 verified. Your truth, mathematically proven, forever.',
  keywords: ['git is truth', 'cryptographic verification', 'immutable records', 'SHA-256', 'proof of truth', 'timestamped truth', 'mathematical proof'],
  authors: [{ name: 'The Salvatore Family' }],
  publisher: 'Git is Truth',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://git-truth.com',
    title: 'Git is Truth | Cryptographic Verification & Immutable Records',
    description: 'Truth is cryptographic. Truth is immutable. Every Git commit is SHA-256 verified. Your truth, mathematically proven, forever.',
    siteName: 'Git is Truth',
    images: [
      {
        url: '/og-truth.png',
        width: 1200,
        height: 630,
        alt: 'Git is Truth - Cryptographic Verification & Immutable Records',
      },
    ],
  },
  alternates: {
    canonical: 'https://git-truth.com',
  },
  metadataBase: new URL('https://git-truth.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo-git-is-life.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
