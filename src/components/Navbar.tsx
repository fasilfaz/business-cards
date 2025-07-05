import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, LogOut, CreditCard, Users, Settings } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text">
              CardCraft
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link
                to="/business-cards"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/business-cards') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>My Cards</span>
              </Link>
              <Link
                to="/gallery"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/gallery') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Gallery</span>
              </Link>
              <Link
                to="/edit-profile"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/edit-profile') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">{user?.name}</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;