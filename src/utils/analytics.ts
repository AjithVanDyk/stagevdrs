/**
 * @fileoverview Analytics tracking utility for homepage button clicks and rotation.
 * Tracks button interactions in Google Analytics and localStorage for intelligent
 * button ordering based on user engagement.
 * @author Van Dyk Recycling Solutions
 * @module utils/analytics
 */

/**
 * Button click tracking data structure.
 * 
 * @interface ButtonClickData
 * @property {string} buttonId - Unique identifier for the button
 * @property {string} url - URL the button links to
 * @property {string} label - Display label of the button
 * @property {number} clickCount - Total number of clicks
 * @property {number} lastClicked - Timestamp of last click (Unix milliseconds)
 */
interface ButtonClickData {
  buttonId: string;
  url: string;
  label: string;
  clickCount: number;
  lastClicked: number;
}

const STORAGE_KEY = 'homepage_button_clicks';
const MAX_AGE_DAYS = 90; // Keep data for 90 days

/**
 * Tracks a button click event in both Google Analytics and localStorage.
 * Data is used for analytics and to intelligently rotate homepage buttons
 * based on engagement. Old data (90+ days) is automatically cleaned.
 * 
 * @param {string} buttonId - Unique identifier for the button
 * @param {string} url - URL the button links to
 * @param {string} label - Display label for analytics
 * @returns {void}
 * 
 * @example
 * ```typescript
 * trackButtonClick('equipment-btn', '/equipment', 'View Equipment');
 * ```
 */
export function trackButtonClick(buttonId: string, url: string, label: string): void {
  // Track in Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'homepage_button_click', {
      event_category: 'homepage',
      event_label: label,
      button_id: buttonId,
      button_url: url,
      value: 1
    });
  }

  // Store in localStorage for immediate rotation
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const data: ButtonClickData[] = stored ? JSON.parse(stored) : [];
      
      // Clean old data (older than MAX_AGE_DAYS)
      const now = Date.now();
      const maxAge = MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
      const cleanedData = data.filter(item => (now - item.lastClicked) < maxAge);
      
      // Find existing button or create new
      const existingIndex = cleanedData.findIndex(item => item.buttonId === buttonId);
      
      if (existingIndex >= 0) {
        cleanedData[existingIndex].clickCount++;
        cleanedData[existingIndex].lastClicked = now;
      } else {
        cleanedData.push({
          buttonId,
          url,
          label,
          clickCount: 1,
          lastClicked: now
        });
      }
      
      // Sort by click count (descending)
      cleanedData.sort((a, b) => b.clickCount - a.clickCount);
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanedData));
    } catch (error) {
      console.error('Failed to store button click data:', error);
    }
  }
}

/**
 * Retrieves the most clicked buttons sorted by click count.
 * Automatically filters out data older than 90 days.
 * 
 * @param {number} [limit=4] - Maximum number of buttons to return
 * @returns {ButtonClickData[]} Array of button data sorted by click count (descending)
 * 
 * @example
 * ```typescript
 * const topButtons = getMostClickedButtons(4);
 * // Returns: [{ buttonId: 'equipment', clickCount: 150, ... }, ...]
 * ```
 */
export function getMostClickedButtons(limit: number = 4): ButtonClickData[] {
  if (typeof window === 'undefined' || !window.localStorage) {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const data: ButtonClickData[] = JSON.parse(stored);
    
    // Clean old data
    const now = Date.now();
    const maxAge = MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
    const cleanedData = data.filter(item => (now - item.lastClicked) < maxAge);
    
    // Sort by click count and return top N
    return cleanedData
      .sort((a, b) => b.clickCount - a.clickCount)
      .slice(0, limit);
  } catch (error) {
    console.error('Failed to get button click data:', error);
    return [];
  }
}

/**
 * Gets the total click count for a specific button.
 * 
 * @param {string} buttonId - Unique identifier for the button
 * @returns {number} Total click count (0 if not found)
 * 
 * @example
 * ```typescript
 * const count = getButtonClickCount('equipment-btn');
 * // Returns: 150
 * ```
 */
export function getButtonClickCount(buttonId: string): number {
  if (typeof window === 'undefined' || !window.localStorage) {
    return 0;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return 0;
    
    const data: ButtonClickData[] = JSON.parse(stored);
    const button = data.find(item => item.buttonId === buttonId);
    return button ? button.clickCount : 0;
  } catch (error) {
    console.error('Failed to get button click count:', error);
    return 0;
  }
}

// Type declarations for gtag
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
    localStorage: Storage;
  }
}

