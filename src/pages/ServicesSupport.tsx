import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { 
  GraduationCap, Package, Phone, 
  ArrowRight, ExternalLink,
  Clock, Users, Award, Settings,
  Warehouse, ShoppingCart, Monitor, FlaskConical,
  CheckCircle
} from 'lucide-react';

const ServicesSupport = () => {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, margin: '-100px' });

  // Statistics data with values for animation
  const stats = useMemo(() => [
    { number: '50+', label: t('servicesSupport.fieldServiceTechniciansLabel'), icon: Users, value: 50, suffix: '+', isNumeric: true },
    { number: '$35M', label: t('servicesSupport.partsInventoryValue'), icon: Package, value: 35, suffix: 'M', isNumeric: true, prefix: '$' },
    { number: '24/7', label: t('servicesSupport.technicalSupportLabel'), icon: Clock, value: null, suffix: '', isNumeric: false },
    { number: '473', label: t('servicesSupport.yearsOfExperienceLabel'), icon: Award, value: 473, suffix: '', isNumeric: true }
  ], [t]);

  // Animated counter for stats
  const [animatedStats, setAnimatedStats] = useState(stats.map(s => ({ ...s, displayValue: 0 })));

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;
      const intervals: NodeJS.Timeout[] = [];

      stats.forEach((stat, index) => {
        if (!stat.isNumeric || stat.value === null) {
          // For non-numeric stats, set display value immediately
          setAnimatedStats(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], displayValue: stat.value || 0 };
            return updated;
          });
          return;
        }

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
        
        intervals.push(interval);
      });

      // Cleanup function
      return () => {
        intervals.forEach(interval => clearInterval(interval));
      };
    }
  }, [isInView, stats]);

  // Testimonials data - Placeholder content
  const testimonials = [
    {
      quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      author: 'John Doe',
      company: 'Company Name'
    },
    {
      quote: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      author: 'Jane Smith',
      company: 'Business Solutions'
    },
    {
      quote: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      author: 'Robert Johnson',
      company: 'Industry Partners'
    },
    {
      quote: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      author: 'Maria Garcia',
      company: 'Enterprise Group'
    },
    {
      quote: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      author: 'David Wilson',
      company: 'Corporate Services'
    },
    {
      quote: 'Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      author: 'Sarah Brown',
      company: 'Professional Solutions'
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
    id: number | string;
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
    youtubeLink?: string;
  };

  const supportCards: SupportCard[] = [
    {
      id: 1,
      title: '50 Service Technicians',
      description: 'Our 50 service technicians perform all service-related functions: mechanical installation, electrical installation, commissioning and startup, machine calibration, on-site personnel training, over-the-phone troubleshooting, on-site troubleshooting and repairs, and preventive maintenance routines. Our equipment is fully installed and commissioned by Van Dyk\'s own installation team.',
      features: [
        'Mechanical Installation',
        'Electrical Installation',
        'Commissioning & Startup',
        'Machine Calibration',
        'On-Site Training',
        'Troubleshooting & Repairs',
        'Preventive Maintenance'
      ],
      image: '/Images/contact-wm-mesquite-10.jpg',
      imageAlt: 'Field service technicians at work',
      icon: Users,
      imageClass: 'object-cover'
    },
    {
      id: 2,
      title: 'Free Troubleshooting Hotline',
      description: 'Avoid costly service visits by calling our free troubleshooting hotline, manned 24/7/365 by one or more of our expert technicians. They are committed to walking your personnel through troubleshooting steps and solving the issue without the need for a service tech visit.',
      features: [
        '24/7/365 Availability',
        'Free Service',
        'Expert Technicians',
        '97% Problems Solved Over Phone',
        'Reduce Downtime',
        'No Service Visit Needed'
      ],
      contact: '203-967-1100',
      image: '/Images/greyparrot-ai-new.jpg',
      imageAlt: 'AI-powered troubleshooting support',
      icon: Phone,
      imageClass: 'object-cover'
    },
    {
      id: 3,
      title: 'Fully Stocked Parts Warehouse in the USA',
      description: 'Because being without a critical part causes downtime and profit loss. 21,000 part SKUs totaling over $35M stored in Norwalk, CT with every part in stock: small parts, large parts, and rare parts. Next-day shipping is available on all parts. If you need a part on a Saturday, Sunday, or a holiday, we will get it to you. We never want your operation waiting on parts.',
      features: [
        '21,000 Part SKUs',
        '$35M+ Inventory Value',
        'All Parts in Stock',
        'Next Day Shipping',
        'Weekend & Holiday Shipping',
        'Never Wait on Parts'
      ],
      image: '/Images/8.jpg',
      imageAlt: 'Fully stocked parts warehouse',
      icon: Warehouse,
      imageClass: 'object-cover'
    },
    {
      id: 4,
      title: 'Order Parts Online',
      description: 'Order parts online through our fully online parts catalog. Get a quote, place your order, track your parts, and see your invoices all in one place.',
      features: [
        'Browse 21,000 Part SKUs',
        'Search by Category or Keyword',
        'See Pictures to Verify Specs',
        'Generate Quotes',
        'Track Shipments',
        'Save Orders & Favorites',
        'View All Invoices & Credits'
      ],
      cta: 'Order Parts',
      ctaLink: 'https://www.shopvandykdirect.com/',
      ctaExternal: true,
      image: '/Images/van-dyk-direct-logo.png',
      imageAlt: 'Van Dyk Direct online parts ordering',
      icon: ShoppingCart,
      imageClass: 'object-contain bg-white p-4'
    },
    {
      id: 5,
      title: 'Remote System Monitoring',
      description: 'Your system will be tied directly into Van Dyk headquarters, where we can provide remote system diagnostics, troubleshooting, and correction procedures. Essentially, it puts a VDRS factory-trained engineer in front of your plant\'s equipment at any given time. A highly trained Van Dyk performance engineer can monitor the system 24 hours per day, 7 days per week, 365 days per year and ensure all components are operating at maximum efficiency and resolve possible issues before they arise.',
      features: [
        'Direct Connection to Headquarters',
        'Remote Diagnostics',
        '24/7/365 Monitoring',
        'Factory-Trained Engineers',
        'Maximum Efficiency Assurance',
        'Proactive Issue Resolution',
        'Real-Time System Monitoring'
      ],
      image: '/Images/vision_ar-banner-c-1568x429.jpg',
      imageAlt: 'Remote system monitoring with Vision AR',
      icon: Monitor,
      imageClass: 'object-cover',
      youtubeLink: 'https://www.youtube.com/watch?v=h_CBQczJgxY'
    },
    {
      id: 6,
      title: 'Preventive Maintenance Programs',
      description: 'The performance of any plant benefits from a systematic approach to equipment maintenance. We build custom PMPs to have preventive measures performed routinely by a factory-trained Van Dyk technician. They will perform detailed inspections and, if necessary, repair work on every aspect of the system. They use an extensive checklist to verify that the plant is operating to its original specifications and prevent problems before they occur.',
      features: [
        'Custom PMP Programs',
        'Factory-Trained Technicians',
        'Detailed Inspections',
        'On-Site Repairs',
        'Extensive Checklists',
        'Original Specifications Verification',
        'Prevent Problems Before They Occur'
      ],
      cta: 'Learn About PMI',
      ctaAction: () => navigate('/pmi'),
      image: '/Images/Training School/DSC01545.JPG',
      imageAlt: 'Preventive maintenance inspection',
      icon: Settings,
      imageClass: 'object-cover'
    },
    {
      id: 7,
      title: 'Van Dyk University',
      description: 'Van Dyk wants to empower YOU with the knowledge to operate your system at peak performance. We run training courses at our headquarters under the name Van Dyk University. Courses are equipment-specific and consist of three days of both classroom sessions and hands-on training on real, working equipment in our Material Test Center or Baler Rebuild Shop. Each course is taught by a factory-trained technician who is an expert on the subject matter.',
      features: [
        'Equipment-Specific Courses',
        '3 Days of Training',
        'Classroom Sessions',
        'Hands-On Training',
        'Real Working Equipment',
        'Factory-Trained Instructors',
        'Expert Subject Matter'
      ],
      cta: 'View Courses',
      ctaLink: '/van-dyk-university',
      image: '/Images/Training School/VAN DYK UNIVERSITY LOGO.png',
      imageAlt: 'Van Dyk University training facility',
      icon: GraduationCap,
      imageClass: 'object-contain bg-white p-4'
    },
    {
      id: 8,
      title: 'Test Center',
      description: 'A fully simulated MRF system at your disposal. We run tests for waste processors, CPG brands, consultants, and academics. Separation tests can be run on any material to accurately predict the material\'s behavior in a real MRF.',
      features: [
        'Fully Simulated MRF System',
        'Tests for Waste Processors',
        'CPG Brand Testing',
        'Consultant Services',
        'Academic Research',
        'Separation Tests',
        'Accurate Material Behavior Prediction'
      ],
      cta: 'Visit Test Center',
      ctaLink: '/test-center',
      image: '/Images/TestCenterExploded.jpg',
      imageAlt: 'Material Testing Center with recycling equipment',
      icon: FlaskConical,
      imageClass: 'object-cover'
    }
  ];



  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="relative bg-gradient-to-r from-vd-blue-dark to-vd-blue text-white py-16 overflow-hidden">
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
              Unmatched Customer Support
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-gray-100 mb-4 leading-relaxed"
            >
              Everything you need to keep running - on call, online, and on site
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center"
            >
              <motion.a
                href="tel:203-967-1100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-vd-orange hover:bg-vd-orange-alt text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center gap-3 shadow-lg hover:shadow-xl"
              >
                <Phone className="w-6 h-6" />
                <span>Free Service Hotline: <span className="font-bold">(203) 967-1100</span></span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Statistics Section - Animated like Homepage */}
      <section id="stats-section" className="py-8 text-white relative overflow-hidden" ref={statsRef}>
        {/* Extended hero background image */}
        <div className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-40" style={{ backgroundImage: "url('/Images/contact-team-photo.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-vd-blue-dark/85 to-vd-blue/85" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {animatedStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center flex flex-col items-center justify-center"
              >
                <motion.div 
                  className="text-4xl md:text-5xl font-bold text-vd-orange mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  {stat.isNumeric && stat.value !== null ? (
                    <>
                      {stat.prefix || ''}{stat.displayValue.toLocaleString()}{stat.suffix}
                    </>
                  ) : (
                    stat.number
                  )}
                </motion.div>
                <div className="text-base md:text-lg text-white font-medium text-center">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-vd-blue mb-4">
                What Do We Offer?
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive solutions designed to keep your operations running smoothly—24/7 support, expert technicians, and cutting-edge technology at your fingertips.
              </p>
            </motion.div>

            <div className="space-y-8">
              {supportCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className="flex-1">
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                      <div className="flex items-center mb-6">
                        <div className="bg-vd-orange text-white rounded-full p-3 mr-4">
                          <card.icon className="h-8 w-8" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-vd-blue">{card.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {card.description}
                      </p>
                      {card.features && (
                        <ul className="space-y-2">
                          {card.features.map((feature: string, detailIndex: number) => (
                            <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}
                      {(card.cta || card.contact) && (
                        <div className="mt-6 pt-6 border-t border-gray-100">
                          {card.cta && (
                            card.ctaAction ? (
                              <motion.button
                                whileHover={{ x: 5 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  card.ctaAction?.();
                                }}
                                className="text-vd-orange font-semibold inline-flex items-center hover:text-vd-blue transition-colors"
                              >
                                {card.cta}
                                <ArrowRight className="w-5 h-5 ml-1" />
                              </motion.button>
                            ) : card.ctaExternal ? (
                              <motion.a
                                whileHover={{ x: 5 }}
                                href={card.ctaLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-vd-orange font-semibold inline-flex items-center hover:text-vd-blue transition-colors"
                              >
                                {card.cta}
                                <ExternalLink className="w-5 h-5 ml-1" />
                              </motion.a>
                            ) : card.ctaLink ? (
                              <motion.button
                                whileHover={{ x: 5 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(card.ctaLink || '#');
                                }}
                                className="text-vd-orange font-semibold inline-flex items-center hover:text-vd-blue transition-colors"
                              >
                                {card.cta}
                                <ArrowRight className="w-5 h-5 ml-1" />
                              </motion.button>
                            ) : null
                          )}
                          {card.contact && (
                            <a
                              href={`tel:${card.contact.replace(/\D/g, '')}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-vd-orange font-semibold text-base hover:text-vd-blue transition-colors inline-flex items-center ml-6"
                            >
                              <Phone className="w-4 h-4 mr-2" />
                              {card.contact}
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="bg-vd-blue text-white rounded-full w-24 h-24 flex items-center justify-center text-3xl font-bold">
                      {index + 1}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
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

      {/* Recycling Equipment FAQs Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-vd-blue-dark mb-4">
                Recycling Equipment FAQs
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Get answers to common questions about recycling equipment maintenance, support services, and technical assistance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                {
                  question: 'What maintenance is required for recycling equipment?',
                  answer: 'Regular maintenance is essential for optimal recycling equipment performance and longevity. Van Dyk Recycling Solutions provides comprehensive maintenance programs for all recycling systems, including scheduled inspections, parts replacement, and emergency service. Our maintenance checklist includes daily visual inspections, weekly lubrication, monthly calibration of optical sorters, and quarterly comprehensive system reviews. We offer 24/7 technical support (203-967-1100) and maintain a $35 million parts inventory to minimize downtime. Our field service technicians have 473 combined years of experience maintaining recycling equipment.'
                },
                {
                  question: 'How can I get technical support for my recycling equipment?',
                  answer: 'Van Dyk Recycling Solutions provides lifetime phone support at 203-967-1100, available 24/7 for all your recycling equipment needs. Our technical support team can assist with troubleshooting, parts ordering, maintenance scheduling, and operational guidance. We also offer remote troubleshooting capabilities that allow our experts to diagnose issues without on-site visits, reducing downtime and costs. For complex issues requiring hands-on attention, our network of 50+ field service technicians can provide on-site service throughout North America.'
                },
                {
                  question: 'What parts inventory do you maintain for recycling equipment?',
                  answer: 'Van Dyk Recycling Solutions maintains a $35 million parts inventory to ensure rapid availability of critical components for your recycling equipment. Our extensive inventory includes parts for Bollegraaf balers, TOMRA and Pellenc optical sorters, Lubo screens, and other major recycling systems. We stock both OEM and compatible parts, allowing us to provide cost-effective solutions while maintaining equipment performance. Our parts team can quickly identify and ship the components you need, minimizing equipment downtime and keeping your recycling operations running smoothly.'
                },
                {
                  question: 'Do you offer training for recycling equipment operators?',
                  answer: 'Yes, Van Dyk Recycling Solutions offers comprehensive training programs through Van Dyk University, covering all aspects of recycling equipment operation, maintenance, and optimization. Our training programs include hands-on instruction at our 36,000 sq ft Norwalk test center, where operators can learn on actual recycling systems. Training covers equipment operation, troubleshooting, preventive maintenance, safety protocols, and efficiency optimization. We offer both on-site training at your facility and scheduled classes at our training center, ensuring your team has the knowledge to maximize recycling equipment performance.'
                },
                {
                  question: 'How do I know if my recycling equipment needs to be replaced or upgraded?',
                  answer: 'Determining whether to replace or upgrade recycling equipment depends on equipment age, performance metrics, maintenance costs, and technological capabilities. Van Dyk Recycling Solutions provides comprehensive equipment assessments that evaluate your recycling systems and recommend optimal paths forward. Signs that recycling equipment may need attention include declining material purity rates, increasing maintenance frequency, inability to process current volumes, and lack of compatibility with modern sorting technology. Many facilities can benefit from equipment upgrades rather than complete replacement, such as retrofitting existing systems with new optical sorting technology or improved control systems.'
                },
                {
                  question: 'What warranty and support coverage do you provide for recycling equipment?',
                  answer: 'Van Dyk Recycling Solutions provides comprehensive warranty coverage and lifetime support for all recycling equipment we install. New equipment comes with full manufacturer warranties, while our certified pre-owned recycling systems include comprehensive refurbishment warranties. Beyond warranty periods, we offer lifetime phone support (203-967-1100) and ongoing maintenance programs. Our support includes 24/7 technical assistance, emergency service response, parts availability from our $35 million inventory, and access to our team of expert field service technicians with 473 combined years of experience maintaining recycling equipment.'
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-lg font-bold text-vd-blue-dark mb-3">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Link
                to="/faq"
                className="inline-block bg-vd-orange hover:bg-vd-orange-alt text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
              >
                View All FAQs
              </Link>
              <p className="mt-4 text-gray-600">
                Need immediate assistance? Call our 24/7 support line: <a href="tel:2039671100" className="text-vd-orange hover:underline font-semibold">203-967-1100</a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {/* Example for modals, only render if active */}
        {activeModal === 'training' && <div>Training Modal</div>}
      </AnimatePresence>

      {/* FAQ Schema Markup for Support Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What maintenance is required for recycling equipment?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Regular maintenance is essential for optimal recycling equipment performance and longevity. Van Dyk Recycling Solutions provides comprehensive maintenance programs for all recycling systems, including scheduled inspections, parts replacement, and emergency service. Our maintenance checklist includes daily visual inspections, weekly lubrication, monthly calibration of optical sorters, and quarterly comprehensive system reviews. We offer 24/7 technical support (203-967-1100) and maintain a $35 million parts inventory to minimize downtime.'
                }
              },
              {
                '@type': 'Question',
                name: 'How can I get technical support for my recycling equipment?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Van Dyk Recycling Solutions provides lifetime phone support at 203-967-1100, available 24/7 for all your recycling equipment needs. Our technical support team can assist with troubleshooting, parts ordering, maintenance scheduling, and operational guidance. We also offer remote troubleshooting capabilities that allow our experts to diagnose issues without on-site visits, reducing downtime and costs.'
                }
              },
              {
                '@type': 'Question',
                name: 'What parts inventory do you maintain for recycling equipment?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Van Dyk Recycling Solutions maintains a $35 million parts inventory to ensure rapid availability of critical components for your recycling equipment. Our extensive inventory includes parts for Bollegraaf balers, TOMRA and Pellenc optical sorters, Lubo screens, and other major recycling systems. Our parts team can quickly identify and ship the components you need, minimizing equipment downtime.'
                }
              },
              {
                '@type': 'Question',
                name: 'Do you offer training for recycling equipment operators?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, Van Dyk Recycling Solutions offers comprehensive training programs through Van Dyk University, covering all aspects of recycling equipment operation, maintenance, and optimization. Our training programs include hands-on instruction at our 36,000 sq ft Norwalk test center, where operators can learn on actual recycling systems. Training covers equipment operation, troubleshooting, preventive maintenance, safety protocols, and efficiency optimization.'
                }
              },
              {
                '@type': 'Question',
                name: 'How do I know if my recycling equipment needs to be replaced or upgraded?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Determining whether to replace or upgrade recycling equipment depends on equipment age, performance metrics, maintenance costs, and technological capabilities. Van Dyk Recycling Solutions provides comprehensive equipment assessments that evaluate your recycling systems and recommend optimal paths forward. Signs that recycling equipment may need attention include declining material purity rates, increasing maintenance frequency, inability to process current volumes, and lack of compatibility with modern sorting technology.'
                }
              },
              {
                '@type': 'Question',
                name: 'What warranty and support coverage do you provide for recycling equipment?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Van Dyk Recycling Solutions provides comprehensive warranty coverage and lifetime support for all recycling equipment we install. New equipment comes with full manufacturer warranties, while our certified pre-owned recycling systems include comprehensive refurbishment warranties. Beyond warranty periods, we offer lifetime phone support (203-967-1100) and ongoing maintenance programs. Our support includes 24/7 technical assistance, emergency service response, and access to our team of expert field service technicians.'
                }
              }
            ]
          })
        }}
      />
    </div>
  );
};

export default ServicesSupport;
