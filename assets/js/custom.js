/**
 * Modern Single-Page Portfolio - Navigation & Interactions
 */

(function() {
  'use strict';

  // Smooth scroll to sections
  function initSmoothScroll() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          // Remove active class from all links
          navLinks.forEach(l => l.classList.remove('active'));

          // Add active class to clicked link
          this.classList.add('active');

          // Scroll to section
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Update URL without triggering scroll
          if (history.pushState) {
            history.pushState(null, null, '#' + targetId);
          }
        }
      });
    });
  }

  // Highlight active section in navigation on scroll
  function initScrollSpy() {
    const sections = document.querySelectorAll('#main article[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    function highlightNavOnScroll() {
      let scrollPos = window.scrollY + 200; // offset for header

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

  // Sticky header effect
  function initStickyHeader() {
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 100) {
        header.style.padding = '0.75rem 0';
      } else {
        header.style.padding = '1.25rem 0';
      }

      lastScroll = currentScroll;
    });
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

    // Handle click
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Add fade-in animation to articles on scroll
  function initScrollAnimations() {
    const articles = document.querySelectorAll('#main article');

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    articles.forEach(article => {
      article.style.opacity = '0';
      article.style.transform = 'translateY(20px)';
      article.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(article);
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
    initStickyHeader();
    initBackToTop();
    initScrollAnimations();
    handleInitialHash();

    console.log('Portfolio initialized');
  }

})();
