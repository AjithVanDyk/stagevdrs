import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Eye, Search, Grid, List, X, ExternalLink, Award, Users } from 'lucide-react';

interface CustomerNews {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  link: string;
  views: string;
  customer: string;
  location: string;
  featured?: boolean;
  trending?: boolean;
  fullContent?: string;
}

const OurCustomersInTheNews = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');
  const [selectedNews, setSelectedNews] = useState<CustomerNews | null>(null);
  const [showNewsModal, setShowNewsModal] = useState(false);

  const customerNews: CustomerNews[] = [
    {
      id: 1,
      title: 'Yes Recycling Newark NJ Achieves 95% Recovery Rate with Bollegraaf Baler',
      description: 'Municipal recycling facility in New Jersey reports exceptional performance improvements after installing Van Dyk\'s Bollegraaf HBC 140 baler system.',
      category: 'Success Story',
      date: '2024-12-20',
      readTime: '6 min read',
      image: '/Images/bollegraaf-products.jpg',
      link: 'https://vdrs.com/customers/yes-recycling-newark-success/',
      views: '3.2k',
      customer: 'Yes Recycling',
      location: 'Newark, NJ',
      featured: true,
      trending: true,
      fullContent: '<p>Yes Recycling in Newark, New Jersey has achieved remarkable success with their new Bollegraaf HBC 140 baler system...</p>'
    },
    {
      id: 2,
      title: 'Premier Surplus Dawsonville GA Expands E-Scrap Processing Capabilities',
      description: 'Leading electronic waste processor enhances their operations with advanced TOMRA optical sorting technology.',
      category: 'Expansion',
      date: '2024-12-18',
      readTime: '5 min read',
      image: '/Images/tomra-optical-sorting.jpg',
      link: 'https://vdrs.com/customers/premier-surplus-expansion/',
      views: '2.8k',
      customer: 'Premier Surplus',
      location: 'Dawsonville, GA',
      featured: true
    },
    {
      id: 3,
      title: 'Municipal MRF in California Reduces Contamination by 40%',
      description: 'City recycling facility implements advanced sorting technology resulting in significantly cleaner material streams.',
      category: 'Innovation',
      date: '2024-12-15',
      readTime: '7 min read',
      image: '/Images/single-stream-recycling.jpg',
      link: 'https://vdrs.com/customers/california-mrf-contamination-reduction/',
      views: '2.1k',
      customer: 'City of San Francisco',
      location: 'San Francisco, CA',
      trending: true
    },
    {
      id: 4,
      title: 'Food Waste Processing Facility Achieves Zero Waste to Landfill',
      description: 'Commercial food waste processor reaches sustainability milestone with Smicon depackaging technology.',
      category: 'Sustainability',
      date: '2024-12-12',
      readTime: '4 min read',
      image: '/Images/smicon-depackager.jpg',
      link: 'https://vdrs.com/customers/food-waste-zero-landfill/',
      views: '1.9k',
      customer: 'EcoFood Processing',
      location: 'Portland, OR'
    },
    {
      id: 5,
      title: 'Multi-MRF System Increases Processing Capacity by 60%',
      description: 'Regional waste management company doubles their processing capabilities with integrated MRF technology.',
      category: 'Capacity',
      date: '2024-12-10',
      readTime: '8 min read',
      image: '/Images/mrf-systems.jpg',
      link: 'https://vdrs.com/customers/multi-mrf-capacity-increase/',
      views: '2.5k',
      customer: 'Regional Waste Solutions',
      location: 'Austin, TX',
      featured: true
    },
    {
      id: 6,
      title: 'Construction Waste Processor Improves Material Recovery',
      description: 'C&D waste facility enhances sorting efficiency with advanced screening and optical sorting technology.',
      category: 'Efficiency',
      date: '2024-12-08',
      readTime: '5 min read',
      image: '/Images/cd-recycling.jpg',
      link: 'https://vdrs.com/customers/cd-waste-recovery-improvement/',
      views: '1.7k',
      customer: 'BuildGreen Recycling',
      location: 'Denver, CO'
    },
    {
      id: 7,
      title: 'Plastics Recycling Facility Achieves Food-Grade Quality',
      description: 'Advanced sorting technology enables production of high-quality recycled plastics for food packaging.',
      category: 'Quality',
      date: '2024-12-05',
      readTime: '6 min read',
      image: '/Images/plastics-recycling.jpg',
      link: 'https://vdrs.com/customers/plastics-food-grade-quality/',
      views: '2.3k',
      customer: 'CleanPlast Industries',
      location: 'Chicago, IL',
      trending: true
    },
    {
      id: 8,
      title: 'Composting Facility Reduces Processing Time by 50%',
      description: 'Organic waste processor streamlines operations with densimetric table technology.',
      category: 'Innovation',
      date: '2024-12-03',
      readTime: '4 min read',
      image: '/Images/densimetric-table.jpg',
      link: 'https://vdrs.com/customers/composting-time-reduction/',
      views: '1.5k',
      customer: 'GreenCycle Composting',
      location: 'Seattle, WA'
    },
    {
      id: 9,
      title: 'MSW Processing Plant Achieves 99% Uptime',
      description: 'Municipal solid waste facility maintains exceptional operational reliability with advanced equipment.',
      category: 'Reliability',
      date: '2024-12-01',
      readTime: '5 min read',
      image: '/Images/msw-processing.jpg',
      link: 'https://vdrs.com/customers/msw-99-percent-uptime/',
      views: '1.8k',
      customer: 'Metro Waste Management',
      location: 'Phoenix, AZ'
    },
    {
      id: 10,
      title: 'E-Scrap Processor Implements AI-Powered Sorting',
      description: 'Electronic waste facility adopts artificial intelligence for enhanced material identification and sorting.',
      category: 'Technology',
      date: '2024-11-28',
      readTime: '7 min read',
      image: '/Images/greyparrot-ai-recognition.jpg',
      link: 'https://vdrs.com/customers/e-scrap-ai-sorting/',
      views: '2.6k',
      customer: 'TechRecycle Solutions',
      location: 'Boston, MA',
      featured: true
    }
  ];

  const categories = ['All', 'Success Story', 'Expansion', 'Innovation', 'Sustainability', 'Capacity', 'Efficiency', 'Quality', 'Reliability', 'Technology'];

  const handleNewsClick = (news: CustomerNews) => {
    setSelectedNews(news);
    setShowNewsModal(true);
  };

  const closeNewsModal = () => {
    setShowNewsModal(false);
    setSelectedNews(null);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const filteredNews = customerNews.filter(news => {
    const matchesFilter = activeFilter === 'All' || news.category === activeFilter;
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const featuredNews = filteredNews.filter(news => news.featured);
  const regularNews = filteredNews.filter(news => !news.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative text-white py-24 -mt-20 pt-20 overflow-hidden">
        <img 
          src="/Images/image-1749759472678.png"
          alt="Our Customers in the News"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          width="1920"
          height="1080"
          loading="eager"
          decoding="sync"
          onError={(e) => {
            e.currentTarget.src = '/Images/first.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Our Customers in the News
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              Read about the success stories and achievements of Van Dyk customers in the recycling industry.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search customer stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-vd-orange focus:border-transparent transition-all"
              />
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeFilter === category
                      ? 'bg-vd-orange text-white shadow-md'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex bg-gray-50 rounded-xl p-1 border border-gray-200">
              <button 
                onClick={() => setActiveView('grid')}
                className={`p-2 rounded-lg transition-all ${
                  activeView === 'grid' ? 'bg-white text-vd-orange shadow-sm' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveView('list')}
                className={`p-2 rounded-lg transition-all ${
                  activeView === 'list' ? 'bg-white text-vd-orange shadow-sm' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured News */}
        {featuredNews.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-vd-blue mb-6">Featured Customer Stories</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredNews.map((news) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onClick={() => handleNewsClick(news)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      width="600"
                      height="256"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = '/Images/first.jpg';
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-vd-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                    {news.trending && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Trending
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-white/90 rounded-full p-2">
                        <Award className="w-6 h-6 text-vd-orange" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(news.date)}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {news.readTime}
                      </span>
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {news.views}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-vd-blue mb-3 leading-tight group-hover:text-vd-orange transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {news.description}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="w-4 h-4 mr-1" />
                        <span className="font-medium">{news.customer}</span>
                        <span className="mx-2">•</span>
                        <span>{news.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-vd-orange bg-orange-50 px-3 py-1 rounded-full">
                        {news.category}
                      </span>
                      <ExternalLink className="w-5 h-5 text-vd-orange group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Regular News */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-vd-blue mb-6">All Customer Stories</h2>
          <div className={`grid gap-6 ${
            activeView === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {regularNews.map((news) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer ${
                  activeView === 'list' ? 'flex' : ''
                }`}
                onClick={() => handleNewsClick(news)}
              >
                <div className={`relative overflow-hidden ${
                  activeView === 'list' ? 'w-1/3 h-48' : 'h-48'
                }`}>
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    width={activeView === 'list' ? "300" : "400"}
                    height="192"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = '/Images/first.jpg';
                    }}
                  />
                  {news.trending && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Trending
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-white/90 rounded-full p-2">
                      <Award className="w-5 h-5 text-vd-orange" />
                    </div>
                  </div>
                </div>
                <div className={`p-6 ${activeView === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(news.date)}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {news.readTime}
                    </span>
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {news.views}
                    </span>
                  </div>
                  <h3 className={`font-bold text-vd-blue mb-3 leading-tight group-hover:text-vd-orange transition-colors ${
                    activeView === 'list' ? 'text-lg' : 'text-xl'
                  }`}>
                    {news.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {news.description}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      <span className="font-medium">{news.customer}</span>
                      <span className="mx-2">•</span>
                      <span>{news.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-vd-orange bg-orange-50 px-3 py-1 rounded-full">
                      {news.category}
                    </span>
                    <ExternalLink className="w-5 h-5 text-vd-orange group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No customer stories found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>

      {/* News Modal */}
      <AnimatePresence>
        {showNewsModal && selectedNews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeNewsModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative h-64 bg-gradient-to-r from-vd-blue-dark to-vd-blue">
                <img
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  className="w-full h-full object-cover opacity-80"
                  width="800"
                  height="256"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/Images/first.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
                  <h2 className="text-4xl font-bold text-white mb-2 leading-tight">{selectedNews.title}</h2>
                </div>
                <button
                  onClick={closeNewsModal}
                  className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors bg-black/30 rounded-full p-2"
                  aria-label="Close news modal"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-vd-orange scrollbar-track-gray-100 max-h-[calc(90vh-16rem)]">
                <div className="flex items-center text-sm text-gray-600 mb-4 space-x-4">
                  <span>{selectedNews.category}</span>
                  <span>•</span>
                  <span>{formatDate(selectedNews.date)}</span>
                  <span>•</span>
                  <span>{selectedNews.readTime}</span>
                  <span>•</span>
                  <span>{selectedNews.views} views</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="font-medium">{selectedNews.customer}</span>
                  <span className="mx-2">•</span>
                  <span>{selectedNews.location}</span>
                </div>
                {selectedNews.fullContent ? (
                  <div className="prose max-w-none text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedNews.fullContent }} />
                ) : (
                  <div className="space-y-4">
                    <p className="text-gray-800 leading-relaxed text-lg">
                      {selectedNews.description}
                    </p>
                    <div className="bg-gray-100 rounded-xl p-6 text-center">
                      <div className="mb-4">
                        <Award className="w-16 h-16 text-vd-orange mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-vd-blue mb-2">Read Full Story</h3>
                        <p className="text-gray-600 mb-4">Click the button below to read the complete customer success story</p>
                      </div>
                      <a 
                        href={selectedNews.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center bg-vd-orange hover:bg-vd-orange-alt text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                      >
                        <ExternalLink className="w-5 h-5 mr-2" />
                        Read Full Story
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OurCustomersInTheNews;







