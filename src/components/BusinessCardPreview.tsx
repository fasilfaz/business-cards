import React, { useState, useRef } from 'react';
import { Download, RotateCcw, User, Mail, Phone, MapPin, Globe, Linkedin, Building, Briefcase } from 'lucide-react';
import html2canvas from 'html2canvas';

interface BusinessCardPreviewProps {
  template: string;
  personalData: any;
  professionalData: any;
  showDownload?: boolean;
  className?: string;
}

const BusinessCardPreview: React.FC<BusinessCardPreviewProps> = ({
  template,
  personalData,
  professionalData,
  showDownload = false,
  className = ""
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

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

  const downloadCard = async (side: 'front' | 'back') => {
    const element = side === 'front' ? frontRef.current : backRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
        allowTaint: true
      });
      
      const link = document.createElement('a');
      link.download = `business-card-${side}-${personalData?.name || 'card'}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error downloading card:', error);
    }
  };

  const downloadBothSides = async () => {
    await downloadCard('front');
    setTimeout(() => downloadCard('back'), 500);
  };

  return (
    <div className={`relative ${className}`}>
      {showDownload && (
        <div className="flex justify-center space-x-2 mb-4">
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Flip Card</span>
          </button>
          <button
            onClick={() => downloadCard('front')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Front</span>
          </button>
          <button
            onClick={() => downloadCard('back')}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Back</span>
          </button>
          <button
            onClick={downloadBothSides}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Both Sides</span>
          </button>
        </div>
      )}

      <div className="perspective-1000">
        <div 
          className={`relative w-96 h-56 transition-transform duration-700 transform-style-preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front Side */}
          <div 
            ref={frontRef}
            className={`absolute inset-0 w-full h-full ${getCardStyles(template)} rounded-xl p-6 text-white backface-hidden`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -mr-12 -mt-12"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white bg-opacity-10 rounded-full -ml-8 -mb-8"></div>
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  {personalData?.avatar ? (
                    <img 
                      src={personalData.avatar} 
                      alt={personalData.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white border-opacity-30"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-bold">{personalData?.name}</h3>
                    <p className="text-sm opacity-90">{professionalData?.jobTitle}</p>
                  </div>
                </div>
                {professionalData?.companyLogo && (
                  <img 
                    src={professionalData.companyLogo} 
                    alt="Company Logo"
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                )}
              </div>

              <div>
                <p className="text-sm opacity-90 mb-2">{professionalData?.company}</p>
                <div className="flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <Phone className="w-3 h-3" />
                    <span>{personalData?.phone}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Mail className="w-3 h-3" />
                    <span>{personalData?.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back Side */}
          <div 
            ref={backRef}
            className={`absolute inset-0 w-full h-full ${getCardStyles(template)} rounded-xl p-6 text-white backface-hidden rotate-y-180`}
          >
            <div className="absolute top-0 left-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -ml-10 -mt-10"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -mr-12 -mb-12"></div>
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold mb-3">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{personalData?.city}, {personalData?.state}</span>
                  </div>
                  {professionalData?.website && (
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4" />
                      <span className="truncate">{professionalData.website}</span>
                    </div>
                  )}
                  {professionalData?.linkedIn && (
                    <div className="flex items-center space-x-2">
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn Profile</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">Services</h4>
                <div className="space-y-1">
                  {professionalData?.services?.slice(0, 3).map((service: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      <span className="text-xs truncate">{service}</span>
                    </div>
                  ))}
                  {professionalData?.services?.length > 3 && (
                    <span className="text-xs opacity-75">+{professionalData.services.length - 3} more</span>
                  )}
                </div>
              </div>

              <div className="text-center">
                <div className="text-xs opacity-75">
                  {professionalData?.industry} • {professionalData?.experience}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCardPreview;