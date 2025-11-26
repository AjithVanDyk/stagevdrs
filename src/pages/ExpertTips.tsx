import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Eye, X, BookOpen, Lightbulb } from 'lucide-react';
import { animationConfig } from '../utils/animations';
import { useTranslation } from '../hooks/useTranslation';

interface ExpertTip {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  link: string;
  views: string;
  featured?: boolean;
  trending?: boolean;
  fullContent?: string;
}

const ExpertTips = () => {
  const { t } = useTranslation();
  const [selectedTip, setSelectedTip] = useState<ExpertTip | null>(null);
  const [showTipModal, setShowTipModal] = useState(false);
  const fadeInUp = animationConfig.fadeInUp;

  const expertTips: ExpertTip[] = [
    {
      id: 1,
      title: t('expertTips.tip1Title'),
      description: t('expertTips.tip1Description'),
      category: t('expertTips.categoryMaintenance'),
      date: '2024-12-20',
      readTime: '8 min read',
      image: '/Images/bollegraaf-products.jpg',
      link: 'https://vdrs.com/expert-tips/maximizing-baler-efficiency/',
      views: '2.3k',
      featured: true,
      trending: true,
      fullContent: `<p>${t('expertTips.tip1Content')}</p>`
    },
    {
      id: 2,
      title: t('expertTips.tip2Title'),
      description: t('expertTips.tip2Description'),
      category: t('expertTips.categoryTechnology'),
      date: '2024-12-18',
      readTime: '6 min read',
      image: '/Images/tomra-optical-sorting.jpg',
      link: 'https://vdrs.com/expert-tips/optical-sorting-optimization/',
      views: '1.8k',
      featured: true
    },
    {
      id: 3,
      title: t('expertTips.tip3Title'),
      description: t('expertTips.tip3Description'),
      category: t('expertTips.categoryProcessing'),
      date: '2024-12-15',
      readTime: '7 min read',
      image: '/Images/single-stream-recycling.jpg',
      link: 'https://vdrs.com/expert-tips/single-stream-mistakes/',
      views: '1.5k',
      trending: true
    },
    {
      id: 4,
      title: t('expertTips.tip4Title'),
      description: t('expertTips.tip4Description'),
      category: t('expertTips.categorySafety'),
      date: '2024-12-12',
      readTime: '5 min read',
      image: '/Images/smicon-depackager.jpg',
      link: 'https://vdrs.com/expert-tips/food-waste-depackaging/',
      views: '1.2k'
    },
    {
      id: 5,
      title: t('expertTips.tip5Title'),
      description: t('expertTips.tip5Description'),
      category: t('expertTips.categoryDesign'),
      date: '2024-12-10',
      readTime: '9 min read',
      image: '/Images/mrf-systems.jpg',
      link: 'https://vdrs.com/expert-tips/mrf-design-optimization/',
      views: '2.1k',
      featured: true
    },
    {
      id: 6,
      title: t('expertTips.tip6Title'),
      description: t('expertTips.tip6Description'),
      category: t('expertTips.categoryEnvironmental'),
      date: '2024-12-08',
      readTime: '6 min read',
      image: '/Images/centriair-equipment.jpg',
      link: 'https://vdrs.com/expert-tips/odor-control-best-practices/',
      views: '1.7k'
    },
    {
      id: 7,
      title: t('expertTips.tip7Title'),
      description: t('expertTips.tip7Description'),
      category: t('expertTips.categoryTroubleshooting'),
      date: '2024-12-05',
      readTime: '8 min read',
      image: '/Images/image-1749759453479.png', // Fallback: equipment-maintenance.jpg not found
      link: 'https://vdrs.com/expert-tips/equipment-troubleshooting/',
      views: '1.9k',
      trending: true
    },
    {
      id: 8,
      title: t('expertTips.tip8Title'),
      description: t('expertTips.tip8Description'),
      category: t('expertTips.categoryEfficiency'),
      date: '2024-12-03',
      readTime: '7 min read',
      image: '/Images/image-1749759453479.png', // Fallback: energy-efficiency.jpg not found
      link: 'https://vdrs.com/expert-tips/energy-efficiency-mrfs/',
      views: '1.4k'
    },
    {
      id: 9,
      title: t('expertTips.tip9Title'),
      description: t('expertTips.tip9Description'),
      category: t('expertTips.categoryQuality'),
      date: '2024-12-01',
      readTime: '6 min read',
      image: '/Images/image-1749759453479.png', // Fallback: material-quality.jpg not found
      link: 'https://vdrs.com/expert-tips/material-quality-control/',
      views: '1.6k'
    },
    {
      id: 10,
      title: t('expertTips.tip10Title'),
      description: t('expertTips.tip10Description'),
      category: t('expertTips.categoryTraining'),
      date: '2024-11-28',
      readTime: '5 min read',
      image: '/Images/van-dyk-university.jpg', // Using training-related image
      link: 'https://vdrs.com/expert-tips/staff-training-programs/',
      views: '1.3k'
    }
  ];

  const handleTipClick = (tip: ExpertTip) => {
    setSelectedTip(tip);
    setShowTipModal(true);
  };

  const closeTipModal = () => {
    setShowTipModal(false);
    setSelectedTip(null);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Sort tips by date (most recent first)
  const sortedTips = [...expertTips].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  const filteredTips = sortedTips;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative text-white py-24 -mt-20 pt-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/Images/impactreactor-RET.jpg"
            alt="Expert Tips"
            className="w-full h-full object-cover object-center scale-105"
            loading="eager"
            fetchPriority="high"
            onError={(e) => {
              if (import.meta.env.DEV) {
                console.log('Hero image failed to load, using fallback');
              }
              e.currentTarget.src = '/Images/first.jpg';
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
                Expert Tips
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Get professional advice from our recycling experts on best practices, maintenance, and maximizing your system's performance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Expert Tips Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-vd-blue mb-6">Expert Tips</h2>
          {filteredTips.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No expert tips found</h3>
              <p className="text-gray-500">Please check back soon for more articles.</p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredTips.map((tip) => (
                <motion.div
                  key={tip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 25,
                    duration: 0.6
                  }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onClick={() => handleTipClick(tip)}
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={tip.image}
                      alt={tip.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      width="400"
                      height="192"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = '/Images/first.jpg';
                      }}
                    />
                    {tip.trending && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Trending
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-white/90 rounded-full p-2">
                        <Lightbulb className="w-5 h-5 text-vd-orange" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(tip.date)}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {tip.readTime}
                      </span>
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {tip.views}
                      </span>
                    </div>
                    <h3 className="font-bold text-vd-blue mb-3 leading-tight group-hover:text-vd-orange transition-colors text-xl">
                      {tip.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {tip.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-vd-orange bg-orange-50 px-3 py-1 rounded-full">
                        {tip.category}
                      </span>
                      <BookOpen className="w-5 h-5 text-vd-orange group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tip Modal */}
      <AnimatePresence>
        {showTipModal && selectedTip && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeTipModal}
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
                  src={selectedTip.image}
                  alt={selectedTip.title}
                  className="w-full h-full object-cover opacity-80"
                  width="800"
                  height="256"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/Images/first.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
                  <h2 className="text-4xl font-bold text-white mb-2 leading-tight">{selectedTip.title}</h2>
                </div>
                <button
                  onClick={closeTipModal}
                  className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors bg-black/30 rounded-full p-2"
                  aria-label="Close tip modal"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-vd-orange scrollbar-track-gray-100 max-h-[calc(90vh-16rem)]">
                <div className="flex items-center text-sm text-gray-600 mb-4 space-x-4">
                  <span>{selectedTip.category}</span>
                  <span>•</span>
                  <span>{formatDate(selectedTip.date)}</span>
                  <span>•</span>
                  <span>{selectedTip.readTime}</span>
                  <span>•</span>
                  <span>{selectedTip.views} views</span>
                </div>
                {selectedTip.fullContent ? (
                  <div className="prose max-w-none text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedTip.fullContent }} />
                ) : (
                  <div className="space-y-4">
                    <p className="text-gray-800 leading-relaxed text-lg">
                      {selectedTip.description}
                    </p>
                    <div className="bg-gray-100 rounded-xl p-6 text-center">
                      <div className="mb-4">
                        <BookOpen className="w-16 h-16 text-vd-orange mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-vd-blue mb-2">Read Full Article</h3>
                        <p className="text-gray-600 mb-4">Click the button below to read the complete expert tip</p>
                      </div>
                      <a 
                        href={selectedTip.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center bg-vd-orange hover:bg-vd-orange-alt text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                      >
                        <BookOpen className="w-5 h-5 mr-2" />
                        Read Full Article
                      </a>
                    </div>
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

export default ExpertTips;







