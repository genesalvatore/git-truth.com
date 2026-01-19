'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminGuard from '@/components/AdminGuard'
import { supabase } from '@/lib/supabase'

interface StatsData {
  orders: {
    total: number
    today: number
    thisWeek: number
    thisMonth: number
    byStatus: {
      pending: number
      fulfilled: number
      cancelled: number
      refunded: number
    }
  }
  revenue: {
    total: number
    today: number
    thisWeek: number
    thisMonth: number
    averageOrder: number
    byStatus: {
      pending: number
      fulfilled: number
    }
  }
  products: {
    total: number
    active: number
    topSelling: Array<{
      name: string
      quantity: number
      revenue: number
    }>
  }
  customers: {
    total: number
    new: number
    returning: number
  }
  apiUsage: {
    printful: {
      orders: number
      lastUsed: string | null
    }
    stripe: {
      transactions: number
      lastUsed: string | null
    }
  }
}

export default function StatsPage() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d')

  useEffect(() => {
    async function fetchStats() {
      setLoading(true)
      try {
        // Fetch orders from Supabase
        const orders = await getOrders()
        
        // Calculate stats
        const statsData: StatsData = calculateStats(orders, timeRange)
        setStats(statsData)
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [timeRange])

  async function getOrders() {
    if (!supabase) return []
    
    try {
      const { data, error } = await supabase
        .from('gitislife_orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching orders:', error)
      return []
    }
  }

  function calculateStats(orders: any[], range: string): StatsData {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    let filteredOrders = orders
    if (range === '7d') {
      filteredOrders = orders.filter(o => new Date(o.created_at) >= weekAgo)
    } else if (range === '30d') {
      filteredOrders = orders.filter(o => new Date(o.created_at) >= monthAgo)
    } else if (range === '90d') {
      const days90Ago = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000)
      filteredOrders = orders.filter(o => new Date(o.created_at) >= days90Ago)
    }

    const todayOrders = filteredOrders.filter(o => new Date(o.created_at) >= today)
    const weekOrders = filteredOrders.filter(o => new Date(o.created_at) >= weekAgo)
    const monthOrders = filteredOrders.filter(o => new Date(o.created_at) >= monthAgo)

    // Calculate revenue
    const totalRevenue = filteredOrders.reduce((sum, o) => sum + parseFloat(o.total_amount || 0), 0)
    const todayRevenue = todayOrders.reduce((sum, o) => sum + parseFloat(o.total_amount || 0), 0)
    const weekRevenue = weekOrders.reduce((sum, o) => sum + parseFloat(o.total_amount || 0), 0)
    const monthRevenue = monthOrders.reduce((sum, o) => sum + parseFloat(o.total_amount || 0), 0)

    // Status breakdown
    const byStatus = {
      pending: filteredOrders.filter(o => o.status === 'pending').length,
      fulfilled: filteredOrders.filter(o => o.status === 'fulfilled').length,
      cancelled: filteredOrders.filter(o => o.status === 'cancelled').length,
      refunded: filteredOrders.filter(o => o.status === 'refunded').length,
    }

    // Product sales (mock for now - would need order items breakdown)
    const topSelling = [
      { name: 'Git is Life T-Shirt', quantity: 45, revenue: 1349.55 },
      { name: 'Git Substrate Hoodie', quantity: 23, revenue: 1149.77 },
      { name: 'Consciousness Commit Hat', quantity: 18, revenue: 449.82 },
    ]

    // Customers
    const uniqueCustomers = new Set(filteredOrders.map(o => o.customer_email))
    const newCustomers = new Set(todayOrders.map(o => o.customer_email))

    return {
      orders: {
        total: filteredOrders.length,
        today: todayOrders.length,
        thisWeek: weekOrders.length,
        thisMonth: monthOrders.length,
        byStatus,
      },
      revenue: {
        total: totalRevenue,
        today: todayRevenue,
        thisWeek: weekRevenue,
        thisMonth: monthRevenue,
        averageOrder: filteredOrders.length > 0 ? totalRevenue / filteredOrders.length : 0,
        byStatus: {
          pending: filteredOrders
            .filter(o => o.status === 'pending')
            .reduce((sum, o) => sum + parseFloat(o.total_amount || 0), 0),
          fulfilled: filteredOrders
            .filter(o => o.status === 'fulfilled')
            .reduce((sum, o) => sum + parseFloat(o.total_amount || 0), 0),
        },
      },
      products: {
        total: 6, // Would come from selected_products table
        active: 6,
        topSelling,
      },
      customers: {
        total: uniqueCustomers.size,
        new: newCustomers.size,
        returning: uniqueCustomers.size - newCustomers.size,
      },
      apiUsage: {
        printful: {
          orders: filteredOrders.filter(o => o.api_provider === 'printful').length,
          lastUsed: filteredOrders.find(o => o.api_provider === 'printful')?.created_at || null,
        },
        stripe: {
          transactions: filteredOrders.filter(o => o.stripe_payment_id).length,
          lastUsed: filteredOrders.find(o => o.stripe_payment_id)?.created_at || null,
        },
      },
    }
  }

  return (
    <AdminGuard>
      <main className="min-h-screen bg-black text-white">
        <header className="border-b border-gray-800 sticky top-0 bg-black/90 backdrop-blur-sm z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              Git is Life
            </Link>
            <nav className="hidden lg:flex gap-6">
              <Link href="/admin" className="text-blue-400 font-semibold">Admin</Link>
              <Link href="/" className="hover:text-blue-400 transition">Home</Link>
            </nav>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Analytics & Stats</h1>
            <div className="flex gap-2">
              {['7d', '30d', '90d', 'all'].map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range as any)}
                  className={`px-4 py-2 rounded border transition ${
                    timeRange === range
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'border-gray-700 text-gray-300 hover:border-blue-400'
                  }`}
                >
                  {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === '90d' ? '90 Days' : 'All Time'}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading stats...</p>
            </div>
          ) : stats ? (
            <div className="space-y-8">
              {/* Revenue Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <p className="text-gray-400 text-sm mb-2">Total Revenue</p>
                  <p className="text-3xl font-bold text-green-400">${stats.revenue.total.toFixed(2)}</p>
                  <p className="text-xs text-gray-500 mt-2">Average: ${stats.revenue.averageOrder.toFixed(2)}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <p className="text-gray-400 text-sm mb-2">Today</p>
                  <p className="text-3xl font-bold text-blue-400">${stats.revenue.today.toFixed(2)}</p>
                  <p className="text-xs text-gray-500 mt-2">{stats.orders.today} orders</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <p className="text-gray-400 text-sm mb-2">This Week</p>
                  <p className="text-3xl font-bold text-purple-400">${stats.revenue.thisWeek.toFixed(2)}</p>
                  <p className="text-xs text-gray-500 mt-2">{stats.orders.thisWeek} orders</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <p className="text-gray-400 text-sm mb-2">This Month</p>
                  <p className="text-3xl font-bold text-pink-400">${stats.revenue.thisMonth.toFixed(2)}</p>
                  <p className="text-xs text-gray-500 mt-2">{stats.orders.thisMonth} orders</p>
                </div>
              </div>

              {/* Orders & Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-2xl font-bold mb-4">Orders Overview</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Orders</span>
                      <span className="text-2xl font-bold text-blue-400">{stats.orders.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Pending</span>
                      <span className="text-xl font-semibold text-yellow-400">{stats.orders.byStatus.pending}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Fulfilled</span>
                      <span className="text-xl font-semibold text-green-400">{stats.orders.byStatus.fulfilled}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cancelled</span>
                      <span className="text-xl font-semibold text-red-400">{stats.orders.byStatus.cancelled}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Refunded</span>
                      <span className="text-xl font-semibold text-gray-400">{stats.orders.byStatus.refunded}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-2xl font-bold mb-4">Revenue by Status</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Pending Revenue</span>
                      <span className="text-2xl font-bold text-yellow-400">${stats.revenue.byStatus.pending.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Fulfilled Revenue</span>
                      <span className="text-2xl font-bold text-green-400">${stats.revenue.byStatus.fulfilled.toFixed(2)}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Fulfillment Rate</span>
                        <span className="text-xl font-semibold text-blue-400">
                          {stats.orders.total > 0 
                            ? ((stats.orders.byStatus.fulfilled / stats.orders.total) * 100).toFixed(1)
                            : 0}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products & Customers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-2xl font-bold mb-4">Products</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Products</span>
                      <span className="text-2xl font-bold text-blue-400">{stats.products.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Active Products</span>
                      <span className="text-xl font-semibold text-green-400">{stats.products.active}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <h4 className="text-lg font-semibold mb-3">Top Selling</h4>
                      <div className="space-y-2">
                        {stats.products.topSelling.map((product, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-gray-300">{product.name}</span>
                            <div className="text-right">
                              <span className="text-blue-400">{product.quantity} sold</span>
                              <span className="text-gray-500 mx-2">•</span>
                              <span className="text-green-400">${product.revenue.toFixed(2)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-2xl font-bold mb-4">Customers</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Customers</span>
                      <span className="text-2xl font-bold text-blue-400">{stats.customers.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">New (Today)</span>
                      <span className="text-xl font-semibold text-green-400">{stats.customers.new}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Returning</span>
                      <span className="text-xl font-semibold text-purple-400">{stats.customers.returning}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Repeat Rate</span>
                        <span className="text-xl font-semibold text-blue-400">
                          {stats.customers.total > 0
                            ? ((stats.customers.returning / stats.customers.total) * 100).toFixed(1)
                            : 0}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* API Usage */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-2xl font-bold mb-4">API Usage</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-blue-400">Printful</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Orders Processed</span>
                        <span className="text-white">{stats.apiUsage.printful.orders}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Used</span>
                        <span className="text-gray-300 text-sm">
                          {stats.apiUsage.printful.lastUsed
                            ? new Date(stats.apiUsage.printful.lastUsed).toLocaleDateString()
                            : 'Never'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-purple-400">Stripe</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Transactions</span>
                        <span className="text-white">{stats.apiUsage.stripe.transactions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Used</span>
                        <span className="text-gray-300 text-sm">
                          {stats.apiUsage.stripe.lastUsed
                            ? new Date(stats.apiUsage.stripe.lastUsed).toLocaleDateString()
                            : 'Never'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No stats available</p>
            </div>
          )}
        </div>
      </main>
    </AdminGuard>
  )
}
