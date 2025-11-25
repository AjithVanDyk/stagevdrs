/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand Colors - Exact Specifications
        'vd-blue': {
          DEFAULT: '#154B7F', // Primary Blue (R: 0, G: 70, B: 127) - EXACT BRAND COLOR
          dark: '#00133D',   // Dark Blue (R: 0, G: 19, B: 61) - EXACT BRAND COLOR
          light: '#2A5A8F',  // Lighter blue for gradients
        },
        'vd-orange': {
          DEFAULT: '#E66538', // Red-Orange (R: 242, G: 101, B: 49) - EXACT BRAND COLOR
          alt: '#F26531',     // Slightly brighter variant for hover states
          light: '#F48B5C',  // Lighter orange for backgrounds
        },
        'vd-gray': {
          DEFAULT: '#77787C', // Brand Gray (R: 119, G: 120, B: 124) - EXACT BRAND COLOR
          light: '#949494',   // Footer link gray - EXACT BRAND SPEC
          dark: '#5A5B5E',    // Darker gray for text
        },
        // Respectable Accent Colors
        'accent': {
          'blue-light': '#E8F2FF',  // Light blue for backgrounds
          'orange-light': '#FFF4F0', // Light orange for backgrounds
          'gray-light': '#F8F9FA',   // Light gray for sections
          'success': '#10B981',      // Green for success states
          'warning': '#F59E0B',      // Amber for warnings
          'error': '#EF4444',        // Red for errors
        },
        // Legacy colors for backward compatibility
        'vd-green': {
          DEFAULT: '#8EC641', // Green color (e.g., from logo or branding)
          dark: '#6B9434',    // Darker green for gradients/accents
        },
      },
    },
  },
  plugins: [],
};
