import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { contactService } from '../services/api'; // Import your API service
import './Contact.css';

const Contact = () => {
  const { t, i18n } = useTranslation();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState({ success: false, message: '' });

  useEffect(() => {
    console.log('Current language:', i18n.language);
    console.log('Available resources:', i18n.store.data);
  }, [i18n]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await contactService.submitForm(formData);
      setSubmitResult({
        success: true,
        message: t('contactPage.formSubmitted')
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitResult({
        success: false,
        message: t('contactPage.formError')
      });
    } finally {
      setIsSubmitting(false);
      
      // Clear the success/error message after 5 seconds
      setTimeout(() => {
        setSubmitResult({ success: false, message: '' });
      }, 5000);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>{t('contactPage.title')}</h1>
        <p>{t('contactPage.description')}</p>
      </div>
      
      <div className="contact-content">
        <div className="contact-info">
          <h2>{t('contactPage.getInTouch')}</h2>
          <div className="contact-details">
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <p>{t('contactPage.address')}</p>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <p>{t('contactPage.phone')}</p>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <p>{t('contactPage.email')}</p>
            </div>
            <div className="contact-item">
              <i className="fas fa-clock"></i>
              <p>{t('contactPage.hours')}</p>
            </div>
          </div>
        </div>
        
        <div className="contact-form">
          <h2>{t('contactPage.sendMessage')}</h2>
          
          {submitResult.message && (
            <div className={`form-alert ${submitResult.success ? 'success' : 'error'}`}>
              {submitResult.message}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="text" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                placeholder={t('contactPage.yourName')}
                required 
              />
            </div>
            <div className="form-group">
              <input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                placeholder={t('contactPage.yourEmail')}
                required 
              />
            </div>
            <div className="form-group">
              <input 
                type="text" 
                name="subject" 
                value={formData.subject}
                onChange={handleChange}
                placeholder={t('contactPage.subject')}
                required 
              />
            </div>
            <div className="form-group">
              <textarea 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                placeholder={t('contactPage.yourMessage')}
                rows="6"
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="send-message-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('contactPage.sending') : t('contactPage.sendBtn')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;