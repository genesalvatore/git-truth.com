'use client'

import { useState } from 'react'
import Link from 'next/link'
import AdminGuard from '@/components/AdminGuard'

// This will be replaced with real order data from API/database
const orders = [
  {
    id: 'ORD-001',
    date: '2026-01-16 14:30:00',
    customer: {
      email: 'customer@example.com',
      name: 'John Doe'
    },
    items: [
      { 
        product: 'Git is Life T-Shirt', 
        quantity: 1, 
        price: 29.99, 
        size: 'M',
        color: 'Black',
        phrase: 'Git is Forever'
      }
    ],
    subtotal: 29.99,
    shipping: 5.99,
    tax: 2.88,
    total: 38.86,
    status: 'pending',
    apiProvider: 'printful',
    printfulOrderId: null,
    stripePaymentId: null,
    shippingAddress: {
      name: 'John Doe',
      address1: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102',
      country: 'US'
    }
  }
]

export default function OrdersPage() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'fulfilled' | 'cancelled'>('all')
  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter)

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
            <Link href="/admin" className="text-blue-400 font-semibold">Admin</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Orders</h1>
          <div className="flex gap-2">
            {['all', 'pending', 'fulfilled', 'cancelled'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-4 py-2 rounded border transition ${
                  filter === status
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'border-gray-700 text-gray-300 hover:border-blue-400'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="bg-gray-900 rounded-lg p-12 text-center border border-gray-800">
            <p className="text-gray-400 text-lg">No orders found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <div key={order.id} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{order.id}</h3>
                    <p className="text-sm text-gray-400">{order.date}</p>
                    <p className="text-sm text-gray-400">{order.customer.email}</p>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-400 mb-2">Items</p>
                    <div className="space-y-1">
                      {order.items.map((item, i) => (
                        <div key={i} className="text-sm">
                          <p>{item.quantity}x {item.product}</p>
                          <p className="text-gray-500 text-xs">
                            {item.size} • {item.color}
                            {item.phrase && ` • "${item.phrase}"`}
                          </p>
                          <p className="text-gray-400">${item.price.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-400 mb-2">Shipping</p>
                    <p className="text-sm">{order.shippingAddress.name}</p>
                    <p className="text-sm text-gray-400">{order.shippingAddress.address1}</p>
                    <p className="text-sm text-gray-400">
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-400 mb-2">Payment Breakdown</p>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${order.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>${order.shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax:</span>
                        <span>${order.tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold border-t border-gray-800 pt-1 mt-1">
                        <span>Total:</span>
                        <span className="text-green-400">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold text-gray-400 mb-2">API Integration</p>
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-sm font-semibold text-blue-400 uppercase">{order.apiProvider}</p>
                          {order.printfulOrderId && (
                            <p className="text-xs text-gray-500 mt-1">Order ID: {order.printfulOrderId}</p>
                          )}
                        </div>
                        {order.stripePaymentId && (
                          <div>
                            <p className="text-sm font-semibold text-purple-400">Stripe</p>
                            <p className="text-xs text-gray-500 mt-1">Payment: {order.stripePaymentId}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-sm font-semibold">
                        View in {order.apiProvider === 'printful' ? 'Printful' : 'Dashboard'}
                      </button>
                      <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm font-semibold">
                        Export
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
    </AdminGuard>
  )
}
