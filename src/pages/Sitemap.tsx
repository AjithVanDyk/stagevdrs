import React from 'react';
import { motion } from 'framer-motion';
import { 
  Map, ArrowRight, ExternalLink, Search,
  Calendar, Tag, Globe, FileText, Link as LinkIcon
} from 'lucide-react';
import SEO from '../components/SEO';
import { SEOData } from '../utils/seo';

const Sitemap = () => {
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
    title: 'Site Map - Van Dyk Recycling Solutions',
    description: 'Complete site map of Van Dyk Recycling Solutions website. Find all pages, equipment, solutions, and services in one organized view.',
    keywords: 'sitemap, site map, website navigation, Van Dyk pages, recycling equipment pages, recycling solutions',
    url: '/sitemap',
    type: 'website'
  };

  const siteStructure = [
    {
      category: 'Home',
      pages: [
        { name: 'Home', path: '/', description: 'Main landing page' }
      ]
    },
    {
      category: 'About Us',
      pages: [
        { name: 'About Van Dyk', path: '/about', description: 'Company information and team' },
        { name: 'Careers', path: '/careers', description: 'Job opportunities and applications' }
      ]
    },
    {
      category: 'Equipment',
      pages: [
        { name: 'All Equipment', path: '/equipment', description: 'Complete equipment overview' },
        { name: 'Bollegraaf Recycling Solutions', path: '/equipment/bollegraaf', description: 'High production balers' },
        { name: 'TOMRA Optical Sorting', path: '/equipment/tomra', description: 'Advanced optical sorting technology' },
        { name: 'Pellenc ST Optical Sorting', path: '/equipment/pellenc-st', description: 'Precision optical sorting systems' },
        { name: 'Lubo Screening', path: '/equipment/lubo-screening', description: 'Advanced screening technology' },
        { name: 'Günther Screens', path: '/equipment/gunther-screens', description: 'High-performance screening equipment' },
        { name: 'Smicon Food Waste Depackagers', path: '/equipment/smicon-depackager', description: 'Food waste depackaging systems' },
        { name: 'Walair Density Separation Technology', path: '/equipment/walair-density-separation', description: 'Density-based separation technology' },
        { name: 'Centriair Odor Control', path: '/equipment/centriair-odor-control', description: 'Industrial odor control systems' },
        { name: 'Greyparrot AI', path: '/equipment/greyparrot-ai', description: 'AI-powered waste analysis' },
        { name: 'Densimetric Table', path: '/equipment/densimetric-table', description: 'Density separation technology' },
        { name: 'BeeFoam Dust Suppression System', path: '/equipment/beefoam-dust-suppression', description: 'Dust suppression systems' },
        { name: 'Reckelberg Environmental Technologies', path: '/equipment/reckelberg-environmental', description: 'Environmental technology solutions' },
        { name: 'Certified Pre-Owned Equipment', path: '/equipment/certified-pre-owned', description: 'Certified pre-owned equipment' },
        { name: 'Glass Cleanup Systems', path: '/equipment/glass-cleanup-systems', description: 'Glass processing and cleanup' }
      ]
    },
    {
      category: 'Solutions',
      pages: [
        { name: 'All Solutions', path: '/solutions', description: 'Complete solutions overview' },
        { name: 'Single Stream Recycling', path: '/solutions/single-stream-recycling', description: 'Single stream processing solutions' },
        { name: 'Bollegraaf Balers', path: '/solutions/bollegraaf-balers', description: 'Balers for various applications' },
        { name: 'Commercial Waste Recycling', path: '/solutions/commercial-waste', description: 'Commercial waste solutions' },
        { name: 'Construction & Demolition Recycling', path: '/solutions/cd-recycling', description: 'C&D recycling solutions' },
        { name: 'Multi-MRF Systems', path: '/solutions/multi-mrf-systems', description: 'Multi-material recovery facilities' },
        { name: 'MSW Processing', path: '/solutions/msw-processing', description: 'Municipal solid waste processing' },
        { name: 'Waste-to-Energy Recycling', path: '/solutions/waste-to-energy', description: 'Waste-to-energy solutions' },
        { name: 'Plastics Recycling & Sorting Systems', path: '/solutions/plastics-recycling', description: 'Plastic processing solutions' },
        { name: 'Electronics Recycling', path: '/solutions/electronics-waste-recycling', description: 'E-waste processing solutions' },
        { name: 'Glass Clean-Up', path: '/solutions/glass-cleanup', description: 'Glass processing solutions' },
        { name: 'Composting', path: '/solutions/composting-densimetric-tables', description: 'Compost processing technology' },
        { name: 'SMICON Depackaging Machines – Food Waste Recycling', path: '/solutions/food-waste-depackaging', description: 'Food waste processing solutions' },
        { name: 'Organics Processing', path: '/solutions/organics-processing', description: 'Organic waste processing' },
        { name: 'AI Waste Analysis', path: '/solutions/ai-waste-analysis', description: 'AI-powered waste analysis' },
        { name: 'Centriair Odor Control', path: '/solutions/centriair-odor-control', description: 'Industrial odor control' }
      ]
    },
    {
      category: 'Services',
      pages: [
        { name: 'Services', path: '/support', description: 'Complete services overview' },
        { name: 'Support', path: '/support', description: 'Lifetime customer support' },
        { name: 'Parts', path: '/parts-in-stock', description: 'Parts in stock for immediate delivery' },
        { name: 'Preventive Maintenance', path: '/pmi', description: 'PMI plans and services' },
        { name: 'Training', path: '/van-dyk-university', description: 'Professional training programs' },
        { name: 'Classroom Training', path: '/van-dyk-university', description: 'Hands-on classroom training' },
        { name: 'Technology & Material Test Center', path: '/test-center', description: 'Material testing facility' },
        { name: 'Remote Troubleshooting', path: '/remote-troubleshooting', description: 'Vision AR remote support' },
        { name: 'Get Quote', path: '/quote', description: 'Request equipment quote' }
      ]
    },
    {
      category: 'News and Media',
      pages: [
        { name: 'News & Media', path: '/news-media', description: 'Latest news and updates' },
        { name: 'Videos', path: '/videos', description: 'Equipment and process videos' },
        { name: 'Expert Tips', path: '/expert-tips', description: 'Industry insights and tips' }
      ]
    },
    {
      category: 'Contact',
      pages: [
        { name: 'Contact', path: '/contact', description: 'Contact information and forms' },
        { name: 'Get Quote', path: '/quote', description: 'Request equipment quote' },
        { name: 'Test Your Recyclable Material', path: '/test-center', description: 'Schedule material testing' }
      ]
    },
    {
      category: 'Legal & Policies',
      pages: [
        { name: 'Privacy Policy', path: '/privacy-policy', description: 'Privacy policy and data protection' },
        { name: 'Cookie Policy', path: '/cookie-policy', description: 'Cookie usage and preferences' }
      ]
    }
  ];

  const quickLinks = [
    { name: 'Contact Us', path: '/contact', icon: ExternalLink },
    { name: 'Get Quote', path: '/quote', icon: FileText },
    { name: 'Parts Catalog', path: '/parts-in-stock', icon: Search },
    { name: 'Training Programs', path: '/van-dyk-university', icon: Calendar }
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
                <Map className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Site Map
              </h1>
              <p className="text-xl text-gray-200 mb-6">
                Complete navigation guide to all pages and content on our website
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  Complete Website Navigation
                </div>
                <div className="flex items-center">
                  <Search className="w-4 h-4 mr-2" />
                  Easy Page Discovery
                </div>
                <div className="flex items-center">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Direct Links
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white py-12 border-b"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-vd-blue-dark mb-8 text-center">
              Quick Links
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="bg-vd-orange hover:bg-vd-orange-alt text-white rounded-xl p-6 text-center transition-colors duration-200 group"
                >
                  <link.icon className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold">{link.name}</h3>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Site Structure */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="container mx-auto px-4 py-16"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-vd-blue-dark mb-12 text-center">
              Complete Site Structure
            </h2>
            
            <div className="space-y-12">
              {siteStructure.map((section, sectionIndex) => (
                <motion.div
                  key={sectionIndex}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="bg-vd-blue text-white p-6">
                    <h3 className="text-2xl font-bold flex items-center">
                      <Tag className="w-6 h-6 mr-3" />
                      {section.category}
                    </h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {section.pages.map((page, pageIndex) => (
                        <motion.a
                          key={pageIndex}
                          href={page.path}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.1 + pageIndex * 0.05 }}
                          className="group p-4 border border-gray-200 rounded-lg hover:border-vd-orange hover:bg-vd-orange/5 transition-all duration-200"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-vd-blue-dark group-hover:text-vd-orange transition-colors mb-1">
                                {page.name}
                              </h4>
                              <p className="text-sm text-gray-600 mb-2">
                                {page.description}
                              </p>
                              <span className="text-xs text-gray-500 font-mono">
                                {page.path}
                              </span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-vd-orange group-hover:translate-x-1 transition-all" />
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 bg-gradient-to-r from-vd-blue to-vd-blue-dark text-white rounded-2xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
              Use our search functionality or contact us directly. Our team is here to help you find the information you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-vd-orange hover:bg-vd-orange-alt text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Contact Us
              </a>
              <a
                href="tel:203-967-1100"
                className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Globe className="w-4 h-4 mr-2" />
                Call: 203-967-1100
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Sitemap;







