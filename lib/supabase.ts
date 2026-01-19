// Supabase Client Setup
// Using existing Supabase Pro account

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to Netlify environment variables.')
}

// Client-side Supabase client (uses anon key)
// This will work once environment variables are set in Netlify
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  : null

// Types for our database tables
export interface Order {
  id: string
  order_number: string
  customer_email: string
  customer_name: string | null
  total_amount: number
  subtotal: number
  shipping: number
  tax: number
  status: 'pending' | 'fulfilled' | 'cancelled' | 'refunded'
  api_provider: 'printful' | 'printify'
  printful_order_id: string | null
  stripe_payment_id: string | null
  shipping_address: {
    name: string
    address1: string
    city: string
    state: string
    zip: string
    country: string
  }
  items: Array<{
    product: string
    quantity: number
    price: number
    size?: string
    color?: string
    phrase?: string
  }>
  created_at: string
  updated_at: string
}

export interface SelectedProduct {
  id: string
  printful_product_id: number
  product_name: string
  product_data: any
  is_active: boolean
  created_at: string
  updated_at: string
}

// Helper functions (will be implemented once Supabase is set up)

export async function saveOrder(orderData: Omit<Order, 'id' | 'created_at' | 'updated_at'>): Promise<Order | null> {
  if (!supabase) {
    console.warn('Supabase not configured. Order not saved.')
    return null
  }

  try {
    const { data, error } = await supabase
      .from('gitislife_orders')
      .insert([orderData])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error saving order:', error)
    return null
  }
}

export async function getOrders(): Promise<Order[]> {
  if (!supabase) {
    console.warn('Supabase not configured. Returning empty array.')
    return []
  }

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

export async function saveSelectedProducts(productIds: number[]): Promise<boolean> {
  if (!supabase) {
    console.warn('Supabase not configured. Products not saved.')
    return false
  }

  // Implementation: Save selected products to Supabase
  // For now, this is a placeholder
  return false
}

export async function getSelectedProducts(): Promise<SelectedProduct[]> {
  if (!supabase) {
    console.warn('Supabase not configured. Returning empty array.')
    return []
  }

  try {
    const { data, error } = await supabase
      .from('gitislife_selected_products')
      .select('*')
      .eq('is_active', true)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching selected products:', error)
    return []
  }
}
