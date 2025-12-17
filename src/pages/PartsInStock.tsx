import React from 'react';
import { motion } from 'framer-motion';
import { 
  Package, Truck, Clock, CheckCircle, ArrowRight, 
  Phone, Mail
} from 'lucide-react';
import SEO from '../components/SEO';
import { SEOData } from '../utils/seo';
import { useTranslation } from '../hooks/useTranslation';

const PartsInStock = () => {
  const { t } = useTranslation();
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

  const seoData: SEOData = {
    title: t('partsInStock.pageTitle'),
    description: t('partsInStock.pageDescription'),
    keywords: 'recycling parts, equipment parts, immediate delivery, same-day shipping, parts inventory, Bollegraaf parts, TOMRA parts, recycling components',
    url: '/parts-in-stock',
    type: 'website'
  };

  const partsCategories = [
    {
      title: t('partsInStock.bollegraafBalerParts'),
      description: t('partsInStock.bollegraafBalerPartsDesc'),
      parts: [
        t('partsInStock.hydraulicPumps'),
        t('partsInStock.electricalControl'),
        t('partsInStock.wearPlates'),
        t('partsInStock.safetySystems'),
        t('partsInStock.conveyorComponents')
      ],
      image: '/Images/Equipment/Bollegraaf/Product%20image_baler.jpg'
    },
    {
      title: t('partsInStock.tomraOpticalSorterParts'),
      description: t('partsInStock.tomraOpticalSorterPartsDesc'),
      parts: [
        t('partsInStock.opticalSensors'),
        t('partsInStock.airValveSystems'),
        t('partsInStock.controlElectronics'),
        t('partsInStock.beltSystems'),
        t('partsInStock.calibrationTools')
      ],
      image: '/Images/Equipment/Tomra%20Optical%20sorters/product%20image_tomra.jpg'
    },
    {
      title: t('partsInStock.screenConveyorParts'),
      description: t('partsInStock.screenConveyorPartsDesc'),
      parts: [
        t('partsInStock.screenPanels'),
        t('partsInStock.motorDrive'),
        t('partsInStock.bearingsSeals'),
        t('partsInStock.structuralComponents'),
        t('partsInStock.vibrationSystems')
      ],
      image: '/Images/Equipment/Lubo%20Screens/Product%20image_lubo%20screens.jpg'
    },
    {
      title: t('partsInStock.generalEquipmentParts'),
      description: t('partsInStock.generalEquipmentPartsDesc'),
      parts: [
        t('partsInStock.motorsDrives'),
        t('partsInStock.beltsChains'),
        t('partsInStock.sensorsSwitches'),
        t('partsInStock.controlPanels'),
        t('partsInStock.safetyEquipment')
      ],
      image: '/Images/equipment-hero.jpg'
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: t('partsInStock.sameDayShippingTitle'),
      description: t('partsInStock.sameDayShippingDesc')
    },
    {
      icon: Package,
      title: t('partsInStock.inventoryTitle'),
      description: t('partsInStock.inventoryDesc')
    },
    {
      icon: Truck,
      title: t('partsInStock.fastDeliveryTitle'),
      description: t('partsInStock.fastDeliveryDesc')
    },
    {
      icon: CheckCircle,
      title: t('partsInStock.qualityTitle'),
      description: t('partsInStock.qualityDesc')
    }
  ];

  const stats = [
    { number: '$35M+', label: t('partsInStock.partsInventoryValue') },
    { number: '50K+', label: t('partsInStock.partsInStock') },
    { number: '24/7', label: t('partsInStock.emergencySupport') },
    { number: '99%', label: t('partsInStock.partsAvailability') }
  ];

  return (
    <>
      <SEO data={seoData} />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-vd-blue to-vd-blue-dark text-white py-16"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-vd-orange rounded-full mb-6"
              >
                <Package className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t('partsInStock.pageTitle')}
              </h1>
              <p className="text-xl text-gray-200 mb-6">
                {t('partsInStock.pageDescription')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <a
                  href="https://www.shopvandykdirect.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-vd-orange hover:bg-vd-orange-alt text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 hover:scale-105 flex items-center justify-center"
                >
                  {t('partsInStock.orderNow')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {t('partsInStock.sameDayShipping')}
                </div>
                <div className="flex items-center">
                  <Package className="w-4 h-4 mr-2" />
                  {t('partsInStock.inventoryValue')}
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {t('partsInStock.qualityGuaranteed')}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white py-12 border-b"
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-vd-orange mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base text-gray-600">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="container mx-auto px-4 py-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-vd-blue-dark mb-4">
              {t('partsInStock.whyChooseTitle')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('partsInStock.whyChooseDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-vd-orange/10 rounded-lg mb-4">
                  <benefit.icon className="w-6 h-6 text-vd-orange" />
                </div>
                <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Parts Categories */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-vd-blue-dark mb-12 text-center">
              {t('partsInStock.partsCategories')}
            </h2>
            
            <div className="space-y-12">
              {partsCategories.map((category, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="grid lg:grid-cols-2 gap-8 p-8">
                    <div>
                      <h3 className="text-2xl font-bold text-vd-blue-dark mb-4">
                        {category.title}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {category.description}
                      </p>
                      <div className="space-y-3">
                        {category.parts.map((part, partIndex) => (
                          <div key={partIndex} className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                            <span className="text-gray-700">{part}</span>
                          </div>
                        ))}
                      </div>
                      <button className="mt-6 bg-vd-orange hover:bg-vd-orange-alt text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center">
                        {t('partsInStock.viewPartsCatalog')}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                    <div className="relative">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-64 object-cover rounded-lg"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = '/Images/equipment-hero.jpg';
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Emergency Support */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 bg-gradient-to-r from-vd-blue to-vd-blue-dark text-white rounded-2xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">
              {t('partsInStock.needEmergencyParts')}
            </h2>
            <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
              {t('partsInStock.needEmergencyPartsDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:203-967-1100"
                className="bg-vd-orange hover:bg-vd-orange-alt text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Phone className="w-4 h-4 mr-2" />
                {t('partsInStock.callEmergencyLine')}
              </a>
              <button className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center">
                <Mail className="w-4 h-4 mr-2" />
                {t('partsInStock.emailPartsRequest')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default PartsInStock;







