import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  phone: string;
  name: string;
  type: 'user' | 'company';
  username: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (phone: string, password: string) => Promise<boolean>;
  register: (phone: string, password: string, name: string, type: 'user' | 'company') => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (phone: string, password: string): Promise<boolean> => {
    // Simulate API call
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: any) => u.phone === phone && u.password === password);
    
    if (foundUser) {
      const userData = {
        id: foundUser.id,
        phone: foundUser.phone,
        name: foundUser.name,
        type: foundUser.type,
        username: foundUser.username
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = async (phone: string, password: string, name: string, type: 'user' | 'company'): Promise<boolean> => {
    // Simulate API call
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((u: any) => u.phone === phone);
    
    if (existingUser) {
      return false; // User already exists
    }

    const newUser = {
      id: Date.now().toString(),
      phone,
      password,
      name,
      type,
      username: phone.replace(/\D/g, '')
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    const userData = {
      id: newUser.id,
      phone: newUser.phone,
      name: newUser.name,
      type: newUser.type,
      username: newUser.username
    };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};