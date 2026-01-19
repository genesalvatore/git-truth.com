'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import CountdownModal from '@/components/CountdownModal'

export default function CheckoutPage() {
  const [cart, setCart] = useState<any[]>([])
  const [showCountdownModal, setShowCountdownModal] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US'
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('gitislife_cart')
      if (savedCart) {
        setCart(JSON.parse(savedCart))
      }
    }
  }, [])

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 0 ? 5.99 : 0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Show countdown modal instead of processing order
    setShowCountdownModal(true)
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🧠</div>
          <p className="text-xl text-gray-400 mb-4">Your cart is empty</p>
          <Link
            href="/store"
            className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition"
          >
            Continue Shopping
          </Link>
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
              const nav = document.getElementById('mobile-nav-checkout')
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
        <nav id="mobile-nav-checkout" className="hidden lg:hidden border-t border-gray-800 bg-black/95">
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
        <h1 className="text-5xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:border-blue-500 focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">First Name</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Last Name</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:border-blue-500 focus:outline-none"
                    placeholder="123 Main St"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold mb-2">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">State</label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:border-blue-500 focus:outline-none"
                      placeholder="CA"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">ZIP</label>
                    <input
                      type="text"
                      required
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:border-blue-500 focus:outline-none"
                      placeholder="12345"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Country</label>
                  <div className="flex flex-wrap gap-2">
                    {['US', 'CA', 'UK'].map((country) => (
                      <button
                        key={country}
                        type="button"
                        onClick={() => setFormData({ ...formData, country })}
                        className={`px-4 py-2 rounded border transition ${
                          formData.country === country
                            ? 'bg-blue-500 border-blue-500 text-white'
                            : 'border-gray-700 text-gray-300 hover:border-blue-400'
                        }`}
                      >
                        {country === 'US' ? 'United States' : country === 'CA' ? 'Canada' : 'United Kingdom'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Payment Method - Placeholder */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
                <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4 text-center">
                  <p className="text-blue-400 font-semibold">Stripe Integration Coming Soon</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Secure payment processing will be enabled when we integrate Stripe Checkout
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg font-bold text-lg transition"
              >
                Complete Order - ${total.toFixed(2)}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm text-gray-300">
                    <span>{item.quantity}x {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-800 pt-3 space-y-3 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
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
