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






// Single Intersection Observer to handle animations when elements enter viewport
document.addEventListener('DOMContentLoaded', function() {
    // Get all elements with the 'animate' class
    const animatedElements = document.querySelectorAll('.animate');
    
    // Create an observer with appropriate options
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the element is in the viewport
            if (entry.isIntersecting) {
                // Add the 'visible' class to trigger the animation
                entry.target.classList.add('visible');
                
                // Optionally unobserve the element after it's animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Options for the observer
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    });
    
    // Observe each animated element
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add visible class immediately for elements already in viewport on page load
    setTimeout(() => {
        animatedElements.forEach(element => {
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













// Scroll-based sliding effects (ONLY for elements with data-scroll-slide attributes)
document.addEventListener('DOMContentLoaded', function() {
    const scrollElements = document.querySelectorAll('[data-scroll-slide]');
    
    // Debug logging
    console.log('Found scroll elements:', scrollElements.length);
    scrollElements.forEach((el, i) => {
        console.log(`Element ${i}:`, el.textContent || el.innerText, 'Direction:', el.dataset.scrollSlide);
    });
    
    if (scrollElements.length === 0) return;
    
    scrollElements.forEach(element => {
        const smooth = element.dataset.scrollSmooth === 'true';
        if (smooth) {
            const timing = element.dataset.scrollTiming || '0.2s';
            element.style.transition = `transform ${timing} ease-out`;
        } else {
            element.style.transition = 'none';
        }
    });
    
    function getScrollSensitivity(elementScrollSpeed) {
        const defaultSpeed = elementScrollSpeed || 300;
        
        if (window.innerWidth >= 1200) {
            return defaultSpeed * 2.2;
        } else if (window.innerWidth >= 1023) {
            return defaultSpeed * 1.8;
        } else {
            return defaultSpeed;
        }
    }
    
    function moveScrollElements() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const isDesktop = window.innerWidth >= 768;
        
        // Debug logging
        if (scrollTop < 50) {
            console.log('Window width:', window.innerWidth, 'Is desktop:', isDesktop, 'Scroll top:', scrollTop);
        }
        
        if (isDesktop) {
            const groupContainers = document.querySelectorAll('.we-all-strive, .for-greatness-lets');
            
            groupContainers.forEach(container => {
                const allH1Elements = container.querySelectorAll('h1');
                const scrollElements = container.querySelectorAll('[data-scroll-slide]');
                
                // Check if all h1 elements have scroll attributes
                const allElementsHaveScrollAttrs = Array.from(allH1Elements).every(h1 => h1.hasAttribute('data-scroll-slide'));
                
                if (allH1Elements.length > 1 && allElementsHaveScrollAttrs && scrollElements.length > 0) {
                    let groupDirection = 'right';
                    let groupMaxDistance = 100;
                    let groupScrollSensitivity = 300;
                    let groupSpeedMultiplier = 1;
                    
                    const firstScrollElement = scrollElements[0];
                    groupDirection = firstScrollElement.dataset.scrollSlide || 'right';
                    groupMaxDistance = parseInt(firstScrollElement.dataset.scrollDistance) || 150;
                    
                    const baseScrollSpeed = parseInt(firstScrollElement.dataset.scrollSpeed) || 300;
                    groupScrollSensitivity = getScrollSensitivity(baseScrollSpeed);
                    
                    let totalMultiplier = 0;
                    scrollElements.forEach(element => {
                        totalMultiplier += parseFloat(element.dataset.scrollMultiplier) || 1;
                    });
                    groupSpeedMultiplier = Math.max(totalMultiplier / scrollElements.length, 1);
                    
                    const baseProgress = Math.min(scrollTop / groupScrollSensitivity, 1);
                    const adjustedProgress = Math.min(baseProgress * groupSpeedMultiplier, 1);
                    const moveDistance = adjustedProgress * groupMaxDistance;
                    
                    let transform = '';
                    switch(groupDirection.toLowerCase()) {
                        case 'right':
                            transform = `translateX(${moveDistance}px)`;
                            break;
                        case 'left':
                            transform = `translateX(-${moveDistance}px)`;
                            break;
                        case 'up':
                            transform = `translateY(-${moveDistance}px)`;
                            break;
                        case 'down':
                            transform = `translateY(${moveDistance}px)`;
                            break;
                        default:
                            transform = `translateX(${moveDistance}px)`;
                    }
                    
                    allH1Elements.forEach(h1 => {
                        h1.style.transform = transform;
                        // Debug logging (remove in production)
                        if (scrollTop < 100) {
                            console.log('Group transform applied:', transform, 'to element:', h1.textContent);
                        }
                    });
                }
            });
        }
        
        // Process individual scroll elements
        scrollElements.forEach(element => {
            // Skip if this element was handled by group logic
            if (isDesktop && element.closest('.we-all-strive, .for-greatness-lets')) {
                const container = element.closest('.we-all-strive, .for-greatness-lets');
                const allH1Elements = container.querySelectorAll('h1');
                const allElementsHaveScrollAttrs = Array.from(allH1Elements).every(h1 => h1.hasAttribute('data-scroll-slide'));
                
                if (allElementsHaveScrollAttrs) {
                    return; // Skip individual processing if group handled it
                }
            }
            
            const direction = element.dataset.scrollSlide || 'right';
            const maxDistance = parseInt(element.dataset.scrollDistance) || 150;
            const baseScrollSpeed = parseInt(element.dataset.scrollSpeed) || 300;
            const speedMultiplier = parseFloat(element.dataset.scrollMultiplier) || 1;
            
            const scrollSensitivity = getScrollSensitivity(baseScrollSpeed);
            
            const baseProgress = Math.min(scrollTop / scrollSensitivity, 1);
            const adjustedProgress = Math.min(baseProgress * speedMultiplier, 1);
            const moveDistance = adjustedProgress * maxDistance;
            
            let transform = '';
            switch(direction.toLowerCase()) {
                case 'right':
                    transform = `translateX(${moveDistance}px)`;
                    break;
                case 'left':
                    transform = `translateX(-${moveDistance}px)`;
                    break;
                case 'up':
                    transform = `translateY(-${moveDistance}px)`;
                    break;
                case 'down':
                    transform = `translateY(${moveDistance}px)`;
                    break;
                default:
                    transform = `translateX(${moveDistance}px)`;
            }
            
            element.style.transform = transform;
            
            // Debug logging (remove in production)
            if (scrollTop < 100 && element.dataset.scrollSlide) {
                console.log('Individual transform applied:', transform, 'to element:', element.textContent || element.innerText);
            }
        });
    }
    
    window.addEventListener('scroll', moveScrollElements);
    window.addEventListener('resize', moveScrollElements);
    
    // Initial call to set starting positions
    moveScrollElements();
});










// Demo controls - keeping these for development purposes but not auto-triggering
function resetAnimations() {
    const animateElements = document.querySelectorAll('.animate');
    animateElements.forEach(el => {
        el.classList.remove('visible');
    });
}

function triggerAnimations() {
    const animateElements = document.querySelectorAll('.animate');
    animateElements.forEach(el => {
        el.classList.add('visible');
    });
}

// REMOVED: Auto-trigger animations - they now only trigger when in viewport





























// Skills section functionality
        const skillsContainer = document.getElementById('skillsContainer');
        const dots = document.querySelectorAll('.dot');
        let currentSkill = 0;

        // Function to update active dot
        function updateActiveDot(index) {
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[index]) {
                dots[index].classList.add('active');
            }
        }

        // Dot click functionality
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const cardWidth = window.innerWidth + 20; // full viewport width + margin
                skillsContainer.scrollTo({
                    left: cardWidth * index,
                    behavior: 'smooth'
                });
                currentSkill = index;
                updateActiveDot(currentSkill);
            });
        });

        // Update dots on scroll (mobile only)
        function updateDotsOnScroll() {
            if (window.innerWidth < 768) {
                const cards = document.querySelectorAll('.skills-card');
                const cardWidth = window.innerWidth + 20; // full viewport width + margin
                const scrollLeft = skillsContainer.scrollLeft;
                const newSkill = Math.round(scrollLeft / cardWidth);
                
                if (newSkill !== currentSkill) {
                    currentSkill = newSkill;
                    updateActiveDot(currentSkill);
                }
            }
        }

        skillsContainer.addEventListener('scroll', updateDotsOnScroll);

        // Reset to first slide when switching to tablet/desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                skillsContainer.scrollTo({ left: 0 });
                currentSkill = 0;
                updateActiveDot(currentSkill);
            }
        });
