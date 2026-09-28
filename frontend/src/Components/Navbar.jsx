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
  FaTimes,
  FaArrowRight
} from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, isAdmin, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setMobileOpen(false);
      navigate('/login');
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const linkStyle = (path) => ({
    whiteSpace: 'nowrap',
    fontSize: '0.9rem',
    fontWeight: location.pathname === path ? '700' : '600',
    color: location.pathname === path ? '#FF6900' : '#1E293B',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    padding: '8px 14px',
    borderRadius: '50px',
    background: location.pathname === path ? 'rgba(255, 105, 0, 0.08)' : 'transparent'
  });

  return (
    <header style={{
      position: 'sticky',
      top: '12px',
      zIndex: 1000,
      width: '100%',
      padding: '0 16px',
      boxSizing: 'border-box'
    }}>
      <nav 
        style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderRadius: '50px',
          border: '1px solid rgba(255, 255, 255, 0.7)',
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)',
          padding: '8px 18px',
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '54px' }}>
          
          {/* Brand Logo (Left) */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link 
              to="/" 
              style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
              onClick={closeMobileMenu}
            >
              <img 
                src="/page_traffics_logo_web_master.png" 
                alt="PageTraffics Logo" 
                style={{ height: '42px', width: 'auto', borderRadius: '6px', objectFit: 'contain' }} 
              />
            </Link>
          </div>

          {/* Center Nav Links (Desktop) */}
          <div 
            className="navbar-center-links"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px'
            }}
          >
            <Link to="/" style={linkStyle('/')} onClick={closeMobileMenu}>
              Home
            </Link>
            <Link to="/about" style={linkStyle('/about')} onClick={closeMobileMenu}>
              About Us
            </Link>
            <Link to="/services" style={linkStyle('/services')} onClick={closeMobileMenu}>
              Services
            </Link>
            <Link to="/case-studies" style={linkStyle('/case-studies')} onClick={closeMobileMenu}>
              Case Studies
            </Link>
            <Link to="/faqs" style={linkStyle('/faqs')} onClick={closeMobileMenu}>
              FAQs
            </Link>
            <Link to="/contact" style={linkStyle('/contact')} onClick={closeMobileMenu}>
              Contact Us
            </Link>
          </div>

          {/* Right Action Buttons (Pill CTA with Arrow Badge like Reference) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {currentUser ? (
              <>
                {isAdmin ? (
                  <Link
                    to="/admin/dashboard"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 18px',
                      borderRadius: '50px',
                      background: 'rgba(25, 60, 184, 0.1)',
                      color: '#193CB8',
                      fontWeight: '700',
                      fontSize: '0.85rem',
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
                        padding: '8px 16px',
                        borderRadius: '50px',
                        background: 'rgba(25, 60, 184, 0.1)',
                        color: '#193CB8',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        textDecoration: 'none',
                        whiteSpace: 'nowrap'
                      }}
                      onClick={closeMobileMenu}
                    >
                      <FaThLarge /> Dashboard
                    </Link>
                  </>
                )}
                <Link
                  to="/profile"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '50px',
                    background: '#f1f5f9',
                    color: '#475569',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap'
                  }}
                  onClick={closeMobileMenu}
                >
                  <FaUserCircle size={16} /> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '50px',
                    border: '1px solid #fee2e2',
                    background: '#fff5f5',
                    color: '#ef4444',
                    fontWeight: '600',
                    fontSize: '0.85rem',
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
                    padding: '8px 18px',
                    borderRadius: '50px',
                    border: '1px solid rgba(25, 60, 184, 0.3)',
                    color: '#193CB8',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    background: '#ffffff'
                  }}
                  onClick={closeMobileMenu}
                >
                  Log In
                </Link>

                {/* Reference Pill Button with Right Circle Arrow Badge */}
                <Link
                  to="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 6px 6px 18px',
                    borderRadius: '50px',
                    background: 'linear-gradient(135deg, #FF6900 0%, #FF5500 100%)',
                    color: '#FFFFFF',
                    fontWeight: '700',
                    fontSize: '0.88rem',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 16px rgba(255, 105, 0, 0.35)',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={closeMobileMenu}
                >
                  <span>Book a Call</span>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    color: '#FF6900',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '10px',
                    fontSize: '0.75rem'
                  }}>
                    <FaArrowRight />
                  </div>
                </Link>
              </>
            )}

            {/* Mobile Hamburger Toggle Button */}
            <div 
              className="navbar-mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ cursor: 'pointer', padding: '6px', color: '#193CB8' }}
            >
              {mobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </div>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div 
          style={{
            maxWidth: '1280px',
            margin: '8px auto 0 auto',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '24px',
            boxShadow: '0 12px 35px rgba(0,0,0,0.15)',
            border: '1px solid rgba(255,255,255,0.8)',
            padding: '20px',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontWeight: '800', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Navigation
            </div>
            
            <Link to="/" onClick={closeMobileMenu} style={{ fontWeight: '600', color: '#1E293B', textDecoration: 'none', padding: '6px 0' }}>Home</Link>
            <Link to="/about" onClick={closeMobileMenu} style={{ fontWeight: '600', color: '#1E293B', textDecoration: 'none', padding: '6px 0' }}>About Us</Link>
            <Link to="/services" onClick={closeMobileMenu} style={{ fontWeight: '600', color: '#1E293B', textDecoration: 'none', padding: '6px 0' }}>Services</Link>
            <Link to="/case-studies" onClick={closeMobileMenu} style={{ fontWeight: '600', color: '#1E293B', textDecoration: 'none', padding: '6px 0' }}>Case Studies</Link>
            <Link to="/faqs" onClick={closeMobileMenu} style={{ fontWeight: '600', color: '#1E293B', textDecoration: 'none', padding: '6px 0' }}>FAQs</Link>
            <Link to="/contact" onClick={closeMobileMenu} style={{ fontWeight: '600', color: '#1E293B', textDecoration: 'none', padding: '6px 0' }}>Contact Us</Link>

            <div style={{ height: '1px', background: '#e2e8f0', margin: '6px 0' }}></div>

            <div style={{ fontWeight: '800', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Account & Portal
            </div>

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
                <Link to="/profile" onClick={closeMobileMenu} style={{ color: '#475569', textDecoration: 'none' }}>My Profile</Link>
                <button 
                  onClick={handleLogout} 
                  style={{ 
                    textAlign: 'left', 
                    background: 'none', 
                    border: 'none', 
                    color: '#EF4444', 
                    fontWeight: '700', 
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    padding: 0 
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
                <Link 
                  to="/contact" 
                  onClick={closeMobileMenu} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    padding: '12px 20px', 
                    background: '#FF6900', 
                    color: '#ffffff', 
                    borderRadius: '50px', 
                    fontWeight: '700', 
                    textDecoration: 'none' 
                  }}
                >
                  <span>Book a Strategy Call</span>
                  <FaArrowRight />
                </Link>
                <Link 
                  to="/login" 
                  onClick={closeMobileMenu} 
                  style={{ 
                    textAlign: 'center', 
                    padding: '10px', 
                    border: '1px solid rgba(25, 60, 184, 0.3)', 
                    borderRadius: '50px', 
                    color: '#193CB8', 
                    fontWeight: '700', 
                    textDecoration: 'none' 
                  }}
                >
                  Customer Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;