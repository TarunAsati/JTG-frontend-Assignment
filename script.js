// Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navbar links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to target section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100; // Offset for navbar height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                
                // Add active class to corresponding nav link
                const activeNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeNavLink) {
                    activeNavLink.classList.add('active');
                }
            }
        });
    });

// Video functionality
    const video = document.getElementById('mainVideo');
    const playBtn = document.getElementById('playBtn');
    const videoOverlay = document.getElementById('videoOverlay');

    // Video play/pause functionality
    function toggleVideo() {
        if (video.paused) {
            video.play();
            videoOverlay.classList.add('hidden');
        } else {
            video.pause();
            videoOverlay.classList.remove('hidden');
        }
    }

    // Event listeners for video
    playBtn.addEventListener('click', toggleVideo);
    video.addEventListener('click', toggleVideo);

    // Show overlay when video is paused
    video.addEventListener('pause', function() {
        videoOverlay.classList.remove('hidden');
    });

    // Hide overlay when video is playing
    video.addEventListener('play', function() {
        videoOverlay.classList.add('hidden');
    });

    // Testimonial slider functionality
    const testimonialTrack = document.getElementById('testimonialTrack');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let testimonialInterval;

    function showSlide(index) {
        // Remove active class from all slides and dots
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        testimonialSlides[index].classList.add('active');
        dots[index].classList.add('active');

        currentSlide = index;
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % testimonialSlides.length;
        showSlide(nextIndex);
    }

    function startTestimonialSlider() {
        testimonialInterval = setInterval(nextSlide, 5000);
    }

    function stopTestimonialSlider() {
        clearInterval(testimonialInterval);
    }

    // Dot click functionality
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopTestimonialSlider();
            showSlide(index);
            startTestimonialSlider();
        });
    });

    // Start the testimonial slider
    startTestimonialSlider();

    // Pause slider on hover
    const testimonialSlider = document.getElementById('testimonialSlider');
    testimonialSlider.addEventListener('mouseenter', stopTestimonialSlider);
    testimonialSlider.addEventListener('mouseleave', startTestimonialSlider);

    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    const modal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');

    function showModal() {
        modal.classList.add('show');
        document.body.classList.add('modal-open');
    }

    function hideModal() {
        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
    }

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Basic validation (HTML5 validation will handle required fields)
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Show success modal
        showModal();

        // Reset form
        contactForm.reset();
    });

    // Close modal functionality
    closeModal.addEventListener('click', hideModal);

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            hideModal();
        }
    });

    // Smooth scrolling for anchor links (if any are added)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add some interactive effects
    const featureCards = document.querySelectorAll('.feature-card');
    const pricingCards = document.querySelectorAll('.pricing-card');

    // Add hover effects to feature cards
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
        });
    });

    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
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

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.feature-card, .pricing-card, .content-text, .content-image');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
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
`;
document.head.appendChild(style);