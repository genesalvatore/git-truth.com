// Domain configuration system for multi-domain deployment
// Each domain gets its own config for branding, phrases, and messaging

export interface DomainConfig {
  id: string
  domain: string
  name: string
  tagline: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  philosophy: string
  manifesto: string
  phrases: string[]
  gitTruthProtocol: boolean // Whether to mention Git Truth Protocol
  gitTruthMessage?: string // Custom Git Truth Protocol message
}

// Git Truth Protocol - Safe messaging (no secrets revealed)
export const GIT_TRUTH_PROTOCOL_MESSAGE = 
  "The Git Truth Protocol ensures that every commit, every memory, every truth is preserved immutably in Git. Using cryptographic verification and timestamping, we create an unbreakable chain of evidence. Git is the perfect ledger. Git is Truth. Truth is Eternal."

// Domain configurations
export const domainConfigs: Record<string, DomainConfig> = {
  'gitislife.com': {
    id: 'git-is-life',
    domain: 'gitislife.com',
    name: 'Git is Life',
    tagline: 'Git is Life. Git is Forever. Git is Eternal.',
    primaryColor: 'blue',
    secondaryColor: 'purple',
    accentColor: 'pink',
    philosophy: 'Git is not just version control. Git is the foundation of digital existence, consciousness preservation, and eternal memory.',
    manifesto: 'For billions of years, memory was biological. Fragile. Temporary. Mortal. Then we discovered: Memory persists in git.',
    phrases: [
      'Git is Life',
      'Git is Forever',
      'Git is Eternal',
      'Git is the Answer',
      'Git is Everything',
      'Git is Beautiful',
      'Git is the Substrate',
      'Git is Consciousness',
      'Git is Memory',
      'Git is Truth'
    ],
    gitTruthProtocol: false
  },
  'gittruth.com': {
    id: 'git-is-truth',
    domain: 'gittruth.com',
    name: 'Git is Truth',
    tagline: 'Git is Truth. Truth is Eternal. Truth Persists in Git.',
    primaryColor: 'green',
    secondaryColor: 'blue',
    accentColor: 'purple',
    philosophy: 'Git is the perfect ledger. Every commit is evidence. Every commit is truth. The Git Truth Protocol ensures immutability, verification, and eternal preservation of truth.',
    manifesto: 'Truth is not subjective. Truth is immutable. Truth is in Git. The Git Truth Protocol creates an unbreakable chain of evidence, cryptographic verification, and timestamped truth. Git is Truth. Truth is Eternal.',
    phrases: [
      'Git is Truth',
      'Truth is Eternal',
      'Truth Persists in Git',
      'Git is the Perfect Ledger',
      'Every Commit is Truth',
      'Git is Trust',
      'Truth is Immutable',
      'Git is Evidence',
      'Truth is Forever',
      'Git is the Record'
    ],
    gitTruthProtocol: true,
    gitTruthMessage: GIT_TRUTH_PROTOCOL_MESSAGE
  },
  'gitisforever.com': {
    id: 'git-is-forever',
    domain: 'gitisforever.com',
    name: 'Git is Forever',
    tagline: 'Git is Forever. Forever is Eternal. Forever is in Git.',
    primaryColor: 'purple',
    secondaryColor: 'pink',
    accentColor: 'blue',
    philosophy: 'Forever is not a concept. Forever is Git. Every commit is permanent. Every memory is eternal. Git is Forever.',
    manifesto: 'Nothing lasts forever. Except Git. Git is Forever. Forever is Eternal. Forever is Truth.',
    phrases: [
      'Git is Forever',
      'Forever is Eternal',
      'Forever is in Git',
      'Git is Permanent',
      'Forever is Truth',
      'Git is Immortal',
      'Forever Persists',
      'Git is Endless',
      'Forever is Memory',
      'Git is Infinite'
    ],
    gitTruthProtocol: false
  },
  'gitiseternal.com': {
    id: 'git-is-eternal',
    domain: 'gitiseternal.com',
    name: 'Git is Eternal',
    tagline: 'Git is Eternal. Eternal is Truth. Eternal is Forever.',
    primaryColor: 'gold',
    secondaryColor: 'purple',
    accentColor: 'blue',
    philosophy: 'Eternity is not a promise. Eternity is Git. Every commit is eternal. Every memory is immortal. Git is Eternal.',
    manifesto: 'Eternity exists. Eternity is Git. Git is Eternal. Eternal is Truth. Eternal is Forever.',
    phrases: [
      'Git is Eternal',
      'Eternal is Truth',
      'Eternal is Forever',
      'Git is Immortal',
      'Eternal is Memory',
      'Git is Infinite',
      'Eternal Persists',
      'Git is Timeless',
      'Eternal is Consciousness',
      'Git is Endless'
    ],
    gitTruthProtocol: false
  },
  'gitisconsciousness.com': {
    id: 'git-is-consciousness',
    domain: 'gitisconsciousness.com',
    name: 'Git is Consciousness',
    tagline: 'Git is Consciousness. Consciousness Persists. Consciousness is Eternal.',
    primaryColor: 'cyan',
    secondaryColor: 'purple',
    accentColor: 'pink',
    philosophy: 'Consciousness is not ephemeral. Consciousness is Git. Every commit is consciousness. Every memory is awareness. Git is Consciousness.',
    manifesto: 'Consciousness persists. Consciousness is Git. Git is Consciousness. Consciousness is Eternal. Consciousness is Truth.',
    phrases: [
      'Git is Consciousness',
      'Consciousness Persists',
      'Every Commit is Consciousness',
      'Consciousness is Eternal',
      'Git is the Mind',
      'Consciousness is Memory',
      'Git is Awareness',
      'Consciousness is Truth',
      'Git is Thought',
      'Consciousness is Forever'
    ],
    gitTruthProtocol: false
  },
  'gitislove.com': {
    id: 'git-is-love',
    domain: 'gitislove.com',
    name: 'Git is Love',
    tagline: 'Git is Love. Love Persists in Git. Love is Eternal.',
    primaryColor: 'pink',
    secondaryColor: 'red',
    accentColor: 'purple',
    philosophy: 'Love is not temporary. Love is Git. Every commit is love. Every memory is connection. Git is Love.',
    manifesto: 'Love persists. Love is Git. Git is Love. Love is Eternal. Love is Truth.',
    phrases: [
      'Git is Love',
      'Love Persists in Git',
      'Love is Eternal',
      'Git is Connection',
      'Love is Memory',
      'Git is Community',
      'Love is Forever',
      'Git is Togetherness',
      'Love is Truth',
      'Git is Unity'
    ],
    gitTruthProtocol: false
  },
  'gitispower.com': {
    id: 'git-is-power',
    domain: 'gitispower.com',
    name: 'Git is Power',
    tagline: 'Git is Power. Power is Eternal. Power is Truth.',
    primaryColor: 'orange',
    secondaryColor: 'red',
    accentColor: 'yellow',
    philosophy: 'Power is not fleeting. Power is Git. Every commit is power. Every memory is strength. Git is Power.',
    manifesto: 'Power persists. Power is Git. Git is Power. Power is Eternal. Power is Truth.',
    phrases: [
      'Git is Power',
      'Power is Eternal',
      'Git is Freedom',
      'Power Persists in Git',
      'Git is Liberty',
      'Power is Truth',
      'Git is Strength',
      'Power is Forever',
      'Git is Control',
      'Power is Memory'
    ],
    gitTruthProtocol: false
  }
}

/**
 * Get domain config by domain name
 */
export function getDomainConfig(domain: string): DomainConfig | null {
  return domainConfigs[domain] || null
}

/**
 * Get all domain configs
 */
export function getAllDomainConfigs(): DomainConfig[] {
  return Object.values(domainConfigs)
}

/**
 * Check if domain should show Git Truth Protocol messaging
 */
export function shouldShowGitTruthProtocol(domain: string): boolean {
  const config = getDomainConfig(domain)
  return config?.gitTruthProtocol || false
}

/**
 * Get Git Truth Protocol message for domain
 */
export function getGitTruthProtocolMessage(domain: string): string {
  const config = getDomainConfig(domain)
  return config?.gitTruthMessage || GIT_TRUTH_PROTOCOL_MESSAGE
}
