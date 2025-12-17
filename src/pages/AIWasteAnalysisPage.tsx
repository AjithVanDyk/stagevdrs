import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowDown, Quote, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SolutionPageTemplate from '../components/SolutionPageTemplate';
import { useTranslation } from '../hooks/useTranslation';
import SEO from '../components/SEO';
import EPRComplianceMap from '../components/EPRComplianceMap';

const AIWasteAnalysisPage: React.FC = () => {
  const { t } = useTranslation();
  const eprMapRef = useRef<HTMLDivElement>(null);
  
  const scrollToEPRMap = () => {
    eprMapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const solution = {
    id: 14,
    name: t('solutions.solution14Name'),
    image: '/Images/greyparrot-ai-new.jpg',
    description: t('solutions.solution14Description'),
    features: [
      t('solutions.solution14Feature1'),
      t('solutions.solution14Feature2'),
      t('solutions.solution14Feature3'),
      t('solutions.solution14Feature4'),
      t('solutions.solution14Feature5'),
      t('solutions.solution14Feature6'),
      t('solutions.solution14Feature7'),
      t('solutions.solution14Feature8'),
      // Add EPR Compliance as a special clickable feature
      'EPR Compliance Tracking & State-by-State Analysis'
    ],
    specifications: {
      [t('solutions.solution14Spec1Key')]: t('solutions.solution14Spec1Value'),
      [t('solutions.solution14Spec2Key')]: t('solutions.solution14Spec2Value'),
      [t('solutions.solution14Spec3Key')]: t('solutions.solution14Spec3Value'),
      [t('solutions.solution14Spec4Key')]: t('solutions.solution14Spec4Value'),
      [t('solutions.solution14Spec5Key')]: t('solutions.solution14Spec5Value'),
      [t('solutions.solution14Spec6Key')]: t('solutions.solution14Spec6Value'),
    },
    applications: [
      { name: t('solutions.solution14App1') },
      { name: t('solutions.solution14App2') },
      { name: t('solutions.solution14App3') },
      { name: t('solutions.solution14App4') },
      { name: t('solutions.solution14App5') },
    ],
    benefits: [
      t('solutions.solution14Benefit1'),
      t('solutions.solution14Benefit2'),
      t('solutions.solution14Benefit3'),
      t('solutions.solution14Benefit4'),
      t('solutions.solution14Benefit5'),
    ],
    equipment: [
      { name: 'Greyparrot', link: '/equipment/greyparrot-ai' }
    ],
    videos: [
      'https://youtu.be/B_VmEcZBy6M', // E-Scrap E-Waste Sorting with Artificial Intelligence Tomra Autosort Optical Sorter
      'https://youtu.be/xjqEJdePkS4'  // E-Waste Processing Tomra Autosort Optical Sorter Finder Mode
    ],
    gallery: [
      '/Images/greyparrot-ai-new.jpg',
      '/Images/greyparrot-ai-recognition.jpg',
      '/Images/greyparrot-ai.jpg'
    ],
    testimonials: [
      {
        name: 'Amanda Foster',
        company: 'AI Waste Solutions',
        quote: 'AI waste analysis has revolutionized our operations. Exceptional accuracy and insights.',
        rating: 5
      },
      {
        name: 'Thomas Anderson',
        company: 'Smart Waste Systems',
        quote: 'Outstanding AI technology with real-time analytics capabilities.',
        rating: 5
      },
      {
        name: 'Rachel Green',
        company: 'EcoAnalytics Corp',
        quote: 'Best AI waste analysis system we\'ve implemented. Highly accurate and reliable.',
        rating: 5
      }
    ]
  };

  return (
    <>
      <SEO data={{
        title: 'AI-Based Waste Analytics - Van Dyk Recycling Solutions',
        description: 'Advanced AI-powered waste analytics and material recognition technology for comprehensive waste analysis and optimization.',
        url: '/solutions/ai-waste-analysis',
        keywords: 'AI waste analytics, waste analysis, material recognition, computer vision, predictive analytics, EPR compliance tracking'
      }} />
      
      <SolutionPageTemplate solution={solution} showCTA={false} />
      
      {/* EPR Compliance Map Section */}
      <div ref={eprMapRef} id="epr-compliance-map">
        <EPRComplianceMap />
      </div>

      {/* CTA Section - Moved to bottom */}
      <section className="py-20 bg-gradient-to-br from-vd-blue to-vd-blue-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started with AI-Based Waste Analytics?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Contact our experts to learn more about how AI-Based Waste Analytics can benefit your operation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/quote"
                  className="bg-vd-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 transition-colors"
                >
                  <Quote className="w-5 h-5" />
                  <span>Get a Quote</span>
                </Link>
              </motion.div>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-vd-blue px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
                <span>Contact Us</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AIWasteAnalysisPage;
