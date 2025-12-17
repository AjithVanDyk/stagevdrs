import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  User, Mail, Phone, MapPin, Briefcase, Calendar, DollarSign,
  GraduationCap, FileText, Link as LinkIcon,
  CheckCircle, AlertCircle, Upload, X, Sparkles, Award, Target, ArrowRight
} from 'lucide-react';
import { z } from 'zod';
import { useTranslation } from '../hooks/useTranslation';
import SEO from '../components/SEO';
import { SEO_PAGES } from '../utils/seo';
import { IMAGE_ASSIGNMENTS } from '../config/images';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  authorizedToWork: string;
  requiresSponsorship: string;
  position: string;
  availableStartDate: string;
  desiredSalaryRange: string;
  highestEducation: string;
  workExperience: string;
  references: string;
  resumeLink: string;
  howDidYouHear: string;
  certification: string;
  signature: string;
  todaysDate: string;
  resumeFile?: File;
}

const JobApplication = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const getTodayDate = () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    authorizedToWork: '',
    requiresSponsorship: '',
    position: '',
    availableStartDate: '',
    desiredSalaryRange: '',
    highestEducation: '',
    workExperience: '',
    references: '',
    resumeLink: '',
    howDidYouHear: '',
    certification: '',
    signature: '',
    todaysDate: getTodayDate(),
    resumeFile: undefined,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Pre-fill position from URL parameter
  useEffect(() => {
    const jobTitle = searchParams.get('jobTitle');
    if (jobTitle) {
      setFormData(prev => ({ ...prev, position: jobTitle }));
    }
  }, [searchParams]);

  const formSchema = useMemo(() => z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    address: z.string().min(5, 'Address must be at least 5 characters'),
    authorizedToWork: z.string().min(1, 'Please select an option'),
    requiresSponsorship: z.string().min(1, 'Please select an option'),
    position: z.string().min(1, 'Please select a position'),
    availableStartDate: z.string().min(1, 'Please enter a start date'),
    desiredSalaryRange: z.string().regex(/^\d+$/, 'Salary range must be a number'),
    highestEducation: z.string().min(1, 'Please select education level'),
    workExperience: z.string().min(1, 'Please select work experience'),
    references: z.string().min(10, 'Please provide at least one reference'),
    howDidYouHear: z.string().min(1, 'Please select an option'),
    certification: z.string().min(1, 'Certification is required'),
    signature: z.string().min(2, 'Please enter your full name'),
    todaysDate: z.string().min(1, 'Please enter today\'s date'),
  }), []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, resumeFile: 'File size must be less than 10MB' }));
        return;
      }
      setFormData(prev => ({ ...prev, resumeFile: file }));
      setErrors(prev => ({ ...prev, resumeFile: undefined }));
    }
  };

  const validateForm = (): boolean => {
    try {
      formSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof FormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof FormData] = err.message;
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
      setSubmitMessage('Please review and correct the highlighted fields before submitting your application.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      let resumeBase64 = '';
      if (formData.resumeFile) {
        resumeBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(formData.resumeFile!);
        });
      }

      const response = await fetch('/api/application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          resume: resumeBase64 || formData.resumeLink,
          resumeFileName: formData.resumeFile?.name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit application');
      }

      setSubmitStatus('success');
      setSubmitMessage('Your application has been successfully submitted to our Human Resources department. Our team will review your qualifications and contact you regarding the next steps in our hiring process. We appreciate your interest in joining Van Dyk Recycling Solutions.');
      
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          address: '',
          authorizedToWork: '',
          requiresSponsorship: '',
          position: '',
          availableStartDate: '',
          desiredSalaryRange: '',
          highestEducation: '',
          workExperience: '',
          references: '',
          resumeLink: '',
          howDidYouHear: '',
          certification: '',
          signature: '',
          todaysDate: getTodayDate(),
          resumeFile: undefined,
        });
        setSubmitStatus('idle');
      }, 8000);

    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again or contact our HR department directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formSections = [
    { id: 'personal', title: 'Personal Information', icon: User },
    { id: 'eligibility', title: 'Employment Eligibility', icon: Target },
    { id: 'position', title: 'Position & Availability', icon: Briefcase },
    { id: 'education', title: 'Education & Experience', icon: GraduationCap },
    { id: 'resume', title: 'Resume & Documents', icon: FileText },
    { id: 'additional', title: 'Additional Information', icon: Sparkles },
    { id: 'certification', title: 'Certification & Signature', icon: Award },
  ];

  return (
    <>
      <SEO data={{
        title: 'Job Application - Van Dyk Recycling Solutions',
        description: 'Join our team of recycling professionals. Apply for a position at Van Dyk Recycling Solutions and help shape the future of sustainable waste management.',
        url: '/job-application'
      }} />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {/* Hero Section with Background Image */}
        <section className="relative text-white py-24 overflow-hidden -mt-20 pt-24">
          <div className="absolute inset-0">
            <img
              src={IMAGE_ASSIGNMENTS.careers.hero}
              alt="Van Dyk Careers"
              className="w-full h-full object-cover object-center"
              style={{ objectPosition: 'center 30%' }}
              width="1920"
              height="1080"
              loading="eager"
              decoding="sync"
              onError={(e) => {
                e.currentTarget.src = '/Images/image-1749759453479.png';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-vd-blue-dark/85 via-vd-blue/80 to-vd-blue-dark/85"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block mb-6"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-2 border border-white/20">
                  <span className="text-sm font-semibold tracking-wider uppercase">Join Our Team</span>
                </div>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              >
                Begin Your Career Journey
                <br />
                <span className="text-vd-orange">With Us</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              >
                At Van Dyk Recycling Solutions, we're not just building a company—we're building a sustainable future. 
                Join a team of passionate professionals dedicated to innovation, excellence, and environmental stewardship.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-wrap justify-center gap-4 text-sm text-gray-200"
              >
                <div className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-vd-orange" />
                  <span>Industry Leadership</span>
                </div>
                <div className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-vd-orange" />
                  <span>Innovation Focus</span>
                </div>
                <div className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-vd-orange" />
                  <span>Career Growth</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Application Form Section */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto"
            >
              {/* Introduction Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-vd-blue to-vd-blue-dark text-white rounded-2xl shadow-2xl p-8 md:p-12 mb-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-vd-orange/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-vd-orange/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
                <div className="relative z-10">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Application Process</h2>
                  <p className="text-lg text-gray-100 leading-relaxed mb-4">
                    We're excited to learn more about you and how you can contribute to our mission. 
                    Please complete the following application form with accurate and detailed information. 
                    All fields marked with an asterisk (*) are required.
                  </p>
                  <p className="text-sm text-gray-200">
                    Your privacy is important to us. All information provided will be kept confidential and used solely for recruitment purposes.
                  </p>
                </div>
              </motion.div>

              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl shadow-2xl p-8 md:p-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    >
                      <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                      </div>
                    </motion.div>
                    <h2 className="text-3xl font-bold text-green-800 mb-4">Application Successfully Submitted!</h2>
                    <p className="text-lg text-green-700 mb-6 leading-relaxed max-w-2xl mx-auto">
                      {submitMessage}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/careers')}
                      className="bg-vd-orange hover:bg-vd-orange-alt text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center shadow-lg"
                    >
                      Return to Careers
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl shadow-2xl overflow-hidden"
                  >
                    {/* Personal Information */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="p-8 md:p-10 border-b border-gray-100"
                    >
                      <div className="flex items-center mb-6">
                        <div className="bg-vd-blue/10 p-3 rounded-xl mr-4">
                          <User className="w-6 h-6 text-vd-blue" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-vd-blue">Personal Information</h2>
                      </div>
                      <p className="text-gray-600 mb-6">Please provide your contact details and personal information.</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              id="fullName"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-vd-orange focus:border-vd-orange transition-all ${
                                errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                              }`}
                              placeholder="John Doe"
                            />
                          </div>
                          {errors.fullName && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="mt-2 text-sm text-red-600 flex items-center"
                            >
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.fullName}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-vd-orange focus:border-vd-orange transition-all ${
                                errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                              }`}
                              placeholder="john.doe@example.com"
                            />
                          </div>
                          {errors.email && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="mt-2 text-sm text-red-600 flex items-center"
                            >
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.email}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Phone className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-vd-orange focus:border-vd-orange transition-all ${
                                errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                              }`}
                              placeholder="(555) 123-4567"
                            />
                          </div>
                          {errors.phone && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="mt-2 text-sm text-red-600 flex items-center"
                            >
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.phone}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                            Address <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                              <MapPin className="h-5 w-5 text-gray-400" />
                            </div>
                            <textarea
                              id="address"
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              rows={3}
                              className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-vd-orange focus:border-vd-orange transition-all resize-none ${
                                errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300'
                              }`}
                              placeholder="Street Address, City, State, ZIP Code"
                            />
                          </div>
                          {errors.address && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="mt-2 text-sm text-red-600 flex items-center"
                            >
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.address}
                            </motion.p>
                          )}
                        </div>
                      </div>
                    </motion.div>

                    {/* Employment Eligibility */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="p-8 md:p-10 border-b border-gray-100 bg-gray-50/50"
                    >
                      <div className="flex items-center mb-6">
                        <div className="bg-vd-orange/10 p-3 rounded-xl mr-4">
                          <Target className="w-6 h-6 text-vd-orange" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-vd-blue">Employment Eligibility</h2>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Are you legally authorized to work in the United States? <span className="text-red-500">*</span>
                          </label>
                          <div className="flex gap-6">
                            {['Yes', 'No'].map((option) => (
                              <label key={option} className="flex items-center cursor-pointer group">
                                <input
                                  type="radio"
                                  name="authorizedToWork"
                                  value={option}
                                  checked={formData.authorizedToWork === option}
                                  onChange={handleInputChange}
                                  className="mr-2 w-4 h-4 text-vd-orange focus:ring-vd-orange cursor-pointer"
                                />
                                <span className="text-gray-700 group-hover:text-vd-blue transition-colors">{option}</span>
                              </label>
                            ))}
                          </div>
                          {errors.authorizedToWork && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="mt-2 text-sm text-red-600 flex items-center"
                            >
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.authorizedToWork}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Will you now or in the future require sponsorship for employment visa status? <span className="text-red-500">*</span>
                          </label>
                          <div className="flex gap-6">
                            {['Yes', 'No'].map((option) => (
                              <label key={option} className="flex items-center cursor-pointer group">
                                <input
                                  type="radio"
                                  name="requiresSponsorship"
                                  value={option}
                                  checked={formData.requiresSponsorship === option}
                                  onChange={handleInputChange}
                                  className="mr-2 w-4 h-4 text-vd-orange focus:ring-vd-orange cursor-pointer"
                                />
                                <span className="text-gray-700 group-hover:text-vd-blue transition-colors">{option}</span>
                              </label>
                            ))}
                          </div>
                          {errors.requiresSponsorship && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="mt-2 text-sm text-red-600 flex items-center"
                            >
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.requiresSponsorship}
                            </motion.p>
                          )}
                        </div>
                      </div>
                    </motion.div>

                    {/* Position & Availability */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="p-8 md:p-10 border-b border-gray-100"
                    >
                      <div className="flex items-center mb-6">
                        <div className="bg-vd-blue/10 p-3 rounded-xl mr-4">
                          <Briefcase className="w-6 h-6 text-vd-blue" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-vd-blue">Position & Availability</h2>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Which position are you applying for? <span className="text-red-500">*</span>
                          </label>
                          <div className="space-y-3">
                            {[
                              'Internship (Norwalk, CT – Data Engineering / CAD / Sorting Systems)',
                              'Field Service Engineer (US, Canada, Mexico – Install & Service Industrial Equipment)',
                              'Mechanical Installer (US, Canada, Mexico – Equipment Installations)'
                            ].map((option) => (
                              <label key={option} className="flex items-start cursor-pointer group p-4 border-2 rounded-xl hover:border-vd-orange hover:bg-vd-orange/5 transition-all">
                                <input
                                  type="radio"
                                  name="position"
                                  value={option}
                                  checked={formData.position === option}
                                  onChange={handleInputChange}
                                  className="mr-3 mt-1 w-4 h-4 text-vd-orange focus:ring-vd-orange cursor-pointer"
                                />
                                <span className="text-gray-700 group-hover:text-vd-blue transition-colors">{option}</span>
                              </label>
                            ))}
                          </div>
                          {errors.position && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="mt-2 text-sm text-red-600 flex items-center"
                            >
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.position}
                            </motion.p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="availableStartDate" className="block text-sm font-semibold text-gray-700 mb-2">
                              Available Start Date <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calendar className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="date"
                                id="availableStartDate"
                                name="availableStartDate"
                                value={formData.availableStartDate}
                                onChange={handleInputChange}
                                className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-vd-orange focus:border-vd-orange transition-all ${
                                  errors.availableStartDate ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                }`}
                              />
                            </div>
                            {errors.availableStartDate && (
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-2 text-sm text-red-600 flex items-center"
                              >
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.availableStartDate}
                              </motion.p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="desiredSalaryRange" className="block text-sm font-semibold text-gray-700 mb-2">
                              Desired Salary Range (Annual) <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <DollarSign className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="text"
                                id="desiredSalaryRange"
                                name="desiredSalaryRange"
                                value={formData.desiredSalaryRange}
                                onChange={handleInputChange}
                                className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-vd-orange focus:border-vd-orange transition-all ${
                                  errors.desiredSalaryRange ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                }`}
                                placeholder="75000"
                              />
                            </div>
                            {errors.desiredSalaryRange && (
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-2 text-sm text-red-600 flex items-center"
                              >
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.desiredSalaryRange}
                              </motion.p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Education & Experience */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="p-8 md:p-10 border-b border-gray-100 bg-gray-50/50"
                    >
                      <div className="flex items-center mb-6">
                        <div className="bg-vd-orange/10 p-3 rounded-xl mr-4">
                          <GraduationCap className="w-6 h-6 text-vd-orange" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-vd-blue">Education & Experience</h2>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Highest Level of Education Completed <span className="text-red-500">*</span>
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {[
                              'High School Diploma / GED',
                              'Associate Degree',
                              'Bachelor\'s Degree',
                              'Master\'s Degree'
                            ].map((option) => (
                              <label key={option} className="flex items-center cursor-pointer group p-3 border-2 rounded-xl hover:border-vd-orange hover:bg-vd-orange/5 transition-all">
                                <input
                                  type="radio"
                                  name="highestEducation"
                                  value={option}
                                  checked={formData.highestEducation === option}
                                  onChange={handleInputChange}
                                  className="mr-3 w-4 h-4 text-vd-orange focus:ring-vd-orange cursor-pointer"
                                />
                                <span className="text-gray-700 group-hover:text-vd-blue transition-colors">{option}</span>
                              </label>
                            ))}
                          </div>
                          {errors.highestEducation && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="mt-2 text-sm text-red-600 flex items-center"
                            >
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.highestEducation}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Relevant Work Experience (Years) <span className="text-red-500">*</span>
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {['0-1 years', '2-4 years', '5-7 years', '8+ years'].map((option) => (
                              <label key={option} className="flex items-center cursor-pointer group p-3 border-2 rounded-xl hover:border-vd-orange hover:bg-vd-orange/5 transition-all justify-center">
                                <input
                                  type="radio"
                                  name="workExperience"
                                  value={option}
                                  checked={formData.workExperience === option}
                                  onChange={handleInputChange}
                                  className="mr-2 w-4 h-4 text-vd-orange focus:ring-vd-orange cursor-pointer"
                                />
                                <span className="text-gray-700 group-hover:text-vd-blue transition-colors">{option}</span>
                              </label>
                            ))}
                          </div>
                          {errors.workExperience && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="mt-2 text-sm text-red-600 flex items-center"
                            >
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.workExperience}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="references" className="block text-sm font-semibold text-gray-700 mb-2">
                            Professional References <span className="text-red-500">*</span>
                            <span className="text-xs font-normal text-gray-500 ml-2">(Name, Contact Information, Relationship)</span>
                          </label>
                          <textarea
                            id="references"
                            name="references"
                            value={formData.references}
                            onChange={handleInputChange}
                            rows={4}
                            className={`block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-vd-orange focus:border-vd-orange transition-all resize-none ${
                              errors.references ? 'border-red-500 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="Please provide at least one professional reference with their contact information and your relationship to them."
                          />
                          {errors.references && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="mt-2 text-sm text-red-600 flex items-center"
                            >
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.references}
                            </motion.p>
                          )}
                        </div>
                      </div>
                    </motion.div>

                    {/* Resume & Documents */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="p-8 md:p-10 border-b border-gray-100"
                    >
                      <div className="flex items-center mb-6">
                        <div className="bg-vd-blue/10 p-3 rounded-xl mr-4">
                          <FileText className="w-6 h-6 text-vd-blue" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-vd-blue">Resume & Documents</h2>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="resumeFile" className="block text-sm font-semibold text-gray-700 mb-2">
                            Upload Resume <span className="text-gray-500 font-normal">(PDF, DOC, DOCX - Max 10MB)</span>
                          </label>
                          <div className="relative">
                            <label
                              htmlFor="resumeFile"
                              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-vd-orange hover:bg-vd-orange/5 transition-all group"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-10 h-10 mb-3 text-gray-400 group-hover:text-vd-orange transition-colors" />
                                <p className="mb-2 text-sm text-gray-500 group-hover:text-vd-blue transition-colors">
                                  <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">PDF, DOC, DOCX (MAX. 10MB)</p>
                              </div>
                              <input
                                type="file"
                                id="resumeFile"
                                name="resumeFile"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                className="hidden"
                              />
                            </label>
                          </div>
                          {formData.resumeFile && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-3 flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-4"
                            >
                              <div className="flex items-center">
                                <FileText className="w-5 h-5 text-green-600 mr-2" />
                                <span className="text-sm text-green-800 font-medium">{formData.resumeFile.name}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, resumeFile: undefined }))}
                                className="text-red-500 hover:text-red-700 transition-colors"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </motion.div>
                          )}
                          {errors.resumeFile && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="mt-2 text-sm text-red-600 flex items-center"
                            >
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.resumeFile}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="resumeLink" className="block text-sm font-semibold text-gray-700 mb-2">
                            Link to Resume and Cover Letter <span className="text-gray-500 font-normal">(Optional - Google Drive, Dropbox, etc.)</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <LinkIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="url"
                              id="resumeLink"
                              name="resumeLink"
                              value={formData.resumeLink}
                              onChange={handleInputChange}
                              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-vd-orange focus:border-vd-orange transition-all"
                              placeholder="https://drive.google.com/..."
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Additional Information */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="p-8 md:p-10 border-b border-gray-100 bg-gray-50/50"
                    >
                      <div className="flex items-center mb-6">
                        <div className="bg-vd-orange/10 p-3 rounded-xl mr-4">
                          <Sparkles className="w-6 h-6 text-vd-orange" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-vd-blue">Additional Information</h2>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          How did you hear about Van Dyk Recycling Solutions? <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            'Company Website',
                            'Employee Referral',
                            'LinkedIn / Social Media',
                            'Job Board (Indeed, ZipRecruiter, etc.)'
                          ].map((option) => (
                            <label key={option} className="flex items-center cursor-pointer group p-3 border-2 rounded-xl hover:border-vd-orange hover:bg-vd-orange/5 transition-all">
                              <input
                                type="radio"
                                name="howDidYouHear"
                                value={option}
                                checked={formData.howDidYouHear === option}
                                onChange={handleInputChange}
                                className="mr-3 w-4 h-4 text-vd-orange focus:ring-vd-orange cursor-pointer"
                              />
                              <span className="text-gray-700 group-hover:text-vd-blue transition-colors">{option}</span>
                            </label>
                          ))}
                        </div>
                        {errors.howDidYouHear && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-2 text-sm text-red-600 flex items-center"
                          >
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.howDidYouHear}
                          </motion.p>
                        )}
                      </div>
                    </motion.div>

                    {/* Certification & Signature */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="p-8 md:p-10 border-b border-gray-100"
                    >
                      <div className="flex items-center mb-6">
                        <div className="bg-vd-blue/10 p-3 rounded-xl mr-4">
                          <Award className="w-6 h-6 text-vd-blue" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-vd-blue">Certification & Signature</h2>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="bg-blue-50 border-l-4 border-vd-blue p-4 rounded-r-xl">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            I understand that any misrepresentation or omission of facts in this application may result in rejection of my application or, if hired, immediate termination of employment. I authorize Van Dyk Recycling Solutions to verify all information provided in this application.
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            I certify that the information provided is true and complete to the best of my knowledge. <span className="text-red-500">*</span>
                          </label>
                          <div className="flex gap-6">
                            {['Yes', 'No'].map((option) => (
                              <label key={option} className="flex items-center cursor-pointer group">
                                <input
                                  type="radio"
                                  name="certification"
                                  value={option}
                                  checked={formData.certification === option}
                                  onChange={handleInputChange}
                                  className="mr-2 w-4 h-4 text-vd-orange focus:ring-vd-orange cursor-pointer"
                                />
                                <span className="text-gray-700 group-hover:text-vd-blue transition-colors">{option}</span>
                              </label>
                            ))}
                          </div>
                          {errors.certification && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="mt-2 text-sm text-red-600 flex items-center"
                            >
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.certification}
                            </motion.p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="signature" className="block text-sm font-semibold text-gray-700 mb-2">
                              Electronic Signature (Type Full Name) <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="signature"
                              name="signature"
                              value={formData.signature}
                              onChange={handleInputChange}
                              className={`block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-vd-orange focus:border-vd-orange transition-all ${
                                errors.signature ? 'border-red-500 bg-red-50' : 'border-gray-300'
                              }`}
                              placeholder="John Doe"
                            />
                            {errors.signature && (
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-2 text-sm text-red-600 flex items-center"
                              >
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.signature}
                              </motion.p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="todaysDate" className="block text-sm font-semibold text-gray-700 mb-2">
                              Today's Date <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calendar className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="date"
                                id="todaysDate"
                                name="todaysDate"
                                value={formData.todaysDate}
                                onChange={handleInputChange}
                                className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-vd-orange focus:border-vd-orange transition-all ${
                                  errors.todaysDate ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                }`}
                              />
                            </div>
                            {errors.todaysDate && (
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-2 text-sm text-red-600 flex items-center"
                              >
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.todaysDate}
                              </motion.p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      className="p-8 md:p-10 bg-gradient-to-br from-gray-50 to-white"
                    >
                      {submitStatus === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start"
                        >
                          <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-red-800 font-semibold mb-1">Submission Error</p>
                            <p className="text-red-700 text-sm">{submitMessage}</p>
                          </div>
                        </motion.div>
                      )}
                      
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={!isSubmitting ? { scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" } : {}}
                        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                        className={`w-full bg-gradient-to-r from-vd-orange to-vd-orange-alt hover:from-vd-orange-alt hover:to-vd-orange text-white px-8 py-5 rounded-xl font-bold text-lg transition-all flex items-center justify-center shadow-xl ${
                          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                            Submitting Your Application...
                          </>
                        ) : (
                          <>
                            <FileText className="w-5 h-5 mr-3" />
                            Submit Application
                            <ArrowRight className="w-5 h-5 ml-3" />
                          </>
                        )}
                      </motion.button>
                      
                      <p className="text-center text-sm text-gray-500 mt-4">
                        By submitting this application, you acknowledge that you have read and agree to our privacy policy and terms of application.
                      </p>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default JobApplication;
