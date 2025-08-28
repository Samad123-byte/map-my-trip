import React, { useContext, useEffect, useState } from 'react';
import './About.css';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../App'; // Ensure this path is correct for your project

const About = () => {
  const { t } = useTranslation();
  const { darkMode } = useContext(ThemeContext);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Team members data
  const teamMembers = [
    {
      name: "Imran Ahmed",
      role: t('founder'),
      bio: t('founderBio'),
      image: "/pem.jpg"
    },
    {
      name: "Sara Khan",
      role: t('operations'),
      bio: t('operationsBio'),
      image: "/preso.jpg"
    },
    {
      name: "Ali Raza",
      role: t('tourGuide'),
      bio: t('tourGuideBio'),
      image: "/person1.jpg"
    },
    {
      name: "Zainab Malik",
      role: t('customerRelations'),
      bio: t('customerRelationsBio'),
      image: "/p4j.jpg"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Asad Mahmood",
      location: t('karachi'),
      quote: t('testimonial1'),
      rating: 5
    },
    {
      name: "Fatima Shah",
      location: t('lahore'),
      quote: t('testimonial2'),
      rating: 5
    },
    {
      name: "Omar Siddiqui",
      location: t('islamabad'),
      quote: t('testimonial3'),
      rating: 4
    }
  ];

  // Function to handle smooth scrolling
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to handle back to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Setup the intersection observer for animations
  useEffect(() => {
    // Back to top button visibility
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Setup intersection observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add visible class to animate
            if (entry.target.classList.contains('about-section') || 
                entry.target.classList.contains('values-section') || 
                entry.target.classList.contains('team-section') || 
                entry.target.classList.contains('testimonials-section')) {
              entry.target.querySelector('h2').classList.add('section-visible');
            }

            // Animate cards and team members
            if (entry.target.classList.contains('values-grid')) {
              const cards = entry.target.querySelectorAll('.value-card');
              cards.forEach((card, index) => {
                card.style.setProperty('--card-index', index);
                setTimeout(() => {
                  card.classList.add('card-visible');
                }, 100);
              });
            }

            if (entry.target.classList.contains('team-grid')) {
              const members = entry.target.querySelectorAll('.team-member');
              members.forEach((member, index) => {
                member.style.setProperty('--card-index', index);
                setTimeout(() => {
                  member.classList.add('member-visible');
                }, 100);
              });
            }

            if (entry.target.classList.contains('testimonials-grid')) {
              const testimonials = entry.target.querySelectorAll('.testimonial-card');
              testimonials.forEach((testimonial, index) => {
                testimonial.style.setProperty('--card-index', index);
                setTimeout(() => {
                  testimonial.classList.add('testimonial-visible');
                }, 100);
              });
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all sections
    document.querySelectorAll('.about-section, .values-section, .team-section, .testimonials-section').forEach(section => {
      observer.observe(section);
    });

    // Observe all card containers
    document.querySelectorAll('.values-grid, .team-grid, .testimonials-grid').forEach(grid => {
      observer.observe(grid);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`about-container ${darkMode ? 'dark' : ''}`}>
      <div className="about-hero">
        <h1>{t('aboutUs')}</h1>
        <p>{t('aboutTagline')}</p>
      </div>
      
      {/* Navigation section */}
      <div className="section-nav">
        <a href="#story" onClick={(e) => {e.preventDefault(); scrollToSection('story')}}>{t('ourStory')}</a>
        <a href="#values" onClick={(e) => {e.preventDefault(); scrollToSection('values')}}>{t('ourValues')}</a>
        <a href="#team" onClick={(e) => {e.preventDefault(); scrollToSection('team')}}>{t('meetOurTeam')}</a>
        <a href="#testimonials" onClick={(e) => {e.preventDefault(); scrollToSection('testimonials')}}>{t('testimonials')}</a>
      </div>
      
      <div id="story" className="about-section">
        <h2>{t('ourStory')}</h2>
        <div className="about-content">
          <div className="about-image">
            <img src="/story.jpg" alt={t('northernPakistanMountains')} />
          </div>
          <div className="about-text">
            <p>{t('storyParagraph1')}</p>
            <p>{t('storyParagraph2')}</p>
            <p>{t('storyParagraph3')}</p>
          </div>
        </div>
      </div>
      
      <div id="values" className="values-section">
        <h2>{t('ourValues')}</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">🌿</div>
            <h3>{t('environmentalResponsibility')}</h3>
            <p>{t('environmentalResponsibilityDesc')}</p>
          </div>
          
          <div className="value-card">
            <div className="value-icon">🏠</div>
            <h3>{t('communitySupport')}</h3>
            <p>{t('communitySupportDesc')}</p>
          </div>
          
          <div className="value-card">
            <div className="value-icon">🛡️</div>
            <h3>{t('safetyFirst')}</h3>
            <p>{t('safetyFirstDesc')}</p>
          </div>
          
          <div className="value-card">
            <div className="value-icon">🌄</div>
            <h3>{t('authenticExperiences')}</h3>
            <p>{t('authenticExperiencesDesc')}</p>
          </div>
        </div>
      </div>
      
      <div id="team" className="team-section">
        <h2>{t('meetOurTeam')}</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <div className="member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <p className="member-role">{member.role}</p>
              <p className="member-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div id="testimonials" className="testimonials-section">
        <h2>{t('whatOurTravelersSay')}</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="quote-mark">"</div>
              <p className="testimonial-quote">{testimonial.quote}</p>
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < testimonial.rating ? "star filled" : "star"}>★</span>
                ))}
              </div>
              <p className="testimonial-author">- {testimonial.name}, {testimonial.location}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="cta-section">
        <h2>{t('readyToExperience')}</h2>
        <p>{t('joinUsOnJourney')}</p>
        <div className="cta-buttons">
          <button className="primary-button" onClick={() => window.location.href = '/destinations'}>
            {t('browseDestinations')}
          </button>
          <button className="secondary-button" onClick={() => window.location.href = '/contact'}>
            {t('contact')}
          </button>
        </div>
      </div>
      
      {/* Back to top button */}
      <div className={`back-to-top ${showBackToTop ? 'visible' : ''}`} onClick={scrollToTop}>
        ↑
      </div>
    </div>
  );
};

export default About;