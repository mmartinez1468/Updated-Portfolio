// Toggle mobile menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Reset all dropdown states when toggling hamburger menu
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.classList.remove('active');
        if (toggle.nextElementSibling) {
            toggle.nextElementSibling.classList.remove('active');
        }
    });
});

// Mobile dropdown toggles
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        // Only handle clicks on mobile
        if (window.innerWidth <= 992) {
            e.preventDefault();
            this.classList.toggle('active');
            
            // Find the dropdown associated with this toggle
            const dropdown = this.nextElementSibling;
            dropdown.classList.toggle('active');
            
            // Close other dropdowns
            dropdownToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    otherToggle.classList.remove('active');
                    otherToggle.nextElementSibling.classList.remove('active');
                }
            });
        }
    });
});

// Close mobile menu when clicking on a regular nav link (not dropdown toggle)
document.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Also reset dropdown states
            dropdownToggles.forEach(toggle => {
                toggle.classList.remove('active');
                if (toggle.nextElementSibling) {
                    toggle.nextElementSibling.classList.remove('active');
                }
            });
        }
    });
});

// Close mobile menu when clicking on a dropdown link
document.querySelectorAll('.dropdown-link').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Also close the active dropdown
            document.querySelectorAll('.dropdown-toggle.active').forEach(active => {
                active.classList.remove('active');
                active.nextElementSibling.classList.remove('active');
            });
        }
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
        // Reset mobile menu and dropdowns for desktop view
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        dropdownToggles.forEach(toggle => {
            toggle.classList.remove('active');
            if (toggle.nextElementSibling) {
                toggle.nextElementSibling.classList.remove('active');
            }
        });
    }
});

// IIFE to isolate the slider code and prevent conflicts with navbar
(function() {
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Get slider elements
        const sliderTrack = document.querySelector('.variety-slider-track');
        const navItems = document.querySelectorAll('.variety-nav-item');
        const prevButton = document.querySelector('.variety-prev');
        const nextButton = document.querySelector('.variety-next');
        
        // Get the number of slides
        const slideCount = document.querySelectorAll('.variety-slider-image').length;
        
        // Initialize current index
        let currentIndex = 0;
        let interval;
        
        // Function to update the slider position
        function updateSliderPosition() {
            if (sliderTrack) {
                // Move the track based on current index (-100% * currentIndex)
                sliderTrack.style.transform = `translateX(${-currentIndex * (100 / slideCount)}%)`;
                
                // Update active nav item
                navItems.forEach((item, index) => {
                    if (index === currentIndex) {
                        item.classList.add('variety-active');
                    } else {
                        item.classList.remove('variety-active');
                    }
                });
            }
        }
        
        // Function to go to a specific slide
        function goToSlide(index) {
            // Handle boundaries
            if (index < 0) {
                index = slideCount - 1;
            } else if (index >= slideCount) {
                index = 0;
            }
            
            // Update current index and position
            currentIndex = index;
            updateSliderPosition();
        }
        
        // Add click event listeners to nav items
        navItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                goToSlide(index);
                resetAutoRotation();
            });
        });
        
        // Add click event listeners to prev/next buttons
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                goToSlide(currentIndex - 1);
                resetAutoRotation();
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                goToSlide(currentIndex + 1);
                resetAutoRotation();
            });
        }
        
        // Function to reset auto-rotation
        function resetAutoRotation() {
            clearInterval(interval);
            startAutoRotation();
        }
    });
})();

// Default text to display
const defaultText = "Welcome to our site. We create amazing experiences for our customers.";
        
// Function to animate all text in an element
function animateElement(element) {
    // Store original text
    const originalText = element.textContent || defaultText;
    
    // Clear the element
    element.innerHTML = '';
    
    // Split the text into words
    const words = originalText.split(' ');
    
    let delay = 0;
    
    // Process each word
    words.forEach((word, wordIndex) => {
        // Create a word container to keep letters together
        const wordContainer = document.createElement('span');
        wordContainer.className = 'word';
        wordContainer.style.display = 'inline-block';
        wordContainer.style.marginRight = '0.25em'; // Space between words
        
        // Add each letter of the word
        for (let i = 0; i < word.length; i++) {
            const span = document.createElement('span');
            span.textContent = word[i];
            span.className = 'letter';
            
            // Set the animation delay
            span.style.animationDelay = `${delay}s`;
            delay += 0.09;
            
            wordContainer.appendChild(span);
        }
        
        // Add the word to the element
        element.appendChild(wordContainer);
    });
}

// Function to reset the animation
function resetAnimation() {
    const typewriter = document.getElementById('typewriter');
    
    // Store the original text
    const originalText = typewriter.innerText || defaultText;
    
    // Reset the element
    typewriter.innerHTML = '';
    
    // Re-animate after a short delay
    setTimeout(() => {
        typewriter.textContent = originalText;
        animateElement(typewriter);
    }, 100);
}

// Run the animation on page load
document.addEventListener('DOMContentLoaded', () => {
    const typewriter = document.getElementById('typewriter');
    if (typewriter) {
        animateElement(typewriter);
    }
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

// Theme toggle functionality - DARK MODE FIRST
// In-memory theme storage (no localStorage)
let currentTheme = 'dark'; // Default to dark mode

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-switch');
    
    // Always start with dark mode (remove light-mode class if present)
    document.body.classList.remove('light-mode');
    currentTheme = 'dark';
    
    // Toggle theme when button is clicked
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            // Update in-memory preference
            if (document.body.classList.contains('light-mode')) {
                currentTheme = 'light';
            } else {
                currentTheme = 'dark';
            }
        });
    }
    
    // Optional: Listen for system preference changes (but always default to dark)
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
            // Only respond to system changes if user hasn't manually set preference
            // For now, we'll ignore system preference and stick with dark mode default
            console.log('System theme changed, but maintaining current theme:', currentTheme);
        });
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































// Simple navbar background after scrolling a little bit
function initNavbarBlur() {
    const navbar = document.querySelector('.navbar');
    
    function checkScrollPosition() {
        if (!navbar) return;
        
        // Check if we've scrolled down a little bit (50px threshold)
        const scrollThreshold = 50;
        const hasScrolled = window.scrollY > scrollThreshold;
        
        if (hasScrolled) {
            navbar.classList.add('scrolled-past');
        } else {
            navbar.classList.remove('scrolled-past');
        }
    }
    
    // Check on scroll
    window.addEventListener('scroll', checkScrollPosition);
    
    // Initial check
    checkScrollPosition();
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    initNavbarBlur();
});

// Image Comparison Slider - Vanilla JavaScript
function initImageComparisonSliders() {
    const compSliders = document.querySelectorAll('.comparison-slider');
    
    if (compSliders.length === 0) return;
    
    // Initialize each slider
    compSliders.forEach(function(slider) {
        const sliderWidth = slider.offsetWidth + 'px';
        const resizeImg = slider.querySelector('.resize img');
        if (resizeImg) {
            resizeImg.style.width = sliderWidth;
        }
        
        const divider = slider.querySelector('.divider');
        const resize = slider.querySelector('.resize');
        
        if (divider && resize) {
            setupDragging(divider, resize, slider);
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        compSliders.forEach(function(slider) {
            const sliderWidth = slider.offsetWidth + 'px';
            const resizeImg = slider.querySelector('.resize img');
            if (resizeImg) {
                resizeImg.style.width = sliderWidth;
            }
        });
    });
}

function setupDragging(dragElement, resizeElement, container) {
    let isDragging = false;
    let touched = false;
    
    // Detect touch devices
    window.addEventListener('touchstart', function() {
        touched = true;
    });
    
    window.addEventListener('touchend', function() {
        touched = false;
    });
    
    function startDrag(e) {
        isDragging = true;
        
        dragElement.classList.add('draggable');
        resizeElement.classList.add('resizable');
        
        const startX = e.pageX || (e.touches && e.touches[0].pageX);
        const dragWidth = dragElement.offsetWidth;
        const posX = dragElement.getBoundingClientRect().left + dragWidth - startX;
        const containerRect = container.getBoundingClientRect();
        const containerOffset = containerRect.left;
        const containerWidth = containerRect.width;
        const minLeft = containerOffset + 10;
        const maxLeft = containerOffset + containerWidth - dragWidth - 10;
        
        function handleMove(e) {
            if (!isDragging) return;
            
            if (!touched) {
                e.preventDefault();
            }
            
            const moveX = e.pageX || (e.touches && e.touches[0].pageX);
            let leftValue = moveX + posX - dragWidth;
            
            // Constrain movement within container bounds
            if (leftValue < minLeft) {
                leftValue = minLeft;
            } else if (leftValue > maxLeft) {
                leftValue = maxLeft;
            }
            
            const widthValue = ((leftValue + dragWidth / 2 - containerOffset) * 100 / containerWidth) + '%';
            
            dragElement.style.left = widthValue;
            resizeElement.style.width = widthValue;
        }
        
        function stopDrag() {
            if (!isDragging) return;
            
            isDragging = false;
            dragElement.classList.remove('draggable');
            resizeElement.classList.remove('resizable');
            
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', stopDrag);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', stopDrag);
            document.removeEventListener('touchcancel', stopDrag);
        }
        
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchmove', handleMove);
        document.addEventListener('touchend', stopDrag);
        document.addEventListener('touchcancel', stopDrag);
    }
    
    // Add event listeners for drag start
    dragElement.addEventListener('mousedown', startDrag);
    dragElement.addEventListener('touchstart', startDrag);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initImageComparisonSliders);
} else {
    initImageComparisonSliders();
}

class TriangleDivider {
    constructor(element) {
        this.element = element;
        this.shape = element.querySelector('.triangle-shape');
        this.init();
    }

    init() {
        this.updateOnScroll();
        window.addEventListener('scroll', () => this.updateOnScroll());
        window.addEventListener('resize', () => this.updateOnScroll());
    }

    updateOnScroll() {
        const rect = this.element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Check if triangle divider element is visible
        const isVisible = rect.bottom > 0 && rect.top < windowHeight;
        
        if (!isVisible) {
            // Reset to flat when not visible
            this.element.classList.remove('collapsed', 'fully-collapsed');
            this.shape.style.clipPath = 'polygon(0 0, 100% 0, 100% 0, 0 0)';
            this.shape.style.opacity = '1';
            return;
        }
        
        // Calculate animation progress as soon as element becomes visible
        const elementTop = rect.top;
        
        let scrollProgress;
        
        if (elementTop > 0) {
            // Element is entering viewport from bottom
            scrollProgress = Math.max(0, (windowHeight - elementTop) / windowHeight);
        } else {
            // Element is exiting viewport from top
            scrollProgress = Math.min(1, Math.max(0, (windowHeight - elementTop) / (windowHeight + rect.height)));
        }
        
        // Ensure progress is between 0 and 1
        scrollProgress = Math.max(0, Math.min(1, scrollProgress));

        // Remove existing classes
        this.element.classList.remove('collapsed', 'fully-collapsed');
        
        // Apply collapse states immediately when visible - start animation right away
        if (scrollProgress > 0.1) {
            this.element.classList.add('collapsed');
        }
        
        if (scrollProgress > 0.5) {
            this.element.classList.add('fully-collapsed');
        }

        // Triangle appears immediately and grows more aggressively for instant visibility
        // Give it a minimum height of 5% so it's immediately visible, then grow to 30%
        const minHeight = 8; // Minimum 5% height for immediate visibility
        const maxHeight = 30; // Maximum 30% height
        const triangleHeight = Math.min(maxHeight, minHeight + (scrollProgress * (maxHeight - minHeight)));
        
        // Create the triangle shape that slowly emerges, pointing at 30% from left
        // This creates a filled triangle from left edge to right edge to point and back
        this.shape.style.clipPath = `polygon(0 0, 100% 0, 30% ${triangleHeight}%, 0 0)`;
        this.shape.style.opacity = '1';
    }
}

// Initialize all triangle dividers when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const dividers = document.querySelectorAll('.triangle-divider');
    dividers.forEach(divider => new TriangleDivider(divider));
});













// Knowledge Header Loader Animation - Play Once Only
document.addEventListener('DOMContentLoaded', function() {
    // Get all knowledge text headers
    const knowledgeHeaders = document.querySelectorAll('.knowledgeTextHeader');
    
    // Create intersection observer for header animations
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add loader animation class when header comes into view
                entry.target.classList.add('loader-active');
                
                // Unobserve after animation to prevent re-triggering
                headerObserver.unobserve(entry.target);
            }
            // Removed the else block that was removing the class
        });
    }, {
        threshold: 1, // Trigger when element is fully visible
        rootMargin: '0px 0px -50px 0px' // Slight offset from bottom
    });
    
    // Observe all knowledge headers
    knowledgeHeaders.forEach(header => {
        headerObserver.observe(header);
    });
});















// Safari video autoplay fix - simple version
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.comparison-slider video');
    
    if (!video) return;
    
    // Set video properties for Safari autoplay
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    
    // Load and start the video
    video.load();
    
    // Ensure video plays when loaded
    video.addEventListener('loadeddata', () => {
        video.play().catch(() => {
            // Silently handle any autoplay restrictions
        });
    });
    
    // Handle page visibility to restart video if needed
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && video.paused) {
            video.play().catch(() => {
                // Silently handle any play restrictions
            });
        }
    });
});



















// Enhanced FAQ functionality with accessibility support
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const button = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Click event handler
        button.addEventListener('click', function() {
            toggleFAQItem(item, button);
        });
        
        // Keyboard event handler for accessibility
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFAQItem(item, button);
            }
            
            // Arrow key navigation between FAQ items
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                navigateToNextFAQ(e.key, button);
            }
        });
    });
    
    // Function to toggle FAQ item state
    function toggleFAQItem(item, button) {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        
        // Close all other items (accordion behavior)
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                const otherButton = otherItem.querySelector('.faq-question');
                
                otherButton.setAttribute('aria-expanded', 'false');
                otherItem.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Toggle current item
        const newState = !isExpanded;
        button.setAttribute('aria-expanded', newState);
        item.setAttribute('aria-expanded', newState);
        
        // Announce state change to screen readers
        if (newState) {
            announceToScreenReader('FAQ item expanded');
        } else {
            announceToScreenReader('FAQ item collapsed');
        }
    }
    
    // Function to navigate between FAQ items with arrow keys
    function navigateToNextFAQ(direction, currentButton) {
        const allButtons = Array.from(document.querySelectorAll('.faq-question'));
        const currentIndex = allButtons.indexOf(currentButton);
        
        let nextIndex;
        if (direction === 'ArrowDown') {
            nextIndex = (currentIndex + 1) % allButtons.length;
        } else {
            nextIndex = currentIndex === 0 ? allButtons.length - 1 : currentIndex - 1;
        }
        
        allButtons[nextIndex].focus();
    }
    
    // Function to announce messages to screen readers
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        // Add to DOM
        document.body.appendChild(announcement);
        
        // Remove after announcement
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Optional: Close FAQ when clicking outside
    document.addEventListener('click', function(e) {
        const isClickInsideFAQ = e.target.closest('.faq-item');
        
        if (!isClickInsideFAQ) {
            faqItems.forEach(item => {
                const button = item.querySelector('.faq-question');
                button.setAttribute('aria-expanded', 'false');
                item.setAttribute('aria-expanded', 'false');
            });
        }
    });
    
    // Optional: Handle escape key to close all FAQs
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const focusedElement = document.activeElement;
            const isInFAQ = focusedElement.closest('.faq-item');
            
            if (isInFAQ) {
                faqItems.forEach(item => {
                    const button = item.querySelector('.faq-question');
                    button.setAttribute('aria-expanded', 'false');
                    item.setAttribute('aria-expanded', 'false');
                });
                
                // Keep focus on the button that was focused
                if (focusedElement.classList.contains('faq-question')) {
                    focusedElement.focus();
                }
                
                announceToScreenReader('All FAQ items closed');
            }
        }
    });
});

// Optional: Add smooth scrolling when FAQ items expand
function addSmoothScrolling() {
    const style = document.createElement('style');
    style.textContent = `
        .faq-answer {
            transition: max-height 0.3s ease, padding 0.3s ease;
        }
        
        @media (prefers-reduced-motion: reduce) {
            .faq-answer {
                transition: none;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize smooth scrolling if not already handled in CSS
addSmoothScrolling();

// Function to check which step is at 50% viewport
function updateActiveStep() {
    const steps = document.querySelectorAll('.process-step');
    const viewportCenter = window.innerHeight * 0.5;
    
    let activeStep = null;
    let minDistance = Infinity;
    let fallbackStep = steps[0]; // Default to first step
    
    steps.forEach(step => {
        const rect = step.getBoundingClientRect();
        const stepTop = rect.top;
        const stepBottom = rect.bottom;
        const distanceFromCenter = Math.abs(stepTop - viewportCenter);
        
        // Find the step closest to 50% viewport
        if (distanceFromCenter < minDistance && stepTop <= viewportCenter && stepBottom >= viewportCenter) {
            minDistance = distanceFromCenter;
            activeStep = step;
        }
        
        // Update fallback to the closest step overall
        if (distanceFromCenter < minDistance || activeStep === null) {
            const stepCenter = stepTop + (stepBottom - stepTop) / 2;
            if (stepCenter <= viewportCenter + 100) { // Small buffer
                fallbackStep = step;
            }
        }
    });
    
    // If no step is directly intersecting viewport center, find the closest one
    if (!activeStep) {
        let closestDistance = Infinity;
        steps.forEach(step => {
            const rect = step.getBoundingClientRect();
            const stepCenter = rect.top + (rect.bottom - rect.top) / 2;
            const distance = Math.abs(stepCenter - viewportCenter);
            
            if (distance < closestDistance) {
                closestDistance = distance;
                activeStep = step;
            }
        });
    }
    
    // Remove active class from all steps
    steps.forEach(step => step.classList.remove('active'));
    
    // Add active class to the determined step (always have one active)
    const stepToActivate = activeStep || fallbackStep;
    if (stepToActivate) {
        stepToActivate.classList.add('active');
    }
}

// Update on scroll
window.addEventListener('scroll', updateActiveStep);

// Update on load
window.addEventListener('load', updateActiveStep);

// Update on resize
window.addEventListener('resize', updateActiveStep);

// Smooth scroll behavior for buttons
document.querySelectorAll('.landing-button-1').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Add click effect
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    });
});

function updateStackAnimation() {
    const stackCards = document.querySelectorAll('.stack-card');
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    stackCards.forEach((stackCard, index) => {
        const cardTop = stackCard.offsetTop;
        const cardHeight = stackCard.offsetHeight;
        const cardCenter = cardTop + cardHeight / 2;
        
        // Calculate progress (0 to 1) based on scroll position
        const progress = Math.max(0, Math.min(1, 
            (scrollTop + windowHeight / 2 - cardCenter + windowHeight) / windowHeight
        ));
        
        // Calculate stacking effect
        const stackOffset = Math.max(0, progress - 0.5) * 2; // Start stacking halfway through
        const translateY = stackOffset * -10 * index; // Stack offset
        
        // Apply transforms (no rotation or scaling)
        stackCard.style.transform = `
            translateY(${translateY}px)
        `;
        
        // Set z-index so later cards always appear on top
        stackCard.style.zIndex = index + 1;
        
        // Reduce shadow as cards stack
        const shadowIntensity = 1 - (stackOffset * 0.7);
        stackCard.style.boxShadow = `0 ${4 * shadowIntensity}px ${20 * shadowIntensity}px rgba(0,0,0,${0.1 * shadowIntensity})`;
    });
}

// Update on scroll
window.addEventListener('scroll', updateStackAnimation);

// Initial update
updateStackAnimation();

// Update on resize
window.addEventListener('resize', updateStackAnimation);





















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














































// Enhanced slider functionality with word navigation for desktop and count-up animations
let currentSlide = 0;
const totalSlides = 5;
const track = document.getElementById('statsSliderTrack');
const cards = document.querySelectorAll('.stats-slider-card');
const dotsContainer = document.getElementById('statsSliderDots');
const counter = document.getElementById('statsSliderCounter').querySelector('.stats-slider-counter__current');

// Animation state tracking
let animationTimeouts = [];
let isAnimating = false;

// Define words for each slide (customize these to match your content)
const slideWords = [
    "Custom Websites",     // Slide 1: Custom Websites
    "Social Media",       // Slide 2: Social Media
    "Ecommerce",          // Slide 3: SEO
    "Search Engine",    // Slide 4: Forest Adventure
    "Paid Advertising"        // Slide 5: Desert Sunset
];

// Count-up animation function
function animateCounter(element, target, duration = 2500, delay = 0) {
    return new Promise((resolve) => {
        const timeout = setTimeout(() => {
            const startValue = 0;
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                const currentValue = Math.floor(startValue + (target - startValue) * easeOutCubic);
                
                element.textContent = currentValue + '%';
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target + '%';
                    resolve();
                }
            }
            
            requestAnimationFrame(updateCounter);
        }, delay);
        
        animationTimeouts.push(timeout);
    });
}

// Reset all stat numbers to 0%
function resetStatNumbers() {
    // Clear any pending animations
    animationTimeouts.forEach(timeout => clearTimeout(timeout));
    animationTimeouts = [];
    
    // Reset all stat numbers to 0%
    document.querySelectorAll('.stat-number').forEach(statElement => {
        statElement.textContent = '0%';
    });
    
    isAnimating = false;
}

// Animate stats for the current slide
function animateCurrentSlideStats() {
    if (isAnimating) return;
    
    isAnimating = true;
    const currentCard = cards[currentSlide];
    const statElements = currentCard.querySelectorAll('.stat-number');
    
    // Start all animations simultaneously with no staggered delays
    statElements.forEach((statElement, index) => {
        const target = parseInt(statElement.getAttribute('data-target'));
        const delay = 0; // No delay - all start at the same time
        
        animateCounter(statElement, target, 2500, delay); // Slower animation (2.5 seconds)
    });
}

// Check if slide is fully visible and trigger animation
function checkSlideVisibility() {
    const isDesktop = window.innerWidth >= 768;
    
    if (isDesktop) {
        // On desktop, animate when slide becomes active
        const activeCard = document.querySelector('.stats-slider-card.active');
        if (activeCard === cards[currentSlide]) {
            // Reduced delay for faster initial animation
            setTimeout(() => {
                animateCurrentSlideStats();
            }, 200); // Much faster start
        }
    } else {
        // On mobile, animate immediately as slide is fully visible
        setTimeout(() => {
            animateCurrentSlideStats();
        }, 200); // Much faster start
    }
}

function createNavigation() {
    const isDesktop = window.innerWidth >= 768;
    
    // Clear existing navigation
    dotsContainer.innerHTML = '';
    
    // Create wrapper for navigation elements
    const navWrapper = document.createElement('div');
    navWrapper.className = 'stats-navigation-wrapper';
    
    // Create navigation container (words or dots)
    const navContainer = document.createElement('div');
    navContainer.className = 'stats-slider-dots';
    
    if (isDesktop) {
        // Create word navigation for desktop
        slideWords.forEach((word, index) => {
            const wordButton = document.createElement('button');
            wordButton.className = `stats-slider-word ${index === currentSlide ? 'stats-slider-word--active' : ''}`;
            wordButton.textContent = word;
            wordButton.setAttribute('data-slide', index);
            
            // Add click event
            wordButton.addEventListener('click', () => {
                if (currentSlide !== index) {
                    currentSlide = index;
                    resetStatNumbers();
                    updateSlider();
                }
            });
            
            navContainer.appendChild(wordButton);
        });
    } else {
        // Create dot navigation for mobile
        slideWords.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `stats-slider-dot ${index === currentSlide ? 'stats-slider-dot--active' : ''}`;
            dot.setAttribute('data-slide', index);
            
            // Add click event
            dot.addEventListener('click', () => {
                if (currentSlide !== index) {
                    currentSlide = index;
                    resetStatNumbers();
                    updateSlider();
                }
            });
            
            navContainer.appendChild(dot);
        });
    }
    
    // Create inline arrow navigation
    const arrowsContainer = document.createElement('div');
    arrowsContainer.className = 'stats-arrows-inline';
    
    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'stats-slider-nav stats-slider-nav--prev inline';
    prevBtn.innerHTML = `
        <svg class="stats-slider-nav__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
    `;
    prevBtn.addEventListener('click', () => {
        const newSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
        if (currentSlide !== newSlide) {
            currentSlide = newSlide;
            resetStatNumbers();
            updateSlider();
        }
    });
    
    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'stats-slider-nav stats-slider-nav--next inline';
    nextBtn.innerHTML = `
        <svg class="stats-slider-nav__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
    `;
    nextBtn.addEventListener('click', () => {
        const newSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
        if (currentSlide !== newSlide) {
            currentSlide = newSlide;
            resetStatNumbers();
            updateSlider();
        }
    });
    
    // Assemble the navigation
    arrowsContainer.appendChild(prevBtn);
    arrowsContainer.appendChild(nextBtn);
    
    navWrapper.appendChild(navContainer);
    navWrapper.appendChild(arrowsContainer);
    
    dotsContainer.appendChild(navWrapper);
}

function updateSlider() {
    let translateX = 0;
    const isDesktop = window.innerWidth >= 768;
    
    if (isDesktop) {
        // Desktop layout with partial previews
        const card = cards[0];
        const cardStyle = window.getComputedStyle(card);
        const cardWidthPercent = parseFloat(cardStyle.width) / card.parentElement.offsetWidth * 100;
        const marginLeftPercent = parseFloat(cardStyle.marginLeft) / card.parentElement.offsetWidth * 100;
        const marginRightPercent = parseFloat(cardStyle.marginRight) / card.parentElement.offsetWidth * 100;
        const totalCardWidth = cardWidthPercent + marginLeftPercent + marginRightPercent;
        
        if (currentSlide === 0) {
            translateX = 0;
        } else if (currentSlide === totalSlides - 1) {
            translateX = -((totalSlides - 1) * totalCardWidth - (100 - totalCardWidth));
        } else {
            translateX = -(currentSlide * totalCardWidth - (100 - totalCardWidth) / 2);
        }
        
        // Update card states
        cards.forEach((card, index) => {
            card.classList.remove('active', 'adjacent');
            
            if (index === currentSlide) {
                card.classList.add('active');
            } else if (index === currentSlide - 1 || index === currentSlide + 1) {
                card.classList.add('adjacent');
            }
        });
        
        // Update word navigation
        const words = dotsContainer.querySelectorAll('.stats-slider-word');
        words.forEach((word, index) => {
            word.classList.toggle('stats-slider-word--active', index === currentSlide);
        });
    } else {
        // Mobile layout: full slides
        translateX = -(currentSlide * 100);
        
        // Remove desktop classes on mobile
        cards.forEach(card => {
            card.classList.remove('active', 'adjacent');
        });
        
        // Update dot navigation
        const dots = dotsContainer.querySelectorAll('.stats-slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('stats-slider-dot--active', index === currentSlide);
        });
    }
    
    track.style.transform = `translateX(${translateX}%)`;
    
    // Update counter
    counter.textContent = currentSlide + 1;
    
    // Trigger animation after slide transition
    checkSlideVisibility();
}

// Handle window resize to switch between word and dot navigation
window.addEventListener('resize', () => {
    resetStatNumbers();
    createNavigation();
    updateSlider();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        const newSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
        if (currentSlide !== newSlide) {
            currentSlide = newSlide;
            resetStatNumbers();
            updateSlider();
        }
    }
    if (e.key === 'ArrowRight') {
        const newSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
        if (currentSlide !== newSlide) {
            currentSlide = newSlide;
            resetStatNumbers();
            updateSlider();
        }
    }
});

// Initialize navigation and slider
document.addEventListener('DOMContentLoaded', () => {
    resetStatNumbers();
    createNavigation();
    
    if (window.innerWidth >= 768) {
        cards[0].classList.add('active');
    }
    
    updateSlider();
});