'use client';

import { useEffect, useRef } from 'react';

export function MapEmbed() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let cleanup: (() => void) | undefined;

    (async () => {
      const L = (await import('leaflet')).default;

      // Inject Leaflet CSS once
      const existing = document.querySelector('link[data-leaflet-css]');
      if (!existing) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        link.crossOrigin = '';
        link.setAttribute('data-leaflet-css', '1');
        document.head.appendChild(link);
      }

      const yubaCity: [number, number] = [39.1404, -121.6169];
      const map = L.map(node, {
        center: yubaCity,
        zoom: 12,
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: 'abcd',
      }).addTo(map);

      const pulseIcon = L.divIcon({
        className: '',
        html: '<div class="map__pin-marker"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      L.marker(yubaCity, { icon: pulseIcon })
        .addTo(map)
        .bindPopup('<strong>Oscuro Tintz</strong><br>Yuba City, CA<br>(530) 443-4336', { className: 'map__popup' });

      map.on('click', () => map.scrollWheelZoom.enable());
      map.on('mouseout', () => map.scrollWheelZoom.disable());

      cleanup = () => {
        map.remove();
      };
    })();

    return () => {
      cleanup?.();
    };
  }, []);

  return <div className="map__inner" id="map" ref={ref}></div>;
}
