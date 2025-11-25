import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Mail, Phone, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import { SEO_PAGES } from '../utils/seo';
import { useTranslation } from '../hooks/useTranslation';
import { translations } from '../config/translations';

const PrivacyPolicy = () => {
  const { t, language } = useTranslation();
  const privacyCopy = useMemo(
    () => translations[language]?.privacyPolicy ?? translations.en.privacyPolicy,
    [language]
  );

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const infoSections = [
    {
      heading: t('privacyPolicy.infoPersonalHeading'),
      items: privacyCopy.infoPersonalList
    },
    {
      heading: t('privacyPolicy.infoTechnicalHeading'),
      items: privacyCopy.infoTechnicalList
    },
    {
      heading: t('privacyPolicy.infoCookiesHeading'),
      body: t('privacyPolicy.infoCookiesBody')
    }
  ];

  const useSections = [
    {
      heading: t('privacyPolicy.useBusinessHeading'),
      items: privacyCopy.useBusinessList
    },
    {
      heading: t('privacyPolicy.useMarketingHeading'),
      items: privacyCopy.useMarketingList
    }
  ];

  const securitySections = [
    {
      heading: t('privacyPolicy.securityTechnicalHeading'),
      items: privacyCopy.securityTechnicalList
    },
    {
      heading: t('privacyPolicy.securityAdministrativeHeading'),
      items: privacyCopy.securityAdministrativeList
    }
  ];

  const rightsSections = [
    {
      heading: t('privacyPolicy.rightsAccessHeading'),
      items: privacyCopy.rightsAccessList
    },
    {
      heading: t('privacyPolicy.rightsCommunicationHeading'),
      items: privacyCopy.rightsCommunicationList
    }
  ];

  return (
    <>
      <SEO data={SEO_PAGES.privacy} />
      <div className="min-h-screen bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-vd-blue-dark text-white py-16"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-vd-orange rounded-full mb-6"
              >
                <Shield className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t('privacyPolicy.heroTitle')}
              </h1>
              <p className="text-xl text-gray-200">
                {t('privacyPolicy.heroDescription')}
              </p>
              <p className="text-sm text-gray-300 mt-4">
                {t('privacyPolicy.lastUpdated')}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="container mx-auto px-4 py-16"
        >
          <div className="max-w-4xl mx-auto">
            <motion.section variants={fadeInUp} className="mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                  {t('privacyPolicy.introTitle')}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('privacyPolicy.introBody1')}
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('privacyPolicy.introBody2')}
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <a href="mailto:info@vdrs.com" className="text-vd-orange hover:text-vd-orange-alt underline">
                    {t('privacyPolicy.introContactNote')}
                  </a>
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('privacyPolicy.introEncryption')}
                </p>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-vd-blue-dark mb-3">
                    {t('privacyPolicy.externalLinksTitle')}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t('privacyPolicy.externalLinksBody')}
                  </p>
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} className="mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <Database className="w-6 h-6 text-vd-orange mr-3" />
                  <h2 className="text-2xl font-bold text-vd-blue-dark">
                    {t('privacyPolicy.infoCollectTitle')}
                  </h2>
                </div>

                <div className="space-y-6">
                  {infoSections.map((section) => (
                    <div key={section.heading}>
                      <h3 className="text-lg font-semibold text-vd-blue-dark mb-3">
                        {section.heading}
                      </h3>
                      {section.items ? (
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                          {section.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-700 leading-relaxed">{section.body}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} className="mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <Eye className="w-6 h-6 text-vd-orange mr-3" />
                  <h2 className="text-2xl font-bold text-vd-blue-dark">
                    {t('privacyPolicy.useInfoTitle')}
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {useSections.map((section) => (
                    <div key={section.heading}>
                      <h3 className="text-lg font-semibold text-vd-blue-dark mb-3">
                        {section.heading}
                      </h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        {section.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} className="mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <Lock className="w-6 h-6 text-vd-orange mr-3" />
                  <h2 className="text-2xl font-bold text-vd-blue-dark">
                    {t('privacyPolicy.sharingTitle')}
                  </h2>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('privacyPolicy.sharingIntro')}
                </p>

                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  {privacyCopy.sharingList.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} className="mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-6">
                  {t('privacyPolicy.securityTitle')}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('privacyPolicy.securityBody')}
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {securitySections.map((section) => (
                    <div key={section.heading}>
                      <h3 className="text-lg font-semibold text-vd-blue-dark mb-3">
                        {section.heading}
                      </h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        {section.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} className="mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-6">
                  {t('privacyPolicy.rightsTitle')}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {t('privacyPolicy.rightsIntro')}
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {rightsSections.map((section) => (
                    <div key={section.heading}>
                      <h3 className="text-lg font-semibold text-vd-blue-dark mb-3">
                        {section.heading}
                      </h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        {section.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} className="mb-12">
              <div className="bg-gradient-to-r from-vd-blue to-vd-blue-dark text-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">
                  {t('privacyPolicy.contactTitle')}
                </h2>
                <p className="text-gray-200 leading-relaxed mb-6">
                  {t('privacyPolicy.contactBody')}
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-vd-orange mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">{t('privacyPolicy.contactEmailLabel')}</h3>
                      <a href={`mailto:${t('privacyPolicy.contactEmailAddress')}`} className="text-gray-200 hover:text-vd-orange underline">
                        {t('privacyPolicy.contactEmailAddress')}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-vd-orange mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">{t('privacyPolicy.contactPhoneLabel')}</h3>
                      <p className="text-gray-200">203-967-1100</p>
                    </div>
                  </div>
                  <div className="flex items-start md:col-span-2">
                    <MapPin className="w-5 h-5 text-vd-orange mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">{t('privacyPolicy.contactAddressLabel')}</h3>
                      <p className="text-gray-200">
                        Van Dyk Recycling Solutions<br />
                        360 Dr. Martin Luther King Jr. Drive<br />
                        Norwalk, CT 06854
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
                  {t('privacyPolicy.updatesTitle')}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('privacyPolicy.updatesBody')}
                </p>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
