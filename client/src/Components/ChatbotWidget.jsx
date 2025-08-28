import React, { useState, useEffect, useContext } from 'react';
import ChatbotUI from './ChatbotUI';
import './ChatbotWidget.css';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../App';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  
  // Import ThemeContext
  const { darkMode } = useContext(ThemeContext);
  
  // Ensure consistent translation namespace
  const { t, i18n } = useTranslation();

  // Check if this is the user's first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    if (!hasVisited) {
      localStorage.setItem('hasVisitedBefore', 'true');
      // Optional: Show a welcome message after 3 seconds
      setTimeout(() => {
        setHasNewMessage(true);
      }, 3000);
    } else {
      setIsFirstVisit(false);
    }
  }, []);

  // Force re-render when language changes
  const [renderKey, setRenderKey] = useState(0);
  
  useEffect(() => {
    // Update render key when language changes to force a complete re-render
    setRenderKey(prev => prev + 1);
    console.log(`Widget language changed to: ${i18n.language}`);
    
    // Synchronize the language with localStorage for the chatbot
    localStorage.setItem('i18nextLng', i18n.language);
  }, [i18n.language]);

  // Function to play click sound
  const playClickSound = () => {
    try {
      const audio = new Audio('/sounds/mixkit-user-interface-zoom-in-2618.wav');
      audio.volume = 0.3; // Set volume to 30% to avoid being too loud
      audio.play().catch(error => {
        // Silently handle any audio play errors (e.g., autoplay restrictions)
        console.log('Audio play failed:', error);
      });
    } catch (error) {
      // Silently handle any audio creation errors
      console.log('Audio creation failed:', error);
    }
  };

  const toggleChat = () => {
    // Play sound before toggling
    playClickSound();
    
    // Keep all existing functionality
    setIsOpen(!isOpen);
    if (hasNewMessage) {
      setHasNewMessage(false);
    }
  };

  const handleNewMessage = () => {
    setHasNewMessage(true);
  };

  return (
    <div className={`chatbot-widget ${darkMode ? 'dark-mode' : ''}`} key={renderKey}>
      {isOpen && (
        <div className="chatbot-popup">
          <ChatbotUI onNewMessage={handleNewMessage} currentLanguage={i18n.language} />
        </div>
      )}
      <button 
        className={`chatbot-toggle-button ${hasNewMessage ? 'has-notification' : ''}`}
        onClick={toggleChat}
        aria-label={isOpen ? t('chatbot.closeChat') : t('chatbot.openChat')}
      >
        {isOpen ? '✕' : '💬'}
        {hasNewMessage && !isOpen && <span className="notification-badge">1</span>}
      </button>
    </div>
  );
};

export default ChatbotWidget;