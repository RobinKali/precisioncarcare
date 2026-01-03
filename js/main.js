/**
 * Main JavaScript for Precision Car Care
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initMobileMenu();
});

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.reveal-on-scroll');
    animatedElements.forEach(el => {
        el.style.opacity = '0'; // Prepare for animation
        observer.observe(el);
    });

    /* Text Reveal Observer */
    const textRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.5 });

    const textReveals = document.querySelectorAll('.scroll-text-reveal');
    textReveals.forEach(el => textRevealObserver.observe(el));

    initCarouselDots();
}

function initCarouselDots() {
    const carousels = document.querySelectorAll('.mobile-carousel');

    carousels.forEach(carousel => {
        const id = carousel.id;
        const dotsContainer = document.querySelector(`.carousel-dots[data-target="${id}"]`);
        if (!dotsContainer) return;

        const items = carousel.querySelectorAll('.card');

        // Clear existing dots first to avoid duplicates if re-initialized
        dotsContainer.innerHTML = '';

        // Create Dots
        items.forEach((item, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');

            dot.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent weird jumps
                // Calculate position: (card width + gap) * index
                // Note: scrollIntoView is easier but can be buggy with scroll-snap
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            });

            dotsContainer.appendChild(dot);
        });

        // Update Active Dot on Scroll using simplified logic
        // We use scroll listener instead of IntersectionObserver for smoother updates on scroll-snap
        carousel.addEventListener('scroll', () => {
            const scrollLeft = carousel.scrollLeft;
            const cardWidth = items[0].offsetWidth; // Assuming all cards same width
            const gap = 16; // 1rem gap

            // Calculate active index based on scroll position center
            const centerPosition = scrollLeft + (carousel.offsetWidth / 2);
            let activeIndex = 0;

            // Find which card is closest to center
            let minDistance = Infinity;
            items.forEach((item, index) => {
                const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
                const distance = Math.abs(centerPosition - itemCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    activeIndex = index;
                }
            });

            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach(d => d.classList.remove('active'));
            if (dots[activeIndex]) dots[activeIndex].classList.add('active');
        }, { passive: true });
    });
}

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Prevent scrolling when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}
