// Components/Footer.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-logo">
          <h2>Map My Trip</h2>
          <div className="social-icons">
            <a href="https://twitter.com" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://facebook.com" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-content">
        <div className="footer-column">
          <h3>{t('navigationLinks')}</h3>
          <ul>
            <li><a onClick={() => navigate("/")}>{t('home')}</a></li>
            <li><a onClick={() => navigate("/about")}>{t('aboutUs')}</a></li>
            <li><a onClick={() => navigate("/destinations")}>{t('destinations')}</a></li>
            <li><a onClick={() => navigate("/contact")}>{t('contactUs')}</a></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h3>{t('resources')}</h3>
          <ul>
            <li><a onClick={() => navigate("/blog")}>{t('blog.title')}</a></li>
            <li><a onClick={() => navigate("/faq")}>{t('faq.title')}</a></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h3>{t('customerSupport')}</h3>
          <ul>
            <li><a className="support-phone">+88 01526-283903</a></li>
            <li><a onClick={() => navigate("/contact")}>{t('contactUs')}</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>Copyright © {new Date().getFullYear()} Map My Trip. All rights reserved.</p>
        <p>Developed BY | MAXRF</p>
      </div>
    </footer>
  );
};

export default Footer;