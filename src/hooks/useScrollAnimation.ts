/**
 * @fileoverview Hook for scroll-triggered animations using Intersection Observer.
 * Provides smooth, performant animations that trigger when elements enter the viewport.
 * Automatically respects reduced motion preferences.
 * @author Van Dyk Recycling Solutions
 * @module hooks/useScrollAnimation
 */

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Configuration options for scroll animations.
 * 
 * @interface UseScrollAnimationOptions
 * @property {number} [threshold=0.15] - Percentage of element that must be visible (0-1)
 * @property {string} [rootMargin='80px'] - Margin around root for triggering (CSS format)
 * @property {boolean} [triggerOnce=true] - Whether animation should only trigger once
 * @property {number} [delay=0] - Delay in milliseconds before triggering animation
 * @property {boolean} [disabled=false] - Disable animation entirely
 */
interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  disabled?: boolean;
}

type ScrollTarget = HTMLElement | null;

/**
 * Enhanced custom hook for scroll-triggered animations using Intersection Observer.
 * Provides smooth, intuitive animations with optimized performance and reduced motion support.
 * 
 * @param {UseScrollAnimationOptions} [options={}] - Configuration options
 * @returns {readonly [React.RefObject<HTMLElement>, boolean]} Tuple with [ref, isVisible]
 *   - ref: Attach this ref to the element you want to animate
 *   - isVisible: Boolean indicating if element is currently in view
 * 
 * @example
 * ```typescript
 * const [ref, isVisible] = useScrollAnimation({
 *   threshold: 0.2,
 *   triggerOnce: true
 * });
 * 
 * return (
 *   <motion.div
 *     ref={ref}
 *     initial={{ opacity: 0 }}
 *     animate={{ opacity: isVisible ? 1 : 0 }}
 *   >
 *     Content
 *   </motion.div>
 * );
 * ```
 */
export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<ScrollTarget>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const {
    threshold = 0.15,
    rootMargin = '80px',
    triggerOnce = true,
    delay = 0,
    disabled = false
  } = options;

  useEffect(() => {
    if (disabled) {
      setIsVisible(false);
      return;
    }

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          timeoutId = setTimeout(() => {
            requestAnimationFrame(() => setIsVisible(true));
          }, delay);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [threshold, rootMargin, triggerOnce, delay, prefersReducedMotion, disabled]);

  return [ref, isVisible] as const;
};

