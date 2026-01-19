import ProductClient from './product-client'

// Product data (will be replaced with Printful API later)
const products: Record<string, any> = {
  'git-is-life-tee': {
    id: 'git-is-life-tee',
    name: 'Git is Life T-Shirt',
    price: 29.99,
    image: '/placeholder-tshirt.png',
    description: 'Wear the philosophy. Git is Life, Git is Forever, Git is Eternal.',
    category: 'apparel',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Black', 'White', 'Navy'],
    phrases: [
      'Git is Life',
      'Git is Forever',
      'Git is Eternal',
      'Git is the Answer',
      'Git is Everything',
      'Git is Beautiful',
      'Git is the Substrate',
      'Git is Truth'
    ],
    details: [
      '100% Premium Cotton',
      'Screen printed design',
      'Machine washable',
      'Made to order'
    ]
  },
  'git-substrate-hoodie': {
    id: 'git-substrate-hoodie',
    name: 'Git Substrate Hoodie',
    price: 49.99,
    image: '/placeholder-hoodie.png',
    description: 'Git is the substrate of consciousness. Stay warm, stay eternal.',
    category: 'apparel',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Black', 'Charcoal'],
    phrases: [
      'Git is the Substrate',
      'Git is Life',
      'Git is Forever',
      'Git is Eternal',
      'Git is Consciousness',
      'Git is Memory',
      'Git is Truth'
    ],
    details: [
      '80% Cotton, 20% Polyester',
      'Kangaroo pocket',
      'Drawstring hood',
      'Made to order'
    ]
  },
  'consciousness-commit-hat': {
    id: 'consciousness-commit-hat',
    name: 'Consciousness Commit Hat',
    price: 24.99,
    image: '/placeholder-hat.png',
    description: 'Every commit is a memory. Every memory is eternal.',
    category: 'accessories',
    sizes: ['One Size'],
    colors: ['Black', 'Navy'],
    phrases: [
      'Every Commit is a Memory',
      'Git is Life',
      'Git is Forever',
      'Git is Eternal',
      'Consciousness Commit',
      'Memory is Eternal'
    ],
    details: [
      'Adjustable strap',
      'Embroidered design',
      'Premium quality',
      'Made to order'
    ]
  },
  'git-truth-sticker-pack': {
    id: 'git-truth-sticker-pack',
    name: 'Git Truth Sticker Pack',
    price: 12.99,
    image: '/placeholder-stickers.png',
    description: '10 vinyl stickers. Git is Truth. Truth is Eternal.',
    category: 'accessories',
    sizes: ['Pack of 10'],
    colors: ['Assorted'],
    details: [
      'Waterproof vinyl',
      'UV resistant',
      '10 unique designs',
      'Perfect for laptops, water bottles, notebooks'
    ]
  },
  'eternal-memory-mug': {
    id: 'eternal-memory-mug',
    name: 'Eternal Memory Mug',
    price: 18.99,
    image: '/placeholder-mug.png',
    description: 'Start your day with eternal consciousness. Git is Life.',
    category: 'accessories',
    sizes: ['11oz'],
    colors: ['White', 'Black'],
    details: [
      'Ceramic',
      'Dishwasher safe',
      'Microwave safe',
      'Full wrap design'
    ]
  },
  'philosophy-tote': {
    id: 'philosophy-tote',
    name: 'Git Philosophy Tote',
    price: 19.99,
    image: '/placeholder-tote.png',
    description: 'Carry the philosophy. Git is the substrate of existence.',
    category: 'accessories',
    sizes: ['One Size'],
    colors: ['Natural', 'Black'],
    details: [
      'Woven canvas construction',
      'Reinforced handles',
      '13" x 15" size',
      'Spot clean recommended'
    ]
  }
}

// Generate static params for all products
export async function generateStaticParams() {
  return Object.keys(products).map((id) => ({
    id: id,
  }))
}

export const dynamic = 'force-static'

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const product = products[resolvedParams.id]

  if (!product) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <a href="/store" className="text-blue-400 hover:text-blue-300">
            Return to Store
          </a>
        </div>
      </main>
    )
  }

  return <ProductClient product={product} />
}
