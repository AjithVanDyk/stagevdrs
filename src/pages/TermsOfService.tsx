import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, AlertTriangle } from 'lucide-react';
import SEO from '../components/SEO';
import { SEO_PAGES } from '../utils/seo';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../config/translations';

const TermsOfService: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  // Helper to get array translations
  const getArrayTranslation = (key: string, fallback: string[]): string[] => {
    const keys = key.split('.');
    const localizedValue = keys.reduce((acc: any, k) => acc?.[k], translations[language]);
    if (Array.isArray(localizedValue)) {
      return localizedValue;
    }
    const fallbackValue = keys.reduce((acc: any, k) => acc?.[k], translations.en);
    if (Array.isArray(fallbackValue)) {
      return fallbackValue;
    }
    return fallback;
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <>
      <SEO data={SEO_PAGES.terms || SEO_PAGES.privacy} />
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
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('terms.heroTitle') || 'Terms of Service'}
            </h1>
            <p className="text-xl text-gray-200">
              {t('terms.heroDescription') || 'Please read these terms carefully before using our website'}
            </p>
          </div>
        </motion.section>

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto space-y-10">
            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                  {t('terms.acceptanceTitle') || 'Acceptance of Terms'}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('terms.acceptanceBody') || 'By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our website.'}
                </p>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-vd-orange mr-3" />
                  <h2 className="text-2xl font-bold text-vd-blue-dark">
                    {t('terms.usageTitle') || 'Use License & Restrictions'}
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('terms.usageIntro') || 'Permission is granted to temporarily access the materials on our website for personal, non-commercial transitory viewing only.'}
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>{t('terms.restriction1') || 'You may not modify or copy the materials'}</li>
                  <li>{t('terms.restriction2') || 'You may not use the materials for any commercial purpose'}</li>
                  <li>{t('terms.restriction3') || 'You may not attempt to decompile or reverse engineer any software'}</li>
                  <li>{t('terms.restriction4') || 'You may not remove any copyright or proprietary notations'}</li>
                </ul>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-4">
                  <Shield className="w-6 h-6 text-vd-orange mr-3" />
                  <h2 className="text-2xl font-bold text-vd-blue-dark">
                    {t('terms.liabilityTitle') || 'Disclaimer & Limitation of Liability'}
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('terms.liabilityBody') || 'The materials on our website are provided on an "as is" basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.'}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {t('terms.liabilityLimitation') || 'In no event shall Van Dyk Recycling Solutions or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website.'}
                </p>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                  {t('terms.intellectualPropertyTitle') || 'Intellectual Property'}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('terms.intellectualPropertyBody') || 'All content on this website, including text, graphics, logos, images, and software, is the property of Van Dyk Recycling Solutions or its content suppliers and is protected by United States and international copyright laws.'}
                </p>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                  {t('terms.userAccountsTitle') || 'User Accounts and Responsibilities'}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('terms.userAccountsBody') || 'If you create an account on our website, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account.'}
                </p>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                  {t('terms.prohibitedUsesTitle') || 'Prohibited Uses'}
                </h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  {getArrayTranslation('terms.prohibitedUsesList', [
                    'Use the website in any way that violates applicable laws or regulations',
                    'Transmit any malicious code, viruses, or harmful software',
                    'Attempt to gain unauthorized access to any part of the website',
                    'Interfere with or disrupt the website or servers',
                    'Use automated systems to access the website without permission',
                    'Collect or harvest personal information of other users',
                    'Impersonate any person or entity or misrepresent your affiliation'
                  ]).map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                  {t('terms.userGeneratedContentTitle') || 'User-Generated Content'}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('terms.userGeneratedContentBody') || 'If you submit content to our website (comments, reviews, etc.), you grant us a non-exclusive, royalty-free, perpetual license to use, modify, and display such content. You represent that you have the right to grant such license.'}
                </p>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                  {t('terms.disclaimerWarrantiesTitle') || 'Disclaimer of Warranties'}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('terms.disclaimerWarrantiesBody') || 'The website and all content are provided "as is" without warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.'}
                </p>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                  {t('terms.limitationLiabilityTitle') || 'Limitation of Liability'}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('terms.limitationLiabilityBody') || 'To the fullest extent permitted by law, Van Dyk Recycling Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.'}
                </p>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                  {t('terms.indemnificationTitle') || 'Indemnification'}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('terms.indemnificationBody') || 'You agree to indemnify and hold harmless Van Dyk Recycling Solutions, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses arising out of your use of the website or violation of these terms.'}
                </p>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                  {t('terms.terminationTitle') || 'Termination'}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('terms.terminationBody') || 'We reserve the right to terminate or suspend your access to the website immediately, without prior notice, for any breach of these terms or for any other reason we deem necessary.'}
                </p>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                  {t('terms.governingLawTitle') || 'Governing Law and Jurisdiction'}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('terms.governingLawBody') || 'These terms shall be governed by and construed in accordance with the laws of the State of Connecticut, United States, without regard to its conflict of law provisions. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Connecticut.'}
                </p>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                  {t('terms.disputeResolutionTitle') || 'Dispute Resolution'}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('terms.disputeResolutionBody') || 'Any disputes arising out of or relating to these terms shall first be addressed through good faith negotiations. If a resolution cannot be reached, disputes shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.'}
                </p>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                  {t('terms.severabilityTitle') || 'Severability'}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('terms.severabilityBody') || 'If any provision of these terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these terms shall otherwise remain in full force and effect.'}
                </p>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                  {t('terms.entireAgreementTitle') || 'Entire Agreement'}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('terms.entireAgreementBody') || 'These terms constitute the entire agreement between you and Van Dyk Recycling Solutions regarding the use of this website and supersede all prior agreements and understandings.'}
                </p>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                  {t('terms.changesTitle') || 'Revisions & Changes'}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('terms.changesBody') || 'Van Dyk Recycling Solutions may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.'}
                </p>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                  {t('terms.contactTitle') || 'Contact Information'}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('terms.contactBody') || 'If you have any questions about these Terms of Service, please contact us at info@vdrs.com or call (203) 967-1100.'}
                </p>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;



