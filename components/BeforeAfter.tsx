'use client';

import { useEffect, useRef } from 'react';

export function BeforeAfter({ before, after }: { before: string; after: string }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const afterRef = useRef<HTMLImageElement | null>(null);
  const handleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    const afterLayer = afterRef.current;
    const handle = handleRef.current;
    if (!el || !afterLayer || !handle) return;

    let dragging = false;

    const setPos = (clientX: number) => {
      const rect = el.getBoundingClientRect();
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      afterLayer.style.clipPath = `inset(0 0 0 ${pct}%)`;
      handle.style.left = `${pct}%`;
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      el.setPointerCapture(e.pointerId);
      setPos(e.clientX);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      setPos(e.clientX);
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
    };
    const onCancel = () => {
      dragging = false;
    };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onCancel);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onCancel);
    };
  }, [before, after]);

  return (
    <div className="ba" data-ba ref={rootRef}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="ba__layer ba__layer--before" src={before} alt="" loading="eager" decoding="async" draggable={false} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="ba__layer ba__layer--after" src={after} alt="" loading="eager" decoding="async" draggable={false} ref={afterRef} />
      <span className="ba__tag ba__tag--before">Before</span>
      <span className="ba__tag ba__tag--after">After</span>
      <div className="ba__handle" ref={handleRef}>
        <div className="ba__knob">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 6 L4 12 L9 18 M15 6 L20 12 L15 18" />
          </svg>
        </div>
      </div>
    </div>
  );
}
