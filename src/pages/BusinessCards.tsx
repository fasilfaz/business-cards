import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { CreditCard, Plus, Eye, ExternalLink, Calendar, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import BusinessCardPreview from '../components/BusinessCardPreview';

const BusinessCards: React.FC = () => {
  const { businessCards, setActiveCard, personalData, professionalData } = useData();
  const { user } = useAuth();

  const handleSetActive = (cardId: string) => {
    setActiveCard(cardId);
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Business Cards</h1>
              <p className="text-gray-600 mt-2">Manage your digital business cards</p>
            </div>
            <Link
              to="/create-card"
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-teal-700 transition-all flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create New Card</span>
            </Link>
          </div>

          {businessCards.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">No Business Cards Yet</h2>
              <p className="text-gray-600 mb-8">Create your first business card to get started</p>
              <Link
                to="/create-card"
                className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-teal-700 transition-all inline-flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Create Your First Card</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {businessCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`bg-white rounded-xl shadow-lg p-8 border-2 transition-all hover:shadow-xl ${
                    card.isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                    <div className="flex-shrink-0">
                      <BusinessCardPreview
                        template={card.template}
                        personalData={personalData}
                        professionalData={professionalData}
                        showDownload={true}
                        className="scale-75 lg:scale-100"
                      />
                    </div>
                    
                    <div className="flex-1 text-center lg:text-left">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 capitalize mb-2">
                            {card.template} Business Card
                          </h3>
                          <div className="flex items-center justify-center lg:justify-start space-x-2 text-sm text-gray-600 mb-2">
                            <Calendar className="w-4 h-4" />
                            <span>Created {new Date(card.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        {card.isActive && (
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            Active Card
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 mb-4">
                        <Link
                          to={`/profile/${user?.username}`}
                          className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Preview Profile</span>
                        </Link>
                        <Link
                          to={`/profile/${user?.username}`}
                          target="_blank"
                          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Visit Live Profile</span>
                        </Link>
                      </div>

                      {!card.isActive && (
                        <button
                          onClick={() => handleSetActive(card.id)}
                          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Set as Active Card
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-12 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="text-center lg:text-left mb-6 lg:mb-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Profile URL</h3>
                <p className="text-gray-600 mb-4">Share your professional profile with others</p>
                <div className="bg-white px-4 py-3 rounded-lg border border-gray-200 font-mono text-sm">
                  https://business-cards-seven.vercel.app/profile/{user?.username}
                </div>
              </div>
              <div>
                <Link
                  to={`/profile/${user?.username}`}
                  className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-teal-700 transition-all inline-flex items-center space-x-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Visit Profile</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BusinessCards;