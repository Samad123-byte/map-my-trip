// Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Auth.css';

const Login = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [formStatus, setFormStatus] = useState({
    loading: false,
    error: null,
    success: false
  });

  // This function checks if the user has admin access
  const verifyAdminAccess = async (token) => {
    try {
      console.log("Verifying admin access with token:", token ? `${token.substring(0, 10)}...` : "no token");
      const response = await fetch("http://localhost:3000/api/admin/dashboard", {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`  // Make sure "Bearer " prefix is included
        }
      });
      
      console.log("Admin verification response status:", response.status);
      // If we get a 200 response, user has admin access
      return response.status === 200;
    } catch (error) {
      console.error("Admin verification error:", error);
      return false;
    }
  };

  useEffect(() => {
    if (formStatus.success) {
      const handleSuccessfulLogin = async () => {
        try {
          const token = localStorage.getItem('token');
          
          // Check if user has admin access
          const hasAdminAccess = await verifyAdminAccess(token);
          
          // Update user data in localStorage
          const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
          storedUser.isAdmin = hasAdminAccess;
          localStorage.setItem('user', JSON.stringify(storedUser));
          
          // Store admin token separately ONLY if user is admin
          if (hasAdminAccess) {
            localStorage.setItem('adminToken', token);
          } else {
            // Make sure to remove adminToken if user is not admin
            localStorage.removeItem('adminToken');
          }
          
          // Dispatch custom event for instant header updates
          window.dispatchEvent(new Event('authChange'));
          
          // Determine redirect path
          let redirectPath;
          if (location.state?.redirectTo) {
            redirectPath = location.state.redirectTo;
          } else if (hasAdminAccess) {
            redirectPath = '/admin';
          } else {
            redirectPath = '/';
          }
          
          navigate(redirectPath);
        } catch (err) {
          console.error("Error during redirect:", err);
          navigate('/');
        }
      };
      // Start the process after a short delay
      const timer = setTimeout(() => {
        handleSuccessfulLogin();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [formStatus.success, navigate, location.state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.email || !formData.password) {
      setFormStatus({
        loading: false,
        error: t('fillAllFields', 'Please fill in all required fields'),
        success: false,
      });
      return;
    }
  
    setFormStatus({
      loading: true,
      error: null,
      success: false,
    });
  
    try {
      console.log("Attempting login for:", formData.email);
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      
      console.log("Server response status:", response.status);
      
      // For non-OK responses, parse the error and throw
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || t('loginFailed', 'Login failed'));
      }
      
      // Parse the response
      const data = await response.json();
      console.log("Login successful, received data:", data);
      
      // Store auth data
      localStorage.setItem("token", data.token);
      console.log("Token stored in localStorage:", data.token ? `${data.token.substring(0, 10)}...` : "no token");
      
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userId", data.user._id || data.user.id);
        console.log("User data stored:", data.user);
      }
  
      setFormStatus({
        loading: false,
        error: null,
        success: true,
      });
      
    } catch (error) {
      console.error("Login error:", error);
      
      let errorMessage = t('loginFailedCheckCredentials', 'Login failed. Please check your credentials.');
      if (error.message) {
        errorMessage = error.message;
      }
  
      setFormStatus({
        loading: false,
        error: errorMessage,
        success: false,
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>{t('welcomeBack', 'Welcome Back')}</h1>
          <p>{t('signInToContinue', 'Sign in to continue your adventure')}</p>
        </div>
        
        {formStatus.success ? (
          <div className="auth-success">
            <div className="success-icon">✓</div>
            <h2>{t('loginSuccessful', 'Login Successful!')}</h2>
            <p>{t('redirectingToAccount', 'Redirecting you to your account...')}</p>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            {formStatus.error && (
              <div className="auth-error">
                {formStatus.error}
              </div>
            )}
            
         <div className="form-group">
  <div className="input-group">
    <span className="input-icon">✉️</span>
    <input
      type="email"
      id="email"
      name="email"
      placeholder={t('email', 'Email')}
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
                  placeholder={t('passwordLoginPlaceholder', 'Your password')}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="rememberMe">{t('rememberMe', 'Remember me')}</label>
              </div>
              <div className="forgot-password">
              <Link to="/forgot-password">{t('forgotPassword', 'Forgot password?')}</Link>
              </div>
            </div>
            
            <button 
              type="submit" 
              className={`auth-button ${formStatus.loading ? 'loading' : ''}`}
              disabled={formStatus.loading}
            >
              {formStatus.loading ? t('signingIn', 'Signing in...') : t('signIn', 'Sign In')}
            </button>
          </form>
        )}
        
        <div className="auth-footer">
          <p>{t('dontHaveAccount', 'Don\'t have an account?')} <Link to="/register">{t('register', 'Sign up')}</Link></p>
        </div>
        
        <div className="social-login">
          <div className="divider">
            <span></span>
          </div>
          <div className="social-buttons">
            <button className="social-button google">
              <span className="social-icon"></span>
              <span></span>
            </button>
            <button className="social-button facebook">
              <span className="social-icon"></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="auth-background">
        <div className="auth-image"></div>
        <div className="auth-quote">
          <p>{t('loginQuote', '"The journey of a thousand miles begins with a single step."')}</p>
          <span>{t('loginQuoteAuthor', '— Lao Tzu')}</span>
        </div>
      </div>
    </div>
  );
};

export default Login;