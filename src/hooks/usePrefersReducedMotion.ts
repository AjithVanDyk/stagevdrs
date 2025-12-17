/**
 * @fileoverview Hook for detecting user's reduced motion preference.
 * Monitors the CSS media query (prefers-reduced-motion) and updates when
 * the user changes their OS-level accessibility settings.
 * @author Van Dyk Recycling Solutions
 * @module hooks/usePrefersReducedMotion
 */

import { useEffect, useState } from 'react';

/**
 * Detects whether the user has requested reduced motion via OS settings.
 * Automatically updates when the user changes their accessibility preferences.
 * 
 * @returns {boolean} True if user prefers reduced motion, false otherwise
 * 
 * @example
 * ```typescript
 * const prefersReducedMotion = usePrefersReducedMotion();
 * 
 * const animation = prefersReducedMotion 
 *   ? { opacity: 1 } // No animation
 *   : { opacity: 0, animate: { opacity: 1 } }; // With animation
 * ```
 */
export const usePrefersReducedMotion = () => {
  const getInitialPreference = () => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialPreference);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    // Fallback for Safari < 14
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  return prefersReducedMotion;
};


