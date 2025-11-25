// SEO utility for generating dynamic meta tags per page
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

export const generateSEOData = (pageData: SEOData): SEOData => {
  const baseUrl = 'https://vdrs.com';
  const defaultImage = 'https://vdrs.com/Images/VDRS-lockup-mod-8-19-22-350.png';
  
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
    tags: pageData.tags
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









