// ========================================
// MOBILE MENU TOGGLE
// ========================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// ========================================
// SMOOTH SCROLL & ACTIVE NAV HIGHLIGHTING
// ========================================

const sections = document.querySelectorAll('section');

function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ========================================
// SCROLL ANIMATIONS (FADE-IN EFFECT)
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in class to sections and cards
const elementsToObserve = [
    ...document.querySelectorAll('section'),
    ...document.querySelectorAll('.project-card'),
    ...document.querySelectorAll('.experience-card'),
    ...document.querySelectorAll('.testimonial-card'),
    ...document.querySelectorAll('.skill-badge')
];

elementsToObserve.forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// ========================================
// SCROLL TO TOP BUTTON (Optional Enhancement)
// ========================================

let scrollToTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        if (!scrollToTopBtn) {
            scrollToTopBtn = document.createElement('button');
            scrollToTopBtn.className = 'scroll-to-top';
            scrollToTopBtn.innerHTML = '↑';
            document.body.appendChild(scrollToTopBtn);
            
            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
        scrollToTopBtn.style.display = 'block';
    } else if (scrollToTopBtn) {
        scrollToTopBtn.style.display = 'none';
    }
});

// ========================================
// PARALLAX EFFECT (Optional Enhancement)
// ========================================

function parallax() {
    const scrollPosition = window.pageYOffset;
    const heroImage = document.querySelector('.profile-img');
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
}

window.addEventListener('scroll', parallax);

// ========================================
// CV DOWNLOAD HANDLER
// ========================================

const cvBtn = document.querySelector('.cv-btn');
if (cvBtn) {
    cvBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.open('resume.pdf', '_blank');
    });
}

// ========================================
// PROJECT LINK HANDLERS
// ========================================

const projectLinks = document.querySelectorAll('.project-link');
projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') {
            e.preventDefault();
            alert('Project link not configured. Update the HTML with actual project URLs.');
        }
    });
});

// ========================================
// PAGE LOAD ANIMATION
// ========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ========================================
// FORM SUBMISSION (If you add a contact form)
// ========================================

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Here you would send the data to your backend or email service
        // For now, just show a success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// ========================================
// UTILITY: Check if element is in viewport
// ========================================

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

console.log('Portfolio site initialized successfully!');
