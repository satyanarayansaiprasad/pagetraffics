import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  FaUserCircle, 
  FaUserShield, 
  FaSignInAlt, 
  FaUserPlus, 
  FaSignOutAlt, 
  FaPlusCircle, 
  FaThLarge,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, isAdmin, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setMobileOpen(false);
      navigate('/login');
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };

  const handleAnchorClick = (e, hash) => {
    setMobileOpen(false);
    if (location.pathname !== '/') {
      e.preventDefault();
      sessionStorage.setItem('returnScroll', '0');
      navigate(`/${hash}`);
    }
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
      {/* Main Navbar Header */}
      <div className="navbar is-active is-top" style={{ position: 'relative' }}>
        <div className="container">
          <div className="nav-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
            
            {/* Left Nav Column: Links */}
            <div className="nav-col is-left" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="nav-link-block" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Link 
                  to="/" 
                  className={`nav-link ${location.pathname === '/' ? 'w--current' : ''}`}
                  style={location.pathname === '/' ? { color: '#FF6900', fontWeight: '800' } : {}}
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
                <div className="nav-link-separator"></div>

                <Link 
                  to="/about" 
                  className={`nav-link ${location.pathname === '/about' ? 'w--current' : ''}`} 
                  style={location.pathname === '/about' ? { color: '#FF6900', fontWeight: '800' } : {}}
                  onClick={closeMobileMenu}
                >
                  About Us
                </Link>
                <div className="nav-link-separator"></div>

                <Link 
                  to="/services" 
                  className={`nav-link ${location.pathname === '/services' ? 'w--current' : ''}`} 
                  style={location.pathname === '/services' ? { color: '#FF6900', fontWeight: '800' } : {}}
                  onClick={closeMobileMenu}
                >
                  Services
                </Link>
                <div className="nav-link-separator"></div>

                <a 
                  href="#featured-case-study" 
                  className="nav-link"
                  onClick={(e) => handleAnchorClick(e, '#featured-case-study')}
                >
                  Case Studies
                </a>
                <div className="nav-link-separator"></div>

                <a 
                  href="#faqs" 
                  className="nav-link"
                  onClick={(e) => handleAnchorClick(e, '#faqs')}
                >
                  FAQs
                </a>
                <div className="nav-link-separator"></div>

                <Link 
                  to="/contact" 
                  className={`nav-link ${location.pathname === '/contact' ? 'w--current' : ''}`} 
                  style={location.pathname === '/contact' ? { color: '#FF6900', fontWeight: '800' } : {}}
                  onClick={closeMobileMenu}
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Middle Nav Column: ONLY Brand Logo (No Text) */}
            <div className="nav-col is-middle" style={{ display: 'flex', alignItems: 'center' }}>
              <div 
                className="hamburger-box" 
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{ cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center' }}
              >
                {mobileOpen ? <FaTimes size={24} color="#193CB8" /> : <FaBars size={24} color="#193CB8" />}
              </div>

              <Link 
                to="/" 
                className="logo-link" 
                style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
                onClick={closeMobileMenu}
              >
                <img 
                  src="/logo.jpeg" 
                  alt="PageTraffics Logo" 
                  style={{ height: '48px', width: 'auto', borderRadius: '8px', objectFit: 'contain' }} 
                />
              </Link>
            </div>

            {/* Right Nav Column: Auth & User Actions */}
            <div
              className="nav-col is-right"
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              {currentUser ? (
                <>
                  {isAdmin ? (
                    <Link
                      to="/admin/dashboard"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        background: 'rgba(25, 60, 184, 0.1)',
                        color: '#193CB8',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        textDecoration: 'none'
                      }}
                      onClick={closeMobileMenu}
                    >
                      <FaUserShield /> Admin Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/customer/dashboard"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 14px',
                          borderRadius: '8px',
                          background: 'rgba(25, 60, 184, 0.1)',
                          color: '#193CB8',
                          fontWeight: '700',
                          fontSize: '0.85rem',
                          textDecoration: 'none'
                        }}
                        onClick={closeMobileMenu}
                      >
                        <FaThLarge /> Dashboard
                      </Link>
                      <Link
                        to="/create-project"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 14px',
                          borderRadius: '8px',
                          background: 'rgba(255, 105, 0, 0.1)',
                          color: '#FF6900',
                          fontWeight: '700',
                          fontSize: '0.85rem',
                          textDecoration: 'none'
                        }}
                        onClick={closeMobileMenu}
                      >
                        <FaPlusCircle /> New Project
                      </Link>
                    </>
                  )}
                  <Link
                    to="/profile"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 12px',
                      color: '#4B5563',
                      fontWeight: '600',
                      fontSize: '0.85rem',
                      textDecoration: 'none'
                    }}
                    onClick={closeMobileMenu}
                  >
                    <FaUserCircle size={18} /> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      background: '#FFFFFF',
                      color: '#EF4444',
                      fontWeight: '600',
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      color: '#193CB8',
                      fontWeight: '700',
                      fontSize: '0.9rem',
                      textDecoration: 'none'
                    }}
                    onClick={closeMobileMenu}
                  >
                    <FaSignInAlt /> Log In
                  </Link>
                  <Link
                    to="/register"
                    className="button is-orange is-nav-btn w-inline-block"
                    onClick={closeMobileMenu}
                  >
                    <div className="button-text" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FaUserPlus /> Sign Up
                    </div>
                    <div className="button-dot"></div>
                  </Link>
                </>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div 
          className="mobile-menu-drawer"
          style={{
            display: 'block',
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#FFFFFF',
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
            borderTop: '1px solid #F3F4F6',
            padding: '20px',
            zIndex: 999
          }}
        >
          <div className="mobile-menu-box">
            <div className="mobile-menu-links-box" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="mobile-menu-small-title" style={{ fontWeight: '700', color: '#9CA3AF', fontSize: '0.75rem', textTransform: 'uppercase' }}>Navigation</div>
              
              <Link to="/" className="mobile-menu-link" onClick={closeMobileMenu} style={{ fontWeight: '600', color: '#1F2937' }}>Home</Link>
              <Link to="/about" className="mobile-menu-link" onClick={closeMobileMenu} style={{ fontWeight: '600', color: '#1F2937' }}>About Us</Link>
              <Link to="/services" className="mobile-menu-link" onClick={closeMobileMenu} style={{ fontWeight: '600', color: '#1F2937' }}>Services</Link>
              <a href="#featured-case-study" className="mobile-menu-link" onClick={(e) => handleAnchorClick(e, '#featured-case-study')} style={{ fontWeight: '600', color: '#1F2937' }}>Case Studies</a>
              <a href="#faqs" className="mobile-menu-link" onClick={(e) => handleAnchorClick(e, '#faqs')} style={{ fontWeight: '600', color: '#1F2937' }}>FAQs</a>
              <Link to="/contact" className="mobile-menu-link" onClick={closeMobileMenu} style={{ fontWeight: '600', color: '#1F2937' }}>Contact Us</Link>

              <div style={{ height: '1px', background: '#E5E7EB', margin: '8px 0' }}></div>

              <div className="mobile-menu-small-title" style={{ fontWeight: '700', color: '#9CA3AF', fontSize: '0.75rem', textTransform: 'uppercase' }}>Account</div>
              {currentUser ? (
                <>
                  {isAdmin ? (
                    <Link to="/admin/dashboard" className="mobile-menu-link" onClick={closeMobileMenu} style={{ color: '#193CB8', fontWeight: '700' }}>Admin Dashboard</Link>
                  ) : (
                    <>
                      <Link to="/customer/dashboard" className="mobile-menu-link" onClick={closeMobileMenu} style={{ color: '#193CB8', fontWeight: '700' }}>My Dashboard</Link>
                      <Link to="/create-project" className="mobile-menu-link" onClick={closeMobileMenu} style={{ color: '#FF6900', fontWeight: '700' }}>+ New Project</Link>
                    </>
                  )}
                  <Link to="/profile" className="mobile-menu-link" onClick={closeMobileMenu} style={{ color: '#4B5563' }}>My Profile</Link>
                  <button 
                    onClick={handleLogout} 
                    style={{ 
                      textAlign: 'left', 
                      background: 'none', 
                      border: 'none', 
                      color: '#EF4444', 
                      fontWeight: '700', 
                      fontSize: '1rem',
                      cursor: 'pointer',
                      padding: 0 
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="mobile-menu-link" onClick={closeMobileMenu} style={{ color: '#193CB8', fontWeight: '700' }}>Customer Login</Link>
                  <Link to="/register" className="mobile-menu-link" onClick={closeMobileMenu} style={{ color: '#FF6900', fontWeight: '700' }}>Sign Up Now</Link>
                  <Link to="/admin/login" className="mobile-menu-link" onClick={closeMobileMenu} style={{ color: '#6B7280', fontSize: '0.85rem' }}>Admin Portal</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;