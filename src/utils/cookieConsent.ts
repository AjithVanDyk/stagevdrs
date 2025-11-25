// Cookie Consent Utility
// Handles 24-hour caching based on browser fingerprint + IP + location

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
 * Generate a browser fingerprint based on available browser properties
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
  
  // Create a simple hash from components
  const combined = components.join('|');
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(36);
};

/**
 * Get user's location (timezone/country) for fingerprinting
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
 * Generate complete fingerprint: browser + location
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
 * Get storage key for current fingerprint
 */
export const getStorageKey = async (): Promise<string> => {
  const fingerprint = await generateFingerprint();
  return `${STORAGE_KEY_PREFIX}${fingerprint}`;
};

/**
 * Check if consent is cached and still valid (within 24 hours)
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
 * Get cached consent preferences
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
 * Save consent preferences with fingerprint and timestamp
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
 * Clear consent cache (for testing or user request)
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

