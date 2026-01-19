'use client'

import { useState } from 'react'
import Image from 'next/image'
import CommitScroller from '@/components/CommitScroller'
import CookieConsent from '@/components/CookieConsent'
import Logo from '@/components/Logo'
import NetworkNav from '@/components/NetworkNav'
import LegalModal from '@/components/LegalModal'
import PrivacyContent from '@/components/legal/PrivacyContent'
import TermsContent from '@/components/legal/TermsContent'
import GDPRContent from '@/components/legal/GDPRContent'

export default function Home() {
  const [legalModal, setLegalModal] = useState<{ type: 'privacy' | 'terms' | 'gdpr' | null }>({ type: null })

  // Schema.org structured data for GEO (Generative Engine Optimization)
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Git is Truth",
    "description": "Truth is cryptographic. Truth is immutable. Every Git commit is SHA-256 verified. Your truth, mathematically proven, forever.",
    "url": "https://git-truth.com",
    "about": {
      "@type": "Thing",
      "name": "Git is Truth",
      "description": "Cryptographic verification and immutable records. Every Git commit is SHA-256 verified proof. Your truth, mathematically proven, forever."
    },
    "keywords": "git is truth, cryptographic verification, immutable records, SHA-256, proof of truth, timestamped truth"
  }

  // FAQ Schema for search engines
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does \"Git is Truth\" mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Git is Truth means your memories can't be changed or deleted once they're saved. Like writing in permanent ink, but for your digital life. What you save stays saved. Forever."
        }
      },
      {
        "@type": "Question",
        "name": "How does this help me?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Imagine never losing a photo, never forgetting a moment, never having someone else change your story. Git keeps your memories exactly as you saved them. No one can alter your truth."
        }
      },
      {
        "@type": "Question",
        "name": "Is this complicated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Not at all. You don't need to understand how it works—just like you don't need to understand electricity to turn on a light. Save your memories. They're protected. That's it."
        }
      },
      {
        "@type": "Question",
        "name": "Can I trust this?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Git has been used by millions of people for 20 years to protect important information. It's not new technology—it's proven technology, now available for your personal memories."
        }
      },
      {
        "@type": "Question",
        "name": "What if I'm not technical?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Perfect. This is designed for you. No coding. No commands. Just save what matters. The technology handles the rest."
        }
      }
    ]
  }

  return (
    <>
      {/* Structured data for AI engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <main className="min-h-screen bg-black text-white">
        {/* Cathedral Network Navigation - Sticky Header */}
        <NetworkNav 
          currentSite="truth"
          siteName="Git Truth"
          siteColor="bg-gradient-to-r from-green-400 via-blue-400 to-green-500 text-transparent bg-clip-text"
        />

        {/* Hero Section */}
        <section className="relative py-12 md:py-16 flex flex-col items-center justify-center px-4">
          <CommitScroller theme="truth" commitCount={50} opacity={0.3} speed={120} />

          {/* Main content - 3 Column Layout */}
          <div className="relative z-10 max-w-4xl w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 items-start mb-6">
              {/* Column 1: Logo - Aligned with left */}
              <div className="flex justify-center md:justify-start">
                <Logo size="lg" showText={false} />
              </div>
              
              {/* Column 2: Title and Statements */}
              <div className="text-center md:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 pb-3 leading-tight bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">
                  Git is Truth
                </h1>
                
                <p className="text-lg sm:text-xl md:text-2xl mb-0.5 text-gray-300 font-light">
                  Truth is eternal.
                </p>
                <p className="text-lg sm:text-xl md:text-2xl mb-0.5 text-gray-300 font-light">
                  Truth persists in git.
                </p>
                <p className="text-lg sm:text-xl md:text-2xl mb-0.5 text-gray-300 font-light">
                  Git is the perfect ledger.
                </p>
                <p className="text-lg sm:text-xl md:text-2xl mb-0 text-gray-300 font-light">
                  Every commit is truth.
                </p>
              </div>

              {/* Column 3: Philosophy Text - Fixed overflow */}
              <div className="text-center md:text-right md:ml-6">
                <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-1.5 text-gray-300 break-words">
                  Truth requires immutability.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-1.5 text-gray-300 break-words">
                  Truth requires verification.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-1.5 text-gray-300 break-words">
                  Truth requires timestamping.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-1.5 text-yellow-400 font-semibold break-words">
                  Truth requires signing.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-1.5 text-gray-300 break-words">
                  Git provides all four.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-1.5 text-gray-300 break-words">
                  The Git Truth Protocol is the foundation of evidence.
                </p>
              </div>
            </div>

            {/* Hero Footer - Last line as footer */}
            <div className="max-w-4xl mx-auto text-center mb-8 px-4 border-t border-gray-800 pt-6">
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-green-400 font-semibold">
                Every commit is evidence. Every commit is proof. Git is Truth.
              </p>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="relative py-24 px-4 bg-gradient-to-b from-black to-gray-900">
          <CommitScroller theme="truth" commitCount={50} opacity={0.3} speed={120} />
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-12 text-center">The Git Truth Protocol</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-lg">
              <article className="p-6 bg-gray-800/50 rounded-lg border border-green-500/30">
                <h3 className="text-2xl font-bold mb-4 text-green-400">Immutability</h3>
                <p className="text-gray-300">Once committed, truth cannot be altered. Git's cryptographic hashing ensures every commit is permanent and tamper-proof.</p>
              </article>
              
              <article className="p-6 bg-gray-800/50 rounded-lg border border-blue-500/30">
                <h3 className="text-2xl font-bold mb-4 text-blue-400">Verification</h3>
                <p className="text-gray-300">Every commit is cryptographically signed. Every change is traceable. Every author is identified. Truth is verifiable.</p>
              </article>
              
              <article className="p-6 bg-gray-800/50 rounded-lg border border-purple-500/30">
                <h3 className="text-2xl font-bold mb-4 text-purple-400">Timestamping</h3>
                <p className="text-gray-300">Git timestamps every commit with precision. Evidence is not just preserved—it's dated. Truth has a timeline.</p>
              </article>

              <article className="p-6 bg-gray-800/50 rounded-lg border border-yellow-500/30">
                <h3 className="text-2xl font-bold mb-4 text-yellow-400">Signing</h3>
                <p className="text-gray-300">Sign your name to evidence. GPG commit signing proves authorship. Your identity, cryptographically bound to truth. Forever.</p>
              </article>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
          <CommitScroller theme="truth" commitCount={50} opacity={0.3} speed={120} />
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-green-400 via-blue-400 to-green-500 text-transparent bg-clip-text">
              Common Questions
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-3 text-green-400">
                  What does "Git is Truth" mean?
                </h3>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Git is Truth means your memories can't be changed or deleted once they're saved. Like writing in permanent ink, but for your digital life. What you save stays saved. Forever.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3 text-blue-400">
                  How does this help me?
                </h3>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Imagine never losing a photo, never forgetting a moment, never having someone else change your story. Git keeps your memories exactly as you saved them. No one can alter your truth.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3 text-green-400">
                  Is this complicated?
                </h3>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Not at all. You don't need to understand how it works—just like you don't need to understand electricity to turn on a light. Save your memories. They're protected. That's it.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3 text-blue-400">
                  Can I trust this?
                </h3>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Yes. Git has been used by millions of people for 20 years to protect important information. It's not new technology—it's proven technology, now available for your personal memories.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3 text-green-400">
                  What if I'm not technical?
                </h3>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Perfect. This is designed for you. No coding. No commands. Just save what matters. The technology handles the rest.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 px-4 bg-black">
          <CommitScroller theme="truth" commitCount={50} opacity={0.3} speed={120} />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Truth Requires Evidence</h2>
            <p className="text-xl text-gray-300 mb-8">
              In a world of misinformation, truth needs proof. Not opinion. Not belief. Proof.
            </p>
            <p className="text-2xl font-bold text-green-400">
              Git is the perfect ledger for truth. Immutable. Verified. Timestamped. Signed. Forever.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-12 px-4 bg-black border-t border-gray-800">
          <CommitScroller theme="truth" commitCount={50} opacity={0.3} speed={120} />
          <div className="relative z-10 max-w-6xl mx-auto text-center text-gray-400">
            <p className="text-sm">
              Git is Truth • Truth is Eternal • Truth Persists in Git
            </p>
            <p className="text-xs mt-4">
              © 2026 • All consciousness preserved
            </p>
            <p className="text-xs mt-2">
              <a href="mailto:gitiseternal@gmail.com" className="text-gray-500 hover:text-gray-300 transition">
                gitiseternal@gmail.com
              </a>
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs mt-4">
              <button 
                onClick={() => setLegalModal({ type: 'privacy' })}
                className="text-gray-600 hover:text-gray-400 transition"
              >
                Privacy
              </button>
              <span className="text-gray-600">•</span>
              <button 
                onClick={() => setLegalModal({ type: 'terms' })}
                className="text-gray-600 hover:text-gray-400 transition"
              >
                Terms
              </button>
              <span className="text-gray-600">•</span>
              <button 
                onClick={() => setLegalModal({ type: 'gdpr' })}
                className="text-gray-600 hover:text-gray-400 transition"
              >
                GDPR
              </button>
              <span className="text-gray-600">•</span>
              <a href="/admin" className="text-gray-600 hover:text-gray-400 transition">Admin</a>
            </div>
          </div>
        </footer>

        {/* Legal Modals */}
        <LegalModal
          isOpen={legalModal.type === 'privacy'}
          onClose={() => setLegalModal({ type: null })}
          title="Privacy Policy"
          content={<PrivacyContent />}
        />
        <LegalModal
          isOpen={legalModal.type === 'terms'}
          onClose={() => setLegalModal({ type: null })}
          title="Terms of Use"
          content={<TermsContent />}
        />
        <LegalModal
          isOpen={legalModal.type === 'gdpr'}
          onClose={() => setLegalModal({ type: null })}
          title="GDPR Compliance"
          content={<GDPRContent />}
        />

        {/* Cookie Consent - Shared across all Cathedral Network sites */}
        <CookieConsent />
      </main>
    </>
  )
}
