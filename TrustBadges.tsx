import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, Shield, CheckCircle, Star, Users, Globe, 
  Award as Certification, Shield as Security, CheckCircle as Quality
} from 'lucide-react';

interface TrustBadgeProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  highlight?: boolean;
}

const TrustBadge: React.FC<TrustBadgeProps> = ({ icon: Icon, title, description, highlight = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className={`bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow ${
      highlight ? 'ring-2 ring-vd-orange' : ''
    }`}
  >
    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${
      highlight ? 'bg-vd-orange text-white' : 'bg-vd-orange/10 text-vd-orange'
    }`}>
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">
      {title}
    </h3>
    <p className="text-gray-600 text-sm">
      {description}
    </p>
  </motion.div>
);

interface TrustBadgesProps {
  className?: string;
  showTitle?: boolean;
  compact?: boolean;
}

const TrustBadges: React.FC<TrustBadgesProps> = ({ 
  className = '', 
  showTitle = true, 
  compact = false 
}) => {
  const badges = [
    {
      icon: Award,
      title: '40+ Years Experience',
      description: 'Industry leader since 1984',
      highlight: true
    },
    {
      icon: Shield,
      title: 'ISO Certified',
      description: 'Quality management systems',
      highlight: false
    },
    {
      icon: Users,
      title: '500+ Installations',
      description: 'Worldwide installations',
      highlight: false
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'North America operations',
      highlight: false
    },
    {
      icon: Star,
      title: '98% Satisfaction',
      description: 'Client satisfaction rate',
      highlight: false
    },
    {
      icon: CheckCircle,
      title: '24/7 Support',
      description: 'Round-the-clock service',
      highlight: false
    }
  ];

  const compactBadges = badges.slice(0, 4); // Show only first 4 for compact view
  const displayBadges = compact ? compactBadges : badges;

  return (
    <div className={className}>
      {showTitle && (
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-vd-blue-dark mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our certifications, experience, and track record demonstrate our commitment to excellence in recycling technology.
          </p>
        </div>
      )}
      
      <div className={`grid gap-6 ${
        compact 
          ? 'grid-cols-2 lg:grid-cols-4' 
          : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
      }`}>
        {displayBadges.map((badge, index) => (
          <TrustBadge
            key={index}
            icon={badge.icon}
            title={badge.title}
            description={badge.description}
            highlight={badge.highlight}
          />
        ))}
      </div>
    </div>
  );
};

// Company tagline component
export const CompanyTagline: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="text-center py-8"
  >
    <div className="bg-gradient-to-r from-vd-blue to-vd-blue-dark text-white rounded-2xl p-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        "We Originate, Others Imitate"
      </h2>
      <p className="text-gray-200 text-lg max-w-3xl mx-auto">
        Van Dyk Recycling Solutions has been setting the standard for recycling technology innovation since 1984. 
        Our pioneering spirit continues to drive the industry forward.
      </p>
    </div>
  </motion.div>
);

// Certifications section component
export const CertificationsSection: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="bg-white rounded-2xl shadow-lg p-8"
  >
    <h2 className="text-2xl font-bold text-vd-blue-dark mb-6 text-center">
      Certifications & Awards
    </h2>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        {
          icon: Certification,
          title: 'ISO 9001:2015',
          description: 'Quality Management Systems Certification',
          details: 'Certified for consistent quality and continuous improvement'
        },
        {
          icon: Security,
          title: 'ISO 14001:2015',
          description: 'Environmental Management Systems',
          details: 'Committed to environmental responsibility and sustainability'
        },
        {
          icon: Quality,
          title: 'OHSAS 18001',
          description: 'Occupational Health & Safety',
          details: 'Ensuring safe working conditions for all employees'
        }
      ].map((cert, index) => (
        <div key={index} className="text-center p-4 border border-gray-200 rounded-lg">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-vd-orange/10 rounded-lg mb-4">
            <cert.icon className="w-6 h-6 text-vd-orange" />
          </div>
          <h3 className="text-lg font-semibold text-vd-blue-dark mb-2">
            {cert.title}
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            {cert.description}
          </p>
          <p className="text-gray-500 text-xs">
            {cert.details}
          </p>
        </div>
      ))}
    </div>
  </motion.div>
);

export default TrustBadges;







