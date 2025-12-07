/**
 * Extended Navigator interface for touch device detection
 */
interface NavigatorWithTouch extends Navigator {
  msMaxTouchPoints?: number;
}

/**
 * Detects if the current device supports touch input
 * @returns true if device supports touch, false otherwise
 */
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const navigatorWithTouch = navigator as NavigatorWithTouch;
  
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigatorWithTouch.msMaxTouchPoints !== undefined && navigatorWithTouch.msMaxTouchPoints > 0) ||
    window.matchMedia('(pointer: coarse)').matches
  );
};

/**
 * Detects if the current device is an iPad
 * @returns true if device is iPad, false otherwise
 */
export const isIPad = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
};

