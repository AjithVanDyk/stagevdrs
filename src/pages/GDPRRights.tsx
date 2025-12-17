import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail, Download, Trash2, Eye, X, CheckCircle, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { SEO_PAGES } from '../utils/seo';
import { useTranslation } from '../hooks/useTranslation';

const GDPRRights: React.FC = () => {
  const { t } = useTranslation();
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const rights = [
    {
      id: 'access',
      icon: Eye,
      title: t('gdprRights.accessTitle') || 'Right of Access',
      description: t('gdprRights.accessDescription') || 'Request a copy of all personal data we hold about you.',
      action: t('gdprRights.requestAccess') || 'Request Access'
    },
    {
      id: 'rectification',
      icon: CheckCircle,
      title: t('gdprRights.rectificationTitle') || 'Right to Rectification',
      description: t('gdprRights.rectificationDescription') || 'Correct inaccurate or incomplete personal data.',
      action: t('gdprRights.requestRectification') || 'Request Correction'
    },
    {
      id: 'erasure',
      icon: Trash2,
      title: t('gdprRights.erasureTitle') || 'Right to Erasure',
      description: t('gdprRights.erasureDescription') || 'Request deletion of your personal data ("right to be forgotten").',
      action: t('gdprRights.requestErasure') || 'Request Deletion'
    },
    {
      id: 'portability',
      icon: Download,
      title: t('gdprRights.portabilityTitle') || 'Right to Data Portability',
      description: t('gdprRights.portabilityDescription') || 'Receive your personal data in a structured, machine-readable format.',
      action: t('gdprRights.requestPortability') || 'Request Data Export'
    },
    {
      id: 'restriction',
      icon: X,
      title: t('gdprRights.restrictionTitle') || 'Right to Restriction',
      description: t('gdprRights.restrictionDescription') || 'Request restriction of processing of your personal data.',
      action: t('gdprRights.requestRestriction') || 'Request Restriction'
    },
    {
      id: 'objection',
      icon: AlertCircle,
      title: t('gdprRights.objectionTitle') || 'Right to Object',
      description: t('gdprRights.objectionDescription') || 'Object to processing of your personal data for certain purposes.',
      action: t('gdprRights.requestObjection') || 'Object to Processing'
    }
  ];

  const handleRequest = async (rightId: string) => {
    setSelectedRight(rightId);
    setSubmissionStatus('idle');

    try {
      // Call appropriate API endpoint
      const endpoint = `/api/gdpr/${rightId}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: '', // Would be filled from form
          requestType: rightId
        })
      });

      if (response.ok) {
        setSubmissionStatus('success');
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('GDPR request error:', error);
      setSubmissionStatus('error');
    }
  };

  return (
    <>
      <SEO data={SEO_PAGES.gdpr || SEO_PAGES.privacy} />
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
              {t('gdprRights.heroTitle') || 'Your GDPR Rights'}
            </h1>
            <p className="text-xl text-gray-200">
              {t('gdprRights.heroDescription') || 'Exercise your data protection rights under the General Data Protection Regulation'}
            </p>
          </div>
        </motion.section>

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto space-y-6">
            {rights.map((right) => {
              const Icon = right.icon;
              return (
                <motion.section
                  key={right.id}
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-vd-orange/10 p-3 rounded-lg">
                        <Icon className="w-6 h-6 text-vd-orange" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-vd-blue-dark mb-2">
                          {right.title}
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          {right.description}
                        </p>
                        {right.id === 'access' && (
                          <p className="text-gray-600 text-sm mb-4 italic">
                            {t('gdprRights.rightAccessDetailed') || 'Right of Access: You have the right to obtain confirmation as to whether or not personal data concerning you is being processed, and, where that is the case, access to the personal data and information including: the purposes of processing, the categories of personal data concerned, the recipients or categories of recipients, the retention period, your rights, and the source of the data.'}
                          </p>
                        )}
                        {right.id === 'rectification' && (
                          <p className="text-gray-600 text-sm mb-4 italic">
                            {t('gdprRights.rightRectificationDetailed') || 'Right to Rectification: You have the right to have inaccurate personal data corrected and incomplete personal data completed. We will make corrections without undue delay.'}
                          </p>
                        )}
                        {right.id === 'erasure' && (
                          <p className="text-gray-600 text-sm mb-4 italic">
                            {t('gdprRights.rightErasureDetailed') || 'Right to Erasure: You have the right to request deletion of your personal data when: the data is no longer necessary, you withdraw consent, you object to processing, the data has been unlawfully processed, or deletion is required for legal compliance.'}
                          </p>
                        )}
                        {right.id === 'portability' && (
                          <p className="text-gray-600 text-sm mb-4 italic">
                            {t('gdprRights.rightPortabilityDetailed') || 'Right to Data Portability: You have the right to receive your personal data in a structured, commonly used, and machine-readable format and to transmit that data to another controller, where technically feasible.'}
                          </p>
                        )}
                        {right.id === 'restriction' && (
                          <p className="text-gray-600 text-sm mb-4 italic">
                            {t('gdprRights.rightRestrictionDetailed') || 'Right to Restriction: You have the right to request restriction of processing when: you contest the accuracy of data, processing is unlawful, we no longer need the data, or you have objected to processing pending verification.'}
                          </p>
                        )}
                        {right.id === 'objection' && (
                          <p className="text-gray-600 text-sm mb-4 italic">
                            {t('gdprRights.rightObjectionDetailed') || 'Right to Object: You have the right to object to processing of your personal data for direct marketing purposes or processing based on legitimate interests. We will stop processing unless we demonstrate compelling legitimate grounds.'}
                          </p>
                        )}
                        <button
                          onClick={() => handleRequest(right.id)}
                          className="px-6 py-2 bg-vd-blue hover:bg-vd-blue-dark text-white font-semibold rounded-lg transition-colors"
                        >
                          {right.action}
                        </button>
                        {selectedRight === right.id && submissionStatus === 'success' && (
                          <p className="mt-4 text-green-600 flex items-center">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            {t('gdprRights.requestSubmitted') || 'Your request has been submitted. We will process it within 30 days.'}
                          </p>
                        )}
                        {selectedRight === right.id && submissionStatus === 'error' && (
                          <p className="mt-4 text-red-600 flex items-center">
                            <AlertCircle className="w-5 h-5 mr-2" />
                            {t('gdprRights.requestError') || 'An error occurred. Please contact us directly at info@vdrs.com.'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.section>
              );
            })}

            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                  Verification & Response
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">Verification Requirements</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('gdprRights.verificationRequirements') || 'Verification Requirements: To protect your privacy, we will verify your identity before processing your request. We may require proof of identity such as a copy of your ID or verification of your email address.'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">Response Timeframes</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('gdprRights.responseTimeframes') || 'Response Timeframes: We will respond to your request within 30 days. If we need more time (up to 60 days total), we will inform you of the reason and extension period.'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">Data Controller</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('gdprRights.dataControllerInfo') || 'Data Controller: Van Dyk Recycling Solutions, 360 Dr. Martin Luther King Jr. Drive, Norwalk, CT 06854, USA. For EU data protection inquiries, contact: info@vdrs.com.'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">Right to Lodge Complaint</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('gdprRights.lodgeComplaint') || 'Right to Lodge Complaint: You have the right to lodge a complaint with a supervisory authority, in particular in the Member State of your habitual residence, place of work, or place of the alleged infringement if you consider that processing violates GDPR.'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">Data Portability Format</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('gdprRights.portabilityFormat') || 'Data Portability Format: Your data will be provided in JSON or CSV format, containing all personal data we hold about you in a structured, machine-readable format.'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">Automated Decision-Making</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('gdprRights.automatedDecisionMaking') || 'Automated Decision-Making: We do not use automated decision-making or profiling that produces legal effects or significantly affects you. If this changes, we will inform you and obtain your consent where required.'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">Withdrawal of Consent</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('gdprRights.withdrawConsent') || 'Withdrawal of Consent: Where processing is based on consent, you have the right to withdraw consent at any time. Withdrawal does not affect the lawfulness of processing before withdrawal.'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-gradient-to-r from-vd-blue to-vd-blue-dark text-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4">
                  {t('gdprRights.contactTitle') || 'Need Help?'}
                </h2>
                <p className="text-gray-200 leading-relaxed mb-4">
                  {t('gdprRights.contactBody') || 'If you have questions about your GDPR rights or need assistance, please contact us:'}
                </p>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-vd-orange" />
                  <a href="mailto:info@vdrs.com" className="text-gray-200 hover:text-vd-orange underline">
                    info@vdrs.com
                  </a>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </>
  );
};

export default GDPRRights;



