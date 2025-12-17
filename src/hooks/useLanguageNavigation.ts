/**
 * @fileoverview Hook for language-aware navigation.
 * Automatically prefixes navigation paths with the current language code
 * and handles language switching in routes.
 * @author Van Dyk Recycling Solutions
 * @module hooks/useLanguageNavigation
 */

import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Hook for language-aware navigation that automatically prefixes paths with current language.
 * Excludes asset paths and API routes from language prefixing.
 * 
 * @returns {Object} Navigation utilities
 * @returns {Function} returns.navigateTo - Navigate to a path with language prefix
 * @returns {Function} returns.getLanguagePath - Get language-prefixed path without navigating
 * @returns {string} returns.currentLanguage - Current language code ('en', 'fr', or 'es')
 * 
 * @example
 * ```typescript
 * const { navigateTo, getLanguagePath, currentLanguage } = useLanguageNavigation();
 * 
 * // Navigate to a page (automatically adds language prefix)
 * navigateTo('/equipment'); // Navigates to '/en/equipment' if language is 'en'
 * 
 * // Get path without navigating
 * const path = getLanguagePath('/contact'); // Returns '/en/contact'
 * 
 * // Check current language
 * if (currentLanguage === 'fr') {
 *   // French-specific logic
 * }
 * ```
 */
export const useLanguageNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();

  const getLanguagePath = (path: string): string => {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    
    // Don't add language prefix to assets or API routes
    if (cleanPath.startsWith('assets/') || cleanPath.startsWith('Images/') || cleanPath.startsWith('api/')) {
      return `/${cleanPath}`;
    }

    // If path already has language prefix, return as is
    if (cleanPath.match(/^(en|fr|es)(\/|$)/)) {
      return `/${cleanPath}`;
    }

    // Add language prefix
    return `/${language}${cleanPath ? `/${cleanPath}` : ''}`;
  };

  const navigateTo = (path: string, options?: { replace?: boolean }) => {
    navigate(getLanguagePath(path), options);
  };

  return {
    navigateTo,
    getLanguagePath,
    currentLanguage: language,
  };
};









