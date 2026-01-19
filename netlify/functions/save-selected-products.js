// Netlify Function: Save Selected Products
// POST /api/save-selected-products
// This saves which products are selected to show in the store

// Note: In production, you'd use a database or file storage
// For now, we'll use a simple JSON file approach
// In a real implementation, you'd want to use:
// - A database (Supabase, MongoDB, etc.)
// - File storage (S3, Netlify Blob, etc.)
// - Or environment variables for small lists

const fs = require('fs')
const path = require('path')

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const { selectedProductIds } = JSON.parse(event.body)

    if (!Array.isArray(selectedProductIds)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'selectedProductIds must be an array' })
      }
    }

    // In Netlify Functions, we can't write to the filesystem directly
    // Instead, we'll return the data and the frontend will handle storage
    // OR we can use Netlify's built-in storage or a database
    
    // For now, we'll return success and the frontend will store in localStorage
    // In production, you'd want to:
    // 1. Store in a database (Supabase, MongoDB, etc.)
    // 2. Store in Netlify Blob Storage
    // 3. Store in environment variables (for small lists)
    // 4. Commit to Git (for version control)

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Selected products saved (using localStorage for now)',
        selectedProductIds,
        note: 'In production, implement database storage'
      })
    }
  } catch (error) {
    console.error('Error saving selected products:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to save selected products',
        message: error.message
      })
    }
  }
}
