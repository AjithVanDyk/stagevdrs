// Common types used across the application

export interface NavItem {
  label: string;
  to: string;
  children?: NavItem[];
}

export interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
}

export interface ContactInfo {
  type: 'phone' | 'email' | 'address';
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface EquipmentItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  features: string[];
  specifications?: Record<string, string>;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  benefits: string[];
  applications: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
  category: string;
  author?: string;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  required: boolean;
  placeholder?: string;
  options?: string[];
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    custom?: (value: string) => boolean;
  };
}

export interface FormData {
  [key: string]: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Theme types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface Theme {
  colors: ThemeColors;
  fonts: {
    heading: string;
    body: string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// Animation types
export interface AnimationProps {
  initial?: object;
  animate?: object;
  exit?: object;
  transition?: {
    duration?: number;
    delay?: number;
    ease?: string;
  };
}

// Error types
export interface ErrorState {
  hasError: boolean;
  error: Error | null;
  errorInfo?: React.ErrorInfo;
}

// Props types
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export interface WithAnimation extends BaseProps {
  animation?: AnimationProps;
}

export interface WithError extends BaseProps {
  onError?: (error: Error) => void;
}

// Utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type AsyncFunction<T> = (...args: any[]) => Promise<T>; 