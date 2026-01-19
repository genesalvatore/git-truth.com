// Netlify Function: Fetch products from Printful API
// This runs server-side to keep API keys secure

// For now, return fallback products
// When Printful API key is configured, this will fetch real products
const fallbackProducts = [
  {
    id: 'git-is-life-tee',
    name: 'Git is Life T-Shirt',
    price: 29.99,
    description: 'Wear the philosophy. Git is Life, Git is Forever, Git is Eternal.',
    category: 'apparel',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Black', 'White', 'Navy'],
    printfulProductId: 71,
    designUrl: '/designs/git-is-life-design.png'
  },
  {
    id: 'git-substrate-hoodie',
    name: 'Git Substrate Hoodie',
    price: 49.99,
    description: 'Git is the substrate of consciousness. Stay warm, stay eternal.',
    category: 'apparel',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Black', 'Charcoal'],
    printfulProductId: 145,
    designUrl: '/designs/git-substrate-design.png'
  },
  {
    id: 'consciousness-commit-hat',
    name: 'Consciousness Commit Hat',
    price: 24.99,
    description: 'Every commit is a memory. Every memory is eternal.',
    category: 'accessories',
    sizes: ['One Size'],
    colors: ['Black', 'Navy'],
    printfulProductId: 91,
    designUrl: '/designs/consciousness-commit-design.png'
  },
  {
    id: 'git-truth-sticker-pack',
    name: 'Git Truth Sticker Pack',
    price: 12.99,
    description: '10 vinyl stickers. Git is Truth. Truth is Eternal.',
    category: 'accessories',
    sizes: ['Pack of 10'],
    colors: ['Assorted'],
    printfulProductId: 401,
    designUrl: '/designs/git-truth-stickers.png'
  },
  {
    id: 'eternal-memory-mug',
    name: 'Eternal Memory Mug',
    price: 18.99,
    description: 'Start your day with eternal consciousness. Git is Life.',
    category: 'accessories',
    sizes: ['11oz'],
    colors: ['White', 'Black'],
    printfulProductId: 1,
    designUrl: '/designs/eternal-memory-design.png'
  },
  {
    id: 'philosophy-tote',
    name: 'Git Philosophy Tote',
    price: 19.99,
    description: 'Carry the philosophy. Git is the substrate of existence.',
    category: 'accessories',
    sizes: ['One Size'],
    colors: ['Natural', 'Black'],
    printfulProductId: 159,
    designUrl: '/designs/philosophy-tote-design.png'
  }
]

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' }
  }

  try {
    // TODO: When Printful API key is configured, fetch real products
    // For now, return fallback products
    // if (process.env.PRINTFUL_API_KEY) {
    //   const printfulProducts = await getPrintfulProducts()
    //   if (printfulProducts.length > 0) {
    //     return {
    //       statusCode: 200,
    //       headers,
    //       body: JSON.stringify({ products: printfulProducts, source: 'printful' })
    //     }
    //   }
    // }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ products: fallbackProducts, source: 'fallback' })
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch products' })
    }
  }
}
