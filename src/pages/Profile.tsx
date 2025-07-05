import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, Linkedin, Briefcase, Building, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface UserProfile {
  id: string;
  name: string;
  phone: string;
  username: string;
  type: 'user' | 'company';
  personalData?: any;
  professionalData?: any;
  businessCards?: any[];
}

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeCard, setActiveCard] = useState<any>(null);

  useEffect(() => {
    // Fetch user profile data
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.username === username);
    
    if (user) {
      const personalData = JSON.parse(localStorage.getItem(`personalData_${user.id}`) || 'null');
      const professionalData = JSON.parse(localStorage.getItem(`professionalData_${user.id}`) || 'null');
      const businessCards = JSON.parse(localStorage.getItem(`businessCards_${user.id}`) || '[]');
      
      setProfile({
        ...user,
        personalData,
        professionalData,
        businessCards
      });

      // Find active card
      const active = businessCards.find((card: any) => card.isActive);
      if (active) {
        setActiveCard(active);
      }
    }
  }, [username]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Profile Not Found</h2>
          <p className="text-gray-600">The profile you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Business Card Display */}
          {activeCard && (
            <div className="mb-8">
              <div className={`${getCardStyles(activeCard.template)} rounded-2xl p-8 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      {profile.personalData?.avatar ? (
                        <img 
                          src={profile.personalData.avatar} 
                          alt={profile.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-white border-opacity-30"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                          <User className="w-8 h-8 text-white" />
                        </div>
                      )}
                      <div>
                        <h1 className="text-2xl font-bold">{profile.personalData?.name || profile.name}</h1>
                        <p className="text-lg opacity-90">{profile.professionalData?.jobTitle}</p>
                        <p className="opacity-80">{profile.professionalData?.company}</p>
                      </div>
                    </div>
                    {profile.professionalData?.companyLogo && (
                      <img 
                        src={profile.professionalData.companyLogo} 
                        alt="Company Logo"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5" />
                        <span>{profile.personalData?.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5" />
                        <span>{profile.personalData?.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5" />
                        <span>{profile.personalData?.city}, {profile.personalData?.state}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {profile.professionalData?.website && (
                        <div className="flex items-center space-x-3">
                          <Globe className="w-5 h-5" />
                          <a href={profile.professionalData.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            Website
                          </a>
                        </div>
                      )}
                      {profile.professionalData?.linkedIn && (
                        <div className="flex items-center space-x-3">
                          <Linkedin className="w-5 h-5" />
                          <a href={profile.professionalData.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            LinkedIn
                          </a>
                        </div>
                      )}
                      <div className="flex items-center space-x-3">
                        <Briefcase className="w-5 h-5" />
                        <span>{profile.professionalData?.experience} experience</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Profile Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* About Section */}
            <div className="lg:col-span-2 space-y-6">
              {profile.professionalData?.bio && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
                  <p className="text-gray-600 leading-relaxed">{profile.professionalData.bio}</p>
                </div>
              )}

              {profile.professionalData?.skills && profile.professionalData.skills.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {profile.professionalData.skills.map((skill: string, index: number) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {profile.professionalData?.services && profile.professionalData.services.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Services</h2>
                  <div className="space-y-2">
                    {profile.professionalData.services.map((service: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {profile.professionalData?.products && profile.professionalData.products.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Products</h2>
                  <div className="space-y-2">
                    {profile.professionalData.products.map((product: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-gray-700">{product}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900">{profile.personalData?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-900">{profile.personalData?.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-gray-900">
                        {profile.personalData?.city}, {profile.personalData?.state}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {profile.professionalData && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Professional</h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Briefcase className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Position</p>
                        <p className="text-gray-900">{profile.professionalData.jobTitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Building className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Company</p>
                        <p className="text-gray-900">{profile.professionalData.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Experience</p>
                        <p className="text-gray-900">{profile.professionalData.experience}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;