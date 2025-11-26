import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Linkedin, Youtube, Instagram } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { getMotionConfig } from '../utils/animations';

// Define types for the component
interface FooterLink {
  to: string;
  label: string;
  isExternal?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const TwitterXIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0"
    aria-hidden="true"
    {...props}
  >
    <path d="M19.633 3H15.75l-3.362 4.432L9.163 3H3l6.524 9.415L3.284 21h3.882l3.92-5.174L14.766 21H21l-6.676-9.643L19.633 3zm-3.13 15h-1.642l-7.361-10.64h1.644l7.359 10.64z" />
  </svg>
);

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = usePrefersReducedMotion();

  const getRevealProps = (delay = 0) => {
    const base = getMotionConfig('fadeInUp', prefersReducedMotion, {
      transition: prefersReducedMotion ? undefined : { duration: 0.6, delay }
    });

    if (prefersReducedMotion) {
      return base;
    }

    const { animate, ...rest } = base;
    return {
      ...rest,
      whileInView: animate,
      viewport: { once: true, margin: '-40px' }
    };
  };
  
  // Footer now mirrors top navigation so content stays in sync
  const footerSections: FooterSection[] = useMemo(() => [
    {
      title: t('nav.equipment'),
      links: [
        { to: '/equipment', label: t('equipment.allEquipment') },
        { to: '/equipment/bollegraaf', label: t('equipment.bollegraafBalers') },
        { to: '/equipment/tomra', label: t('equipment.opticalSorters') },
        { to: '/equipment/pellenc-st', label: t('equipment.pellencST') },
        { to: '/equipment/lubo-screening', label: t('equipment.luboScreens') },
        { to: '/equipment/smicon-depackager', label: t('equipment.smiconDepackager') },
        { to: '/equipment/greyparrot-ai', label: t('equipment.greyparrotAI') },
        { to: '/equipment/centriair-odor-control', label: t('equipment.centriairOdorControl') },
        { to: '/equipment/certified-pre-owned', label: t('equipment.certifiedPreOwned') },
        { to: '/quote', label: t('equipment.getQuote') }
      ]
    },
    {
      title: t('nav.solutions'),
      links: [
        { to: '/solutions', label: t('solutions.allSolutions') },
        { to: '/solutions/single-stream-recycling', label: t('solutions.singleStreamRecycling') },
        { to: '/solutions/plastics-recycling', label: t('solutions.plasticsRecycling') },
        { to: '/solutions/organics-processing', label: t('solutions.organicsProcessing') },
        { to: '/solutions/food-waste-depackaging', label: t('solutions.foodWasteDepackaging') },
        { to: '/solutions/msw-processing', label: t('solutions.mswProcessing') },
        { to: '/solutions/commercial-waste', label: t('solutions.commercialWaste') },
        { to: '/solutions/cd-recycling', label: t('solutions.cdRecycling') },
        { to: '/solutions/glass-cleanup', label: t('solutions.glassCleanup') },
        { to: '/solutions/waste-to-energy', label: t('solutions.wasteToEnergy') }
      ]
    },
    {
      title: t('nav.services'),
      links: [
        { to: '/support', label: t('services.unmatchedSupport') },
        { to: '/parts-in-stock', label: t('services.spareParts') },
        { to: '/pmi', label: t('services.pmiPlans') },
        { to: '/van-dyk-university', label: t('services.vanDykUniversity') },
        { to: '/test-center', label: t('services.testCenter') },
        { to: '/quote', label: t('common.getAQuote') }
      ]
    },
    {
      title: t('nav.newsMedia'),
      links: [
        { to: '/news-media', label: t('newsMedia.latestNews') },
        { to: '/videos', label: t('newsMedia.videos') },
        { to: '/expert-tips', label: t('newsMedia.expertTips') }
      ]
    },
  ], [t]);

  // Social media links - alphabetically ordered
  const socialLinks = useMemo(() => [
    {
      icon: Facebook,
      href: 'https://www.facebook.com/vandykrecycling/',
      label: 'Facebook'
    },
    {
      icon: Instagram,
      href: 'https://www.instagram.com/vandykrecyclingsolutions/',
      label: 'Instagram'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/company/van-dyk-recycling-solutions',
      label: 'LinkedIn'
    },
    {
      icon: TwitterXIcon,
      href: 'https://twitter.com/vandykrecycling',
      label: 'X (Twitter)'
    },
    {
      icon: Youtube,
      href: 'https://www.youtube.com/@VanDykRecyclingSolns',
      label: 'YouTube'
    }
  ].sort((a, b) => a.label.localeCompare(b.label)), []);

  return (
    <footer className="bg-gradient-to-b from-vd-blue to-vd-blue-dark text-white" role="contentinfo">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Company Info - Left Section */}
          <motion.div
            {...getRevealProps()}
            className="lg:col-span-2"
            role="region"
            aria-label="Company Information"
          >
            <img 
              src="/Images/van-dyk-logo-white.svg" 
              alt="Van Dyk Recycling Solutions Logo" 
              className="max-h-12 md:max-h-16 w-auto mb-4 object-contain" 
              loading="lazy"
              decoding="async"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                // Try alternative logo paths
                if (!target.src.includes('VAN%20DYK')) {
                  target.src = '/Images/VAN%20DYK-logo-WHITE.svg';
                } else if (!target.src.includes('van-dyk-direct')) {
                  target.src = '/Images/van-dyk-direct-logo.png';
                } else {
                  target.style.display = 'none';
                }
              }} 
            />
            <p className="text-white mb-6 text-sm leading-relaxed">
              {t('footer.companyDescription')}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-vd-orange mr-2 flex-shrink-0" />
                <a href="tel:+12039671100" className="text-white hover:text-vd-orange transition-colors text-sm">
                  (203) 967-1100
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-vd-orange mr-2 flex-shrink-0" />
                <a href="mailto:info@vdrs.com" className="text-white hover:text-vd-orange transition-colors text-sm">
                  info@vdrs.com
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 text-vd-orange mr-2 mt-0.5 flex-shrink-0" />
                <address className="text-white not-italic text-sm">
                  360 Dr. Martin Luther King Jr. Drive<br />
                  Norwalk, CT 06854
                </address>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-vd-orange">{t('footer.followUs')}</h4>
              <div className="flex space-x-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-vd-orange transition-colors duration-200 p-1.5 rounded hover:bg-white/10"
                    aria-label={`Follow us on ${label} (opens in new tab)`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Footer Navigation Sections - Right Section */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              {...getRevealProps(index * 0.1)}
              role="region"
              aria-label={`${section.title} links`}
              className="lg:col-span-1"
            >
              <h3 className="text-base font-semibold mb-4 text-vd-orange">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.isExternal ? (
                      <a 
                        href={link.to}
                        className="text-white hover:text-vd-orange transition-colors duration-200 text-sm block"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${link.label} (opens in new tab)`}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link 
                        to={link.to}
                        className="text-white hover:text-vd-orange transition-colors duration-200 text-sm block"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* About Us Horizontal Section */}
        <div className="border-t border-white/10 mt-8 pt-6">
          <h3 className="text-sm font-semibold mb-4 text-vd-orange text-center">{t('footer.aboutUs')}</h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link to="/careers" className="text-white hover:text-vd-orange transition-colors duration-200 text-sm">
              {t('footer.careers')}
            </Link>
            <Link to="/contact" className="text-white hover:text-vd-orange transition-colors duration-200 text-sm">
              {t('footer.contactUs')}
            </Link>
            <Link to="/cookie-policy" className="text-white hover:text-vd-orange transition-colors duration-200 text-sm">
              {t('footer.cookiePolicy')}
            </Link>
            <Link to="/news-media" className="text-white hover:text-vd-orange transition-colors duration-200 text-sm">
              {t('footer.newsMedia')}
            </Link>
            <Link to="/about" className="text-white hover:text-vd-orange transition-colors duration-200 text-sm">
              {t('footer.overview')}
            </Link>
            <Link to="/privacy-policy" className="text-white hover:text-vd-orange transition-colors duration-200 text-sm">
              {t('footer.privacyPolicy')}
            </Link>
            <Link to="/sitemap" className="text-white hover:text-vd-orange transition-colors duration-200 text-sm">
              {t('footer.sitemap')}
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 mt-6 pt-6 text-center text-white">
          <p className="text-sm">&copy; {new Date().getFullYear()} Van Dyk Recycling Solutions. {t('footer.allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;