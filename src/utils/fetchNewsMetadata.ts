import { NEWS_ARTICLE_URLS } from '../config/newsUrls';

export interface NewsArticleMetadata {
  url: string;
  title: string;
  description: string;
  image: string;
  source: string;
  publishDate?: string;
  id: string; // Generated from URL
}

/**
 * Fetches metadata for all URLs in the config file
 * Uses Microlink.io API (free tier available, handles CORS)
 */
export async function fetchAllNewsMetadata(): Promise<NewsArticleMetadata[]> {
  if (!NEWS_ARTICLE_URLS || NEWS_ARTICLE_URLS.length === 0) {
    return [];
  }

  const metadataPromises = NEWS_ARTICLE_URLS.map(async (url, index) => {
    try {
      // Use Microlink.io (free, handles CORS)
      const response = await fetch(
        `https://api.microlink.io?url=${encodeURIComponent(url)}`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch metadata: ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        id: `external-${index}-${Date.now()}`,
        url: url,
        title: data.data?.title || 'Untitled Article',
        description: data.data?.description || '',
        image: data.data?.image?.url || '/Images/first.jpg',
        source: new URL(url).hostname.replace('www.', ''),
        publishDate: data.data?.date || undefined,
      };
    } catch (error) {
      console.error(`Failed to fetch metadata for ${url}:`, error);
      // Return fallback data
      return {
        id: `external-${index}-${Date.now()}`,
        url: url,
        title: 'Article',
        description: '',
        image: '/Images/first.jpg',
        source: new URL(url).hostname.replace('www.', ''),
      };
    }
  });

  return Promise.all(metadataPromises);
}









