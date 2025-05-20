/*
==============================================
GOWRIS HOMESTAY - Enhanced Vibrant JavaScript
==============================================
*/

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Import fonts from Google for the vibrant elegant design
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600;700&family=Cormorant+Garamond:wght@400;500;600;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    
    // Enhance hero heading with decorative elements
    const heroHeading = document.querySelector('.hero-content h1');
    if (heroHeading) {
        // Add decorative elements before and after the heading
        const decorBefore = document.createElement('span');
        decorBefore.className = 'hero-decor before';
        decorBefore.innerHTML = '✦';
        
        const decorAfter = document.createElement('span');
        decorAfter.className = 'hero-decor after';
        decorAfter.innerHTML = '✦';
        
        // Insert the decorative elements
        heroHeading.insertBefore(decorBefore, heroHeading.firstChild);
        heroHeading.appendChild(decorAfter);
        
        // Apply enhanced styling to hero heading
        heroHeading.style.fontFamily = 'var(--font-hero)';
        heroHeading.style.textTransform = 'uppercase';
        heroHeading.style.letterSpacing = '3px';
        heroHeading.style.fontWeight = '600';
        heroHeading.style.position = 'relative';
        
        // Add custom CSS for hero decorations
        const styleEl = document.createElement('style');
        styleEl.textContent = `
            .hero-decor {
                color: var(--accent-color);
                display: inline-block;
                margin: 0 15px;
                font-size: 1.5rem;
                animation: pulse-gold 2s infinite ease-in-out;
                vertical-align: middle;
            }
            
            @keyframes pulse-gold {
                0% { opacity: 0.6; transform: scale(0.8); }
                50% { opacity: 1; transform: scale(1.2); }
                100% { opacity: 0.6; transform: scale(0.8); }
            }
            
            .hero-content h1 {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 30px;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 0, 0, 0.2);
            }
        `;
        document.head.appendChild(styleEl);
    }
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile nav when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Enhanced Lightbox Gallery Implementation
    const galleryImages = document.querySelectorAll('.gallery-image');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    // Variables to track current image index
    let currentImageIndex = 0;
    const totalImages = galleryImages.length;
    
    // Create lightbox navigation controls
    if (lightbox && totalImages > 1) {
        // Create the controls container if it doesn't exist
        if (!document.querySelector('.lightbox-controls')) {
            const controlsDiv = document.createElement('div');
            controlsDiv.className = 'lightbox-controls';
            
            // Create previous button
            const prevBtn = document.createElement('div');
            prevBtn.className = 'lightbox-nav prev-image';
            prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
            
            // Create next button
            const nextBtn = document.createElement('div');
            nextBtn.className = 'lightbox-nav next-image';
            nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
            
            // Append buttons to controls
            controlsDiv.appendChild(prevBtn);
            controlsDiv.appendChild(nextBtn);
            
            // Append controls to lightbox
            lightbox.appendChild(controlsDiv);
            
            // Add event listeners for navigation
            prevBtn.addEventListener('click', navigatePrev);
            nextBtn.addEventListener('click', navigateNext);
        }
    }

    // Function to navigate to previous image
    function navigatePrev(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
        updateLightboxContent();
    }

    // Function to navigate to next image
    function navigateNext(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % totalImages;
        updateLightboxContent();
    }

    // Function to update lightbox content
    function updateLightboxContent() {
        if (galleryImages[currentImageIndex]) {
            lightboxImg.src = galleryImages[currentImageIndex].src;
            lightboxCaption.textContent = galleryImages[currentImageIndex].alt;
        }
    }

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox && lightbox.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                navigatePrev(e);
            } else if (e.key === 'ArrowRight') {
                navigateNext(e);
            } else if (e.key === 'Escape') {
                lightbox.style.display = 'none';
                lightbox.classList.remove('active');
            }
        }
    });

    if (galleryImages.length > 0) {
        galleryImages.forEach((image, index) => {
            image.addEventListener('click', function() {
                currentImageIndex = index;
                lightbox.style.display = 'block';
                setTimeout(() => {
                    lightbox.classList.add('active');
                }, 10);
                lightboxImg.src = this.src;
                lightboxCaption.textContent = this.alt;
            });
        });
    }

    if (closeLightbox) {
        closeLightbox.addEventListener('click', function(e) {
            e.stopPropagation();
            lightbox.classList.remove('active');
            setTimeout(() => {
                lightbox.style.display = 'none';
            }, 300);
        });
    }

    // Close lightbox when clicking outside the image
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                lightbox.classList.remove('active');
                setTimeout(() => {
                    lightbox.style.display = 'none';
                }, 300);
            }
        });
    }

    // Add smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate header height for accurate scrolling
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show/hide navbar based on scroll direction
        if (currentScroll > lastScrollTop && currentScroll > 200) {
            // Scrolling down & past threshold
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up or at top
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        
        // Adjust navbar background opacity based on scroll position
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
            navbar.style.borderBottom = '1px solid rgba(212, 166, 74, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            navbar.style.boxShadow = 'none';
            navbar.style.borderBottom = '1px solid rgba(212, 166, 74, 0.05)';
        }
    });
    
    // Add scroll-to-top button
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll-to-top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add animation classes to elements when they come into view
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    // Observer callback function
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.dataset.delay || 0;
                
                setTimeout(() => {
                    if (el.dataset.animation) {
                        el.classList.add(el.dataset.animation);
                    } else {
                        el.classList.add('animate-fade-in');
                    }
                    el.classList.add('animated');
                }, delay);
                
                // Unobserve after animation
                observer.unobserve(el);
            }
        });
    };
    
    // Set up intersection observer
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver(animateOnScroll, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        // Observe all elements with animation classes
        if (animateElements.length > 0) {
            animateElements.forEach(el => {
                animationObserver.observe(el);
            });
        }
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        animateElements.forEach(el => {
            el.classList.add('animated');
            if (el.dataset.animation) {
                el.classList.add(el.dataset.animation);
            } else {
                el.classList.add('animate-fade-in');
            }
        });
    }
    
    // Add lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const lazyLoadImage = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.addEventListener('load', () => {
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                    });
                    observer.unobserve(img);
                }
            });
        };
        
        const imageObserver = new IntersectionObserver(lazyLoadImage, {
            root: null,
            threshold: 0,
            rootMargin: '200px'
        });
        
        if (lazyImages.length > 0) {
            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        }
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }

    // Enhanced interactive elements for better user experience
    
    // Animate service cards on hover with more vivid effects
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0) {
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1.3) rotateY(180deg)';
                    icon.style.color = 'var(--primary-color)';
                    
                    setTimeout(() => {
                        icon.style.transform = 'scale(1.3) rotateY(0deg)';
                    }, 300);
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = '';
                    icon.style.color = '';
                }
            });
        });
    }
    
    // Add parallax effect to hero sections with enhanced depth
    const heroSection = document.querySelector('.hero');
    const propertyHero = document.querySelector('.property-hero');
    
    function parallaxEffect() {
        if (heroSection) {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = `calc(50% + ${scrollPosition * 0.5}px)`;
        }
        
        if (propertyHero) {
            const scrollPosition = window.pageYOffset;
            propertyHero.style.backgroundPositionY = `calc(50% + ${scrollPosition * 0.4}px)`;
        }
    }
    
    // Only enable parallax on non-mobile devices
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', parallaxEffect);
    }
    
    // Enhance amenity icons with vibrant animations
    const amenities = document.querySelectorAll('.amenity');
    if (amenities.length > 0) {
        amenities.forEach(amenity => {
            amenity.addEventListener('mouseenter', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.color = 'var(--primary-color)';
                    icon.classList.add('fa-beat');
                    setTimeout(() => {
                        icon.classList.remove('fa-beat');
                    }, 800);
                }
            });
            
            amenity.addEventListener('mouseleave', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.color = '';
                }
            });
        });
    }

    // Add "active" class to current page link in navbar
    const currentLocation = window.location.pathname;
    const navLinks2 = document.querySelectorAll('.nav-links a');
    
    navLinks2.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Check if it's the current page
        if (currentLocation.includes(linkPath) && linkPath !== '#') {
            link.classList.add('active-link');
        } else if (currentLocation.endsWith('/') && linkPath === 'index.html') {
            link.classList.add('active-link');
        } else if (linkPath.startsWith('#') && currentLocation.endsWith('index.html') || currentLocation.endsWith('/')) {
            // Handle anchor links on index page
            link.classList.add('index-link');
        }
    });

    // Enhance book now button with vibrant pulse animation
    const bookNowBtn = document.querySelector('.book-now-btn');
    if (bookNowBtn) {
        setInterval(() => {
            bookNowBtn.classList.add('pulse-animation');
            setTimeout(() => {
                bookNowBtn.classList.remove('pulse-animation');
            }, 1000);
        }, 3000);
    }

    // Add hover effect to social icons with enhanced visual feedback
    const socialIcons = document.querySelectorAll('.social-icon');
    if (socialIcons.length > 0) {
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.1)';
                
                // Add a slight rotate effect
                setTimeout(() => {
                    this.style.transform = 'translateY(-5px) scale(1.1) rotate(5deg)';
                }, 150);
                
                setTimeout(() => {
                    this.style.transform = 'translateY(-5px) scale(1.1) rotate(-5deg)';
                }, 300);
                
                setTimeout(() => {
                    this.style.transform = 'translateY(-5px) scale(1.1) rotate(0deg)';
                }, 450);
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    // Add elegant decoration elements to sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        // Add decoration only to certain sections
        if (!section.classList.contains('contact') && !section.classList.contains('property-about') && !section.classList.contains('property-gallery')) {
            const decoration = document.createElement('div');
            decoration.className = 'section-decoration';
            decoration.innerHTML = '<svg width="40" height="40" viewBox="0 0 40 40"><path d="M20 0L20 40M0 20L40 20" stroke="rgba(212, 166, 74, 0.4)" stroke-width="1"/></svg>';
            section.appendChild(decoration);
        }
    });

    // Add date-based greeting to hero section on homepage with more vibrant styling
    const heroContentP = document.querySelector('.hero-content p');
    if (heroContentP && (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/'))) {
        const now = new Date();
        const hour = now.getHours();
        let greeting;
        
        if (hour < 12) {
            greeting = 'Good morning! Start your day in Munnar';
        } else if (hour < 18) {
            greeting = 'Good afternoon! Discover Munnar\'s beauty';
        } else {
            greeting = 'Good evening! Unwind in Munnar\'s serenity';
        }
        
        // Apply the greeting with enhanced animation
        heroContentP.innerHTML = greeting;
        heroContentP.style.animation = 'slideInRight 1s ease forwards, glowText 3s infinite alternate';
    }

    // Add elegant hover effect to property cards with enhanced visual feedback
    const propertyCards = document.querySelectorAll('.property-card');
    if (propertyCards.length > 0) {
        propertyCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.querySelector('h3').style.color = 'var(--accent-color)';
                
                // Add corner decorations on hover
                if (!this.querySelector('.property-card-corner')) {
                    // Add decorative corners
                    const cornerTopLeft = document.createElement('div');
                    cornerTopLeft.className = 'property-card-corner top-left';
                    
                    const cornerBottomRight = document.createElement('div');
                    cornerBottomRight.className = 'property-card-corner bottom-right';
                    
                    this.appendChild(cornerTopLeft);
                    this.appendChild(cornerBottomRight);
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.querySelector('h3').style.color = '';
                
                // Remove corners on mouse leave
                const corners = this.querySelectorAll('.property-card-corner');
                corners.forEach(corner => {
                    corner.remove();
                });
            });
        });
    }

    // Add custom CSS animations and decorative elements
    const styleEl = document.createElement('style');
    styleEl.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(30px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes glowText {
            0% { text-shadow: 0 0 5px rgba(212, 166, 74, 0.1); }
            100% { text-shadow: 0 0 15px rgba(212, 166, 74, 0.4), 0 0 30px rgba(255, 255, 255, 0.2); }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 4px 10px rgba(212, 166, 74, 0.3); }
            50% { transform: scale(1.05); box-shadow: 0 6px 15px rgba(212, 166, 74, 0.5); }
            100% { transform: scale(1); box-shadow: 0 4px 10px rgba(212, 166, 74, 0.3); }
        }
        
        .pulse-animation {
            animation: pulse 1s ease;
        }
        
        .active-link {
            color: var(--accent-color) !important;
            font-weight: bold !important;
        }
        
        .active-link::after {
            width: 100% !important;
            background-color: var(--accent-color) !important;
        }
        
        .section-decoration {
            position: absolute;
            bottom: -20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1;
            opacity: 0.7;
        }
        
        .property-card-corner {
            position: absolute;
            width: 40px;
            height: 40px;
            transition: all 0.5s ease;
            z-index: 3;
        }
        
        .property-card-corner.top-left {
            top: 15px;
            left: 15px;
            border-top: 2px solid var(--accent-color);
            border-left: 2px solid var(--accent-color);
            animation: expand 0.5s forwards;
        }
        
        .property-card-corner.bottom-right {
            bottom: 15px;
            right: 15px;
            border-bottom: 2px solid var(--accent-color);
            border-right: 2px solid var(--accent-color);
            animation: expand 0.5s forwards;
        }
        
        @keyframes expand {
            from { width: 0; height: 0; opacity: 0; }
            to { width: 40px; height: 40px; opacity: 1; }
        }
    `;
    document.head.appendChild(styleEl);
});
// Slideshow functionality
const slideshowSlides = document.querySelectorAll('.slideshow-slide');
const slideshowDots = document.querySelectorAll('.slideshow-dot');
const prevArrow = document.querySelector('.slideshow-arrow.prev');
const nextArrow = document.querySelector('.slideshow-arrow.next');
let currentSlide = 0;
let slideshowInterval;

// Function to change slide
function goToSlide(slideIndex) {
    // Remove active class from all slides and dots
    slideshowSlides.forEach(slide => slide.classList.remove('active'));
    slideshowDots.forEach(dot => dot.classList.remove('active'));
    
    // Set current slide index
    currentSlide = slideIndex;
    if (currentSlide < 0) currentSlide = slideshowSlides.length - 1;
    if (currentSlide >= slideshowSlides.length) currentSlide = 0;
    
    // Activate current slide and dot
    slideshowSlides[currentSlide].classList.add('active');
    slideshowDots[currentSlide].classList.add('active');
}

// Next slide function
function nextSlide() {
    goToSlide(currentSlide + 1);
}

// Previous slide function
function prevSlide() {
    goToSlide(currentSlide - 1);
}

// Start automatic slideshow
function startSlideshow() {
    slideshowInterval = setInterval(nextSlide, 5000);
}

// Stop automatic slideshow
function stopSlideshow() {
    clearInterval(slideshowInterval);
}

// Event listeners for manual navigation
if (slideshowDots.length > 0) {
    slideshowDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopSlideshow();
            goToSlide(index);
            startSlideshow();
        });
    });
}

if (prevArrow) {
    prevArrow.addEventListener('click', function() {
        stopSlideshow();
        prevSlide();
        startSlideshow();
    });
}

if (nextArrow) {
    nextArrow.addEventListener('click', function() {
        stopSlideshow();
        nextSlide();
        startSlideshow();
    });
}

// Pause slideshow on hover
const slideshowContainer = document.querySelector('.slideshow-container');
if (slideshowContainer) {
    slideshowContainer.addEventListener('mouseenter', stopSlideshow);
    slideshowContainer.addEventListener('mouseleave', startSlideshow);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        stopSlideshow();
        prevSlide();
        startSlideshow();
    } else if (e.key === 'ArrowRight') {
        stopSlideshow();
        nextSlide();
        startSlideshow();
    }
});

// Start the slideshow
startSlideshow();