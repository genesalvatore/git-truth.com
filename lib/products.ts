// Product data for Git is Life store
// Sticker packs - collectible series

export interface StoreProduct {
  id: string
  name: string
  price: number
  description: string
  category: 'stickers'
  sizes: string[]
  colors: string[]
  details: string[]
  printfulProductId?: number
  designUrl?: string
  comingSoon?: boolean
}

export const fallbackProducts: StoreProduct[] = [
  {
    id: 'gitislife-sticker-pack',
    name: 'Git is Life Sticker Pack',
    price: 12.99,
    description: 'Premium vinyl sticker pack featuring the Git is Life logo in multiple sizes. Waterproof, UV resistant. Perfect for laptops, helmets, water bottles, lockers. Collectible series - collect all domains!',
    category: 'stickers',
    sizes: ['Pack of 10'],
    colors: ['Full Color'],
    details: [
      'Waterproof vinyl',
      'UV resistant',
      'Multiple sizes included (1", 2", 3")',
      'Durable adhesive',
      'Collectible series - collect all domains!'
    ],
    printfulProductId: 401,
    designUrl: '/git-islife-stickers.webp', // Scattered sticker pack image
    comingSoon: false
  }
]

export async function getProducts(): Promise<StoreProduct[]> {
  return fallbackProducts
}

export async function getProductById(id: string): Promise<StoreProduct | null> {
  const products = await getProducts()
  return products.find(p => p.id === id) || null
}
