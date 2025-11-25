import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight, ExternalLink } from 'lucide-react';

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  link: string;
  featured?: boolean;
}

interface NewsSlideshowProps {
  className?: string;
}

const NewsSlideshow: React.FC<NewsSlideshowProps> = ({ className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Recent news articles - you can update this with actual news data
  const newsArticles: NewsArticle[] = [
    {
      id: 1,
      title: 'Van Dyk Recycling Solutions Celebrates 40 Years of Innovation',
      excerpt: 'Four decades of pioneering recycling solutions, from humble origins to industry leadership in advanced waste processing and material recovery systems.',
      category: 'Company News',
      date: '2024-12-20',
      image: '/Images/first.jpg',
      link: '/news-media',
      featured: true
    },
    {
      id: 2,
      title: 'New Bollegraaf Baler Technology Increases Efficiency by 35%',
      excerpt: 'Latest generation balers feature advanced automation and improved material handling capabilities for enhanced productivity.',
      category: 'Product Updates',
      date: '2024-12-18',
      image: '/Images/bollegraaf-products.jpg',
      link: '/news-media',
      featured: false
    },
    {
      id: 3,
      title: 'TOMRA Optical Sorting Systems Revolutionize Material Recovery',
      excerpt: 'Advanced AI-powered sorting technology enables precise material identification and separation for maximum recovery rates.',
      category: 'Technology',
      date: '2024-12-15',
      image: '/Images/tomra-optical-sorting.jpg',
      link: '/news-media',
      featured: false
    },
    {
      id: 4,
      title: 'Industry Report: Single Stream Recycling Trends 2024',
      excerpt: 'Comprehensive analysis of current trends, challenges, and opportunities in single stream recycling operations.',
      category: 'Industry Insights',
      date: '2024-12-12',
      image: '/Images/single-stream-recycling.jpg',
      link: '/news-media',
      featured: false
    }
  ];

  // Auto-rotate slides
  useEffect(() => {
    if (autoPlay && newsArticles.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % newsArticles.length);
      }, 6000); // Change every 6 seconds

      return () => clearInterval(interval);
    }
  }, [autoPlay, newsArticles.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % newsArticles.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000); // Resume auto-play after 10 seconds
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + newsArticles.length) % newsArticles.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000); // Resume auto-play after 10 seconds
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000); // Resume auto-play after 10 seconds
  };

  const currentArticle = newsArticles[currentIndex];

  return (
    <div className={`bg-gradient-to-br from-vd-blue to-vd-blue-dark text-white py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-64 md:h-96 overflow-hidden">
                  <img
                    src={currentArticle.image}
                    alt={currentArticle.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/Images/first.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {currentArticle.featured && (
                    <div className="absolute top-4 left-4 bg-vd-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 flex flex-col justify-center bg-white">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-vd-orange font-semibold text-sm uppercase tracking-wide">
                      {currentArticle.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(currentArticle.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-vd-blue-dark mb-4 leading-tight">
                    {currentArticle.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {currentArticle.excerpt}
                  </p>
                  
                  <Link
                    to={currentArticle.link}
                    className="inline-flex items-center text-vd-orange hover:text-vd-orange-alt font-semibold transition-colors group"
                  >
                    Read Full Article
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          {newsArticles.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-vd-orange hover:text-white z-10 border-2 border-gray-200 hover:border-vd-orange"
                aria-label="Previous article"
              >
                <ChevronLeft className="w-6 h-6 text-vd-blue-dark hover:text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-vd-orange hover:text-white z-10 border-2 border-gray-200 hover:border-vd-orange"
                aria-label="Next article"
              >
                <ChevronRight className="w-6 h-6 text-vd-blue-dark hover:text-white" />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {newsArticles.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'w-8 bg-white'
                        : 'w-2 bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to article ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* View All News Link */}
          <div className="text-center mt-8">
            <Link
              to="/news-media"
              className="inline-flex items-center text-white hover:text-vd-orange font-semibold transition-colors group"
            >
              View All News Articles
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSlideshow;

