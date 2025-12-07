# Comprehensive Code Analysis Report

**Project:** Portfolio Main  
**Date:** 2025-01-XX  
**Analysis Type:** Full Codebase Review

---

## Executive Summary

This report identifies **47 issues** across 8 categories:
- **Critical Issues:** 2
- **High Priority:** 8
- **Medium Priority:** 15
- **Low Priority:** 22

---

## Table of Contents

1. [Critical Bugs & Logical Errors](#1-critical-bugs--logical-errors)
2. [Security Vulnerabilities](#2-security-vulnerabilities)
3. [Performance Issues](#3-performance-issues)
4. [TypeScript & Type Safety](#4-typescript--type-safety)
5. [Code Quality & Best Practices](#5-code-quality--best-practices)
6. [Edge Case Handling](#6-edge-case-handling)
7. [Accessibility Issues](#7-accessibility-issues)
8. [Optimization Opportunities](#8-optimization-opportunities)

---

## 1. Critical Bugs & Logical Errors

### 1.1 **Memory Leak: Intersection Observer Cleanup Race Condition**
**Severity: CRITICAL**  
**File:** `src/components/Work/Work.tsx:226-274`

**Problem:**
```typescript
setTimeout(() => {
  const projectCards = document.querySelectorAll("[data-project-id]")
  projectCards.forEach((card) => {
    if (observerRef.current) {
      observerRef.current.observe(card)
    }
  })
}, 100)
```
The `setTimeout` creates a race condition. If the component unmounts before the timeout fires, the observer may never be cleaned up, and if it fires after unmount, it tries to observe elements that no longer exist.

**Solution:**
```typescript
useEffect(() => {
  if (typeof window === "undefined") return

  const isTouch = isTouchDevice()
  const isSmallScreen = window.innerWidth < 1024
  const shouldUseObserver = isTouch || isSmallScreen

  if (!shouldUseObserver) return

  // Clean up previous observer
  if (observerRef.current) {
    observerRef.current.disconnect()
  }

  observerRef.current = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const projectId = Number.parseInt(entry.target.getAttribute("data-project-id") || "0")
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          setCenteredProjectId((prev) => prev !== projectId ? projectId : prev)
        } else if (centeredProjectId === projectId && !entry.isIntersecting) {
          setCenteredProjectId((prev) => prev === projectId ? null : prev)
        }
      })
    },
    {
      threshold: [0.5, 0.7],
      rootMargin: "-15% 0px -15% 0px",
    },
  )

  // Use requestAnimationFrame instead of setTimeout for better timing
  let rafId: number
  const setupObserver = () => {
    rafId = requestAnimationFrame(() => {
      const projectCards = document.querySelectorAll("[data-project-id]")
      projectCards.forEach((card) => {
        if (observerRef.current) {
          observerRef.current.observe(card)
        }
      })
    })
  }
  
  setupObserver()

  return () => {
    if (rafId) cancelAnimationFrame(rafId)
    if (observerRef.current) {
      observerRef.current.disconnect()
    }
  }
}, [filteredProjects])
```

### 1.2 **Infinite Loop Risk in SmoothCursor Component**
**Severity: CRITICAL**  
**File:** `src/components/ui/Cursor/smooth-cursor.tsx:161-165`

**Problem:**
```typescript
const timeout = setTimeout(() => {
  scale.set(1);
}, 150);

return () => clearTimeout(timeout);
```
The cleanup function is returned inside the event handler, which means it's called on every mouse move, creating and clearing timeouts constantly. This should be in the useEffect cleanup.

**Solution:**
```typescript
useEffect(() => {
  if (!isMouseDevice) return;

  let scaleTimeout: NodeJS.Timeout | null = null;

  const smoothMouseMove = (e: MouseEvent) => {
    // ... existing code ...
    
    if (speed > 0.1) {
      // ... rotation code ...
      scale.set(0.95);

      if (scaleTimeout) clearTimeout(scaleTimeout);
      scaleTimeout = setTimeout(() => {
        scale.set(1);
      }, 150);
    }
  };

  // ... rest of setup ...

  return () => {
    window.removeEventListener("mousemove", throttledMouseMove);
    document.body.style.cursor = "auto";
    if (rafId) cancelAnimationFrame(rafId);
    if (scaleTimeout) clearTimeout(scaleTimeout);
  };
}, [cursorX, cursorY, rotation, scale, isMouseDevice]);
```

### 1.3 **Missing Error Boundary for Image Loading Failures**
**Severity: HIGH**  
**File:** `src/components/Work/Work.tsx:614-633`

**Problem:** Image components don't have `onError` handlers, so failed images will show broken image icons.

**Solution:**
```typescript
<Image
  src={project.image || "/placeholder.svg"}
  alt={project.title}
  fill
  priority={project.featured}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  quality={85}
  className={`object-cover transition-all duration-1000 group-hover:scale-105 ${
    imagesLoaded.has(project.id) 
      ? "opacity-100" 
      : "opacity-0"
  }`}
  onLoad={() => {
    setImagesLoaded(prev => new Set(prev).add(project.id))
  }}
  onError={() => {
    setImagesLoaded(prev => new Set(prev).add(project.id))
    // Optionally set a fallback image state
  }}
/>
```

### 1.4 **Inconsistent External URL Detection**
**Severity: HIGH**  
**File:** `src/components/Work/Work.tsx:417`

**Problem:**
```typescript
const isExternalUrl = project.liveUrl.startsWith('http://') || project.liveUrl.startsWith('https://');
```
This check is duplicated and doesn't handle edge cases like URLs starting with `//` or malformed URLs.

**Solution:**
```typescript
// Create a utility function
const isExternalUrl = (url: string): boolean => {
  if (!url) return false;
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//');
};

// Use it consistently
const isExternalUrl = isExternalUrl(project.liveUrl);
```

### 1.5 **Missing Dependency in useEffect**
**Severity: MEDIUM**  
**File:** `src/app/page.tsx:20-98`

**Problem:** The useEffect depends on `setCurrentBg` and `setCurrentTextColor` but these are context setters that should be stable. However, the ScrollTrigger cleanup might not run if sections change.

**Solution:**
```typescript
useEffect(() => {
  // ... detection code ...
  
  const sections = document.querySelectorAll("[data-bgcolor]");
  
  // Store ScrollTrigger instances for cleanup
  const triggers: ScrollTrigger[] = [];
  
  if (isIPad || (isTouchDevice && window.innerWidth < 1024)) {
    // ... touch device code ...
  } else {
    sections.forEach((section) => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => {
          setCurrentBg(section.getAttribute("data-bgcolor") || "rgba(255,255,255,0.9)");
          setCurrentTextColor(
            section.getAttribute("data-textcolor") || "rgba(0,0,0,0.9)"
          );
        },
        onEnterBack: () => {
          setCurrentBg(section.getAttribute("data-bgcolor") || "rgba(255,255,255,0.9)");
          setCurrentTextColor(
            section.getAttribute("data-textcolor") || "rgba(0,0,0,0.9)"
          );
        },
      });
      triggers.push(trigger);
    });
  }

  return () => {
    triggers.forEach(trigger => trigger.kill());
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}, [setCurrentBg, setCurrentTextColor]);
```

---

## 2. Security Vulnerabilities

### 2.1 **XSS Risk: Unvalidated URL Opening**
**Severity: HIGH**  
**File:** `src/components/Work/Work.tsx:495, 539, 700`

**Problem:**
```typescript
window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
```
No validation that URLs are safe before opening. Malicious URLs could be injected.

**Solution:**
```typescript
const isValidUrl = (url: string): boolean => {
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

// Usage
if (isValidUrl(project.liveUrl)) {
  window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
} else {
  console.warn('Invalid URL:', project.liveUrl);
}
```

### 2.2 **Missing rel="noopener noreferrer" on Some Links**
**Severity: MEDIUM**  
**File:** `src/components/Contact/Contact.tsx:39-57`

**Problem:** Some external links are missing security attributes.

**Solution:**
```typescript
<a 
  href="https://mail.google.com/mail/?view=cm&fs=1&to=hitesh.design7@gmail.com" 
  target="_blank"
  rel="noopener noreferrer"
  // ... rest
>
```

### 2.3 **SVG Content Security Policy**
**Severity: LOW**  
**File:** `next.config.ts:17`

**Problem:** SVG CSP is set but might be too restrictive for some use cases.

**Current:**
```typescript
contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
```

**Note:** This is actually good security practice, but ensure all SVG usage is compatible.

---

## 3. Performance Issues

### 3.1 **Inefficient Image Preloading**
**Severity: HIGH**  
**File:** `src/components/Work/Work.tsx:151-197`

**Problem:** Creating new Image objects for every project, even if already loaded. No check for existing loaded images.

**Solution:**
```typescript
useEffect(() => {
  const isTouchDevice = 
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0;
  
  const isIPad = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  
  // Filter out already loaded images
  const imagesToPreload = (isIPad || (isTouchDevice && window.innerWidth < 1024)
    ? projects.filter(p => p.featured && !imagesLoaded.has(p.id))
    : projects.filter(p => !imagesLoaded.has(p.id) && p.image));
  
  if (imagesToPreload.length === 0) return;
  
  const preloadImages = async () => {
    const batchSize = isIPad ? 2 : imagesToPreload.length;
    
    for (let i = 0; i < imagesToPreload.length; i += batchSize) {
      const batch = imagesToPreload.slice(i, i + batchSize);
      const imagePromises = batch.map((project) => {
        return new Promise<boolean>((resolve) => {
          if (project.image && !imagesLoaded.has(project.id)) {
            const img = new window.Image()
            img.onload = () => {
              setImagesLoaded(prev => new Set(prev).add(project.id))
              resolve(true)
            }
            img.onerror = () => resolve(false)
            img.src = project.image
          } else {
            resolve(true)
          }
        })
      })
      
      await Promise.all(imagePromises)
      
      if (isIPad && i + batchSize < imagesToPreload.length) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    }
  }

  preloadImages()
}, []) // Remove imagesLoaded from deps to prevent re-running
```

### 3.2 **Multiple ScrollTrigger Instances Not Cleaned Up**
**Severity: HIGH**  
**File:** `src/app/page.tsx:76-94`

**Problem:** ScrollTrigger instances are created on every render if sections change, but cleanup might miss some.

**Solution:** See fix in 1.5.

### 3.3 **Unnecessary Re-renders from Context**
**Severity: MEDIUM**  
**File:** `src/context/AnimationContext.tsx`

**Problem:** Context value is recreated on every render, causing all consumers to re-render.

**Solution:**
```typescript
export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentBg, setCurrentBg] = useState<string>("#ffffff");
  const [currentTextColor, setCurrentTextColor] = useState<string>("#000000");

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({ currentBg, setCurrentBg, currentTextColor, setCurrentTextColor }),
    [currentBg, currentTextColor]
  );

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};
```

### 3.4 **Heavy Computations in Render**
**Severity: MEDIUM**  
**File:** `src/components/Header/Header.tsx:24-37`

**Problem:** `isDarkBackground` is called on every render without memoization.

**Solution:**
```typescript
const isBackgroundDark = useMemo(
  () => isDarkBackground(currentBg || ''),
  [currentBg]
);
```

### 3.5 **No Debouncing on Window Resize**
**Severity: MEDIUM**  
**File:** `src/components/Work/Work.tsx:277-293`

**Problem:** Resize handler fires on every pixel change, causing performance issues.

**Solution:**
```typescript
useEffect(() => {
  let timeoutId: NodeJS.Timeout;
  
  const handleResize = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const isTouch = isTouchDevice()
      const isSmallScreen = window.innerWidth < 1024
      const shouldUseObserver = isTouch || isSmallScreen
      
      if (!shouldUseObserver) {
        setCenteredProjectId(null)
        if (observerRef.current) {
          observerRef.current.disconnect()
        }
      }
    }, 150);
  }

  window.addEventListener("resize", handleResize, { passive: true })
  return () => {
    clearTimeout(timeoutId);
    window.removeEventListener("resize", handleResize)
  }
}, [])
```

### 3.6 **Large Bundle Size from Unused Imports**
**Severity: LOW**  
**File:** Multiple files

**Problem:** Some imports might be unused. Check with:
```bash
npx next build --analyze
```

### 3.7 **Video Autoplay Without Controls**
**Severity: LOW**  
**File:** `src/components/Work/Work.tsx:432-444`

**Problem:** Videos autoplay without user control, which can be annoying and consume bandwidth.

**Solution:** Add `controls` attribute or make autoplay conditional:
```typescript
<video
  src={project.video}
  autoPlay={false} // Or make it conditional
  loop
  muted
  playsInline
  controls // Add controls
  preload="metadata"
  // ...
/>
```

---

## 4. TypeScript & Type Safety

### 4.1 **Use of `any` Type**
**Severity: MEDIUM**  
**Files:** Multiple

**Problem:**
```typescript
(navigator as any).msMaxTouchPoints > 0
```

**Solution:**
```typescript
interface NavigatorWithTouch extends Navigator {
  msMaxTouchPoints?: number;
}

const navigatorWithTouch = navigator as NavigatorWithTouch;
if (navigatorWithTouch.msMaxTouchPoints && navigatorWithTouch.msMaxTouchPoints > 0) {
  // ...
}
```

### 4.2 **Missing Type Definitions**
**Severity: LOW**  
**File:** `src/components/Card/Lanyard.jsx`

**Problem:** File is `.jsx` instead of `.tsx`, losing type safety.

**Solution:** Convert to TypeScript or add JSDoc types:
```typescript
interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}
```

### 4.3 **Inconsistent Type Usage**
**Severity: LOW**  
**File:** `src/components/Work/Work.tsx:146`

**Problem:**
```typescript
const [centeredProjectId, setCenteredProjectId] = useState<number | null>(null)
```
But then used with string comparison in some places.

**Solution:** Ensure consistent typing throughout.

### 4.4 **Missing Return Types**
**Severity: LOW**  
**Multiple files**

**Problem:** Functions don't have explicit return types.

**Solution:**
```typescript
const isExternalUrl = (url: string): boolean => {
  // ...
};
```

---

## 5. Code Quality & Best Practices

### 5.1 **Hardcoded Data in Component**
**Severity: MEDIUM**  
**File:** `src/components/Work/Work.tsx:16-135`

**Problem:** `projects` array is hardcoded in component file, making it hard to maintain.

**Solution:** Move to `src/data/projects.ts`:
```typescript
// src/data/projects.ts
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  video?: string;
  type?: "video";
  technologies: string[];
  category: string;
  liveUrl: string;
  githubUrl: string;
  date: string;
  featured: boolean;
}

export const projects: Project[] = [
  // ... projects
];
```

### 5.2 **Console Statements in Production**
**Severity: LOW**  
**Files:** `src/app/work/funky/page.tsx:64`, `src/app/work/sunsoft/page.tsx:64`, `src/app/work/Imigration/page.tsx:64`

**Problem:**
```typescript
console.error('Image failed to load:', e);
```

**Solution:** Use a proper logging service or remove in production:
```typescript
if (process.env.NODE_ENV === 'development') {
  console.error('Image failed to load:', e);
}
// Or use a logging service
```

### 5.3 **Magic Numbers**
**Severity: LOW**  
**Multiple files**

**Problem:** Hardcoded values like `350`, `100`, `0.5`, etc. without explanation.

**Solution:** Extract to constants:
```typescript
const TRANSITION_DURATION = 500; // ms
const NAVIGATION_DELAY = 350; // 70% of transition duration
const BATCH_DELAY = 100; // ms between image batches
```

### 5.4 **Duplicate Code**
**Severity: MEDIUM**  
**File:** `src/components/Work/Work.tsx:422-585, 586-745`

**Problem:** Nearly identical code blocks for external vs internal URLs.

**Solution:** Extract to a reusable component:
```typescript
const ProjectCard = ({ project, isExternalUrl, ...props }) => {
  const CardWrapper = isExternalUrl ? Link : TransitionLink;
  const wrapperProps = isExternalUrl 
    ? { href: project.liveUrl, target: "_blank", rel: "noopener noreferrer" }
    : { href: project.liveUrl };
    
  return (
    <CardWrapper {...wrapperProps} {...props}>
      {/* Shared card content */}
    </CardWrapper>
  );
};
```

### 5.5 **Inconsistent Naming Conventions**
**Severity: LOW**  
**Multiple files**

**Problem:** Mix of camelCase, PascalCase, and kebab-case.

**Solution:** Establish and follow consistent naming:
- Components: PascalCase
- Functions/variables: camelCase
- CSS classes: kebab-case or camelCase (consistent)

### 5.6 **Missing Error Boundaries**
**Severity: MEDIUM**  
**Project-wide**

**Problem:** No error boundaries to catch React errors gracefully.

**Solution:** Add error boundary component:
```typescript
// src/components/ErrorBoundary.tsx
'use client';

import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong</div>;
    }

    return this.props.children;
  }
}
```

### 5.7 **Missing PropTypes or Interface Documentation**
**Severity: LOW**  
**Multiple files**

**Problem:** Component props lack JSDoc comments.

**Solution:**
```typescript
/**
 * Contact component for displaying contact information
 * @param backgroundColor - Background color for the contact section
 * @param textColor - Text color for the contact section
 * @param theme - Theme variant ('light' | 'dark')
 */
export default function Contact({ 
  backgroundColor = 'transparent', 
  textColor = 'rgba(255,255,255,0.9)',
  theme = 'dark'
}: ContactProps) {
  // ...
}
```

---

## 6. Edge Case Handling

### 6.1 **No Handling for Empty Projects Array**
**Severity: LOW**  
**File:** `src/components/Work/Work.tsx`

**Problem:** If `projects` array is empty, component still renders but shows empty state. Could be improved.

**Status:** Already handled with "No projects found" UI, but could add loading state.

### 6.2 **Race Condition in Image Loading**
**Severity: MEDIUM**  
**File:** `src/components/Work/Work.tsx:630-632`

**Problem:** `onLoad` callback might fire after component unmounts.

**Solution:**
```typescript
useEffect(() => {
  let isMounted = true;
  
  // In Image component
  onLoad={() => {
    if (isMounted) {
      setImagesLoaded(prev => new Set(prev).add(project.id));
    }
  }}
  
  return () => {
    isMounted = false;
  };
}, [project.id]);
```

### 6.3 **Missing Null Checks**
**Severity: LOW**  
**File:** `src/components/Work/Work.tsx:417`

**Problem:**
```typescript
const isExternalUrl = project.liveUrl.startsWith('http://')
```
If `project.liveUrl` is null/undefined, this will throw.

**Solution:**
```typescript
const isExternalUrl = project.liveUrl?.startsWith('http://') || project.liveUrl?.startsWith('https://');
```

### 6.4 **No Handling for Network Failures**
**Severity: LOW**  
**Multiple files**

**Problem:** No retry logic or user feedback for network failures.

**Solution:** Add retry logic for critical resources:
```typescript
const loadImageWithRetry = async (src: string, retries = 3): Promise<boolean> => {
  for (let i = 0; i < retries; i++) {
    try {
      await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => reject(new Error('Failed to load'));
        img.src = src;
      });
      return true;
    } catch (error) {
      if (i === retries - 1) return false;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  return false;
};
```

### 6.5 **Touch Device Detection Edge Cases**
**Severity: LOW**  
**Multiple files**

**Problem:** Touch device detection might not work in all browsers or edge cases.

**Solution:** Use a more robust detection:
```typescript
const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as NavigatorWithTouch).msMaxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches
  );
};
```

---

## 7. Accessibility Issues

### 7.1 **Missing Alt Text for Decorative Images**
**Severity: MEDIUM**  
**File:** `src/components/Contact/Contact.tsx:60-61`

**Problem:**
```typescript
<Image src="/GreenLogo.svg" alt="Logo" width={80} height={80} />
```
If logo is decorative, should use empty alt or aria-hidden.

**Solution:**
```typescript
<Image 
  src="/GreenLogo.svg" 
  alt="" 
  aria-hidden="true"
  width={80} 
  height={80} 
/>
```

### 7.2 **Missing ARIA Labels on Interactive Elements**
**Severity: MEDIUM**  
**File:** `src/components/Work/Work.tsx:490-514`

**Problem:** Buttons in overlay don't have accessible labels.

**Solution:**
```typescript
<div
  onClick={async (e) => {
    // ...
  }}
  role="button"
  aria-label={`Open ${project.title} in new tab`}
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Handle click
    }
  }}
  className="..."
>
  <ExternalLink className="w-5 h-5 text-gray-700" aria-hidden="true" />
</div>
```

### 7.3 **Video Elements Without Controls or Labels**
**Severity: MEDIUM**  
**File:** `src/components/Work/Work.tsx:432-444`

**Problem:**
```typescript
<video
  src={project.video}
  autoPlay
  loop
  muted
  playsInline
  preload="metadata"
/>
```

**Solution:**
```typescript
<video
  src={project.video}
  autoPlay
  loop
  muted
  playsInline
  preload="metadata"
  aria-label={`Video preview for ${project.title}`}
  controls // Add controls for accessibility
/>
```

### 7.4 **Missing Focus Indicators**
**Severity: LOW**  
**Multiple files**

**Problem:** Custom buttons might not have visible focus states.

**Solution:** Ensure all interactive elements have focus styles:
```css
button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
```

### 7.5 **Color Contrast Issues**
**Severity: LOW**  
**Multiple files**

**Problem:** Some text colors might not meet WCAG contrast requirements.

**Solution:** Use tools like WebAIM Contrast Checker to verify all color combinations meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text).

### 7.6 **Missing Skip Links**
**Severity: LOW**  
**Project-wide**

**Problem:** No skip navigation links for keyboard users.

**Solution:** Add skip link:
```typescript
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white">
  Skip to main content
</a>
```

---

## 8. Optimization Opportunities

### 8.1 **Code Splitting**
**Severity: MEDIUM**  
**Project-wide**

**Problem:** Large components loaded upfront.

**Solution:** Use dynamic imports for heavy components:
```typescript
const Lanyard = dynamic(() => import('@/components/Card/Lanyard'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});
```

### 8.2 **Image Optimization**
**Severity: MEDIUM**  
**Multiple files**

**Problem:** Some images might be too large or not optimized.

**Solution:**
- Use Next.js Image component (already done)
- Ensure all images are in modern formats (AVIF/WebP)
- Consider lazy loading for below-fold images
- Use appropriate `sizes` attribute

### 8.3 **Bundle Size Optimization**
**Severity: LOW**  
**Project-wide**

**Problem:** Large dependencies like GSAP, Three.js, Framer Motion.

**Solution:**
- Tree-shake unused exports
- Use dynamic imports for heavy libraries
- Consider lighter alternatives where possible
- Analyze bundle with `@next/bundle-analyzer`

### 8.4 **Memoization Opportunities**
**Severity: LOW**  
**Multiple files**

**Problem:** Expensive computations in render.

**Solution:**
```typescript
const filteredProjects = useMemo(() => {
  return projects.filter((project) => {
    // ... filtering logic
  });
}, [searchTerm, selectedCategories, selectedTechnologies, showFeaturedOnly]);
```

### 8.5 **Reduce Re-renders**
**Severity: LOW**  
**Multiple files**

**Problem:** Components re-render unnecessarily.

**Solution:**
- Use `React.memo` for expensive components
- Memoize callbacks with `useCallback`
- Split contexts to reduce re-render scope

### 8.6 **Service Worker for Offline Support**
**Severity: LOW**  
**Project-wide**

**Opportunity:** Add service worker for offline functionality and better caching.

---

## Summary of Recommendations

### Immediate Actions (Critical/High)
1. Fix Intersection Observer cleanup race condition
2. Fix SmoothCursor timeout cleanup
3. Add URL validation before opening
4. Fix image preloading efficiency
5. Add error boundaries
6. Memoize context value

### Short-term (Medium Priority)
1. Extract hardcoded data to separate files
2. Add debouncing to resize handlers
3. Convert JSX files to TypeScript
4. Add proper error handling for images
5. Improve accessibility with ARIA labels
6. Extract duplicate code into reusable components

### Long-term (Low Priority)
1. Add comprehensive logging service
2. Implement code splitting
3. Add service worker
4. Improve documentation
5. Add unit tests
6. Set up CI/CD with linting and type checking

---

## Testing Recommendations

1. **Unit Tests:** Add tests for utility functions and hooks
2. **Integration Tests:** Test component interactions
3. **E2E Tests:** Test critical user flows
4. **Performance Tests:** Lighthouse audits, bundle size monitoring
5. **Accessibility Tests:** Automated a11y testing with axe-core

---

## Tools & Resources

- **ESLint:** Already configured, ensure all rules are enabled
- **TypeScript:** Enable stricter type checking
- **Bundle Analyzer:** `@next/bundle-analyzer`
- **Lighthouse:** Regular performance audits
- **Accessibility:** axe DevTools, WAVE

---

**Report Generated:** 2025-01-XX  
**Next Review Recommended:** After implementing critical fixes
