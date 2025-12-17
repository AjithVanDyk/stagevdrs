/**
 * @fileoverview Centralized animation configurations for smooth, intuitive animations.
 * Uses optimized easing curves and spring physics for natural motion.
 * All animations respect reduced motion preferences.
 * @author Van Dyk Recycling Solutions
 * @module utils/animations
 */

import type { Variant, Transition, ViewportProps } from 'framer-motion';

type MotionDefinition = {
  initial?: Variant;
  animate?: Variant;
  exit?: Variant;
  transition?: Transition;
  whileInView?: Variant;
  viewport?: ViewportProps;
};

const reducedMotionState = { opacity: 1, scale: 1, x: 0, y: 0 };

const reducedMotionFallback: MotionDefinition = {
  initial: reducedMotionState,
  animate: reducedMotionState,
  exit: reducedMotionState,
  transition: { duration: 0 }
};

export const animationConfig: Record<string, MotionDefinition> = {
  // Page transitions - smooth and natural
  pageTransition: {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.98 },
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      mass: 0.8,
      duration: 0.5
    }
  },

  // Fade in up - most common animation
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 25,
      duration: 0.6
    }
  },

  // Fade in with scale - for cards and modals
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      duration: 0.4
    }
  },

  // Slide in from sides
  slideInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 25,
      duration: 0.6
    }
  },

  slideInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 25,
      duration: 0.6
    }
  },

  // Stagger children - for lists and grids
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  },

  // Hover animations
  hover: {
    scale: 1.02,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
      duration: 0.3
    }
  },

  hoverLift: {
    y: -4,
    scale: 1.02,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
      duration: 0.3
    }
  },

  // Image zoom on hover
  imageZoom: {
    scale: 1.1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      duration: 0.6
    }
  },

  // Button press effect
  buttonPress: {
    scale: 0.98,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30,
      duration: 0.1
    }
  },

  // Modal animations
  modal: {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 },
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      mass: 0.8,
      duration: 0.4
    }
  },

  // Backdrop fade
  backdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  },

  // Dropdown menus
  dropdown: {
    initial: { opacity: 0, y: -10, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1]
    }
  },

  // Collapsible regions (accordions/mobile menus)
  collapse: {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 0 },
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

/**
 * Gets motion configuration for a specific animation variant, respecting reduced motion preferences.
 * Returns reduced motion fallback if user prefers reduced motion, otherwise returns the variant config.
 * 
 * @param {keyof typeof animationConfig} variant - Animation variant name (e.g., 'fadeInUp', 'pageTransition')
 * @param {boolean} prefersReducedMotion - Whether user prefers reduced motion
 * @param {MotionDefinition} [overrides={}] - Optional overrides to apply to the animation config
 * @returns {MotionDefinition} Complete motion configuration ready for Framer Motion
 * 
 * @example
 * ```typescript
 * const config = getMotionConfig('fadeInUp', prefersReducedMotion);
 * 
 * <motion.div {...config}>
 *   Content
 * </motion.div>
 * ```
 */
export const getMotionConfig = (
  variant: keyof typeof animationConfig,
  prefersReducedMotion: boolean,
  overrides: MotionDefinition = {}
) => {
  if (prefersReducedMotion) {
    return {
      ...reducedMotionFallback,
      ...overrides
    };
  }

  return {
    ...animationConfig[variant],
    ...overrides
  };
};

/**
 * Predefined easing functions for CSS transitions.
 * Provides Material Design and custom easing curves for smooth animations.
 * 
 * @constant {Object} easing
 * @property {string} standard - Material Design standard easing
 * @property {string} decelerate - Deceleration curve
 * @property {string} accelerate - Acceleration curve
 * @property {string} smooth - Smooth natural curve
 * @property {string} easeOut - Ease out curve
 * @property {string} easeInOut - Ease in-out curve
 * @property {string} bounce - Bouncy curve for playful elements
 */
export const easing = {
  // Material Design easing
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
  accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
  
  // Smooth and natural
  smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  
  // Bouncy (for playful elements)
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
};

/**
 * Creates a staggered animation configuration for animating lists or grids.
 * Children elements animate in sequence with the specified delays.
 * 
 * @param {number} [delay=0.08] - Delay between each child animation (seconds)
 * @param {number} [delayChildren=0.1] - Initial delay before first child animates (seconds)
 * @returns {MotionDefinition} Stagger animation configuration
 * 
 * @example
 * ```typescript
 * const stagger = createStagger(0.1, 0.2);
 * 
 * <motion.div variants={stagger}>
 *   {items.map(item => (
 *     <motion.div key={item.id} variants={fadeInUp}>
 *       {item.content}
 *     </motion.div>
 *   ))}
 * </motion.div>
 * ```
 */
export const createStagger = (delay: number = 0.08, delayChildren: number = 0.1) => ({
  animate: {
    transition: {
      staggerChildren: delay,
      delayChildren
    }
  }
});

/**
 * Pre-configured animation for scroll-triggered elements.
 * Animates elements as they enter the viewport with fade and slide up effect.
 * 
 * @constant {MotionDefinition} scrollAnimation
 * 
 * @example
 * ```typescript
 * <motion.div {...scrollAnimation}>
 *   Content that animates on scroll
 * </motion.div>
 * ```
 */
export const scrollAnimation = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: {
    type: 'spring',
    stiffness: 200,
    damping: 25,
    duration: 0.7
  }
};

/**
 * Smooth scroll behavior configuration for programmatic scrolling.
 * 
 * @constant {Object} smoothScroll
 * @property {ScrollBehavior} behavior - 'smooth' scroll behavior
 * @property {ScrollLogicalPosition} block - 'start' alignment
 * 
 * @example
 * ```typescript
 * element.scrollIntoView(smoothScroll);
 * ```
 */
export const smoothScroll = {
  behavior: 'smooth' as ScrollBehavior,
  block: 'start' as ScrollLogicalPosition
};



