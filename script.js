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
    // Initialize loader
    initializeLoader();
    
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

// ===== LOADER =====
function initializeLoader() {
    const loader = document.getElementById('loader');
    
    // Hide loader after page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Remove loader from DOM after animation
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1500);
    });
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
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
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
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                showNotification('Message sent successfully!', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
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
    // Force contact button to work
    const contactBtn = document.querySelector('.btn-contact');
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            console.log('Contact button clicked!', e);
            // Force open email client
            window.location.href = 'mailto:mohammadirfan25092004@gmail.com';
        });
    }
    
    // Force social links to work
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Social link clicked!', this.href, e);
            // Force open link
            if (this.href) {
                window.open(this.href, '_blank');
            }
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
    }
    
    .projects-modal-overlay.show {
        opacity: 1;
        visibility: visible;
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

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
window.ProjectsApp = {
    showNotification,
    showProjectsModal,
    setTheme: (theme) => {
        currentTheme = theme;
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
};
