import React from 'react';
import SolutionPageTemplate from '../components/SolutionPageTemplate';

const AIWasteAnalysisPage: React.FC = () => {
  const solution = {
    id: 6,
    name: 'AI Waste Analysis',
    image: '/Images/greyparrot-ai-new.jpg',
    description: 'Advanced AI-powered waste analytics and material recognition technology for comprehensive waste analysis and optimization. Our AI systems provide real-time insights and data-driven decision making.',
    features: [
      'AI-powered material recognition',
      'Real-time waste analytics',
      'Advanced computer vision',
      'Automated material identification',
      'Performance optimization insights',
      'Data-driven decision making',
      'Cloud-based analytics platform',
      'Predictive analytics capabilities',
      'Scalable AI technology',
      'Comprehensive waste analysis'
    ],
    specifications: {
      'Recognition Accuracy': '99%+ material identification',
      'Processing Speed': 'Real-time analysis',
      'AI Technology': 'Advanced computer vision',
      'Data Analytics': 'Cloud-based platform',
      'Integration': 'Easy system integration',
      'Scalability': 'Scalable AI technology',
      'Reporting': 'Comprehensive analytics',
      'Predictive Analytics': 'AI-powered predictions',
      'Maintenance': 'Minimal maintenance required',
      'Warranty': '2-year comprehensive warranty'
    },
    applications: [
      { name: 'Single stream recycling', link: '/solutions/single-stream-recycling' },
      { name: 'Municipal solid waste', link: '/solutions/msw-processing' },
      { name: 'Commercial waste', link: '/solutions/commercial-waste' },
      { name: 'E-scrap recycling', link: '/solutions/electronics-waste-recycling' },
      { name: 'Plastics Recycling', link: '/solutions/plastics-recycling' }
    ],
    equipment: [
      { name: 'Greyparrot', link: '/equipment/greyparrot-ai' }
    ],
    videos: [
      'https://youtu.be/B_VmEcZBy6M', // E-Scrap E-Waste Sorting with Artificial Intelligence Tomra Autosort Optical Sorter
      'https://youtu.be/xjqEJdePkS4'  // E-Waste Processing Tomra Autosort Optical Sorter Finder Mode
    ],
    gallery: [
      '/Images/greyparrot-ai-new.jpg',
      '/Images/greyparrot-ai-recognition.jpg',
      '/Images/greyparrot-ai.jpg'
    ],
    testimonials: [
      {
        name: 'Amanda Foster',
        company: 'AI Waste Solutions',
        quote: 'AI waste analysis has revolutionized our operations. Exceptional accuracy and insights.',
        rating: 5
      },
      {
        name: 'Thomas Anderson',
        company: 'Smart Waste Systems',
        quote: 'Outstanding AI technology with real-time analytics capabilities.',
        rating: 5
      },
      {
        name: 'Rachel Green',
        company: 'EcoAnalytics Corp',
        quote: 'Best AI waste analysis system we\'ve implemented. Highly accurate and reliable.',
        rating: 5
      }
    ]
  };

  return <SolutionPageTemplate solution={solution} />;
};

export default AIWasteAnalysisPage;
