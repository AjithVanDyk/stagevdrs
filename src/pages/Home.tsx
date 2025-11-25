import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Recycle, Users, Award, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';
import { IMAGE_ASSIGNMENTS } from '../config/images';
import SEO from '../components/SEO';
import { SEO_PAGES } from '../utils/seo';
import IndustryRecognition from '../components/IndustryRecognition';
import NewsSlideshow from '../components/NewsSlideshow';
import { useTranslation } from '../hooks/useTranslation';
import { animationConfig } from '../utils/animations';

const Home = () => {
  const { t } = useTranslation();
  const fadeInUp = animationConfig.fadeInUp;
  
  const stats = useMemo(() => [
    { number: '2400+', label: t('home.installations') },
    { number: '40+', label: t('home.yearsOfExperience') },
    { number: '600', label: t('home.bollegraafBalersInstalled') },
    { number: '1160', label: t('home.opticalSortersInstalled') },
    { number: '16', label: t('home.mrfsProcessing') },
  ], [t]);

  const services = useMemo(() => [
    {
      title: t('home.singleStreamRecycling'),
      description: t('home.singleStreamDescription'),
      icon: Recycle,
      image: IMAGE_ASSIGNMENTS.homepage.services.singleStream,
      linkText: t('home.learnMore'),
      linkPath: '/solutions/single-stream-recycling'
    },
    {
      title: t('home.bollegraafEquipment'),
      description: t('home.bollegraafDescription'),
      icon: Award,
      image: IMAGE_ASSIGNMENTS.homepage.services.bollegraaf,
      linkText: t('home.learnMore'),
      linkPath: '/equipment/bollegraaf'
    },
    {
      title: t('home.expertConsulting'),
      description: t('home.expertConsultingDescription'),
      icon: Users,
      image: IMAGE_ASSIGNMENTS.homepage.services.expertConsulting,
      linkText: t('home.learnMore'),
      linkPath: '/support'
    },
    {
      title: t('home.globalSupport'),
      description: t('home.globalSupportDescription'),
      icon: TrendingUp,
      image: IMAGE_ASSIGNMENTS.homepage.services.globalSupport,
      linkText: t('home.learnMore'),
      linkPath: '/support'
    },
  ], [t]);


  return (
    <>
      <SEO data={SEO_PAGES.home} />
      <div className="min-h-screen smooth-scroll">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden -mt-16 sm:-mt-20 pt-16 sm:pt-20 w-full">
        <img 
          src={IMAGE_ASSIGNMENTS.homepage.hero}
          alt="Van Dyk Recycling Solutions"
          className="absolute inset-0 w-full h-full object-cover object-center"
          width="8000"
          height="1080"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          style={{
            filter: 'blur(2px)',
            transform: 'scale(1.1)',
            objectPosition: 'center 30%'
          }}
          onError={(e) => {
            e.currentTarget.src = IMAGE_ASSIGNMENTS.homepage.heroFallback;
          }}
        />
        {/* Dark blue overlay for text readability */}
        <div className="absolute inset-0 bg-vd-blue-dark/60"></div>
        
        
        <div className="absolute inset-0 flex items-center pt-16 sm:pt-20">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={fadeInUp.transition}
              className="max-w-5xl text-white mt-8 sm:mt-12 lg:mt-20"
            >
              <motion.h1 
                initial={fadeInUp.initial}
                animate={fadeInUp.animate}
                transition={{ ...fadeInUp.transition, delay: 0.2 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
              >
                {t('home.heroTitle')}
              </motion.h1>
              <motion.p 
                initial={fadeInUp.initial}
                animate={fadeInUp.animate}
                transition={{ ...fadeInUp.transition, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl mb-8 text-blue-100 max-w-4xl"
              >
                {t('home.heroSubtitle')}
              </motion.p>
              <motion.div 
                initial={fadeInUp.initial}
                animate={fadeInUp.animate}
                transition={{ ...fadeInUp.transition, delay: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-4xl"
              >
                {/* BOLLEGRAAF BALERS - Orange button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/equipment"
                    className="block bg-vd-orange hover:bg-vd-orange-alt text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center justify-center min-h-[50px] sm:min-h-[60px] text-center"
                  >
                    {t('home.bollegraafBalers')}
                  </Link>
                </motion.div>

                {/* IS YOUR PRODUCT RECYCLABLE? - Orange button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/contact"
                    className="block bg-vd-orange hover:bg-vd-orange-alt text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center justify-center min-h-[50px] sm:min-h-[60px] text-center"
                  >
                    {t('home.isProductRecyclable')}
                  </Link>
                </motion.div>

                {/* HIGH VOLUME FOOD DEPACKAGING - Orange button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/solutions"
                    className="block bg-vd-orange hover:bg-vd-orange-alt text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center justify-center min-h-[50px] sm:min-h-[60px] text-center"
                  >
                    {t('home.highVolumeFoodDepackaging')}
                  </Link>
                </motion.div>

                {/* GOT ODOR PROBLEMS? - Orange button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/solutions"
                    className="block bg-vd-orange hover:bg-vd-orange-alt text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center justify-center min-h-[50px] sm:min-h-[60px] text-center"
                  >
                    {t('home.gotOdorProblems')}
                  </Link>
                </motion.div>
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
                <div className="relative z-10 flex justify-center items-center">
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 max-w-7xl px-4">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                        className="text-center flex flex-col items-center justify-center"
                      >
                        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-vd-orange mb-1 sm:mb-2">{stat.number}</div>
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
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 25,
                    delay: index * 0.08,
                    duration: 0.6
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: {
                      type: 'spring',
                      stiffness: 400,
                      damping: 25,
                      duration: 0.3
                    }
                  }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full cursor-pointer"
                >
                  <div className="relative h-40 sm:h-48 overflow-hidden rounded-t-xl bg-gray-100 flex-shrink-0">
                    <img
                      src={service.image}
                      alt={service.title}
                    className={`w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-out ${
                      service.title === 'Expert Consulting' || service.title === 'Global Support'
                        ? 'object-contain p-4'
                        : 'object-cover'
                    }`}
                      width="400"
                      height="192"
                      loading="lazy"
                      onError={(e) => {
                        if (import.meta.env.DEV) {
                          console.log('Service image failed to load:', service.title);
                        }
                        e.currentTarget.src = '/Images/first.jpg';
                      }}
                    />
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                      <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-vd-orange bg-white/90 rounded-full p-1 sm:p-1.5" />
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 flex flex-col flex-grow min-h-[200px]">
                    <h3 className="text-lg sm:text-xl font-semibold text-vd-blue mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm sm:text-base flex-grow">{service.description}</p>
                    <span className="text-vd-orange font-semibold inline-flex items-center hover:text-vd-blue transition-colors text-sm sm:text-base">
                      {service.linkText} →
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Industry Recognition Section */}
      <IndustryRecognition displayMode="organizations" />

      {/* Recent News Slideshow */}
      <NewsSlideshow />

      {/* Training and Parts Sections */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Train Like the Best */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-8 text-center"
            >
              <img
                src={IMAGE_ASSIGNMENTS.homepage.training}
                alt="Van Dyk University"
                className="w-40 sm:w-48 h-auto mx-auto mb-6 drop-shadow-lg"
                loading="lazy"
                decoding="async"
              />
              <h2 className="text-2xl font-bold text-vd-blue mb-3">{t('home.trainLikeTheBest')}</h2>
              <p className="text-gray-600 mb-6">{t('home.trainingDescription')}</p>
              <Link
                to="/support"
                className="inline-block bg-vd-orange hover:bg-vd-orange-alt text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                {t('home.detailsSchedules')}
              </Link>
            </motion.div>

            {/* Order Parts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-8 text-center"
            >
              <img
                src={IMAGE_ASSIGNMENTS.homepage.orderParts}
                alt="Van Dyk Direct Logo"
                className="w-48 h-auto mx-auto mb-6"
                onError={(e) => {
                  e.currentTarget.src = IMAGE_ASSIGNMENTS.homepage.orderPartsFallback;
                  e.currentTarget.alt = 'Image not available';
                }}
              />
              <h2 className="text-2xl font-bold text-vd-blue mb-3">{t('home.orderParts')}</h2>
              <p className="text-gray-600 mb-6">{t('home.orderPartsDescription')}</p>
              <a
                href="https://www.shopvandykdirect.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-vd-orange hover:bg-vd-orange-alt text-white px-8 py-3 rounded-lg font-semibold transition-colors"
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