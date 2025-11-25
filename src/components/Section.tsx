import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'blue' | 'gradient';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  container?: boolean;
  id?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  background = 'white',
  padding = 'lg',
  container = true,
  id
}) => {
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    blue: 'bg-vd-blue text-white',
    gradient: 'bg-gradient-to-r from-vd-blue-dark to-vd-blue text-white'
  };
  
  const paddingClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-20'
  };
  
  const classes = `${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`;
  
  const content = container ? (
    <div className="container mx-auto px-4">
      {children}
    </div>
  ) : children;
  
  return (
    <motion.section
      id={id}
      className={classes}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      {content}
    </motion.section>
  );
};

export default Section;






