import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Login from './pages/Login';
import Register from './pages/Register';
import PersonalData from './pages/PersonalData';
import ProfessionalData from './pages/ProfessionalData';
import BusinessCards from './pages/BusinessCards';
import CreateCard from './pages/CreateCard';
import Profile from './pages/Profile';
import Gallery from './pages/Gallery';
import EditProfile from './pages/EditProfile';
import Navbar from './components/Navbar';

function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/personal-data" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/personal-data" />} />
        <Route path="/personal-data" element={isAuthenticated ? <PersonalData /> : <Navigate to="/login" />} />
        <Route path="/professional-data" element={isAuthenticated ? <ProfessionalData /> : <Navigate to="/login" />} />
        <Route path="/business-cards" element={isAuthenticated ? <BusinessCards /> : <Navigate to="/login" />} />
        <Route path="/create-card" element={isAuthenticated ? <CreateCard /> : <Navigate to="/login" />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/gallery" element={isAuthenticated ? <Gallery /> : <Navigate to="/login" />} />
        <Route path="/edit-profile" element={isAuthenticated ? <EditProfile /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/business-cards" : "/login"} />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <AppRoutes />
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;