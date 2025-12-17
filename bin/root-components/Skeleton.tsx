import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'card';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave';
}

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

// Pre-built skeleton components
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






