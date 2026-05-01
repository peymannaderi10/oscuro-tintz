/* Oscuro Tintz, shared behavior */
(function () {
  'use strict';

  // Header scroll state
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Mobile menu
    const toggle = header.querySelector('.hamburger');
    if (toggle) {
      toggle.addEventListener('click', () => {
        header.classList.toggle('is-menu-open');
        document.body.style.overflow = header.classList.contains('is-menu-open') ? 'hidden' : '';
      });
    }
    // Close mobile menu on link click
    header.querySelectorAll('.mobile-menu a').forEach(a => {
      a.addEventListener('click', () => {
        header.classList.remove('is-menu-open');
        document.body.style.overflow = '';
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq__item').forEach(item => {
    const q = item.querySelector('.faq__q');
    if (!q) return;
    q.addEventListener('click', () => {
      const wasOpen = item.classList.contains('is-open');
      // close siblings
      item.parentElement.querySelectorAll('.faq__item.is-open').forEach(i => i.classList.remove('is-open'));
      if (!wasOpen) item.classList.add('is-open');
    });
  });

  // Scroll reveal
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-in'));
  }

  // Lightbox (gallery page)
  const lb = document.querySelector('[data-lightbox]');
  if (lb) {
    const imgs = Array.from(document.querySelectorAll('[data-lb-trigger]'));
    const imgEl = lb.querySelector('.lb__img');
    const counter = lb.querySelector('.lb__counter');
    const close = lb.querySelector('.lb__close');
    const prev = lb.querySelector('.lb__prev');
    const next = lb.querySelector('.lb__next');
    let idx = 0;

    const show = (i) => {
      idx = (i + imgs.length) % imgs.length;
      const src = imgs[idx].dataset.src || imgs[idx].querySelector('img')?.src || '';
      const label = imgs[idx].dataset.label || '';
      if (src) {
        imgEl.innerHTML = `<img src="${src}" alt="${label}">`;
      } else {
        imgEl.innerHTML = `<div class="ph" data-label="${label}"></div>`;
      }
      counter.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(imgs.length).padStart(2, '0')}`;
    };
    imgs.forEach((el, i) => el.addEventListener('click', () => {
      show(i);
      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }));
    close.addEventListener('click', () => {
      lb.classList.remove('is-open');
      document.body.style.overflow = '';
    });
    prev.addEventListener('click', () => show(idx - 1));
    next.addEventListener('click', () => show(idx + 1));
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close.click();
      if (e.key === 'ArrowLeft') prev.click();
      if (e.key === 'ArrowRight') next.click();
    });
  }

  // Contact form (client-side demo)
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = form.querySelector('.form__status');
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending…';
      setTimeout(() => {
        form.reset();
        btn.disabled = false;
        btn.innerHTML = 'Send Message';
        if (status) {
          status.textContent = 'Thanks, we\'ll get back to you within 24 hours.';
          status.classList.add('is-ok');
        }
      }, 900);
    });
  }
})();
