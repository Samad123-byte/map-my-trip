// src/components/Header.jsx
import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../App';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [logoutMessage, setLogoutMessage] = useState(''); // New state for logout message
  const { t, i18n } = useTranslation();
  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const navigate = useNavigate();
  
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  
  // Available languages with paths to flag images from public folder
  const languages = [
    { code: 'en', name: 'English', flag: '/flags/usa,png.webp' },
    { code: 'es', name: 'Español', flag: '/flags/spain.png' },
    { code: 'fr', name: 'Français', flag: '/flags/france.png' },
    { code: 'de', name: 'Deutsch', flag: '/flags/german.png' },
    { code: 'zh', name: '中文', flag: '/flags/china.png' },
    { code: 'ur', name: 'اردو', flag: '/flags/pak.png' }
  ];

  // Check if user is logged in on component mount and listen for storage changes
  useEffect(() => {
    const checkUserStatus = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error('Error parsing user data:', error);
          // Clear invalid data
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    // Check on mount
    checkUserStatus();

    // Listen for storage changes (for instant updates when login/logout happens)
    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'user') {
        checkUserStatus();
      }
    };

    // Listen for custom events (for same-tab updates)
    const handleAuthChange = () => {
      checkUserStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  // Hide logout message after 3 seconds
  useEffect(() => {
    if (logoutMessage) {
      const timer = setTimeout(() => {
        setLogoutMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [logoutMessage]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLangDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLangDropdown = () => {
    setIsLangDropdownOpen(!isLangDropdownOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsLangDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    // Clear all auth-related data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('adminToken'); // Just in case
    
    // Reset user state
    setUser(null);
    setIsUserDropdownOpen(false);
    setIsMenuOpen(false);
    
    // Show logout message
    setLogoutMessage(t('logoutSuccessful', 'You have been successfully logged out!'));
    
    // Dispatch custom event for instant updates
    window.dispatchEvent(new Event('authChange'));
    
    // Redirect to home page
    navigate('/');
  };

  // Find current language
  const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <header className={`header`}>
      <div className="container">
        {/* Logout Message */}
        {logoutMessage && (
          <div className="logout-message" style={{
            position: 'fixed',
            top: '80px',
            right: '20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1000,
            fontSize: '14px',
            fontWeight: '500',
            animation: 'slideInRight 0.3s ease-out'
          }}>
            <i className="fas fa-check-circle" style={{ marginRight: '8px' }}></i>
            {logoutMessage}
          </div>
        )}

        <div className="logo">
          <Link to="/">
            <div className="logo-container">
              <span className="logo-icon">
                <i className="fas fa-map-marked-alt"></i>
              </span>
              <div className="logo-text">
                <h1><span className="logo-map">Map</span><span className="logo-my">My</span><span className="logo-trip">Trip</span></h1>
                <span className="tagline">{t('tagline')}</span>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="mobile-menu-icon" onClick={toggleMenu}>
          <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        
        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>{t('home')}</Link></li>
            <li><Link to="/destinations" onClick={() => setIsMenuOpen(false)}>{t('destinations')}</Link></li>
            <li><Link to="/wishlist" onClick={() => setIsMenuOpen(false)}>{t('wishlist')}</Link></li>
            <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>{t('aboutUs')}</Link></li>
            <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>{t('contact')}</Link></li>
          </ul>
        </nav>
        
        <div className="nav-actions">
        
          <div className="my-bookings">
            <Link to="/my-bookings" onClick={() => setIsMenuOpen(false)}>
              <i className="fas fa-calendar-check booking-icon"></i>
              <span className="booking-text">{t('viewMyBookings')}</span>
            </Link>
          </div>
          
          {/* Show auth buttons or user menu based on login status */}
          {user ? (
            <div className={`user-menu ${isMenuOpen ? 'active' : ''}`} ref={userDropdownRef}>
              <button className="user-dropdown-btn" onClick={toggleUserDropdown}>
                <div className="user-btn-content">
                  <i className="fas fa-user-circle user-icon"></i>
                  <span className="user-name">{user.name}</span>
                </div>
                <i className={`fas fa-chevron-${isUserDropdownOpen ? 'up' : 'down'}`}></i>
              </button>
              
              <div className={`user-dropdown-content ${isUserDropdownOpen ? 'show' : ''}`}>
              
                <hr className="dropdown-divider" />
                <button 
                  className="dropdown-item logout-btn" 
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt"></i>
                  {t('logout')}
                </button>
              </div>
            </div>
          ) : (
            <div className={`auth-buttons ${isMenuOpen ? 'active' : ''}`}>
              <Link to="/login" className="btn-login" onClick={() => setIsMenuOpen(false)}>{t('login')}</Link>
              <Link to="/register" className="btn-register" onClick={() => setIsMenuOpen(false)}>{t('register')}</Link>
            </div>
          )}

          <div className="dark-mode-toggle">
            <button 
              onClick={toggleDarkMode} 
              className="theme-toggle-btn"
              aria-label={darkMode ? t('switchToLightMode') : t('switchToDarkMode')}
            >
              {darkMode ? (
                <i className="fas fa-sun"></i>
              ) : (
                <i className="fas fa-moon"></i>
              )}
            </button>
          </div>
          
          <div className={`language-dropdown ${isMenuOpen ? 'mobile-active' : ''}`} ref={dropdownRef}>
            <button className="lang-dropdown-btn" onClick={toggleLangDropdown}>
              <div className="lang-btn-content">
                <span className="flag-icon">
                  <img src={currentLang.flag} alt={`${currentLang.name} flag`} className="flag-img" />
                </span>
                <span className="current-lang">{currentLang.name}</span>
              </div>
              <i className={`fas fa-chevron-${isLangDropdownOpen ? 'up' : 'down'}`}></i>
            </button>
            
            <div className={`lang-dropdown-content ${isLangDropdownOpen ? 'show' : ''}`}>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`lang-option ${i18n.language === lang.code ? 'active' : ''}`}
                  onClick={() => changeLanguage(lang.code)}
                >
                  <span className="flag-icon">
                    <img src={lang.flag} alt={`${lang.name} flag`} className="flag-img" />
                  </span>
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;