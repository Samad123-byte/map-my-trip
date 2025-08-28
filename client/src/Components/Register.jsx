// Register.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Auth.css';
import { userService } from '../services/api';
import { useNotification } from './Notification'; // Import the notification hook

const Register = () => {
  const { t, i18n } = useTranslation();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { showNotification, NotificationContainer } = useNotification(); // Initialize notification
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  const [formStatus, setFormStatus] = useState({
    loading: false,
    error: null,
    success: false
  });
  
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: 'Too weak'
  });

  // Available languages (same as Header)
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLangDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleLangDropdown = () => {
    setIsLangDropdownOpen(!isLangDropdownOpen);
  };

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsLangDropdownOpen(false);
  };

  // Find current language
  const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Check password strength
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };
  
  const checkPasswordStrength = (password) => {
    // Simple password strength checker for demo purposes
    let score = 0;
    let message = '';
    
    if (password.length > 0) score += 1;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    switch (score) {
      case 0:
      case 1:
        message = 'Too weak';
        break;
      case 2:
        message = 'Could be stronger';
        break;
      case 3:
        message = 'Medium strength';
        break;
      case 4:
        message = 'Strong password';
        break;
      case 5:
        message = 'Very strong password';
        break;
      default:
        message = '';
    }
    
    setPasswordStrength({ score, message });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // ✅ Check if all required fields are filled
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setFormStatus({
        loading: false,
        error: "Please fill in all required fields",
        success: false,
      });
      return;
    }
  
    // ✅ Set loading state
    setFormStatus({
      loading: true,
      error: null,
      success: false,
    });
  
    try {
      // ✅ Send register request to backend
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`, // Combine first and last name
          email: formData.email,
          password: formData.password,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }
  
      setFormStatus({
        loading: false,
        error: null,
        success: true,
      });
  
      // Show professional notification instead of alert
      showNotification("Account created successfully! Redirecting to login...", "success", 3000);
  
      // ✅ Redirect to login page after successful registration
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } catch (error) {
      setFormStatus({
        loading: false,
        error: error.message || "Registration failed",
        success: false,
      });
    }
  };
  
  return (
    <div className="auth-container">
      {/* Add NotificationContainer to render notifications */}
      <NotificationContainer />
      
      <div className="auth-card register-card">
        <div className="auth-header">
          <h1>{t('register')}</h1>
          <p>{t('joinUs', 'Join us and start your travel journey')}</p>
          
          {/* Language dropdown added to Register page */}
          <div className="language-dropdown" ref={dropdownRef}>
            <button className="lang-dropdown-btn" onClick={toggleLangDropdown}>
              <span className="current-lang">{currentLang.name}</span>
              <i className={`fas fa-chevron-${isLangDropdownOpen ? 'up' : 'down'}`}></i>
            </button>
            
            <div className={`lang-dropdown-content ${isLangDropdownOpen ? 'show' : ''}`}>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`lang-option ${i18n.language === lang.code ? 'active' : ''}`}
                  onClick={() => changeLanguage(lang.code)}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {formStatus.success ? (
          <div className="auth-success">
            <div className="success-icon">✓</div>
            <h2>{t('registrationSuccessful', 'Registration Successful!')}</h2>
            <p>{t('welcomeAboard', 'Welcome aboard! Check your email to verify your account.')}</p>
            <Link to="/login" className="auth-button secondary">{t('goToLogin', 'Go to Login')}</Link>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            {formStatus.error && (
              <div className="auth-error">
                {formStatus.error}
              </div>
            )}
            
            <div className="form-row two-columns">
              <div className="form-group">
                <label htmlFor="firstName">{t('firstName', 'First Name')}</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder={t('firstNamePlaceholder', 'John')}
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">{t('lastName', 'Last Name')}</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder={t('lastNamePlaceholder', 'Doe')}
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">{t('email', 'Email')}</label>
              <div className="input-group">
                <span className="input-icon">✉️</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t('emailPlaceholder', 'your@email.com')}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="password">{t('password', 'Password')}</label>
              <div className="input-group">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder={t('passwordPlaceholder', 'Create a password')}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="password-strength">
                <div className="strength-meter">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div 
                      key={level} 
                      className={`strength-segment ${passwordStrength.score >= level ? 'active' : ''}`}
                    ></div>
                  ))}
                </div>
                <span className="strength-text">{t(`passwordStrength.${passwordStrength.score}`, passwordStrength.message)}</span>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">{t('confirmPassword', 'Confirm Password')}</label>
              <div className="input-group">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder={t('confirmPasswordPlaceholder', 'Confirm your password')}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              {formData.password && formData.confirmPassword && 
                formData.password !== formData.confirmPassword && (
                <div className="input-error">{t('passwordsDoNotMatch', 'Passwords do not match')}</div>
              )}
            </div>
            
            <div className="form-group checkbox-group terms">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
              />
              <label htmlFor="agreeTerms">
                {t('termsAgreement', 'I agree to the')} <a href="#">{t('termsOfService', 'Terms of Service')}</a> {t('and', 'and')} <a href="#">{t('privacyPolicy', 'Privacy Policy')}</a>
              </label>
            </div>
            
            <button 
              type="submit" 
              className={`auth-button ${formStatus.loading ? 'loading' : ''}`}
              disabled={formStatus.loading}
            >
              {formStatus.loading ? t('creatingAccount', 'Creating Account...') : t('createAccount', 'Create Account')}
            </button>
          </form>
        )}
        
        <div className="auth-footer">
          <p>{t('alreadyHaveAccount', 'Already have an account?')} <Link to="/login">{t('signIn', 'Sign in')}</Link></p>
        </div>
      </div>
      
      <div className="auth-background">
        <div className="auth-image register-image"></div>
        <div className="auth-quote">
          <p>"{t('quote', 'Travel isn\'t always pretty. It isn\'t always comfortable. But that\'s okay. The journey changes you.')}"</p>
          <span>— {t('quoteAuthor', 'Anthony Bourdain')}</span>
        </div>
      </div>
    </div>
  );
};

export default Register;