// Netlify Function: Fetch Printful Catalog
// GET /api/printful/catalog

const PRINTFUL_API_URL = 'https://api.printful.com'

exports.handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  const apiKey = process.env.PRINTFUL_API_KEY

  if (!apiKey) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        products: [],
        error: 'Printful API key not configured. Add PRINTFUL_API_KEY to Netlify environment variables.'
      })
    }
  }

  try {
    // Fetch Printful catalog products
    // This endpoint returns all available products in Printful's catalog
    const response = await fetch(`${PRINTFUL_API_URL}/catalog/products`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: `Printful API error: ${response.statusText}`,
          details: errorText
        })
      }
    }

    const data = await response.json()
    
    // Format products for easier use
    const products = (data.result || []).map(product => ({
      id: product.id,
      name: product.name,
      type: product.type,
      brand: product.brand,
      model: product.model,
      image: product.image,
      variant_count: product.variant_count,
      currency: product.currency,
      is_discontinued: product.is_discontinued || false,
      avg_fulfillment_time: product.avg_fulfillment_time
    }))

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      },
      body: JSON.stringify({
        products,
        count: products.length,
        timestamp: new Date().toISOString()
      })
    }
  } catch (error) {
    console.error('Error fetching Printful catalog:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to fetch Printful catalog',
        message: error.message
      })
    }
  }
}
