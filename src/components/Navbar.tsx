import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { getMotionConfig } from '../utils/animations';

interface NavItem {
  name: string;
  path: string;
  dropdown?: { name: string; path: string; }[];
}

// Pages that have hero images/backgrounds (should have transparent navbar)
const heroPages = ['/', '/equipment', '/solutions', '/about', '/news-media', '/contact', '/careers', '/pmi', '/test-center'];

// Pages with dark hero backgrounds (should have opaque navbar with dark text)
const darkHeroPages = ['/support'];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasHeroImage, setHasHeroImage] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const prefersReducedMotion = usePrefersReducedMotion();
  
  useEffect(() => {
    // Check if current page has hero image - more comprehensive detection
    const currentPath = location.pathname;
    const isHeroPage = heroPages.includes(currentPath) || 
                      currentPath.startsWith('/equipment/') || 
                      currentPath.startsWith('/solutions/');
    const isDarkHeroPage = darkHeroPages.includes(currentPath);
    
    // For dark hero pages, always show opaque navbar
    if (isDarkHeroPage) {
      setHasHeroImage(false);
    } else {
      setHasHeroImage(isHeroPage);
    }
  }, [location.pathname]);

  const toggleDropdown = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Close dropdowns on scroll
          setActiveDropdown(null);
          
          // Check if scrolled past hero section (more sensitive detection)
          const scrollPosition = window.scrollY;
          setIsScrolled(scrollPosition > 50); // Much more sensitive - triggers after 50px scroll
          
          ticking = false;
        });
        ticking = true;
      }
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      if (activeDropdown && !(e.target as Element).closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
      if (languageDropdownOpen && !(e.target as Element).closest('.dropdown-container')) {
        setLanguageDropdownOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeDropdown, languageDropdownOpen]);


  const navItems: NavItem[] = [
    { 
      name: t('nav.home'), 
      path: '/'
    },
    { 
      name: t('nav.equipment'), 
      path: '/equipment',
      dropdown: [
        { name: t('equipment.allEquipment'), path: '/equipment' },
        { name: t('equipment.bollegraafBalers'), path: '/equipment/bollegraaf' },
        { name: t('equipment.opticalSorters'), path: '/equipment/tomra' },
        { name: t('equipment.pellencST'), path: '/equipment/pellenc-st' },
        { name: t('equipment.luboScreens'), path: '/equipment/lubo-screening' },
        { name: t('equipment.smiconDepackager'), path: '/equipment/smicon-depackager' },
        { name: t('equipment.greyparrotAI'), path: '/equipment/greyparrot-ai' },
        { name: t('equipment.centriairOdorControl'), path: '/equipment/centriair-odor-control' },
        { name: t('equipment.certifiedPreOwned'), path: '/equipment/certified-pre-owned' },
        { name: t('equipment.getQuote'), path: '/quote' }
      ]
    },
    { 
      name: t('nav.solutions'), 
      path: '/solutions',
      dropdown: [
        { name: t('solutions.allSolutions'), path: '/solutions' },
        { name: t('solutions.singleStreamRecycling'), path: '/solutions/single-stream-recycling' },
        { name: t('solutions.plasticsRecycling'), path: '/solutions/plastics-recycling' },
        { name: t('solutions.organicsProcessing'), path: '/solutions/organics-processing' },
        { name: t('solutions.foodWasteDepackaging'), path: '/solutions/food-waste-depackaging' },
        { name: t('solutions.mswProcessing'), path: '/solutions/msw-processing' },
        { name: t('solutions.commercialWaste'), path: '/solutions/commercial-waste' },
        { name: t('solutions.cdRecycling'), path: '/solutions/cd-recycling' },
        { name: t('solutions.glassCleanup'), path: '/solutions/glass-cleanup' },
        { name: t('solutions.wasteToEnergy'), path: '/solutions/waste-to-energy' }
      ]
    },
    { 
      name: t('nav.services'), 
      path: '/support',
      dropdown: [
        { name: t('services.unmatchedSupport'), path: '/support' },
        { name: t('services.spareParts'), path: '/parts-in-stock' },
        { name: t('services.pmiPlans'), path: '/pmi' },
        { name: t('services.vanDykUniversity'), path: '/van-dyk-university' },
        { name: t('services.testCenter'), path: '/test-center' }
      ]
    },
    { 
      name: t('nav.newsMedia'), 
      path: '/news-media',
      dropdown: [
        { name: t('newsMedia.latestNews'), path: '/news-media' },
        { name: t('newsMedia.videos'), path: '/videos' },
        { name: t('newsMedia.expertTips'), path: '/expert-tips' }
      ]
    },
    { 
      name: t('nav.aboutUs'), 
      path: '/about',
      dropdown: [
        { name: t('about.meetOurTeam'), path: '/about' },
        { name: t('about.careers'), path: '/careers' },
        { name: t('about.contactUs'), path: '/contact' }
      ]
    }
  ];


  return (
    <nav className={`w-full z-50 sticky top-0 smooth-scroll-enhanced transition-all duration-500 backdrop-blur-md`} style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.9) 15%, rgba(21,72,125,0.4) 100%)'
    }}>
      <div className="container mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-18">
          {/* Logo - Far Left */}
          <Link to="/" className="flex items-center z-10 group">
            <div className="relative">
              {/* Logo */}
              <div className="relative">
                <img
                  src="/Images/van-dyk-logo-white.svg"
                  alt="Van Dyk Recycling Solutions Logo"
                  className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain transition-all duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    // Fallback to alternative logo if primary fails
                    if (!target.src.includes('VAN')) {
                      target.src = '/Images/VAN%20DYK-logo-WHITE.svg';
                    } else {
                      target.src = '/Images/first.jpg';
                    }
                  }}
                />
              </div>
            </div>
          </Link>

          {/* Navigation Links with Dropdowns */}
          <div className="hidden lg:flex items-center space-x-1 flex-wrap">
            {navItems.map((item) => (
              item.dropdown ? (
                <div key={item.name} className="relative dropdown-container">
                  <button 
                    onClick={() => toggleDropdown(item.name)}
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    aria-expanded={activeDropdown === item.name}
                    aria-haspopup="true"
                    aria-label={`${item.name} menu`}
                    className={`flex items-center px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 whitespace-nowrap ${
                      location.pathname.startsWith(item.path) || activeDropdown === item.name
                        ? 'text-vd-blue bg-white/30 shadow-md'
                        : 'text-vd-blue hover:text-vd-orange hover:bg-white/20'
                    }`}
                  >
                    <span className="truncate max-w-[140px]">{item.name}</span>
                    <ChevronDown className={`ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-200 flex-shrink-0 ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        {...getMotionConfig('dropdown', prefersReducedMotion)}
                        className="absolute left-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/30 py-2 z-50"
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <div className="max-h-[400px] overflow-y-auto scrollbar-hide pr-1">
                          {item.dropdown.map((dropdownItem, index) => (
                            <Link
                              key={dropdownItem.path}
                              to={dropdownItem.path}
                              onClick={() => setActiveDropdown(null)}
                              className={`block px-4 py-3 text-sm transition-all duration-200 hover:bg-vd-orange/10 hover:text-vd-orange ${
                                index === 0 
                                  ? 'font-bold text-vd-blue border-b border-gray-200 mb-1' 
                                  : 'text-gray-700 hover:text-vd-orange'
                              }`}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 whitespace-nowrap ${
                    location.pathname === item.path
                      ? 'text-vd-blue bg-white/20'
                      : 'text-vd-blue hover:text-vd-orange hover:bg-white/10'
                  }`}
                >
                  <span className="truncate max-w-[100px]">{item.name}</span>
                </Link>
              )
            ))}
            
            {/* Language Dropdown */}
            <div
              className="relative dropdown-container ml-2"
              onMouseLeave={() => setLanguageDropdownOpen(false)}
            >
              <button
                onClick={() => {
                  setLanguageDropdownOpen(!languageDropdownOpen);
                  setActiveDropdown(null);
                }}
                onMouseEnter={() => {
                  setLanguageDropdownOpen(true);
                  setActiveDropdown(null);
                }}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 ${
                  languageDropdownOpen
                    ? 'text-vd-blue bg-white/30 shadow-md'
                    : 'text-vd-blue hover:text-vd-orange hover:bg-white/20'
                }`}
                aria-label="Language selector"
              >
                <Globe className="h-4 w-4 mr-2" />
                <span className="uppercase">{language}</span>
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                  languageDropdownOpen ? 'rotate-180' : ''
                }`} />
              </button>
              
              <AnimatePresence>
                {languageDropdownOpen && (
                  <motion.div
                    {...getMotionConfig('dropdown', prefersReducedMotion)}
                    className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/30 py-2 z-50"
                    onMouseEnter={() => setLanguageDropdownOpen(true)}
                  >
                    <button
                      onClick={() => {
                        setLanguage('en');
                        setLanguageDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-all duration-200 hover:bg-vd-orange/10 hover:text-vd-orange ${
                        language === 'en' ? 'font-bold text-vd-blue bg-vd-orange/5' : 'text-gray-700'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('fr');
                        setLanguageDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-all duration-200 hover:bg-vd-orange/10 hover:text-vd-orange ${
                        language === 'fr' ? 'font-bold text-vd-blue bg-vd-orange/5' : 'text-gray-700'
                      }`}
                    >
                      Français
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('es');
                        setLanguageDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-all duration-200 hover:bg-vd-orange/10 hover:text-vd-orange ${
                        language === 'es' ? 'font-bold text-vd-blue bg-vd-orange/5' : 'text-gray-700'
                      }`}
                    >
                      Español
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Get a Quote Button */}
          <div className="hidden lg:flex items-center">
            <a
              href="tel:203-967-1100"
              className="bg-vd-orange hover:bg-vd-orange-alt text-white px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 hover:shadow-xl flex items-center space-x-2 shadow-lg"
            >
              <Phone className="h-5 w-5 lg:h-6 lg:w-6" />
              <span>{t('common.getAQuote')}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            className={`lg:hidden p-2.5 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md z-10 backdrop-blur-md border hover:border-white/35 ${
              hasHeroImage && !isScrolled
                ? 'text-white hover:bg-white/20 border-white/25'
                : 'text-vd-blue hover:bg-white/20 border-white/25'
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            {...getMotionConfig('collapse', prefersReducedMotion, {
              animate: { opacity: 1, height: 'auto' }
            })}
            className="lg:hidden max-h-[calc(100vh-56px)] overflow-y-auto overscroll-contain backdrop-blur-2xl bg-white/95 border-t border-white/30 scrollbar-hide"
          >
            <div className="container mx-auto px-6 py-8 space-y-3">
              {navItems.map((item) => (
                item.dropdown ? (
                  <div key={item.name} className="space-y-2">
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block w-full text-left px-5 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105 backdrop-blur-md ${
                        location.pathname.startsWith(item.path)
                          ? 'text-vd-blue bg-white/30 shadow-xl border border-white/40 backdrop-blur-lg' 
                          : 'text-gray-800 hover:text-vd-orange hover:bg-white/40 hover:shadow-lg hover:border hover:border-white/50 backdrop-blur-md'
                      }`}
                    >
                      {item.name}
                    </Link>
                    <div className="pl-6 pr-1 space-y-2 max-h-64 overflow-y-auto scrollbar-hide">
                      {item.dropdown.slice(1).map((dropdownItem) => (
                        <Link
                          key={dropdownItem.path}
                          to={dropdownItem.path}
                          onClick={() => setIsOpen(false)}
                          className="block px-5 py-3 text-sm text-gray-700 hover:text-vd-orange hover:bg-white/30 rounded-lg transition-all duration-200 font-medium hover:translate-x-2 backdrop-blur-sm"
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-5 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105 backdrop-blur-md ${
                      location.pathname === item.path
                        ? 'text-vd-blue bg-white/30 shadow-xl border border-white/40 backdrop-blur-lg'
                        : 'text-gray-800 hover:text-vd-orange hover:bg-white/40 hover:shadow-lg hover:border hover:border-white/50 backdrop-blur-md'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}

              {/* Mobile Language Selector */}
              <div className="pt-4 border-t border-white/20">
                <div className="px-5 py-3">
                  <div className="text-sm font-semibold text-gray-800 mb-3">Language / Langue / Idioma</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setLanguage('en');
                        setIsOpen(false);
                      }}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                        language === 'en'
                          ? 'bg-vd-blue text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('fr');
                        setIsOpen(false);
                      }}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                        language === 'fr'
                          ? 'bg-vd-blue text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Français
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('es');
                        setIsOpen(false);
                      }}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                        language === 'es'
                          ? 'bg-vd-blue text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Español
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Get a Quote Button */}
              <div className="pt-6 border-t border-white/20">
                <a
                  href="tel:203-967-1100"
                  className="w-full bg-gradient-to-r from-vd-orange to-orange-600 hover:from-orange-600 hover:to-vd-orange-alt text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2 backdrop-blur-md border-2 border-white/40 hover:border-white/60 relative overflow-hidden group"
                >
                  {/* Animated background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Phone className="w-5 h-5 relative z-10" />
                  <span className="text-sm relative z-10">{t('common.getAQuote')}</span>
                  {/* Pulse effect */}
                  <div className="absolute inset-0 bg-vd-orange rounded-xl opacity-0 group-hover:opacity-20 animate-ping" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;