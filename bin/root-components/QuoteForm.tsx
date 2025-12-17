import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Building2, Mail, Phone, MapPin, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { z } from 'zod';

interface Equipment {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface Solution {
  id: number;
  name: string;
  description: string;
  image: string;
}

const equipmentItems: Equipment[] = [
  {
    id: 'bollegraaf',
    name: 'Bollegraaf Balers',
    description: 'High-performance balers for various materials.',
    image: ''
  },
  {
    id: 'lubo',
    name: 'Lubo Screens',
    description: 'Durable and efficient screening solutions.',
    image: ''
  },
  {
    id: 'tomra',
    name: 'TOMRA Optical Sorting',
    description: 'Advanced optical sorting systems.',
    image: ''
  },
  {
    id: 'pellenc',
    name: 'Pellenc Optical Sorting',
    description: 'Innovative optical sorting for various waste streams.',
    image: ''
  },
  {
    id: 'smicon',
    name: 'Smicon Food Waste',
    description: 'Specialized depackaging solutions.',
    image: ''
  },
  {
    id: 'gunther',
    name: 'Gunther Screen',
    description: 'Reliable and robust screening machines.',
    image: ''
  },
  {
    id: 'centriair',
    name: 'Centriair Odor Control',
    description: 'Advanced odor control systems for recycling facilities.',
    image: ''
  },
  {
    id: 'greyparrot',
    name: 'Greyparrot AI',
    description: 'Robotic sorting with artificial intelligence.',
    image: ''
  },
  {
    id: 'densimetric',
    name: 'Densimetric Table',
    description: 'Density-based material separation.',
    image: ''
  },
  {
    id: 'beefoam',
    name: 'Beefoam',
    description: 'Durable conveyor belts for heavy-duty applications.',
    image: ''
  },
  {
    id: 'reckelberg',
    name: 'Reckelberg ET',
    description: 'Battery recycling equipment.',
    image: ''
  },
  {
    id: 'pre-owned',
    name: 'Certified Pre-Owned Equipment',
    description: 'Quality used recycling equipment.',
    image: ''
  }
];

const solutionItems: Solution[] = [
  {
    id: 1,
    name: 'Single Stream Recycling',
    description: 'Complete single stream recycling solutions for efficient processing of mixed recyclable materials.',
    image: ''
  },
  {
    id: 2,
    name: 'Plastics Recycling',
    description: 'Advanced plastic sorting and processing systems for various polymer types.',
    image: ''
  },
  {
    id: 3,
    name: 'Organics Processing',
    description: 'Food waste processing, compost refining, and odor control solutions.',
    image: ''
  },
  {
    id: 4,
    name: 'Food Waste Depackaging',
    description: 'Efficient food waste processing with organic recovery capabilities.',
    image: ''
  },
  {
    id: 5,
    name: 'MSW Processing',
    description: 'Municipal solid waste processing systems with material recovery.',
    image: ''
  },
  {
    id: 6,
    name: 'Commercial Waste',
    description: 'Commercial waste processing solutions for businesses.',
    image: ''
  },
  {
    id: 7,
    name: 'C&D Recycling',
    description: 'Construction and demolition waste processing solutions.',
    image: ''
  },
  {
    id: 8,
    name: 'Multi-MRF Systems',
    description: 'Advanced multi-material recovery facility systems for comprehensive waste processing.',
    image: ''
  },
  {
    id: 9,
    name: 'Waste to Energy',
    description: 'Waste-to-energy conversion systems for sustainable power generation.',
    image: ''
  },
  {
    id: 10,
    name: 'E-Scrap Recycling',
    description: 'Specialized e-waste processing systems with data security and material recovery.',
    image: ''
  },
  {
    id: 11,
    name: 'Glass Cleanup',
    description: 'High-purity glass processing systems with contamination removal.',
    image: ''
  },
  {
    id: 12,
    name: 'Composting',
    description: 'Advanced composting systems with odor control and pathogen reduction.',
    image: ''
  },
  {
    id: 13,
    name: 'Bollegraaf Balers',
    description: 'High production balers for various recycling applications.',
    image: ''
  },
  {
    id: 14,
    name: 'AI-Based Waste Analytics',
    description: 'Artificial intelligence-powered waste analysis and sorting systems.',
    image: ''
  },
  {
    id: 15,
    name: 'Odor Control',
    description: 'Comprehensive odor control solutions for waste processing facilities.',
    image: ''
  },
  {
    id: 16,
    name: 'EV Battery Recycling',
    description: 'Specialized battery processing and recycling equipment.',
    image: ''
  }
];

// Zod validation schema
const quoteFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50, 'First name must be less than 50 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50, 'Last name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').regex(/^[+]?[\d]{10,16}$/, 'Please enter a valid phone number'),
  company: z.string().min(2, 'Company name must be at least 2 characters').max(100, 'Company name must be less than 100 characters'),
  city: z.string().min(2, 'City must be at least 2 characters').max(50, 'City must be less than 50 characters'),
  state: z.string().min(2, 'State must be at least 2 characters').max(50, 'State must be less than 50 characters'),
  country: z.string().min(2, 'Country must be at least 2 characters').max(50, 'Country must be less than 50 characters'),
  additionalDetails: z.string().max(1000, 'Additional details must be less than 1000 characters').optional()
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

const QuoteForm = () => {
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedSolutions, setSelectedSolutions] = useState<number[]>([]);
  const [formData, setFormData] = useState<QuoteFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    city: '',
    state: '',
    country: '',
    additionalDetails: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleEquipmentSelect = (equipmentId: string) => {
    setSelectedEquipment(prev => 
      prev.includes(equipmentId)
        ? prev.filter(id => id !== equipmentId)
        : [...prev, equipmentId]
    );
  };

  const handleSolutionSelect = (solutionId: number) => {
    setSelectedSolutions(prev => 
      prev.includes(solutionId)
        ? prev.filter(id => id !== solutionId)
        : [...prev, solutionId]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof QuoteFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    try {
      quoteFormSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof QuoteFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof QuoteFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, replace with actual API call
      const submissionData = { ...formData, selectedEquipment };
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Quote form submitted:', submissionData);
      }
      
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          city: '',
          state: '',
          country: '',
          additionalDetails: ''
        });
        setSelectedEquipment([]);
        setSelectedSolutions([]);
        setSubmitStatus('idle');
      }, 3000);
      
    } catch (error) {
      setSubmitStatus('error');
      if (process.env.NODE_ENV === 'development') {
        console.error('Form submission error:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-vd-blue mb-4">Get a Quote Today</h1>
            <p className="text-xl text-gray-600">
              Select from our comprehensive range of equipment and solutions. Fill out the form below, and we'll get in touch with you promptly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Solutions Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-vd-blue mb-6">Select Solutions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {solutionItems.map((solution) => (
                  <motion.div
                    key={solution.id}
                    whileHover={{ scale: 1.02 }}
                    className={`relative rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      selectedSolutions.includes(solution.id)
                        ? 'border-vd-orange bg-vd-orange/5'
                        : 'border-gray-200 hover:border-vd-orange/50'
                    }`}
                    onClick={() => handleSolutionSelect(solution.id)}
                  >
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{solution.name}</h3>
                      <p className="text-sm text-gray-600">{solution.description}</p>
                    </div>
                    {selectedSolutions.includes(solution.id) && (
                      <div className="absolute top-2 right-2 bg-vd-orange text-white rounded-full p-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Equipment Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-vd-blue mb-6">Select Equipment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {equipmentItems.map((equipment) => (
                  <motion.div
                    key={equipment.id}
                    whileHover={{ scale: 1.02 }}
                    className={`relative rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      selectedEquipment.includes(equipment.id)
                        ? 'border-vd-orange bg-vd-orange/5'
                        : 'border-gray-200 hover:border-vd-orange/50'
                    }`}
                    onClick={() => handleEquipmentSelect(equipment.id)}
                  >
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{equipment.name}</h3>
                      <p className="text-sm text-gray-600">{equipment.description}</p>
                    </div>
                    {selectedEquipment.includes(equipment.id) && (
                      <div className="absolute top-2 right-2 bg-vd-orange text-white rounded-full p-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-vd-blue mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      autoComplete="given-name"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-vd-orange focus:border-vd-orange ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <div className="flex items-center mt-1 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.firstName}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      autoComplete="family-name"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vd-orange focus:border-vd-orange"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vd-orange focus:border-vd-orange"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vd-orange focus:border-vd-orange"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      autoComplete="organization"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vd-orange focus:border-vd-orange"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vd-orange focus:border-vd-orange"
                      placeholder="City"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      autoComplete="address-level1"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vd-orange focus:border-vd-orange"
                      placeholder="State"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      autoComplete="country"
                      required
                      value={formData.country}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vd-orange focus:border-vd-orange"
                      placeholder="Country"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="additionalDetails" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Details
                </label>
                <textarea
                  id="additionalDetails"
                  name="additionalDetails"
                  autoComplete="off"
                  rows={4}
                  value={formData.additionalDetails}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vd-orange focus:border-vd-orange"
                  placeholder="Please provide any additional information about your requirements..."
                />
              </div>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center"
              >
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-green-800 font-medium">Quote request submitted successfully!</span>
              </motion.div>
            )}
            
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center"
              >
                <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                <span className="text-red-800 font-medium">Please fix the errors above and try again.</span>
              </motion.div>
            )}

            <div className="text-center">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 mx-auto ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-vd-orange hover:bg-vd-orange-alt'
                } text-white`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Quote Request</span>
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default QuoteForm; 