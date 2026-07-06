/* ==========================================================================
   AD Soluções — Client-Side Logic (Otimizado)
   Interactions, Modal handling, Multistep Form, Dark Mode & Scroll Animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Initialize Lucide Icons
    // ==========================================
    const initLucide = () => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    };
    initLucide();


    // ==========================================
    // 2. Dark Mode Native Toggle
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    const getPreferredTheme = () => {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        return 'dark'; // Default to dark mode
    };
    
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (themeToggleBtn) {
            const isDark = theme === 'dark';
            themeToggleBtn.innerHTML = isDark 
                ? '<i data-lucide="sun" class="theme-toggle-icon"></i>' 
                : '<i data-lucide="moon" class="theme-toggle-icon"></i>';
            initLucide();
        }
    };
    
    // Initialize Theme
    setTheme(getPreferredTheme());
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }


    // ==========================================
    // 3. Scroll-driven Reveals (IntersectionObserver)
    // ==========================================
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target); // Animate once
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });
        
        reveals.forEach(reveal => revealObserver.observe(reveal));
    } else {
        // Fallback for older browsers
        reveals.forEach(reveal => reveal.classList.add('active'));
    }


    // ==========================================
    // 4. Header Scroll Effect
    // ==========================================
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();


    // ==========================================
    // 5. Mobile Drawer Navigation
    // ==========================================
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const drawerClose = document.getElementById('drawer-close');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const drawerLinks = document.querySelectorAll('.drawer-link, .mobile-drawer .btn');

    const openDrawer = () => {
        drawer.classList.add('open');
        drawer.setAttribute('aria-hidden', 'false');
        menuToggle.setAttribute('aria-expanded', 'true');
        drawerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModalIfOpen = () => {
        closeDrawer();
    };

    const closeDrawer = () => {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
        menuToggle.setAttribute('aria-expanded', 'false');
        drawerOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    menuToggle.addEventListener('click', openDrawer);
    drawerClose.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);
    drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));


    // ==========================================
    // 6. Testimonial Slider/Carousel
    // ==========================================
    const track = document.getElementById('depoimentos-track');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (track && dots.length > 0) {
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'), 10);
                track.style.transform = `translateX(-${index * 33.3333}%)`;
                
                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            });
        });
    }


    // ==========================================
    // 7. FAQ Accordions Handler
    // ==========================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            const answer = btn.nextElementSibling;
            
            // Close other FAQs for clean accordion effect
            document.querySelectorAll('.faq-question').forEach(q => {
                if (q !== btn) {
                    q.setAttribute('aria-expanded', 'false');
                    q.nextElementSibling.style.maxHeight = null;
                }
            });
            
            // Toggle current FAQ
            btn.setAttribute('aria-expanded', !isExpanded);
            if (!isExpanded) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });


    // ==========================================
    // 8. Modal Functionality — Simple Form
    // ==========================================
    const modalOverlay = document.getElementById('modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalOpenBtns = document.querySelectorAll('.btn-open-modal');
    const modalFormView = document.getElementById('modal-form-view');
    const modalSuccessView = document.getElementById('modal-success-view');
    const leadForm = document.getElementById('lead-form');
    
    const nameInput = document.getElementById('lead-name');
    const phoneInput = document.getElementById('lead-phone');

    const openModal = () => {
        modalOverlay.classList.add('open');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        setTimeout(() => { if (nameInput) nameInput.focus(); }, 150);
    };

    const closeModal = () => {
        modalOverlay.classList.remove('open');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            if (leadForm) leadForm.reset();
            clearErrors();
            if (modalFormView) modalFormView.classList.remove('hidden');
            if (modalSuccessView) modalSuccessView.classList.add('hidden');
            
            const btnSubmit = document.getElementById('btn-submit-lead');
            if (btnSubmit) {
                const btnText = btnSubmit.querySelector('.btn-text');
                const btnLoader = btnSubmit.querySelector('.btn-loader');
                btnSubmit.disabled = false;
                if (btnText) btnText.classList.remove('hidden');
                if (btnLoader) btnLoader.classList.add('hidden');
            }
        }, 400);
    };

    if (modalOpenBtns) modalOpenBtns.forEach(btn => btn.addEventListener('click', openModal));
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
            closeModal();
        }
    });


    // ==========================================
    // 9. WhatsApp / Phone formatting
    // ==========================================
    const formatPhone = (value) => {
        if (!value) return '';
        let clean = value.replace(/\D/g, '').substring(0, 11);
        
        if (clean.length === 0) return '';
        if (clean.length <= 2) return `(${clean}`;
        if (clean.length <= 6) return `(${clean.substring(0, 2)}) ${clean.substring(2)}`;
        if (clean.length <= 10) return `(${clean.substring(0, 2)}) ${clean.substring(2, 6)}-${clean.substring(6)}`;
        return `(${clean.substring(0, 2)}) ${clean.substring(2, 7)}-${clean.substring(7)}`;
    };

    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            const pos = e.target.selectionStart;
            const formatted = formatPhone(e.target.value);
            e.target.value = formatted;
            if (pos && pos < formatted.length) {
                e.target.setSelectionRange(pos, pos);
            }
        });
    }


    // ==========================================
    // 10. Form Validation and Submission
    // ==========================================
    const setInputError = (inputEl, errorElId, message) => {
        const group = inputEl ? inputEl.closest('.input-group') : null;
        if (group) group.classList.add('error');
        const errorEl = document.getElementById(errorElId);
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.style.display = 'block';
        }
    };

    const clearErrors = () => {
        document.querySelectorAll('.input-group').forEach(group => group.classList.remove('error'));
        document.querySelectorAll('.error-msg').forEach(msg => {
            msg.textContent = '';
            msg.style.display = 'none';
        });
    };

    const validateForm = () => {
        let isValid = true;
        clearErrors();

        const nameVal = nameInput ? nameInput.value.trim() : '';
        if (!nameVal || nameVal.length < 3) {
            setInputError(nameInput, 'name-error', nameVal ? 'Por favor, digite seu nome completo.' : 'Nome completo é obrigatório.');
            isValid = false;
        }

        const phoneVal = phoneInput ? phoneInput.value.replace(/\D/g, '') : '';
        if (!phoneVal || phoneVal.length < 10) {
            setInputError(phoneInput, 'phone-error', phoneVal ? 'Insira um número válido com DDD.' : 'WhatsApp é obrigatório para o contato.');
            isValid = false;
        }

        return isValid;
    };

    const formatSuccessName = (fullName) => {
        const parts = fullName.trim().split(/\s+/);
        if (!parts.length) return 'Cliente';
        const first = parts[0];
        const isTitle = /^(dr|dra|adv|arq|prof|profa|sr|sra)\.?$/i.test(first);
        if (isTitle && parts.length > 1) {
            return `${first.charAt(0).toUpperCase()}${first.slice(1).toLowerCase()}. ${parts[1].charAt(0).toUpperCase()}${parts[1].slice(1).toLowerCase()}`;
        }
        return `${first.charAt(0).toUpperCase()}${first.slice(1).toLowerCase()}`;
    };

    const getSelectedRadioValue = (name) => {
        const checked = document.querySelector(`input[name="${name}"]:checked`);
        return checked ? checked.value : '';
    };

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!validateForm()) return;

            const btnSubmit = document.getElementById('btn-submit-lead');
            const btnText = btnSubmit ? btnSubmit.querySelector('.btn-text') : null;
            const btnLoader = btnSubmit ? btnSubmit.querySelector('.btn-loader') : null;
            
            if (btnSubmit) btnSubmit.disabled = true;
            if (btnText) btnText.classList.add('hidden');
            if (btnLoader) btnLoader.classList.remove('hidden');

            setTimeout(() => {
                const userName = nameInput ? nameInput.value : '';
                const formattedName = formatSuccessName(userName);
                
                console.log('Lead Capturado:', {
                    nome: userName,
                    whatsapp: phoneInput ? phoneInput.value : '',
                    email: document.getElementById('lead-email') ? document.getElementById('lead-email').value : '',
                    interesse: getSelectedRadioValue('interest'),
                    timestamp: new Date().toISOString()
                });

                const successNameEl = document.getElementById('success-user-name');
                if (successNameEl) successNameEl.textContent = formattedName;
                
                if (modalFormView) modalFormView.classList.add('hidden');
                if (modalSuccessView) modalSuccessView.classList.remove('hidden');
            }, 1200);
        });
    }

    const btnSuccessClose = document.getElementById('btn-success-close');
    if (btnSuccessClose) btnSuccessClose.addEventListener('click', closeModal);

    // ==========================================
    // 11. Continuous Infinite Marquee Carousel
    // ==========================================
    const diffTrack = document.getElementById('diferenciais-track');
    if (diffTrack) {
        // Clone original cards for infinite marquee effect
        const originalCards = Array.from(diffTrack.children);
        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            diffTrack.appendChild(clone);
        });

        const container = diffTrack.parentElement;
        let scrollPos = 0;
        let isPaused = false;
        let animationFrameId = null;
        let touchTimeout = null;
        const speed = 0.5; // pixels per frame

        const getResetPoint = () => {
            return diffTrack.scrollWidth / 2;
        };

        const updateMarquee = () => {
            if (!isPaused) {
                scrollPos += speed;
                const limit = getResetPoint();
                if (scrollPos >= limit) {
                    scrollPos = 0; // Seamless reset
                }
                diffTrack.style.transform = `translate3d(-${scrollPos}px, 0, 0)`;
            }
            animationFrameId = requestAnimationFrame(updateMarquee);
        };

        // Start animation
        animationFrameId = requestAnimationFrame(updateMarquee);

        // Pause/Play controls
        const pauseMarquee = () => { 
            isPaused = true; 
            if (touchTimeout) clearTimeout(touchTimeout);
        };
        const playMarquee = () => { isPaused = false; };

        // Desktop hover events
        container.addEventListener('mouseenter', pauseMarquee);
        container.addEventListener('mouseleave', playMarquee);

        // Touch hover/pause events with timeout resume
        container.addEventListener('touchstart', () => {
            pauseMarquee();
        }, { passive: true });

        const resumeTouch = () => {
            if (touchTimeout) clearTimeout(touchTimeout);
            touchTimeout = setTimeout(() => {
                isPaused = false;
            }, 2000); // Resume auto-scrolling 2s after touch stops
        };

        container.addEventListener('touchend', resumeTouch, { passive: true });
        container.addEventListener('touchcancel', resumeTouch, { passive: true });

        // Manual Chevron Button Clicks (both Mobile & Desktop)
        const prevBtn = document.getElementById('diff-prev-btn');
        const nextBtn = document.getElementById('diff-next-btn');

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                pauseMarquee();
                scrollPos -= 280; // Scroll back by a chunk
                if (scrollPos < 0) {
                    scrollPos = getResetPoint() + scrollPos;
                }
                diffTrack.style.transform = `translate3d(-${scrollPos}px, 0, 0)`;
                resumeTouch();
            });
            nextBtn.addEventListener('click', () => {
                pauseMarquee();
                scrollPos += 280; // Scroll forward by a chunk
                const limit = getResetPoint();
                if (scrollPos >= limit) {
                    scrollPos = scrollPos - limit;
                }
                diffTrack.style.transform = `translate3d(-${scrollPos}px, 0, 0)`;
                resumeTouch();
            });
        }
    }

});


