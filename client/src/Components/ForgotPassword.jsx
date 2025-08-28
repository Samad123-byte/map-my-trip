// ForgotPassword.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { passwordResetService } from '../services/api';
import { useTranslation } from 'react-i18next';
import './Auth.css';

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState({
    loading: false,
    error: null,
    success: false,
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setFormStatus({
        loading: false,
        error: t('passwordReset.enterEmail', 'Please enter your email address'),
        success: false,
        message: ''
      });
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormStatus({
        loading: false,
        error: t('passwordReset.invalidEmail', 'Please enter a valid email address'),
        success: false,
        message: ''
      });
      return;
    }
    
    setFormStatus({
      loading: true,
      error: null,
      success: false,
      message: ''
    });
    
    try {
      const data = await passwordResetService.requestReset(email);
      
      setFormStatus({
        loading: false,
        error: null,
        success: true,
        message: data.message || t('passwordReset.resetInstructionsSent', 'If your email exists in our system, you will receive a password reset link within a few minutes.')
      });
      
      // Clear the email field after successful submission
      setEmail('');
      
    } catch (error) {
      console.error('Password reset request error:', error);
      
      let errorMessage = t('passwordReset.errorOccurred', 'An error occurred while processing your request');
      
      // Handle different error scenarios
      if (error.response) {
        // Server responded with error status
        errorMessage = error.response.data?.error || error.response.data?.message || errorMessage;
      } else if (error.request) {
        // Network error
        errorMessage = t('passwordReset.networkError', 'Network error. Please check your connection and try again.');
      }
      
      setFormStatus({
        loading: false,
        error: errorMessage,
        success: false,
        message: ''
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🏔️</div>
          <h1>{t('forgotPassword', 'Forgot Password')}</h1>
          <p>{t('passwordReset.enterEmailInstructions', 'Enter your email to receive password reset instructions for your MapMyTrip account')}</p>
        </div>
        
        {formStatus.success ? (
          <div className="auth-success">
            <div className="success-icon">✉️</div>
            <h2>{t('passwordReset.checkEmail', 'Check Your Email')}</h2>
            <p style={{ marginBottom: '20px' }}>{formStatus.message}</p>
            
            <div style={{ 
              background: '#f8f9fa', 
              padding: '20px', 
              borderRadius: '8px', 
              marginBottom: '20px',
              borderLeft: '4px solid #667eea'
            }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#667eea', fontSize: '16px' }}>
                📧 {t('passwordReset.whatToDoNext', 'What to do next:')}
              </h3>
              <ul style={{ 
                margin: '0', 
                paddingLeft: '20px', 
                color: '#666',
                fontSize: '14px',
                lineHeight: '1.6'
              }}>
                <li>{t('passwordReset.checkInbox', 'Check your email inbox for a message from MapMyTrip')}</li>
                <li>{t('passwordReset.checkSpam', 'If you don\'t see it, check your spam/junk folder')}</li>
                <li>{t('passwordReset.clickLink', 'Click the reset link in the email to create a new password')}</li>
                <li>{t('passwordReset.linkExpires', 'The reset link expires in 1 hour for security')}</li>
              </ul>
            </div>
            
            <div style={{ 
              display: 'flex', 
              gap: '10px', 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link to="/login" className="auth-button secondary">
                {t('backToLogin', 'Back to Login')}
              </Link>
              <button 
                onClick={() => {
                  setFormStatus({
                    loading: false,
                    error: null,
                    success: false,
                    message: ''
                  });
                  setEmail('');
                }}
                className="auth-button secondary"
                style={{ background: 'transparent', border: '2px solid #667eea', color: '#667eea' }}
              >
                {t('passwordReset.sendAnother', 'Send Another Email')}
              </button>
            </div>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            {formStatus.error && (
              <div className="auth-error">
                <strong>⚠️ {t('error', 'Error')}</strong><br />
                {formStatus.error}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email">{t('email', 'Email Address')}</label>
              <div className="input-group">
                <span className="input-icon">✉️</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t('emailPlaceholder', 'your@email.com')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  disabled={formStatus.loading}
                />
              </div>
              <div style={{ 
                fontSize: '12px', 
                color: '#666', 
                marginTop: '5px',
                lineHeight: '1.4'
              }}>
                {t('passwordReset.emailHelp', 'Enter the email address associated with your MapMyTrip account')}
              </div>
            </div>
            
            <button 
              type="submit" 
              className={`auth-button ${formStatus.loading ? 'loading' : ''}`}
              disabled={formStatus.loading}
            >
              {formStatus.loading ? (
                <>
                  <span className="loading-spinner" style={{ marginRight: '8px' }}></span>
                  {t('passwordReset.sending', 'Sending Reset Email...')}
                </>
              ) : (
                <>
                  📧 {t('passwordReset.sendResetLink', 'Send Reset Link')}
                </>
              )}
            </button>
            
            <div style={{ 
              textAlign: 'center', 
              fontSize: '13px', 
              color: '#666', 
              marginTop: '15px',
              lineHeight: '1.4'
            }}>
              {t('passwordReset.securityNote', 'For security reasons, we\'ll send the reset link even if the email doesn\'t exist in our system.')}
            </div>
          </form>
        )}
        
        <div className="auth-footer">
          <p>
            <Link to="/login">
              ← {t('backToLogin', 'Back to Login')}
            </Link>
          </p>
          <p style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>
            {t('passwordReset.needHelp', 'Need help?')} {' '}
            <Link to="/contact" style={{ color: '#667eea' }}>
              {t('passwordReset.contactSupport', 'Contact Support')}
            </Link>
          </p>
        </div>
      </div>
      
      <div className="auth-background">
        <div className="auth-image"></div>
        <div className="auth-quote">
          <p>{t('resetQuote', '"Every mountain peak is within reach if you just keep climbing."')}</p>
          <span>{t('resetQuoteAuthor', '— MapMyTrip Team')}</span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;