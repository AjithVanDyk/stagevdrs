import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Globe, ArrowRight, ExternalLink, Linkedin } from 'lucide-react';
import QuoteForm from '../components/QuoteForm';
import { useTranslation } from '../hooks/useTranslation';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { getMotionConfig } from '../utils/animations';

const About = () => {
  const { t } = useTranslation();
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const fadeInUp = getMotionConfig('fadeInUp', prefersReducedMotion, {
    initial: { opacity: 0, y: 60 }
  });

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const leadershipTeam = useMemo(() => [
    {
      name: "Pieter Eenkema van Dijk",
      position: t('about.presidentCEO'),
      linkedin: "https://www.linkedin.com/in/pieter-eenkema-van-dijk-1a7096a9/",
      image: "/Images/leadership-pvd.jpg"
    },
    {
      name: "Erik Eenkema van Dijk",
      position: t('about.executiveVPCOO'),
      linkedin: "https://www.linkedin.com/in/erik-eenkema-van-dijk/",
      image: "/Images/leadership-evd.jpg"
    },
    {
      name: "Mark Neitzey",
      position: t('about.directorOfSales'),
      linkedin: "https://www.linkedin.com/in/mark-neitzey/",
      image: "/Images/leadership-mark-neitzey.jpg"
    },
    {
      name: "Chris Bova",
      position: t('about.vpOfOperations'),
      linkedin: "https://www.linkedin.com/in/christopher-bova-306b1711/",
      image: "/Images/leadership-chris-bova.jpg"
    },
    {
      name: "Maarten Eenkema van Dijk",
      position: t('about.directorOfOperations'),
      linkedin: "https://www.linkedin.com/in/maarten-eenkema-van-dijk-544b678a",
      image: "/Images/leadership-maarten.jpg"
    }
  ], [t]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative text-white py-24 -mt-20 pt-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/Images/contact-team-photo.jpg"
            alt="Van Dyk Team"
            className="w-full h-full object-cover object-center scale-105"
            loading="eager"
            fetchPriority="high"
            onError={(e) => {
              e.currentTarget.src = '/Images/image-1749759459073.png';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-vd-blue-dark/95 via-vd-blue/90 to-vd-blue-dark/95" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-vd-blue-dark/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={fadeInUp.transition}
              className="max-w-3xl w-full"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {t('about.meetOurTeam')}
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                {t('about.leadingTheFuture')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Leadership Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Meet the visionary leaders driving innovation and excellence in recycling technology. 
                Our experienced team brings decades of industry expertise and a shared vision for sustainable solutions.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {leadershipTeam.map((leader) => (
                <motion.div
                  key={leader.name}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                >
                  <div className="relative">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className={`w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500 ${
                        leader.name === "Mark Neitzey" ? "object-[center_top]" : "object-center"
                      }`}
                      style={leader.name === "Mark Neitzey" ? { objectPosition: "center 30%" } : {}}
                      loading="eager"
                      fetchPriority="high"
                      onError={(e) => {
                        if (process.env.NODE_ENV === 'development') {
                          console.error('Failed to load leadership image:', leader.image);
                        }
                        e.currentTarget.src = '/Images/image-1749759453479.png';
                        e.currentTarget.alt = 'Leadership photo';
                      }}
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-vd-blue transition-colors">
                      {leader.name}
                    </h3>
                    <p className="text-vd-blue font-semibold mb-4 text-sm uppercase tracking-wide">
                      {leader.position}
                    </p>
                    
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-vd-blue hover:text-vd-blue-dark font-medium text-sm transition-colors group/link"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      Connect on LinkedIn
                      <ExternalLink className="w-3 h-3 ml-1 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission & Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're committed to revolutionizing recycling through innovative technology, 
                exceptional service, and sustainable solutions.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div variants={fadeInUp} className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-vd-blue text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  To provide cutting-edge recycling solutions that maximize material recovery, 
                  reduce waste, and create sustainable value for our clients and communities.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-vd-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovation</h3>
                <p className="text-gray-600">
                  We continuously invest in the latest technology and partner with industry leaders 
                  to bring you the most advanced recycling solutions available.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Sustainability</h3>
                <p className="text-gray-600">
                  Every solution we provide is designed to minimize environmental impact while 
                  maximizing the economic benefits of recycling.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote Form Modal */}
      {showQuoteForm && (
        <QuoteForm
          isOpen={showQuoteForm}
          onClose={() => setShowQuoteForm(false)}
        />
      )}

      {/* Call to Action */}
      <section className="py-20 bg-vd-blue text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Partner with Us?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Let's work together to create a more sustainable future through innovative recycling solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-vd-orange hover:bg-vd-orange-alt text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
              >
                Get in Touch
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.a>
              <motion.a
                href="/solutions"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white hover:bg-white hover:text-vd-blue px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
              >
                View Our Solutions
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;