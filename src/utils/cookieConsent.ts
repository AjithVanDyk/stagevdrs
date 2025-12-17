/**
 * @fileoverview Cookie Consent Utility
 * Handles GDPR-compliant cookie consent with 24-hour caching based on browser fingerprint,
 * IP address, and location. Provides fingerprinting to prevent consent banner spam while
 * respecting user privacy.
 * @author Van Dyk Recycling Solutions
 * @module utils/cookieConsent
 */

/**
 * User consent preferences for different cookie categories.
 * 
 * @interface ConsentPreferences
 * @property {boolean} strictlyNecessary - Required cookies (always true)
 * @property {boolean} performance - Analytics and performance cookies
 * @property {boolean} functional - Functional cookies for enhanced features
 * @property {boolean} advertising - Advertising and tracking cookies
 * @property {number} timestamp - When consent was given (Unix timestamp)
 * @property {string} fingerprint - Browser fingerprint for caching
 */
export interface ConsentPreferences {
  strictlyNecessary: boolean;
  performance: boolean;
  functional: boolean;
  advertising: boolean;
  timestamp: number;
  fingerprint: string;
}

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const STORAGE_KEY_PREFIX = 'cookieConsent_';

/**
 * Generates a browser fingerprint based on available browser properties.
 * Uses user agent, screen properties, timezone, language, and platform to create
 * a unique identifier for the browser session.
 * 
 * @returns {string} A hash-based fingerprint string representing the browser
 * 
 * @example
 * ```typescript
 * const fingerprint = generateBrowserFingerprint();
 * // Returns: "a1b2c3d4" (example hash)
 * ```
 */
export const generateBrowserFingerprint = (): string => {
  const components: string[] = [];
  
  // User agent
  if (navigator.userAgent) {
    components.push(navigator.userAgent);
  }
  
  // Screen properties
  if (window.screen) {
    components.push(`${window.screen.width}x${window.screen.height}`);
    components.push(`${window.screen.colorDepth}`);
  }
  
  // Timezone
  if (Intl.DateTimeFormat) {
    components.push(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }
  
  // Language
  if (navigator.language) {
    components.push(navigator.language);
  }
  
  // Platform
  if (navigator.platform) {
    components.push(navigator.platform);
  }
  
  // Create a simple hash from browser fingerprint components
  // Uses djb2-like hash algorithm: hash = hash * 33 + char
  // Bitwise operations ensure 32-bit integer (prevents overflow)
  // Base36 encoding creates shorter, URL-safe identifier
  const combined = components.join('|');
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char; // hash * 31 + char (optimized)
    hash = hash & hash; // Convert to 32-bit integer (bitwise AND with self)
  }
  
  return Math.abs(hash).toString(36); // Convert to base36 for shorter string
};

/**
 * Gets user's location fingerprint based on timezone and IP (if available).
 * Used in combination with browser fingerprint for more accurate consent caching.
 * 
 * @returns {Promise<string>} Location identifier (timezone-based)
 * 
 * @example
 * ```typescript
 * const location = await getLocationFingerprint();
 * // Returns: "America/New_York" (example timezone)
 * ```
 */
export const getLocationFingerprint = async (): Promise<string> => {
  try {
    // Use timezone as primary location identifier
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Try to get more specific location via IP (optional, can be enhanced with IP geolocation service)
    // For now, we'll use timezone + a simple IP-based identifier
    let ipHash = 'unknown';
    
    try {
      // Attempt to get IP location (this is a placeholder - in production, use a proper IP geolocation service)
      // For now, we'll use timezone as the location identifier
      ipHash = timezone;
    } catch (error) {
      // Fallback to timezone only
      ipHash = timezone;
    }
    
    return ipHash;
  } catch (error) {
    // Fallback to timezone
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown';
  }
};

/**
 * Generates a complete fingerprint combining browser and location data.
 * This creates a unique identifier for consent caching that respects user privacy
 * while preventing consent banner spam.
 * 
 * @returns {Promise<string>} Combined fingerprint hash
 * 
 * @example
 * ```typescript
 * const fingerprint = await generateFingerprint();
 * // Returns: "xyz123abc" (combined browser + location hash)
 * ```
 */
export const generateFingerprint = async (): Promise<string> => {
  const browserFp = generateBrowserFingerprint();
  const locationFp = await getLocationFingerprint();
  
  // Combine and hash
  const combined = `${browserFp}_${locationFp}`;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  return Math.abs(hash).toString(36);
};

/**
 * Gets the localStorage key for the current browser fingerprint.
 * Used to store and retrieve consent preferences for the current user session.
 * 
 * @returns {Promise<string>} Storage key prefixed with 'cookieConsent_'
 * 
 * @example
 * ```typescript
 * const key = await getStorageKey();
 * // Returns: "cookieConsent_xyz123abc"
 * ```
 */
export const getStorageKey = async (): Promise<string> => {
  const fingerprint = await generateFingerprint();
  return `${STORAGE_KEY_PREFIX}${fingerprint}`;
};

/**
 * Checks if consent preferences are cached and still valid (within 24 hours).
 * Automatically removes expired cache entries.
 * 
 * @returns {Promise<boolean>} True if valid cached consent exists, false otherwise
 * 
 * @example
 * ```typescript
 * const hasCached = await isConsentCached();
 * if (hasCached) {
 *   // Don't show consent banner
 * }
 * ```
 */
export const isConsentCached = async (): Promise<boolean> => {
  try {
    const storageKey = await getStorageKey();
    const cached = localStorage.getItem(storageKey);
    
    if (!cached) {
      return false;
    }
    
    const consent: ConsentPreferences = JSON.parse(cached);
    const now = Date.now();
    const age = now - consent.timestamp;
    
    // Check if cache is still valid (within 24 hours)
    if (age < CACHE_DURATION) {
      return true;
    }
    
    // Cache expired, remove it
    localStorage.removeItem(storageKey);
    return false;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error checking consent cache:', error);
    }
    return false;
  }
};

/**
 * Retrieves cached consent preferences if they exist and are still valid.
 * Returns null if no cache exists or if cache has expired (24 hours).
 * 
 * @returns {Promise<ConsentPreferences | null>} Cached preferences or null
 * 
 * @example
 * ```typescript
 * const consent = await getCachedConsent();
 * if (consent) {
 *   // Apply consent preferences
 * }
 * ```
 */
export const getCachedConsent = async (): Promise<ConsentPreferences | null> => {
  try {
    const storageKey = await getStorageKey();
    const cached = localStorage.getItem(storageKey);
    
    if (!cached) {
      return null;
    }
    
    const consent: ConsentPreferences = JSON.parse(cached);
    const now = Date.now();
    const age = now - consent.timestamp;
    
    // Check if cache is still valid
    if (age < CACHE_DURATION) {
      return consent;
    }
    
    // Cache expired
    localStorage.removeItem(storageKey);
    return null;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error getting cached consent:', error);
    }
    return null;
  }
};

/**
 * Saves consent preferences to localStorage with fingerprint and timestamp.
 * Preferences are cached for 24 hours to prevent repeated consent prompts.
 * 
 * @param {Object} preferences - User consent preferences
 * @param {boolean} preferences.strictlyNecessary - Required cookies (always true)
 * @param {boolean} preferences.performance - Analytics cookies
 * @param {boolean} preferences.functional - Functional cookies
 * @param {boolean} preferences.advertising - Advertising cookies
 * @returns {Promise<void>}
 * 
 * @example
 * ```typescript
 * await saveConsent({
 *   strictlyNecessary: true,
 *   performance: true,
 *   functional: false,
 *   advertising: false
 * });
 * ```
 */
export const saveConsent = async (preferences: {
  strictlyNecessary: boolean;
  performance: boolean;
  functional: boolean;
  advertising: boolean;
}): Promise<void> => {
  try {
    const fingerprint = await generateFingerprint();
    const storageKey = `${STORAGE_KEY_PREFIX}${fingerprint}`;
    
    const consent: ConsentPreferences = {
      ...preferences,
      timestamp: Date.now(),
      fingerprint
    };
    
    localStorage.setItem(storageKey, JSON.stringify(consent));
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error saving consent:', error);
    }
    // Silently fail - consent will be asked again
  }
};

/**
 * Clears all consent cache entries from localStorage.
 * Useful for testing or when user requests to reset their consent.
 * 
 * @returns {Promise<void>}
 * 
 * @example
 * ```typescript
 * await clearConsentCache();
 * // User will see consent banner again on next visit
 * ```
 */
export const clearConsentCache = async (): Promise<void> => {
  try {
    const storageKey = await getStorageKey();
    localStorage.removeItem(storageKey);
    
    // Also clear any old consent entries (cleanup)
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(STORAGE_KEY_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error clearing consent cache:', error);
    }
  }
};

