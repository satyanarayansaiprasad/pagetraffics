import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import About from './Components/About';
import Service from './Components/Service';
import Navbar from './Components/Navbar';
import ContactForm from './Components/ContactForm';
import Footer from './Components/Footer';
import Register from './Components/Register';
import Login from './Components/Login';
import ForgotPassword from './Components/ForgotPassword';
import VerifyEmail from './Components/VerifyEmail';
import CustomerProfile from './Components/CustomerProfile';
import CreateProject from './Components/CreateProject';
import CustomerProjects from './Components/CustomerProjects';
import AdminLogin from './Components/AdminLogin';
import AdminDashboard from './Components/AdminDashboard';
import { ProtectedRoute, AdminRoute } from './Components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

// RouteManager toggles static #landing-page visibility based on URL path
const RouteManager = () => {
  const location = useLocation();

  useEffect(() => {
    const landingEl = document.getElementById('landing-page');
    if (landingEl) {
      const isHome = location.pathname === '/' || location.pathname === '' || location.hash !== '';
      if (isHome && (location.pathname === '/' || location.pathname === '')) {
        landingEl.style.display = 'block';
      } else {
        landingEl.style.display = 'none';
      }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return null;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <RouteManager />
        <Navbar />
        <Routes>
          {/* Homepage renders null as static #landing-page HTML is visible below Navbar */}
          <Route path="/" element={null} />

          {/* Public Subpages */}
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Service />} />
          <Route path="/contact" element={<ContactForm />} />

          {/* Customer Auth & Profile Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <CustomerProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-project"
            element={
              <ProtectedRoute>
                <CreateProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <CustomerProjects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/dashboard"
            element={
              <ProtectedRoute>
                <CustomerProjects />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          {/* Fallback to null (or homepage) */}
          <Route path="*" element={null} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
