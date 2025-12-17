import React from 'react';
import { motion } from 'framer-motion';
import { Accessibility as AccessibilityIcon, Mail, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { SEO_PAGES } from '../utils/seo';
import { useTranslation } from '../hooks/useTranslation';

const Accessibility: React.FC = () => {
  const { t } = useTranslation();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <>
      <SEO data={SEO_PAGES.accessibility || SEO_PAGES.privacy} />
      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-vd-blue-dark text-white py-16"
        >
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-vd-orange rounded-full mb-6">
              <AccessibilityIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('accessibility.heroTitle') || 'Accessibility Statement'}
            </h1>
            <p className="text-xl text-gray-200">
              {t('accessibility.heroDescription') || 'Our commitment to digital accessibility'}
            </p>
          </div>
        </motion.section>

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto space-y-10">
            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                  {t('accessibility.commitmentTitle') || 'Our Commitment'}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('accessibility.commitmentBody') || 'Van Dyk Recycling Solutions is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.'}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {t('accessibility.wcagCompliance') || 'We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.'}
                </p>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                  {t('accessibility.featuresTitle') || 'Accessibility Features'}
                </h2>
                <ul className="list-disc list-inside text-gray-700 space-y-3 ml-4">
                  <li>{t('accessibility.featureKeyboard') || 'Keyboard navigation support for all interactive elements'}</li>
                  <li>{t('accessibility.featureScreenReader') || 'Screen reader compatibility with proper ARIA labels'}</li>
                  <li>{t('accessibility.featureAltText') || 'Descriptive alt text for all images'}</li>
                  <li>{t('accessibility.featureContrast') || 'Sufficient color contrast ratios (WCAG AA standards)'}</li>
                  <li>{t('accessibility.featureHeadings') || 'Proper heading hierarchy for content structure'}</li>
                  <li>{t('accessibility.featureForms') || 'Accessible form labels and error messages'}</li>
                  <li>{t('accessibility.featureFocus') || 'Visible focus indicators for keyboard navigation'}</li>
                </ul>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                  {t('accessibility.feedbackTitle') || 'Feedback & Contact'}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('accessibility.feedbackBody') || 'We welcome your feedback on the accessibility of our website. If you encounter any accessibility barriers, please contact us:'}
                </p>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-vd-orange" />
                  <a href="mailto:info@vdrs.com" className="text-vd-blue hover:text-vd-orange underline">
                    info@vdrs.com
                  </a>
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                  {t('accessibility.testingTitle') || 'Testing & Updates'}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('accessibility.testingBody') || 'We regularly test our website using automated accessibility tools and manual testing with assistive technologies. We are committed to ongoing improvements and will update this statement as we make progress.'}
                </p>
                <div className="mt-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">
                      {t('accessibility.conformanceLevel')?.split(':')[0] || 'Conformance Level'}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('accessibility.conformanceLevel') || 'Conformance Level: This website aims to conform to WCAG 2.1 Level AA standards. We have conducted accessibility testing and are working to ensure all content meets these standards.'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">
                      {t('accessibility.testingMethodology')?.split(':')[0] || 'Testing Methodology'}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('accessibility.testingMethodology') || 'Testing Methodology: We use a combination of automated tools (such as WAVE, axe DevTools) and manual testing with assistive technologies including screen readers (NVDA, JAWS, VoiceOver) and keyboard-only navigation.'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">
                      {t('accessibility.assistiveTechnologies')?.split(':')[0] || 'Assistive Technologies Tested'}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('accessibility.assistiveTechnologies') || 'Assistive Technologies Tested: NVDA (Windows), JAWS (Windows), VoiceOver (macOS/iOS), keyboard navigation, and various browser accessibility features.'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">
                      {t('accessibility.knownLimitations')?.split(':')[0] || 'Known Limitations'}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('accessibility.knownLimitations') || 'Known Limitations: While we strive to ensure accessibility, some third-party content or embedded media may not fully meet accessibility standards. We are working with our partners to improve this.'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">
                      {t('accessibility.improvementTimeline')?.split(':')[0] || 'Improvement Timeline'}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('accessibility.improvementTimeline') || 'Improvement Timeline: We review and update our website accessibility quarterly and address identified issues within 30 days of discovery.'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">
                      {t('accessibility.thirdPartyContent')?.split(':')[0] || 'Third-Party Content'}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('accessibility.thirdPartyContent') || 'Third-Party Content: Some content on our website may be provided by third parties. While we cannot guarantee the accessibility of all third-party content, we work with our partners to ensure accessibility standards are met.'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">
                      {t('accessibility.vpatStatement')?.split(':')[0] || 'VPAT Statement'}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('accessibility.vpatStatement') || 'VPAT Statement: We are committed to providing accessible digital content. For specific accessibility documentation or VPAT requests, please contact us at info@vdrs.com.'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accessibility;



