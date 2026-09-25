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
    } else {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const linkStyle = (path) => ({
    whiteSpace: 'nowrap',
    fontSize: '0.92rem',
    fontWeight: location.pathname === path ? '800' : '600',
    color: location.pathname === path ? '#FF6900' : '#1E293B',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    padding: '6px 10px'
  });

  return (
    <nav 
      style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 1000, 
        width: '100%', 
        background: '#FFFFFF',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        borderBottom: '1px solid #E2E8F0'
      }}
    >
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
          
          {/* Brand Logo (Left) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link 
              to="/" 
              style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
              onClick={closeMobileMenu}
            >
              <img 
                src="/logo.jpeg" 
                alt="PageTraffics Logo" 
                style={{ height: '46px', width: 'auto', borderRadius: '8px', objectFit: 'contain' }} 
              />
            </Link>
          </div>

          {/* Center Nav Links (Desktop) */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px',
              flexWrap: 'nowrap'
            }}
          >
            <Link to="/" style={linkStyle('/')} onClick={closeMobileMenu}>
              Home
            </Link>
            <span style={{ color: '#CBD5E1' }}>|</span>

            <Link to="/about" style={linkStyle('/about')} onClick={closeMobileMenu}>
              About Us
            </Link>
            <span style={{ color: '#CBD5E1' }}>|</span>

            <Link to="/services" style={linkStyle('/services')} onClick={closeMobileMenu}>
              Services
            </Link>
            <span style={{ color: '#CBD5E1' }}>|</span>

            <a 
              href="#featured-case-study" 
              style={{
                whiteSpace: 'nowrap',
                fontSize: '0.92rem',
                fontWeight: '600',
                color: '#1E293B',
                textDecoration: 'none',
                padding: '6px 10px'
              }}
              onClick={(e) => handleAnchorClick(e, '#featured-case-study')}
            >
              Case Studies
            </a>
            <span style={{ color: '#CBD5E1' }}>|</span>

            <a 
              href="#faqs" 
              style={{
                whiteSpace: 'nowrap',
                fontSize: '0.92rem',
                fontWeight: '600',
                color: '#1E293B',
                textDecoration: 'none',
                padding: '6px 10px'
              }}
              onClick={(e) => handleAnchorClick(e, '#faqs')}
            >
              FAQs
            </a>
            <span style={{ color: '#CBD5E1' }}>|</span>

            <Link to="/contact" style={linkStyle('/contact')} onClick={closeMobileMenu}>
              Contact Us
            </Link>
          </div>

          {/* Right Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {currentUser ? (
              <>
                {isAdmin ? (
                  <Link
                    to="/admin/dashboard"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '9px 16px',
                      borderRadius: '50px',
                      background: 'rgba(25, 60, 184, 0.1)',
                      color: '#193CB8',
                      fontWeight: '700',
                      fontSize: '0.88rem',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap'
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
                        padding: '9px 16px',
                        borderRadius: '50px',
                        background: 'rgba(25, 60, 184, 0.1)',
                        color: '#193CB8',
                        fontWeight: '700',
                        fontSize: '0.88rem',
                        textDecoration: 'none',
                        whiteSpace: 'nowrap'
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
                        padding: '9px 16px',
                        borderRadius: '50px',
                        background: '#FF6900',
                        color: '#FFFFFF',
                        fontWeight: '700',
                        fontSize: '0.88rem',
                        textDecoration: 'none',
                        whiteSpace: 'nowrap'
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
                    fontSize: '0.88rem',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap'
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
                    padding: '8px 14px',
                    borderRadius: '50px',
                    border: '1px solid #E2E8F0',
                    background: '#FFFFFF',
                    color: '#EF4444',
                    fontWeight: '600',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
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
                    justifyContent: 'center',
                    padding: '9px 22px',
                    borderRadius: '50px',
                    border: '1.5px solid #193CB8',
                    color: '#193CB8',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={closeMobileMenu}
                >
                  <FaSignInAlt style={{ marginRight: '6px' }} /> Log In
                </Link>
                <Link
                  to="/register"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '9px 24px',
                    borderRadius: '50px',
                    background: 'linear-gradient(135deg, #FF6900 0%, #FF5500 100%)',
                    color: '#FFFFFF',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 14px rgba(255, 105, 0, 0.3)',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={closeMobileMenu}
                >
                  <FaUserPlus style={{ marginRight: '6px' }} /> Sign Up
                </Link>
              </>
            )}

            {/* Mobile Hamburger Icon */}
            <div 
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ cursor: 'pointer', padding: '8px', display: 'none' }}
            >
              {mobileOpen ? <FaTimes size={24} color="#193CB8" /> : <FaBars size={24} color="#193CB8" />}
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div 
          style={{
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ fontWeight: '700', color: '#9CA3AF', fontSize: '0.75rem', textTransform: 'uppercase' }}>Navigation</div>
            
            <Link to="/" onClick={closeMobileMenu} style={{ fontWeight: '600', color: '#1F2937', textDecoration: 'none' }}>Home</Link>
            <Link to="/about" onClick={closeMobileMenu} style={{ fontWeight: '600', color: '#1F2937', textDecoration: 'none' }}>About Us</Link>
            <Link to="/services" onClick={closeMobileMenu} style={{ fontWeight: '600', color: '#1F2937', textDecoration: 'none' }}>Services</Link>
            <a href="#featured-case-study" onClick={(e) => handleAnchorClick(e, '#featured-case-study')} style={{ fontWeight: '600', color: '#1F2937', textDecoration: 'none' }}>Case Studies</a>
            <a href="#faqs" onClick={(e) => handleAnchorClick(e, '#faqs')} style={{ fontWeight: '600', color: '#1F2937', textDecoration: 'none' }}>FAQs</a>
            <Link to="/contact" onClick={closeMobileMenu} style={{ fontWeight: '600', color: '#1F2937', textDecoration: 'none' }}>Contact Us</Link>

            <div style={{ height: '1px', background: '#E5E7EB', margin: '6px 0' }}></div>

            <div style={{ fontWeight: '700', color: '#9CA3AF', fontSize: '0.75rem', textTransform: 'uppercase' }}>Account</div>
            {currentUser ? (
              <>
                {isAdmin ? (
                  <Link to="/admin/dashboard" onClick={closeMobileMenu} style={{ color: '#193CB8', fontWeight: '700', textDecoration: 'none' }}>Admin Dashboard</Link>
                ) : (
                  <>
                    <Link to="/customer/dashboard" onClick={closeMobileMenu} style={{ color: '#193CB8', fontWeight: '700', textDecoration: 'none' }}>My Dashboard</Link>
                    <Link to="/create-project" onClick={closeMobileMenu} style={{ color: '#FF6900', fontWeight: '700', textDecoration: 'none' }}>+ New Project</Link>
                  </>
                )}
                <Link to="/profile" onClick={closeMobileMenu} style={{ color: '#4B5563', textDecoration: 'none' }}>My Profile</Link>
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
                <Link to="/login" onClick={closeMobileMenu} style={{ color: '#193CB8', fontWeight: '700', textDecoration: 'none' }}>Customer Login</Link>
                <Link to="/register" onClick={closeMobileMenu} style={{ color: '#FF6900', fontWeight: '700', textDecoration: 'none' }}>Sign Up Now</Link>
                <Link to="/admin/login" onClick={closeMobileMenu} style={{ color: '#6B7280', fontSize: '0.85rem', textDecoration: 'none' }}>Admin Portal</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;