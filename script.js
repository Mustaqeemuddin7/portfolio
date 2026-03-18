/* ========================================
   Mohammed Mustaqeem Uddin — Portfolio JS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ── Typing Effect ──────────────────────
    const typedEl = document.getElementById('typed-text');
    const phrases = [
        'Aspiring Data Scientist',
        'Python Developer',
        'Machine Learning Enthusiast',
        'Data Analyst'
    ];
    let phraseIdx = 0;
    let charIdx   = 0;
    let deleting  = false;
    const TYPE_SPEED   = 80;
    const DELETE_SPEED = 40;
    const PAUSE        = 1800;

    function type() {
        const current = phrases[phraseIdx];
        if (!deleting) {
            typedEl.textContent = current.slice(0, charIdx + 1);
            charIdx++;
            if (charIdx === current.length) {
                deleting = true;
                setTimeout(type, PAUSE);
                return;
            }
            setTimeout(type, TYPE_SPEED);
        } else {
            typedEl.textContent = current.slice(0, charIdx - 1);
            charIdx--;
            if (charIdx === 0) {
                deleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
            }
            setTimeout(type, DELETE_SPEED);
        }
    }
    type();


    // ── Mobile Nav Toggle ──────────────────
    const navToggle = document.getElementById('nav-toggle');
    const navLinks  = document.getElementById('nav-links');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });


    // ── Navbar Scroll Effect ───────────────
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });


    // ── Active Nav Link on Scroll ──────────
    const sections = document.querySelectorAll('.section, .hero');
    const allNavLinks = document.querySelectorAll('.nav-link');

    function setActiveLink() {
        let current = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - 120;
            if (window.scrollY >= top) {
                current = sec.getAttribute('id');
            }
        });
        allNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveLink, { passive: true });
    setActiveLink();


    // ── Scroll Reveal (Fade-in) ────────────
    const fadeEls = document.querySelectorAll('.fade-in');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    fadeEls.forEach(el => revealObserver.observe(el));


    // ── Skill Bar Animation ────────────────
    const skillFills = document.querySelectorAll('.skill-fill');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const width = fill.getAttribute('data-width');
                fill.style.width = width + '%';
                fill.classList.add('animated');
                skillObserver.unobserve(fill);
            }
        });
    }, { threshold: 0.3 });

    skillFills.forEach(fill => skillObserver.observe(fill));


    // ── 3D Carousel Slider ──────────────────
    const cards = document.querySelectorAll('.carousel-card');
    const totalCards = cards.length;
    let activeIndex = 0;

    function getState(offset, total) {
        if (offset === 0) return 'active';
        if (offset === 1) return 'right';
        if (offset === -1) return 'left';
        if (offset === 2) return 'far-right';
        if (offset === -2) return 'far-left';
        return 'hidden';
    }

    function updateCarousel() {
        cards.forEach((card, i) => {
            let offset = i - activeIndex;
            if (offset > Math.floor(totalCards / 2)) offset -= totalCards;
            if (offset < -Math.floor(totalCards / 2)) offset += totalCards;
            card.setAttribute('data-state', getState(offset, totalCards));
        });
    }

    function goNext() {
        activeIndex = (activeIndex + 1) % totalCards;
        updateCarousel();
    }

    function goPrev() {
        activeIndex = (activeIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    }

    // Click on a side card to navigate to it
    cards.forEach((card, i) => {
        card.addEventListener('click', () => {
            if (i !== activeIndex) {
                activeIndex = i;
                updateCarousel();
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') goNext();
        if (e.key === 'ArrowLeft') goPrev();
    });

    // Initialize
    updateCarousel();


    // ── Contact Form (Simple Feedback) ─────
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Message Sent!';
        btn.style.background = '#2d7d46';
        btn.disabled = true;
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
            form.reset();
        }, 3000);
    });

});
