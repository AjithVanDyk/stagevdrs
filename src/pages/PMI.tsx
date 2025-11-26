import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, Clock, Settings, FileText, 
  ArrowRight, Calendar, Phone, Mail, Wrench
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
              {t('pmi.pageSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-vd-orange hover:bg-vd-orange-alt text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center"
                onClick={() => document.getElementById('schedule-pmi')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('pmi.schedulePMIButton')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is PMI Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-vd-blue mb-6">
                  {t('pmi.whatIsPMIPlanTitle')}
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {t('pmi.whatIsPMIPlanDescription')}
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-vd-blue mb-1">{t('pmi.proactiveApproachTitle')}</h3>
                      <p className="text-gray-600">{t('pmi.proactiveApproachDescription')}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-vd-blue mb-1">{t('pmi.expertTechniciansTitle')}</h3>
                      <p className="text-gray-600">{t('pmi.expertTechniciansDescription')}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-vd-blue mb-1">{t('pmi.comprehensiveReportingTitle')}</h3>
                      <p className="text-gray-600">{t('pmi.comprehensiveReportingDescription')}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/Images/greyparrot-ai-new.jpg"
                  alt="PMI Inspection in Progress"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{t('pmi.expertInspectionTitle')}</h3>
                  <p className="text-sm opacity-90">{t('pmi.expertInspectionDescription')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PMI Process Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
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

      {/* Schedule PMI Section */}
      <section id="schedule-pmi" className="py-20 bg-vd-blue text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">{t('pmi.scheduleTitle')}</h2>
            <p className="text-xl mb-8 text-blue-100">
              {t('pmi.scheduleDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default PMI;
