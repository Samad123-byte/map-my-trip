import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './FAQ.css';

const FAQ = () => {
  const { t } = useTranslation();
  const [activeQuestion, setActiveQuestion] = useState(null);

  const faqData = [
    {
      category: t('faq.categories.booking.title'),
      questions: [
        {
          question: t('faq.categories.booking.questions.howToBook.question'),
          answer: t('faq.categories.booking.questions.howToBook.answer')
        },
        {
          question: t('faq.categories.booking.questions.cancelModify.question'),
          answer: t('faq.categories.booking.questions.cancelModify.answer')
        }
      ]
    },
    {
      category: t('faq.categories.payments.title'),
      questions: [
        {
          question: t('faq.categories.payments.questions.paymentMethods.question'),
          answer: t('faq.categories.payments.questions.paymentMethods.answer')
        },
        {
          question: t('faq.categories.payments.questions.easyPaisa.question'),
          answer: t('faq.categories.payments.questions.easyPaisa.answer')
        }
      ]
    },
    {
      category: t('faq.categories.travel.title'),
      questions: [
        {
          question: t('faq.categories.travel.questions.specialty.question'),
          answer: t('faq.categories.travel.questions.specialty.answer')
        },
        {
          question: t('faq.categories.travel.questions.packing.question'),
          answer: t('faq.categories.travel.questions.packing.answer')
        }
      ]
    },
    {
      category: t('faq.categories.support.title'),
      questions: [
        {
          question: t('faq.categories.support.questions.contact.question'),
          answer: t('faq.categories.support.questions.contact.answer')
        }
      ]
    }
  ];

  const toggleQuestion = (category, questionIndex) => {
    setActiveQuestion(
      activeQuestion?.category === category && activeQuestion?.questionIndex === questionIndex 
        ? null 
        : { category, questionIndex }
    );
  };

  return (
    <div className="faq-container">
      <div className="faq-header">
        <h1>{t('faq.title')}</h1>
        <p>{t('faq.subtitle')}</p>
      </div>

      {faqData.map((category, categoryIndex) => (
        <div key={category.category} className="faq-category">
          <h2 className="faq-category-title">{category.category}</h2>
          {category.questions.map((faq, questionIndex) => (
            <div 
              key={questionIndex} 
              className={`faq-item ${
                activeQuestion?.category === category.category && 
                activeQuestion?.questionIndex === questionIndex ? 'active' : ''
              }`}
            >
              <div 
                className="faq-question" 
                onClick={() => toggleQuestion(category.category, questionIndex)}
              >
                <h3>{faq.question}</h3>
                <span className="toggle-icon">
                  {activeQuestion?.category === category.category && 
                   activeQuestion?.questionIndex === questionIndex ? '−' : '+'}
                </span>
              </div>
              {activeQuestion?.category === category.category && 
               activeQuestion?.questionIndex === questionIndex && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FAQ;