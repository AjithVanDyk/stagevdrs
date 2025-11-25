import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  disabled?: boolean;
}

/**
 * Enhanced custom hook for scroll-triggered animations using Intersection Observer
 * Provides smooth, intuitive animations with optimized performance
 * @param options - Configuration options for the Intersection Observer
 * @returns A tuple with [ref, isVisible] - attach ref to element, isVisible indicates if element is in view
 */
type ScrollTarget = HTMLElement | null;

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

