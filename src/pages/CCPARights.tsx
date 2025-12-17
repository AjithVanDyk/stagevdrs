import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import { SEO_PAGES } from '../utils/seo';
import { useTranslation } from '../hooks/useTranslation';

const CCPARights: React.FC = () => {
  const { t } = useTranslation();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <>
      <SEO data={SEO_PAGES.ccpa || SEO_PAGES.privacy} />
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
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('ccpaRights.heroTitle') || 'California Privacy Rights (CCPA/CPRA)'}
            </h1>
            <p className="text-xl text-gray-200">
              {t('ccpaRights.heroDescription') || 'Your rights under the California Consumer Privacy Act'}
            </p>
          </div>
        </motion.section>

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto space-y-10">
            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                  {t('ccpaRights.rightsTitle') || 'Your California Privacy Rights'}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('ccpaRights.rightsIntro') || 'If you are a California resident, you have the following rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA):'}
                </p>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">
                      {t('ccpaRights.rightAccess') || 'Right to Know'}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('ccpaRights.rightAccessDetailed') || 'Right to Know: You have the right to request that we disclose certain information about our collection and use of your personal information over the past 12 months. This includes: the categories of personal information we collected, the sources from which we collected it, our business or commercial purpose for collecting it, the categories of third parties with whom we shared it, and the specific pieces of personal information we collected about you.'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">
                      {t('ccpaRights.rightDelete') || 'Right to Delete'}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('ccpaRights.rightDeleteDetailed') || 'Right to Delete: You have the right to request that we delete any of your personal information that we collected from you and retained, subject to certain exceptions. We may deny your deletion request if retaining the information is necessary for us or our service providers to complete a transaction, detect security incidents, comply with legal obligations, or for other lawful purposes.'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">
                      {t('ccpaRights.rightOptOut') || 'Right to Opt-Out'}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('ccpaRights.rightOptOutDetailed') || 'Right to Opt-Out: You have the right to direct us not to sell or share your personal information at any time. We do not sell personal information in the traditional sense, but we may share information with third parties for advertising purposes. You can opt-out by contacting us or using the "Do Not Sell or Share My Personal Information" link in our footer.'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">
                      {t('ccpaRights.rightNonDiscrimination') || 'Right to Non-Discrimination'}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('ccpaRights.rightNonDiscriminationDetailed') || 'Right to Non-Discrimination: We will not discriminate against you for exercising any of your CCPA/CPRA rights. We will not deny you goods or services, charge you different prices, provide you a different level or quality of services, or suggest that you may receive a different price or level of services for exercising your rights.'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">
                      {t('ccpaRights.rightCorrection') || 'Right to Correction'}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('ccpaRights.rightCorrectionDetailed') || 'Right to Correction: You have the right to request correction of inaccurate personal information. We will use commercially reasonable efforts to correct inaccurate information upon verification of your identity.'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">
                      {t('ccpaRights.rightLimit') || 'Right to Limit'}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('ccpaRights.rightLimitDetailed') || 'Right to Limit: You have the right to limit the use and disclosure of your sensitive personal information to that use which is necessary to perform the services or provide the goods reasonably expected by an average consumer. Sensitive personal information includes Social Security numbers, driver\'s license numbers, precise geolocation, racial or ethnic origin, and other categories defined by CPRA.'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                  Global Privacy Control (GPC)
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('ccpaRights.gpcStatement') || 'Global Privacy Control (GPC): We recognize and honor Global Privacy Control (GPC) signals sent by your browser. If you have enabled GPC, we will treat this as a request to opt-out of the sale or sharing of your personal information.'}
                </p>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                  Verification Process
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('ccpaRights.verificationProcess') || 'Verification Process: To protect your privacy, we will verify your identity before processing your request. We may ask you to provide certain information to verify your identity, such as your email address or phone number associated with your account. For requests to access or delete sensitive information, we may require additional verification.'}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {t('ccpaRights.responseTimeframes') || 'Response Timeframes: We will respond to your request within 45 days. If we need more time (up to 90 days total), we will inform you of the reason and extension period in writing.'}
                </p>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                  Authorized Agents
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('ccpaRights.authorizedAgents') || 'Authorized Agents: You may designate an authorized agent to make requests on your behalf. The authorized agent must provide proof of your written permission or power of attorney. We may still require you to verify your identity directly with us.'}
                </p>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                  Information We Collect
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">Categories Collected</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('ccpaRights.categoriesCollected') || 'Categories of Personal Information Collected: Identifiers (name, email, phone), commercial information (purchase history), internet activity (browsing history, IP address), geolocation data, professional information, and inferences drawn from the above.'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">Sources of Data</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('ccpaRights.sourcesOfData') || 'Sources of Personal Information: We collect information directly from you (forms, communications), automatically (cookies, analytics), and from third parties (service providers, partners).'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">Business Purposes</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('ccpaRights.businessPurposes') || 'Business/Commercial Purposes: We use personal information for providing services, processing transactions, marketing, analytics, security, legal compliance, and improving our services.'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">Third-Party Disclosure</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('ccpaRights.thirdPartyDisclosure') || 'Third Parties Who Receive Information: We may share information with service providers (hosting, analytics), business partners (for joint marketing), and as required by law. We do not sell personal information to third parties.'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                  {t('ccpaRights.howToExerciseTitle') || 'How to Exercise Your Rights'}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('ccpaRights.howToExerciseIntro') || 'To exercise your California privacy rights, please contact us:'}
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-vd-orange mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">{t('ccpaRights.emailLabel') || 'Email'}</h3>
                      <a href="mailto:info@vdrs.com" className="text-vd-blue hover:text-vd-orange underline">
                        info@vdrs.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-vd-orange mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">{t('ccpaRights.phoneLabel') || 'Phone'}</h3>
                      <p className="text-gray-700">203-967-1100</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-vd-orange mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">{t('ccpaRights.addressLabel') || 'Address'}</h3>
                      <p className="text-gray-700">
                        Van Dyk Recycling Solutions<br />
                        360 Dr. Martin Luther King Jr. Drive<br />
                        Norwalk, CT 06854
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                  {t('ccpaRights.responseTimeTitle') || 'Response Time'}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('ccpaRights.responseTimeBody') || 'We will respond to your request within 45 days. If we need more time, we will inform you of the reason and extension period.'}
                </p>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </>
  );
};

export default CCPARights;



