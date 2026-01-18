// =============================================================================
// NAVIGATION MENU MANAGEMENT
// =============================================================================

/**
 * Mobile menu toggle functionality
 */
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  // Close menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });
}

// =============================================================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// =============================================================================

/**
 * Update active nav link based on current page
 */
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  
  document.querySelectorAll(".nav-link").forEach((link) => {
    const linkHref = link.getAttribute("href");
    
    if (linkHref === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

// =============================================================================
// TYPING EFFECT FOR HERO SECTION
// =============================================================================

/**
 * Optimized typewriter effect for hero title
 */
const typedTextElement = document.getElementById("typed-text");
if (typedTextElement) {
  const texts = ["Software Engineer", "Full-Stack Developer", "WordPress Developer"];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typedTextElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
    
    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(type, typingSpeed);
  }
  
  setTimeout(type, 500);
}

// =============================================================================
// ANIMATED COUNTERS
// =============================================================================

/**
 * Animate number counters with IntersectionObserver (optimized)
 */
const counters = document.querySelectorAll('.counter');
let countersAnimated = false;

if (counters.length > 0) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => counterObserver.observe(counter));
  
  function animateCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      updateCounter();
    });
  }
}

// =============================================================================
// SCROLL ANIMATIONS
// =============================================================================

/**
 * Optimized scroll animation with IntersectionObserver - no layout shift
 */
const animatedElements = document.querySelectorAll('[data-scroll-animation], .service-card, .project-card, .portfolio-item, .timeline-item');

if (animatedElements.length > 0) {
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(el => {
    el.classList.add('observe-animation');
    scrollObserver.observe(el);
  });
}

// =============================================================================
// PROJECT FILTERING SYSTEM
// =============================================================================

/**
 * Optimized project filtering
 */
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    // Filter projects
    portfolioItems.forEach(item => {
      const categories = item.getAttribute('data-category') || '';
      
      if (filter === 'all' || categories.includes(filter)) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 10);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  });
});

// =============================================================================
// BACK TO TOP BUTTON
// =============================================================================

/**
 * Optimized back-to-top button with throttling
 */
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
  let isScrolling = false;
  
  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        if (window.pageYOffset > 300) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
        isScrolling = false;
      });
      isScrolling = true;
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// =============================================================================
// LAZY IMAGE LOADING
// =============================================================================

/**
 * Lazy load images for better performance
 */
document.addEventListener("DOMContentLoaded", () => {
  const lazyImages = document.querySelectorAll(".lazy");
  
  if (lazyImages.length > 0) {
    lazyImages.forEach((img) => {
      const realSrc = img.dataset.src;
      if (realSrc) {
        const image = new Image();
        image.src = realSrc;
        image.onload = () => {
          img.src = realSrc;
          img.classList.add("loaded");
        };
      }
    });
  }
});

// =============================================================================
// CONTACT FORM HANDLING
// =============================================================================

/**
 * Handle contact form submission with validation and feedback
 */
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", handleContactSubmit);
}

async function handleContactSubmit(e) {
  e.preventDefault();

  const submitBtn = document.getElementById("submit-btn");
  const formStatus = document.getElementById("form-status");
  const formData = new FormData(contactForm);

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  formStatus.style.display = "none";

  try {
    const response = await fetch("process-contact.php", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      // Success message
      formStatus.className = "form-status success";
      formStatus.textContent = result.message || "Message sent successfully!";
      formStatus.style.display = "block";

      // Reset form
      contactForm.reset();

      // Reset reCAPTCHA if present
      if (typeof grecaptcha !== "undefined") {
        grecaptcha.reset();
      }

      // Hide message after 5 seconds
      setTimeout(() => {
        formStatus.style.display = "none";
      }, 5000);
    } else {
      // Error message
      formStatus.className = "form-status error";
      formStatus.textContent = result.message || "An error occurred. Please try again.";
      formStatus.style.display = "block";
    }
  } catch (error) {
    console.error("Form submission error:", error);
    formStatus.className = "form-status error";
    formStatus.textContent = "Network error. Please try again later.";
    formStatus.style.display = "block";
  } finally {
    // Reset button state
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
  }
}

// =============================================================================
// SMOOTH SCROLL BEHAVIOR
// =============================================================================

/**
 * Enable smooth scrolling for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    
    if (targetId !== "#") {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

