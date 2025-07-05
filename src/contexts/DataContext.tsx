import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface PersonalData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  avatar?: string;
}

interface ProfessionalData {
  jobTitle: string;
  company: string;
  industry: string;
  experience: string;
  skills: string[];
  services: string[];
  products: string[];
  website: string;
  linkedIn: string;
  portfolio: string;
  bio: string;
  companyLogo?: string;
}

interface BusinessCard {
  id: string;
  userId: string;
  template: string;
  isActive: boolean;
  createdAt: string;
}

interface DataContextType {
  personalData: PersonalData | null;
  professionalData: ProfessionalData | null;
  businessCards: BusinessCard[];
  updatePersonalData: (data: PersonalData) => void;
  updateProfessionalData: (data: ProfessionalData) => void;
  createBusinessCard: (template: string) => void;
  setActiveCard: (cardId: string) => void;
  getAllBusinessCards: () => BusinessCard[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [personalData, setPersonalData] = useState<PersonalData | null>(null);
  const [professionalData, setProfessionalData] = useState<ProfessionalData | null>(null);
  const [businessCards, setBusinessCards] = useState<BusinessCard[]>([]);

  useEffect(() => {
    if (user) {
      const savedPersonalData = localStorage.getItem(`personalData_${user.id}`);
      const savedProfessionalData = localStorage.getItem(`professionalData_${user.id}`);
      const savedBusinessCards = localStorage.getItem(`businessCards_${user.id}`);

      if (savedPersonalData) {
        setPersonalData(JSON.parse(savedPersonalData));
      }
      if (savedProfessionalData) {
        setProfessionalData(JSON.parse(savedProfessionalData));
      }
      if (savedBusinessCards) {
        setBusinessCards(JSON.parse(savedBusinessCards));
      }
    }
  }, [user]);

  const updatePersonalData = (data: PersonalData) => {
    setPersonalData(data);
    if (user) {
      localStorage.setItem(`personalData_${user.id}`, JSON.stringify(data));
    }
  };

  const updateProfessionalData = (data: ProfessionalData) => {
    setProfessionalData(data);
    if (user) {
      localStorage.setItem(`professionalData_${user.id}`, JSON.stringify(data));
    }
  };

  const createBusinessCard = (template: string) => {
    if (!user) return;

    const newCard: BusinessCard = {
      id: Date.now().toString(),
      userId: user.id,
      template,
      isActive: businessCards.length === 0,
      createdAt: new Date().toISOString()
    };

    const updatedCards = [...businessCards, newCard];
    setBusinessCards(updatedCards);
    localStorage.setItem(`businessCards_${user.id}`, JSON.stringify(updatedCards));
  };

  const setActiveCard = (cardId: string) => {
    const updatedCards = businessCards.map(card => ({
      ...card,
      isActive: card.id === cardId
    }));
    setBusinessCards(updatedCards);
    if (user) {
      localStorage.setItem(`businessCards_${user.id}`, JSON.stringify(updatedCards));
    }
  };

  const getAllBusinessCards = (): BusinessCard[] => {
    const allCards: BusinessCard[] = [];
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    users.forEach((u: any) => {
      const userCards = JSON.parse(localStorage.getItem(`businessCards_${u.id}`) || '[]');
      allCards.push(...userCards);
    });
    
    return allCards;
  };

  return (
    <DataContext.Provider value={{
      personalData,
      professionalData,
      businessCards,
      updatePersonalData,
      updateProfessionalData,
      createBusinessCard,
      setActiveCard,
      getAllBusinessCards
    }}>
      {children}
    </DataContext.Provider>
  );
};