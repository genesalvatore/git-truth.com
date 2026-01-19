// Color-specific product images
// Maps product + color to image URL

export const colorImages: Record<string, Record<string, string>> = {
  'git-is-life-tee': {
    'Black': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&q=80&auto=format',
    'White': 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=600&fit=crop&q=80&auto=format',
    'Navy': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&q=80&auto=format&brightness=0.8',
  },
  'git-substrate-hoodie': {
    'Black': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop&q=80&auto=format',
    'Charcoal': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop&q=80&auto=format&brightness=0.7',
  },
  'consciousness-commit-hat': {
    'Black': 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=600&fit=crop&q=80&auto=format',
    'Navy': 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=600&fit=crop&q=80&auto=format&brightness=0.8',
  },
  'eternal-memory-mug': {
    'White': 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=600&fit=crop&q=80&auto=format',
    'Black': 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=600&fit=crop&q=80&auto=format&brightness=0.6',
  },
  'philosophy-tote': {
    'Natural': 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop&q=80&auto=format',
    'Black': 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop&q=80&auto=format&brightness=0.5',
  },
}

export function getColorImage(productId: string, color: string, productName: string): string {
  // If we have a color-specific image, use it
  if (colorImages[productId] && colorImages[productId][color]) {
    return colorImages[productId][color]
  }
  
  // Fallback to base product image
  const { getProductImage } = require('./product-images')
  return getProductImage(productId, productName)
}
