import Link from 'next/link';
import type { Metadata } from 'next';
import { BeforeAfter } from '@/components/BeforeAfter';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Before & after photos of recent window tint installs by Oscuro Tintz, Yuba City, CA. Drag the slider to compare untinted vs. finished.',
  alternates: { canonical: '/gallery' },
};

const galleryStyles = `
  .ba-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
  @media (max-width: 800px) { .ba-grid { grid-template-columns: 1fr; gap: 24px; } }

  .ba {
    position: relative;
    aspect-ratio: 4/3;
    overflow: hidden;
    border: 1px solid var(--line);
    background: #0a0a0a;
    user-select: none;
    cursor: ew-resize;
    touch-action: none;
  }
  .ba__layer {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    background-size: cover;
    background-position: center;
  }
  .ba__layer--before { z-index: 1; }
  .ba__layer--after {
    z-index: 2;
    clip-path: inset(0 0 0 50%);
    will-change: clip-path;
  }
  .ba__handle {
    position: absolute;
    top: 0; bottom: 0;
    left: 50%;
    width: 2px;
    background: #fff;
    z-index: 3;
    transform: translateX(-1px);
    box-shadow: 0 0 0 1px rgba(0,0,0,0.4);
    will-change: left;
  }
  .ba__knob {
    position: absolute;
    top: 50%; left: 50%;
    width: 44px; height: 44px;
    border-radius: 50%;
    background: #fff;
    transform: translate(-50%, -50%);
    display: flex; align-items: center; justify-content: center;
    color: #000;
    box-shadow: 0 4px 16px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.1);
    transition: transform .2s var(--ease);
  }
  .ba__knob svg { width: 22px; height: 22px; }
  .ba:hover .ba__knob { transform: translate(-50%, -50%) scale(1.08); }
  .ba__tag {
    position: absolute;
    top: 12px;
    z-index: 4;
    font-family: 'Oswald', sans-serif;
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: #fff;
    background: rgba(0,0,0,0.65);
    border: 1px solid rgba(255,255,255,0.15);
    padding: 3px 7px;
    backdrop-filter: blur(6px);
    pointer-events: none;
  }
  .ba__tag--before { left: 12px; }
  .ba__tag--after { right: 12px; }

  .ba__caption {
    margin-top: 14px;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
  }
  .ba__caption h3 {
    font-family: 'Oswald', sans-serif;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--ink);
    margin: 0;
  }
  .ba__caption span {
    font-size: 11px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--ink-muted);
  }

`;

// Folder name has a space — encode as %20 for URLs.
const DIR = '/Oscuro%20tints';
const PAIRS = ['9', '8', '7', '6', '5', '3', '2', ''];
const ITEMS: { title: string; sub: string; before: string; after: string }[] = PAIRS.map((n, i) => ({
  title: `Install ${String(i + 1).padStart(2, '0')}`,
  sub: 'Window Tint',
  before: `${DIR}/before${n}.webp`,
  after: `${DIR}/after${n}.webp`,
}));

export default function GalleryPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: galleryStyles }} />

      <section className="pagehead">
        <div className="pagehead__bg"></div>
        <div className="container pagehead__inner reveal">
          <div className="breadcrumbs">
            <Link href="/">Home</Link> <span className="sep">/</span> <span>Gallery</span>
          </div>
          <span className="eyebrow">Before &amp; After</span>
          <h1>The Gallery</h1>
          <p>Drag the slider on each photo to compare the untinted original with the finished install.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="ba-grid reveal">
            {ITEMS.map((it, i) => (
              <div key={i}>
                <BeforeAfter before={it.before} after={it.after} />
                <div className="ba__caption">
                  <h3>{it.title}</h3>
                  <span>{it.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
