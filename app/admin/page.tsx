'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminGuard from '@/components/AdminGuard'
import { supabase } from '@/lib/supabase'

// API Integration Info
const apiIntegrations = [
  {
    id: 'printful',
    name: 'Printful',
    status: process.env.NEXT_PUBLIC_PRINTFUL_API_KEY ? 'configured' : 'not_configured',
    description: 'Print-on-demand fulfillment and product catalog',
    vendorUrl: 'https://www.printful.com/dashboard',
    apiDocsUrl: 'https://developers.printful.com',
    setupSteps: [
      '1. Sign up at printful.com',
      '2. Go to Dashboard → API → Generate API Key',
      '3. Add PRINTFUL_API_KEY to Netlify environment variables',
      '4. Redeploy site'
    ],
    features: [
      'Product catalog',
      'Mockup generation',
      'Order fulfillment',
      'Shipping rates',
      'Webhook support'
    ],
    paymentModel: 'Pass-through (pay when order placed)'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    status: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ? 'configured' : 'not_configured',
    description: 'Payment processing for customer checkout',
    vendorUrl: 'https://dashboard.stripe.com',
    apiDocsUrl: 'https://stripe.com/docs/api',
    setupSteps: [
      '1. Sign up at stripe.com',
      '2. Get API keys from Dashboard → Developers → API keys',
      '3. Add STRIPE_PUBLIC_KEY and STRIPE_SECRET_KEY to Netlify',
      '4. Configure webhook endpoint for order confirmations',
      '5. Redeploy site'
    ],
    features: [
      'Secure payment processing',
      'Multiple payment methods',
      'Webhook notifications',
      'Refund management',
      'Subscription support'
    ],
    paymentModel: 'Transaction fees (2.9% + $0.30 per transaction)'
  },
  {
    id: 'printify',
    name: 'Printify',
    status: 'not_configured',
    description: 'Alternative print-on-demand with larger catalog (850+ products)',
    vendorUrl: 'https://printify.com/app',
    apiDocsUrl: 'https://developers.printify.com',
    setupSteps: [
      '1. Sign up at printify.com',
      '2. Go to Settings → API → Generate OAuth credentials',
      '3. Add PRINTIFY_CLIENT_ID and PRINTIFY_CLIENT_SECRET to Netlify',
      '4. Redeploy site'
    ],
    features: [
      '850+ products (largest catalog)',
      'Multiple print providers',
      'Lower base costs',
      'OAuth 2.0 authentication',
      'Multi-merchant support'
    ],
    paymentModel: 'Pass-through (pay when order placed)'
  }
]

// Mock order data (will be replaced with real data from API/database)
const mockOrders = [
  {
    id: 'ORD-001',
    date: '2026-01-16',
    customer: 'customer@example.com',
    items: [
      { product: 'Git is Life T-Shirt', quantity: 1, price: 29.99, phrase: 'Git is Forever' }
    ],
    total: 35.98,
    status: 'pending',
    apiProvider: 'printful',
    printfulOrderId: null,
    shippingAddress: '123 Main St, City, State 12345'
  }
]

export default function AdminPage() {
  const [orders, setOrders] = useState(mockOrders)
  const [selectedTab, setSelectedTab] = useState<'overview' | 'orders' | 'integrations'>('overview')

  // Calculate stats
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const pendingOrders = orders.filter(o => o.status === 'pending').length
  const fulfilledOrders = orders.filter(o => o.status === 'fulfilled').length

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut()
      localStorage.removeItem('admin_authenticated')
      window.location.href = '/admin/login'
    }
  }

  return (
    <AdminGuard>
      <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 sticky top-0 bg-black/90 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Git is Life
          </Link>
          <nav className="hidden lg:flex gap-6">
            <Link href="/" className="hover:text-blue-400 transition">Home</Link>
            <Link href="/store" className="hover:text-blue-400 transition">Store</Link>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-400 transition text-sm"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-800">
          <button
            onClick={() => setSelectedTab('overview')}
            className={`px-4 py-2 font-semibold border-b-2 transition ${
              selectedTab === 'overview'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setSelectedTab('orders')}
            className={`px-4 py-2 font-semibold border-b-2 transition ${
              selectedTab === 'orders'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setSelectedTab('integrations')}
            className={`px-4 py-2 font-semibold border-b-2 transition ${
              selectedTab === 'integrations'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            API Integrations
          </button>
          <Link
            href="/admin/stats"
            className="px-4 py-2 font-semibold border-b-2 border-transparent text-gray-400 hover:text-white transition"
          >
            Analytics →
          </Link>
        </div>

        {/* Catalog Link */}
        <div className="mb-6">
          <Link
            href="/admin/catalog"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-sm font-semibold"
          >
            📦 Manage Product Catalog →
          </Link>
        </div>

        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <p className="text-gray-400 text-sm mb-2">Total Orders</p>
                <p className="text-3xl font-bold text-blue-400">{totalOrders}</p>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <p className="text-gray-400 text-sm mb-2">Total Revenue</p>
                <p className="text-3xl font-bold text-green-400">${totalRevenue.toFixed(2)}</p>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <p className="text-gray-400 text-sm mb-2">Pending</p>
                <p className="text-3xl font-bold text-yellow-400">{pendingOrders}</p>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <p className="text-gray-400 text-sm mb-2">Fulfilled</p>
                <p className="text-3xl font-bold text-purple-400">{fulfilledOrders}</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
              {orders.length === 0 ? (
                <p className="text-gray-400">No orders yet</p>
              ) : (
                <div className="space-y-4">
                  {orders.slice(0, 5).map(order => (
                    <div key={order.id} className="border-b border-gray-800 pb-4 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{order.id}</p>
                          <p className="text-sm text-gray-400">{order.customer}</p>
                          <p className="text-sm text-gray-400">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-400">${order.total.toFixed(2)}</p>
                          <p className={`text-sm ${
                            order.status === 'fulfilled' ? 'text-green-400' :
                            order.status === 'pending' ? 'text-yellow-400' : 'text-gray-400'
                          }`}>
                            {order.status}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{order.apiProvider}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {selectedTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-gray-900 rounded-lg p-12 text-center border border-gray-800">
                <p className="text-gray-400 text-lg">No orders yet</p>
                <p className="text-gray-500 text-sm mt-2">Orders will appear here once customers start purchasing</p>
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{order.id}</h3>
                      <p className="text-sm text-gray-400">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-400">${order.total.toFixed(2)}</p>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'fulfilled' ? 'bg-green-500/20 text-green-400' :
                        order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {order.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-400 mb-2">Customer</p>
                      <p>{order.customer}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-400 mb-2">Shipping Address</p>
                      <p className="text-sm">{order.shippingAddress}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-400 mb-2">Items</p>
                    <div className="space-y-2">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span>
                            {item.quantity}x {item.product}
                            {item.phrase && <span className="text-gray-500 ml-2">({item.phrase})</span>}
                          </span>
                          <span className="text-gray-400">${item.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-800 pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-semibold text-gray-400 mb-1">API Provider</p>
                        <p className="text-sm font-semibold text-blue-400 uppercase">{order.apiProvider}</p>
                        {order.printfulOrderId && (
                          <p className="text-xs text-gray-500 mt-1">Printful Order: {order.printfulOrderId}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400 mb-1">Actions</p>
                        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-sm font-semibold">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Integrations Tab */}
        {selectedTab === 'integrations' && (
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-bold mb-4">API Integration Status</h2>
              <p className="text-gray-400 mb-6">
                Configure these APIs to enable full ecommerce functionality. All integrations use pass-through payment models.
              </p>
            </div>

            {apiIntegrations.map(api => (
              <div key={api.id} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold">{api.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        api.status === 'configured' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {api.status === 'configured' ? 'CONFIGURED' : 'NOT CONFIGURED'}
                      </span>
                    </div>
                    <p className="text-gray-400">{api.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={api.vendorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-sm font-semibold"
                    >
                      Dashboard →
                    </a>
                    <a
                      href={api.apiDocsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm font-semibold"
                    >
                      API Docs →
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-400 mb-2">Payment Model</p>
                    <p className="text-sm">{api.paymentModel}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-400 mb-2">Features</p>
                    <ul className="text-sm space-y-1">
                      {api.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-4">
                  <p className="text-sm font-semibold text-gray-400 mb-2">Setup Steps</p>
                  <ol className="text-sm space-y-1">
                    {api.setupSteps.map((step, i) => (
                      <li key={i} className="text-gray-300">{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
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
    </main>
    </AdminGuard>
  )
}
