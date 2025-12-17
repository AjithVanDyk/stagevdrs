/**
 * @fileoverview Skeleton loading components for improved perceived performance.
 * Provides animated placeholder UI while content is loading.
 * @author Van Dyk Recycling Solutions
 * @module components/Skeleton
 */

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Skeleton component props.
 * 
 * @interface SkeletonProps
 * @property {string} [className] - Additional CSS classes
 * @property {'text' | 'rectangular' | 'circular' | 'card'} [variant='rectangular'] - Shape variant
 * @property {string | number} [width] - Width (CSS value or number)
 * @property {string | number} [height] - Height (CSS value or number)
 * @property {'pulse' | 'wave'} [animation='pulse'] - Animation type
 */
interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'card';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave';
}

/**
 * Skeleton loading component for displaying animated placeholders.
 * Improves perceived performance by showing loading states instead of blank screens.
 * 
 * @param {SkeletonProps} props - Skeleton component props
 * @returns {JSX.Element} Animated skeleton element
 * 
 * @example
 * ```tsx
 * // Basic skeleton
 * <Skeleton variant="rectangular" width="100%" height="200px" />
 * 
 * // Text skeleton
 * <Skeleton variant="text" width="80%" />
 * 
 * // Circular avatar skeleton
 * <Skeleton variant="circular" width={50} height={50} />
 * ```
 */
const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse'
}) => {
  const baseClasses = 'bg-gray-200 rounded';
  
  const variantClasses = {
    text: 'h-4 rounded',
    rectangular: 'rounded',
    circular: 'rounded-full',
    card: 'rounded-xl'
  };
  
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]'
  };
  
  const style = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'text' ? '1rem' : undefined)
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`;
  
  return (
    <motion.div
      className={classes}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  );
};

/**
 * Pre-built skeleton card component for equipment/solution cards.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Skeleton card layout
 * 
 * @example
 * ```tsx
 * {loading ? <SkeletonCard /> : <EquipmentCard data={equipment} />}
 * ```
 */
export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
    <Skeleton variant="rectangular" height="200px" className="mb-4" />
    <Skeleton variant="text" width="80%" className="mb-2" />
    <Skeleton variant="text" width="60%" className="mb-4" />
    <div className="flex space-x-2">
      <Skeleton variant="rectangular" width="100px" height="40px" />
      <Skeleton variant="rectangular" width="80px" height="40px" />
    </div>
  </div>
);

/**
 * Pre-built skeleton text component for multi-line text placeholders.
 * 
 * @param {Object} props - Component props
 * @param {number} [props.lines=3] - Number of text lines to display
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Multi-line skeleton text
 * 
 * @example
 * ```tsx
 * {loading ? <SkeletonText lines={5} /> : <ArticleContent />}
 * ```
 */
export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 3, 
  className = '' 
}) => (
  <div className={className}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton
        key={index}
        variant="text"
        width={index === lines - 1 ? '60%' : '100%'}
        className="mb-2"
      />
    ))}
  </div>
);

/**
 * Pre-built skeleton navbar component for navigation loading state.
 * 
 * @returns {JSX.Element} Skeleton navbar layout
 * 
 * @example
 * ```tsx
 * {loading ? <SkeletonNavbar /> : <Navbar />}
 * ```
 */
export const SkeletonNavbar: React.FC = () => (
  <div className="bg-white shadow-lg p-4">
    <div className="container mx-auto flex justify-between items-center">
      <Skeleton variant="rectangular" width="120px" height="40px" />
      <div className="flex space-x-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} variant="rectangular" width="80px" height="32px" />
        ))}
      </div>
    </div>
  </div>
);

export default Skeleton;






