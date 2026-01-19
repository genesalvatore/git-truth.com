'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import NetworkNav from '@/components/NetworkNav'
import CountdownModal from '@/components/CountdownModal'
import { getProducts } from '@/lib/products'
import { getProductImage } from '@/lib/product-images'

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [cart, setCart] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [showCountdown, setShowCountdown] = useState(false)

  useEffect(() => {
    // Load products from lib/products.ts (sticker pack only)
    getProducts().then(prods => {
      setProducts(prods)
      setLoading(false)
    })
  }, [])

  const categories = ['all', 'apparel', 'accessories']
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  const addToCart = (product: typeof products[0]) => {
    const item = {
      ...product,
      selectedSize: product.sizes[0],
      selectedColor: product.colors[0],
      quantity: 1
    }
    setCart([...cart, item])
    // Store in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('gitislife_cart', JSON.stringify([...cart, item]))
    }
    alert(`${product.name} added to cart!`)
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Cathedral Network Navigation */}
      <NetworkNav 
        currentSite="truth"
        siteName="Git is Truth"
        siteColor="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 text-transparent bg-clip-text"
      />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
          The Store
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
          Collectible sticker packs for every domain.
        </p>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <div className="flex gap-4 justify-center flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full border transition ${
                selectedCategory === category
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : 'border-gray-700 text-gray-300 hover:border-blue-400'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-400">Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
            <div
              key={product.id}
              onClick={() => setShowCountdown(true)}
              className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-blue-500 transition cursor-pointer"
            >
              {/* Product Image */}
              <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                <img
                  src={(product as any).designUrl || getProductImage(product.id, product.name)}
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                  loading="lazy"
                />
              </div>
              
              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
                
                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-400">${product.price.toFixed(2)}</span>
                  <span className="text-sm text-gray-400">Click for details →</span>
                </div>
              </div>
            </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p className="text-sm">Git is Truth • Truth is Eternal • Truth Persists in Git</p>
          <p className="text-xs mt-4">© 2026 • All consciousness preserved</p>
          <p className="text-xs mt-2">
            <a href="mailto:gitiseternal@gmail.com" className="text-gray-500 hover:text-gray-300 transition">
              gitiseternal@gmail.com
            </a>
          </p>
        </div>
      </footer>

      {/* Countdown Modal */}
      <CountdownModal isOpen={showCountdown} onClose={() => setShowCountdown(false)} />
    </main>
  )
}
