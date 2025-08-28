// ResetPassword.jsx
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { passwordResetService } from '../services/api';
import { useTranslation } from 'react-i18next';
import './Auth.css';

const ResetPassword = () => {
  const { t } = useTranslation();
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    loading: false,
    validating: true,
    validToken: false,
    error: null,
    success: false
  });
  
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: t('passwordStrength.0', 'Too weak')
  });

  // Verify token when component mounts
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const data = await passwordResetService.verifyToken(token);
        
        setFormStatus(prev => ({
          ...prev,
          validating: false,
          validToken: data.valid
        }));
        
        if (!data.valid) {
          setTimeout(() => {
            navigate('/login');
          }, 5000); // Redirect after 5 seconds
        }
        
      } catch (error) {
        setFormStatus(prev => ({
          ...prev,
          validating: false,
          validToken: false,
          error: t('passwordReset.errorVerifyingToken', "Error verifying reset token")
        }));
        
        setTimeout(() => {
          navigate('/login');
        }, 5000);
      }
    };
    
    verifyToken();
  }, [token, navigate, t]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'newPassword') {
      checkPasswordStrength(value);
    }
  };
  
  const checkPasswordStrength = (password) => {
    // Simple password strength checker
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
        message = t('passwordStrength.1', 'Too weak');
        break;
      case 2:
        message = t('passwordStrength.2', 'Could be stronger');
        break;
      case 3:
        message = t('passwordStrength.3', 'Medium strength');
        break;
      case 4:
        message = t('passwordStrength.4', 'Strong password');
        break;
      case 5:
        message = t('passwordStrength.5', 'Very strong password');
        break;
      default:
        message = '';
    }
    
    setPasswordStrength({ score, message });
  };

  // Update password strength message when language changes
  useEffect(() => {
    checkPasswordStrength(formData.newPassword);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setFormStatus(prev => ({
        ...prev,
        error: t('passwordsDoNotMatch', 'Passwords do not match'),
        success: false
      }));
      return;
    }
    
    // Check password strength
    if (passwordStrength.score < 3) {
      setFormStatus(prev => ({
        ...prev,
        error: t('passwordReset.passwordTooWeak', 'Password is too weak. Please choose a stronger password.'),
        success: false
      }));
      return;
    }
    
    setFormStatus(prev => ({
      ...prev,
      loading: true,
      error: null,
      success: false
    }));
    
    try {
      // Use only ONE method to reset the password
      const result = await passwordResetService.resetPassword(token, formData.newPassword);
      
      setFormStatus({
        loading: false,
        validating: false,
        validToken: true,
        error: null,
        success: true
      });
      
    } catch (error) {
      // Get the specific error message if possible
      const errorMessage = error.response?.data?.error || 
                          error.message || 
                          t('passwordReset.errorDuringReset', "An error occurred during password reset");
      
      setFormStatus(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
        success: false
      }));
    }
  };

  // Show loading while validating token
  if (formStatus.validating) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>{t('resetPassword', 'Reset Password')}</h1>
            <p>{t('passwordReset.validatingToken', 'Validating your reset token...')}</p>
          </div>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  // Show invalid token message
  if (!formStatus.validToken && !formStatus.success) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>{t('resetPassword', 'Reset Password')}</h1>
          </div>
          <div className="auth-error">
            <h2>{t('passwordReset.invalidToken', 'Invalid or Expired Token')}</h2>
            <p>{t('passwordReset.tokenExpiredMessage', 'Your password reset link is invalid or has expired.')}</p>
            <p>{t('passwordReset.redirectingToLogin', 'Redirecting to login page...')}</p>
          </div>
          <div className="auth-footer">
            <Link to="/login" className="auth-button secondary">
              {t('passwordReset.goToLoginNow', 'Go to Login Now')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>{t('resetPassword', 'Reset Password')}</h1>
          <p>{t('passwordReset.createNewPassword', 'Create a new password for your account')}</p>
        </div>
        
        {formStatus.success ? (
          <div className="auth-success">
            <div className="success-icon">✓</div>
            <h2>{t('passwordReset.passwordResetSuccess', 'Password Reset Successful!')}</h2>
            <p>{t('passwordReset.passwordResetSuccessMessage', 'Your password has been reset successfully.')}</p>
            <Link to="/login" className="auth-button secondary">
              {t('goToLogin', 'Go to Login')}
            </Link>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            {formStatus.error && (
              <div className="auth-error">
                {formStatus.error}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="newPassword">{t('passwordReset.newPassword', 'New Password')}</label>
              <div className="input-group">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder={t('passwordReset.newPasswordPlaceholder', 'Enter your new password')}
                  value={formData.newPassword}
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
                <span className="strength-text">{passwordStrength.message}</span>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">{t('passwordReset.confirmPassword', 'Confirm Password')}</label>
              <div className="input-group">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder={t('passwordReset.confirmPasswordPlaceholder', 'Confirm your new password')}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              {formData.newPassword && formData.confirmPassword && 
                formData.newPassword !== formData.confirmPassword && (
                <div className="input-error">{t('passwordsDoNotMatch', 'Passwords do not match')}</div>
              )}
            </div>
            
            <button 
              type="submit" 
              className={`auth-button ${formStatus.loading ? 'loading' : ''}`}
              disabled={formStatus.loading}
            >
              {formStatus.loading ? 
                t('passwordReset.resettingPassword', 'Resetting Password...') : 
                t('resetPassword', 'Reset Password')}
            </button>
          </form>
        )}
        
        <div className="auth-footer">
          <p>
            <Link to="/login">{t('backToLogin', 'Back to Login')}</Link>
          </p>
        </div>
      </div>
      
      <div className="auth-background">
        <div className="auth-image"></div>
        <div className="auth-quote">
          <p>{t('resetQuote', '"Every journey begins with the courage to start again."')}</p>
          <span>— {t('resetQuoteAuthor', 'Anonymous')}</span>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;