/**
 * Application constants
 * Centralized location for magic numbers and configuration values
 */

// Transition and animation constants
export const TRANSITION_DURATION = 500; // ms
export const NAVIGATION_DELAY = 350; // 70% of transition duration for perceived performance
export const BATCH_DELAY = 100; // ms between image batches for iPad
export const SCALE_TIMEOUT = 150; // ms for cursor scale animation

// Image loading constants
export const IMAGE_BATCH_SIZE_IPAD = 2;
export const IMAGE_QUALITY_FEATURED = 85;
export const IMAGE_QUALITY_STANDARD = 75;

// Screen size breakpoints
export const MOBILE_BREAKPOINT = 768;
export const TABLET_BREAKPOINT = 1024;
export const DESKTOP_BREAKPOINT = 1200;

// Intersection Observer constants
export const OBSERVER_THRESHOLD = [0.5, 0.7];
export const OBSERVER_ROOT_MARGIN = "-15% 0px -15% 0px";

// Debounce and throttle constants
export const RESIZE_DEBOUNCE_DELAY = 150; // ms
export const SCROLL_THROTTLE_DELAY = 16; // ~60fps

// Cursor animation constants
export const CURSOR_SPRING_CONFIG = {
  damping: 45,
  stiffness: 400,
  mass: 1,
  restDelta: 0.001,
};

export const CURSOR_ROTATION_CONFIG = {
  damping: 60,
  stiffness: 300,
};

export const CURSOR_SCALE_CONFIG = {
  stiffness: 500,
  damping: 35,
};

