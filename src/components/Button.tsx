/**
 * @fileoverview Reusable Button component with multiple variants, sizes, and states.
 * Supports both button and anchor link rendering with animations and accessibility features.
 * @author Van Dyk Recycling Solutions
 * @module components/Button
 */

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Button component props.
 * 
 * @interface ButtonProps
 * @property {React.ReactNode} children - Button content (text, icons, etc.)
 * @property {() => void} [onClick] - Click handler function
 * @property {'button' | 'submit' | 'reset'} [type='button'] - HTML button type
 * @property {'primary' | 'secondary' | 'outline' | 'ghost'} [variant='primary'] - Visual style variant
 * @property {'sm' | 'md' | 'lg'} [size='md'] - Button size
 * @property {string} [className] - Additional CSS classes
 * @property {boolean} [disabled=false] - Whether button is disabled
 * @property {boolean} [loading=false] - Whether button is in loading state (shows spinner)
 * @property {React.ReactNode} [icon] - Optional icon element
 * @property {'left' | 'right'} [iconPosition='left'] - Icon position relative to text
 * @property {string} [href] - If provided, renders as anchor link instead of button
 * @property {string} [target] - Link target (e.g., '_blank' for new tab)
 * @property {string} [rel] - Link rel attribute (e.g., 'noopener noreferrer')
 */
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
  target?: string;
  rel?: string;
}

/**
 * Reusable Button component with multiple variants, sizes, and states.
 * Automatically renders as anchor link if `href` prop is provided.
 * Includes hover animations, loading states, and accessibility features.
 * 
 * @param {ButtonProps} props - Button component props
 * @returns {JSX.Element} Button or anchor element with animations
 * 
 * @example
 * ```tsx
 * // Basic button
 * <Button onClick={handleClick}>Click Me</Button>
 * 
 * // Primary button with icon
 * <Button variant="primary" icon={<Icon />} iconPosition="left">
 *   Submit
 * </Button>
 * 
 * // Link button
 * <Button href="/contact" variant="outline">
 *   Contact Us
 * </Button>
 * 
 * // Loading state
 * <Button loading disabled>
 *   Processing...
 * </Button>
 * ```
 */
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  href,
  target,
  rel
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-vd-orange hover:bg-vd-orange-alt text-white focus:ring-vd-orange shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105',
    secondary: 'bg-vd-blue hover:bg-vd-blue-dark text-white focus:ring-vd-blue shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105',
    outline: 'border-2 border-vd-orange text-vd-orange hover:bg-vd-orange hover:text-white focus:ring-vd-orange',
    ghost: 'text-vd-orange hover:bg-vd-orange/10 focus:ring-vd-orange'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  const content = (
    <>
      {loading && (
        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-current mr-2" />
      )}
      {icon && iconPosition === 'left' && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && !loading && (
        <span className="ml-2">{icon}</span>
      )}
    </>
  );
  
  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={classes}
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
      >
        {content}
      </motion.a>
    );
  }
  
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
    >
      {content}
    </motion.button>
  );
};

export default Button;






