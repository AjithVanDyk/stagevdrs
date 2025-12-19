import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lightbulb, Cog, Wrench, Headphones } from 'lucide-react';
import { useMemo, useRef, useEffect, useState, useCallback } from 'react';
import { IMAGE_ASSIGNMENTS } from '../config/images';
import SEO from '../components/SEO';
import { SEO_PAGES } from '../utils/seo';
import IndustryRecognition from '../components/IndustryRecognition';
import NewsSlideshow from '../components/NewsSlideshow';
import { useTranslation } from '../hooks/useTranslation';
import { trackButtonClick, getMostClickedButtons } from '../utils/analytics';

interface HomepageButton {
  id: string;
  url: string;
  label: string;
  translationKey: string;
}

const Home = () => {
  const { t } = useTranslation();
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, margin: '-100px' });
  
  // Pool of available homepage buttons
  const buttonPool: HomepageButton[] = useMemo(() => [
    { id: 'equipment', url: '/equipment', label: t('home.bollegraafBalers'), translationKey: 'home.bollegraafBalers' },
    { id: 'contact-recyclable', url: '/contact', label: t('home.isProductRecyclable'), translationKey: 'home.isProductRecyclable' },
    { id: 'solutions-food', url: '/solutions', label: t('home.highVolumeFoodDepackaging'), translationKey: 'home.highVolumeFoodDepackaging' },
    { id: 'solutions-odor', url: '/solutions', label: t('home.gotOdorProblems'), translationKey: 'home.gotOdorProblems' },
    { id: 'quote', url: '/quote', label: t('common.getAQuote'), translationKey: 'common.getAQuote' },
    { id: 'services', url: '/support', label: t('nav.services'), translationKey: 'nav.services' },
    { id: 'about', url: '/about', label: t('nav.aboutUs'), translationKey: 'nav.aboutUs' },
    { id: 'careers', url: '/careers', label: t('nav.careers'), translationKey: 'nav.careers' },
  ], [t]);

  // Get displayed buttons - rotate based on most clicked (hybrid approach)
  const [displayedButtons, setDisplayedButtons] = useState<HomepageButton[]>([]);

  // Function to update displayed buttons based on click data
  const updateDisplayedButtons = useCallback(() => {
    // Get most clicked buttons
    const mostClicked = getMostClickedButtons(8); // Get more to have better selection
    
    if (mostClicked.length >= 1) {
      // Hybrid approach: Mix popular buttons with random ones
      // Take top clicked buttons (up to 2-3), fill rest with random from pool
      const numPopularButtons = Math.min(3, mostClicked.length);
      const popularButtonIds = new Set(mostClicked.slice(0, numPopularButtons).map(b => b.buttonId));
      
      // Get popular button objects from pool
      const popularButtons = buttonPool
        .filter(btn => popularButtonIds.has(btn.id))
        .sort((a, b) => {
          const aIndex = mostClicked.findIndex(tb => tb.buttonId === a.id);
          const bIndex = mostClicked.findIndex(tb => tb.buttonId === b.id);
          return aIndex - bIndex;
        });
      
      // Fill remaining slots with random buttons from pool that aren't already selected
      const remainingSlots = 4 - popularButtons.length;
      const availableButtons = buttonPool.filter(btn => !popularButtonIds.has(btn.id));
      const shuffled = [...availableButtons].sort(() => Math.random() - 0.5);
      const randomButtons = shuffled.slice(0, remainingSlots);
      
      // Combine popular and random buttons
      const selectedButtons = [...popularButtons, ...randomButtons].slice(0, 4);
      setDisplayedButtons(selectedButtons);
    } else {
      // Not enough data yet, use default buttons (first 4 from pool)
      setDisplayedButtons(buttonPool.slice(0, 4));
    }
  }, [buttonPool]);

  useEffect(() => {
    // Initial load - update buttons immediately
    if (buttonPool.length > 0) {
      updateDisplayedButtons();
    }
    
    // Set up periodic refresh to pick up new click data (every 60 seconds)
    const refreshInterval = setInterval(() => {
      if (buttonPool.length > 0) {
        updateDisplayedButtons();
      }
    }, 60000);
    
    // Also refresh when page becomes visible (user returns to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden && buttonPool.length > 0) {
        updateDisplayedButtons();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      clearInterval(refreshInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [updateDisplayedButtons, buttonPool.length]);
  
  const stats = useMemo(() => [
    { number: '2400+', label: t('home.installations'), value: 2400, suffix: '+' },
    { number: '40+', label: t('home.yearsOfExperience'), value: 40, suffix: '+' },
    { number: '600', label: t('home.bollegraafBalersInstalled'), value: 600, suffix: '' },
    { number: '1160', label: t('home.opticalSortersInstalled'), value: 1160, suffix: '' },
    { number: '16', label: t('home.mrfsProcessing'), value: 16, suffix: '' },
  ], [t]);

  // Animated counter for stats
  const [animatedStats, setAnimatedStats] = useState(stats.map(s => ({ ...s, displayValue: 0 })));

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      stats.forEach((stat, index) => {
        let currentStep = 0;
        const increment = stat.value / steps;

        const interval = setInterval(() => {
          currentStep++;
          const newValue = Math.min(Math.floor(increment * currentStep), stat.value);
          
          setAnimatedStats(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], displayValue: newValue };
            return updated;
          });

          if (currentStep >= steps) {
            clearInterval(interval);
            setAnimatedStats(prev => {
              const updated = [...prev];
              updated[index] = { ...updated[index], displayValue: stat.value };
              return updated;
            });
          }
        }, stepDuration);
      });
    }
  }, [isInView, stats]);

  const services = useMemo(() => [
    {
      title: 'Consulting and Design',
      description: 'Expert guidance to design efficient recycling systems tailored to your needs.',
      icon: Lightbulb,
      gradient: 'from-vd-blue/5 to-vd-blue/10',
      halo: 'from-white via-blue-50 to-blue-100',
      linkPath: '/support'
    },
    {
      title: 'Turnkey Systems',
      description: 'Complete end-to-end solutions from design to installation and commissioning.',
      icon: Cog,
      gradient: 'from-vd-orange/5 to-vd-orange/10',
      halo: 'from-white via-orange-50 to-orange-100',
      linkPath: '/solutions'
    },
    {
      title: 'Retrofits',
      description: 'Upgrade and modernize existing facilities with advanced technology integration.',
      icon: Wrench,
      gradient: 'from-green-50 to-green-100',
      halo: 'from-white via-emerald-50 to-green-100',
      linkPath: '/support'
    },
    {
      title: 'After Sales/Support/Service',
      description: 'Comprehensive ongoing support with 24/7 technical assistance and maintenance.',
      icon: Headphones,
      gradient: 'from-blue-50 to-blue-100',
      halo: 'from-white via-indigo-50 to-blue-100',
      linkPath: '/support'
    },
  ], []);


  return (
    <>
      <SEO data={SEO_PAGES.home} />
      <div className="min-h-screen smooth-scroll">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden -mt-16 sm:-mt-20 pt-16 sm:pt-20 w-full">
        <video 
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          style={{
            transform: 'scale(1.1)',
            objectPosition: 'center 30%'
          }}
          onError={(e) => {
            // Fallback to image if video fails to load
            const videoElement = e.currentTarget as HTMLVideoElement;
            const error = videoElement.error;
            console.error('Video failed to load:', {
              errorCode: error?.code,
              errorMessage: error?.message,
              networkState: videoElement.networkState,
              readyState: videoElement.readyState,
              src: videoElement.currentSrc || videoElement.src,
              allSources: Array.from(videoElement.querySelectorAll('source')).map(s => s.src)
            });
            const fallbackImg = document.createElement('img');
            fallbackImg.src = IMAGE_ASSIGNMENTS.homepage.heroFallback;
            fallbackImg.className = 'absolute inset-0 w-full h-full object-cover object-center z-0';
            fallbackImg.style.transform = 'scale(1.1)';
            fallbackImg.style.objectPosition = 'center 30%';
            videoElement.parentNode?.replaceChild(fallbackImg, videoElement);
          }}
          onLoadedData={() => {
            console.log('Video loaded successfully');
          }}
          onCanPlay={(e) => {
            console.log('Video can play - attempting to play');
            const video = e.currentTarget as HTMLVideoElement;
            video.play().catch(err => {
              console.warn('Autoplay blocked or play failed:', err);
            });
          }}
          onLoadStart={() => {
            console.log('Video load started');
          }}
          onStalled={() => {
            console.warn('Video stalled - network issue?');
          }}
        >
          <source src="/videos/homepage.mp4" type="video/mp4" />
          {/* Fallback image if video is not supported */}
          <img 
            src={IMAGE_ASSIGNMENTS.homepage.heroFallback}
            alt="Van Dyk Recycling Solutions"
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
            style={{
              transform: 'scale(1.1)',
              objectPosition: 'center 30%'
            }}
          />
        </video>
        {/* Dark blue overlay for text readability */}
        <div className="absolute inset-0 bg-vd-blue-dark/60"></div>
        
        
        <div className="absolute inset-0 flex items-center pt-16 sm:pt-20">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl text-white mt-8 sm:mt-12 lg:mt-20"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8"
                style={{ lineHeight: '1.2' }}
              >
                {t('home.heroTitle')}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl mb-8 text-blue-100 max-w-4xl"
              >
                {t('home.heroSubtitle')}
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-4xl"
              >
                {displayedButtons.length > 0 ? displayedButtons.map((button) => (
                  <motion.div 
                    key={button.id} 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={button.url}
                      onClick={() => {
                        trackButtonClick(button.id, button.url, button.label);
                        // Trigger button refresh after a delay to allow localStorage update
                        setTimeout(() => {
                          updateDisplayedButtons();
                        }, 200);
                      }}
                      className="block bg-vd-orange hover:bg-vd-orange-alt text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center justify-center min-h-[50px] sm:min-h-[60px] text-center"
                    >
                      {t(button.translationKey)}
                    </Link>
                  </motion.div>
                )) : (
                  // Fallback to default buttons while loading
                  <>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        to="/equipment"
                        onClick={() => {
                          trackButtonClick('equipment', '/equipment', t('home.bollegraafBalers'));
                          setTimeout(() => {
                            updateDisplayedButtons();
                          }, 200);
                        }}
                        className="block bg-vd-orange hover:bg-vd-orange-alt text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center justify-center min-h-[50px] sm:min-h-[60px] text-center"
                      >
                        {t('home.bollegraafBalers')}
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        to="/contact"
                        onClick={() => {
                          trackButtonClick('contact-recyclable', '/contact', t('home.isProductRecyclable'));
                          setTimeout(() => {
                            updateDisplayedButtons();
                          }, 200);
                        }}
                        className="block bg-vd-orange hover:bg-vd-orange-alt text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center justify-center min-h-[50px] sm:min-h-[60px] text-center"
                      >
                        {t('home.isProductRecyclable')}
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        to="/solutions"
                        onClick={() => {
                          trackButtonClick('solutions-food', '/solutions', t('home.highVolumeFoodDepackaging'));
                          setTimeout(() => {
                            updateDisplayedButtons();
                          }, 200);
                        }}
                        className="block bg-vd-orange hover:bg-vd-orange-alt text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center justify-center min-h-[50px] sm:min-h-[60px] text-center"
                      >
                        {t('home.highVolumeFoodDepackaging')}
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        to="/solutions"
                        onClick={() => {
                          trackButtonClick('solutions-odor', '/solutions', t('home.gotOdorProblems'));
                          setTimeout(() => {
                            updateDisplayedButtons();
                          }, 200);
                        }}
                        className="block bg-vd-orange hover:bg-vd-orange-alt text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center justify-center min-h-[50px] sm:min-h-[60px] text-center"
                      >
                        {t('home.gotOdorProblems')}
                      </Link>
                    </motion.div>
                  </>
                )}
              </motion.div>
              
              {/* Stats Section - Full width */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute left-0 right-0 py-8 border-y border-white/30"
                style={{ 
                  marginLeft: 'calc(-50vw + 50%)', 
                  marginRight: 'calc(-50vw + 50%)', 
                  width: '100vw',
                  bottom: '0'
                }}
              >
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-vd-blue to-vd-blue-dark"></div>
                {/* Content */}
                <div className="relative z-10 flex justify-center items-center" ref={statsRef}>
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 max-w-7xl px-4">
                    {animatedStats.map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                        className="text-center flex flex-col items-center justify-center"
                      >
                        <motion.div 
                          className="text-xl sm:text-2xl md:text-3xl font-bold text-vd-orange mb-1 sm:mb-2"
                          initial={{ opacity: 0, y: 20 }}
                          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
                        >
                          {stat.displayValue.toLocaleString()}{stat.suffix}
                        </motion.div>
                        <div className="text-xs sm:text-sm md:text-base text-white font-medium text-center">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
              
            </motion.div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-vd-blue mb-4">{t('home.ourServices')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              {t('home.comprehensiveSolutions')}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <Link
                key={service.title}
                to={service.linkPath}
                className="block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-gradient-to-br ${service.gradient} rounded-xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow cursor-pointer`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-br ${service.halo} shadow-inner`}>
                    <service.icon className="w-8 h-8 text-vd-blue" />
                  </div>
                  <h3 className="text-xl font-semibold text-vd-blue mb-3">{service.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {service.description}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Industry Recognition Section */}
      <IndustryRecognition displayMode="organizations" />

      {/* Industry Leadership Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-vd-blue mb-4">Industry Leadership</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Trusted by industry leaders worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { image: '/Images/bollegraaf-products.jpg', title: t('servicesSupport.bollegraafPartnership'), description: t('servicesSupport.exclusiveNorthAmericanDistributor') },
              { image: '/Images/tomra-optical-sorting.jpg', title: t('servicesSupport.tomraTechnology'), description: t('servicesSupport.advancedOpticalSortingSolutions') },
              { image: '/Images/pellenc-optical-new.jpg', title: t('servicesSupport.pellencST'), description: t('servicesSupport.aiPoweredSortingSystems') },
              { image: '/Images/greyparrot-ai.jpg', title: t('servicesSupport.greyparrotAI'), description: t('servicesSupport.intelligentWasteAnalytics') }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="font-semibold text-vd-blue mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent News Slideshow */}
      <NewsSlideshow />

      {/* Training and Parts Sections */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
            {/* Train Like the Best */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-8 text-center flex flex-col"
            >
              <div className="flex-shrink-0 mb-6 flex items-center justify-center" style={{ minHeight: '120px' }}>
                <img
                  src={IMAGE_ASSIGNMENTS.homepage.training}
                  alt="Van Dyk University"
                  className="w-40 sm:w-48 h-auto mx-auto drop-shadow-lg"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h2 className="text-2xl font-bold text-vd-blue mb-3 flex-shrink-0">{t('home.trainLikeTheBest')}</h2>
              <p className="text-gray-600 mb-6 flex-grow">{t('home.trainingDescription')}</p>
              <Link
                to="/support"
                className="inline-block bg-vd-orange hover:bg-vd-orange-alt text-white px-8 py-3 rounded-lg font-semibold transition-colors flex-shrink-0"
              >
                {t('home.detailsSchedules')}
              </Link>
            </motion.div>

            {/* Order Parts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-8 text-center flex flex-col"
            >
              <div className="flex-shrink-0 mb-6 flex items-center justify-center" style={{ minHeight: '120px' }}>
                <img
                  src={IMAGE_ASSIGNMENTS.homepage.orderParts}
                  alt="Van Dyk Direct Logo"
                  className="w-40 sm:w-48 h-auto mx-auto"
                  onError={(e) => {
                    e.currentTarget.src = IMAGE_ASSIGNMENTS.homepage.orderPartsFallback;
                    e.currentTarget.alt = 'Image not available';
                  }}
                />
              </div>
              <h2 className="text-2xl font-bold text-vd-blue mb-3 flex-shrink-0">{t('home.orderParts')}</h2>
              <p className="text-gray-600 mb-6 flex-grow">{t('home.orderPartsDescription')}</p>
              <a
                href="https://www.shopvandykdirect.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-vd-orange hover:bg-vd-orange-alt text-white px-8 py-3 rounded-lg font-semibold transition-colors flex-shrink-0"
              >
                {t('home.placeYourOrder')}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
      </div>

    </>
  );
};

export default Home;