'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Re-runs the DOM-touching legacy scripts (BlurText word-stagger, .c-fade-up /
 * .c-blur / .reveal IntersectionObservers, count-up animation, FAQ accordion)
 * after every client-side route change. Each handler is idempotent (uses
 * dataset flags) so re-running on the same DOM is safe.
 */
export function LegacyScripts() {
  const pathname = usePathname();

  useEffect(() => {
    // ---------- BlurText word-stagger wrap ----------
    document.querySelectorAll<HTMLElement>('[data-blur-text]').forEach((el) => {
      if (el.dataset.blurWrapped) return;
      el.dataset.blurWrapped = '1';

      const wrapNode = (node: ChildNode) => {
        if (node.nodeType === 3) {
          const text = node.textContent ?? '';
          const parts = text.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach((part) => {
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(part));
            } else if (part.length) {
              const span = document.createElement('span');
              span.textContent = part;
              frag.appendChild(span);
            }
          });
          node.parentNode?.replaceChild(frag, node);
        } else if (node.nodeType === 1) {
          Array.from(node.childNodes).forEach(wrapNode);
        }
      };
      Array.from(el.childNodes).forEach(wrapNode);

      const wordSpans = el.querySelectorAll<HTMLElement>('span:not(:has(span))');
      wordSpans.forEach((s, i) => {
        s.style.transitionDelay = (i * 0.07).toFixed(2) + 's';
      });
    });

    // ---------- Reveal observers ----------
    // Defer observer attachment by two animation frames. With slow remote
    // images the layout used to settle gradually, giving the browser time
    // to commit the initial opacity:0 / blur(10px) styles before .is-in
    // was added. With local webp the page paints instantly, the observer
    // fires synchronously, and the transition has no diff to animate.
    // Two rAFs guarantee at least one paint with the initial styles.
    const observers: IntersectionObserver[] = [];
    let cancelled = false;

    const blurObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            blurObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    observers.push(blurObs);

    const fadeObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            fadeObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    observers.push(fadeObs);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled) return;
        document.querySelectorAll('.c-blur').forEach((el) => blurObs.observe(el));
        document.querySelectorAll('.reveal').forEach((el) => fadeObs.observe(el));
      });
    });

    // ---------- Count-up ----------
    const countObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const target = parseFloat(el.dataset.countTo ?? '');
          if (Number.isNaN(target)) return;
          const suffix = el.dataset.suffix ?? '';
          const decimals = parseInt(el.dataset.decimals ?? '0', 10);
          const dur = parseInt(el.dataset.duration ?? '1500', 10);
          const start = performance.now();
          function frame(t: number) {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            const v = target * eased;
            el.textContent = (decimals > 0 ? v.toFixed(decimals) : Math.floor(v).toString()) + suffix;
            if (p < 1) requestAnimationFrame(frame);
            else el.textContent = (decimals > 0 ? target.toFixed(decimals) : target.toString()) + suffix;
          }
          requestAnimationFrame(frame);
          countObs.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll('[data-count-to]').forEach((el) => countObs.observe(el));
    observers.push(countObs);

    // ---------- FAQ accordion ----------
    const faqHandlers: Array<{ q: HTMLElement; fn: () => void }> = [];
    document.querySelectorAll<HTMLElement>('.faq__item').forEach((item) => {
      const q = item.querySelector<HTMLElement>('.faq__q');
      if (!q) return;
      const fn = () => {
        const wasOpen = item.classList.contains('is-open');
        item.parentElement?.querySelectorAll('.faq__item.is-open').forEach((i) => i.classList.remove('is-open'));
        if (!wasOpen) item.classList.add('is-open');
      };
      q.addEventListener('click', fn);
      faqHandlers.push({ q, fn });
    });

    return () => {
      cancelled = true;
      observers.forEach((o) => o.disconnect());
      faqHandlers.forEach(({ q, fn }) => q.removeEventListener('click', fn));
    };
  }, [pathname]);

  return null;
}
