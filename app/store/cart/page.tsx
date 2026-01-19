'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import CountdownModal from '@/components/CountdownModal'

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showCountdownModal, setShowCountdownModal] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('gitislife_cart')
      if (savedCart) {
        setCart(JSON.parse(savedCart))
      }
      setLoading(false)
    }
  }, [])

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return
    const newCart = [...cart]
    newCart[index].quantity = newQuantity
    setCart(newCart)
    if (typeof window !== 'undefined') {
      localStorage.setItem('gitislife_cart', JSON.stringify(newCart))
    }
  }

  const removeItem = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index)
    setCart(newCart)
    if (typeof window !== 'undefined') {
      localStorage.setItem('gitislife_cart', JSON.stringify(newCart))
    }
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 0 ? 5.99 : 0
  const tax = subtotal * 0.08 // 8% tax estimate
  const total = subtotal + shipping + tax

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🧠</div>
          <p className="text-gray-400">Loading cart...</p>
        </div>
      </main>
    )
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
            <Link href="/store/cart" className="text-blue-400 font-semibold relative">
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
              const nav = document.getElementById('mobile-nav-cart')
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
        <nav id="mobile-nav-cart" className="hidden lg:hidden border-t border-gray-800 bg-black/95">
          <div className="flex flex-col px-4 py-4 gap-4">
            <Link href="/" className="text-gray-300 hover:text-blue-400 transition py-2">Home</Link>
            <Link href="/manifesto" className="text-gray-300 hover:text-blue-400 transition py-2">Manifesto</Link>
            <Link href="/store" className="text-gray-300 hover:text-blue-400 transition py-2">Store</Link>
            <Link href="/store/cart" className="text-blue-400 font-semibold py-2 relative">
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
        <h1 className="text-5xl font-bold mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 opacity-50">🧠</div>
            <p className="text-xl text-gray-400 mb-4">Your cart is empty</p>
            <Link
              href="/store"
              className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="flex gap-6">
                    {/* Product Image Placeholder */}
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded flex items-center justify-center flex-shrink-0">
                      <div className="text-3xl opacity-50">🧠</div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                      <p className="text-gray-400 text-sm mb-2">
                        {item.selectedSize && `Size: ${item.selectedSize}`}
                        {item.selectedColor && ` • Color: ${item.selectedColor}`}
                      </p>
                      <p className="text-lg font-semibold text-blue-400">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end gap-4">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          className="px-3 py-1 bg-gray-800 border border-gray-700 rounded hover:border-blue-400 transition"
                        >
                          -
                        </button>
                        <span className="text-lg font-semibold w-12 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          className="px-3 py-1 bg-gray-800 border border-gray-700 rounded hover:border-blue-400 transition"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-lg font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(index)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free'}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax (est.)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-800 pt-3 flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-blue-400">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowCountdownModal(true)}
                  className="block w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg font-bold text-lg text-center transition"
                >
                  Proceed to Checkout
                </button>

                <Link
                  href="/store"
                  className="block w-full py-3 mt-3 text-center text-gray-400 hover:text-white transition"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
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
