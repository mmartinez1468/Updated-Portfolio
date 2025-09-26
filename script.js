function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdownLinks = document.querySelectorAll('.dropdown-item a');
    
    let lastScroll = 0;

    // Hamburger menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Handle dropdown toggle on mobile
            if (window.innerWidth <= 768 && this.classList.contains('has-dropdown')) {
                e.preventDefault();
                
                const dropdown = this.nextElementSibling;
                const parentItem = this.parentElement;
                
                // Toggle active class
                this.classList.toggle('active');
                dropdown.classList.toggle('active');
                parentItem.classList.toggle('active');
                
                // Close other dropdowns
                navLinks.forEach(otherLink => {
                    if (otherLink !== this && otherLink.classList.contains('has-dropdown')) {
                        otherLink.classList.remove('active');
                        otherLink.nextElementSibling.classList.remove('active');
                        otherLink.parentElement.classList.remove('active');
                    }
                });
            } else if (!this.classList.contains('has-dropdown')) {
                // Close mobile menu for non-dropdown links
                closeMobileMenu();
            }
        });
    });

    // Close mobile menu when clicking on dropdown items
    dropdownLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            closeMobileMenu();
        }
    });

    // Handle scroll behavior for navbar shadow
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (navbar) {
            // Add shadow on scroll
            if (currentScroll > 0) {
                navbar.style.boxShadow = 'var(--shadowdark)';
            } else {
                navbar.style.boxShadow = 'var(--shadow)';
            }
        }
        
        lastScroll = currentScroll;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /**
     * Helper function to close mobile menu
     */
    function closeMobileMenu() {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
    }
}

// =====================================================================
// NAVBAR LOGO SHRINK EFFECT
// =====================================================================

/**
 * Initialize logo shrink effect on scroll
 * Only applies to desktop screens (>= 1024px)
 */
function initializeLogoShrink() {
    const heroSection = document.getElementById("heroSection");
    const navbar = document.querySelector(".navbar");
    const navLogo = document.querySelector(".nav-logo");

    if (!heroSection || !navbar || !navLogo) return;

    document.addEventListener("scroll", function() {
        if (window.innerWidth >= 1024) {
            if (window.scrollY > heroSection.offsetHeight - navbar.offsetHeight) {
                navLogo.classList.add("shrink");
            } else {
                navLogo.classList.remove("shrink");
            }
        } else {
            // Reset logo if resizing back to mobile
            navLogo.classList.remove("shrink");
        }
    });
}












document.addEventListener("DOMContentLoaded", () => {
    initializeNavigation();
    initializeLogoShrink();
});






// Dual Intersection Observer to handle both one-time and repeating animations
document.addEventListener('DOMContentLoaded', function() {
    // Get elements with different animation classes (including responsive ones)
    const oneTimeElements = document.querySelectorAll('.animate, .md-animate, .lg-animate, .xl-animate');
    const repeatingElements = document.querySelectorAll('.animate-repeat, .md-animate-repeat, .lg-animate-repeat, .xl-animate-repeat');
    
    // Observer for one-time animations (original behavior)
    const oneTimeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation to prevent repeat
                oneTimeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    });
    
    // Observer for repeating animations
    const repeatingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class when entering viewport
                entry.target.classList.add('visible');
            } else {
                // Instantly remove visible class and temporarily remove delay
                if (entry.intersectionRatio === 0) {
                    // Store original delay classes
                    const delayClasses = [];
                    entry.target.classList.forEach(className => {
                        if (className.includes('delay-')) {
                            delayClasses.push(className);
                        }
                    });
                    
                    // Remove delay classes temporarily for instant reset
                    delayClasses.forEach(delayClass => {
                        entry.target.classList.remove(delayClass);
                    });
                    
                    // Remove visible class instantly
                    entry.target.classList.remove('visible');
                    
                    // Restore delay classes after a brief moment for next animation
                    setTimeout(() => {
                        delayClasses.forEach(delayClass => {
                            entry.target.classList.add(delayClass);
                        });
                    }, 50);
                }
            }
        });
    }, {
        threshold: [0, 0.1], // Multiple thresholds for better mobile detection
        rootMargin: '0px 0px -5% 0px' // Reduced margin for mobile
    });
    
    // Observe one-time animation elements
    oneTimeElements.forEach(element => {
        oneTimeObserver.observe(element);
    });
    
    // Observe repeating animation elements
    repeatingElements.forEach(element => {
        repeatingObserver.observe(element);
    });
    
    // Handle elements already in viewport on page load
    setTimeout(() => {
        // One-time elements
        oneTimeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            ) {
                element.classList.add('visible');
            }
        });
        
        // Repeating elements
        repeatingElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            ) {
                element.classList.add('visible');
            }
        });
    }, 100);
});
















// Growing dash animation for landing section
document.addEventListener('DOMContentLoaded', function() {
    const growingDash = document.getElementById('growingDash');
    
    if (!growingDash) return;
    
    function updateDashLength() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const maxScroll = 500;
        let scrollProgress = Math.min(scrollTop / maxScroll, 1);
        scrollProgress = Math.max(0, Math.min(1, scrollProgress));
        
        const minDashWidth = 30;
        let maxDashWidth = 80;
        
        if (window.innerWidth >= 1024) {
            maxDashWidth = 120;
        } else if (window.innerWidth >= 768) {
            maxDashWidth = 100;
        }
        
        const dashWidth = minDashWidth + (scrollProgress * (maxDashWidth - minDashWidth));
        growingDash.style.width = dashWidth + 'px';
        growingDash.style.opacity = 0.7 + (scrollProgress * 0.3);
    }
    
    window.addEventListener('scroll', updateDashLength);
    updateDashLength();
    window.addEventListener('resize', updateDashLength);
});













document.addEventListener("DOMContentLoaded", function () {
  const scrollElements = document.querySelectorAll("[data-scroll-slide]");

  // Get dynamic distance based on viewport size
  function getDynamicMaxDistance(direction) {
    if (direction === "left" || direction === "right") {
      return window.innerWidth * 0.5; // half screen width
    }
    if (direction === "up" || direction === "down") {
      return window.innerHeight * 0.5; // half screen height
    }
    return 150; // fallback
  }

  function moveScrollElements() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    scrollElements.forEach((element) => {
      const direction = element.dataset.scrollSlide || "right";
      const speedMultiplier =
        parseFloat(element.dataset.scrollMultiplier) || 1;

      // Calculate how far to slide (relative to viewport & container)
      const maxDistance = getDynamicMaxDistance(direction);

      const container = element.closest("#landing") || document.body;
      const containerHeight =
        container.offsetHeight || window.innerHeight;

      // Scroll progress relative to container
      const baseProgress = Math.min(scrollTop / containerHeight, 1);
      const adjustedProgress = Math.min(baseProgress * speedMultiplier, 1);

      const moveDistance = adjustedProgress * maxDistance;

      // Apply transform
      let transform = "";
      switch (direction.toLowerCase()) {
        case "right":
          transform = `translateX(${moveDistance}px)`;
          break;
        case "left":
          transform = `translateX(-${moveDistance}px)`;
          break;
        case "up":
          transform = `translateY(-${moveDistance}px)`;
          break;
        case "down":
          transform = `translateY(${moveDistance}px)`;
          break;
      }

      element.style.transform = transform;
    });
  }

  // Bind events
  window.addEventListener("scroll", moveScrollElements);
  window.addEventListener("resize", moveScrollElements);

  // Initial position
  moveScrollElements();
});





document.addEventListener("DOMContentLoaded", () => {
  // Ensure all .animate elements inside #landing are visible on page load
  const landingWords = document.querySelectorAll("#landing .animate");
  landingWords.forEach(el => {
    el.classList.add("visible");
    el.style.transform = "none"; // Reset any scroll-slide transforms
  });
});



















































































































const wrapper = document.querySelector('.experience-wrapper');
const containers = document.querySelectorAll('.experience-container');
let currentIndex = 0;

// Create dots
const dotsNav = document.getElementById('dotsNav');
containers.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        currentIndex = i;
        updateSlide();
    });
    dotsNav.appendChild(dot);
});
const dots = document.querySelectorAll('.dot');

function updateSlide() {
    const containerWidth = containers[0].offsetWidth;
    const offset = containerWidth * currentIndex;
    wrapper.style.transform = `translateX(-${offset}px)`;
    
    // Update dot states - all dots up to and including current index should be active
    dots.forEach((dot, index) => {
        if (index <= currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    // Update progress line - calculate distance between dot centers
    if (containers.length > 1) {
        const firstDot = dots[0];
        const lastDot = dots[dots.length - 1];
        const firstDotCenter = firstDot.offsetLeft + (firstDot.offsetWidth / 2);
        const lastDotCenter = lastDot.offsetLeft + (lastDot.offsetWidth / 2);
        const totalDistance = lastDotCenter - firstDotCenter;
        const progressWidth = (currentIndex / (containers.length - 1)) * totalDistance;
        
        dotsNav.style.setProperty('--progress-width', progressWidth + 'px');
        dotsNav.style.setProperty('--line-start', firstDotCenter + 'px');
        dotsNav.style.setProperty('--total-line-width', totalDistance + 'px');
    }
}

// Swipe functionality
let startX = 0;
let isDragging = false;

wrapper.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

wrapper.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const diff = startX - e.touches[0].clientX;
    wrapper.style.transform = `translateX(-${containers[0].offsetWidth * currentIndex + diff}px)`;
});

wrapper.addEventListener('touchend', e => {
    isDragging = false;
    const diff = startX - e.changedTouches[0].clientX;
    if (diff > 50 && currentIndex < containers.length - 1) currentIndex++;
    else if (diff < -50 && currentIndex > 0) currentIndex--;
    updateSlide();
});

// Keyboard navigation
window.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' && currentIndex < containers.length - 1) {
        currentIndex++;
        updateSlide();
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        currentIndex--;
        updateSlide();
    }
});

// Update on resize
window.addEventListener('resize', updateSlide);

// Initialize
updateSlide();

















































function initializeNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  const landing = document.getElementById('landing');

  if (!navbar || !landing) return;

  window.addEventListener('scroll', () => {
    const landingHeight = landing.offsetHeight;
    const triggerPoint = landingHeight * 0.5; // 50% of landing

    if (window.scrollY > triggerPoint) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation();
  initializeLogoShrink();
  initializeNavbarScroll(); // add this
});
