'use client';

import { useEffect, useRef } from 'react';

/**
 * Decorative background video that only starts downloading once it scrolls
 * near the viewport. The naive `<video autoPlay>` fetched the whole file on
 * page load, starving the LCP-critical requests on slow connections.
 */
export function LazyVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        if (!video.src) {
          video.src = src;
          video.play().catch(() => {});
        }
        obs.disconnect();
      },
      { rootMargin: '400px 0px' }
    );
    obs.observe(video);
    return () => obs.disconnect();
  }, [src]);

  return <video ref={ref} className={className} muted loop playsInline preload="none" aria-hidden="true" />;
}
