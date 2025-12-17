import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, Clock, Settings, FileText, 
  ArrowRight, Calendar, Phone, Mail, Wrench,
  Shield, TrendingUp, DollarSign, AlertCircle
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const PMI = () => {
  const { t } = useTranslation();

  const pmiProcess = [
    {
      step: 1,
      title: t('pmi.step1Title'),
      description: t('pmi.step1Description'),
      icon: Calendar,
      duration: t('pmi.step1Duration'),
      details: [
        t('pmi.step1Detail1'),
        t('pmi.step1Detail2'),
        t('pmi.step1Detail3'),
        t('pmi.step1Detail4')
      ]
    },
    {
      step: 2,
      title: t('pmi.step2Title'),
      description: t('pmi.step2Description'),
      icon: Settings,
      duration: t('pmi.step2Duration'),
      details: [
        t('pmi.step2Detail1'),
        t('pmi.step2Detail2'),
        t('pmi.step2Detail3'),
        t('pmi.step2Detail4'),
        t('pmi.step2Detail5')
      ]
    },
    {
      step: 3,
      title: t('pmi.step3Title'),
      description: t('pmi.step3Description'),
      icon: Wrench,
      duration: t('pmi.step3Duration'),
      details: [
        t('pmi.step3Detail1'),
        t('pmi.step3Detail2'),
        t('pmi.step3Detail3'),
        t('pmi.step3Detail4'),
        t('pmi.step3Detail5')
      ]
    },
    {
      step: 4,
      title: t('pmi.step4Title'),
      description: t('pmi.step4Description'),
      icon: FileText,
      duration: t('pmi.step4Duration'),
      details: [
        t('pmi.step4Detail1'),
        t('pmi.step4Detail2'),
        t('pmi.step4Detail3'),
        t('pmi.step4Detail4'),
        t('pmi.step4Detail5')
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-vd-blue-dark to-vd-blue text-white py-20 -mt-20 pt-20">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/Images/image-1749759459073.png')" }} />
        <div className="container mx-auto px-4 relative pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t('pmi.pageTitle')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              {t('pmi.heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-vd-orange hover:bg-vd-orange-alt text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center"
                onClick={() => document.getElementById('pricing-contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('pmi.schedulePMIButton')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Maintenance of Machines Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-vd-blue mb-4">
                {t('pmi.maintenanceOfMachinesTitle')}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {t('pmi.maintenanceOfMachinesDescription')}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-vd-blue mb-4">
                {t('pmi.whenToChooseTitle')}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {t('pmi.whenToChooseDescription')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <Wrench className="w-6 h-6 text-vd-orange mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-vd-blue mb-1">{t('pmi.keyElement1Title')}</h4>
                  <p className="text-gray-600 text-sm">{t('pmi.keyElement1Description')}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Settings className="w-6 h-6 text-vd-orange mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-vd-blue mb-1">{t('pmi.keyElement2Title')}</h4>
                  <p className="text-gray-600 text-sm">{t('pmi.keyElement2Description')}</p>
                </div>
              </div>
              <div className="flex items-start">
                <FileText className="w-6 h-6 text-vd-orange mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-vd-blue mb-1">{t('pmi.keyElement3Title')}</h4>
                  <p className="text-gray-600 text-sm">{t('pmi.keyElement3Description')}</p>
                </div>
              </div>
              <div className="flex items-start">
                <ArrowRight className="w-6 h-6 text-vd-orange mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-vd-blue mb-1">{t('pmi.keyElement4Title')}</h4>
                  <p className="text-gray-600 text-sm">{t('pmi.keyElement4Description')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is PMI Plan Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-vd-blue mb-6">
                {t('pmi.whatIsPMIPlanTitle')}
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed max-w-4xl mx-auto">
                {t('pmi.whatIsPMIPlanDescription')}
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed max-w-4xl mx-auto">
                {t('pmi.whatIsPMIPlanDescription2')}
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto">
                {t('pmi.whatIsPMIPlanDescription3')}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-8">
              <h3 className="text-2xl font-bold text-vd-blue mb-6 text-center">
                {t('pmi.comparisonTitle')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border-r-0 md:border-r border-gray-200 pr-0 md:pr-8">
                  <h4 className="text-xl font-semibold text-vd-blue mb-4">{t('pmi.comparisonMaintenanceTitle')}</h4>
                  <p className="text-gray-600 mb-3"><strong>{t('pmi.comparisonWhenTitle')}:</strong> {t('pmi.comparisonMaintenanceWhen')}</p>
                  <p className="text-gray-600"><strong>{t('pmi.comparisonGoalTitle')}:</strong> {t('pmi.comparisonMaintenanceGoal')}</p>
                </div>
                <div className="pl-0 md:pl-8">
                  <h4 className="text-xl font-semibold text-vd-blue mb-4">{t('pmi.comparisonPMITitle')}</h4>
                  <p className="text-gray-600 mb-3"><strong>{t('pmi.comparisonWhenTitle')}:</strong> {t('pmi.comparisonPMIWhen')}</p>
                  <p className="text-gray-600"><strong>{t('pmi.comparisonGoalTitle')}:</strong> {t('pmi.comparisonPMIGoal')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PMI Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-vd-blue mb-4">
                {t('pmi.ourPMIProcessTitle')}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t('pmi.ourPMIProcessDescription')}
              </p>
            </div>

            <div className="space-y-8">
              {pmiProcess.map((step, index) => (
                <motion.div
                  key={step.step}
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
                          <step.icon className="h-8 w-8" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-vd-blue">{step.title}</h3>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{step.duration}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {step.description}
                      </p>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="bg-vd-blue text-white rounded-full w-24 h-24 flex items-center justify-center text-3xl font-bold">
                      {step.step}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Sign Up for a PMI Plan Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-vd-blue mb-4">
                {t('pmi.whySignUpTitle')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <div className="flex items-start">
                  <TrendingUp className="w-8 h-8 text-vd-orange mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-vd-blue mb-2">{t('pmi.whySignUpBenefit1Title')}</h3>
                    <p className="text-gray-600">{t('pmi.whySignUpBenefit1Description')}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <div className="flex items-start">
                  <Shield className="w-8 h-8 text-vd-orange mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-vd-blue mb-2">{t('pmi.whySignUpBenefit2Title')}</h3>
                    <p className="text-gray-600">{t('pmi.whySignUpBenefit2Description')}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <div className="flex items-start">
                  <DollarSign className="w-8 h-8 text-vd-orange mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-vd-blue mb-2">{t('pmi.whySignUpBenefit3Title')}</h3>
                    <p className="text-gray-600">{t('pmi.whySignUpBenefit3Description')}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <div className="flex items-start">
                  <CheckCircle className="w-8 h-8 text-vd-orange mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-vd-blue mb-2">{t('pmi.whySignUpBenefit4Title')}</h3>
                    <p className="text-gray-600">{t('pmi.whySignUpBenefit4Description')}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-vd-blue mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-700 leading-relaxed">
                  {t('pmi.notReplacementNote')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing & Contact Section */}
      <section id="pricing-contact" className="py-20 bg-vd-blue text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">{t('pmi.pricingTitle')}</h2>
              <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
                {t('pmi.pricingDescription')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2" />
                  {t('pmi.pricingInclusionsTitle')}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <span>{t('pmi.pricingInclusion1')}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <span>{t('pmi.pricingInclusion2')}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <span>{t('pmi.pricingInclusion3')}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <span>{t('pmi.pricingInclusion4')}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <AlertCircle className="w-6 h-6 mr-2" />
                  {t('pmi.pricingExclusionsTitle')}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <AlertCircle className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <span>{t('pmi.pricingExclusion1')}</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <span>{t('pmi.pricingExclusion2')}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-12 border border-white/20">
              <h3 className="text-xl font-bold mb-4">{t('pmi.pricingRulesTitle')}</h3>
              <ul className="space-y-2 text-blue-100">
                <li>• {t('pmi.pricingRule1')}</li>
                <li>• {t('pmi.pricingRule2')}</li>
              </ul>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6">{t('pmi.contactTitle')}</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <motion.a
                  href="tel:+12039671100"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-vd-orange hover:bg-vd-orange-alt text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  {t('pmi.callButton')}
                </motion.a>
                <motion.a
                  href="mailto:info@vdrs.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white hover:bg-white hover:text-vd-blue px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
                >
                  <Mail className="mr-2 w-5 h-5" />
                  {t('pmi.emailButton')}
                </motion.a>
              </div>
              <p className="text-blue-100 mb-4">{t('pmi.contactDescription')}</p>
              <motion.a
                href="mailto:info@vdrs.com?subject=Request Maintenance Visit (Non-PMI)"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block border-2 border-white/50 text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {t('pmi.requestMaintenanceButton')}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default PMI;
