'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const LINKS: { href: string; label: string }[] = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/contact', label: 'Contact' },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="cnav" id="cnav" data-scrolled={scrolled ? 'true' : 'false'} role="banner">
      <div className="cnav__inner lg">
        <Link href="/" className="cnav__brand" aria-label="Oscuro Tintz home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="cnav__brand-logo" src="/assets/oscuro-logo-nav.webp" alt="Oscuro Tintz" width={218} height={128} />
        </Link>
        <nav className="cnav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={isActive(l.href) ? 'is-active' : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Link href="/book" className="cnav__cta">
          Book Now
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17 L17 7 M9 7 H17 V15" />
          </svg>
        </Link>
        <button
          className={`cnav__hamburger${open ? ' is-open' : ''}`}
          id="cnavBurger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
        </button>
      </div>
      <div
        className={`cnav__sheet lg-strong${open ? ' is-open' : ''}`}
        id="cnavSheet"
        role="dialog"
        aria-label="Mobile menu"
      >
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
        <Link href="/book" className="is-cta" onClick={() => setOpen(false)}>
          Book Now
        </Link>
      </div>
    </header>
  );
}
