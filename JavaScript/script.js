document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    //Nav-item select effect
    const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      // Remove .active from all links
      navLinks.forEach(l => l.classList.remove('active'));
      // Add .active to the clicked one
      this.classList.add('active');
    });
  });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.navbar-menu-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
        });
    }
    
    // Hero slider
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    function initHeroSlider() {
        if (heroSlides.length > 0) {
            heroSlides[0].classList.add('active');
            setInterval(nextHeroSlide, 5000);
        }
    }
    
    function nextHeroSlide() {
        heroSlides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % heroSlides.length;
        heroSlides[currentSlide].classList.add('active');
    }
    
    initHeroSlider();
    
   // Modern Life section image slider
const imageSlides = document.querySelectorAll('.image-slider .slide');
const prevBtn = document.querySelector('.slider-controls .prev-slide');
const nextBtn = document.querySelector('.slider-controls .next-slide');
let currentImageSlide = 0;

function initImageSlider() {
    if (imageSlides.length > 0) {
        imageSlides[0].classList.add('active');

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', prevImageSlide);
            nextBtn.addEventListener('click', nextImageSlide);
        }
    }
}

function prevImageSlide() {
    imageSlides[currentImageSlide].classList.remove('active');
    currentImageSlide = (currentImageSlide - 1 + imageSlides.length) % imageSlides.length;
    imageSlides[currentImageSlide].classList.add('active');
}

function nextImageSlide() {
    imageSlides[currentImageSlide].classList.remove('active');
    currentImageSlide = (currentImageSlide + 1) % imageSlides.length;
    imageSlides[currentImageSlide].classList.add('active');
}

initImageSlider();
 
    // Activities Gallery Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'block';
                } else if (item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.dot');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;
    
    function initTestimonialSlider() {
        if (testimonialSlides.length > 0) {
            showTestimonial(0);
            
            if (testimonialPrev && testimonialNext) {
                testimonialPrev.addEventListener('click', prevTestimonial);
                testimonialNext.addEventListener('click', nextTestimonial);
            }
            
            testimonialDots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    showTestimonial(index);
                });
            });
        }
    }
    
    function showTestimonial(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        testimonialSlides[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    function prevTestimonial() {
        const newIndex = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
        showTestimonial(newIndex);
    }
    
    function nextTestimonial() {
        const newIndex = (currentTestimonial + 1) % testimonialSlides.length;
        showTestimonial(newIndex);
    }
    
    initTestimonialSlider();
    
    // Modal functionality
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal && modalOverlay) {
                modalOverlay.classList.add('active');
                
                // Prevent body scrolling when modal is open
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }
    
    function closeModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            
            // Re-enable body scrolling
            document.body.style.overflow = '';
        }
    }
    
    // Handle ESC key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Lightbox functionality
    const galleryImages = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    let currentLightboxIndex = 0;
    const lightboxImages = [];
    
    // Collect all gallery images data
    galleryImages.forEach((item, index) => {
        const img = item.querySelector('img');
        const caption = item.querySelector('.item-overlay h3')?.textContent || '';
        
        if (img) {
            lightboxImages.push({
                src: img.getAttribute('src'),
                caption: caption
            });
            
            item.addEventListener('click', function() {
                openLightbox(index);
            });
        }
    });
    
    function openLightbox(index) {
        if (lightbox && lightboxImage && lightboxCaption) {
            currentLightboxIndex = index;
            
            updateLightboxContent();
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function updateLightboxContent() {
        if (lightboxImages.length > 0) {
            const currentImage = lightboxImages[currentLightboxIndex];
            lightboxImage.setAttribute('src', currentImage.src);
            lightboxCaption.textContent = currentImage.caption;
        }
    }
    
    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    function prevLightboxImage() {
        currentLightboxIndex = (currentLightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
        updateLightboxContent();
    }
    
    function nextLightboxImage() {
        currentLightboxIndex = (currentLightboxIndex + 1) % lightboxImages.length;
        updateLightboxContent();
    }
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', prevLightboxImage);
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', nextLightboxImage);
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                closeLightbox();
            }
        });
    }
    
    // Handle keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                prevLightboxImage();
            } else if (e.key === 'ArrowRight') {
                nextLightboxImage();
            }
        }
    });
    
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('slide-up');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on initial load
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (navbarMenu.classList.contains('active')) {
                        navbarMenu.classList.remove('active');
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - navbar.offsetHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Form validation
    const bookingForm = document.querySelector('.booking-form form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredInputs = bookingForm.querySelectorAll('[required]');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            // Email validation
            const emailInput = bookingForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailInput.value)) {
                    isValid = false;
                    emailInput.classList.add('error');
                }
            }
            
            if (isValid) {
                // Success message or form submission
                alert('Form submitted successfully!');
                bookingForm.reset();
            } else {
                // Show error message
                alert('Please fill all required fields correctly.');
            }
        });
        
        // Clear error state on input
        bookingForm.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
            });
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            let isValid = true;
            
            if (!emailInput.value.trim()) {
                isValid = false;
            } else {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailInput.value)) {
                    isValid = false;
                }
            }
            
            if (isValid) {
                // Success message or form submission
                alert('Thank you for subscribing!');
                newsletterForm.reset();
            } else {
                // Show error message
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Video backgrounds - if using <video> tags
    const videos = document.querySelectorAll('.video-background video');
    
    videos.forEach(video => {
        video.muted = true;
        video.loop = true;
        video.play().catch(error => {
            // Handle autoplay restrictions
            console.log('Video autoplay error:', error);
            
            // Create a play button overlay
            const playButton = document.createElement('button');
            playButton.classList.add('video-play-button');
            playButton.innerHTML = '<i class="fa fa-play"></i>';
            video.parentNode.appendChild(playButton);
            
            playButton.addEventListener('click', () => {
                video.play();
                playButton.style.display = 'none';
            });
        });
    });
    
    // Lazy loading images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    function lazyLoad() {
        const options = {
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, options);
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        lazyLoad();
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.getAttribute('data-src');
            img.classList.add('loaded');
        });
    }
    
    // Countdown timer for special offers
    const countdownElement = document.querySelector('.countdown-timer');
    
    if (countdownElement) {
        // Set the date we're counting down to
        const countDownDate = new Date(countdownElement.getAttribute('data-end-date')).getTime();
        
        // Update the countdown every 1 second
        const countdownTimer = setInterval(function() {
            // Get today's date and time
            const now = new Date().getTime();
            
            // Find the distance between now and the countdown date
            const distance = countDownDate - now;
            
            // Time calculations for days, hours, minutes and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Display the result
            countdownElement.innerHTML = `
                <div class="countdown-item">
                    <span class="count">${days}</span>
                    <span class="label">Days</span>
                </div>
                <div class="countdown-item">
                    <span class="count">${hours}</span>
                    <span class="label">Hours</span>
                </div>
                <div class="countdown-item">
                    <span class="count">${minutes}</span>
                    <span class="label">Minutes</span>
                </div>
                <div class="countdown-item">
                    <span class="count">${seconds}</span>
                    <span class="label">Seconds</span>
                </div>
            `;
            
            // If the countdown is finished, clear interval and display message
            if (distance < 0) {
                clearInterval(countdownTimer);
                countdownElement.innerHTML = "<p>The offer has expired!</p>";
            }
        }, 1000);
    }
    
    // Weather widget
    const weatherWidget = document.querySelector('.weather-widget');
    
    if (weatherWidget) {
        const apiKey = weatherWidget.getAttribute('data-api-key');
        const location = weatherWidget.getAttribute('data-location');
        
        if (apiKey && location) {
            fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`)
                .then(response => response.json())
                .then(data => {
                    weatherWidget.innerHTML = `
                        <div class="weather-info">
                            <div class="weather-icon">
                                <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
                            </div>
                            <div class="weather-details">
                                <h3>${data.location.name}</h3>
                                <p class="temp">${data.current.temp_c}°C</p>
                                <p class="condition">${data.current.condition.text}</p>
                            </div>
                        </div>
                    `;
                })
                .catch(error => {
                    console.error('Weather API error:', error);
                    weatherWidget.innerHTML = '<p>Weather information unavailable</p>';
                });
        }
    }
    
    // Interactive map
    const mapElement = document.getElementById('location-map');
    
    if (mapElement && typeof google !== 'undefined' && google.maps) {
        const latitude = parseFloat(mapElement.getAttribute('data-lat'));
        const longitude = parseFloat(mapElement.getAttribute('data-lng'));
        
        if (!isNaN(latitude) && !isNaN(longitude)) {
            const mapOptions = {
                center: { lat: latitude, lng: longitude },
                zoom: 14,
                styles: [
                    // Custom map styles
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [{"color": "#f5f5f5"}, {"lightness": 20}]
                    }
                    // Additional map styles can be added here
                ]
            };
            
            const map = new google.maps.Map(mapElement, mapOptions);
            
            // Add marker
            new google.maps.Marker({
                position: { lat: latitude, lng: longitude },
                map: map,
                title: 'Our Location',
                animation: google.maps.Animation.DROP
            });
        }
    }
    
    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active', !isActive);
            });
        }
    });
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Initialize AOS (Animate on Scroll) if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
    
    // Theme switcher
    const themeSwitcher = document.querySelector('.theme-switch');
    
    if (themeSwitcher) {
        // Check for saved theme preference or system preference
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
            document.body.classList.add('dark-theme');
            themeSwitcher.checked = true;
        }
        
        themeSwitcher.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // Parallax effect
    const parallaxElements = document.querySelectorAll('.parallax');
    
    function updateParallax() {
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(window.scrollY * speed);
            element.style.backgroundPosition = `center ${yPos}px`;
        });
    }
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', updateParallax);
        updateParallax(); // Initialize on page load
    }
    
    // Custom cursor
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    
    if (cursor && cursorDot) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });
        
        // Add hover effect
        const hoverElements = document.querySelectorAll('a, button, .hoverable');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('expanded');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('expanded');
            });
        });
    }
});