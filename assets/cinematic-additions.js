/* =========================================================
   Cinematic additions: nav state, blur-text, count-up
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Nav scroll state ---------- */
  const cnav = document.getElementById('cnav');
  if (cnav) {
    let scrolled = false;
    const onScroll = () => {
      const isScrolled = window.scrollY > 40;
      if (isScrolled !== scrolled) {
        scrolled = isScrolled;
        cnav.dataset.scrolled = isScrolled ? 'true' : 'false';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile menu sheet ---------- */
  const burger = document.getElementById('cnavBurger');
  const sheet  = document.getElementById('cnavSheet');
  if (burger && sheet) {
    burger.addEventListener('click', () => {
      const open = sheet.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
    });
    sheet.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        sheet.classList.remove('is-open');
        burger.classList.remove('is-open');
      });
    });
  }

  /* ---------- BlurText word-stagger wrap ---------- */
  document.querySelectorAll('[data-blur-text]').forEach(el => {
    if (el.dataset.blurWrapped) return;
    el.dataset.blurWrapped = '1';

    // Walk children, splitting only text nodes into word spans.
    // Preserves <span class="line">, <br>, etc.
    const wrapNode = (node) => {
      if (node.nodeType === 3) {
        const text = node.textContent;
        const parts = text.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach(part => {
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else if (part.length) {
            const span = document.createElement('span');
            span.textContent = part;
            frag.appendChild(span);
          }
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === 1) {
        Array.from(node.childNodes).forEach(wrapNode);
      }
    };
    Array.from(el.childNodes).forEach(wrapNode);

    // Apply staggered delays to the leaf word spans
    const wordSpans = el.querySelectorAll('span:not(:has(span))');
    wordSpans.forEach((s, i) => {
      s.style.transitionDelay = (i * 0.07).toFixed(2) + 's';
    });
  });

  const blurObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        blurObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.c-blur').forEach(el => blurObs.observe(el));

  /* ---------- Count up on view ---------- */
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.countTo);
      if (isNaN(target)) return;
      const suffix = el.dataset.suffix || '';
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const dur = parseInt(el.dataset.duration || '1500', 10);
      const start = performance.now();
      const startVal = 0;
      const initialText = el.textContent;
      function frame(t) {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        const v = startVal + (target - startVal) * eased;
        el.textContent = (decimals > 0 ? v.toFixed(decimals) : Math.floor(v).toString()) + suffix;
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = initialText; // restore exact original (e.g. "500+")
      }
      // Ensure starts at 0 visually
      el.textContent = '0' + suffix;
      requestAnimationFrame(frame);
      countObs.unobserve(el);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('[data-count-to]').forEach(el => countObs.observe(el));

  /* ---------- Active nav link based on scroll position ---------- */
  // Only operate on same-page anchor links; cross-page links keep their is-active from HTML
  const navLinks = document.querySelectorAll('.cnav__links a[href^="#"]');
  if (navLinks.length) {
    const sectionMap = new Map();
    navLinks.forEach(a => {
      const id = a.getAttribute('href').slice(1);
      const section = document.getElementById(id);
      if (section) sectionMap.set(section, a);
    });
    const navObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        const link = sectionMap.get(e.target);
        if (!link) return;
        if (e.isIntersecting) {
          // Don't deactivate the home/cross-page links
          navLinks.forEach(a => {
            if (a.getAttribute('href').startsWith('#')) a.classList.remove('is-active');
          });
          link.classList.add('is-active');
        }
      });
    }, { threshold: 0.4 });
    sectionMap.forEach((_, section) => navObs.observe(section));
  }
})();
