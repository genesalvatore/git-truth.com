'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminGuard from '@/components/AdminGuard'

interface CatalogProduct {
  id: number
  name: string
  type: string
  brand: string
  model: string
  image: string
  variant_count: number
  currency: string
  is_discontinued: boolean
  avg_fulfillment_time: number
}

export default function CatalogPage() {
  const [products, setProducts] = useState<CatalogProduct[]>([])
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [filter, setFilter] = useState<'all' | 'selected' | 'available'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Load selected products from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('gitislife_selected_products')
    if (saved) {
      try {
        const ids = JSON.parse(saved)
        setSelectedProducts(new Set(ids))
      } catch (e) {
        console.error('Error loading selected products:', e)
      }
    }
  }, [])

  // Fetch catalog from Printful
  useEffect(() => {
    async function fetchCatalog() {
      setLoading(true)
      setError(null)
      
      try {
        const response = await fetch('/api/printful/catalog')
        const data = await response.json()

        if (data.error) {
          setError(data.error)
          setProducts([])
        } else {
          setProducts(data.products || [])
        }
      } catch (err: any) {
        setError(`Failed to fetch catalog: ${err.message}`)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchCatalog()
  }, [])

  // Toggle product selection
  const toggleProduct = (productId: number) => {
    const newSelected = new Set(selectedProducts)
    if (newSelected.has(productId)) {
      newSelected.delete(productId)
    } else {
      newSelected.add(productId)
    }
    setSelectedProducts(newSelected)
  }

  // Select all visible products
  const selectAll = () => {
    const visible = getFilteredProducts()
    const newSelected = new Set(selectedProducts)
    visible.forEach(p => newSelected.add(p.id))
    setSelectedProducts(newSelected)
  }

  // Deselect all
  const deselectAll = () => {
    setSelectedProducts(new Set())
  }

  // Save selected products
  const saveSelected = async () => {
    setSaving(true)
    try {
      // Save to localStorage (in production, save to database)
      const ids = Array.from(selectedProducts)
      localStorage.setItem('gitislife_selected_products', JSON.stringify(ids))

      // Also try to save via API (for future database integration)
      await fetch('/api/save-selected-products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedProductIds: ids })
      })

      alert(`Saved ${ids.length} selected products!`)
    } catch (err: any) {
      alert(`Error saving: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  // Get filtered products
  const getFilteredProducts = () => {
    let filtered = products

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by status
    if (filter === 'selected') {
      filtered = filtered.filter(p => selectedProducts.has(p.id))
    } else if (filter === 'available') {
      filtered = filtered.filter(p => !p.is_discontinued)
    }

    return filtered
  }

  const filteredProducts = getFilteredProducts()
  const selectedCount = selectedProducts.size

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
          <div>
            <h1 className="text-4xl font-bold mb-2">Product Catalog</h1>
            <p className="text-gray-400">
              Select products from Printful catalog to show in your store
            </p>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm font-semibold"
          >
            ← Back to Admin
          </Link>
        </div>

        {/* Stats and Actions */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-sm text-gray-400">Total Products</p>
                <p className="text-2xl font-bold text-blue-400">{products.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Selected</p>
                <p className="text-2xl font-bold text-green-400">{selectedCount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Visible</p>
                <p className="text-2xl font-bold text-purple-400">{filteredProducts.length}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={selectAll}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-sm font-semibold"
              >
                Select All Visible
              </button>
              <button
                onClick={deselectAll}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm font-semibold"
              >
                Deselect All
              </button>
              <button
                onClick={saveSelected}
                disabled={saving}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded text-sm font-semibold disabled:opacity-50"
              >
                {saving ? 'Saving...' : `Save ${selectedCount} Products`}
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'selected', 'available'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-4 py-2 rounded border transition ${
                  filter === f
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'border-gray-700 text-gray-300 hover:border-blue-400'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-4 mb-6">
            <p className="text-yellow-400 font-semibold mb-2">⚠️ API Configuration Required</p>
            <p className="text-sm text-gray-300">{error}</p>
            <p className="text-sm text-gray-400 mt-2">
              Add your PRINTFUL_API_KEY to Netlify environment variables to see the catalog.
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading catalog...</p>
          </div>
        )}

        {/* Product Grid */}
        {!loading && filteredProducts.length === 0 && (
          <div className="bg-gray-900 rounded-lg p-12 text-center border border-gray-800">
            <p className="text-gray-400 text-lg">No products found</p>
            {searchQuery && (
              <p className="text-gray-500 text-sm mt-2">Try a different search term</p>
            )}
          </div>
        )}

        {!loading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => {
              const isSelected = selectedProducts.has(product.id)
              return (
                <div
                  key={product.id}
                  className={`bg-gray-900 rounded-lg border-2 transition cursor-pointer ${
                    isSelected
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-gray-800 hover:border-gray-700'
                  }`}
                  onClick={() => toggleProduct(product.id)}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                        <p className="text-sm text-gray-400">{product.brand} • {product.type}</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleProduct(product.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-green-500 focus:ring-green-500 focus:ring-2"
                      />
                    </div>

                    {product.image && (
                      <div className="mb-3 rounded overflow-hidden bg-gray-800">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none'
                          }}
                        />
                      </div>
                    )}

                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Variants:</span>
                        <span className="text-white">{product.variant_count}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Fulfillment:</span>
                        <span className="text-white">{product.avg_fulfillment_time} days</span>
                      </div>
                      {product.is_discontinued && (
                        <div className="text-yellow-400 text-xs font-semibold">
                          ⚠️ Discontinued
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
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
