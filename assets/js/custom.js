/**
 * Professional Sidebar Portfolio - Navigation & Interactions
 */

(function() {
  'use strict';

  // Smooth scroll to sections
  function initSmoothScroll() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const backToTop = document.getElementById('back-to-top');

    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Update URL
          if (history.pushState) {
            history.pushState(null, null, '#' + targetId);
          }
        }
      });
    });

    // Back to top button
    if (backToTop) {
      backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        // Reset URL
        if (history.pushState) {
          history.pushState(null, null, window.location.pathname);
        }
      });
    }
  }

  // Highlight active section in navigation
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    function highlightNavOnScroll() {
      const scrollPos = window.scrollY + 200;

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', highlightNavOnScroll);
    highlightNavOnScroll(); // Initial check
  }

  // Back to top button visibility
  function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');

    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
  }

  // Handle hash on page load
  function handleInitialHash() {
    if (window.location.hash) {
      setTimeout(() => {
        const targetId = window.location.hash.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  }

  // Add fade-in animation to cards
  function initScrollAnimations() {
    const cards = document.querySelectorAll('.card');

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
    });
  }

  // Initialize all functions when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initSmoothScroll();
    initScrollSpy();
    initBackToTop();
    initScrollAnimations();
    handleInitialHash();

    console.log('Portfolio initialized');
  }

})();
