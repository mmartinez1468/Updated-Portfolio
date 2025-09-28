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































document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".tasks-toggle");

  toggles.forEach(button => {
    button.addEventListener("click", () => {
      const tasks = button.previousElementSibling; // ul.experience-info-tasks
      tasks.classList.toggle("open");
      button.classList.toggle("open");
    });
  });
});






















document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const dropdowns = document.querySelectorAll(".dropdown");

  // Toggle hamburger menu
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Handle nav links
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      // Case 1: Mobile + has dropdown → toggle dropdown
      if (window.innerWidth <= 1024 && link.classList.contains("has-dropdown")) {
        e.preventDefault(); // stop navigation
        const dropdown = link.nextElementSibling;

        // Toggle this dropdown
        dropdown.classList.toggle("active");
        link.classList.toggle("active");

        // Close other dropdowns
        dropdowns.forEach(other => {
          if (other !== dropdown) {
            other.classList.remove("active");
            if (other.previousElementSibling) {
              other.previousElementSibling.classList.remove("active");
            }
          }
        });
      } 
      // Case 2: Normal link → close menu
      else {
        closeMenu();
      }
    });
  });

  // Helper: close menu completely
  function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    dropdowns.forEach(drop => drop.classList.remove("active"));
    navLinks.forEach(link => link.classList.remove("active"));
  }
});































// Global state for pricing
let isYearly = false;

// Function to update all pricing displays
function updateAllPrices() {
    const priceElements = document.querySelectorAll('[data-price="pricing"]');
    const toggleElements = document.querySelectorAll('[data-toggle="pricing"]');
    
    // Update all toggle switches
    toggleElements.forEach(toggle => {
        if (isYearly) {
            toggle.classList.add('active');
        } else {
            toggle.classList.remove('active');
        }
    });
    
    // Update all price displays
    priceElements.forEach(priceElement => {
        // Get the monthly price from the data attribute
        let monthlyPrice = parseInt(priceElement.getAttribute('data-monthly')) || 10;
        
        const yearlyPrice = monthlyPrice * 10; // 20% discount on yearly
        const yearlySavings = monthlyPrice * 12 - yearlyPrice;
        const savingsPercent = Math.round((yearlySavings / (monthlyPrice * 12)) * 100);
        
        if (isYearly) {
            priceElement.innerHTML = `
                <p>$${yearlyPrice} /year</p>
                <p style="font-size: 14px; color: #7c7a7a; margin-top: 5px;">
                    Save $${yearlySavings} (${savingsPercent}% off)
                </p>`;
        } else {
            priceElement.innerHTML = `
                <p>$${monthlyPrice} /month</p>
                <p style="font-size: 14px; color: #7c7a7a; margin-top: 5px;">
                    $${monthlyPrice * 12} /year (Save ${savingsPercent}% yearly)
                </p>`;
        }
    });
}

// Setup event listeners for all toggles
document.querySelectorAll('[data-toggle="pricing"]').forEach(toggle => {
    toggle.addEventListener('click', function() {
        isYearly = !isYearly;
        updateAllPrices();
    });
});

// Initialize prices on page load
updateAllPrices();

document.addEventListener('DOMContentLoaded', () => {
    // Word rotation animation with instant disappearance
    const words = ["Websites", "Experiences", "Solutions", "Presence", "Innovations"];
    const wordElement = document.getElementById('rotating-word');
    let currentIndex = 0;
    
    // Start the word rotation
    if (wordElement) {
        startWordRotation();
    }
    
    function startWordRotation() {
        setInterval(() => {
            // Hide the current word instantly
            wordElement.classList.add('word-hidden');
            wordElement.classList.remove('word-visible');
            
            // After a short delay, show the next word
            setTimeout(() => {
                // Change to next word
                currentIndex = (currentIndex + 1) % words.length;
                wordElement.textContent = words[currentIndex];
                
                // Make the new word visible with animation
                wordElement.classList.remove('word-hidden');
                wordElement.classList.add('word-visible');
            }, 200);
        }, 3000); // Change word every 3 seconds
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.querySelector('.toggle-switch-pricing');
    const toggleSlider = document.querySelector('.toggle-slider-pricing');
    const pricingDetails = document.querySelector('.pricing-details');
    
    if (toggleSwitch && toggleSlider) {
        toggleSwitch.addEventListener('click', function() {
            // Toggle active class
            toggleSlider.classList.toggle('active');
            
            // Change text based on state
            if (toggleSlider.classList.contains('active')) {
                toggleSlider.textContent = 'Social Media';
                if (pricingDetails) pricingDetails.style.display = 'block';
            } else {
                toggleSlider.textContent = 'Web Development';
                if (pricingDetails) pricingDetails.style.display = 'none';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const webButton = document.querySelector('.switch-plans-web');
    const mediaButton = document.querySelector('.switch-plans-media');
    
    if (!webButton || !mediaButton) return;
    
    // Social media plan data
    const mediaData = [
        {
            name: "Basic",
            monthlyPrice: 50,
            features: ["3 Posts/Week", "1 Platform", "Basic Analytics"]
        },
        {
            name: "Growth",
            monthlyPrice: 100,
            features: ["5 Posts/Week", "3 Platforms", "Advanced Analytics"]
        },
        {
            name: "Pro",
            monthlyPrice: 200,
            features: ["Daily Posts", "All Platforms", "Premium Analytics"]
        }
    ];
    
    // Social media services data
    const mediaServicesData = [
        {
            title: "CONTENT CREATION",
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2 4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4ZM4 5V19H20V5H4ZM9 7H15V9H9V7ZM9 11H15V13H9V11ZM9 15H13V17H9V15Z"></path></svg>',
            features: [
                {
                    name: "Posts Per Month",
                    tiers: [
                        { type: "checkmark", text: "12" },
                        { type: "checkmark", text: "20" },
                        { type: "checkmark", text: "30" }
                    ]
                },
                {
                    name: "Custom Graphics",
                    tiers: [
                        { type: "checkmark", text: "5/month" },
                        { type: "checkmark", text: "10/month" },
                        { type: "checkmark", text: "Unlimited" }
                    ]
                },
                {
                    name: "Video Content",
                    tiers: [
                        { type: "x" },
                        { type: "checkmark", text: "2/month" },
                        { type: "checkmark", text: "4/month" }
                    ]
                },
                {
                    name: "Caption Writing",
                    tiers: [
                        { type: "checkmark" },
                        { type: "checkmark" },
                        { type: "checkmark" }
                    ]
                },
                {
                    name: "Hashtag Research",
                    tiers: [
                        { type: "checkmark", text: "Basic" },
                        { type: "checkmark", text: "Advanced" },
                        { type: "checkmark", text: "Premium" }
                    ]
                }
            ]
        },
        {
            title: "PLATFORM MANAGEMENT",
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5V2C7 1.44772 7.44772 1 8 1H16C16.5523 1 17 1.44772 17 2V5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V6C2 5.44772 2.44772 5 3 5H7ZM4 15V19H20V15H4ZM4 13H20V7H4V13ZM9 3V5H15V3H9ZM10 11H14V9H10V11Z"></path></svg>',
            features: [
                {
                    name: "Platforms",
                    tiers: [
                        { type: "checkmark", text: "1" },
                        { type: "checkmark", text: "3" },
                        { type: "checkmark", text: "All" }
                    ]
                },
                {
                    name: "Posting Schedule",
                    tiers: [
                        { type: "checkmark", text: "Basic" },
                        { type: "checkmark", text: "Custom" },
                        { type: "checkmark", text: "Advanced" }
                    ]
                },
                {
                    name: "Comment Management",
                    tiers: [
                        { type: "x" },
                        { type: "checkmark" },
                        { type: "checkmark" }
                    ]
                },
                {
                    name: "DM Response",
                    tiers: [
                        { type: "x" },
                        { type: "x" },
                        { type: "checkmark", text: "24hr" }
                    ]
                },
                {
                    name: "Competitor Monitoring",
                    tiers: [
                        { type: "x" },
                        { type: "checkmark", text: "Monthly" },
                        { type: "checkmark", text: "Weekly" }
                    ]
                }
            ]
        },
        {
            title: "ANALYTICS & REPORTING",
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM4 5V19H20V5H4ZM7 10H9V17H7V10ZM11 7H13V17H11V7ZM15 13H17V17H15V13Z"></path></svg>',
            features: [
                {
                    name: "Performance Metrics",
                    tiers: [
                        { type: "checkmark", text: "Basic" },
                        { type: "checkmark", text: "Standard" },
                        { type: "checkmark", text: "Advanced" }
                    ]
                },
                {
                    name: "Reporting Frequency",
                    tiers: [
                        { type: "checkmark", text: "Monthly" },
                        { type: "checkmark", text: "Bi-weekly" },
                        { type: "checkmark", text: "Weekly" }
                    ]
                },
                {
                    name: "Audience Insights",
                    tiers: [
                        { type: "x" },
                        { type: "checkmark", text: "Basic" },
                        { type: "checkmark", text: "Advanced" }
                    ]
                },
                {
                    name: "Strategy Adjustment",
                    tiers: [
                        { type: "checkmark", text: "Quarterly" },
                        { type: "checkmark", text: "Monthly" },
                        { type: "checkmark", text: "Ongoing" }
                    ]
                },
                {
                    name: "ROI Analysis",
                    tiers: [
                        { type: "x" },
                        { type: "x" },
                        { type: "checkmark" }
                    ]
                }
            ]
        }
    ];
    
    // Store original web data
    const webData = [];
    document.querySelectorAll('.pricing-card').forEach((card, index) => {
        const nameElement = card.querySelector('.pricing-card-name h3');
        const priceElement = card.querySelector('[data-price="pricing"]');
        const featureElements = card.querySelectorAll('.pricing-explained li p');
        const features = [];
        
        featureElements.forEach(el => {
            if (el) features.push(el.textContent);
        });
        
        webData.push({
            name: nameElement ? nameElement.textContent : '',
            monthlyPrice: priceElement ? parseInt(priceElement.getAttribute('data-monthly')) : 0,
            features: features
        });
    });

    // Store original web services data
    const webServicesData = [];
    document.querySelectorAll('.pricing-services-container').forEach(container => {
        const titleElement = container.querySelector('.pricing-services-intro h3');
        const iconElement = container.querySelector('.pricing-services-intro svg');
        const features = [];

        container.querySelectorAll('.pricing-services-wrapper').forEach(wrapper => {
            const nameElement = wrapper.querySelector('.pricing-services-name p');
            const tiers = [];

            wrapper.querySelectorAll('.services-explained-card').forEach(card => {
                const checkmarkElement = card.querySelector('svg');
                const textElement = card.querySelector('p');
                
                let tier = {
                    type: checkmarkElement && checkmarkElement.id === 'checkmarkNo' ? 'x' : 'checkmark',
                    text: textElement ? textElement.textContent : ''
                };
                
                tiers.push(tier);
            });

            features.push({
                name: nameElement ? nameElement.textContent : '',
                tiers: tiers
            });
        });

        webServicesData.push({
            title: titleElement ? titleElement.textContent : '',
            icon: iconElement ? iconElement.outerHTML : '',
            features: features
        });
    });
    
    // Function to update pricing cards
    function updatePricingCards(data, servicesData) {
        // Update desktop pricing cards
        document.querySelectorAll('.pricing-card').forEach((card, index) => {
            if (data[index]) {
                // Update plan name
                const nameElement = card.querySelector('.pricing-card-name h3');
                if (nameElement) nameElement.textContent = data[index].name;
                
                // Update pricing
                const priceElement = card.querySelector('[data-price="pricing"]');
                if (priceElement) priceElement.setAttribute('data-monthly', data[index].monthlyPrice);
                
                // Update features
                const featureElements = card.querySelectorAll('.pricing-explained li p');
                data[index].features.forEach((feature, i) => {
                    if (featureElements[i]) {
                        featureElements[i].textContent = feature;
                    }
                });
            }
        });
        
        // Update mobile pricing cards
        document.querySelectorAll('.pricing-depth-card').forEach((card, index) => {
            if (data[index]) {
                // Update plan name
                const nameElement = card.querySelector('span');
                if (nameElement) nameElement.textContent = data[index].name;
                
                // Update pricing
                const priceElement = card.querySelector('#pricingDepthCost');
                if (priceElement) {
                    priceElement.setAttribute('data-monthly', data[index].monthlyPrice);
                    priceElement.setAttribute('data-yearly', data[index].monthlyPrice * 10);
                    
                    // Update the displayed price text
                    const priceText = priceElement.querySelector('p');
                    if (priceText) {
                        if (isYearly) {
                            priceText.textContent = `$${data[index].monthlyPrice * 10} /year`;
                        } else {
                            priceText.textContent = `$${data[index].monthlyPrice} /month`;
                        }
                    }
                }
            }
        });
        
        // Update services section
        const servicesContainer = document.querySelector('.pricing-services');
        if (servicesContainer) {
            // Clear existing services
            servicesContainer.innerHTML = '';
            
            // Add new services
            servicesData.forEach(serviceCategory => {
                const categoryContainer = document.createElement('div');
                categoryContainer.className = 'pricing-services-container';
                
                // Create header
                const headerHtml = `
                    <div class="pricing-services-intro">
                        ${serviceCategory.icon}
                        <h3>${serviceCategory.title}</h3>
                    </div>
                `;
                categoryContainer.innerHTML = headerHtml;
                
                // Create features
                serviceCategory.features.forEach(feature => {
                    const featureWrapper = document.createElement('div');
                    featureWrapper.className = 'pricing-services-wrapper';
                    
                    // Feature name
                    const nameHtml = `
                        <div class="pricing-services-name">
                            <p>${feature.name}</p>
                        </div>
                    `;
                    featureWrapper.innerHTML = nameHtml;
                    
                    // Feature tiers
                    const tiersContainer = document.createElement('div');
                    tiersContainer.className = 'pricing-services-explained';
                    
                    feature.tiers.forEach((tier, index) => {
                        const tierCard = document.createElement('div');
                        tierCard.className = 'services-explained-card';
                        
                        // Apply positioning classes based on index
                        if (index === 1) {
                            tierCard.classList.add('middle-card');
                        } else if (index === 2) {
                            tierCard.classList.add('last-card');
                        }
                        
                        let svgHtml = '';
                        if (tier.type === 'checkmark') {
                            svgHtml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(255,255,255,1)"><path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path></svg>';
                        } else if (tier.type === 'x') {
                            svgHtml = '<svg xmlns="http://www.w3.org/2000/svg" id="checkmarkNo" viewBox="0 0 24 24" fill="rgba(255,255,255,1)"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path></svg>';
                        }
                        
                        tierCard.innerHTML = svgHtml;
                        
                        // Add text if present
                        if (tier.text) {
                            const textP = document.createElement('p');
                            textP.textContent = tier.text;
                            tierCard.appendChild(textP);
                        }
                        
                        tiersContainer.appendChild(tierCard);
                    });
                    
                    featureWrapper.appendChild(tiersContainer);
                    categoryContainer.appendChild(featureWrapper);
                });
                
                servicesContainer.appendChild(categoryContainer);
            });
        }
        
        // Trigger price update to refresh the displayed prices
        updateAllPrices();
    }
    
    // Enhance existing event listeners for web/media buttons
    webButton.addEventListener('click', function(e) {
        e.preventDefault();
        webButton.classList.add('active');
        mediaButton.classList.remove('active');
        updatePricingCards(webData, webServicesData);
    });
    
    mediaButton.addEventListener('click', function(e) {
        e.preventDefault();
        mediaButton.classList.add('active');
        webButton.classList.remove('active');
        updatePricingCards(mediaData, mediaServicesData);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Only apply on desktop (matching your media query)
    if (window.innerWidth >= 993) {
        // Select ALL pricing-explained elements
        const pricingExplainedElements = document.querySelectorAll('.pricing-card .pricing-explained');
        
        // Create a sentinel element to trigger the hiding
        const sentinel = document.createElement('div');
        sentinel.style.height = '1px';
        sentinel.style.width = '100%';
        sentinel.style.position = 'absolute';
        sentinel.style.top = '100px'; // Adjust this value as needed
        sentinel.style.visibility = 'hidden';
        document.body.appendChild(sentinel);
        
        const observer = new IntersectionObserver((entries) => {
            if (!entries[0].isIntersecting) {
                // When scrolled down, add the hidden class to ALL pricing-explained elements
                pricingExplainedElements.forEach(element => {
                    element.classList.add('hidden');
                });
            } else {
                // When scrolled back up, remove the hidden class from ALL elements
                pricingExplainedElements.forEach(element => {
                    element.classList.remove('hidden');
                });
            }
        }, {
            threshold: 0,
            rootMargin: '0px'
        });
        
        observer.observe(sentinel);
    }
});





























