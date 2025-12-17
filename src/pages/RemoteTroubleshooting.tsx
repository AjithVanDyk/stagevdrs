import React from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, Headphones, Wrench, CheckCircle, 
  Phone, Mail, Star, Users, Award, Zap, Eye, Smartphone
} from 'lucide-react';
import SEO from '../components/SEO';
import { SEOData } from '../utils/seo';

const RemoteTroubleshooting = () => {
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
    title: 'Remote Troubleshooting & Vision AR Support',
    description: 'Advanced remote troubleshooting and Vision AR technology for instant recycling equipment support. Real-time diagnostics and guided repairs from anywhere.',
    keywords: 'remote troubleshooting, Vision AR, augmented reality, equipment support, remote diagnostics, recycling equipment repair, AR technology',
    url: '/remote-troubleshooting',
    type: 'website'
  };

  const services = [
    {
      icon: Camera,
      title: 'Vision AR Technology',
      description: 'Augmented reality overlays provide step-by-step repair guidance directly on your equipment.',
      features: ['Real-time AR overlays', 'Step-by-step instructions', 'Equipment identification', 'Safety protocols']
    },
    {
      icon: Headphones,
      title: 'Remote Diagnostics',
      description: 'Our experts can diagnose issues remotely using advanced monitoring and communication tools.',
      features: ['Real-time monitoring', 'Instant diagnosis', 'Expert consultation', '24/7 availability']
    },
    {
      icon: Wrench,
      title: 'Guided Repairs',
      description: 'Receive guided repair instructions through AR technology and remote expert support.',
      features: ['AR-guided repairs', 'Expert guidance', 'Safety compliance', 'Quality assurance']
    },
    {
      icon: Smartphone,
      title: 'Mobile Support',
      description: 'Access support tools and AR technology through mobile devices for maximum convenience.',
      features: ['Mobile AR apps', 'Cloud connectivity', 'Offline capabilities', 'Cross-platform support']
    }
  ];

  const benefits = [
    {
      title: 'Reduced Downtime',
      description: 'Get instant support without waiting for technicians to arrive on-site',
      icon: Zap
    },
    {
      title: 'Cost Effective',
      description: 'Avoid travel costs and reduce service expenses with remote support',
      icon: Award
    },
    {
      title: 'Expert Knowledge',
      description: 'Access to Van Dyk\'s most experienced technicians and engineers',
      icon: Users
    },
    {
      title: '24/7 Availability',
      description: 'Round-the-clock support for critical equipment issues',
      icon: Star
    }
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Connect & Diagnose',
      description: 'Connect your device to our remote support system for instant equipment diagnostics.'
    },
    {
      step: '2',
      title: 'AR Guidance',
      description: 'Receive augmented reality overlays showing exactly what needs to be repaired.'
    },
    {
      step: '3',
      title: 'Expert Support',
      description: 'Our technicians guide you through the repair process in real-time.'
    },
    {
      step: '4',
      title: 'Quality Check',
      description: 'Verify the repair is complete and equipment is operating correctly.'
    }
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
                <Eye className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Remote Troubleshooting & Vision AR
              </h1>
              <p className="text-xl text-gray-200 mb-6">
                Advanced AR technology and remote support for instant equipment diagnostics and guided repairs
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center">
                  <Camera className="w-4 h-4 mr-2" />
                  Vision AR Technology
                </div>
                <div className="flex items-center">
                  <Headphones className="w-4 h-4 mr-2" />
                  24/7 Remote Support
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Instant Diagnostics
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Services Section */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="container mx-auto px-4 py-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-vd-blue-dark mb-4">
              Advanced Remote Support Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our cutting-edge Vision AR technology and remote diagnostics provide instant support for your recycling equipment, reducing downtime and service costs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-vd-orange/10 rounded-lg mb-4">
                  <service.icon className="w-6 h-6 text-vd-orange" />
                </div>
                <h3 className="text-lg font-semibold text-vd-blue-dark mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <h2 className="text-2xl font-bold text-vd-blue-dark mb-8 text-center">
              Why Choose Remote Support?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center"
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
          </div>

          {/* Process Section */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-vd-blue-dark mb-12 text-center">
              How Remote Support Works
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-vd-orange text-white rounded-full text-lg font-bold mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-vd-blue-dark mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Technology Showcase */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 bg-gradient-to-r from-vd-blue to-vd-blue-dark text-white rounded-2xl p-8"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Vision AR Technology
                </h2>
                <p className="text-gray-200 mb-6">
                  Our proprietary Vision AR system uses advanced computer vision and augmented reality to provide real-time guidance for equipment repairs and maintenance.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-vd-orange mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-white">Real-Time Overlays</h4>
                      <p className="text-sm text-gray-200">AR overlays show repair instructions directly on equipment</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-vd-orange mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-white">Equipment Recognition</h4>
                      <p className="text-sm text-gray-200">AI-powered equipment identification and component mapping</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-vd-orange mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-white">Safety Integration</h4>
                      <p className="text-sm text-gray-200">Built-in safety protocols and compliance checking</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/Images/image-1749759453479.png" // Fallback: vision-ar-demo.jpg not found
                  alt="Vision AR Technology Demo"
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = '/Images/image-1749759453479.png';
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-vd-blue-dark mb-4">
              Ready to Experience Remote Support?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Contact us to learn more about our Vision AR technology and remote troubleshooting services. Our team will help you get started with this innovative support solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:203-967-1100"
                className="bg-vd-orange hover:bg-vd-orange-alt text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call: 203-967-1100
              </a>
              <button className="bg-vd-blue hover:bg-vd-blue-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center">
                <Mail className="w-4 h-4 mr-2" />
                Request Demo
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default RemoteTroubleshooting;







