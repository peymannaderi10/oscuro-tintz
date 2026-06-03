"""
Visual audit capture script for oscurotintz.com
Captures desktop (1920x1080) and mobile (390x844) screenshots for /, /services, /book, /contact
Also performs basic automated checks: tap target sizes, horizontal overflow, viewport meta, H1 and CTA visibility.
"""

import json
import os
from playwright.sync_api import sync_playwright

BASE_URL = "https://www.oscurotintz.com"
PAGES = [
    {"slug": "/", "name": "home"},
    {"slug": "/services", "name": "services"},
    {"slug": "/book", "name": "book"},
    {"slug": "/contact", "name": "contact"},
]

VIEWPORTS = [
    {"label": "desktop", "width": 1920, "height": 1080},
    {"label": "mobile", "width": 390, "height": 844},
]

OUT_DIR = "C:/Users/Peyman/source/repos/oscuro-tintz/screenshots"
os.makedirs(OUT_DIR, exist_ok=True)

AUDIT_JS = """
() => {
    const results = {};

    // Viewport meta
    const vmeta = document.querySelector('meta[name="viewport"]');
    results.viewport_meta = vmeta ? vmeta.getAttribute('content') : null;

    // H1 above the fold
    const h1 = document.querySelector('h1');
    if (h1) {
        const r = h1.getBoundingClientRect();
        results.h1_text = h1.textContent.trim().substring(0, 80);
        results.h1_visible_above_fold = r.top >= 0 && r.bottom <= window.innerHeight && r.top < window.innerHeight;
        results.h1_rect = {top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right)};
    } else {
        results.h1_text = null;
        results.h1_visible_above_fold = false;
    }

    // Primary CTA — look for .btn-c, .btn, or <a> with "book" or "get" in text
    const ctaCandidates = Array.from(document.querySelectorAll('a.btn-c, a.btn, .cnav a[href*="book"], a[href*="book"]'));
    const cta = ctaCandidates[0];
    if (cta) {
        const r = cta.getBoundingClientRect();
        results.cta_text = cta.textContent.trim().substring(0, 50);
        results.cta_visible_above_fold = r.top >= 0 && r.bottom <= window.innerHeight && r.top < window.innerHeight;
        results.cta_rect = {top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width), height: Math.round(r.height)};
    } else {
        results.cta_text = null;
        results.cta_visible_above_fold = false;
    }

    // Horizontal overflow (scrollWidth > clientWidth)
    results.document_scroll_width = document.documentElement.scrollWidth;
    results.window_inner_width = window.innerWidth;
    results.horizontal_overflow = document.documentElement.scrollWidth > window.innerWidth + 2;

    // Overflow-causing elements
    const overflowEls = [];
    document.querySelectorAll('*').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.right > window.innerWidth + 2) {
            overflowEls.push({tag: el.tagName, class: el.className.toString().substring(0, 60), right: Math.round(r.right), width: Math.round(r.width)});
        }
    });
    results.overflow_elements = overflowEls.slice(0, 10);

    // Small tap targets (interactive elements < 44x44)
    const interactiveEls = Array.from(document.querySelectorAll('a, button, input, select, textarea, [role="button"]'));
    const smallTargets = [];
    interactiveEls.forEach(el => {
        const r = el.getBoundingClientRect();
        if ((r.width > 0 || r.height > 0) && (r.width < 44 || r.height < 44)) {
            const text = (el.textContent || el.getAttribute('aria-label') || el.getAttribute('href') || '').trim().substring(0, 40);
            smallTargets.push({tag: el.tagName, text, width: Math.round(r.width), height: Math.round(r.height), top: Math.round(r.top)});
        }
    });
    results.small_tap_targets = smallTargets.slice(0, 20);
    results.total_interactive = interactiveEls.length;

    // Base font size
    const body = document.body;
    const bodyStyle = window.getComputedStyle(body);
    results.body_font_size = bodyStyle.fontSize;
    results.body_color = bodyStyle.color;
    results.body_bg = bodyStyle.backgroundColor;

    // Nav element
    const nav = document.querySelector('.cnav, nav, header');
    if (nav) {
        const r = nav.getBoundingClientRect();
        results.nav_height = Math.round(r.height);
        results.nav_visible = r.top < window.innerHeight;
    }

    // Check for images with missing alt
    const imgs = Array.from(document.querySelectorAll('img'));
    results.images_total = imgs.length;
    results.images_missing_alt = imgs.filter(i => !i.getAttribute('alt')).length;

    return results;
}
"""


def capture_page(page, url, label, width, height, out_prefix):
    page.set_viewport_size({"width": width, "height": height})
    page.goto(url, wait_until="networkidle", timeout=30000)
    page.wait_for_timeout(1500)  # let animations settle

    screenshot_path = os.path.join(OUT_DIR, f"{out_prefix}_{label}.png")
    page.screenshot(path=screenshot_path, full_page=False)

    audit_data = page.evaluate(AUDIT_JS)
    audit_data["url"] = url
    audit_data["viewport"] = {"width": width, "height": height}
    audit_data["screenshot"] = screenshot_path

    return audit_data


def main():
    all_results = {}

    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context()
        page = context.new_page()

        for pg in PAGES:
            url = BASE_URL + pg["slug"]
            name = pg["name"]
            all_results[name] = {}

            for vp in VIEWPORTS:
                label = vp["label"]
                prefix = f"{name}"
                print(f"Capturing {url} @ {vp['width']}x{vp['height']} ({label})...")
                try:
                    data = capture_page(page, url, label, vp["width"], vp["height"], prefix)
                    all_results[name][label] = data
                    print(f"  -> {data['screenshot']}")
                except Exception as e:
                    all_results[name][label] = {"error": str(e), "url": url}
                    print(f"  ERROR: {e}")

        browser.close()

    results_path = os.path.join(OUT_DIR, "audit_results.json")
    with open(results_path, "w") as f:
        json.dump(all_results, f, indent=2)
    print(f"\nResults saved to {results_path}")


if __name__ == "__main__":
    main()
