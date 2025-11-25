import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Phone, 
  Mail, 
  Download, 
  Book, 
  Video, 
  CheckCircle,
  Search,
  FileText,
  Monitor,
  ThumbsUp,
  ArrowRight,
  Package,
  Truck,
  Shield,
  Camera,
  Headphones,
  Smartphone
} from 'lucide-react';

const Support = () => {
  const [activeTab, setActiveTab] = useState('classroomTraining');

  const supportOptions = [
    {
      title: '24/7 Technical Support',
      description: 'Round-the-clock assistance for critical issues and emergency support.',
      icon: Clock,
      features: ['Immediate response', 'Remote diagnostics', 'Emergency dispatch', 'System monitoring'],
      contact: '+1 (203) 967-1100'
    },
    {
      title: 'Phone Support',
      description: 'Direct access to our technical experts for immediate assistance during business hours.',
      icon: Phone,
      features: ['Expert technicians', 'Multi-language support', 'Call back service', 'Priority routing'],
      contact: '+1 (203) 967-1100'
    },
    {
      title: 'Email Support',
      description: 'Detailed technical support with comprehensive documentation and case tracking.',
      icon: Mail,
      features: ['Detailed responses', 'Attachment support', 'Case tracking', 'Follow-up service'],
      contact: 'service@vdrs.com'
    },
    {
      title: 'Remote Assistance',
      description: 'Direct remote access to diagnose and resolve issues quickly and efficiently.',
      icon: Monitor,
      features: ['Screen sharing', 'Remote diagnostics', 'Real-time guidance', 'System optimization'],
      contact: 'Schedule Session'
    }
  ];

  const resources = [
    {
      category: 'Documentation',
      icon: Book,
      items: [
        { name: 'User Manuals', type: 'PDF', size: '15.2 MB', downloads: '2.3K' },
        { name: 'Installation Guides', type: 'PDF', size: '8.7 MB', downloads: '1.8K' },
        { name: 'Troubleshooting Guide', type: 'PDF', size: '12.1 MB', downloads: '3.1K' },
        { name: 'Safety Protocols', type: 'PDF', size: '5.4 MB', downloads: '987' }
      ]
    },
    {
      category: 'Software',
      icon: Download,
      items: [
        { name: 'Control System Updates', type: 'EXE', size: '245 MB', downloads: '856' },
        { name: 'Diagnostic Tools', type: 'ZIP', size: '67 MB', downloads: '1.2K' },
        { name: 'Configuration Utility', type: 'MSI', size: '89 MB', downloads: '743' },
        { name: 'Firmware Updates', type: 'BIN', size: '23 MB', downloads: '1.5K' }
      ]
    },
    {
      category: 'Training Materials',
      icon: Video,
      items: [
        { name: 'Operator Training Videos', type: 'MP4', size: '1.2 GB', downloads: '567' },
        { name: 'Maintenance Procedures', type: 'PDF', size: '18.9 MB', downloads: '892' },
        { name: 'Safety Training Module', type: 'SCORM', size: '156 MB', downloads: '445' },
        { name: 'Best Practices Guide', type: 'PDF', size: '9.8 MB', downloads: '1.1K' }
      ]
    }
  ];

  const supportLevels = [
    {
      name: 'Basic Support',
      description: 'Standard support included with all equipment purchases',
      features: [
        'Business hours phone support',
        'Email support',
        'Access to documentation',
        'Software updates',
        'Basic troubleshooting'
      ],
      response: '4-8 hours',
      availability: 'Business Hours'
    },
    {
      name: 'Premium Support',
      description: 'Enhanced support for mission-critical operations',
      features: [
        'Priority phone support',
        'Dedicated support engineer',
        'Remote diagnostics',
        'Quarterly health checks',
        'Training sessions'
      ],
      response: '2-4 hours',
      availability: 'Extended Hours'
    },
    {
      name: 'Enterprise Support',
      description: 'Comprehensive support for large-scale operations',
      features: [
        '24/7 emergency support',
        'On-site service visits',
        'Predictive maintenance',
        'Custom training programs',
        'Performance optimization'
      ],
      response: '< 1 hour',
      availability: '24/7/365'
    }
  ];

  const knowledgeBaseArticles = [
    {
      title: 'Getting Started with Your New System',
      category: 'Setup',
      views: '5.2K',
      helpful: '95%',
      lastUpdated: '2024-01-15'
    },
    {
      title: 'Troubleshooting Common Sorting Issues',
      category: 'Troubleshooting',
      views: '3.8K',
      helpful: '92%',
      lastUpdated: '2024-01-10'
    },
    {
      title: 'Preventive Maintenance Schedule',
      category: 'Maintenance',
      views: '4.1K',
      helpful: '98%',
      lastUpdated: '2024-01-05'
    },
    {
      title: 'Optimizing System Performance',
      category: 'Optimization',
      views: '2.9K',
      helpful: '89%',
      lastUpdated: '2023-12-28'
    },
    {
      title: 'Safety Guidelines and Best Practices',
      category: 'Safety',
      views: '6.7K',
      helpful: '97%',
      lastUpdated: '2023-12-20'
    }
  ];

  const trainingSchedule = [
    { training: 'BALER', dates: 'March 17-21', status: 'Closed' },
    { training: 'TITECH/TOMRA Autosort', dates: 'March 31-April 4', status: 'Closed' },
    { training: 'TITECH/TOMRA Autosort', dates: 'April 28-May 2', status: 'Closed' },
    { training: 'BALER', dates: 'May 5-9', status: 'Closed' },
    { training: 'PELLENC ST', dates: 'May 5-9', status: 'Closed' },
    { training: 'TITECH/TOMRA Autosort', dates: 'May 19-23', status: 'Closed' },
    { training: 'PELLENC ST', dates: 'June 2-6', status: 'Closed' },
    { training: 'TITECH/TOMRA Autosort', dates: 'June 16-20', status: 'Open' },
    { training: 'BALER', dates: 'June 23-27', status: 'Open' },
    { training: 'TITECH/TOMRA Autosort', dates: 'July 14-18', status: 'Open' },
    { training: 'PELLENC ST', dates: 'August 4-8', status: 'Open' },
    { training: 'TITECH/TOMRA Autosort', dates: 'August 11-15', status: 'Open' },
    { training: 'BALER', dates: 'August 18-22', status: 'Open' },
    { training: 'TITECH/TOMRA Autosort', dates: 'September 15-19', status: 'Open' },
    { training: 'TITECH/TOMRA Autosort', dates: 'October 13-17', status: 'Open' },
  ];

const partsStats = [
  { number: '$35M+', label: 'Inventory Value' },
  { number: '50K+', label: 'Parts Ready to Ship' },
  { number: '24/7', label: 'Emergency Support' },
  { number: '99%', label: 'Fill Rate' }
];

const partsBenefits = [
  {
    icon: Package,
    title: 'Same-Day Shipping',
    description: 'Critical parts leave our warehouse the same day for urgent repairs.'
  },
  {
    icon: Truck,
    title: 'Nationwide Delivery',
    description: 'Dedicated logistics partners get inventory anywhere in North America quickly.'
  },
  {
    icon: Shield,
    title: 'OEM Guaranteed',
    description: 'Every component meets or exceeds OEM specifications for Bollegraaf, TOMRA, and Lubo.'
  }
];

const partsCategoriesSummary = [
  'Bollegraaf Baler components and wear items',
  'TOMRA Autosort sensors, lasers, and valve blocks',
  'Screen & conveyor assemblies for Lubo and Smicon systems',
  'General electrical, hydraulic, and safety stock for any system'
];

const remoteHighlights = [
  {
    icon: Camera,
    title: 'Vision AR Guidance',
    description: 'Augmented reality overlays provide step-by-step repair direction directly on your equipment.'
  },
  {
    icon: Headphones,
    title: 'Remote Diagnostics',
    description: 'Our experts tap into your system for live monitoring, root-cause analysis, and quick fixes.'
  },
  {
    icon: Smartphone,
    title: 'Mobile Support',
    description: 'Access troubleshooting tools on any mobile device with secure, cloud-based connectivity.'
  }
];

const remoteSteps = [
  'Connect with VAN DYK support through secure video or AR headset.',
  'Share a live view of the equipment while our technician diagnoses the issue.',
  'Receive on-screen annotations, wiring diagrams, and component callouts.',
  'Validate the fix together and document the resolution for future reference.'
];

  const testCenterContent = {
    title: 'VAN DYK Technology & Material Test Center',
    sections: [
      {
        subtitle: 'Why a Test Center?',
        content: 'This Test Center is our commitment to our customers and the environment. We know how important it is to continually research the sortability of materials and improve our collective process of achieving purity of recyclable grades. The Test Center allows our customers to experiment with new equipment and conceive of how to reach and improve their operating goals. It can also help educate and guide sustainability initiatives toward a greener solution or help those in the municipal sector familiarize themselves with how a sorting system works.',
      },
      {
        subtitle: 'Who Is It For?',
        listItems: [
          'A MRF Operator may want to conduct tests on how to improve certain commodity purity levels.',
          'A Consultant may be conducting research on ideas to develop a new sorting process.',
          'A Sustainability Rep may want to test sortability of a new type of consumer packaging.',
          'A Municipal Decision Maker may want to study the system to set appropriate goals for their collection programs.',
        ],
      },
      {
        subtitle: 'How Does It Work?',
        content: 'Schedule your test by calling us at ',
        contactPhone: '203-967-1100',
        contactEmail: 'info@vdrs.com',
        additionalContent: "We'll set a date for you to bring a sample of your material and run it on our continuous loop. We have two different line configurations that feature four different optical sorters, various screens, an elliptical separator, and an high-speed air system. The system sits on an 18,000 square foot floor with an additional 18,000 square foot space for testing material to be stored. We are the largest material test center in the recycling industry and fully capable of replicating in-plant operations.",
        image: '/Images/allgaire.jpg', // Reusing an existing image for now
        imageAlt: 'Plastic Flake Sorting with AUTOSORT FLAKE',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-vd-blue-dark to-vd-blue text-white py-20 -mt-20 pt-20">
        <div className="absolute inset-0">
          <img 
            src="/Images/Services/Support/Header image_Support.jpeg"
            alt="Unmatched Customer Support"
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              e.currentTarget.src = '/Images/image-1749759459073.png';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-vd-blue-dark/80 to-vd-blue/80"></div>
        </div>
        <div className="container mx-auto px-4 relative pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Unmatched Customer Support</h1>
            <p className="text-xl text-gray-100 mb-6">
              Our team of experts is ready to provide the assistance you need, whenever you need it.
            </p>
            <div className="flex flex-col items-center gap-2">
              <p className="text-lg font-semibold text-vd-orange">24/7 Service Hotline</p>
              <a 
                href="tel:203-967-1100" 
                className="text-2xl font-bold hover:text-vd-orange transition-colors"
              >
                (203) 967-1100
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Tabs for sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex justify-center space-x-4 flex-wrap gap-2"
        >
          <button
            onClick={() => setActiveTab('options')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'options'
                ? 'bg-vd-orange text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Support Options
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'resources'
                ? 'bg-vd-orange text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Resources
          </button>
          <button
            onClick={() => setActiveTab('levels')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'levels'
                ? 'bg-vd-orange text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Support Levels
          </button>
          <button
            onClick={() => setActiveTab('knowledgeBase')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'knowledgeBase'
                ? 'bg-vd-orange text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Knowledge Base
          </button>
          <button
            onClick={() => setActiveTab('parts')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'parts'
                ? 'bg-vd-orange text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Parts in Stock
          </button>
          <button
            onClick={() => setActiveTab('remote')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'remote'
                ? 'bg-vd-orange text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Remote Troubleshooting
          </button>
          <button
            onClick={() => setActiveTab('classroomTraining')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'classroomTraining'
                ? 'bg-vd-orange text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Classroom Training
          </button>
          <button
            onClick={() => setActiveTab('testCenter')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'testCenter'
                ? 'bg-vd-orange text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Technology & Material Test Center
          </button>
        </motion.div>

        {/* Tab Content */}
        {activeTab === 'options' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-vd-blue mb-6">Support Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supportOptions.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 p-6 rounded-lg border border-gray-100"
                >
                  <option.icon className="w-8 h-8 text-vd-orange mb-3" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                  <ul className="space-y-2 mb-4">
                    {option.features.map((feature, featIndex) => (
                      <li key={featIndex} className="flex items-center text-gray-700 text-sm">
                        <CheckCircle className="w-4 h-4 text-vd-blue mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="text-vd-blue font-semibold text-sm">
                    Contact: {option.contact}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'resources' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-vd-blue mb-6">Resources</h2>
            <div className="space-y-8">
              {resources.map((resourceCat, catIndex) => (
                <motion.div
                  key={resourceCat.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                >
                  <h3 className="text-2xl font-semibold text-vd-orange mb-4 flex items-center gap-2">
                    <resourceCat.icon className="w-6 h-6" />
                    {resourceCat.category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resourceCat.items.map((item, itemIndex) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: itemIndex * 0.05 }}
                        className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg border border-gray-100"
                      >
                        <FileText className="w-6 h-6 text-vd-orange flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-gray-500 text-sm">{item.type} | {item.size} | {item.downloads} Downloads</p>
                        </div>
                        <a href="#" className="ml-auto text-vd-blue hover:text-vd-orange-alt transition-colors">
                          <Download className="w-5 h-5" />
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'levels' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-vd-blue mb-6">Support Levels</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {supportLevels.map((level, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 p-6 rounded-lg shadow border border-gray-100 flex flex-col"
                >
                  <h3 className="text-xl font-semibold text-vd-orange mb-3">
                    {level.name}
                  </h3>
                  <p className="text-gray-700 text-sm mb-4 flex-grow">
                    {level.description}
                  </p>
                  <ul className="mb-4 space-y-2">
                    {level.features.map((feature, featIndex) => (
                      <li key={featIndex} className="flex items-center text-gray-700 text-sm">
                        <CheckCircle className="w-4 h-4 text-vd-blue mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <p className="text-gray-800 text-sm mb-1">
                      <span className="font-semibold">Response Time:</span> {level.response}
                    </p>
                    <p className="text-gray-800 text-sm">
                      <span className="font-semibold">Availability:</span> {level.availability}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'knowledgeBase' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-vd-blue mb-6">Knowledge Base</h2>
            <div className="mb-6 flex items-center space-x-2">
              <Search className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                autoComplete="off"
                placeholder="Search articles..."
                className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-vd-orange focus:border-vd-orange"
              />
            </div>
            <div className="space-y-4">
              {knowledgeBaseArticles.map((article, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-gray-900">{article.title}</p>
                    <p className="text-gray-500 text-sm">Category: {article.category} | Views: {article.views} | Last Updated: {article.lastUpdated}</p>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4 text-vd-blue" /> {article.helpful}
                    </span>
                    <ArrowRight className="w-4 h-4 text-vd-orange" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'parts' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 max-w-5xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-vd-blue mb-4">Parts in Stock</h2>
            <p className="text-gray-600 mb-10">
              VAN DYK maintains one of the largest OEM parts inventories in the industry—over $35M in Bollegraaf, TOMRA, Lubo, and general system components. Same-day shipping and 24/7 emergency support keep your facility running.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              {partsStats.map((stat) => (
                <div key={stat.label} className="text-center rounded-xl border border-gray-100 p-4 shadow-sm">
                  <div className="text-2xl font-bold text-vd-blue">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {partsBenefits.map((benefit) => (
                <div key={benefit.title} className="bg-gray-50 border border-gray-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                  <benefit.icon className="w-8 h-8 text-vd-orange mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-vd-blue mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
            <div className="bg-vd-blue/5 border border-vd-blue/15 rounded-xl p-6 mb-10">
              <h3 className="text-xl font-semibold text-vd-blue mb-4">Inventory Highlights</h3>
              <ul className="space-y-2">
                {partsCategoriesSummary.map((item) => (
                  <li key={item} className="flex items-start text-gray-700 text-sm">
                    <CheckCircle className="w-4 h-4 text-vd-orange mr-2 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:203-967-1100"
                className="bg-vd-orange hover:bg-vd-orange-alt text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Parts Hotline</span>
              </a>
              <a
                href="mailto:parts@vdrs.com"
                className="border-2 border-vd-orange text-vd-orange hover:bg-vd-orange hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>Email parts@vdrs.com</span>
              </a>
            </div>
          </motion.div>
        )}

        {activeTab === 'remote' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 max-w-5xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-vd-blue mb-4">Remote Troubleshooting & Vision AR</h2>
            <p className="text-gray-600 mb-10">
              When travel isn’t practical, our remote team delivers live diagnostics, Vision AR overlays, and guided repairs to get you back online faster.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {remoteHighlights.map((item) => (
                <div key={item.title} className="bg-gray-50 border border-gray-100 rounded-xl p-6 text-center">
                  <item.icon className="w-8 h-8 text-vd-orange mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-vd-blue mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="bg-vd-blue/5 border border-vd-blue/15 rounded-xl p-6 mb-10">
              <h3 className="text-xl font-semibold text-vd-blue mb-4">How It Works</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm">
                {remoteSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:203-967-1100"
                className="bg-vd-orange hover:bg-vd-orange-alt text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>Request Remote Support</span>
              </a>
              <a
                href="mailto:service@vdrs.com"
                className="border-2 border-vd-orange text-vd-orange hover:bg-vd-orange hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>Email service@vdrs.com</span>
              </a>
            </div>
          </motion.div>
        )}

        {activeTab === 'classroomTraining' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-vd-blue mb-6">Classroom Training Schedules</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Join our expert-led training sessions to enhance your knowledge of our recycling equipment.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Training</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Dates</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {trainingSchedule.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="py-3 px-4 text-gray-800 text-sm">{item.training}</td>
                      <td className="py-3 px-4 text-gray-800 text-sm">{item.dates}</td>
                      <td className="py-3 px-4 text-sm font-medium ${
                        item.status === 'Open' ? 'text-green-600' : 'text-red-600'
                      }">{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'testCenter' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-vd-blue mb-6">{testCenterContent.title}</h2>
            {testCenterContent.sections.map((section, index) => (
              <div key={index} className="mb-6">
                {section.subtitle && (
                  <h3 className="text-2xl font-semibold text-vd-orange mb-4">
                    {section.subtitle}
                  </h3>
                )}
                {section.content && (
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {section.content}
                    {section.contactPhone && (
                      <>
                        <a href={`tel:+1${section.contactPhone.replace(/\D/g, '')}`} className="text-vd-orange hover:underline font-semibold">
                          {section.contactPhone}
                        </a>
                        {' '}
                      </>
                    )}
                    {section.contactEmail && (
                      <>
                        or emailing us at 
                        <a href={`mailto:${section.contactEmail}`} className="text-vd-orange hover:underline font-semibold">
                          {section.contactEmail}
                        </a>
                      </>
                    )}
                    {section.additionalContent && (
                      <> {section.additionalContent}</>
                    )}
                  </p>
                )}
                {section.listItems && (
                  <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                    {section.listItems.map((item, listItemIndex) => (
                      <li key={listItemIndex} className="mb-2">{item}</li>
                    ))}
                  </ul>
                )}
                {section.image && (
                  <div className="mt-6">
                    <img
                      src={section.image}
                      alt={section.imageAlt}
                      className="w-full rounded-lg shadow-md object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/Images/image-1749759453479.png';
                        e.currentTarget.alt = 'Image not available';
                      }}
                    />
                    {section.imageAlt && (
                      <p className="text-center text-gray-500 text-sm mt-2">
                        {section.imageAlt}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Support;