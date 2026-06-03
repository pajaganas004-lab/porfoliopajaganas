/* ==========================================================================
   SCRIPT.JS - Pajaganas Paul Vincent IT Student Portfolio
   Logic: Typewriter, Scroll Spy, Skills Animation, Preloader, Hamburger, Scroll Reveal
   Author: Pajaganas Paul Vincent
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Preloader Fade Out
       ========================================================================== */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            // Slight delay for extra smooth transition
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }, 600);
        });
    }

    /* ==========================================================================
       2. Sticky Header Navbar
       ========================================================================== */
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    /* ==========================================================================
       3. Mobile Navigation Menu Toggle (Hamburger)
       ========================================================================== */
    const hamburger = document.getElementById('hamburger-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close menu when clicking on any nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    /* ==========================================================================
       4. Animated Typing Effect
       ========================================================================== */
    const typedTextSpan = document.querySelector('.typed-text');
    const textArray = [
        "BS Information Technology Student",
        "Network Infrastructure Enthusiast",
        "Junior Web Developer",
        "Open-source & Git Practitioner"
    ];
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const newTextDelay = 2000; // Delay between typing and erasing
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingSpeed + 100);
        }
    }

    // Start typing effect on load
    if (typedTextSpan && textArray.length > 0) {
        setTimeout(type, newTextDelay + 250);
    }

    /* ==========================================================================
       5. Active Nav Highlight on Scroll (Scroll-Spy)
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    
    function scrollSpy() {
        const scrollPosition = window.scrollY + 150; // offset for nav height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', scrollSpy);
    scrollSpy(); // Trigger immediately to check current position

    /* ==========================================================================
       6. Scroll Reveal Animations (Intersection Observer)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* ==========================================================================
       7. Skills Progress Bar Animation (Intersection Observer)
       ========================================================================== */
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const percent = bar.getAttribute('data-progress');
                bar.style.width = percent;
                // Stop observing once animated
                observer.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    /* ==========================================================================
       8. Back To Top Button Control
       ========================================================================== */
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ==========================================================================
       9. Form Submission Handling (Visual Demo Feedback)
       ========================================================================== */
    const contactForm = document.getElementById('portfolio-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic input animations or toast notification setup
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Feedback loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="cursor" style="animation: blink 0.5s step-end infinite; background-color: white; width: 6px; height: 12px; display: inline-block;"></span> Sending...';
            
            setTimeout(() => {
                // Success message mock
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                submitBtn.innerHTML = '✔ Message Sent!';
                
                // Clear fields
                contactForm.reset();
                
                // Reset button state
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    submitBtn.innerHTML = originalBtnText;
                }, 3000);
                
            }, 1800);
        });
    }
});
