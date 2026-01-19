// Product image URLs
// These will be replaced with Printful mockup URLs when API is configured

export const productImages: Record<string, string> = {
  'git-is-life-tee': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&q=80',
  'git-substrate-hoodie': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop&q=80',
  'consciousness-commit-hat': 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=600&fit=crop&q=80',
  'git-truth-sticker-pack': 'https://images.unsplash.com/photo-1603481546239-8b4b8b8b8b8b?w=600&h=600&fit=crop&q=80',
  'eternal-memory-mug': 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=600&fit=crop&q=80',
  'philosophy-tote': 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop&q=80',
}

// Generate product image URL with fallback
export function getProductImage(productId: string, productName: string): string {
  // If we have a specific image, use it
  if (productImages[productId]) {
    return productImages[productId]
  }
  
  // Otherwise, use a placeholder with product name
  return `https://via.placeholder.com/600x600/1a1a1a/4a9eff?text=${encodeURIComponent(productName)}`
}
