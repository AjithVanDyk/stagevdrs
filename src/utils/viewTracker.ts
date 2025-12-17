/**
 * @fileoverview View tracking utility for articles, videos, and expert tips.
 * Stores view counts in localStorage and provides formatting functions for display.
 * @author Van Dyk Recycling Solutions
 * @module utils/viewTracker
 */

/**
 * Type of content that can be tracked.
 * 
 * @typedef {'article' | 'video' | 'tip'} ContentType
 */
export type ContentType = 'article' | 'video' | 'tip';

/**
 * Gets the view count for a specific content item from localStorage.
 * 
 * @param {ContentType} type - Type of content ('article', 'video', or 'tip')
 * @param {number} id - Unique ID of the content item
 * @returns {number} The view count (defaults to 0 if not found)
 * 
 * @example
 * ```typescript
 * const views = getViewCount('article', 1);
 * // Returns: 42
 * ```
 */
export const getViewCount = (type: ContentType, id: number): number => {
  try {
    const key = `${type}-views-${id}`;
    const stored = localStorage.getItem(key);
    return stored ? parseInt(stored, 10) : 0;
  } catch (error) {
    console.error('Error reading view count from localStorage:', error);
    return 0;
  }
};

/**
 * Increments the view count for a specific content item and saves to localStorage.
 * 
 * @param {ContentType} type - Type of content ('article', 'video', or 'tip')
 * @param {number} id - Unique ID of the content item
 * @returns {number} The new view count after incrementing
 * 
 * @example
 * ```typescript
 * const newCount = incrementViewCount('article', 1);
 * // Returns: 43 (if previous count was 42)
 * ```
 */
export const incrementViewCount = (type: ContentType, id: number): number => {
  try {
    const key = `${type}-views-${id}`;
    const currentCount = getViewCount(type, id);
    const newCount = currentCount + 1;
    localStorage.setItem(key, newCount.toString());
    return newCount;
  } catch (error) {
    console.error('Error incrementing view count in localStorage:', error);
    return 0;
  }
};

/**
 * Formats view count for human-readable display.
 * Converts large numbers to abbreviated format (k for thousands, M for millions).
 * 
 * @param {number} count - The view count number
 * @returns {string} Formatted string (e.g., "123", "1.2k", "1.5M")
 * 
 * @example
 * ```typescript
 * formatViewCount(1234); // Returns: "1.2k"
 * formatViewCount(1500000); // Returns: "1.5M"
 * formatViewCount(42); // Returns: "42"
 * ```
 */
export const formatViewCount = (count: number): string => {
  if (count < 1000) {
    return count.toString();
  } else if (count < 1000000) {
    const thousands = count / 1000;
    // Round to 1 decimal place, but show as integer if it's a whole number
    const rounded = Math.round(thousands * 10) / 10;
    return rounded % 1 === 0 ? `${rounded}k` : `${rounded.toFixed(1)}k`;
  } else {
    const millions = count / 1000000;
    const rounded = Math.round(millions * 10) / 10;
    return rounded % 1 === 0 ? `${rounded}M` : `${rounded.toFixed(1)}M`;
  }
};

/**
 * Initializes view counts for multiple content items at once.
 * Useful for bulk loading view counts when rendering lists or grids.
 * 
 * @param {ContentType} type - Type of content
 * @param {number[]} ids - Array of content item IDs
 * @returns {Record<number, number>} Object mapping IDs to their view counts
 * 
 * @example
 * ```typescript
 * const counts = initializeViewCounts('article', [1, 2, 3]);
 * // Returns: { 1: 42, 2: 15, 3: 0 }
 * ```
 */
export const initializeViewCounts = (type: ContentType, ids: number[]): Record<number, number> => {
  const counts: Record<number, number> = {};
  ids.forEach(id => {
    counts[id] = getViewCount(type, id);
  });
  return counts;
};









