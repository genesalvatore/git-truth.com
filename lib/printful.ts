// Printful API Integration
// Pass-through payment model: Customer pays us → We pay Printful when order placed

const PRINTFUL_API_URL = 'https://api.printful.com'
const PRINTFUL_STORE_ID = process.env.PRINTFUL_STORE_ID

export interface PrintfulProduct {
  id: number
  name: string
  type: string
  brand: string
  model: string
  image: string
  variant_count: number
  currency: string
  files: any[]
  options: any[]
  is_discontinued: boolean
  avg_fulfillment_time: number
}

export interface PrintfulVariant {
  id: number
  product_id: number
  name: string
  size: string
  color: string
  color_code: string
  availability_status: string
  price: string
  currency: string
  image?: string
}

export interface PrintfulMockup {
  placement: string
  variant_ids: number[]
  mockup_url: string
  mockup_preview_url: string
}

/**
 * Get Printful product catalog
 */
export async function getPrintfulProducts(): Promise<PrintfulProduct[]> {
  if (!process.env.PRINTFUL_API_KEY) {
    console.warn('Printful API key not configured, using fallback data')
    return []
  }

  try {
    const response = await fetch(`${PRINTFUL_API_URL}/store/products`, {
      headers: {
        'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Printful API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.result || []
  } catch (error) {
    console.error('Error fetching Printful products:', error)
    return []
  }
}

/**
 * Get product variants (sizes, colors, pricing)
 */
export async function getPrintfulVariants(productId: number): Promise<PrintfulVariant[]> {
  if (!process.env.PRINTFUL_API_KEY) {
    return []
  }

  try {
    const response = await fetch(`${PRINTFUL_API_URL}/products/${productId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Printful API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.result?.variants || []
  } catch (error) {
    console.error('Error fetching Printful variants:', error)
    return []
  }
}

/**
 * Generate product mockup (real product image with design)
 */
export async function generateMockup(
  productId: number,
  variantId: number,
  designUrl: string,
  placement: string = 'front'
): Promise<string | null> {
  if (!process.env.PRINTFUL_API_KEY) {
    return null
  }

  try {
    const response = await fetch(`${PRINTFUL_API_URL}/mockup-generator/create-task`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        variant_ids: [variantId],
        format: 'jpg',
        width: 1000,
        product_options: [
          {
            id: variantId,
            color: 'White', // Default, can be customized
            size: 'M' // Default, can be customized
          }
        ],
        files: [
          {
            placement: placement,
            image_url: designUrl
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error(`Printful mockup API error: ${response.statusText}`)
    }

    const data = await response.json()
    // Mockup generation is async, returns task ID
    // In production, poll for completion or use webhook
    return data.result?.mockup_url || null
  } catch (error) {
    console.error('Error generating mockup:', error)
    return null
  }
}

/**
 * Create order in Printful (when customer completes checkout)
 * This is where we pay Printful - PASS-THROUGH model
 */
export async function createPrintfulOrder(orderData: {
  recipient: {
    name: string
    address1: string
    city: string
    state: string
    zip: string
    country: string
    email: string
  }
  items: Array<{
    variant_id: number
    quantity: number
    files: Array<{
      type: string
      url: string
    }>
  }>
}): Promise<{ orderId: string; total: number } | null> {
  if (!process.env.PRINTFUL_API_KEY) {
    throw new Error('Printful API key not configured')
  }

  try {
    const response = await fetch(`${PRINTFUL_API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipient: orderData.recipient,
        items: orderData.items,
        confirm: false, // Set to true when ready to fulfill
        shipping: 'STANDARD'
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Printful order error: ${error.message || response.statusText}`)
    }

    const data = await response.json()
    
    // Calculate total cost (what we pay Printful)
    const total = data.result?.costs?.total || 0

    return {
      orderId: data.result?.id?.toString() || '',
      total: parseFloat(total)
    }
  } catch (error) {
    console.error('Error creating Printful order:', error)
    throw error
  }
}

/**
 * Get shipping rates for order
 */
export async function getShippingRates(
  recipient: {
    address1: string
    city: string
    state: string
    zip: string
    country: string
  },
  items: Array<{ variant_id: number; quantity: number }>
): Promise<Array<{ id: string; name: string; rate: number; currency: string }>> {
  if (!process.env.PRINTFUL_API_KEY) {
    return []
  }

  try {
    const response = await fetch(`${PRINTFUL_API_URL}/shipping/rates`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipient,
        items
      })
    })

    if (!response.ok) {
      throw new Error(`Printful shipping API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.result || []
  } catch (error) {
    console.error('Error fetching shipping rates:', error)
    return []
  }
}
