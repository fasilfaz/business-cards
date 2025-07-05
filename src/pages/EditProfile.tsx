import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { User, Briefcase, Save } from 'lucide-react';
import { motion } from 'framer-motion';

const EditProfile: React.FC = () => {
  const { personalData, professionalData, updatePersonalData, updateProfessionalData } = useData();
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'personal' | 'professional'>('personal');
  const [personalForm, setPersonalForm] = useState(personalData || {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    avatar: ''
  });
  const [professionalForm, setProfessionalForm] = useState(professionalData || {
    jobTitle: '',
    company: '',
    industry: '',
    experience: '',
    skills: [],
    services: [],
    products: [],
    website: '',
    linkedIn: '',
    portfolio: '',
    bio: '',
    companyLogo: ''
  });

  const handlePersonalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalData(personalForm);
    alert('Personal information updated successfully!');
  };

  const handleProfessionalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfessionalData(professionalForm);
    alert('Professional information updated successfully!');
  };

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleProfessionalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProfessionalForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'companyLogo') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'avatar') {
          setPersonalForm(prev => ({
            ...prev,
            avatar: reader.result as string
          }));
        } else {
          setProfessionalForm(prev => ({
            ...prev,
            companyLogo: reader.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Profile</h1>
            <p className="text-gray-600">Update your personal and professional information</p>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-sm p-1 mb-8">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('personal')}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'personal'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <User className="w-5 h-5" />
                <span>Personal Information</span>
              </button>
              <button
                onClick={() => setActiveTab('professional')}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'professional'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Briefcase className="w-5 h-5" />
                <span>Professional Information</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            {activeTab === 'personal' && (
              <form onSubmit={handlePersonalSubmit} className="space-y-6">
                <div className="text-center mb-8">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                      {personalForm.avatar ? (
                        <img src={personalForm.avatar} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-10 h-10 text-gray-400" />
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'avatar')}
                        className="hidden"
                      />
                      <span className="text-white text-sm">+</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={personalForm.name}
                      onChange={handlePersonalChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={personalForm.email}
                      onChange={handlePersonalChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={personalForm.phone}
                      onChange={handlePersonalChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={personalForm.address}
                      onChange={handlePersonalChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your address"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={personalForm.city}
                      onChange={handlePersonalChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your city"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={personalForm.state}
                      onChange={handlePersonalChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your state"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={personalForm.zipCode}
                      onChange={handlePersonalChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your ZIP code"
                      required
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-teal-700 transition-all flex items-center justify-center space-x-2"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Personal Information</span>
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'professional' && (
              <form onSubmit={handleProfessionalSubmit} className="space-y-6">
                <div className="text-center mb-8">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                      {professionalForm.companyLogo ? (
                        <img src={professionalForm.companyLogo} alt="Company Logo" className="w-full h-full object-cover" />
                      ) : (
                        <Briefcase className="w-10 h-10 text-gray-400" />
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'companyLogo')}
                        className="hidden"
                      />
                      <span className="text-white text-sm">+</span>
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Company Logo</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={professionalForm.jobTitle}
                      onChange={handleProfessionalChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g., Software Developer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={professionalForm.company}
                      onChange={handleProfessionalChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g., Tech Solutions Inc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry
                    </label>
                    <select
                      name="industry"
                      value={professionalForm.industry}
                      onChange={handleProfessionalChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                      value={professionalForm.experience}
                      onChange={handleProfessionalChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                    <input
                      type="url"
                      name="website"
                      value={professionalForm.website}
                      onChange={handleProfessionalChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      name="linkedIn"
                      value={professionalForm.linkedIn}
                      onChange={handleProfessionalChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={professionalForm.bio}
                    onChange={handleProfessionalChange}
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
                    <Save className="w-5 h-5" />
                    <span>Save Professional Information</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EditProfile;