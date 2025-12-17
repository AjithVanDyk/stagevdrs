import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useTranslation } from '../hooks/useTranslation';

interface FAQItem {
  question: string;
  answer: string;
  answerCapsule: string; // 1-2 sentence direct answer with no links
  category: string;
}

const FAQ: React.FC = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'What is a Material Recovery Facility (MRF) and how does recycling equipment work in one?',
      answerCapsule: 'A Material Recovery Facility (MRF) is a specialized recycling plant that processes single-stream recycling into valuable commodities using advanced sorting systems like optical sorters, ballistic separators, and screening technology.',
      answer: 'A Material Recovery Facility (MRF) is a specialized recycling plant that processes single-stream recycling into valuable commodities. Recycling equipment in MRFs uses advanced sorting systems like optical sorters, ballistic separators, and screening technology to separate materials by type, size, and composition. At Van Dyk Recycling Solutions, we have installed over 340 MRFs across North America, each designed to maximize material recovery rates and purity. Our recycling systems integrate equipment such as <Link to="/equipment/bollegraaf">Bollegraaf balers</Link>, <Link to="/equipment/tomra">TOMRA</Link> and <Link to="/equipment/pellenc-st">Pellenc optical sorters</Link>, and <Link to="/equipment/lubo-screening">Lubo screening systems</Link> to create efficient processing lines. The recycling equipment processes mixed recyclables through multiple stages: initial screening removes oversized items, optical sorters identify and separate materials by polymer type or color, and balers compress sorted materials into dense bales for market sale. This recycling technology enables facilities to achieve high recovery rates while maintaining material quality.',
      category: 'MRF & Equipment'
    },
    {
      question: 'How to choose recycling equipment for my facility?',
      answerCapsule: 'Choosing the right recycling equipment requires assessing waste volume, material types (MSW, e-waste, single-stream), and operational goals, with material testing at our 36,000 sq ft Norwalk test center to determine optimal sorting technology.',
      answer: 'Choosing the right recycling equipment for your facility requires assessing several key factors: waste volume, material types (MSW, e-waste, single-stream), and operational goals. Van Dyk Recycling Solutions offers comprehensive turnkey design services to help you select optimal recycling systems. For facilities processing single-stream recycling, we recommend integrated systems combining optical sorters, screens, and balers to achieve the lowest cost per ton. Our recycling equipment selection process begins with material analysis at our <Link to="/test-center">36,000 sq ft Norwalk test center</Link>, where we test your specific waste streams to determine optimal sorting technology. Key considerations include processing capacity (tons per hour), material purity requirements, available space, and budget constraints. Our team evaluates whether you need new recycling equipment or if certified pre-owned systems would better meet your needs. We provide complete recycling systems from leading manufacturers like <Link to="/equipment/bollegraaf">Bollegraaf</Link>, <Link to="/equipment/tomra">TOMRA</Link>, and <Link to="/equipment/pellenc-st">Pellenc</Link>, ensuring compatibility and optimal performance.',
      category: 'Equipment Selection'
    },
    {
      question: 'What recycling sorting technologies improve purity?',
      answerCapsule: 'AI-powered optical sorters use machine learning and near-infrared (NIR) sensors to identify and separate materials with exceptional accuracy, while non-wrapping screens prevent film plastics from clogging equipment and wind tunnels handle lightweight contaminants.',
      answer: 'Several advanced recycling sorting technologies significantly improve material purity in recycling systems. AI-powered optical sorters use machine learning and near-infrared (NIR) sensors to identify and separate materials by polymer type, color, and composition with exceptional accuracy. Non-wrapping screens prevent film plastics and flexible materials from clogging equipment, while wind tunnels handle lightweight contaminants that traditional screens miss. At Van Dyk Recycling Solutions, we test these sorting technologies at our <Link to="/test-center">36,000 sq ft Norwalk test center</Link> to validate performance before installation. Our recycling systems integrate multiple sorting technologies: ballistic separators for size-based separation, <Link to="/equipment/tomra">optical sorters</Link> for material identification, and eddy current separators for metal recovery. These recycling technologies work together to achieve purity rates exceeding 95% for target materials. We also offer <Link to="/equipment/greyparrot-ai">Greyparrot AI systems</Link> that provide real-time analytics and quality control, continuously optimizing sorting performance. For facilities struggling with contamination, our expert team can retrofit existing recycling equipment with these advanced sorting technologies.',
      category: 'Sorting Technology'
    },
    {
      question: 'What is single-stream recycling and how does it work?',
      answerCapsule: 'Single-stream recycling collects all recyclable materials together in one container, then sorts them at a Material Recovery Facility (MRF) using advanced recycling equipment including screening systems, optical sorters, and balers.',
      answer: 'Single-stream recycling is a collection method where all recyclable materials (paper, plastic, metal, glass) are collected together in one container, then sorted at a Material Recovery Facility (MRF) using advanced recycling equipment. This recycling system simplifies collection for residents and businesses while requiring sophisticated sorting technology at the processing facility. Our <Link to="/solutions/single-stream-recycling">single-stream recycling systems</Link> use a combination of screening equipment, optical sorters, and manual quality control to separate materials. The recycling process begins with initial screening to remove oversized items, followed by optical sorting technology that identifies and separates materials by type. <Link to="/equipment/bollegraaf">Bollegraaf balers</Link> then compress sorted materials into dense bales for market sale. Van Dyk Recycling Solutions has extensive experience designing and installing single-stream recycling facilities, with over 340 MRFs successfully deployed. Our recycling systems are optimized for high throughput and material purity, helping facilities achieve the lowest cost per ton while maximizing recovery rates.',
      category: 'Recycling Processes'
    },
    {
      question: 'What types of recycling equipment are available for small facilities?',
      answerCapsule: 'Small recycling facilities can benefit from compact, modular recycling equipment including smaller balers, compact optical sorters, and space-efficient screening systems designed for 5-25 tons per hour throughput.',
      answer: 'Small recycling facilities can benefit from compact, modular recycling equipment designed for lower throughput while maintaining efficiency. Van Dyk Recycling Solutions offers scaled-down versions of our proven recycling systems, including smaller balers, compact optical sorters, and space-efficient screening equipment. For small facilities processing 5-25 tons per hour, we recommend modular recycling systems that can be expanded as operations grow. Our recycling equipment selection for small facilities includes <Link to="/equipment/certified-pre-owned">certified pre-owned systems</Link> that provide excellent value, as well as new compact models from manufacturers like <Link to="/equipment/bollegraaf">Bollegraaf</Link> and <Link to="/equipment/tomra">TOMRA</Link>. Key recycling equipment for small facilities includes vertical balers for material compression, small optical sorters for basic material separation, and screening equipment sized for lower volumes. We also offer consulting services to help small facilities optimize their recycling systems for maximum efficiency within space and budget constraints.',
      category: 'Equipment Selection'
    },
    {
      question: 'How to choose a baler or compactor for my needs?',
      answerCapsule: 'Choosing the right baler depends on material type, volume, space constraints, and operational requirements, with horizontal balers ideal for high-volume operations and vertical balers suited for smaller facilities.',
      answer: 'Choosing the right baler or compactor depends on material type, volume, space constraints, and operational requirements. Van Dyk Recycling Solutions offers comprehensive baler selection services, drawing on our experience installing over 600 <Link to="/equipment/bollegraaf">Bollegraaf balers</Link> across North America. For high-volume operations processing cardboard, paper, or plastic, we recommend horizontal balers that produce dense, uniform bales for optimal market value. Vertical balers are ideal for smaller facilities or specific material streams requiring less frequent baling. Our recycling equipment experts assess your material composition, daily volume, and available space to recommend the optimal baler configuration. We also consider whether you need stationary or mobile balers, and whether automated bale handling systems would improve efficiency. Our <Link to="/test-center">test center</Link> allows you to test different baler models with your actual materials before purchase, ensuring the recycling equipment meets your specific needs.',
      category: 'Equipment Selection'
    },
    {
      question: 'What is the cost range for new versus used recycling machines?',
      answerCapsule: 'Used recycling machines typically cost 40-60% less than new equipment, with new systems starting around $50,000 for small balers and complete MRF systems exceeding $10 million.',
      answer: 'The cost range for recycling equipment varies significantly between new and certified pre-owned systems, with used recycling machines typically costing 40-60% less than new equipment. New recycling systems from manufacturers like <Link to="/equipment/bollegraaf">Bollegraaf</Link>, <Link to="/equipment/tomra">TOMRA</Link>, and <Link to="/equipment/pellenc-st">Pellenc</Link> represent the latest technology and come with full warranties, but require larger capital investment. <Link to="/equipment/certified-pre-owned">Certified pre-owned recycling equipment</Link> from Van Dyk Recycling Solutions undergoes comprehensive refurbishment and testing, offering substantial cost savings while maintaining reliability. Our certified pre-owned recycling systems include balers, optical sorters, and screening equipment that have been rebuilt to like-new condition. The cost range for new recycling equipment depends on capacity and technology level: small balers start around $50,000, while complete MRF recycling systems can exceed $10 million. Used recycling machines provide an excellent entry point for facilities with budget constraints, and our team ensures all pre-owned recycling equipment meets performance standards before installation.',
      category: 'Cost & Investment'
    },
    {
      question: 'Where can I find suppliers of shredders and granulators in my region?',
      answerCapsule: 'Van Dyk Recycling Solutions partners with leading manufacturers of shredders and granulators throughout North America, connecting facilities with regional suppliers based on specific material processing needs.',
      answer: 'Van Dyk Recycling Solutions partners with leading manufacturers of shredders and granulators to provide recycling equipment throughout North America. We work with suppliers across the United States, Canada, and Mexico to ensure regional availability and support. Our network includes suppliers of size-reduction recycling equipment for various applications: <Link to="/solutions/plastics-recycling">plastic recycling</Link>, <Link to="/solutions/e-scrap-recycling">e-waste processing</Link>, and material preparation for further sorting. We can connect you with regional suppliers based on your specific material processing needs, whether you require industrial shredders for large-scale operations or granulators for precise material sizing. Our team evaluates supplier capabilities, equipment quality, and service support to recommend the best options for your recycling systems. We also offer turnkey solutions that integrate shredders and granulators with other recycling equipment like optical sorters and balers for complete processing lines.',
      category: 'Suppliers & Services'
    },
    {
      question: 'What maintenance is required for recycling equipment?',
      answerCapsule: 'Regular maintenance includes daily visual inspections, weekly lubrication, monthly optical sorter calibration, and quarterly system reviews, with 24/7 technical support available at 203-967-1100.',
      answer: 'Regular maintenance is essential for optimal recycling equipment performance and longevity. Van Dyk Recycling Solutions provides comprehensive maintenance programs for all recycling systems, including scheduled inspections, parts replacement, and emergency service. Our maintenance checklist for recycling equipment includes daily visual inspections, weekly lubrication of moving parts, monthly calibration of optical sorters, and quarterly comprehensive system reviews. Key maintenance tasks vary by equipment type: balers require regular wire and bale chamber cleaning, optical sorters need sensor calibration and lens cleaning, and screening equipment benefits from periodic mesh replacement. We offer 24/7 technical support (203-967-1100) and maintain a $35 million parts inventory to minimize downtime. Our field service technicians have 373 combined years of experience maintaining recycling equipment, ensuring your systems operate at peak efficiency. We also provide remote troubleshooting capabilities and predictive maintenance programs that identify potential issues before they cause equipment failure. Learn more about our <Link to="/support">maintenance programs</Link> and <Link to="/pmi">preventive maintenance services</Link>.',
      category: 'Maintenance & Support'
    },
    {
      question: 'What recycling equipment is needed for plastic recycling?',
      answerCapsule: 'Plastic recycling requires optical sorters that identify materials by polymer type, color sorters for quality control, and washing lines for contamination removal, achieving purity rates exceeding 95%.',
      answer: 'Plastic recycling requires specialized recycling equipment designed to sort, clean, and process various polymer types. Our <Link to="/solutions/plastics-recycling">plastic recycling systems</Link> integrate optical sorters that identify materials by polymer type (PET, HDPE, PP, etc.), color sorters for material quality control, and washing lines for contamination removal. Van Dyk Recycling Solutions offers complete plastic recycling systems including <Link to="/equipment/tomra">TOMRA</Link> and <Link to="/equipment/pellenc-st">Pellenc optical sorters</Link> for accurate material identification, ballistic separators for size-based sorting, and granulators for material size reduction. The recycling equipment processes mixed plastic streams through multiple stages: initial screening removes contaminants, optical sorting separates by polymer type and color, and washing systems remove labels and residues. Our plastic recycling systems are designed to achieve high purity rates (95%+) for market-ready materials. We also offer AI-powered sorting technology like <Link to="/equipment/greyparrot-ai">Greyparrot systems</Link> that provide real-time quality analytics, helping optimize plastic recycling operations for maximum recovery and value.',
      category: 'Plastic Recycling'
    },
    {
      question: 'How do optical sorters work in recycling systems?',
      answerCapsule: 'Optical sorters use near-infrared (NIR) spectroscopy, visible light cameras, and artificial intelligence to identify and separate materials in milliseconds, achieving separation accuracy rates exceeding 95%.',
      answer: 'Optical sorters are advanced recycling equipment that use near-infrared (NIR) spectroscopy, visible light cameras, and artificial intelligence to identify and separate materials in recycling systems. These sorting technologies analyze material composition, color, and shape to make separation decisions in milliseconds. In recycling facilities, optical sorters are positioned along conveyor belts where they scan materials and use air jets or mechanical arms to eject target materials into separate collection streams. Van Dyk Recycling Solutions integrates <Link to="/equipment/tomra">optical sorters from manufacturers like TOMRA</Link> and <Link to="/equipment/pellenc-st">Pellenc</Link> into our recycling systems, achieving separation accuracy rates exceeding 95%. The recycling equipment can identify various material types: different plastic polymers, paper grades, metal types, and even specific colors within material categories. Our optical sorting technology includes AI-powered systems that learn and adapt to material variations, continuously improving separation performance. This recycling technology is essential for <Link to="/solutions/single-stream-recycling">single-stream processing</Link>, where materials arrive mixed and require sophisticated sorting to achieve market-quality commodities.',
      category: 'Sorting Technology'
    },
    {
      question: 'What is the difference between single-stream and dual-stream recycling?',
      answerCapsule: 'Single-stream recycling collects all materials together and sorts them at the MRF, while dual-stream recycling separates materials at the source, keeping paper separate from containers.',
      answer: 'Single-stream and dual-stream recycling represent different collection and processing methods in recycling systems. <Link to="/solutions/single-stream-recycling">Single-stream recycling</Link> collects all recyclable materials together, requiring advanced sorting technology at Material Recovery Facilities (MRFs) to separate materials. Dual-stream recycling separates materials at the source, typically keeping paper products separate from containers (plastic, metal, glass). Single-stream recycling systems require more sophisticated recycling equipment including multiple optical sorters, screening systems, and quality control stations to achieve material separation. This recycling method simplifies collection for residents but demands advanced processing technology. Dual-stream recycling reduces sorting complexity at the facility but requires more collection coordination. Van Dyk Recycling Solutions designs recycling systems for both methods, with single-stream facilities representing the majority of our 340+ MRF installations. Our recycling equipment is optimized for the material streams each method produces, ensuring maximum recovery rates and material purity regardless of collection approach.',
      category: 'Recycling Processes'
    },
    {
      question: 'How can I improve the efficiency of my existing recycling facility?',
      answerCapsule: 'Improving efficiency involves optimizing existing recycling equipment, upgrading sorting technology with latest AI systems, and implementing operational best practices, with many facilities achieving 20-30% improvements.',
      answer: 'Improving recycling facility efficiency involves optimizing existing recycling equipment, upgrading sorting technology, and implementing operational best practices. Van Dyk Recycling Solutions offers comprehensive retrofit services that enhance your recycling systems without requiring complete facility replacement. We can upgrade optical sorters with latest AI technology, add screening equipment to improve material separation, and integrate balers for better material handling. Our expert team analyzes your current recycling equipment performance, identifies bottlenecks, and recommends targeted improvements. Common efficiency upgrades include replacing older optical sorters with newer models offering higher throughput and accuracy, adding pre-screening equipment to reduce contamination, and implementing automated bale handling systems. We also provide operational consulting to optimize material flow, reduce downtime, and improve worker productivity. Our <Link to="/test-center">36,000 sq ft test center</Link> allows you to test equipment upgrades with your actual materials before installation, ensuring improvements deliver measurable results. Many facilities achieve 20-30% efficiency improvements through strategic recycling equipment upgrades and process optimization. Learn more about our <Link to="/support">retrofit services</Link> and <Link to="/expert-tips">operational optimization tips</Link>.',
      category: 'Optimization'
    },
    {
      question: 'What recycling equipment is needed for e-waste processing?',
      answerCapsule: 'E-waste recycling requires shredders for size reduction, magnetic separators for ferrous metals, eddy current separators for non-ferrous metals, and optical sorters for plastic identification.',
      answer: 'E-waste recycling requires specialized recycling equipment designed to handle electronic devices safely while recovering valuable materials and ensuring data security. Our <Link to="/solutions/e-scrap-recycling">e-waste recycling systems</Link> include shredders for size reduction, magnetic separators for ferrous metal recovery, eddy current separators for non-ferrous metals, and optical sorters for plastic identification. Van Dyk Recycling Solutions offers complete e-waste processing lines that integrate <Link to="/equipment/tomra">TOMRA optical sorters</Link> specifically configured for electronic waste streams. The recycling equipment processes devices through multiple stages: initial disassembly or shredding, material separation by type, and quality control to ensure market-ready commodities. Our e-waste recycling systems are designed to maximize recovery of precious metals, plastics, and other valuable materials while meeting environmental and data security regulations. We also provide certified data destruction services and ensure all recycling equipment meets safety standards for handling potentially hazardous electronic components.',
      category: 'E-Waste Recycling'
    },
    {
      question: 'How do I know if my recycling equipment needs to be replaced or upgraded?',
      answerCapsule: 'Signs include declining material purity rates, increasing maintenance costs, inability to process current volumes, and lack of compatibility with modern sorting technology, with equipment assessments available to determine optimal paths forward.',
      answer: 'Determining whether to replace or upgrade recycling equipment depends on several factors: equipment age, performance metrics, maintenance costs, and technological capabilities. Van Dyk Recycling Solutions provides comprehensive equipment assessments that evaluate your recycling systems and recommend optimal paths forward. Signs that recycling equipment may need replacement include declining material purity rates, increasing maintenance frequency and costs, inability to process current material volumes, and lack of compatibility with modern sorting technology. However, many facilities can benefit from equipment upgrades rather than complete replacement. Our retrofit services can modernize existing recycling equipment with new optical sorting technology, improved screening systems, or enhanced control systems. We analyze factors like current recovery rates, downtime frequency, energy consumption, and material quality to determine whether upgrades or replacement offer better return on investment. Our <Link to="/test-center">test center</Link> allows you to evaluate new recycling equipment performance with your materials before making investment decisions. Contact our <Link to="/support">support team</Link> for a comprehensive equipment assessment.',
      category: 'Equipment Management'
    }
  ];

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  // FAQPage Schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answerCapsule + ' ' + faq.answer.replace(/<[^>]*>/g, '') // Combine capsule with full answer, strip HTML
      }
    }))
  };

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <SEO data={{
        title: 'Recycling Equipment FAQs - Van Dyk Recycling Solutions',
        description: 'Get answers to common questions about recycling equipment, MRF systems, sorting technology, and recycling processes. Expert guidance on choosing, maintaining, and optimizing recycling systems.',
        url: '/faq',
        keywords: 'recycling equipment FAQs, MRF equipment, recycling systems, sorting technology, single stream recycling, plastic recycling, recycling sorting'
      }} />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-vd-blue to-vd-blue-dark text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Recycling Equipment FAQs
              </h1>
              <p className="text-xl text-gray-100 leading-relaxed">
                Find answers to common questions about recycling systems, MRF equipment, sorting technology, and recycling processes. 
                Get expert guidance to help you make informed decisions about your recycling operations.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Categories */}
              <div className="mb-8 flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => setOpenIndex(0)}
                  className="px-4 py-2 bg-vd-blue text-white rounded-lg font-semibold hover:bg-vd-blue-dark transition-colors"
                >
                  All Questions
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      const firstInCategory = faqs.findIndex(faq => faq.category === category);
                      if (firstInCategory >= 0) setOpenIndex(firstInCategory);
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-vd-orange hover:text-white transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* FAQ Items */}
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start space-x-4 flex-1">
                        <HelpCircle className="w-6 h-6 text-vd-orange flex-shrink-0 mt-1" />
                        <h2 className="text-lg md:text-xl font-bold text-vd-blue-dark pr-4">
                          {faq.question}
                        </h2>
                      </div>
                      {openIndex === index ? (
                        <ChevronUp className="w-6 h-6 text-vd-orange flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    
                    {openIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-5"
                      >
                        <div className="pl-10 text-gray-700 leading-relaxed">
                          <p className="text-lg font-semibold text-vd-blue-dark mb-4">{faq.answerCapsule}</p>
                          <div className="mb-4" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                          
                          {/* Internal Links */}
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-sm font-semibold text-vd-blue-dark mb-2">Related Resources:</p>
                            <div className="flex flex-wrap gap-2">
                              {faq.category === 'MRF & Equipment' && (
                                <>
                                  <Link to="/solutions" className="text-sm text-vd-orange hover:underline flex items-center">
                                    <LinkIcon className="w-4 h-4 mr-1" />
                                    Recycling Solutions
                                  </Link>
                                  <Link to="/equipment" className="text-sm text-vd-orange hover:underline flex items-center">
                                    <LinkIcon className="w-4 h-4 mr-1" />
                                    Recycling Equipment
                                  </Link>
                                </>
                              )}
                              {faq.category === 'Equipment Selection' && (
                                <>
                                  <Link to="/test-center" className="text-sm text-vd-orange hover:underline flex items-center">
                                    <LinkIcon className="w-4 h-4 mr-1" />
                                    Test Center
                                  </Link>
                                  <Link to="/support" className="text-sm text-vd-orange hover:underline flex items-center">
                                    <LinkIcon className="w-4 h-4 mr-1" />
                                    Support Services
                                  </Link>
                                </>
                              )}
                              {faq.category === 'Sorting Technology' && (
                                <>
                                  <Link to="/equipment/tomra" className="text-sm text-vd-orange hover:underline flex items-center">
                                    <LinkIcon className="w-4 h-4 mr-1" />
                                    TOMRA Sorters
                                  </Link>
                                  <Link to="/equipment/greyparrot-ai" className="text-sm text-vd-orange hover:underline flex items-center">
                                    <LinkIcon className="w-4 h-4 mr-1" />
                                    AI Sorting
                                  </Link>
                                </>
                              )}
                              {faq.category === 'Maintenance & Support' && (
                                <>
                                  <Link to="/support" className="text-sm text-vd-orange hover:underline flex items-center">
                                    <LinkIcon className="w-4 h-4 mr-1" />
                                    Support (203-967-1100)
                                  </Link>
                                  <Link to="/expert-tips" className="text-sm text-vd-orange hover:underline flex items-center">
                                    <LinkIcon className="w-4 h-4 mr-1" />
                                    Expert Tips
                                  </Link>
                                </>
                              )}
                              {(faq.category === 'Recycling Processes' || faq.category === 'Plastic Recycling') && (
                                <>
                                  <Link to="/solutions/single-stream-recycling" className="text-sm text-vd-orange hover:underline flex items-center">
                                    <LinkIcon className="w-4 h-4 mr-1" />
                                    Single Stream Recycling
                                  </Link>
                                  <Link to="/solutions/plastics-recycling" className="text-sm text-vd-orange hover:underline flex items-center">
                                    <LinkIcon className="w-4 h-4 mr-1" />
                                    Plastics Recycling
                                  </Link>
                                </>
                              )}
                              <Link to="/test-center" className="text-sm text-vd-orange hover:underline flex items-center">
                                <LinkIcon className="w-4 h-4 mr-1" />
                                36,000 sq ft Test Center
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-12 bg-gradient-to-br from-vd-blue to-vd-blue-dark text-white rounded-2xl p-8 text-center"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Still Have Questions?</h2>
                <p className="text-lg text-gray-100 mb-6">
                  Our recycling equipment experts are here to help. Contact us for personalized guidance on your recycling systems.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="bg-vd-orange hover:bg-vd-orange-alt text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-block"
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/support"
                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-vd-blue px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-block"
                  >
                    Support Services
                  </Link>
                </div>
                <p className="mt-4 text-gray-200">
                  Lifetime phone support: <a href="tel:2039671100" className="text-vd-orange hover:underline font-semibold">203-967-1100</a>
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Baler Comparison Guide */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-vd-blue-dark mb-4">
                  Single-Ram vs Two-Ram Baler: Complete Guide
                </h2>
                <h3 className="text-2xl md:text-3xl font-semibold text-vd-blue mb-6">
                  Which baler configuration is right for your facility?
                </h3>
                <p className="text-lg font-semibold text-vd-blue-dark mb-4 max-w-4xl mx-auto">
                  Single-ram balers are ideal for facilities processing 10-50 tons per day, offering lower initial investment and simpler operation. Two-ram balers provide higher throughput (100+ tons/day) and produce denser bales, maximizing material value but requiring larger capital investment.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 mb-8 overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-vd-blue">
                      <th className="text-left py-4 px-6 font-bold text-vd-blue-dark">Feature</th>
                      <th className="text-center py-4 px-6 font-bold text-vd-blue-dark">Single-Ram Baler</th>
                      <th className="text-center py-4 px-6 font-bold text-vd-blue-dark">Two-Ram Baler</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 font-semibold text-gray-700">Throughput Capacity</td>
                      <td className="py-4 px-6 text-center text-gray-700">10-50 tons/day</td>
                      <td className="py-4 px-6 text-center text-gray-700">100+ tons/day</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-white">
                      <td className="py-4 px-6 font-semibold text-gray-700">Initial Investment</td>
                      <td className="py-4 px-6 text-center text-gray-700">$200K-$500K</td>
                      <td className="py-4 px-6 text-center text-gray-700">$800K-$2M</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 font-semibold text-gray-700">Bale Density</td>
                      <td className="py-4 px-6 text-center text-gray-700">Medium</td>
                      <td className="py-4 px-6 text-center text-gray-700">High</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-white">
                      <td className="py-4 px-6 font-semibold text-gray-700">Operation Complexity</td>
                      <td className="py-4 px-6 text-center text-gray-700">Simple</td>
                      <td className="py-4 px-6 text-center text-gray-700">Moderate</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 font-semibold text-gray-700">Best For</td>
                      <td className="py-4 px-6 text-center text-gray-700">Small to medium facilities</td>
                      <td className="py-4 px-6 text-center text-gray-700">Large MRFs</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="py-4 px-6 font-semibold text-gray-700">Space Requirements</td>
                      <td className="py-4 px-6 text-center text-gray-700">Compact</td>
                      <td className="py-4 px-6 text-center text-gray-700">Larger footprint</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="prose prose-lg max-w-none mb-8">
                <h3 className="text-2xl font-bold text-vd-blue-dark mb-4">Detailed Analysis</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-vd-blue/5 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-vd-blue-dark mb-3">Single-Ram Balers</h4>
                    <p className="text-gray-700 mb-4">
                      Single-ram balers use one hydraulic ram to compress materials into bales. This design offers simplicity and lower maintenance requirements, making them ideal for facilities with moderate processing volumes. Single-ram balers are well-suited for dedicated material streams where consistent bale quality is more important than maximum throughput.
                    </p>
                    <p className="text-gray-700">
                      These balers typically require less floor space and have lower power consumption compared to two-ram systems. They're an excellent choice for facilities processing 10-50 tons per day of cardboard, paper, or plastic materials. The simpler design also means easier operator training and reduced maintenance complexity.
                    </p>
                  </div>
                  <div className="bg-vd-orange/5 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-vd-blue-dark mb-3">Two-Ram Balers</h4>
                    <p className="text-gray-700 mb-4">
                      Two-ram balers use dual hydraulic rams working in sequence to achieve higher compression forces and produce denser bales. This design maximizes material value by creating bales that command premium prices in commodity markets. Two-ram balers are essential for high-volume facilities processing 100+ tons per day.
                    </p>
                    <p className="text-gray-700">
                      The dual-ram system provides superior bale density, reducing transportation costs and maximizing storage efficiency. These balers are designed for continuous operation in large MRFs where throughput and bale quality directly impact profitability. While requiring larger capital investment, two-ram balers deliver superior return on investment for high-volume operations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-vd-blue/10 to-vd-orange/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-vd-blue-dark mb-4">Recommendations by Use Case</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-vd-blue-dark mb-2">Choose Single-Ram If:</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Processing 10-50 tons per day</li>
                      <li>Budget constraints require lower initial investment</li>
                      <li>Limited floor space available</li>
                      <li>Dedicated material streams (single material type)</li>
                      <li>Simpler operation and maintenance preferred</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-vd-blue-dark mb-2">Choose Two-Ram If:</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Processing 100+ tons per day</li>
                      <li>Maximum bale density is critical for market value</li>
                      <li>Large MRF with high-volume operations</li>
                      <li>Mixed material streams requiring high throughput</li>
                      <li>ROI justifies higher capital investment</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-300">
                  <p className="text-gray-700 mb-4">
                    Not sure which configuration is right for your facility? Test your materials at our <Link to="/test-center" className="text-vd-orange hover:underline font-semibold">36,000 sq ft test center</Link> to determine optimal baler performance with your specific waste streams. Our experts can help you evaluate throughput requirements, space constraints, and ROI to make the best decision for your operation.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-block bg-vd-orange hover:bg-vd-orange-alt text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
                  >
                    Get Expert Consultation
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* FAQPage Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
};

export default FAQ;

