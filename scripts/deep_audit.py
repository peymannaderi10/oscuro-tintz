"""
Deep checks: mobile nav CTA visibility, book page step-tab overflow, "Learn More" tap targets,
footer link tap targets, and hamburger button sizing.
"""
import json
from playwright.sync_api import sync_playwright

BASE_URL = "https://www.oscurotintz.com"
OUT_DIR = "C:/Users/Peyman/source/repos/oscuro-tintz/screenshots"

DEEP_JS = """
() => {
    const r = {};

    // -- NAV: check "Book Now" button in nav at current viewport --
    const navBookNow = document.querySelector('.cnav .btn-c, .cnav a[href*="book"], header a[href*="book"]');
    if (navBookNow) {
        const rect = navBookNow.getBoundingClientRect();
        const style = window.getComputedStyle(navBookNow);
        r.nav_book_btn = {
            text: navBookNow.textContent.trim(),
            display: style.display,
            visibility: style.visibility,
            opacity: style.opacity,
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            top: Math.round(rect.top),
            left: Math.round(rect.left),
            in_viewport: rect.width > 0 && rect.height > 0
        };
    }

    // -- NAV: hamburger button --
    const hamburger = document.querySelector('.cnav__toggle, button[aria-label*="menu"], button[aria-label*="Menu"]');
    if (hamburger) {
        const rect = hamburger.getBoundingClientRect();
        const style = window.getComputedStyle(hamburger);
        r.hamburger = {
            display: style.display,
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            visible: style.display !== 'none' && rect.width > 0
        };
    }

    // -- HERO: find all CTAs in the hero section --
    const heroEl = document.querySelector('.hero, [class*="hero"], section:first-of-type');
    if (heroEl) {
        const heroCTAs = Array.from(heroEl.querySelectorAll('a, button')).map(el => {
            const rect = el.getBoundingClientRect();
            return {
                tag: el.tagName,
                text: el.textContent.trim().substring(0,40),
                href: el.getAttribute('href'),
                width: Math.round(rect.width),
                height: Math.round(rect.height),
                top: Math.round(rect.top),
                visible: rect.width > 0 && rect.height > 0 && rect.top < window.innerHeight
            };
        });
        r.hero_ctas = heroCTAs;
    }

    // -- SERVICE CARDS "Learn More" links --
    const learnMoreLinks = Array.from(document.querySelectorAll('a')).filter(a =>
        a.textContent.toLowerCase().includes('learn more')
    );
    r.learn_more_links = learnMoreLinks.map(el => {
        const rect = el.getBoundingClientRect();
        return {
            text: el.textContent.trim().substring(0, 50),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            fontSize: window.getComputedStyle(el).fontSize
        };
    });

    // -- FOOTER LINKS sizing --
    const footerLinks = Array.from(document.querySelectorAll('footer a, .footer a'));
    r.footer_links_count = footerLinks.length;
    r.footer_small_links = footerLinks.filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.height < 44 || rect.width < 44;
    }).map(el => {
        const rect = el.getBoundingClientRect();
        return {text: el.textContent.trim().substring(0,30), w: Math.round(rect.width), h: Math.round(rect.height)};
    });

    // -- Check for text contrast issues: look for low-opacity text --
    const lowOpacityText = [];
    document.querySelectorAll('p, span, li, h1, h2, h3').forEach(el => {
        const style = window.getComputedStyle(el);
        const opacity = parseFloat(style.opacity);
        const color = style.color;
        if (opacity < 0.5 && el.textContent.trim().length > 0) {
            lowOpacityText.push({tag: el.tagName, text: el.textContent.trim().substring(0,30), opacity, color});
        }
    });
    r.low_opacity_text = lowOpacityText.slice(0, 10);

    // -- Check booking flow step tabs on mobile --
    const stepTabs = Array.from(document.querySelectorAll('[data-panel], .booking-steps li, .step-tab, [class*="step"]'));
    if (stepTabs.length) {
        r.step_tabs = stepTabs.slice(0, 10).map(el => {
            const rect = el.getBoundingClientRect();
            return {class: el.className.substring(0,50), w: Math.round(rect.width), h: Math.round(rect.height)};
        });
    }

    return r;
}
"""

results = {}

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context()
    page = context.new_page()

    pages_to_check = [
        ("/", "home", 390, 844),
        ("/services", "services", 390, 844),
        ("/book", "book", 390, 844),
        ("/contact", "contact", 390, 844),
        ("/book", "book_desktop", 1920, 1080),
    ]

    for slug, name, w, h in pages_to_check:
        url = BASE_URL + slug
        page.set_viewport_size({"width": w, "height": h})
        page.goto(url, wait_until="networkidle", timeout=30000)
        page.wait_for_timeout(1000)
        data = page.evaluate(DEEP_JS)
        data["viewport"] = {"w": w, "h": h}
        results[name] = data
        print(f"Done: {name} @ {w}x{h}")

    browser.close()

with open(f"{OUT_DIR}/deep_audit.json", "w") as f:
    json.dump(results, f, indent=2)

print("Saved deep_audit.json")
