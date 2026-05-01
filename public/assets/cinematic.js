/* =========================================================
   Cinematic landing scripts
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Navbar scroll state + sheet ---------- */
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('navHamburger');
  const sheet = document.getElementById('navSheet');

  if (nav) {
    let scrolled = false;
    window.addEventListener('scroll', () => {
      const isScrolled = window.scrollY > 40;
      if (isScrolled !== scrolled) {
        scrolled = isScrolled;
        nav.dataset.scrolled = isScrolled ? 'true' : 'false';
      }
    }, { passive: true });
  }

  if (hamburger && sheet) {
    hamburger.addEventListener('click', () => {
      sheet.classList.toggle('is-open');
    });
    sheet.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => sheet.classList.remove('is-open'));
    });
  }

  /* ---------- BlurText word-stagger ---------- */
  function wrapWords(el) {
    if (el.dataset.wrapped) return;
    el.dataset.wrapped = '1';
    const text = el.textContent.trim();
    const words = text.split(/\s+/);
    el.innerHTML = words.map((w, i) => {
      const delay = (i * 0.07).toFixed(2);
      return `<span style="transition-delay:${delay}s">${w}${i < words.length - 1 ? '&nbsp;' : ''}</span>`;
    }).join('');
  }
  document.querySelectorAll('[data-blur-text]').forEach(wrapWords);

  const blurObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        blurObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.25 });
  document.querySelectorAll('.anim-blur').forEach(el => blurObserver.observe(el));

  /* ---------- Hero scroll-scrub video ---------- */
  const heroSection = document.getElementById('hero');
  const heroVideo = document.getElementById('heroVideo');

  if (heroSection && heroVideo) {
    let videoReady = false;
    let pendingTime = 0;
    let rafScheduled = false;

    heroVideo.addEventListener('loadedmetadata', () => {
      videoReady = true;
      heroVideo.pause();
      try { heroVideo.currentTime = 0; } catch (_) {}
    });

    heroVideo.addEventListener('canplay', () => {
      heroVideo.pause();
    });

    function applyScrub() {
      rafScheduled = false;
      if (!videoReady) return;

      const rect = heroSection.getBoundingClientRect();
      const total = heroSection.offsetHeight - window.innerHeight;
      if (total <= 0) return;

      let progress = -rect.top / total;
      progress = Math.max(0, Math.min(1, progress));

      const target = progress * (heroVideo.duration || 0);
      // Smooth toward target so seeking doesn't stutter
      const current = heroVideo.currentTime;
      const diff = target - current;
      // Apply directly if duration is short, else lerp
      try {
        heroVideo.currentTime = target;
      } catch (_) {}
      pendingTime = target;
    }

    function onScroll() {
      if (rafScheduled) return;
      rafScheduled = true;
      requestAnimationFrame(applyScrub);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    // First call once metadata loads
    heroVideo.addEventListener('loadedmetadata', () => {
      onScroll();
    });

    // Some browsers need a kick to start buffering
    heroVideo.load();
  }

  /* ---------- Stats: count up on view ---------- */
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.countTo, 10);
      if (isNaN(target)) return;
      const suffix = el.textContent.replace(/[\d,]/g, '');
      const start = performance.now();
      const dur = 1400;
      function frame(t) {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        const v = Math.floor(eased * target);
        el.textContent = v + suffix;
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
      statObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count-to]').forEach(el => statObserver.observe(el));

  /* ---------- Testimonials marquee ---------- */
  const TESTIMONIALS = [
    { quote: 'Clean install, no bubbles, the ceramic tint is a night-and-day difference on hot days.', name: 'Jake Mendoza',    role: 'BMW 3-Series · Ceramic 20%' },
    { quote: 'Best tint shop in Yuba City, hands down. Fair pricing and the work is clean.',           name: 'Ricardo Castillo', role: 'Tacoma · Ceramic 15%' },
    { quote: 'Mobile service was clutch. Came to my house, knocked it out in a few hours.',           name: 'Tyler Patton',     role: 'F-150 · Ceramic 20%' },
    { quote: 'Took my Tesla in and the difference is unreal. AC actually keeps up now.',              name: 'Ashley Nguyen',    role: 'Model 3 · Ceramic 20%' },
    { quote: 'Walked me through every option. No upsell, just honest answers.',                       name: 'Marcus Reed',      role: 'Civic · Carbon 35%' },
    { quote: 'Came in for a removal after a bad install. Night and day difference.',                  name: 'Diana Ortiz',      role: 'Mustang · Ceramic 5%' },
    { quote: 'The Hitek film looks insane. Edges are razor clean, no light gaps.',                    name: 'Brandon Lee',      role: 'WRX · Ceramic 15%' },
    { quote: 'On time, clean shop, fair price. Already booked my wife\'s car.',                       name: 'Jenna Cruz',       role: 'Accord · Carbon 20%' },
    { quote: 'Got my windshield ceramic done. Massive difference in heat with no glare.',             name: 'Eric Vasquez',     role: 'Silverado · Ceramic 70%' },
    { quote: 'Three cars over the years, consistent quality every time.',                             name: 'David Morales',    role: 'Repeat customer' },
  ];

  function quoteSVG() {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="tcard__icon"><path d="M9 7 H4 V12 H7 C 7 14 6 15 4 15 V18 C 8 18 10 16 10 12 V7 Z M19 7 H14 V12 H17 C 17 14 16 15 14 15 V18 C 18 18 20 16 20 12 V7 Z"/></svg>';
  }

  function tcard(t) {
    return `<article class="tcard liquid-glass">
      ${quoteSVG()}
      <p class="tcard__quote">"${t.quote}"</p>
      <div class="tcard__head">
        <div class="tcard__avatar"></div>
        <div>
          <div class="tcard__name">${t.name}</div>
          <div class="tcard__role">${t.role}</div>
        </div>
      </div>
    </article>`;
  }

  const row1 = TESTIMONIALS.slice(0, 5);
  const row2 = TESTIMONIALS.slice(5, 10);
  const r1 = document.getElementById('mqRow1');
  const r2 = document.getElementById('mqRow2');
  if (r1) r1.innerHTML = [...row1, ...row1].map(tcard).join('');
  if (r2) r2.innerHTML = [...row2, ...row2].map(tcard).join('');

  /* ---------- Active nav section ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navLinks.forEach(a => {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => navObserver.observe(s));
})();
