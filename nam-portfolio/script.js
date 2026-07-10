/* =================================================================
   TONG DUC THANH NAM — SOFTWARE ENGINEER PORTFOLIO
   Lenis + GSAP + ScrollTrigger · 3D AI workstation signature
   ================================================================= */
(function () {
    'use strict';

    const hasGSAP = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
    const hasLenis = typeof Lenis !== 'undefined';
    if (!hasGSAP) {
        // Graceful fallback: reveal everything, no motion.
        document.documentElement.classList.add('no-js');
        document.querySelectorAll('[data-reveal], [data-reveal-hero]').forEach((el) => {
            el.style.opacity = '1'; el.style.transform = 'none';
        });
        document.querySelectorAll('[data-line-inner]').forEach((el) => { el.style.transform = 'none'; });
        const pre = document.getElementById('preloader');
        if (pre) { pre.style.display = 'none'; }
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;

    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

    /* ============================================================
       1 · LENIS — smooth scroll + single rAF
       ============================================================ */
    let lenis = null;
    if (hasLenis && !reduced) {
        lenis = new Lenis({
            lerp: 0.085,
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.4,
        });
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
        lenis.on('scroll', ScrollTrigger.update);
    }

    // Smooth anchor links via lenis if available
    $$('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
            const id = a.getAttribute('href');
            if (!id || id === '#') return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            closeMenu();
            if (lenis) lenis.scrollTo(target, { offset: -20, duration: 1.2 });
            else target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        });
    });

    /* ============================================================
       2 · PRELOADER — sparse, ~2.2s
       ============================================================ */
    const preloader = $('#preloader');
    const preScore = $('#pre-score', preloader);

    function runMain() {
        runHeroEntry();
        runChoiceStory();
        runMarquee();
        startScrollProgress();
        runSectionRail();
        runReveals();
        runAboutSplit();
        runKpis();
        runSkillBars();
        runProjects();
        runContactForm();
        runNavScroll();
        runWorkstation();
    }

    if (preloader) {
        if (reduced) {
            preloader.style.transition = 'opacity 0.3s ease';
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.pointerEvents = 'none';
                preloader.style.visibility = 'hidden';
                runMain();
            }, 300);
        } else {
            const counter = { v: 0 };
            const tl = gsap.timeline({
                defaults: { ease: 'power3.out' },
                onComplete() {
                    gsap.to(preloader, {
                        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
                        duration: 0.9,
                        ease: 'power4.inOut',
                        onComplete() {
                            preloader.style.pointerEvents = 'none';
                            preloader.style.visibility = 'hidden';
                            runMain();
                        },
                    });
                },
            });

            gsap.set('.pre-inner', { opacity: 0, y: 20 });
            gsap.set('.pre-result', { opacity: 0, y: 18 });
            gsap.set('.pre-search-fill', { scaleX: 0 });

            tl.to('.pre-inner', { opacity: 1, y: 0, duration: 0.6 })
              .from('.pre-head span, .pre-foot span', { opacity: 0, y: 8, stagger: 0.06, duration: 0.4 }, 0.12)
              .from('.pre-prompt', { opacity: 0, y: 14, duration: 0.55 }, 0.24)
              .to('.pre-search-fill', { scaleX: 1, duration: 1.3, ease: 'power2.inOut' }, 0.4)
              .to(counter, {
                  v: 98,
                  duration: 1.3,
                  ease: 'power2.inOut',
                  onUpdate() {
                      const value = Math.round(counter.v).toString().padStart(2, '0');
                      if (preScore) preScore.textContent = value + '%';
                  },
              }, 0.4)
              .to('.pre-prompt, .pre-search', { opacity: 0.4, y: -10, duration: 0.5 }, 1.6)
              .to('.pre-result', { opacity: 1, y: 0, duration: 0.65 }, 1.7)
              .from('.pre-result-stamp', { opacity: 0, y: 8, duration: 0.4 }, 2.05)
              .to({}, { duration: 0.35 });
        }
    } else {
        runMain();
    }

    /* ============================================================
       3 · CUSTOM CURSOR — minimal dot + ring
       ============================================================ */
    const cursorRing = $('.cursor-ring');
    const cursorDot = $('.cursor-dot');
    const cursorLabel = $('#cursor-label');

    if (cursorRing && cursorDot && cursorLabel && !isCoarse && !reduced) {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        let visible = false;

        gsap.set(cursorRing, { x: cx, y: cy, xPercent: -50, yPercent: -50, scale: 1 });
        gsap.set(cursorDot, { x: cx, y: cy, xPercent: -50, yPercent: -50 });
        gsap.set(cursorLabel, { x: cx + 16, y: cy + 16 });

        const ringX = gsap.quickTo(cursorRing, 'x', { duration: 0.32, ease: 'power3.out' });
        const ringY = gsap.quickTo(cursorRing, 'y', { duration: 0.32, ease: 'power3.out' });
        const dotX = gsap.quickTo(cursorDot, 'x', { duration: 0.08, ease: 'power2.out' });
        const dotY = gsap.quickTo(cursorDot, 'y', { duration: 0.08, ease: 'power2.out' });
        const labelX = gsap.quickTo(cursorLabel, 'x', { duration: 0.2, ease: 'power3.out' });
        const labelY = gsap.quickTo(cursorLabel, 'y', { duration: 0.2, ease: 'power3.out' });
        let cursorTarget = null;

        window.addEventListener('mousemove', (e) => {
            ringX(e.clientX); ringY(e.clientY);
            dotX(e.clientX); dotY(e.clientY);
            labelX(e.clientX + 16); labelY(e.clientY + 16);
            if (!visible) { visible = true; document.body.classList.add('is-cursor-visible'); }
        });
        window.addEventListener('mouseleave', () => { visible = false; document.body.classList.remove('is-cursor-visible'); });

        // Hover labels
        $$('[data-cursor-label]').forEach((el) => {
            const activate = () => {
                if (cursorTarget === el) return;
                cursorTarget = el;
                cursorLabel.textContent = el.getAttribute('data-cursor-label');
                gsap.to(cursorRing, {
                    scale: 1.7,
                    backgroundColor: 'var(--rebar-soft)',
                    duration: 0.26,
                    ease: 'power3.out',
                    overwrite: 'auto',
                });
            };
            el.addEventListener('mouseenter', activate);
            el.addEventListener('mousemove', activate);
            el.addEventListener('mouseleave', () => {
                if (cursorTarget !== el) return;
                cursorTarget = null;
                gsap.to(cursorRing, {
                    scale: 1,
                    backgroundColor: 'transparent',
                    duration: 0.3,
                    ease: 'power3.out',
                    overwrite: 'auto',
                });
            });
        });
    }

    /* ============================================================
       4 · MOBILE MENU
       ============================================================ */
    const navBurger = $('#nav-burger');
    const menuOverlay = $('#menu-overlay');

    function closeMenu() {
        if (!menuOverlay || !navBurger) return;
        menuOverlay.classList.remove('is-open');
        navBurger.classList.remove('is-open');
        navBurger.setAttribute('aria-expanded', 'false');
        if (lenis) lenis.start();
        document.body.style.overflow = '';
    }
    function openMenu() {
        if (!menuOverlay || !navBurger) return;
        menuOverlay.classList.add('is-open');
        navBurger.classList.add('is-open');
        navBurger.setAttribute('aria-expanded', 'true');
        if (lenis) lenis.stop();
        document.body.style.overflow = 'hidden';
    }
    if (navBurger) {
        navBurger.addEventListener('click', () => {
            if (menuOverlay.classList.contains('is-open')) closeMenu();
            else openMenu();
        });
    }

    /* ============================================================
       5 · HERO ENTRY
       ============================================================ */
    function runHeroEntry() {
        const heroLines = $$('.hero-line [data-line-inner]');
        const heroReveals = $$('[data-reveal-hero]');
        const workstation = $('.workstation');

        if (reduced) {
            gsap.set(heroLines, { yPercent: 0 });
            gsap.set(heroReveals, { opacity: 1, y: 0 });
            if (workstation) gsap.set(workstation, { opacity: 1, y: 0 });
            return;
        }

        gsap.set(heroLines, { yPercent: 110, y: 0 });
        gsap.set(heroReveals, { opacity: 0, y: 24 });

        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
        tl.to(heroLines, { yPercent: 0, duration: 1.25, stagger: 0.09 }, 0.2)
          .to(heroReveals, { opacity: 1, y: 0, duration: 0.95, stagger: 0.07 }, 0.55)
          .to(workstation, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 1.1);

        // Hero parallax layers on scroll
        $$('.hero-bg [data-depth]').forEach((el) => {
            const depth = parseFloat(el.getAttribute('data-depth')) || 0.1;
            gsap.to(el, {
                yPercent: -depth * 100,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        });
    }

    /* ============================================================
       5.1 · WHY NAM — pinned scrolltelling (3 beats)
       ============================================================ */
    function runChoiceStory() {
        const section = $('#why');
        const pin = $('#choice-story-pin');
        if (!section || !pin) return;

        const count = $('[data-story-count]', section);
        const kicker = $('[data-story-kicker]', section);
        const title = $('[data-story-title]', section);
        const copy = $('[data-story-copy]', section);
        const proofLabel = $('[data-story-proof-label]', section);
        const proof = $('[data-story-proof]', section);
        const dots = $$('[data-story-dot]', section);
        const progress = $('#choice-story-progress');
        const setProgress = progress ? gsap.quickSetter(progress, 'scaleX') : null;

        const story = [
            {
                count: '01',
                kicker: '01 · Product proof',
                title: 'He ships the thing, <em>not the pitch.</em>',
                copy: 'Eragear is the signal: an AI workspace with real account state, streaming UX, model/tool/search controls, and usage metering.',
                proofLabel: 'Evidence',
                proof: 'Live product',
            },
            {
                count: '02',
                kicker: '02 · Full loop',
                title: 'He owns the path from <em>interface</em> to runtime.',
                copy: 'The work crosses React surfaces, Hono routes, Cloudflare edge runtime, durable data, and the AI SDK layer that makes model behavior explicit.',
                proofLabel: 'Range',
                proof: 'UI · Edge · AI',
            },
            {
                count: '03',
                kicker: '03 · Verifiable output',
                title: 'You are not reading claims. <em>You are following proof.</em>',
                copy: 'Live product work, open-source AI interfaces, desktop agent experiments, and a shipped Android utility give the portfolio evidence instead of resume theatre.',
                proofLabel: 'Result',
                proof: 'Choose Nam',
            },
        ];

        let active = 0;
        const nodes = [kicker, title, copy, proofLabel, proof].filter(Boolean);

        function renderStep(index) {
            if (index === active) return;
            active = index;
            dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));

            gsap.to(nodes, {
                autoAlpha: 0,
                y: -12,
                duration: 0.18,
                ease: 'power2.in',
                overwrite: true,
                onComplete: () => {
                    const item = story[index];
                    if (count) count.textContent = item.count;
                    if (kicker) kicker.textContent = item.kicker;
                    if (title) title.innerHTML = item.title;
                    if (copy) copy.textContent = item.copy;
                    if (proofLabel) proofLabel.textContent = item.proofLabel;
                    if (proof) proof.textContent = item.proof;

                    gsap.fromTo(nodes,
                        { autoAlpha: 0, y: 18 },
                        {
                            autoAlpha: 1,
                            y: 0,
                            duration: 0.55,
                            ease: 'power3.out',
                            stagger: 0.025,
                            overwrite: true,
                        }
                    );
                },
            });
        }

        dots.forEach((dot, i) => dot.classList.toggle('is-active', i === 0));
        if (setProgress) setProgress(0);

        if (reduced) {
            if (setProgress) setProgress(1);
            return;
        }

        ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: () => '+=' + Math.round(window.innerHeight * (story.length - 1.05)),
            pin,
            pinSpacing: true,
            scrub: 0.85,
            refreshPriority: 1,
            onUpdate: (self) => {
                if (setProgress) setProgress(self.progress);
                const idx = Math.min(story.length - 1, Math.floor(self.progress * story.length));
                renderStep(idx);
            },
        });
    }

    /* ============================================================
       6 · MARQUEE (infinite)
       ============================================================ */
    function runMarquee() {
        const track = $('.marquee-track');
        if (!track || reduced) return;
        gsap.to(track, {
            xPercent: -50,
            repeat: -1,
            duration: 28,
            ease: 'none',
        });
    }

    /* ============================================================
       7 · SCROLL PROGRESS BAR
       ============================================================ */
    function startScrollProgress() {
        const fill = $('#scroll-progress-fill');
        if (!fill) return;
        const setProgress = gsap.quickSetter(fill, 'scaleX');
        const onScroll = () => {
            const h = document.documentElement;
            const max = h.scrollHeight - h.clientHeight;
            const pct = max > 0 ? h.scrollTop / max : 0;
            setProgress(pct);
        };
        (lenis ? lenis.on('scroll', onScroll) : window.addEventListener('scroll', onScroll));
        onScroll();
    }

    /* ============================================================
       8 · SECTION RAIL (active tracking)
       ============================================================ */
    function runSectionRail() {
        const links = $$('.section-rail a[data-section-link]');
        if (!links.length) return;
        const sections = links
            .map((a) => document.getElementById(a.getAttribute('data-section-link')))
            .filter(Boolean);

        sections.forEach((sec) => {
            ScrollTrigger.create({
                trigger: sec,
                start: 'top 50%',
                end: 'bottom 50%',
                onToggle: (self) => {
                    if (self.isActive) {
                        const id = sec.id;
                        links.forEach((a) => {
                            a.classList.toggle('is-active', a.getAttribute('data-section-link') === id);
                        });
                    }
                },
            });
        });
    }

    /* ============================================================
       9 · GENERIC REVEALS
       ============================================================ */
    function runReveals() {
        $$('[data-reveal]').forEach((el) => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 85%' },
            });
        });
    }

    /* ============================================================
       10 · ABOUT LINE SPLIT
       ============================================================ */
    function runAboutSplit() {
        const el = $('[data-split-lines]');
        if (!el) return;
        // Split on the raw innerHTML so inline <em class="em-anim"> keyword emphasis
        // survives the line wrap. Safe because em tags contain no sentence punctuation.
        const html = el.innerHTML.trim();
        const segments = html.split(/(?<=[.,])\s+/);
        el.innerHTML = segments.map((s) => {
            return `<span class="split-line" style="display:block;overflow:hidden;"><span class="split-inner" style="display:inline-block;transform:translateY(110%);">${s} </span></span>`;
        }).join('');

        const inners = $$('.split-inner', el);
        if (reduced) {
            gsap.set(inners, { yPercent: 0 });
            el.classList.add('is-emphasized');
            return;
        }
        gsap.set(inners, { yPercent: 110 });
        gsap.to(inners, {
            yPercent: 0,
            duration: 1,
            ease: 'expo.out',
            stagger: 0.1,
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                onEnter: () => {
                    // Fire keyword emphasis just after the last line begins to settle.
                    gsap.delayedCall(0.5, () => el.classList.add('is-emphasized'));
                },
            },
        });
    }

    /* ============================================================
       10a · KPI COUNTERS — count up when the about strip enters view
       ============================================================ */
    function runKpis() {
        const counts = $$('.kpi-count');
        if (!counts.length) return;

        if (reduced || !('IntersectionObserver' in window)) {
            counts.forEach((el) => { el.textContent = el.getAttribute('data-count'); });
            return;
        }

        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const cells = $$('.kpi-count');
                cells.forEach((el, i) => {
                    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
                    const obj = { v: 0 };
                    gsap.to(obj, {
                        v: target,
                        duration: 1.4,
                        delay: i * 0.1,
                        ease: 'power3.out',
                        onUpdate() { el.textContent = Math.round(obj.v); },
                    });
                });
                io.disconnect();
            });
        }, { threshold: 0.5 });

        const strip = $('.about-kpis');
        if (strip) io.observe(strip);
    }

    function escapeHtml(s) {
        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    /* ============================================================
       10b · SKILL BARS — fill on view
       ============================================================ */
    function runSkillBars() {
        const lists = $$('.skill-list');
        if (!lists.length) return;

        if (!('IntersectionObserver' in window)) {
            lists.forEach((l) => l.classList.add('is-in'));
            return;
        }
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const idx = lists.indexOf(entry.target);
                    setTimeout(() => entry.target.classList.add('is-in'), Math.max(0, idx) * 110);
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });
        lists.forEach((l) => io.observe(l));
    }

    /* ============================================================
       11 · PROJECTS — hover preview follows cursor
       ============================================================ */
    function runProjects() {
        const rows = $$('.project-row');
        const preview = $('#project-preview');
        if (!rows.length || !preview || isCoarse || reduced) return;

        const arts = $$('.project-preview-art', preview);
        let active = false;
        let activeIdx = null;

        gsap.set(preview, { xPercent: -50, yPercent: -50, scale: 0.88, autoAlpha: 0 });
        const previewX = gsap.quickTo(preview, 'x', { duration: 0.42, ease: 'power3.out' });
        const previewY = gsap.quickTo(preview, 'y', { duration: 0.42, ease: 'power3.out' });

        const movePreview = (e) => {
            const half = preview.offsetWidth / 2;
            const pad = 8;
            previewX(Math.max(half + pad, Math.min(window.innerWidth - half - pad, e.clientX)));
            previewY(Math.max(half + pad, Math.min(window.innerHeight - half - pad, e.clientY)));
        };

        const drawPreview = (art) => {
            const strokes = $$('path, line, rect, circle, polyline', art).filter((el) => {
                return typeof el.getTotalLength === 'function';
            });
            strokes.forEach((el) => {
                let len = 80;
                try { len = Math.max(1, Math.ceil(el.getTotalLength())); } catch (_) { /* keep fallback */ }
                gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 0.45 });
            });
            gsap.to(strokes, {
                strokeDashoffset: 0,
                opacity: 1,
                duration: 0.58,
                ease: 'power2.out',
                stagger: 0.025,
                overwrite: true,
            });
        };

        window.addEventListener('mousemove', (e) => {
            if (active) movePreview(e);
        });

        rows.forEach((row) => {
            const activateRow = (e) => {
                const idx = row.getAttribute('data-project');
                active = true;
                movePreview(e);
                if (activeIdx !== idx) {
                    activeIdx = idx;
                    arts.forEach((a) => a.classList.toggle('is-active', a.getAttribute('data-preview') === idx));
                    gsap.to(preview, {
                        autoAlpha: 1,
                        scale: 1,
                        duration: 0.28,
                        ease: 'power3.out',
                        overwrite: 'auto',
                    });
                    const activeArt = arts.find((a) => a.getAttribute('data-preview') === idx);
                    if (activeArt) drawPreview(activeArt);
                }
            };

            row.addEventListener('mouseenter', activateRow);
            row.addEventListener('mousemove', activateRow);
            row.addEventListener('mouseleave', () => {
                active = false;
                activeIdx = null;
                gsap.to(preview, {
                    autoAlpha: 0,
                    scale: 0.88,
                    duration: 0.22,
                    ease: 'power2.out',
                    overwrite: 'auto',
                });
            });
        });

        // Stagger reveal of rows on enter
        gsap.from(rows, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: '#projects-list', start: 'top 75%' },
        });
    }

    /* ============================================================
       12 · MAGNETIC BUTTONS / CTA
       ============================================================ */
    $$('[data-magnetic]').forEach((el) => {
        if (isCoarse || reduced) return;
        const strength = 0.35;
        const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });
        el.addEventListener('mousemove', (e) => {
            const r = el.getBoundingClientRect();
            const x = e.clientX - (r.left + r.width / 2);
            const y = e.clientY - (r.top + r.height / 2);
            xTo(x * strength);
            yTo(y * strength);
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
        });
    });

    const magneticCta = $('#contact-magnetic');
    if (magneticCta && !isCoarse && !reduced) {
        const ctaXTo = gsap.quickTo(magneticCta, 'x', { duration: 0.5, ease: 'power3.out' });
        const ctaYTo = gsap.quickTo(magneticCta, 'y', { duration: 0.5, ease: 'power3.out' });
        magneticCta.addEventListener('mousemove', (e) => {
            const r = magneticCta.getBoundingClientRect();
            const x = e.clientX - (r.left + r.width / 2);
            const y = e.clientY - (r.top + r.height / 2);
            ctaXTo(x * 0.5);
            ctaYTo(y * 0.5);
        });
        magneticCta.addEventListener('mouseleave', () => {
            gsap.to(magneticCta, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.35)' });
        });
    }

    /* ============================================================
       13 · CONTACT FORM (demo handler)
       ============================================================ */
    function runContactForm() {
        const form = $('#contact-form');
        const note = $('#contact-form-note');
        if (!form) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = $('#cf-name').value.trim();
            const email = $('#cf-email').value.trim();
            if (!name || !email) {
                if (note) { note.textContent = '× Please add your name and email'; note.style.color = 'var(--rebar)'; }
                return;
            }
            if (note) {
                note.textContent = '✓ Sent — I read every message and will reply soon';
                note.style.color = 'var(--paper)';
            }
            form.reset();
        });
    }

    /* ============================================================
       14 · NAV scroll state
       ============================================================ */
    function runNavScroll() {
        const nav = $('#nav-bar');
        if (!nav) return;
        const onScroll = () => {
            if (window.scrollY > 40) nav.classList.add('is-scrolled');
            else nav.classList.remove('is-scrolled');
        };
        (lenis ? lenis.on('scroll', onScroll) : window.addEventListener('scroll', onScroll));
        onScroll();
    }

    /* ============================================================
       15 · 3D AI WORKSTATION — signature interaction
       Fixed SVG projection for monitor shell, keyboard body, and key plane.
       Text is rendered as SVG tspans so line breaks stay on the screen plane.
       ============================================================ */
    function runWorkstation() {
        const station = $('#workstation');
        if (!station) return;

        const screen = $('#station-type', station);
        const statusEl = $('[data-workstation-status]', station);
        const keys = $$('.station-key', station);
        if (!screen || !keys.length) return;

        const keyMap = new Map(keys.map((key) => [key.getAttribute('data-key'), key]));
        const lines = [
            'SWE FOUND: THANH NAM',
            'SHIPS AI PRODUCTS',
            'REACT / EDGE / STREAM UX'
        ];
        const text = lines.join('\n');
        const statuses = ['reading prompt', 'matching evidence', 'returning portfolio'];
        const svgNs = 'http://www.w3.org/2000/svg';

        function renderScreen(value, showCaret = true) {
            const displayValue = showCaret ? `${value}|` : value;

            if (screen.namespaceURI === svgNs) {
                const x = screen.getAttribute('x') || '136';
                screen.textContent = '';
                displayValue.split('\n').slice(0, 3).forEach((line, index) => {
                    const tspan = document.createElementNS(svgNs, 'tspan');
                    tspan.setAttribute('x', x);
                    tspan.setAttribute('dy', index === 0 ? '0' : '18');
                    tspan.textContent = line;
                    screen.appendChild(tspan);
                });
                return;
            }

            screen.textContent = displayValue;
        }

        if (reduced) {
            renderScreen(text, false);
            if (statusEl) statusEl.textContent = 'product evidence ready';
            return;
        }

        function keyFor(char) {
            if (char === ' ') return 'space';
            if (char === '\n') return 'enter';
            const lower = char.toLowerCase();
            if (/[a-z]/.test(lower)) return lower;
            return lower === ':' || lower === '.' || lower === ',' ? 'enter' : 'ai';
        }

        function press(char) {
            const key = keyMap.get(keyFor(char));
            if (!key) return;
            key.classList.add('is-down');
            gsap.delayedCall(0.08, () => key.classList.remove('is-down'));
        }

        function updateStatus(index) {
            if (!statusEl) return;
            const pct = index / Math.max(1, text.length);
            statusEl.textContent = pct < 0.34 ? statuses[0] : pct < 0.72 ? statuses[1] : statuses[2];
        }

        function loop() {
            let rendered = '';
            renderScreen(rendered);
            let i = 0;

            const tick = () => {
                if (i >= text.length) {
                    if (statusEl) statusEl.textContent = 'profile returned';
                    gsap.delayedCall(2.1, loop);
                    return;
                }

                const char = text[i];
                rendered += char;
                renderScreen(rendered);
                press(char);
                updateStatus(i);
                i += 1;

                const delay = char === '\n' ? 0.38 : char === ' ' ? 0.06 : 0.035 + Math.random() * 0.045;
                gsap.delayedCall(delay, tick);
            };

            tick();
        }

        gsap.delayedCall(1.35, loop);
    }

    function runPipeline() {
        const pipeline = $('#pipeline');
        if (!pipeline) return;

        const pulse = $('.pipeline-pulse', pipeline);
        const nodes = $$('.pipeline-node', pipeline);
        const statusEl = $('[data-pipeline-status]', pipeline);
        const fpsEl = $('#pipeline-fps', pipeline);
        const readoutTokens = $('#readout-tokens', pipeline);
        if (!pulse || !nodes.length) return;

        // X stops along the pipeline-svg viewBox (0..1000), centered on each node.
        const stops = [120, 380, 640, 880];

        // Streaming sample — drawn in the product's own language.
        const streamText = 'streamText() returns a stream that emits tokens as the model generates — pipe it straight to the UI and the response renders live.';

        const STATUSES = ['Receiving prompt', 'Routing model · tools', 'Running sandbox', 'Streaming to UI'];

        if (reduced) {
            // Static: show pipeline idle, nodes labeled, no loop.
            nodes.forEach((n, i) => { n.classList.add(i === 3 ? 'is-done' : ''); });
            return;
        }

        function runCycle() {
            const tl = gsap.timeline({ onComplete: runCycle });

            tl.set(pulse, { attr: { cx: stops[0], cy: 50 }, opacity: 0 })
              .to(pulse, { opacity: 1, duration: 0.35 })
              .call(() => { if (statusEl) statusEl.textContent = STATUSES[0]; })
              .to(pulse, { attr: { cx: stops[1] }, duration: 0.7, ease: 'power1.inOut',
                  onStart: () => nodes[0].classList.add('is-active'),
                  onComplete: () => { nodes[0].classList.remove('is-active'); nodes[0].classList.add('is-done'); }
              })
              .call(() => { if (statusEl) statusEl.textContent = STATUSES[1]; })
              .to(pulse, { attr: { cx: stops[2] }, duration: 0.7, ease: 'power1.inOut',
                  onStart: () => nodes[1].classList.add('is-active'),
                  onComplete: () => { nodes[1].classList.remove('is-active'); nodes[1].classList.add('is-done'); }
              })
              .call(() => { if (statusEl) statusEl.textContent = STATUSES[2]; })
              .to(pulse, { attr: { cx: stops[3] }, duration: 0.7, ease: 'power1.inOut',
                  onStart: () => nodes[2].classList.add('is-active'),
                  onComplete: () => { nodes[2].classList.remove('is-active'); nodes[2].classList.add('is-done'); }
              })
              .call(() => {
                  if (statusEl) statusEl.textContent = STATUSES[3];
                  nodes[3].classList.add('is-active');
                  if (fpsEl) fpsEl.textContent = 'latency 240ms';
              })
              // Stream tokens into the readout
              .call(() => streamInto(readoutTokens, streamText))
              .to(pulse, { opacity: 0, duration: 0.25 }, '+=2.2')
              .call(() => {
                  nodes.forEach((n) => { n.classList.remove('is-active', 'is-done'); });
                  if (readoutTokens) readoutTokens.textContent = '';
                  if (statusEl) statusEl.textContent = 'Running prompt → response';
                  if (fpsEl) fpsEl.textContent = 'latency —';
              })
              .to({}, { duration: 0.6 });
        }

        // Token-by-token typewriter into the readout element.
        function streamInto(el, text) {
            if (!el) return;
            el.textContent = '';
            let i = 0;
            const tick = () => {
                if (i >= text.length) return;
                // Chunk 2-4 chars per tick to feel like streamed tokens.
                const step = 2 + Math.floor(Math.random() * 3);
                el.textContent += text.slice(i, i + step);
                i += step;
                if (i < text.length) gsap.delayedCall(0.02, tick);
            };
            tick();
        }

        // Hover a node to peek its role (pause-friendly label swap).
        nodes.forEach((n, i) => {
            n.addEventListener('mouseenter', () => {
                if (statusEl) statusEl.textContent = STATUSES[i];
            });
        });

        // Start after a short settle.
        gsap.delayedCall(1.2, runCycle);
    }

    /* ============================================================
       16 · Resize refresh
       ============================================================ */
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
    });

})();
