import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IMAGE_ASSIGNMENTS } from '../config/images';
import { useTranslation } from '../hooks/useTranslation';
import { 
  GraduationCap, Package, Phone, 
  ArrowRight, ExternalLink,
  Clock, Users, Award, Settings, Eye, Star
} from 'lucide-react';

const ServicesSupport = () => {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Statistics data
  const stats = [
    { number: '50+', label: 'Field Service Technicians', icon: Users },
    { number: '$35M', label: 'Parts Inventory Value', icon: Package },
    { number: '24/7', label: 'Technical Support', icon: Clock },
    { number: '40+', label: 'Years of Experience', icon: Award }
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: "Van Dyk's 24/7 support saved us from a major production shutdown. Their response time and expertise are unmatched.",
      author: "Mike Johnson",
      company: "Metro Recycling Solutions",
      rating: 5
    },
    {
      quote: "Todd presented the information in an easy to understand format and was very thorough in his explanations. The small class size gave us the ability to dive deep into technical details.",
      author: "Kevin Hanner",
      company: "Smurfit Westrock",
      rating: 5
    },
    {
      quote: "OUTSTANDING. Well versed and personable. Much more in-depth than other training programs. Very beneficial for knowledgeable maintenance staff which is key to efficient operations.",
      author: "An Kruan",
      company: "WM Germantown",
      rating: 5
    },
    {
      quote: "The instructor's knowledge was superior and his ability to relate it to most techs' knowledge level was outstanding. This was my first training on balers and I can't imagine a better structured course.",
      author: "Brian Cuth",
      company: "Salem Recycle Center",
      rating: 5
    },
    {
      quote: "Wim is extremely knowledgeable and a great teacher. 10/10. The hydraulic troubleshooting was the most helpful. Extremely in-depth training.",
      author: "Josh Turner",
      company: "Salem, OR",
      rating: 5
    },
    {
      quote: "Both hydraulic and electrical troubleshooting were beneficial. Extremely in-depth and valuable training. Everybody was extremely knowledgeable.",
      author: "Kyle Barela",
      company: "Denver",
      rating: 5
    }
  ];

  // Handle hash fragments to auto-expand cards
  useEffect(() => {
    const hash = location.hash.substring(1); // Remove the # symbol
    if (hash) {
      // Map hash fragments to card IDs
      const hashToCardMap: { [key: string]: string } = {
        // Solutions
        'electronics-waste-recycling': 'electronics',
        'battery-recycling-systems': 'battery',
        'glass-cleanup-systems': 'glass',
        'composting-densimetric-tables': 'composting',
        'bollegraaf-balers': 'bollegraaf',
        'ai-waste-analysis': 'ai-analysis',
        'tomra-optical-sorting': 'tomra',
        'pellenc-st-optical-sorting': 'pellenc',
        'walair-density-separation': 'walair',
        'centriair-odor-control': 'centriair',
        // Equipment
        'bollegraaf-equipment': 'bollegraaf-equipment',
        'lubo-screening-equipment': 'lubo-screening-equipment',
        'tomra-optical-sorting-equipment': 'tomra-equipment',
        'pellenc-st-optical-sorting-equipment': 'pellenc-equipment',
        'walair-density-separation-equipment': 'walair-equipment',
        'smicon-food-waste-depackagers': 'smicon-food-waste-depackagers',
        'gunther-screens': 'gunther-screens',
        'centriair-equipment': 'centriair-equipment',
        'greyparrot-ai-equipment': 'greyparrot-ai-equipment',
        'densimetric-table-equipment': 'densimetric-table-equipment',
        'beefoam-dust-suppression-system': 'beefoam-dust-suppression-system',
        'reckelberg-environmental-technologies': 'reckelberg-environmental-technologies',
        'certified-pre-owned-equipment': 'certified-pre-owned-equipment'
      };
      
      const cardId = hashToCardMap[hash];
      if (cardId) {
        // Open the modal immediately for ALL equipment and solution cards
        setActiveModal(cardId);
        // Scroll to the top of the page to show the modal
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  type SupportCard = {
    id: number;
    title: string;
    description: string;
    features?: string[];
    contact?: string;
    cta?: string;
    ctaLink?: string;
    ctaExternal?: boolean;
    ctaAction?: () => void;
    image: string;
    imageAlt: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    imageClass?: string;
    secondaryCta?: string;
    secondaryCtaLink?: string;
  };

  const supportCards: SupportCard[] = [
    {
      id: 1,
      title: t('servicesSupport.technicalSupport'),
      description: t('servicesSupport.roundTheClock'),
      features: [
        t('servicesSupport.immediateResponse'),
        t('servicesSupport.remoteDiagnostics'),
        t('servicesSupport.emergencyDispatch'),
        t('servicesSupport.systemMonitoring')
      ],
      contact: '203-967-1100 • service@vdrs.com',
      image: '/Images/Services/Support/Header image_Support.jpeg',
      imageAlt: '24/7 technical support center',
      icon: Phone,
      imageClass: 'object-cover'
    },
    {
      id: 2,
      title: t('servicesSupport.spareParts'),
      description: t('servicesSupport.multiQuantity'),
      features: [
        t('servicesSupport.multiQuantityStock'),
        t('servicesSupport.sameDayShipping'),
        t('servicesSupport.partsAvailability'),
        t('servicesSupport.expressDelivery')
      ],
      cta: t('servicesSupport.orderParts'),
      ctaLink: 'https://www.shopvandykdirect.com/',
      ctaExternal: true,
      image: '/Images/van-dyk-direct.jpg',
      imageAlt: 'Parts warehouse with $35 million inventory',
      icon: Package,
      imageClass: 'object-cover brightness-110'
    },
    {
      id: 3,
      title: t('servicesSupport.preventiveMaintenance'),
      description: t('servicesSupport.twoCheckups'),
      features: [
        t('servicesSupport.assetLifeExtension'),
        t('servicesSupport.reducedEmergencyCalls'),
        t('servicesSupport.performanceOptimization'),
        t('servicesSupport.detailedReporting')
      ],
      cta: t('servicesSupport.learnAboutPMI'),
      ctaAction: () => navigate('/pmi'),
      image: '/Images/contact-1-01725.jpg',
      imageAlt: 'Preventive maintenance inspection',
      icon: Settings,
      imageClass: 'object-cover'
    },
    {
      id: 4,
      title: t('servicesSupport.fieldServiceTechnicians'),
      description: t('servicesSupport.nationwideCoverage'),
      features: [
        t('servicesSupport.nationwideCoverageFeature'),
        t('servicesSupport.factoryTrainedStaff'),
        t('servicesSupport.hourResponse'),
        t('servicesSupport.onCallSupport')
      ],
      contact: t('servicesSupport.availableForEmergency'),
      image: '/Images/contact-wm-mesquite-10.jpg',
      imageAlt: 'Field service technicians at work',
      icon: Users,
      imageClass: 'object-cover'
    },
    {
      id: 5,
      title: t('servicesSupport.vanDykUniversity'),
      description: t('servicesSupport.handsOnTraining'),
      features: [
        t('servicesSupport.classroomTraining'),
        t('servicesSupport.handsOnExperience'),
        t('servicesSupport.certificationPrograms'),
        t('servicesSupport.ongoingEducation')
      ],
      cta: t('servicesSupport.viewCourses'),
      ctaLink: '/van-dyk-university',
      image: '/Images/van-dyk-university.jpg',
      imageAlt: 'Van Dyk University training facility',
      icon: GraduationCap,
      imageClass: 'object-cover'
    },
    {
      id: 6,
      title: t('servicesSupport.materialTestingCenter'),
      description: t('servicesSupport.largestTestCenter'),
      features: [
        t('servicesSupport.opticalSorters'),
        t('servicesSupport.variousScreens'),
        t('servicesSupport.ellipticalSeparator'),
        t('servicesSupport.airSystems')
      ],
      cta: t('servicesSupport.visitTestCenter'),
      ctaLink: '/test-center',
      image: '/Images/Services/Test Center/Test Center 2025 best.JPG',
      imageAlt: 'Material Testing Center with recycling equipment',
      icon: Eye,
      imageClass: 'object-cover'
    }
  ];

  const handleCardClick = (card: SupportCard) => {
    // 24x7 Technical Support - Call to action
    if (card.id === 1) {
      window.location.href = 'tel:203-967-1100';
      return;
    }
    // Spare Parts - External link
    if (card.id === 2 && card.ctaExternal && card.ctaLink) {
      window.open(card.ctaLink, '_blank', 'noopener,noreferrer');
      return;
    }
    // PMI - Navigate to PMI page
    if (card.id === 3 && card.ctaAction) {
      card.ctaAction();
      return;
    }
    // Van Dyk University - Navigate to university page
    if (card.id === 5 && card.ctaLink) {
      navigate(card.ctaLink);
      return;
    }
    // Material Testing Center - Navigate to test center page
    if (card.id === 6 && card.ctaLink) {
      navigate(card.ctaLink);
      return;
    }
    // 50+ Field Service Technicians - Navigate to careers
    if (card.id === 4) {
      navigate('/careers');
      return;
    }
  };

  const renderCard = (card: SupportCard, index: number) => (
    <motion.div
      key={card.id}
      id={card.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      onClick={() => handleCardClick(card)}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group h-full flex flex-col cursor-pointer"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={card.image}
          alt={card.imageAlt}
          className={`w-full h-full ${card.imageClass || 'object-cover'} group-hover:scale-105 transition-transform duration-500`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute top-4 left-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <card.icon className="w-8 h-8 text-vd-orange drop-shadow-lg" />
          </motion.div>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">{card.title}</h3>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-gray-600 mb-4 leading-relaxed flex-grow">{card.description}</p>

        {card.features && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {card.features.slice(0, 3).map((feature: string, idx: number) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="bg-vd-orange/10 text-vd-orange text-xs px-2 py-1 rounded-full font-medium"
                >
                  {feature}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {card.cta && (
          card.ctaAction ? (
            <div
              onClick={(e) => {
                e.stopPropagation();
                card.ctaAction?.();
              }}
              className="text-vd-orange font-semibold inline-flex items-center hover:text-vd-orange-alt transition-colors group/btn"
            >
              {card.cta}
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-1"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          ) : card.ctaExternal ? (
            <div
              onClick={(e) => {
                e.stopPropagation();
                window.open(card.ctaLink, '_blank', 'noopener,noreferrer');
              }}
              className="text-vd-orange font-semibold inline-flex items-center hover:text-vd-orange-alt transition-colors group/btn"
            >
              {card.cta}
              <ExternalLink className="w-4 h-4 ml-1" />
            </div>
          ) : card.ctaLink ? (
            <div
              onClick={(e) => {
                e.stopPropagation();
                navigate(card.ctaLink || '#');
              }}
              className="text-vd-orange font-semibold inline-flex items-center hover:text-vd-orange-alt transition-colors group/btn"
            >
              {card.cta}
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          ) : null
        )}

        {card.secondaryCta && (
          <a
            href={card.secondaryCtaLink}
            className="block text-sm text-vd-blue hover:text-vd-orange transition-colors mt-2"
          >
            {card.secondaryCta}
          </a>
        )}

        {card.contact && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 font-medium">{card.contact}</p>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="relative bg-gradient-to-r from-vd-blue-dark to-vd-blue text-white py-20 overflow-hidden">
        {/* Main hero background image */}
        <div className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-40" style={{ backgroundImage: "url('/Images/contact-team-photo.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-vd-blue-dark/85 to-vd-blue/85" />
        {/* Additional overlay pattern for depth */}
        <div className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-15 mix-blend-overlay" style={{ backgroundImage: "url('/Images/commercial-waste-processing.jpg')" }} />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              {t('servicesSupport.servicesSupport')}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-gray-100 mb-8 leading-relaxed"
            >
              {t('servicesSupport.comprehensive')}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="bg-vd-orange hover:bg-vd-orange-alt text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  {t('servicesSupport.getStartedToday')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="tel:2039671100"
                  className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center border border-white/20 hover:border-white/40"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {t('servicesSupport.call')}
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Statistics Section */}
      <section id="stats-section" className="py-20 bg-gradient-to-br from-gray-900 via-vd-blue-dark to-gray-900 text-white relative overflow-hidden">
        {/* Enhanced animated background pattern */}
        <div className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-10" style={{ backgroundImage: "url('/Images/commercial-waste-processing.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-br from-vd-blue-dark/95 via-vd-blue/90 to-vd-blue-dark/95" />
        
        {/* Enhanced floating geometric shapes with blending */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 border border-vd-orange/30 rotate-45 animate-pulse bg-vd-orange/5 backdrop-blur-sm"></div>
          <div className="absolute top-32 right-20 w-16 h-16 border border-white/20 rounded-full animate-bounce bg-white/5 backdrop-blur-sm"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-vd-orange/40 rotate-12 animate-pulse bg-vd-orange/5 backdrop-blur-sm"></div>
          <div className="absolute bottom-32 right-1/3 w-24 h-24 border border-white/15 rounded-full animate-bounce bg-white/5 backdrop-blur-sm"></div>
          
          {/* Additional subtle pattern overlays */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,165,0,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05) 0%, transparent 50%)`,
            backgroundSize: '200px 200px, 150px 150px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-vd-orange bg-clip-text text-transparent">
              {t('servicesSupport.whyChoose')}
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              {t('servicesSupport.numbers')}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 hover:border-vd-orange/50 transition-all duration-300 hover:bg-white/15 hover:scale-105 relative overflow-hidden group">
                  {/* Enhanced background blending */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-vd-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-vd-blue/20 via-transparent to-transparent"></div>
                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,165,0,0.1) 0%, transparent 50%)`,
                    backgroundSize: '100px 100px, 80px 80px'
                  }}></div>
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-vd-orange to-orange-600 rounded-full mb-6 group-hover:shadow-lg group-hover:shadow-vd-orange/50 relative z-10"
                    >
                      <stat.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="text-5xl md:text-6xl font-bold text-vd-orange mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10">
                      {stat.number}
                    </div>
                    <div className="text-lg text-white font-semibold group-hover:text-vd-orange transition-colors duration-300 relative z-10">
                      {stat.label}
                    </div>
                    {/* Enhanced decorative line with blending */}
                    <div className="w-16 h-1 bg-gradient-to-r from-vd-orange via-vd-orange/80 to-transparent mx-auto mt-4 group-hover:w-24 transition-all duration-300 relative z-10 shadow-lg shadow-vd-orange/30"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional engagement elements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-md rounded-full px-8 py-4 border border-white/20 relative overflow-hidden group hover:bg-white/15 transition-all duration-300">
              {/* Enhanced background blending */}
              <div className="absolute inset-0 bg-gradient-to-r from-vd-orange/10 via-transparent to-vd-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
              {/* Subtle pattern */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,165,0,0.2) 0%, transparent 70%)`,
                backgroundSize: '60px 60px'
              }}></div>
              <div className="w-3 h-3 bg-vd-orange rounded-full animate-pulse relative z-10"></div>
              <span className="text-white font-medium relative z-10">Trusted by industry leaders worldwide</span>
              <div className="w-3 h-3 bg-vd-orange rounded-full animate-pulse relative z-10"></div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-16 relative overflow-hidden">
        {/* Subtle background pattern for white section */}
        <div className="absolute inset-0 opacity-3" style={{
          backgroundImage: `radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.02) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(255, 165, 0, 0.02) 0%, transparent 50%)`,
          backgroundSize: '300px 300px, 250px 250px'
        }}></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-vd-blue mb-4">{t('servicesSupport.support')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('servicesSupport.everythingYouNeed')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportCards.map((card, index) => renderCard(card, index))}
          </div>
        </div>
      </section>

      {/* Floating Elements Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-vd-blue mb-4">{t('servicesSupport.industryLeadership')}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('servicesSupport.trustedByLeaders')}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { image: '/Images/bollegraaf-products.jpg', title: 'Bollegraaf Partnership', description: 'Exclusive North American distributor' },
              { image: '/Images/tomra-optical-sorting.jpg', title: 'TOMRA Technology', description: 'Advanced optical sorting solutions' },
              { image: '/Images/pellenc-optical-new.jpg', title: 'Pellenc ST', description: 'AI-powered sorting systems' },
              { image: '/Images/greyparrot-ai.jpg', title: 'Greyparrot AI', description: 'Intelligent waste analytics' }
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

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-5" style={{ backgroundImage: "url('/Images/organics-processing.jpg')" }} />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-vd-blue mb-4">
              {t('servicesSupport.whatCustomersSay')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('servicesSupport.realFeedback')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </div>
                <blockquote className="text-gray-600 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-semibold text-vd-blue">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {/* Example for modals, only render if active */}
        {activeModal === 'training' && <div>Training Modal</div>}
      </AnimatePresence>
    </div>
  );
};

export default ServicesSupport;
