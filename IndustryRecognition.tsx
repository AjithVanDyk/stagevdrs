import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building2, Newspaper, Award, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface Organization {
  name: string;
  logo: string;
  url?: string;
}

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  image?: string;
  date: string;
  link?: string;
  type: 'news' | 'trade-show' | 'featured';
}

interface IndustryRecognitionProps {
  className?: string;
  displayMode?: 'organizations' | 'news-carousel' | 'hybrid';
}

const IndustryRecognition: React.FC<IndustryRecognitionProps> = ({ 
  className = '',
  displayMode = 'hybrid'
}) => {
  const { t } = useTranslation();
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // Organization memberships
  const organizations: Organization[] = [
    {
      name: 'NWRA',
      logo: '/Images/orgs/nwra_logo.jpg',
      url: 'https://www.wasterecycling.org/'
    },
    {
      name: 'ASR',
      logo: '/Images/orgs/asr.jpg',
      url: 'https://www.asrrecycling.org/'
    },
    {
      name: 'CDRA',
      logo: '/Images/orgs/CDRA_Logo.jpg',
      url: 'https://www.cdrecycling.org/'
    },
    // Add more organizations as needed
  ];

  // Recent news, featured articles, and trade show appearances
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: 'Featured in Recycling Today',
      excerpt: 'Van Dyk\'s innovative sorting technology highlighted in industry publication',
      date: '2024-12-15',
      link: '/news-media',
      type: 'featured'
    },
    {
      id: 2,
      title: 'WasteExpo 2024',
      excerpt: 'Join us at the premier waste industry trade show',
      date: '2024-05-01',
      link: '/news-media',
      type: 'trade-show'
    },
    {
      id: 3,
      title: 'Industry Recognition Award',
      excerpt: 'Recognized for excellence in recycling innovation',
      date: '2024-11-20',
      link: '/news-media',
      type: 'news'
    },
    // Add more items as you provide them
  ];

  // Auto-rotate news items
  useEffect(() => {
    if (autoPlay && displayMode !== 'organizations' && newsItems.length > 1) {
      const interval = setInterval(() => {
        setCurrentNewsIndex((prev) => (prev + 1) % newsItems.length);
      }, 5000); // Change every 5 seconds

      return () => clearInterval(interval);
    }
  }, [autoPlay, displayMode, newsItems.length]);

  const nextNews = () => {
    setCurrentNewsIndex((prev) => (prev + 1) % newsItems.length);
    setAutoPlay(false);
  };

  const prevNews = () => {
    setCurrentNewsIndex((prev) => (prev - 1 + newsItems.length) % newsItems.length);
    setAutoPlay(false);
  };

  // Organization logos section
  const OrganizationsSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full"
    >
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-vd-orange/10 rounded-lg mb-4">
          <Building2 className="w-6 h-6 text-vd-orange" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-vd-blue-dark mb-3">
          {t('industryRecognition.proudMembers')}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('industryRecognition.membersDescription')}
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 lg:gap-20 max-w-6xl mx-auto">
        {organizations.filter(org => !imageErrors.has(org.name)).map((org, index) => (
          <motion.div
            key={org.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center w-32 md:w-40 h-24 md:h-28 transition-transform duration-300 hover:scale-105"
          >
            {org.url ? (
              <a
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full flex items-center justify-center"
                aria-label={`Visit ${org.name} website`}
              >
                <img
                  src={org.logo}
                  alt={`${org.name} logo`}
                  className="max-w-full max-h-full w-auto h-auto object-contain transition-all duration-300"
                  onError={() => {
                    setImageErrors((prev) => new Set(prev).add(org.name));
                  }}
                />
              </a>
            ) : (
              <img
                src={org.logo}
                alt={`${org.name} logo`}
                className="max-w-full max-h-full w-auto h-auto object-contain transition-all duration-300"
                onError={() => {
                  setImageErrors((prev) => new Set(prev).add(org.name));
                }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  // News carousel section
  const NewsCarouselSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-vd-orange/10 rounded-lg mb-4">
          <Newspaper className="w-6 h-6 text-vd-orange" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-vd-blue-dark mb-3">
          {t('industryRecognition.featuredInNews')}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('industryRecognition.newsDescription')}
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentNewsIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-8 md:p-12"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  {newsItems[currentNewsIndex].type === 'featured' && (
                    <Award className="w-5 h-5 text-vd-orange" />
                  )}
                  <span className="text-sm text-vd-orange font-semibold uppercase tracking-wide">
                    {newsItems[currentNewsIndex].type === 'featured' ? t('industryRecognition.featured') : 
                     newsItems[currentNewsIndex].type === 'trade-show' ? t('industryRecognition.tradeShow') : t('industryRecognition.news')}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(newsItems[currentNewsIndex].date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-vd-blue-dark mb-3">
                  {newsItems[currentNewsIndex].title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {newsItems[currentNewsIndex].excerpt}
                </p>
                {newsItems[currentNewsIndex].link && (
                  <Link
                    to={newsItems[currentNewsIndex].link!}
                    className="inline-flex items-center text-vd-orange hover:text-vd-orange-alt font-semibold transition-colors"
                  >
                    {t('industryRecognition.learnMore')}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation controls */}
        {newsItems.length > 1 && (
          <>
            <button
              onClick={prevNews}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-vd-orange hover:text-white"
              aria-label="Previous news item"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextNews}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-vd-orange hover:text-white"
              aria-label="Next news item"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {newsItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentNewsIndex(index);
                    setAutoPlay(false);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentNewsIndex
                      ? 'w-8 bg-vd-orange'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to news item ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );

  // Hybrid mode - organizations only (news removed since NewsSlideshow is used separately)
  const HybridSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full"
    >
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-vd-orange/10 rounded-lg mb-4">
          <Building2 className="w-6 h-6 text-vd-orange" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-vd-blue-dark mb-3">
          {t('industryRecognition.industryOrganizations')}
        </h2>
        <p className="text-gray-600 text-sm">
          {t('industryRecognition.organizationsDescription')}
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10 items-center justify-items-center max-w-5xl mx-auto">
        {organizations.filter(org => !imageErrors.has(org.name)).map((org, index) => (
          <motion.div
            key={org.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center w-full h-24 md:h-28 transition-transform duration-300 hover:scale-105"
          >
            {org.url ? (
              <a
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full flex items-center justify-center"
                aria-label={`Visit ${org.name} website`}
              >
                <img
                  src={org.logo}
                  alt={`${org.name} logo`}
                  className="max-h-20 md:max-h-24 w-auto object-contain transition-all duration-300"
                  onError={() => {
                    setImageErrors((prev) => new Set(prev).add(org.name));
                  }}
                />
              </a>
            ) : (
              <img
                src={org.logo}
                alt={`${org.name} logo`}
                className="max-h-20 md:max-h-24 w-auto object-contain transition-all duration-300"
                onError={() => {
                  setImageErrors((prev) => new Set(prev).add(org.name));
                }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className={`bg-gray-50 py-16 ${className}`}>
      <div className="container mx-auto px-4">
        {displayMode === 'organizations' && <OrganizationsSection />}
        {displayMode === 'news-carousel' && <NewsCarouselSection />}
        {displayMode === 'hybrid' && <HybridSection />}
      </div>
    </div>
  );
};

export default IndustryRecognition;

