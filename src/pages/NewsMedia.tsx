import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Calendar, ArrowRight, ExternalLink, 
  X, Mail, CheckCircle, Clock, Eye
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { animationConfig } from '../utils/animations';
import { IMAGE_ASSIGNMENTS } from '../config/images';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  link: string;
  type: 'html' | 'pdf';
  views: string;
  trending?: boolean;
  fullContent?: string;
}

const NewsMedia = () => {
  const { t } = useTranslation();
  const fadeInUp = animationConfig.fadeInUp;
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [closeTimeoutId, setCloseTimeoutId] = useState<number | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showArticleModal, setShowArticleModal] = useState(false);

  // Comprehensive news data
  const newsData: Article[] = [
    {
      id: 1,
      title: t('newsMediaArticles.article1Title'),
      excerpt: t('newsMediaArticles.article1Excerpt'),
      category: t('newsMediaArticles.categoryCompanyNews'),
      date: '2024-12-20',
      readTime: '8 min read',
      image: '/Images/first.jpg',
      featured: true,
      link: '#',
      type: 'html',
      views: '2.3k',
      trending: true,
      fullContent: `<p>${t('newsMediaArticles.article1Content')}</p>`
    },
    {
      id: 2,
      title: t('newsMediaArticles.article2Title'),
      excerpt: t('newsMediaArticles.article2Excerpt'),
      category: t('newsMediaArticles.categoryProductUpdates'),
      date: '2024-12-18',
      readTime: '5 min read',
      image: '/Images/bollegraaf-products.jpg',
      featured: false,
      link: '#',
      type: 'html',
      views: '1.8k',
      trending: true
    },
    {
      id: 3,
      title: t('newsMediaArticles.article3Title'),
      excerpt: t('newsMediaArticles.article3Excerpt'),
      category: t('newsMediaArticles.categoryTechnology'),
      date: '2024-12-15',
      readTime: '6 min read',
      image: '/Images/tomra-optical-sorting.jpg',
      featured: false,
      link: '#',
      type: 'html',
      views: '1.5k'
    },
    {
      id: 4,
      title: t('newsMediaArticles.article4Title'),
      excerpt: t('newsMediaArticles.article4Excerpt'),
      category: t('newsMediaArticles.categoryIndustryInsights'),
      date: '2024-12-12',
      readTime: '10 min read',
      image: '/Images/single-stream-recycling.jpg',
      featured: true,
      link: '#',
      type: 'pdf',
      views: '3.2k',
      trending: true
    },
    {
      id: 5,
      title: t('newsMediaArticles.article5Title'),
      excerpt: t('newsMediaArticles.article5Excerpt'),
      category: t('newsMediaArticles.categoryCompanyNews'),
      date: '2024-12-10',
      readTime: '4 min read',
      image: '/Images/van-dyk-university.jpg',
      featured: false,
      link: '#',
      type: 'html',
      views: '1.2k'
    },
    {
      id: 6,
      title: t('newsMediaArticles.article6Title'),
      excerpt: t('newsMediaArticles.article6Excerpt'),
      category: t('newsMediaArticles.categorySustainability'),
      date: '2024-12-08',
      readTime: '7 min read',
      image: '/Images/mrf-systems.jpg',
      featured: false,
      link: '#',
      type: 'html',
      views: '2.1k'
    },
    {
      id: 7,
      title: t('newsMediaArticles.article7Title'),
      excerpt: t('newsMediaArticles.article7Excerpt'),
      category: t('newsMediaArticles.categoryTechnology'),
      date: '2024-12-05',
      readTime: '5 min read',
      image: '/Images/greyparrot-ai-recognition.jpg',
      featured: false,
      link: '#',
      type: 'html',
      views: '1.7k'
    },
    {
      id: 8,
      title: t('newsMediaArticles.article8Title'),
      excerpt: t('newsMediaArticles.article8Excerpt'),
      category: t('newsMediaArticles.categoryCaseStudies'),
      date: '2024-12-03',
      readTime: '9 min read',
      image: '/Images/commercial-waste-processing.jpg',
      featured: true,
      link: '#',
      type: 'html',
      views: '2.8k'
    },
    {
      id: 9,
      title: t('newsMediaArticles.article9Title'),
      excerpt: t('newsMediaArticles.article9Excerpt'),
      category: t('newsMediaArticles.categoryInnovation'),
      date: '2024-12-01',
      readTime: '6 min read',
      image: '/Images/plastics-recycling.jpg',
      featured: false,
      link: '#',
      type: 'html',
      views: '1.9k'
    },
    {
      id: 10,
      title: t('newsMediaArticles.article10Title'),
      excerpt: t('newsMediaArticles.article10Excerpt'),
      category: t('newsMediaArticles.categoryPartnerships'),
      date: '2024-11-28',
      readTime: '5 min read',
      image: '/Images/van-dyk-direct.jpg',
      featured: false,
      link: '#',
      type: 'html',
      views: '1.4k'
    }
  ];

  // Newsletter popup logic
  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('newsletter-popup-seen');
    const lastSeen = localStorage.getItem('newsletter-popup-last-seen');
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (!hasSeenPopup || (lastSeen && now - parseInt(lastSeen) > oneDay)) {
      const timer = setTimeout(() => {
        setShowNewsletterPopup(true);
      }, 3000);

      setCloseTimeoutId(timer);
    }

    return () => {
      if (closeTimeoutId) {
        clearTimeout(closeTimeoutId);
      }
    };
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async () => {
    if (!email) {
      setEmailError(t('newsMedia.pleaseEnterEmail'));
      return;
    }

    if (!validateEmail(email)) {
      setEmailError(t('newsMedia.pleaseEnterValidEmail'));
      return;
    }

    setIsSubscribing(true);
    setEmailError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      localStorage.setItem('newsletter-popup-seen', 'true');
      localStorage.setItem('newsletter-popup-last-seen', Date.now().toString());
      setSubscriptionSuccess(true);
      
      setTimeout(() => {
        setShowNewsletterPopup(false);
        setSubscriptionSuccess(false);
        setEmail('');
      }, 3000);
    } catch (error) {
      setEmailError(t('newsMedia.somethingWentWrong'));
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleMaybeLater = () => {
    localStorage.setItem('newsletter-popup-last-seen', Date.now().toString());
    setShowNewsletterPopup(false);
  };

  const closePopup = () => {
    setShowNewsletterPopup(false);
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setShowArticleModal(true);
  };

  const closeArticleModal = () => {
    setShowArticleModal(false);
    setSelectedArticle(null);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const filteredNews = newsData.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const featuredNews = filteredNews.filter(article => article.featured);
  const regularNews = filteredNews.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative text-white py-24 -mt-20 pt-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={IMAGE_ASSIGNMENTS.newsMedia.hero}
            alt="News & Media"
            className="w-full h-full object-cover object-center scale-105"
            loading="eager"
            fetchPriority="high"
            onError={(e) => {
              if (import.meta.env.DEV) {
                console.log('Hero image failed to load, using fallback');
              }
              e.currentTarget.src = IMAGE_ASSIGNMENTS.homepage.heroFallback;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-vd-blue-dark/95 via-vd-blue/90 to-vd-blue-dark/95" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-vd-blue-dark/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={fadeInUp.transition}
              className="max-w-3xl w-full"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {t('newsMedia.pageTitle')}
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                {t('newsMedia.pageDescription')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col gap-4">
            <div className="relative w-full max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('newsMedia.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-vd-orange focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Featured Articles */}
        {featuredNews.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-vd-blue mb-6">{t('newsMedia.featuredArticles')}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredNews.map((article) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onClick={() => handleArticleClick(article)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      width="600"
                      height="256"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = '/Images/first.jpg';
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-vd-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                        {t('newsMedia.featured')}
                      </span>
                    </div>
                    {article.trending && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {t('newsMedia.trending')}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(article.date)}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {article.readTime}
                      </span>
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {article.views}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-vd-blue mb-3 leading-tight group-hover:text-vd-orange transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-vd-orange bg-orange-50 px-3 py-1 rounded-full">
                        {article.category}
                      </span>
                      <ArrowRight className="w-5 h-5 text-vd-orange group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}

        {/* Regular Articles */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-vd-blue mb-6">{t('newsMedia.latestNews')}</h2>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {regularNews.map((article) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => handleArticleClick(article)}
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    width="400"
                    height="192"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = '/Images/first.jpg';
                    }}
                  />
                  {article.trending && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {t('newsMedia.trending')}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(article.date)}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {article.readTime}
                    </span>
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {article.views}
                    </span>
                  </div>
                  <h3 className="font-bold text-vd-blue mb-3 leading-tight group-hover:text-vd-orange transition-colors text-xl">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-vd-orange bg-orange-50 px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                    <ArrowRight className="w-5 h-5 text-vd-orange group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">{t('newsMedia.noArticlesFound')}</h3>
            <p className="text-gray-500">{t('newsMedia.tryAdjustingSearch')}</p>
          </div>
          )}
        </div>

      {/* Newsletter Popup */}
      <AnimatePresence>
        {showNewsletterPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closePopup}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={t('newsMedia.closeNewsletterPopup')}
              >
                <X className="h-6 w-6" />
              </button>

              {subscriptionSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-vd-blue mb-2">{t('newsMedia.thankYouSubscribing')}</h3>
                  <p className="text-gray-600">{t('newsMedia.subscriptionSuccess')}</p>
          </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <Mail className="h-12 w-12 text-vd-orange mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-vd-blue mb-2">{t('newsMedia.stayUpdated')}</h3>
                    <p className="text-gray-600">{t('newsMedia.newsletterDescription')}</p>
        </div>

                  <form onSubmit={(e) => { e.preventDefault(); handleSubscribe(); }} className="space-y-4">
                    <div>
                      <label htmlFor="email-subscribe" className="sr-only">Email address</label>
                      <input
                        type="email"
                        id="email-subscribe"
                        autoComplete="email"
                        placeholder={t('newsMedia.enterYourEmail')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-vd-orange focus:border-transparent transition-all ${
                          emailError ? 'border-red-500' : 'border-gray-200'
                        }`}
                        aria-invalid={!!emailError}
                        aria-describedby={emailError ? 'email-error' : undefined}
                      />
                      {emailError && (
                        <p id="email-error" className="text-red-500 text-sm mt-1">{emailError}</p>
                      )}
      </div>
                    <button
                      type="submit"
                      className="w-full bg-vd-orange text-white py-3 rounded-xl font-semibold hover:bg-vd-orange-alt transition-colors flex items-center justify-center space-x-2"
                      disabled={isSubscribing}
                    >
                      {isSubscribing ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <>
                          <span>{t('newsMedia.subscribeNow')}</span>
                          <ArrowRight className="h-5 w-5" />
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleMaybeLater}
                      className="w-full text-gray-500 hover:text-gray-700 transition-colors text-sm"
                    >
                      {t('newsMedia.maybeLater')}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Article Modal */}
      <AnimatePresence>
        {showArticleModal && selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeArticleModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative h-64 bg-gradient-to-r from-vd-blue-dark to-vd-blue">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover opacity-80"
                  width="800"
                  height="256"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/Images/first.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
                  <h2 className="text-4xl font-bold text-white mb-2 leading-tight">{selectedArticle.title}</h2>
                </div>
                <button
                  onClick={closeArticleModal}
                  className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors bg-black/30 rounded-full p-2"
                  aria-label={t('newsMedia.closeArticleModal')}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-vd-orange scrollbar-track-gray-100 max-h-[calc(90vh-16rem)]">
                <div className="flex items-center text-sm text-gray-600 mb-4 space-x-4">
                  <span>{selectedArticle.category}</span>
                  <span>•</span>
                  <span>{formatDate(selectedArticle.date)}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
                {selectedArticle.fullContent ? (
                  <div className="prose max-w-none text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedArticle.fullContent }} />
                ) : (
                  <div className="space-y-4">
                    <p className="text-gray-800 leading-relaxed text-lg">
                      {selectedArticle.excerpt}
                    </p>
                    <a 
                      href={selectedArticle.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center text-vd-orange hover:text-vd-blue font-semibold"
                    >
                      {t('newsMedia.readFullArticle')}
                      <ExternalLink className="inline-block w-4 h-4 ml-1" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsMedia;
