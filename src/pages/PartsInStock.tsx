import React from 'react';
import { motion } from 'framer-motion';
import { 
  Package, Truck, Clock, CheckCircle, ArrowRight, 
  Phone, Mail
} from 'lucide-react';
import SEO from '../components/SEO';
import { SEOData } from '../utils/seo';

const PartsInStock = () => {
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
    title: 'Parts in Stock for Immediate Delivery',
    description: 'Van Dyk Recycling Solutions maintains $35M+ inventory of recycling equipment parts for immediate delivery. Same-day shipping available for critical components.',
    keywords: 'recycling parts, equipment parts, immediate delivery, same-day shipping, parts inventory, Bollegraaf parts, TOMRA parts, recycling components',
    url: '/parts-in-stock',
    type: 'website'
  };

  const partsCategories = [
    {
      title: 'Bollegraaf Baler Parts',
      description: 'Complete inventory of Bollegraaf baler components including hydraulic systems, electrical components, and wear parts.',
      parts: ['Hydraulic pumps and valves', 'Electrical control systems', 'Wear plates and knives', 'Safety systems', 'Conveyor components'],
      image: '/Images/Equipment/Bollegraaf/Product%20image_baler.jpg'
    },
    {
      title: 'TOMRA Optical Sorter Parts',
      description: 'Optical sorter components including sensors, lasers, air valves, and control systems for optimal performance.',
      parts: ['Optical sensors and lasers', 'Air valve systems', 'Control electronics', 'Belt systems', 'Calibration tools'],
      image: '/Images/Equipment/Tomra%20Optical%20sorters/product%20image_tomra.jpg'
    },
    {
      title: 'Screen and Conveyor Parts',
      description: 'Screening equipment parts including screen panels, motors, bearings, and structural components.',
      parts: ['Screen panels and decks', 'Motor and drive systems', 'Bearings and seals', 'Structural components', 'Vibration systems'],
      image: '/Images/Equipment/Lubo%20Screens/Product%20image_lubo%20screens.jpg'
    },
    {
      title: 'General Equipment Parts',
      description: 'Common parts for various recycling equipment including motors, belts, sensors, and control systems.',
      parts: ['Motors and drives', 'Belts and chains', 'Sensors and switches', 'Control panels', 'Safety equipment'],
      image: '/Images/equipment-hero.jpg'
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Same-Day Shipping',
      description: 'Critical parts shipped the same day for urgent repairs'
    },
    {
      icon: Package,
      title: '$35M+ Inventory',
      description: 'Extensive parts inventory valued at over $35 million'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Nationwide delivery network for quick parts availability'
    },
    {
      icon: CheckCircle,
      title: 'Quality Guaranteed',
      description: 'All parts meet or exceed OEM specifications'
    }
  ];

  const stats = [
    { number: '$35M+', label: 'Parts Inventory Value' },
    { number: '50K+', label: 'Parts in Stock' },
    { number: '24/7', label: 'Emergency Support' },
    { number: '99%', label: 'Parts Availability' }
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
                Parts in Stock for Immediate Delivery
              </h1>
              <p className="text-xl text-gray-200 mb-6">
                $35M+ inventory of recycling equipment parts ready for same-day shipping
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <a
                  href="https://www.shopvandykdirect.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-vd-orange hover:bg-vd-orange-alt text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 hover:scale-105 flex items-center justify-center"
                >
                  Order Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Same-Day Shipping
                </div>
                <div className="flex items-center">
                  <Package className="w-4 h-4 mr-2" />
                  $35M+ Inventory
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Quality Guaranteed
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
              Why Choose Our Parts Service?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our extensive parts inventory and fast delivery service ensure your recycling equipment stays operational with minimal downtime.
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
              Parts Categories
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
                        View Parts Catalog
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
              Need Emergency Parts?
            </h2>
            <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
              Our 24/7 emergency support team can help you locate and expedite critical parts for immediate delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:203-967-1100"
                className="bg-vd-orange hover:bg-vd-orange-alt text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Emergency Line: 203-967-1100
              </a>
              <button className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center">
                <Mail className="w-4 h-4 mr-2" />
                Email Parts Request
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default PartsInStock;







