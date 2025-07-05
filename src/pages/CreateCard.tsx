import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { CreditCard, Check, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import BusinessCardPreview from '../components/BusinessCardPreview';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and minimalist design with bold colors',
    preview: 'bg-gradient-to-br from-blue-600 to-teal-600'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Classic business card with elegant typography',
    preview: 'bg-gradient-to-br from-gray-800 to-gray-600'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Vibrant colors and unique layout for creative professionals',
    preview: 'bg-gradient-to-br from-purple-600 to-pink-600'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and clean design focusing on content',
    preview: 'bg-gradient-to-br from-green-600 to-blue-600'
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Professional corporate design with structured layout',
    preview: 'bg-gradient-to-br from-indigo-600 to-blue-600'
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Modern tech-inspired design with geometric elements',
    preview: 'bg-gradient-to-br from-cyan-600 to-blue-600'
  }
];

const CreateCard: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [showPreview, setShowPreview] = useState(false);
  const { createBusinessCard, personalData, professionalData } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCreateCard = () => {
    if (selectedTemplate) {
      createBusinessCard(selectedTemplate);
      navigate('/business-cards');
    }
  };

  const handlePreview = (templateId: string) => {
    setSelectedTemplate(templateId);
    setShowPreview(true);
  };

  if (showPreview && selectedTemplate) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Preview Your Business Card</h1>
              <p className="text-gray-600">See how your card will look with your data</p>
            </div>

            <div className="flex justify-center mb-8">
              <BusinessCardPreview
                template={selectedTemplate}
                personalData={personalData}
                professionalData={professionalData}
                showDownload={true}
              />
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowPreview(false)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Back to Templates
              </button>
              <button
                onClick={handleCreateCard}
                className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-teal-700 transition-all flex items-center space-x-2"
              >
                <CreditCard className="w-5 h-5" />
                <span>Create This Card</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Card Template</h1>
            <p className="text-gray-600">Select a template that best represents your professional brand</p>
            <div className="flex justify-center mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-medium">✓</div>
                <div className="w-16 h-1 bg-green-600 rounded"></div>
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-medium">✓</div>
                <div className="w-16 h-1 bg-green-600 rounded"></div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">3</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all hover:shadow-xl ${
                  selectedTemplate === template.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className={`h-48 ${template.preview} relative`}>
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <div className="text-white text-center">
                      <CreditCard className="w-16 h-16 mx-auto mb-4" />
                      <p className="text-lg font-semibold">Business Card</p>
                      <p className="text-sm opacity-90">Preview</p>
                    </div>
                  </div>
                  {selectedTemplate === template.id && (
                    <div className="absolute top-4 right-4 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                        selectedTemplate === template.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {selectedTemplate === template.id ? 'Selected' : 'Select'}
                    </button>
                    <button
                      onClick={() => handlePreview(template.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Preview</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={handleCreateCard}
              disabled={!selectedTemplate}
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
            >
              <CreditCard className="w-5 h-5" />
              <span>Create Business Card</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateCard;