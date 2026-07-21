declare global {
  interface Window {
    SHOPIFY_ASSETS?: Record<string, string>
    getAssetUrl?: (path: string) => string
  }
}

/**
 * Returns the proper CDN asset URL when running inside Shopify Liquid theme,
 * or the local relative path when running in Vite / Vercel.
 */
export function getAssetUrl(path: string): string {
  if (typeof window !== 'undefined' && typeof window.getAssetUrl === 'function') {
    return window.getAssetUrl(path)
  }
  return path
}
