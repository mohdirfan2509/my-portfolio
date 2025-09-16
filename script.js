// ===== GLOBAL VARIABLES =====
let currentTheme = 'dark';
let isScrolling = false;
let scrollTimeout;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===== INITIALIZE APPLICATION =====
function initializeApp() {
    // Initialize theme
    initializeTheme();
    
    // Initialize navbar
    initializeNavbar();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize typewriter effect
    initializeTypewriter();
    
    // Initialize counters
    initializeCounters();
    
    // Initialize progress bars
    initializeProgressBars();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize scroll to top
    initializeScrollToTop();
    
    // Initialize form handling
    initializeFormHandling();
    
    // Initialize projects modals
    initializeProjectsModals();
    
    // Initialize ripple effects
    initializeRippleEffects();
    
    // Initialize AOS
    initializeAOS();
    
    // Initialize click debugging
    initializeClickDebugging();
}


// ===== THEME TOGGLE =====
function initializeTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    
    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
    });
    
    function setTheme(theme) {
        currentTheme = theme;
        body.setAttribute('data-theme', theme);
        
        if (theme === 'light') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }
}

// ===== NAVBAR =====
function initializeNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link
        updateActiveNavLink();
    });
    
    // Nav link hover effects
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Mobile navigation auto-close functionality
    initializeMobileNavAutoClose();
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
}

// ===== MOBILE NAVIGATION AUTO-CLOSE =====
function initializeMobileNavAutoClose() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Function to check if we're on mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Function to close mobile menu
    function closeMobileMenu() {
        if (isMobile() && navbarCollapse && navbarCollapse.classList.contains('show')) {
            // Use Bootstrap's collapse method to close the menu
            if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            } else {
                // Fallback: manually close the menu
                navbarCollapse.classList.remove('show');
                if (navbarToggler) {
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }
            }
        }
    }
    
    // Close menu when clicking/touching outside (mobile only)
    document.addEventListener('click', function(event) {
        if (isMobile() && navbarCollapse && navbarCollapse.classList.contains('show')) {
            const isClickInsideNav = navbarCollapse.contains(event.target) || 
                                   (navbarToggler && navbarToggler.contains(event.target));
            
            if (!isClickInsideNav) {
                closeMobileMenu();
            }
        }
    });
    
    // Close menu when touching outside (for touch devices)
    document.addEventListener('touchstart', function(event) {
        if (isMobile() && navbarCollapse && navbarCollapse.classList.contains('show')) {
            const isTouchInsideNav = navbarCollapse.contains(event.target) || 
                                    (navbarToggler && navbarToggler.contains(event.target));
            
            if (!isTouchInsideNav) {
                closeMobileMenu();
            }
        }
    });
    
    // Handle window resize to ensure functionality works correctly
    window.addEventListener('resize', function() {
        // If resizing from mobile to desktop, ensure menu is closed
        if (!isMobile() && navbarCollapse && navbarCollapse.classList.contains('show')) {
            closeMobileMenu();
        }
    });
    
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // For projects, about, tools, education, and contact sections, scroll to exact top to show full viewport
                let offsetTop;
                if (targetId === '#projects' || targetId === '#about' || targetId === '#tools' || targetId === '#education' || targetId === '#contact') {
                    offsetTop = targetSection.offsetTop;
                } else {
                    offsetTop = targetSection.offsetTop - 80;
                }
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Trigger mobile menu close after navigation (mobile only)
                if (window.innerWidth <= 768) {
                    setTimeout(() => {
                        const navbarCollapse = document.querySelector('.navbar-collapse');
                        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                            if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
                                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                                    toggle: false
                                });
                                bsCollapse.hide();
                            } else {
                                navbarCollapse.classList.remove('show');
                                const navbarToggler = document.querySelector('.navbar-toggler');
                                if (navbarToggler) {
                                    navbarToggler.setAttribute('aria-expanded', 'false');
                                }
                            }
                        }
                    }, 200);
                }
            }
        });
    });
}

// ===== TYPEWRITER EFFECT =====
function initializeTypewriter() {
    const typingElement = document.querySelector('.typing-text');
    
    if (typingElement) {
        const roles = [
            'Frontend Developer',
            'Data Science Aspirant',
            'Aspiring Full Stack Dev',
            'Aspiring AI & ML Engineer',
            'CP Enthusiast'
        ];
        
        let currentRoleIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;
        
        function typeWriter() {
            const currentRole = roles[currentRoleIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typeSpeed = 50;
            } else {
                typingElement.textContent = currentRole.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typeSpeed = 100;
            }
            
            if (!isDeleting && currentCharIndex === currentRole.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                typeSpeed = 500;
            }
            
            setTimeout(typeWriter, typeSpeed);
        }
        
        // Start typewriter effect after a delay
        setTimeout(typeWriter, 1000);
    }
}

// ===== COUNTER ANIMATION =====
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        // Check if this is the hackathons counter (no + symbol)
        const isHackathonsCounter = counter.closest('.stat-item').querySelector('.stat-label').textContent.includes('Hackathons Participated');
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + (isHackathonsCounter ? '' : '+');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (isHackathonsCounter ? '' : '+');
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ===== PROGRESS BARS =====
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const animateProgressBar = (progressBar) => {
        const width = progressBar.getAttribute('data-width');
        progressBar.style.width = width + '%';
    };
    
    // Intersection Observer for progress bars
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    animateProgressBar(entry.target);
                }, 500);
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(progressBar => {
        progressObserver.observe(progressBar);
    });
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.particles');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // Floating animation for profile image
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        let floatDirection = 1;
        setInterval(() => {
            const currentTransform = profileImage.style.transform || 'translateY(0px)';
            const currentY = parseFloat(currentTransform.match(/translateY\(([^)]+)\)/)?.[1] || 0);
            const newY = currentY + (floatDirection * 0.5);
            
            if (newY > 10) floatDirection = -1;
            if (newY < -10) floatDirection = 1;
            
            profileImage.style.transform = `translateY(${newY}px)`;
        }, 100);
    }
}

// ===== SCROLL TO TOP =====
function initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== FORM HANDLING =====
function initializeFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        // Initialize EmailJS
        emailjs.init('DVLSwlOajGqQjUXiz');; // Replace with your actual public key
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            
            // Validate form
            if (!validateForm(this)) {
                return;
            }
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Prepare email parameters
            const emailParams = {
                from_name: formData.get('name') || this.querySelector('input[placeholder*="Name"]').value,
                from_email: formData.get('email') || this.querySelector('input[placeholder*="Email"]').value,
                subject: formData.get('subject') || this.querySelector('input[placeholder*="Subject"]').value,
                message: formData.get('message') || this.querySelector('textarea[placeholder*="Message"]').value
            };
            
            // Send email using EmailJS
            emailjs.send('service_whgt0uj', 'template_gaaakxc', emailParams) // Replace with your actual IDs
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, function(error) {
                    console.log('FAILED...', error);
                    showNotification('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        });
        
        // Form input focus effects
        const formInputs = contactForm.querySelectorAll('.form-control');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    }
}

// ===== FORM VALIDATION =====
function validateForm(form) {
    const nameInput = form.querySelector('input[placeholder*="Name"]');
    const emailInput = form.querySelector('input[placeholder*="Email"]');
    const subjectInput = form.querySelector('input[placeholder*="Subject"]');
    const messageInput = form.querySelector('textarea[placeholder*="Message"]');
    
    let isValid = true;
    
    // Clear previous error states
    clearFormErrors(form);
    
    // Validate name
    if (!nameInput.value.trim()) {
        showFieldError(nameInput, 'Name is required');
        isValid = false;
    }
    
    // Validate email
    if (!emailInput.value.trim()) {
        showFieldError(emailInput, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        showFieldError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate subject
    if (!subjectInput.value.trim()) {
        showFieldError(subjectInput, 'Subject is required');
        isValid = false;
    }
    
    // Validate message
    if (!messageInput.value.trim()) {
        showFieldError(messageInput, 'Message is required');
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        showFieldError(messageInput, 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(input, message) {
    const parent = input.parentElement;
    parent.classList.add('error');
    
    // Remove existing error message
    const existingError = parent.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    parent.appendChild(errorDiv);
}

function clearFormErrors(form) {
    const errorFields = form.querySelectorAll('.error');
    errorFields.forEach(field => {
        field.classList.remove('error');
        const errorMessage = field.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    });
}

// ===== PROJECTS MODALS =====
function initializeProjectsModals() {
    const projectsCards = document.querySelectorAll('.projects-card');
    
    projectsCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.projects-overlay h3').textContent;
            const description = this.querySelector('.projects-overlay p').textContent;
            
            showProjectsModal(title, description);
        });
    });
}

function showProjectsModal(title, description) {
    // Create modal HTML
    const modalHTML = `
        <div class="projects-modal-overlay" id="projectsModal">
            <div class="projects-modal">
                <div class="projects-modal-header">
                    <h3>${title}</h3>
                    <button class="projects-modal-close">&times;</button>
                </div>
                <div class="projects-modal-body">
                    <p>${description}</p>
                    <div class="projects-modal-actions">
                        <button class="btn btn-primary">View Live Demo</button>
                        <button class="btn btn-outline-primary">View Code</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('projectsModal');
    const closeBtn = modal.querySelector('.projects-modal-close');
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Close modal events
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// ===== RIPPLE EFFECTS =====
function initializeRippleEffects() {
    const buttons = document.querySelectorAll('.btn:not(.btn-contact):not(.social-link)');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ===== AOS INITIALIZATION =====
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
}

// ===== CLICK DEBUGGING =====
function initializeClickDebugging() {
    // Log contact button clicks for debugging
    const contactBtn = document.querySelector('.btn-contact');
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            console.log('Contact button clicked (mailto will trigger).');
        });
    }
    
    // Log social link clicks for debugging
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Social link clicked:', this.href);
            // Let native <a> handle navigation
        });
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Throttle scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations and effects
    updateNavbarOnScroll();
    updateScrollToTopButton();
}, 16));

function updateNavbarOnScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

function updateScrollToTopButton() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}

// ===== ADDITIONAL CSS FOR MODALS AND NOTIFICATIONS =====
const additionalStyles = `
    /* Projects Modal Styles */
    .projects-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease-in-out;
        pointer-events: none;
    }
    
    .projects-modal-overlay.show {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
    }
    
    .projects-modal {
        background: var(--bg-glass);
        backdrop-filter: blur(20px);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius-lg);
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        transform: scale(0.8);
        transition: transform 0.3s ease-in-out;
    }
    
    .projects-modal-overlay.show .projects-modal {
        transform: scale(1);
    }
    
    .projects-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }
    
    .projects-modal-header h3 {
        color: var(--text-primary);
        margin: 0;
    }
    
    .projects-modal-close {
        background: none;
        border: none;
        color: var(--text-secondary);
        font-size: 1.5rem;
        cursor: pointer;
        transition: var(--transition);
    }
    
    .projects-modal-close:hover {
        color: var(--text-primary);
    }
    
    .projects-modal-body p {
        color: var(--text-secondary);
        margin-bottom: 1.5rem;
        line-height: 1.6;
    }
    
    .projects-modal-actions {
        display: flex;
        gap: 1rem;
    }
    
    /* Notification Styles */
    .notification {
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: var(--bg-glass);
        backdrop-filter: blur(20px);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        padding: 1rem 1.5rem;
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        border-left: 4px solid #10b981;
    }
    
    .notification-error {
        border-left: 4px solid #ef4444;
    }
    
    .notification-info {
        border-left: 4px solid var(--primary-color);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--text-primary);
    }
    
    .notification-content i {
        color: #10b981;
    }
    
    /* Ripple Effect */
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* Loading States */
    .btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    .fa-spinner {
        animation: spin 1s linear infinite;
    }
    
    /* Focus States */
    .form-control:focus {
        outline: none;
        box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25);
    }
    
    /* Hover Effects for Cards */
    .service-card:hover,
    .projects-card:hover,
    .timeline-content:hover {
        transform: translateY(-5px);
    }
    
    /* Smooth Transitions */
    * {
        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// ===== CONTACT LINK HANDLING =====
function handleContactClick(event) {
    event.preventDefault();
    
    const userAgent = navigator.userAgent.toLowerCase();
    const isChrome = userAgent.includes('chrome') && !userAgent.includes('edg');
    const isFirefox = userAgent.includes('firefox');
    const isSafari = userAgent.includes('safari') && !userAgent.includes('chrome');
    const isEdge = userAgent.includes('edg');
    
    const email = 'mohammadirfan25092004@gmail.com';
    const subject = 'Portfolio Inquiry';
    const body = 'Hi Mohammad,\n\nI came across your portfolio and would like to connect with you.\n\nBest regards,';
    
    // Try to detect if Gmail app is available
    const gmailAppUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    if (isChrome) {
        // For Chrome, try Gmail web interface first
        window.open(gmailAppUrl, '_blank');
    } else if (isFirefox) {
        // For Firefox, use Gmail web interface
        window.open(gmailAppUrl, '_blank');
    } else if (isSafari) {
        // For Safari, try Gmail web interface
        window.open(gmailAppUrl, '_blank');
    } else if (isEdge) {
        // For Edge, use Gmail web interface
        window.open(gmailAppUrl, '_blank');
    } else {
        // Fallback to mailto for other browsers
        const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoUrl;
    }
}

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
window.ProjectsApp = {
    showNotification,
    showProjectsModal,
    handleContactClick,
    setTheme: (theme) => {
        currentTheme = theme;
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
};
