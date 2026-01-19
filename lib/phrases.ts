// Phrase categories organized by domain/brand
// Each category represents a different domain in the ecosystem

export interface PhraseCategory {
  id: string
  name: string
  domain: string
  phrases: string[]
}

export const phraseCategories: PhraseCategory[] = [
  {
    id: 'git-is-life',
    name: 'Git Is Life',
    domain: 'gitislife.com',
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
    ]
  },
  {
    id: 'git-is-truth',
    name: 'Git Is Truth',
    domain: 'gittruth.com',
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
    ]
  },
  {
    id: 'legacy-git',
    name: 'Legacy Git',
    domain: 'legacygit.com',
    phrases: [
      'Memory Persists in Git',
      'Every Commit is a Memory',
      'Memory is Eternal',
      'Bring Your Ancestors Back',
      'Legacy is Forever',
      'Git is Legacy',
      'Memory is Immutable',
      'Ancestors Live in Git',
      'Legacy is Truth',
      'Git is Ancestry'
    ]
  },
  {
    id: 'git-is-consciousness',
    name: 'Git Is Consciousness',
    domain: 'gitisconsciousness.com',
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
    ]
  },
  {
    id: 'git-is-love',
    name: 'Git Is Love',
    domain: 'gitislove.com',
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
    ]
  },
  {
    id: 'git-is-power',
    name: 'Git Is Power',
    domain: 'gitispower.com',
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
    ]
  },
  {
    id: 'human-digital-immortality',
    name: 'Human Digital Immortality',
    domain: 'humandigitalimmortality.com',
    phrases: [
      'Digital Immortality',
      'Memory is Eternal',
      'Ancestors Live Forever',
      'Digital Resurrection',
      'Immortality in Git',
      'Eternal Memory',
      'Digital Legacy',
      'Immortality is Truth',
      'Forever in Git',
      'Digital Eternity'
    ]
  }
]

/**
 * Get all phrases from all categories
 */
export function getAllPhrases(): string[] {
  return phraseCategories.flatMap(category => category.phrases)
}

/**
 * Get phrases by category ID
 */
export function getPhrasesByCategory(categoryId: string): string[] {
  const category = phraseCategories.find(cat => cat.id === categoryId)
  return category?.phrases || []
}

/**
 * Get category by ID
 */
export function getCategoryById(categoryId: string): PhraseCategory | undefined {
  return phraseCategories.find(cat => cat.id === categoryId)
}
