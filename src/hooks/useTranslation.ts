/**
 * @fileoverview Translation hook for accessing localized strings.
 * Provides a translation function that automatically uses the current language
 * and falls back to English if a translation is missing.
 * @author Van Dyk Recycling Solutions
 * @module hooks/useTranslation
 */

import React, { useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../config/translations';

type TranslationTree = Record<string, unknown>;

/**
 * Type guard to check if a value is a translation tree object.
 * 
 * @param {unknown} value - Value to check
 * @returns {value is TranslationTree} True if value is a translation tree
 * @private
 */
const isTranslationTree = (value: unknown): value is TranslationTree =>
  typeof value === 'object' && value !== null;

/**
 * Recursively looks up a value in a translation tree using dot-notation keys.
 * 
 * @param {TranslationTree} tree - Translation tree to search
 * @param {string[]} keys - Array of keys (e.g., ['nav', 'home'])
 * @returns {unknown} Found value or undefined
 * @private
 */
const lookupValue = (tree: TranslationTree, keys: string[]): unknown => {
  return keys.reduce<unknown>((acc, key) => {
    if (isTranslationTree(acc) && key in acc) {
      return acc[key];
    }
    return undefined;
  }, tree);
};

/**
 * Custom hook for accessing translations with automatic language detection and fallback.
 * 
 * @returns {Object} Translation utilities
 * @returns {Function} returns.t - Translation function that accepts dot-notation keys
 * @returns {string} returns.language - Current language code ('en', 'fr', or 'es')
 * 
 * @example
 * ```typescript
 * const { t, language } = useTranslation();
 * 
 * // Simple translation
 * const title = t('nav.home'); // Returns: "Home" (in English)
 * 
 * // With fallback
 * const text = t('missing.key', 'Default text');
 * 
 * // Access current language
 * if (language === 'fr') {
 *   // French-specific logic
 * }
 * ```
 */
export const useTranslation = () => {
  const { language } = useLanguage();
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);

  // Listen for language changes to force re-render
  React.useEffect(() => {
    const handleLanguageChange = () => {
      forceUpdate();
    };
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  /**
   * Translation function that looks up localized strings using dot-notation keys.
   * Falls back to English if translation is missing, then to provided fallback, then to the key itself.
   * 
   * @param {string} key - Dot-notation key (e.g., 'nav.home', 'equipment.title')
   * @param {string} [fallback] - Optional fallback text if translation is missing
   * @returns {string} Translated string or fallback
   */
  const t = useCallback(
    (key: string, fallback?: string): string => {
      const keys = key.split('.');
      const localizedValue = lookupValue(translations[language], keys);
      if (typeof localizedValue === 'string') {
        return localizedValue;
      }

      const fallbackValue = lookupValue(translations.en, keys);
      if (typeof fallbackValue === 'string') {
        return fallbackValue;
      }

      return fallback || key;
    },
    [language]
  );

  return { t, language };
};









