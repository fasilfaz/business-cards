import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { Briefcase, Building, Globe, Linkedin, FileText, Upload, ArrowRight, X, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfessionalData: React.FC = () => {
  const { professionalData, updateProfessionalData } = useData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    industry: '',
    experience: '',
    skills: [] as string[],
    services: [] as string[],
    products: [] as string[],
    website: '',
    linkedIn: '',
    portfolio: '',
    bio: '',
    companyLogo: ''
  });

  const [newSkill, setNewSkill] = useState('');
  const [newService, setNewService] = useState('');
  const [newProduct, setNewProduct] = useState('');

  useEffect(() => {
    if (professionalData) {
      setFormData(professionalData);
    }
  }, [professionalData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfessionalData(formData);
    navigate('/business-cards');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          companyLogo: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = (type: 'skills' | 'services' | 'products', value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [type]: [...prev[type], value.trim()]
      }));
      if (type === 'skills') setNewSkill('');
      if (type === 'services') setNewService('');
      if (type === 'products') setNewProduct('');
    }
  };

  const removeItem = (type: 'skills' | 'services' | 'products', index: number) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Professional Information</h1>
            <p className="text-gray-600">Tell us about your professional background</p>
            <div className="flex justify-center mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-medium">✓</div>
                <div className="w-16 h-1 bg-green-600 rounded"></div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">2</div>
                <div className="w-16 h-1 bg-blue-600 rounded"></div>
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-medium">3</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  {formData.companyLogo ? (
                    <img src={formData.companyLogo} alt="Company Logo" className="w-full h-full object-cover" />
                  ) : (
                    <Building className="w-10 h-10 text-gray-400" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                  <Upload className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-2">Company Logo</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="e.g., Software Developer"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="e.g., Tech Solutions Inc."
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select Industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Education">Education</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select Experience</option>
                  <option value="0-1 years">0-1 years</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5-10 years">5-10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn
                </label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="url"
                    name="linkedIn"
                    value={formData.linkedIn}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Add a skill"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('skills', newSkill))}
                />
                <button
                  type="button"
                  onClick={() => addItem('skills', newSkill)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeItem('skills', index)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Services
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Add a service"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('services', newService))}
                />
                <button
                  type="button"
                  onClick={() => addItem('services', newService)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.services.map((service, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    {service}
                    <button
                      type="button"
                      onClick={() => removeItem('services', index)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Products
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newProduct}
                  onChange={(e) => setNewProduct(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Add a product"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('products', newProduct))}
                />
                <button
                  type="button"
                  onClick={() => addItem('products', newProduct)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.products.map((product, index) => (
                  <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    {product}
                    <button
                      type="button"
                      onClick={() => removeItem('products', index)}
                      className="text-orange-600 hover:text-orange-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Tell us about yourself and your professional journey..."
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-teal-700 transition-all flex items-center justify-center space-x-2"
              >
                <span>Complete Profile Setup</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfessionalData;