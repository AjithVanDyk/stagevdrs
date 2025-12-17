/**
 * @fileoverview Flexible Card component with customizable styling and animations.
 * Supports hover effects, click handlers, and semantic HTML elements.
 * @author Van Dyk Recycling Solutions
 * @module components/Card
 */

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Card component props.
 * 
 * @interface CardProps
 * @property {React.ReactNode} children - Card content
 * @property {string} [className] - Additional CSS classes
 * @property {boolean} [hover=true] - Enable hover elevation effect
 * @property {'sm' | 'md' | 'lg'} [padding='md'] - Internal padding size
 * @property {'sm' | 'md' | 'lg' | 'xl'} [shadow='lg'] - Shadow depth
 * @property {'sm' | 'md' | 'lg' | 'xl' | '2xl'} [rounded='xl'] - Border radius
 * @property {() => void} [onClick] - Click handler (makes card clickable)
 * @property {'div' | 'article' | 'section'} [as='div'] - HTML element to render as
 */
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  onClick?: () => void;
  as?: 'div' | 'article' | 'section';
}

/**
 * Flexible Card component with customizable styling, animations, and semantic HTML support.
 * Provides consistent card styling across the application with hover effects and click handling.
 * 
 * @param {CardProps} props - Card component props
 * @returns {JSX.Element} Card element with animations
 * 
 * @example
 * ```tsx
 * // Basic card
 * <Card>
 *   <h3>Card Title</h3>
 *   <p>Card content goes here</p>
 * </Card>
 * 
 * // Clickable card with custom styling
 * <Card
 *   onClick={() => navigate('/details')}
 *   hover={true}
 *   padding="lg"
 *   shadow="xl"
 * >
 *   <h3>Clickable Card</h3>
 * </Card>
 * 
 * // Semantic article card
 * <Card as="article" padding="md">
 *   <h2>Article Title</h2>
 *   <p>Article content</p>
 * </Card>
 * ```
 */
const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  padding = 'md',
  shadow = 'lg',
  rounded = 'xl',
  onClick,
  as: Component = 'div'
}) => {
  const baseClasses = 'bg-white transition-all duration-300';
  
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };
  
  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl'
  };
  
  const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-1' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';
  
  const classes = `${baseClasses} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${roundedClasses[rounded]} ${hoverClasses} ${clickableClasses} ${className}`;
  
  const MotionComponent = motion(Component as React.ElementType);
  
  return (
    <MotionComponent
      className={classes}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
    >
      {children}
    </MotionComponent>
  );
};

export default Card;






