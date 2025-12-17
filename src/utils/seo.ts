/**
 * @fileoverview SEO utility for generating dynamic meta tags per page.
 * Provides structured data for search engines and social media sharing.
 * @author Van Dyk Recycling Solutions
 * @module utils/seo
 */

/**
 * SEO metadata structure for pages.
 * 
 * @interface SEOData
 * @property {string} title - Page title (will be prefixed with site name)
 * @property {string} description - Meta description for search engines
 * @property {string} [keywords] - Comma-separated keywords
 * @property {string} [image] - Open Graph image URL
 * @property {string} [url] - Canonical URL for the page
 * @property {'website' | 'article' | 'product'} [type='website'] - Open Graph type
 * @property {string} [publishedTime] - ISO 8601 publication date
 * @property {string} [modifiedTime] - ISO 8601 modification date
 * @property {string} [author] - Author name
 * @property {string} [section] - Content section/category
 * @property {string[]} [tags] - Content tags
 */
export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

/**
 * Generates complete SEO data with language support and hreflang URLs.
 * Automatically adds site name to title, generates canonical URLs, and creates
 * hreflang links for multi-language support.
 * 
 * @param {SEOData} pageData - Base SEO data for the page
 * @param {string} [language='en'] - Current language code
 * @param {string} [pathname='/'] - Current page pathname
 * @returns {SEOData & { hreflangUrls?: { lang: string; url: string }[] }} Complete SEO data with hreflang URLs
 * 
 * @example
 * ```typescript
 * const seoData = generateSEOData({
 *   title: 'Equipment Catalog',
 *   description: 'Browse our recycling equipment',
 *   url: '/equipment'
 * }, 'en', '/equipment');
 * 
 * // Returns: {
 * //   title: 'Equipment Catalog | Van Dyk Recycling Solutions',
 * //   description: 'Browse our recycling equipment',
 * //   url: 'https://vdrs.com/equipment',
 * //   hreflangUrls: [
 * //     { lang: 'en', url: 'https://vdrs.com/en/equipment' },
 * //     { lang: 'fr', url: 'https://vdrs.com/fr/equipment' },
 * //     ...
 * //   ]
 * // }
 * ```
 */
export const generateSEOData = (
  pageData: SEOData,
  language: string = 'en',
  pathname: string = '/'
): SEOData & { hreflangUrls?: { lang: string; url: string }[] } => {
  const baseUrl = 'https://vdrs.com';
  const defaultImage = 'https://vdrs.com/Images/VDRS-lockup-mod-8-19-22-350.png';
  
  // Generate language-prefixed URLs for hreflang
  // Note: This assumes route-based language routing will be implemented
  // For now, URLs will be /en/path, /fr/path, /es/path
  const currentPath = pageData.url || pathname;
  const hreflangUrls = [
    { lang: 'en', url: `${baseUrl}/en${currentPath === '/' ? '' : currentPath}` },
    { lang: 'fr', url: `${baseUrl}/fr${currentPath === '/' ? '' : currentPath}` },
    { lang: 'es', url: `${baseUrl}/es${currentPath === '/' ? '' : currentPath}` },
    { lang: 'x-default', url: `${baseUrl}/en${currentPath === '/' ? '' : currentPath}` }
  ];
  
  return {
    title: `${pageData.title} | Van Dyk Recycling Solutions`,
    description: pageData.description,
    keywords: pageData.keywords || 'recycling equipment, waste management, MRF, material recovery, optical sorting, balers, recycling solutions, sustainable technology, environmental solutions',
    image: pageData.image || defaultImage,
    url: pageData.url ? `${baseUrl}${pageData.url}` : baseUrl,
    type: pageData.type || 'website',
    publishedTime: pageData.publishedTime,
    modifiedTime: pageData.modifiedTime,
    author: pageData.author || 'Van Dyk Recycling Solutions',
    section: pageData.section,
    tags: pageData.tags,
    hreflangUrls
  };
};

// Predefined SEO data for common pages
export const SEO_PAGES = {
  home: {
    title: 'Leading Recycling Equipment & Technology Since 1984',
    description: 'Van Dyk Recycling Solutions is the leading provider of recycling equipment and technology since 1984. We offer Bollegraaf balers, TOMRA optical sorting, MRF solutions, and comprehensive recycling services across North America.',
    keywords: 'recycling equipment, waste management, MRF, material recovery facility, optical sorting, Bollegraaf balers, TOMRA sorting, recycling technology, sustainable solutions, environmental technology, waste processing, recycling systems, single stream recycling, recycling consulting, recycling training, Van Dyk Recycling Solutions',
    url: '/'
  },
  
  equipment: {
    title: 'Recycling Equipment & Machinery',
    description: 'Explore our comprehensive range of recycling equipment including Bollegraaf balers, TOMRA optical sorters, Lubo screens, and more. Industry-leading technology for efficient waste processing.',
    keywords: 'recycling equipment, balers, optical sorters, screens, waste processing machinery, Bollegraaf, TOMRA, Lubo, recycling technology',
    url: '/equipment'
  },
  
  solutions: {
    title: 'Recycling Solutions & Services',
    description: 'Comprehensive recycling solutions for single stream, MSW processing, C&D recycling, organics processing, and more. Custom solutions for your waste management needs.',
    keywords: 'recycling solutions, single stream recycling, MSW processing, C&D recycling, organics processing, waste management solutions, recycling services',
    url: '/solutions'
  },
  
  contact: {
    title: 'Contact Us - Get Your Quote Today',
    description: 'Contact Van Dyk Recycling Solutions for expert consultation, equipment quotes, and support. Call 203-967-1100 or send us a message for immediate assistance.',
    keywords: 'contact Van Dyk, recycling equipment quote, recycling consultation, customer support, recycling experts',
    url: '/contact'
  },
  
  about: {
    title: 'About Van Dyk Recycling Solutions',
    description: 'Learn about Van Dyk Recycling Solutions - the world leader in recycling sorting systems since 1984. Our innovative team delivers cutting-edge technology and exceptional service.',
    keywords: 'about Van Dyk, company history, recycling industry leader, innovative technology, recycling experts, company culture',
    url: '/about'
  },
  
  careers: {
    title: 'Careers at Van Dyk Recycling Solutions',
    description: 'Join our growing team of recycling professionals. Explore career opportunities in field service, mechanical installation, and technical support across North America.',
    keywords: 'careers, jobs, employment, field service technician, mechanical installer, recycling careers, Van Dyk jobs',
    url: '/careers'
  },
  
  faq: {
    title: 'Recycling Equipment FAQs - Van Dyk Recycling Solutions',
    description: 'Get answers to common questions about recycling equipment, MRF systems, sorting technology, and recycling processes. Expert guidance on choosing, maintaining, and optimizing recycling systems.',
    keywords: 'recycling equipment FAQs, MRF equipment, recycling systems, sorting technology, single stream recycling FAQs, plastic recycling, recycling sorting, material recovery facility, recycling equipment questions, recycling technology FAQs, MRF FAQs, optical sorting FAQs, baler FAQs, recycling maintenance FAQs',
    url: '/faq'
  },
  
  
  privacy: {
    title: 'Privacy Policy',
    description: 'Van Dyk Recycling Solutions Privacy Policy - Learn how we collect, use, and protect your personal information when you visit our website or use our services.',
    keywords: 'privacy policy, data protection, personal information, GDPR compliance',
    url: '/privacy-policy'
  },

  cookie: {
    title: 'Cookie Policy',
    description: 'Understand how Van Dyk Recycling Solutions uses cookies, analytics, and tracking technologies, plus how you can manage your preferences.',
    keywords: 'cookie policy, cookies, tracking technologies, GDPR cookies, CCPA cookies',
    url: '/cookie-policy'
  },

  ccpa: {
    title: 'California Privacy Rights (CCPA/CPRA)',
    description: 'Your California privacy rights under the California Consumer Privacy Act and California Privacy Rights Act. Learn how to exercise your rights to access, delete, and opt-out of data sales.',
    keywords: 'CCPA, CPRA, California privacy rights, do not sell my information, California consumer privacy',
    url: '/ccpa-rights'
  },

  gdpr: {
    title: 'GDPR Rights - Data Protection',
    description: 'Exercise your data protection rights under the General Data Protection Regulation (GDPR). Request access, deletion, portability, and more.',
    keywords: 'GDPR rights, data protection, privacy rights, data access, data deletion, EU privacy',
    url: '/gdpr-rights'
  },

  accessibility: {
    title: 'Accessibility Statement',
    description: 'Van Dyk Recycling Solutions commitment to digital accessibility. Learn about our WCAG 2.1 AA compliance and accessibility features.',
    keywords: 'accessibility, WCAG, digital accessibility, accessible website, disability access',
    url: '/accessibility'
  },

  terms: {
    title: 'Terms of Service',
    description: 'Terms of Service for Van Dyk Recycling Solutions website. Read our usage terms, liability limitations, and intellectual property rights.',
    keywords: 'terms of service, terms and conditions, website terms, usage agreement',
    url: '/terms'
  }
};

// Equipment-specific SEO data
export const EQUIPMENT_SEO = {
  bollegraaf: {
    title: 'Bollegraaf Balers - High Production Recycling Equipment',
    description: 'Bollegraaf balers deliver exceptional performance for single stream recycling, MSW processing, and commercial waste. Industry-leading technology with unmatched reliability.',
    keywords: 'Bollegraaf balers, high production balers, single stream recycling, MSW processing, commercial waste, recycling balers',
    url: '/equipment/bollegraaf'
  },
  
  tomra: {
    title: 'TOMRA Optical Sorting Technology',
    description: 'Advanced TOMRA optical sorting systems for precise material separation. AI-powered technology for maximum recovery rates and operational efficiency.',
    keywords: 'TOMRA optical sorting, optical sorters, material separation, AI sorting, recycling technology, waste sorting',
    url: '/equipment/tomra'
  },
  
  lubo: {
    title: 'Lubo StarScreen Technology - Advanced Screening Solutions',
    description: 'Lubo StarScreen technology provides superior screening performance for single stream recycling, MSW processing, and C&D waste. Non-wrapping design for maximum efficiency.',
    keywords: 'Lubo StarScreen, screening technology, non-wrapping screens, single stream recycling, MSW processing, C&D waste',
    url: '/equipment/lubo-screening'
  }
};

// Solution-specific SEO data
export const SOLUTION_SEO = {
  singleStream: {
    title: 'Single Stream Recycling Solutions',
    description: 'Comprehensive single stream recycling solutions with advanced sorting technology. Maximize recovery rates and operational efficiency with our proven systems.',
    keywords: 'single stream recycling, recycling solutions, material recovery facility, MRF, sorting technology',
    url: '/solutions/single-stream-recycling'
  },
  
  mswProcessing: {
    title: 'MSW Processing Solutions',
    description: 'Municipal solid waste processing solutions with advanced sorting and separation technology. Efficient processing for maximum material recovery.',
    keywords: 'MSW processing, municipal solid waste, waste processing, material recovery, sorting systems',
    url: '/solutions/msw-processing'
  },
  
  organicsProcessing: {
    title: 'Organics Processing Solutions',
    description: 'Comprehensive organics processing solutions for food waste, yard waste, and compostable materials. Advanced technology for efficient organic waste management.',
    keywords: 'organics processing, food waste processing, compost processing, organic waste management, composting solutions',
    url: '/solutions/organics-processing'
  }
};









