import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Calendar, ArrowRight, ExternalLink, 
  X, Mail, CheckCircle, Clock, Eye
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { IMAGE_ASSIGNMENTS } from '../config/images';
import { fetchAllNewsMetadata, NewsArticleMetadata } from '../utils/fetchNewsMetadata';

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
  trending?: boolean;
  fullContent?: string;
}

const NewsMedia = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);
  const [articleViews, setArticleViews] = useState<{ [key: number]: number }>({});
  const [externalArticles, setExternalArticles] = useState<NewsArticleMetadata[]>([]);
  const [isLoadingExternal, setIsLoadingExternal] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Load article views from localStorage on mount
  useEffect(() => {
    const storedViews = localStorage.getItem('article-views');
    if (storedViews) {
      try {
        setArticleViews(JSON.parse(storedViews));
      } catch (e) {
        console.error('Error parsing article views:', e);
      }
    }
  }, []);

  // Reset visible count when search changes
  useEffect(() => {
    setVisibleCount(9);
  }, [searchTerm]);

  // Fetch external articles on mount
  useEffect(() => {
    const loadExternalArticles = async () => {
      setIsLoadingExternal(true);
      try {
        const articles = await fetchAllNewsMetadata();
        // Sort by publishDate (latest first), then by order in config if no date
        const sortedArticles = articles.sort((a, b) => {
          if (a.publishDate && b.publishDate) {
            return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
          }
          if (a.publishDate) return -1; // Articles with dates come first
          if (b.publishDate) return 1;
          return 0; // Keep original order if neither has date
        });
        setExternalArticles(sortedArticles);
      } catch (error) {
        console.error('Failed to load external articles:', error);
      } finally {
        setIsLoadingExternal(false);
      }
    };

    loadExternalArticles();
  }, []);

  // Real news data from vdrs.com - sorted by date (latest to oldest)
  const newsData: Article[] = [
    {
      id: 1,
      title: 'Van Dyk Partners with Reckelberg Environmental Technologies to Enable North American Customers to Recycle EV Batteries',
      excerpt: 'Van Dyk Recycling Solutions has signed a contract to sell equipment from Reckelberg Environmental Technologies (RET) to recycle lithium-ion batteries of all kinds and scrap fractions from battery production.',
      category: t('newsMediaArticles.categoryPartnerships'),
      date: '2024-12-13',
      readTime: '6 min read',
      image: '/Images/greyparrot-ai-recognition.jpg',
      link: 'https://vdrs.com/news-media/van-dyk-partners-with-reckelberg-environmental-technologies-to-enable-north-american-customers-to-recycle-ev-batteries/',
      type: 'html' as const
    },
    {
      id: 2,
      title: 'NWRA Announces 2025 Recycling Awards Recipients',
      excerpt: 'The National Waste & Recycling Association recognizes outstanding achievements in the recycling industry.',
      category: t('newsMediaArticles.categoryIndustryInsights'),
      date: '2024-12-10',
      readTime: '4 min read',
      image: '/Images/first.jpg',
      link: 'https://vdrs.com/news-media/nwra-announces-2025-recycling-awards-recipients/',
      type: 'html' as const
    },
    {
      id: 3,
      title: 'Equipment Enhancements Help Sunnyvale\'s Organics Operations Achieve Close to 90% Organic Recovery',
      excerpt: 'Advanced equipment upgrades significantly improve organic waste recovery rates at Sunnyvale facility.',
      category: t('newsMediaArticles.categoryCaseStudies'),
      date: '2024-11-25',
      readTime: '7 min read',
      image: '/Images/mrf-systems.jpg',
      link: 'https://vdrs.com/news-media/equipment-enhancements-help-sunnyvales-organics-operations-achieve-close-to-90-organic-recovery/',
      type: 'html' as const
    },
    {
      id: 4,
      title: 'Van Dyk in 2023: Major Projects and Expansions',
      excerpt: 'A comprehensive look at Van Dyk\'s significant projects and facility expansions throughout 2023.',
      category: t('newsMediaArticles.categoryCompanyNews'),
      date: '2024-11-20',
      readTime: '8 min read',
      image: '/Images/van-dyk-university.jpg',
      link: 'https://vdrs.com/news-media/van-dyk-in-2023-major-projects-and-expansions/',
      type: 'html' as const
    },
    {
      id: 5,
      title: 'Santa Barbara County Unveils Renewable Energy Facility in Grand Opening',
      excerpt: 'New renewable energy facility opens in Santa Barbara County, showcasing innovative waste-to-energy technology.',
      category: t('newsMediaArticles.categorySustainability'),
      date: '2024-11-15',
      readTime: '5 min read',
      image: '/Images/single-stream-recycling.jpg',
      link: 'https://vdrs.com/news-media/santa-barbara-county-unveils-renewable-energy-facility-in-grand-opening/',
      type: 'html' as const
    },
    {
      id: 6,
      title: 'Fulcrum BioEnergy: A First in Turning Trash into Fuel',
      excerpt: 'Revolutionary bioenergy facility transforms municipal waste into sustainable aviation fuel and other valuable products.',
      category: t('newsMediaArticles.categoryInnovation'),
      date: '2024-11-10',
      readTime: '6 min read',
      image: '/Images/plastics-recycling.jpg',
      link: 'https://vdrs.com/news-media/fulcrum-bioenergy-a-first-in-turning-trash-into-fuel/',
      type: 'html' as const
    },
    {
      id: 7,
      title: 'Freepoint Eco-Systems Works with Van Dyk to Open Advanced Plastic Recycling Facility in U.S.',
      excerpt: 'New state-of-the-art plastic recycling facility opens through partnership between Freepoint Eco-Systems and Van Dyk.',
      category: t('newsMediaArticles.categoryPartnerships'),
      date: '2024-11-05',
      readTime: '7 min read',
      image: '/Images/bollegraaf-products.jpg',
      link: 'https://vdrs.com/news-media/freepoint-eco-systems-works-with-van-dyk-to-open-advanced-plastic-recycling-facility-in-u-s/',
      type: 'html' as const
    },
    {
      id: 8,
      title: 'Van Dyk Recycling Solutions Hires Enrico Siewert as Director of Business Development - Plastics',
      excerpt: 'Van Dyk strengthens its plastics recycling expertise with the addition of Enrico Siewert to lead business development.',
      category: t('newsMediaArticles.categoryCompanyNews'),
      date: '2024-10-30',
      readTime: '4 min read',
      image: '/Images/van-dyk-direct.jpg',
      link: 'https://vdrs.com/news-media/van-dyk-recycling-solutions-hires-enrico-siewert-as-director-of-business-development-plastics/',
      type: 'html' as const
    },
    {
      id: 9,
      title: 'Murphy Road Recycling Announces $30 Million State-of-the-Art All American Recycling Facility in Town of Berlin',
      excerpt: 'Major investment in new recycling facility showcases advanced technology and commitment to sustainable waste management.',
      category: t('newsMediaArticles.categoryCompanyNews'),
      date: '2024-10-25',
      readTime: '6 min read',
      image: '/Images/commercial-waste-processing.jpg',
      link: 'https://vdrs.com/news-media/murphy-road-recycling-announces-30-million-state-of-the-art-all-american-recycling-facility-in-town-of-berlin/',
      type: 'html' as const
    },
    {
      id: 10,
      title: '2024 Marks Strong Year for Van Dyk',
      excerpt: 'Van Dyk Recycling Solutions celebrates a successful year with major installations, partnerships, and technological advancements.',
      category: t('newsMediaArticles.categoryCompanyNews'),
      date: '2024-10-20',
      readTime: '8 min read',
      image: '/Images/first.jpg',
      link: 'https://vdrs.com/news-media/2024-marks-strong-year-for-van-dyk/',
      type: 'html' as const
    },
    {
      id: 11,
      title: 'Why Buy Bollegraaf Baler: Testimonials from Users',
      excerpt: 'Real customer testimonials highlight the performance, reliability, and value of Bollegraaf balers in recycling operations.',
      category: t('newsMediaArticles.categoryProductUpdates'),
      date: '2024-09-15',
      readTime: '5 min read',
      image: '/Images/bollegraaf-products.jpg',
      link: 'https://vdrs.com/news-media/why-buy-bollegraaf-baler-testimonials-from-users/',
      type: 'html' as const
    },
    {
      id: 12,
      title: 'Simple Retrofit at Great Northern Fibers Has Major Impact on OCC and News Recovery',
      excerpt: 'Strategic equipment retrofit dramatically improves old corrugated cardboard and newsprint recovery rates.',
      category: t('newsMediaArticles.categoryCaseStudies'),
      date: '2024-09-10',
      readTime: '6 min read',
      image: '/Images/tomra-optical-sorting.jpg',
      link: 'https://vdrs.com/news-media/simple-retrofit-at-great-northern-fibers-has-major-impact-on-occ-and-news-recovery-2/',
      type: 'html' as const
    },
    {
      id: 13,
      title: 'A Look at the Equipment Add-Ons Helping Recycling Facilities Boost Consistency and Reduce Missorts',
      excerpt: 'Advanced equipment enhancements improve sorting accuracy and operational efficiency at material recovery facilities.',
      category: t('newsMediaArticles.categoryTechnology'),
      date: '2024-09-05',
      readTime: '7 min read',
      image: '/Images/greyparrot-ai-recognition.jpg',
      link: 'https://vdrs.com/news-media/a-look-at-the-equipment-add-ons-helping-recycling-facilities-boost-consistency-and-reduce-missorts/',
      type: 'html' as const
    },
    {
      id: 14,
      title: 'Van Dyk Recycling Solutions Introduces GÜNTHER Splitter Screen to Its Line of MRF Equipment',
      excerpt: 'New GÜNTHER splitter screen technology added to Van Dyk\'s comprehensive MRF equipment portfolio.',
      category: t('newsMediaArticles.categoryProductUpdates'),
      date: '2024-08-20',
      readTime: '5 min read',
      image: '/Images/mrf-systems.jpg',
      link: 'https://vdrs.com/news-media/van-dyk-recycling-solutions-introduces-gunther-splitter-screen-to-its-line-of-mrf-equipment-2/',
      type: 'html' as const
    },
    {
      id: 15,
      title: 'Delivering the Best Solutions to the Customer',
      excerpt: 'Van Dyk\'s commitment to customer success through innovative solutions and exceptional service.',
      category: t('newsMediaArticles.categoryCompanyNews'),
      date: '2024-08-15',
      readTime: '6 min read',
      image: '/Images/van-dyk-university.jpg',
      link: 'https://vdrs.com/news-media/delivering-the-best-solutions-to-the-customer/',
      type: 'html' as const
    },
    {
      id: 16,
      title: 'Van Dyk in 2022: From New Designs to Startups',
      excerpt: 'A retrospective look at Van Dyk\'s achievements, new designs, and facility startups throughout 2022.',
      category: t('newsMediaArticles.categoryCompanyNews'),
      date: '2024-08-10',
      readTime: '7 min read',
      image: '/Images/first.jpg',
      link: 'https://vdrs.com/news-media/van-dyk-in-2022-from-new-designs-to-startups/',
      type: 'html' as const
    },
    {
      id: 17,
      title: 'Greyparrot and Van Dyk Partner to Revolutionize U.S. Waste Sorting and Processing with AI',
      excerpt: 'Strategic partnership brings AI waste analytics to North American recycling facilities, with Van Dyk serving as exclusive U.S. distributor of Greyparrot Analyzers.',
      category: t('newsMediaArticles.categoryPartnerships'),
      date: '2024-05-02',
      readTime: '8 min read',
      image: '/Images/greyparrot-ai-recognition.jpg',
      link: 'https://vdrs.com/news-media/greyparrot-and-van-dyk-partner-to-revolutionize-u-s-waste-sorting-and-processing-with-ai/',
      type: 'html' as const
    }
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort latest to oldest

  // Format view count
  const formatViews = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  // Get view count for an article
  const getArticleViews = (articleId: number): number => {
    return articleViews[articleId] || 0;
  };

  // Increment view count when article is clicked
  const incrementViewCount = (articleId: number) => {
    setArticleViews(prev => {
      const newViews = { ...prev, [articleId]: (prev[articleId] || 0) + 1 };
      localStorage.setItem('article-views', JSON.stringify(newViews));
      return newViews;
    });
  };

  // Newsletter popup logic
  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('newsletter-popup-seen');
    const lastSeen = localStorage.getItem('newsletter-popup-last-seen');
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    let timer: number | null = null;
    if (!hasSeenPopup || (lastSeen && now - parseInt(lastSeen) > oneDay)) {
      timer = setTimeout(() => {
        setShowNewsletterPopup(true);
      }, 3000);
    }

    return () => {
      if (timer !== null) {
        clearTimeout(timer);
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
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('newsletter-popup-seen', 'true');
        localStorage.setItem('newsletter-popup-last-seen', Date.now().toString());
        localStorage.setItem('newsletter-subscribed', 'true');
        setSubscriptionSuccess(true);
        
        setTimeout(() => {
          setShowNewsletterPopup(false);
          setSubscriptionSuccess(false);
          setEmail('');
        }, 3000);
      } else {
        setEmailError(data.message || t('newsMedia.somethingWentWrong'));
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
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
    incrementViewCount(article.id);
    setSelectedArticle(article);
    setShowArticleModal(true);
  };

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 9, filteredNews.length));
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

  // Get unique categories for filtering
  const categories = ['All', ...Array.from(new Set(newsData.map(article => article.category)))];

  const filteredNews = newsData.filter(article => {
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Display only visible articles (9 at a time)
  const displayNews = filteredNews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredNews.length;

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
            {...({ fetchpriority: "high" } as any)}
            onError={(e) => {
              e.currentTarget.src = IMAGE_ASSIGNMENTS.homepage.heroFallback;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-vd-blue-dark/95 via-vd-blue/90 to-vd-blue-dark/95" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-vd-blue-dark/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
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
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mt-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeCategory === category
                      ? 'bg-vd-orange text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* News Articles - 3x4 Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-vd-blue mb-6">{t('newsMedia.latestNews')}</h2>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {displayNews.map((article) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => handleArticleClick(article)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleArticleClick(article);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Read article: ${article.title}`}
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
                      {formatViews(getArticleViews(article.id))}
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

            {/* External Articles from URLs */}
            {!isLoadingExternal && externalArticles.map((article) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => window.open(article.url, '_blank', 'noopener,noreferrer')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.open(article.url, '_blank', 'noopener,noreferrer');
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Read external article: ${article.title}`}
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = '/Images/first.jpg';
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                    {article.publishDate && (
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(article.publishDate).toLocaleDateString()}
                      </span>
                    )}
                    <span className="text-vd-orange font-medium">{article.source}</span>
                  </div>
                  <h3 className="font-bold text-vd-blue mb-3 leading-tight group-hover:text-vd-orange transition-colors text-xl">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
                    {article.description || 'Click to read full article...'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-vd-orange bg-orange-50 px-3 py-1 rounded-full">
                      External Article
                    </span>
                    <ArrowRight className="w-5 h-5 text-vd-orange group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          
          {/* Read More Button */}
          {hasMore && (
            <div className="flex justify-center mt-8">
              <motion.button
                onClick={loadMore}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-vd-orange hover:bg-vd-orange-alt text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <span>{t('newsMedia.readMore') || 'Read More'}</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          )}
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

      {/* Newsletter Popup - Floating Widget (No Backdrop) */}
      <AnimatePresence>
        {showNewsletterPopup && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-20 right-6 z-50 max-w-sm w-full mx-4"
            data-newsletter-popup
            style={{ maxHeight: 'calc(100vh - 6rem)' }}
          >
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                {/* Close Button */}
                <button
                  onClick={closePopup}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10 bg-white rounded-full p-1 hover:bg-gray-50"
                  aria-label={t('newsMedia.closeNewsletterPopup')}
                >
                  <X className="h-5 w-5" />
                </button>

                {subscriptionSuccess ? (
                  <div className="p-6 text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-vd-blue mb-2">{t('newsMedia.thankYouSubscribing')}</h3>
                    <p className="text-gray-600 text-sm">{t('newsMedia.subscriptionSuccess')}</p>
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="mb-4">
                      <Mail className="h-8 w-8 text-vd-orange mb-3" />
                      <h3 className="text-xl font-bold text-vd-blue mb-1">{t('newsMedia.stayUpdated')}</h3>
                      <p className="text-gray-600 text-sm">{t('newsMedia.newsletterDescription')}</p>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); handleSubscribe(); }} className="space-y-3">
                      <div>
                        <label htmlFor="email-subscribe" className="sr-only">Email address</label>
                        <input
                          type="email"
                          id="email-subscribe"
                          autoComplete="email"
                          placeholder={t('newsMedia.enterYourEmail')}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-vd-orange focus:border-transparent transition-all ${
                            emailError ? 'border-red-500' : 'border-gray-200'
                          }`}
                          aria-invalid={!!emailError}
                          aria-describedby={emailError ? 'email-error' : undefined}
                        />
                        {emailError && (
                          <p id="email-error" className="text-red-500 text-xs mt-1">{emailError}</p>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-vd-orange text-white py-2.5 rounded-xl font-semibold hover:bg-vd-orange-alt transition-colors flex items-center justify-center space-x-2 text-sm"
                        disabled={isSubscribing}
                      >
                        {isSubscribing ? (
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <>
                            <span>{t('newsMedia.subscribeNow')}</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleMaybeLater}
                        className="w-full text-gray-500 hover:text-gray-700 transition-colors text-xs"
                      >
                        {t('newsMedia.maybeLater')}
                      </button>
                    </form>
                  </div>
                )}
              </div>
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
