/**
 * Helper function to get image source URL
 * Handles both imported images (objects with default property) and string URLs
 */
export const getImageSrc = (image) => {
  if (!image) return '';
  
  // If image is an object (imported image), return its default or src property
  if (typeof image === 'object' && image !== null) {
    return image.default || image.src || '';
  }
  
  // If image is a string (URL or path)
  if (typeof image === 'string') {
    // If it's already a full URL (http/https), return as is
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image;
    }
    
    // If it starts with /, it's a path to public folder (Vite serves public/ at root)
    // Paths like /assets/image.jpg will work directly
    if (image.startsWith('/')) {
      return image;
    }
    
    // For relative paths without leading slash, add one
    return '/' + image;
  }
  
  return '';
};

/**
 * Get image source for product images
 * For local assets, tries to import them dynamically
 */
export const getProductImage = (imagePath) => {
  if (!imagePath) return '';
  
  // If already a valid image object/URL, return it
  if (typeof imagePath === 'object' || imagePath.startsWith('http')) {
    return getImageSrc(imagePath);
  }
  
  // For relative paths, try to construct the correct path
  // This assumes images are in src/assets and accessible
  if (imagePath.startsWith('/')) {
    // Remove leading slash for Vite asset handling
    return imagePath.substring(1);
  }
  
  // Return as is for other cases
  return imagePath;
};

export default {
  getImageSrc,
  getProductImage,
};

