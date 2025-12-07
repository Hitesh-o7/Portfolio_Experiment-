/**
 * Validates if a URL is safe to open
 * @param url - The URL to validate
 * @returns true if the URL is safe, false otherwise
 */
export const isValidUrl = (url: string): boolean => {
  if (!url || url === '/error') return false;
  
  // Allow relative URLs
  if (url.startsWith('/')) return true;
  
  try {
    const parsed = new URL(url, window.location.origin);
    // Only allow http and https protocols
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
};

/**
 * Checks if a URL is external (not relative)
 * @param url - The URL to check
 * @returns true if external, false if relative
 */
export const isExternalUrl = (url: string): boolean => {
  if (!url) return false;
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//');
};

