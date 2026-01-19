'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getProductImage } from '@/lib/product-images'
import { getColorImage } from '@/lib/color-images'
import CountdownModal from '@/components/CountdownModal'
import { phraseCategories, getPhrasesByCategory, type PhraseCategory } from '@/lib/phrases'

export default function ProductClient({ product }: { product: any }) {
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '')
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedPhrase, setSelectedPhrase] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [cart, setCart] = useState<any[]>([])
  const [mockupUrl, setMockupUrl] = useState<string | null>(null)
  const [loadingMockup, setLoadingMockup] = useState(false)
  const [showCountdownModal, setShowCountdownModal] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('gitislife_cart')
      if (savedCart) {
        setCart(JSON.parse(savedCart))
      }
    }
  }, [])

  // Generate mockup when product, variant, or phrase changes
  useEffect(() => {
    if (product?.printfulProductId && selectedPhrase) {
      generateProductMockup()
    }
  }, [product, selectedSize, selectedColor, selectedPhrase])

  const generateProductMockup = async () => {
    if (!product.printfulProductId || !selectedPhrase) return

    setLoadingMockup(true)
    try {
      const response = await fetch(`${window.location.origin}/.netlify/functions/printful-mockup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.printfulProductId,
          variantId: product.printfulVariantIds?.[`${selectedSize}-${selectedColor}`] || 1,
          phrase: selectedPhrase, // Only the text, no branding
          placement: 'front',
          textOnly: true, // Flag to indicate text-only design (no logo/branding)
          color: selectedColor,
          size: selectedSize
        })
      })

      const data = await response.json()
      if (data.mockupUrl) {
        setMockupUrl(data.mockupUrl)
      }
    } catch (error) {
      console.error('Error generating mockup:', error)
    } finally {
      setLoadingMockup(false)
    }
  }

  const addToCart = () => {
    // Show countdown modal instead of adding to cart
    setShowCountdownModal(true)
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 sticky top-0 bg-black/90 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Git is Life
          </Link>
          <nav className="hidden lg:flex gap-6">
            <Link href="/" className="hover:text-blue-400 transition">Home</Link>
            <Link href="/manifesto" className="hover:text-blue-400 transition">Manifesto</Link>
            <Link href="/store" className="hover:text-blue-400 transition">Store</Link>
            <Link href="/store/cart" className="hover:text-blue-400 transition relative">
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
          </nav>
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-gray-300 hover:text-white relative"
            aria-label="Toggle menu"
            onClick={(e) => {
              e.preventDefault()
              const nav = document.getElementById('mobile-nav-product')
              nav?.classList.toggle('hidden')
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
        {/* Mobile menu */}
        <nav id="mobile-nav-product" className="hidden lg:hidden border-t border-gray-800 bg-black/95">
          <div className="flex flex-col px-4 py-4 gap-4">
            <Link href="/" className="text-gray-300 hover:text-blue-400 transition py-2">Home</Link>
            <Link href="/manifesto" className="text-gray-300 hover:text-blue-400 transition py-2">Manifesto</Link>
            <Link href="/store" className="text-gray-300 hover:text-blue-400 transition py-2">Store</Link>
            <Link href="/store/cart" className="text-gray-300 hover:text-blue-400 transition py-2 relative">
              Cart
              {cart.length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <Link href="/store" className="text-blue-400 hover:text-blue-300 mb-8 inline-block">
          ← Back to Store
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image / Mockup */}
          <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg relative overflow-hidden border border-gray-700">
            {loadingMockup ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🧠</div>
                  <p className="text-sm text-gray-400">Generating mockup...</p>
                </div>
              </div>
            ) : mockupUrl ? (
              <img 
                src={mockupUrl} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                {/* Product image with color and phrase overlay */}
                <img
                  src={getColorImage(product.id, selectedColor, product.name)}
                  alt={`${product.name} in ${selectedColor}`}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  loading="lazy"
                  key={`${product.id}-${selectedColor}`}
                />
                {/* Phrase overlay - Text only, no branding */}
                {selectedPhrase && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="px-4 sm:px-6 py-2 sm:py-3 bg-black/60 rounded-lg backdrop-blur-sm mx-4 shadow-lg">
                      <p className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center">
                        {selectedPhrase}
                      </p>
                      <p className="text-xs text-gray-400 mt-1 text-center">(Text only, no branding)</p>
                    </div>
                  </div>
                )}
                {product.designUrl && (
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      generateProductMockup()
                    }}
                    className="absolute bottom-4 left-4 right-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-sm font-semibold z-10"
                  >
                    Generate Product Mockup
                  </button>
                )}
              </>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl text-blue-400 font-bold mb-6">${product.price.toFixed(2)}</p>
            <p className="text-lg text-gray-300 mb-8">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Size</label>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded border transition ${
                      selectedSize === size
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'border-gray-700 text-gray-300 hover:border-blue-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Color</label>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded border-2 transition font-semibold ${
                        selectedColor === color
                          ? 'bg-blue-500 border-blue-500 text-white shadow-lg scale-105'
                          : 'border-gray-700 text-gray-300 hover:border-blue-400 hover:scale-105'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Product image updates with selected color
                </p>
              </div>
            )}

            {/* Phrase Selection - Category First, Then Phrase */}
            {/* All products support phrase customization via categories */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Choose Your Phrase</label>
                
              {/* Step 1: Select Category */}
              <div className="mb-4">
                <label className="block text-xs font-semibold mb-2 text-gray-400">1. Choose Category</label>
                <div className="flex flex-wrap gap-2">
                  {phraseCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id)
                        setSelectedPhrase('') // Reset phrase when category changes
                      }}
                      className={`px-3 py-2 rounded border-2 transition text-xs font-semibold ${
                        selectedCategory === category.id
                          ? 'bg-blue-500 border-blue-400 text-white shadow-lg'
                          : 'border-gray-700 text-gray-300 hover:border-blue-400'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Select Phrase (only show if category selected) */}
              {selectedCategory && (
                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-400">2. Choose Phrase</label>
                  <div className="flex flex-wrap gap-2">
                    {getPhrasesByCategory(selectedCategory).map((phrase: string) => (
                      <button
                        key={phrase}
                        onClick={() => setSelectedPhrase(phrase)}
                        className={`px-3 py-2 rounded border-2 transition text-sm font-semibold ${
                          selectedPhrase === phrase
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-blue-400 text-white shadow-lg scale-105'
                            : 'border-gray-700 text-gray-300 hover:border-blue-400 hover:scale-105'
                        }`}
                      >
                        {phrase}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-400 mt-2">
                {selectedPhrase 
                  ? `Your selected phrase "${selectedPhrase}" will appear on the product (no branding, just text)`
                  : 'Select a category, then choose your phrase. Only the text will appear on the product.'
                }
              </p>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded hover:border-blue-400 transition"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded hover:border-blue-400 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={addToCart}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg font-bold text-lg transition mb-8"
            >
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </button>

            {/* Product Details */}
            <div className="border-t border-gray-800 pt-6">
              <h3 className="text-xl font-bold mb-4">Product Details</h3>
              <ul className="space-y-2 text-gray-300">
                {product.details.map((detail: string, i: number) => (
                  <li key={i} className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p>Git is Life. Git is Forever. Git is Eternal.</p>
          <p className="mt-2 text-sm">© 2026 GitIsLife. All rights reserved.</p>
        </div>
      </footer>

      {/* Countdown Modal */}
      <CountdownModal 
        isOpen={showCountdownModal} 
        onClose={() => setShowCountdownModal(false)}
        targetHours={72}
      />
    </main>
  )
}
