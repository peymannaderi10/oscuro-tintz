# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static marketing site for **Oscuro Tintz**, a window-tinting business in Yuba City, CA. No build system, no package manager, no framework — vanilla HTML/CSS/JS served as flat files. Not a git repo.

## Running locally

There is no build step or test suite. Preview by opening `index.html` directly, or serve the directory statically (e.g. `python -m http.server 8000`). The `book.html` flow assumes "today" is hard-coded to **April 20, 2026** in the inline calendar script — adjust that constant if you need a different reference date.

## Page set & shared chrome

Each `*.html` is fully standalone (no templating). Every production page hand-rolls the same `<head>` (Google Fonts: Oswald + Inter), the floating "liquid-glass" nav (`<header class="cnav">`), and the footer. When adding nav links, services, hours, or contact info, **update every page** — there is no partial system. Highlight the active page by adding `class="is-active"` on the matching `.cnav__links a`.

`landing-cinematic.html` is a separate prototype landing page — it uses an **older** nav implementation (`.nav` / `cinematic.css` / `cinematic.js`) and does not share chrome with the rest of the site. Don't import its styles into production pages.

## CSS layering

Three stylesheets, loaded in order on production pages:

1. `assets/styles.css` — design tokens (`--bg`, `--ink`, `--line`, `--accent`, `--radius-*`, `--container`, `--gutter`, `--ease`), reset, typography (Oswald display / Inter body, all-caps `h1`–`h3`), legacy layout (`.header`, `.hero`, `.section`, `.container`, `.btn`, `.faq`, etc.), and the lightbox.
2. `assets/cinematic-additions.css` — the floating `.cnav` nav, `.btn-c` button variants, `.lg` / `.lg-strong` glass utilities, animation primitives (`.c-fade-up`, `.c-blur`), and most homepage section styles.
3. `assets/cinematic.css` — used **only** by `landing-cinematic.html`. Don't link it from production pages.

Always use the CSS variables for color/spacing rather than raw hex values. The palette is intentionally near-monochrome (black backgrounds, off-white ink, thin `rgba(255,255,255,0.12)` borders) — bright accent colors are off-brand.

## JS layering

Three scripts, loaded as plain `<script>` tags (no modules, no bundler):

- `assets/main.js` — shared behavior for legacy `.header` nav (used by `landing-cinematic.html` only via its own variant), FAQ accordion, `.reveal` → `.is-in` IntersectionObserver, lightbox (`[data-lightbox]`), and the demo contact form (client-side only, no real submit).
- `assets/cinematic-additions.js` — drives the production `.cnav` (scroll state, mobile sheet), wraps `[data-blur-text]` into per-word spans for the `.c-blur` reveal, runs `.c-fade-up` / `.c-blur` IntersectionObservers, and animates `[data-count-to]` counters.
- `assets/cinematic.js` — only for `landing-cinematic.html` (older `.nav`, hero scroll-scrub video, etc.).

Production pages typically include `main.js` + `cinematic-additions.js` together. The two reveal systems coexist: `.reveal` (main.js) and `.c-fade-up` / `.c-blur` (cinematic-additions.js) — both toggle `.is-in`. New sections should use the `c-*` primitives.

## Animation primitives

- `.c-fade-up` with inline `style="--c-delay: 0.95s;"` — fades + translates in when scrolled into view.
- `<h1 class="c-blur" data-blur-text>` — JS splits the text into word spans with staggered `transition-delay` (~0.07s per word). Preserves child elements like `<span class="line">` and `<br>`.
- `<span data-count-to="99" data-suffix="%" data-duration="1500">` — eases a counter from 0 to target on first view.

All three rely on an IntersectionObserver adding `.is-in` to the element. They respect `prefers-reduced-motion`.

## Booking flow

`book.html` is a **UI demo only** — there is no backend. The inline `<script>` at the bottom owns:

- A `state` object (service, location, date, time, step).
- A hand-built calendar that disables dates before the hard-coded `today = new Date(2026, 3, 20)`.
- Step navigation via `[data-next]` / `[data-prev]` buttons and `[data-panel]` containers.
- "Confirm Booking" just advances to the success panel; nothing is sent anywhere.

If wiring this up for real, replace the `confirm-btn` handler — don't bolt onto the existing `state` machine without auditing it.

## Conventions

- Title-tag style is `Page, Oscuro Tintz` (comma, not pipe).
- Phone number `(530) 443-4336` and email `oscurotintz@gmail.com` appear in the footer of every page — keep them in sync.
- `&` is written as `&amp;` in copy (`Carbon &amp; Ceramic`); em-dashes are used sparingly in body copy.
- Inline `<style>` blocks in HTML are reserved for page-specific layout (e.g. `book.html`'s booking grid). Shared rules belong in `cinematic-additions.css`.
