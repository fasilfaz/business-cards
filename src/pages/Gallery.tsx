import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { Search, Filter, CreditCard, ExternalLink, MapPin, Briefcase, Building, User, X, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import BusinessCardPreview from '../components/BusinessCardPreview';

interface GalleryCard {
  id: string;
  userId: string;
  template: string;
  isActive: boolean;
  createdAt: string;
  userData?: any;
  personalData?: any;
  professionalData?: any;
}

const Gallery: React.FC = () => {
  const { getAllBusinessCards } = useData();
  const [allCards, setAllCards] = useState<GalleryCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<GalleryCard[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'cards'>('grid');

  const industries = ['Technology', 'Healthcare', 'Finance', 'Education', 'Marketing', 'Consulting', 'Other'];

  useEffect(() => {
    const cards = getAllBusinessCards();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const enrichedCards = cards.map(card => {
      const userData = users.find((u: any) => u.id === card.userId);
      const personalData = JSON.parse(localStorage.getItem(`personalData_${card.userId}`) || 'null');
      const professionalData = JSON.parse(localStorage.getItem(`professionalData_${card.userId}`) || 'null');
      
      return {
        ...card,
        userData,
        personalData,
        professionalData
      };
    }).filter(card => card.userData && card.personalData && card.professionalData);

    setAllCards(enrichedCards);
    setFilteredCards(enrichedCards);
  }, [getAllBusinessCards]);

  useEffect(() => {
    let filtered = allCards;

    if (searchTerm) {
      filtered = filtered.filter(card => 
        card.personalData?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.professionalData?.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.professionalData?.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.professionalData?.skills?.some((skill: string) => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        card.professionalData?.services?.some((service: string) => 
          service.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (selectedIndustry) {
      filtered = filtered.filter(card => 
        card.professionalData?.industry === selectedIndustry
      );
    }

    if (selectedType) {
      filtered = filtered.filter(card => 
        card.userData?.type === selectedType
      );
    }

    setFilteredCards(filtered);
  }, [searchTerm, selectedIndustry, selectedType, allCards]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedIndustry('');
    setSelectedType('');
  };

  const getCardStyles = (template: string) => {
    const styles = {
      modern: 'bg-gradient-to-br from-blue-600 to-teal-600',
      professional: 'bg-gradient-to-br from-gray-800 to-gray-600',
      creative: 'bg-gradient-to-br from-purple-600 to-pink-600',
      minimal: 'bg-gradient-to-br from-green-600 to-blue-600',
      corporate: 'bg-gradient-to-br from-indigo-600 to-blue-600',
      tech: 'bg-gradient-to-br from-cyan-600 to-blue-600'
    };
    return styles[template as keyof typeof styles] || styles.modern;
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Business Card Gallery</h1>
              <p className="text-gray-600 mt-2">Discover professionals and businesses in our community</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Grid View
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    viewMode === 'cards' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Card View
                </button>
              </div>
              <p className="text-sm text-gray-500">
                {filteredCards.length} of {allCards.length} cards
              </p>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by name, job title, company, skills, or services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>
            </div>

            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry
                    </label>
                    <select
                      value={selectedIndustry}
                      onChange={(e) => setSelectedIndustry(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All Industries</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All Types</option>
                      <option value="user">Individual</option>
                      <option value="company">Company</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Clear Filters</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Cards Display */}
          {filteredCards.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">No Cards Found</h2>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : viewMode === 'cards' ? (
            <div className="space-y-8">
              {filteredCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                    <div className="flex-shrink-0">
                      <BusinessCardPreview
                        template={card.template}
                        personalData={card.personalData}
                        professionalData={card.professionalData}
                        className="scale-75 lg:scale-100"
                      />
                    </div>
                    
                    <div className="flex-1 text-center lg:text-left">
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {card.personalData?.name}
                        </h3>
                        <p className="text-gray-600 mb-2">{card.professionalData?.jobTitle}</p>
                        <p className="text-gray-500">{card.professionalData?.company}</p>
                      </div>

                      <div className="flex items-center justify-center lg:justify-start space-x-4 mb-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          card.userData?.type === 'company' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {card.userData?.type === 'company' ? 'Company' : 'Individual'}
                        </span>
                        <span className="text-sm text-gray-500">
                          {card.professionalData?.industry}
                        </span>
                      </div>

                      <div className="flex justify-center lg:justify-start">
                        <Link
                          to={`/profile/${card.userData?.username}`}
                          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Profile</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Business Card Preview */}
                  <div className={`${getCardStyles(card.template)} p-6 text-white relative`}>
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white bg-opacity-10 rounded-full -mr-8 -mt-8"></div>
                    <div className="relative z-10">
                      <div className="flex items-center space-x-3 mb-4">
                        {card.personalData?.avatar ? (
                          <img 
                            src={card.personalData.avatar} 
                            alt={card.personalData.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white border-opacity-30"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-lg">{card.personalData?.name}</h3>
                          <p className="text-sm opacity-90">{card.professionalData?.jobTitle}</p>
                        </div>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center space-x-2">
                          <Building className="w-4 h-4" />
                          <span className="truncate">{card.professionalData?.company}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate">{card.personalData?.city}, {card.personalData?.state}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        card.userData?.type === 'company' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {card.userData?.type === 'company' ? 'Company' : 'Individual'}
                      </span>
                      <span className="text-sm text-gray-500">
                        {card.professionalData?.industry}
                      </span>
                    </div>

                    {card.professionalData?.skills && card.professionalData.skills.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {card.professionalData.skills.slice(0, 3).map((skill: string, idx: number) => (
                            <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                          {card.professionalData.skills.length > 3 && (
                            <span className="text-gray-500 text-xs">+{card.professionalData.skills.length - 3} more</span>
                          )}
                        </div>
                      </div>
                    )}

                    {card.professionalData?.services && card.professionalData.services.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Services</h4>
                        <div className="space-y-1">
                          {card.professionalData.services.slice(0, 2).map((service: string, idx: number) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              <span className="text-sm text-gray-600 truncate">{service}</span>
                            </div>
                          ))}
                          {card.professionalData.services.length > 2 && (
                            <span className="text-gray-500 text-xs">+{card.professionalData.services.length - 2} more services</span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-2 mt-4">
                      <Link
                        to={`/profile/${card.userData?.username}`}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>View Profile</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Gallery;