'use client';

import { useEffect } from 'react';

const SCRIPT_SRC = 'https://widgets.sociablekit.com/google-reviews/widget.js';

// The widget hardcodes its theme as inline `style="--var: ..."` on the
// root element, which beats anything set in the SociableKit dashboard.
// We override those CSS variables (and a few elements that don't read
// from them) with !important so the widget matches the site's dark theme.
const OVERRIDES = `
.sk-ww-google-reviews {
  --widget-bg-color: #000000 !important;
  --details-bg-color: #0F0F0F !important;
  --details-font-color: #B0B0B0 !important;
  --details-link-color: #D6D6D6 !important;
  --details-link-hover-color: #F5F5F5 !important;
  --reviewer-name-color: #F5F5F5 !important;
  --show-widget-border: 1px solid rgba(255, 255, 255, 0.12) !important;
  --pop-up-bg-color: #0F0F0F !important;
  --pop-up-font-color: #F5F5F5 !important;
  --pop-up-link-color: #D6D6D6 !important;
  --pop-up-button-bg-color: #F5F5F5 !important;
  --pop-up-button-bg-hover-color: #E9E9E9 !important;
  --pop-up-button-text-color: #000000 !important;
  --pop-up-button-text-hover-color: #000000 !important;
  --button-bg-color: #F5F5F5 !important;
  --button-text-color: #000000 !important;
  --button-hover-bg-color: #E9E9E9 !important;
  --button-hover-text-color: #000000 !important;
  --badge-bg-color: #0F0F0F !important;
  --badge-font-color: #F5F5F5 !important;
  --write-a-review-button-background-color: #F5F5F5 !important;
  --write-a-review-button-text-color: #000000 !important;
  --arrow-background-color: #F5F5F5 !important;
  --arrow-color: #000000 !important;
  --arrow-hover-color: #000000 !important;

  background: #000000 !important;
}

/* Cards (review posts + summary badge) */
.sk-ww-google-reviews .sk-post,
.sk-ww-google-reviews .sk-badge {
  background: #0F0F0F !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  border-radius: 8px !important;
  color: #F5F5F5 !important;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.3) !important;
  transition: border-color 0.25s cubic-bezier(0.2, 0.7, 0.2, 1), transform 0.25s cubic-bezier(0.2, 0.7, 0.2, 1) !important;
}
.sk-ww-google-reviews .sk-post:hover,
.sk-ww-google-reviews .sk-badge:hover {
  border-color: rgba(255, 255, 255, 0.22) !important;
  transform: translateY(-3px) !important;
}

/* Reviewer name + meta */
.sk-ww-google-reviews .sk-post__user-name,
.sk-ww-google-reviews .sk-post__user-name a,
.sk-ww-google-reviews .sk-post__user-link {
  color: #F5F5F5 !important;
}
.sk-ww-google-reviews .sk-post__date {
  color: #B0B0B0 !important;
}

/* Review body */
.sk-ww-google-reviews .sk-post__text,
.sk-ww-google-reviews .sk-post__text-content,
.sk-ww-google-reviews .sk-post__text-content div {
  color: #B0B0B0 !important;
}

/* Summary badge (left card) */
.sk-ww-google-reviews .sk-badge__name {
  color: #F5F5F5 !important;
  font-family: 'Oswald', 'Inter', sans-serif !important;
  text-transform: uppercase !important;
  letter-spacing: 0.04em !important;
}
.sk-ww-google-reviews .sk-badge__value {
  color: #F5F5F5 !important;
}
.sk-ww-google-reviews .sk-badge__count {
  color: #D6D6D6 !important;
}
.sk-ww-google-reviews .sk-badge__count:hover {
  color: #F5F5F5 !important;
}
.sk-ww-google-reviews .sk-badge__write {
  background: #F5F5F5 !important;
  color: #000000 !important;
  border: 1px solid #F5F5F5 !important;
}
.sk-ww-google-reviews .sk-badge__write:hover {
  background: #E9E9E9 !important;
  border-color: #E9E9E9 !important;
}

/* Footer buttons (View on Google, share) — borderless ghost */
.sk-ww-google-reviews .sk-post__button {
  background: transparent !important;
  color: #B0B0B0 !important;
  border: 0 !important;
  transition: color 0.2s, background 0.2s !important;
}
.sk-ww-google-reviews .sk-post__button:hover {
  color: #F5F5F5 !important;
  background: #171717 !important;
}
.sk-ww-google-reviews .sk-post__button p {
  color: inherit !important;
}
.sk-ww-google-reviews .sk-post__button-icon,
.sk-ww-google-reviews .sk-post__button-icon path {
  fill: currentColor !important;
}

/* Load more / generic primary button */
.sk-ww-google-reviews .sk-load-more-btn,
.sk-ww-google-reviews .sk-button {
  background: #F5F5F5 !important;
  color: #000000 !important;
  border: 1px solid #F5F5F5 !important;
  font-family: 'Oswald', 'Inter', sans-serif !important;
  text-transform: uppercase !important;
  letter-spacing: 0.08em !important;
}
.sk-ww-google-reviews .sk-load-more-btn:hover,
.sk-ww-google-reviews .sk-button:hover {
  background: #E9E9E9 !important;
  border-color: #E9E9E9 !important;
  color: #000000 !important;
}

/* Popup modal */
.sk-ww-google-reviews .sk-popup {
  background: #0F0F0F !important;
  color: #F5F5F5 !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
}
.sk-ww-google-reviews .sk-popup-overlay {
  background: rgba(0, 0, 0, 0.7) !important;
}
.sk-ww-google-reviews .sk-popup-close {
  color: #F5F5F5 !important;
  background: transparent !important;
}
.sk-ww-google-reviews .sk-popup__title,
.sk-ww-google-reviews .sk-popup__content,
.sk-ww-google-reviews .sk-popup__content p {
  color: #F5F5F5 !important;
}

/* Hover tooltip */
.sk-ww-google-reviews .sk-tooltip-content {
  background: #0F0F0F !important;
  color: #F5F5F5 !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
}

/* SociableKit branding (the small attribution at the bottom) */
.sk-ww-google-reviews .sk_branding {
  color: #6B6B6B !important;
}
.sk-ww-google-reviews .sk_branding a {
  color: #6B6B6B !important;
}
.sk-ww-google-reviews .sk_branding a:hover {
  color: #B0B0B0 !important;
}

/* Owner-response text override (widget hardcodes #000) */
.sk-ww-google-reviews-owners-response-text,
.sk-ww-google-reviews-owners-response-text strong {
  color: #F5F5F5 !important;
}
`;

export function SociableKitGoogleReviews({ embedId }: { embedId: string }) {
  useEffect(() => {
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.defer = true;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: OVERRIDES }} />
      <div className="sk-ww-google-reviews" data-embed-id={embedId} />
    </>
  );
}
