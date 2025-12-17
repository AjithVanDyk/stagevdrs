import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Cookie, Shield, SlidersHorizontal, Globe, Mail, Phone, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import { SEO_PAGES } from '../utils/seo';
import { useTranslation } from '../hooks/useTranslation';

const CookiePolicy: React.FC = () => {
  const { t } = useTranslation();
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const sections = useMemo(() => [
    {
      title: t('cookiePolicy.whatAreCookiesTitle'),
      body: t('cookiePolicy.whatAreCookiesBody')
    },
    {
      title: t('cookiePolicy.typesTitle'),
      items: [
        {
          heading: t('cookiePolicy.typesEssentialHeading'),
          copy: t('cookiePolicy.typesEssentialBody')
        },
        {
          heading: t('cookiePolicy.typesPerformanceHeading'),
          copy: t('cookiePolicy.typesPerformanceBody')
        },
        {
          heading: t('cookiePolicy.typesFunctionalHeading'),
          copy: t('cookiePolicy.typesFunctionalBody')
        },
        {
          heading: t('cookiePolicy.typesAdvertisingHeading'),
          copy: t('cookiePolicy.typesAdvertisingBody')
        }
      ]
    },
    {
      title: t('cookiePolicy.thirdPartyTitle'),
      body: t('cookiePolicy.thirdPartyBody')
    },
    {
      title: t('cookiePolicy.managingTitle'),
      body: t('cookiePolicy.managingBody')
    },
    {
      title: t('cookiePolicy.retentionTitle'),
      body: t('cookiePolicy.retentionBody')
    }
  ], [t]);

  return (
    <>
      <SEO data={SEO_PAGES.cookie} />
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
              <Cookie className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('cookiePolicy.heroTitle')}</h1>
            <p className="text-xl text-gray-200">
              {t('cookiePolicy.heroDescription')}
            </p>
            <p className="text-sm text-gray-300 mt-4">{t('cookiePolicy.lastUpdated')}</p>
          </div>
        </motion.section>

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto space-y-10">
            {sections.map((section) => (
              <motion.section key={section.title} variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center mb-6">
                    <Shield className="w-6 h-6 text-vd-orange mr-3" />
                    <h2 className="text-2xl font-bold text-vd-blue-dark">{section.title}</h2>
                  </div>
                  {section.body && <p className="text-gray-700 leading-relaxed">{section.body}</p>}
                  {section.items && (
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      {section.items.map((item) => (
                        <div key={item.heading} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                          <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">{item.heading}</h3>
                          <p className="text-gray-700 text-sm leading-relaxed">{item.copy}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.section>
            ))}

            {/* Cookie Inventory Table */}
            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <Shield className="w-6 h-6 text-vd-orange mr-3" />
                  <h2 className="text-2xl font-bold text-vd-blue-dark">{t('cookiePolicy.cookieInventoryTitle') || 'Cookie Inventory'}</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {t('cookiePolicy.thirdPartyCookiesList') || 'We use the following third-party cookies: Google Analytics (analytics), YouTube (embedded media), LinkedIn (social media integration), and HubSpot (marketing automation).'}
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-vd-blue-dark text-white">
                        <th className="border border-gray-300 px-4 py-3 text-left">{t('cookiePolicy.cookieTableHeaders.name') || 'Name'}</th>
                        <th className="border border-gray-300 px-4 py-3 text-left">{t('cookiePolicy.cookieTableHeaders.purpose') || 'Purpose'}</th>
                        <th className="border border-gray-300 px-4 py-3 text-left">{t('cookiePolicy.cookieTableHeaders.type') || 'Type'}</th>
                        <th className="border border-gray-300 px-4 py-3 text-left">{t('cookiePolicy.cookieTableHeaders.duration') || 'Duration'}</th>
                        <th className="border border-gray-300 px-4 py-3 text-left">{t('cookiePolicy.cookieTableHeaders.provider') || 'Provider'}</th>
                        <th className="border border-gray-300 px-4 py-3 text-left">{t('cookiePolicy.cookieTableHeaders.consentRequired') || 'Consent Required'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3">_ga</td>
                        <td className="border border-gray-300 px-4 py-3">Analytics</td>
                        <td className="border border-gray-300 px-4 py-3">Persistent</td>
                        <td className="border border-gray-300 px-4 py-3">2 years</td>
                        <td className="border border-gray-300 px-4 py-3">Google Analytics</td>
                        <td className="border border-gray-300 px-4 py-3">Yes</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3">_gid</td>
                        <td className="border border-gray-300 px-4 py-3">Analytics</td>
                        <td className="border border-gray-300 px-4 py-3">Persistent</td>
                        <td className="border border-gray-300 px-4 py-3">24 hours</td>
                        <td className="border border-gray-300 px-4 py-3">Google Analytics</td>
                        <td className="border border-gray-300 px-4 py-3">Yes</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3">language</td>
                        <td className="border border-gray-300 px-4 py-3">Functional</td>
                        <td className="border border-gray-300 px-4 py-3">Persistent</td>
                        <td className="border border-gray-300 px-4 py-3">1 year</td>
                        <td className="border border-gray-300 px-4 py-3">Van Dyk Recycling Solutions</td>
                        <td className="border border-gray-300 px-4 py-3">No</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3">cookieConsent</td>
                        <td className="border border-gray-300 px-4 py-3">Functional</td>
                        <td className="border border-gray-300 px-4 py-3">Persistent</td>
                        <td className="border border-gray-300 px-4 py-3">1 year</td>
                        <td className="border border-gray-300 px-4 py-3">Van Dyk Recycling Solutions</td>
                        <td className="border border-gray-300 px-4 py-3">No</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">Consent Mechanism</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('cookiePolicy.consentMechanism') || 'Our cookie consent mechanism allows you to accept or reject cookies by category. Essential cookies are always enabled, while non-essential cookies require your consent.'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">Managing Preferences</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('cookiePolicy.managePreferences') || 'You can manage your cookie preferences at any time by clicking the "Reopen Cookie Preferences" button above or by adjusting your browser settings.'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">First-Party vs Third-Party Cookies</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('cookiePolicy.firstPartyVsThirdParty') || 'First-party cookies are set directly by our website, while third-party cookies are set by external services we use (such as Google Analytics). Both types are subject to our Cookie Policy.'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">Session vs Persistent Cookies</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('cookiePolicy.sessionVsPersistent') || 'Session cookies are temporary and expire when you close your browser. Persistent cookies remain on your device until their expiration date or until you delete them.'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">Necessary vs Optional Cookies</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('cookiePolicy.necessaryVsOptional') || 'Necessary cookies are essential for the website to function and cannot be disabled. Optional cookies (analytics, marketing) can be disabled through your preferences.'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">Expiration & Deletion</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t('cookiePolicy.expirationDeletion') || 'Cookies expire according to their set duration. You can delete cookies at any time through your browser settings. Disabling cookies may affect website functionality.'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Preference Management */}
            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-gradient-to-r from-vd-blue to-vd-blue-dark text-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-4">
                  <SlidersHorizontal className="w-6 h-6 text-vd-orange mr-3" />
                  <h2 className="text-2xl font-bold">{t('cookiePolicy.consentTitle')}</h2>
                </div>
                <p className="text-gray-100 leading-relaxed mb-6">
                  {t('cookiePolicy.consentBody')}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem('cookieConsent');
                    window.location.reload();
                  }}
                  className="inline-flex items-center justify-center bg-vd-orange hover:bg-vd-orange-alt text-white px-6 py-3 rounded-xl font-semibold transition-colors text-sm"
                >
                  {t('cookiePolicy.consentButton')}
                </button>
              </div>
            </motion.section>

            {/* Contact */}
            <motion.section variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <Globe className="w-6 h-6 text-vd-orange mr-3" />
                  <h2 className="text-2xl font-bold text-vd-blue-dark">{t('cookiePolicy.contactTitle')}</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {t('cookiePolicy.contactBody')}
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-vd-orange mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">{t('cookiePolicy.contactEmailLabel')}</h3>
                      <p className="text-gray-700">privacy@vdrs.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-vd-orange mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">{t('cookiePolicy.contactPhoneLabel')}</h3>
                      <p className="text-gray-700">(203) 967-1100</p>
                    </div>
                  </div>
                  <div className="flex items-start md:col-span-2">
                    <MapPin className="w-5 h-5 text-vd-orange mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">{t('cookiePolicy.contactAddressLabel')}</h3>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiePolicy;

