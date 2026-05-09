'use client';

import { useEffect, useRef } from 'react';
import type { Map as LeafletMap } from 'leaflet';

export function MapEmbed() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let map: LeafletMap | null = null;
    let cancelled = false;

    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !ref.current) return;

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

      // React 18 strict mode runs the effect twice in dev; if a prior
      // invocation already initialized the container Leaflet sets a
      // `_leaflet_id` on the node and L.map() will throw. Clear it so
      // we can re-initialize cleanly.
      const nodeWithLeaflet = node as HTMLDivElement & { _leaflet_id?: number };
      if (nodeWithLeaflet._leaflet_id) {
        delete nodeWithLeaflet._leaflet_id;
      }

      const yubaCity: [number, number] = [39.1404, -121.6169];
      map = L.map(node, {
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

      map.on('click', () => map?.scrollWheelZoom.enable());
      map.on('mouseout', () => map?.scrollWheelZoom.disable());

      // If the component already unmounted while we were awaiting the
      // import, dispose immediately.
      if (cancelled) {
        map.remove();
        map = null;
      }
    })();

    return () => {
      cancelled = true;
      if (map) {
        map.remove();
        map = null;
      }
    };
  }, []);

  return <div className="map__inner" id="map" ref={ref}></div>;
}
