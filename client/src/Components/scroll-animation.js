// Add this script to your project to enable scroll animations
// Place it at the end of your body tag or import it in your main JavaScript file

document.addEventListener('DOMContentLoaded', function() {
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    function reveal() {
      for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = revealElements[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          revealElements[i].classList.add('active');
        }
      }
    }
    
    window.addEventListener('scroll', reveal);
    
    // Initial check to reveal elements that are already visible
    reveal();
    
    // Add reveal class to sections that should animate on scroll
    const sections = [
      '.intro-section',
      '.duration-selector',
      '.destination-card',
      '.cta-section',
      '.view-all-button'
    ];
    
    sections.forEach(section => {
      const elements = document.querySelectorAll(section);
      elements.forEach(el => {
        if (!el.classList.contains('reveal')) {
          el.classList.add('reveal');
        }
      });
    });
  });