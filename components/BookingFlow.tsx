'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { PHONE } from '@/lib/siteMeta';

type Service = string;
type Location = string;
type RearGlass = 'standard' | 'one-piece' | 'unsure';

const REAR_GLASS_OPTIONS: { value: RearGlass; label: string; meta: string; img?: string }[] = [
  {
    value: 'standard',
    label: 'Standard',
    meta: 'Separate rear glass, like most cars',
    img: '/Oscuro%20tints/standard.png',
  },
  {
    value: 'one-piece',
    label: 'Full / One-Piece',
    meta: 'Extends to the roof in one solid panel (Tesla Model 3/Y, etc.)',
    img: '/Oscuro%20tints/full-one-piece.png',
  },
  {
    value: 'unsure',
    label: 'Not Sure',
    meta: "We'll confirm with you",
  },
];

// `hasRear` flags services that involve work on the rear window — drives
// whether the "Rear Window Style" question is shown on the vehicle step.
// Front-only / windshield-only / sun-strip jobs skip the question.
const SERVICES: { value: Service; label: string; meta: string; hasRear: boolean }[] = [
  { value: 'Carbon Tint, Full', label: 'Carbon, Full', meta: 'From $290 · ~3 hrs', hasRear: true },
  { value: 'Ceramic Tint, Full', label: 'Ceramic, Full', meta: 'From $390 · ~3 hrs', hasRear: true },
  { value: 'Ceramic Plus, Full', label: 'Ceramic Plus, Full', meta: 'From $500 · ~3 hrs', hasRear: true },
  { value: 'Front Two Windows', label: 'Front Two', meta: 'From $120 · ~1 hr', hasRear: false },
  { value: 'Windshield', label: 'Windshield', meta: 'From $140 · ~1 hr', hasRear: false },
  { value: 'Sunroof', label: 'Sunroof', meta: 'From $80 · ~30 min', hasRear: false },
  { value: 'Panoramic Sunroof', label: 'Panoramic Sunroof', meta: 'From $120 · ~45 min', hasRear: false },
  { value: 'Sun Strip', label: 'Sun Strip', meta: 'From $50 · ~30 min', hasRear: false },
  { value: 'Tint Removal', label: 'Tint Removal', meta: 'From $50 · ~1–2 hrs', hasRear: true },
  { value: 'Custom / Not Sure', label: 'Custom', meta: "We'll confirm", hasRear: true },
];

const LOCATIONS: { value: Location; label: string; meta: string }[] = [
  { value: 'Shop, Yuba City', label: 'Our Shop', meta: 'Yuba City, CA' },
  { value: 'Mobile, At Your Location', label: 'Mobile', meta: 'We come to you' },
];

const TIMES = ['8:00 AM', '9:30 AM', '11:00 AM', '12:30 PM', '2:00 PM', '3:30 PM', '5:00 PM', '6:30 PM'];

const STEPS = [
  { n: '01', label: 'Service', sub: 'Pick your film & job' },
  { n: '02', label: 'Date & Time', sub: 'Choose a slot' },
  { n: '03', label: 'Vehicle', sub: 'Year / make / model' },
  { n: '04', label: 'Your Info', sub: 'Confirm & book' },
];

const TODAY = new Date(2026, 3, 20);
const DEFAULT_DAY = 24;

export function BookingFlow() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState<Service>('Ceramic Tint, Full');
  const [location, setLocation] = useState<Location>('Shop, Yuba City');
  const [time, setTime] = useState('11:00 AM');
  const [day, setDay] = useState<number | null>(DEFAULT_DAY);
  const [rearGlass, setRearGlass] = useState<RearGlass>('standard');
  const [notes, setNotes] = useState<string[]>([]);
  // Currently viewed month — separate from the selected day so the user
  // can browse forward without losing their selection. Eventually the
  // available date range will be driven by the Square Appointments API.
  const [viewYear, setViewYear] = useState<number>(TODAY.getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(TODAY.getMonth());

  const year = viewYear;
  const month = viewMonth;
  const monthName = new Date(year, month, 1).toLocaleString('en-US', { month: 'long' });
  const dateStr = day != null ? `${monthName} ${day}, ${year}` : null;
  // Whether the currently selected service involves rear-window work.
  const serviceHasRear = SERVICES.find((s) => s.value === service)?.hasRear ?? true;
  const isAtTodayMonth = year === TODAY.getFullYear() && month === TODAY.getMonth();
  // Cap forward navigation at 6 months out for now; Square will own
  // this once we wire up real availability.
  const maxYear = new Date(TODAY.getFullYear(), TODAY.getMonth() + 6, 1).getFullYear();
  const maxMonth = new Date(TODAY.getFullYear(), TODAY.getMonth() + 6, 1).getMonth();
  const isAtMaxMonth = year === maxYear && month === maxMonth;

  const goToPrevMonth = () => {
    if (isAtTodayMonth) return;
    const prev = new Date(year, month - 1, 1);
    setViewYear(prev.getFullYear());
    setViewMonth(prev.getMonth());
    setDay(null);
  };
  const goToNextMonth = () => {
    if (isAtMaxMonth) return;
    const next = new Date(year, month + 1, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
    setDay(null);
  };
  const rearGlassLabel = !serviceHasRear
    ? 'N/A (front-only service)'
    : rearGlass === 'one-piece'
      ? 'Full / One-Piece (custom quote)'
      : rearGlass === 'unsure'
        ? "Not Sure (we'll confirm)"
        : 'Standard';

  const calendar = useMemo(() => {
    // Only render today and future dates. Compute the weekday offset for
    // the first visible day so it aligns under the correct column header.
    const isCurrentMonth = TODAY.getFullYear() === year && TODAY.getMonth() === month;
    const firstVisible = isCurrentMonth ? TODAY.getDate() : 1;
    const firstVisibleDate = new Date(year, month, firstVisible);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = firstVisibleDate.getDay();
    return { startDay, daysInMonth, firstVisible };
  }, [year, month]);

  const go = (n: number) => {
    setStep(n);
    if (typeof window !== 'undefined') {
      // Scroll to the top of the form panel (not the whole .book-grid which
      // also contains the step list above the form on mobile). This keeps
      // the user focused on the next step's content instead of jumping
      // back up past the page header.
      const panel = document.querySelector('.booking-panel') as HTMLElement | null;
      if (panel) {
        const top = panel.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="book-grid">
      <aside>
        <ol className="steps">
          {STEPS.map((s, i) => {
            const n = i + 1;
            const cls = n === step ? 'is-current' : n < step ? 'is-done' : '';
            return (
              <li key={s.n} className={cls}>
                <div className="steps__n">{s.n}</div>
                <div>
                  <div className="steps__label">{s.label}</div>
                  <div className="steps__sub">{s.sub}</div>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="booking-pricing-note">
          <span className="booking-pricing-note__tag">Pricing Note</span>
          <p>
            Prices shown are <strong>starting estimates</strong>. Final pricing depends on your vehicle&apos;s year,
            make, model, and the windows being tinted. We&apos;ll send a confirmed quote after you submit.
          </p>
        </div>
      </aside>

      <div className="booking-panel">
        {step === 1 && (
          <div>
            <div className="panel-title">01 · Select A Service</div>
            <p className="panel-sub">Choose the install or service you&apos;re booking.</p>
            <div className="tile-grid">
              {SERVICES.map((s) => (
                <button
                  key={s.value}
                  className={`tile${service === s.value ? ' is-selected' : ''}`}
                  onClick={() => setService(s.value)}
                >
                  <span className="tile__label">{s.label}</span>
                  <span className="tile__meta">{s.meta}</span>
                </button>
              ))}
            </div>
            <div className="panel-title" style={{ marginTop: 32 }}>
              Install Location
            </div>
            <div className="tile-grid">
              {LOCATIONS.map((l) => (
                <button
                  key={l.value}
                  className={`tile${location === l.value ? ' is-selected' : ''}`}
                  onClick={() => setLocation(l.value)}
                >
                  <span className="tile__label">{l.label}</span>
                  <span className="tile__meta">{l.meta}</span>
                </button>
              ))}
            </div>
            <div className="panel-nav">
              <span></span>
              <button className="btn btn--primary" onClick={() => go(2)}>
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="panel-title">02 · Pick A Date</div>
            <p className="panel-sub">Available dates. All times in PT.</p>
            <div className="cal-header">
              <button
                type="button"
                className="cal-nav"
                onClick={goToPrevMonth}
                disabled={isAtTodayMonth}
                aria-label="Previous month"
              >
                ‹
              </button>
              <div className="cal-header__month">
                {monthName} {year}
              </div>
              <button
                type="button"
                className="cal-nav"
                onClick={goToNextMonth}
                disabled={isAtMaxMonth}
                aria-label="Next month"
              >
                ›
              </button>
            </div>
            <div className="cal">
              {dayLabels.map((d, i) => (
                <div key={`dl-${i}`} className="cal__day">
                  {d}
                </div>
              ))}
              {Array.from({ length: calendar.startDay }).map((_, i) => (
                <div key={`bl-${i}`} className="cal__cell is-disabled"></div>
              ))}
              {Array.from({ length: calendar.daysInMonth - calendar.firstVisible + 1 }).map((_, i) => {
                const d = calendar.firstVisible + i;
                const cls = `cal__cell${d === day ? ' is-selected' : ''}`;
                return (
                  <button key={`d-${d}`} className={cls} onClick={() => setDay(d)}>
                    {d}
                  </button>
                );
              })}
            </div>
            <div className="panel-title" style={{ marginTop: 28 }}>
              Available Times
            </div>
            <div className="times">
              {TIMES.map((t) => (
                <button key={t} className={`time${time === t ? ' is-selected' : ''}`} onClick={() => setTime(t)}>
                  {t}
                </button>
              ))}
            </div>
            <div className="panel-nav">
              <button className="btn btn--ghost" onClick={() => go(1)}>
                ← Back
              </button>
              <button className="btn btn--primary" onClick={() => go(3)}>
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="panel-title">03 · Vehicle Details</div>
            <p className="panel-sub">A few quick details so we have the right film on hand.</p>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <div className="form__row">
                <div>
                  <label>Year</label>
                  <input type="text" placeholder="2022" />
                </div>
                <div>
                  <label>Make</label>
                  <input type="text" placeholder="Toyota" />
                </div>
              </div>
              <div className="form__row">
                <div>
                  <label>Model</label>
                  <input type="text" placeholder="Tacoma" />
                </div>
                <div>
                  <label>Body Style</label>
                  <select>
                    <option>Sedan</option>
                    <option>Coupe</option>
                    <option>SUV</option>
                    <option>Truck</option>
                    <option>Van / Wagon</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label>Notes (optional)</label>
                <div className="notes-list">
                  {notes.map((value, i) => (
                    <div key={i} className="notes-list__row">
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => {
                          const next = [...notes];
                          next[i] = e.target.value;
                          setNotes(next);
                        }}
                        placeholder="e.g. front two windows only, 20% shade…"
                      />
                      <button
                        type="button"
                        className="notes-list__remove"
                        aria-label="Remove note"
                        onClick={() => setNotes(notes.filter((_, idx) => idx !== i))}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="notes-list__add"
                    onClick={() => setNotes([...notes, ''])}
                  >
                    + Add a note
                  </button>
                </div>
              </div>
            </form>

            {serviceHasRear && (
              <>
            <div className="panel-title" style={{ marginTop: 32 }}>
              Rear Window Style
            </div>
            <p className="panel-sub">
              One-piece rear glass (Tesla Model 3/Y, etc.) covers more area, so pricing differs.
            </p>
            <div className="tile-grid tile-grid--rear-glass">
              {REAR_GLASS_OPTIONS.map((r) => {
                const variant = r.img ? 'tile--rear-glass' : 'tile--rear-glass-bar';
                return (
                  <button
                    key={r.value}
                    className={`tile ${variant}${rearGlass === r.value ? ' is-selected' : ''}`}
                    onClick={() => setRearGlass(r.value)}
                    type="button"
                  >
                    {r.img && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img className="tile__img" src={r.img} alt="" loading="lazy" />
                    )}
                    <span className="tile__label">{r.label}</span>
                    <span className="tile__meta">{r.meta}</span>
                  </button>
                );
              })}
            </div>
            {rearGlass === 'one-piece' && (
              <p
                className="panel-sub"
                style={{
                  marginTop: 16,
                  padding: '14px 18px',
                  border: '1px solid var(--line)',
                  background: 'rgba(255,255,255,0.02)',
                  fontSize: 13,
                }}
              >
                Got it. One-piece rear glass takes more film and time. We&apos;ll send a custom quote based on your
                vehicle&apos;s actual glass area before confirming.
              </p>
            )}
              </>
            )}

            <div className="panel-nav">
              <button className="btn btn--ghost" onClick={() => go(2)}>
                ← Back
              </button>
              <button className="btn btn--primary" onClick={() => go(4)}>
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <div className="panel-title">04 · Your Info</div>
            <p className="panel-sub">We&apos;ll send a text confirmation shortly.</p>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <div className="form__row">
                <div>
                  <label>Full Name</label>
                  <input type="text" placeholder="Your name" />
                </div>
                <div>
                  <label>Phone</label>
                  <input type="tel" placeholder="(xxx) xxx-xxxx" />
                </div>
              </div>
              <div>
                <label>Email</label>
                <input type="email" placeholder="you@example.com" />
              </div>
            </form>
            <dl className="summary">
              <div className="summary-row">
                <dt>Service</dt>
                <dd>{service}</dd>
              </div>
              <div className="summary-row">
                <dt>Location</dt>
                <dd>{location}</dd>
              </div>
              {serviceHasRear && (
                <div className="summary-row">
                  <dt>Rear Window</dt>
                  <dd>{rearGlassLabel}</dd>
                </div>
              )}
              <div className="summary-row">
                <dt>Date</dt>
                <dd>{dateStr ?? 'Not selected'}</dd>
              </div>
              <div className="summary-row">
                <dt>Time</dt>
                <dd>{time}</dd>
              </div>
            </dl>
            <div className="panel-nav">
              <button className="btn btn--ghost" onClick={() => go(3)}>
                ← Back
              </button>
              <button className="btn btn--primary" onClick={() => go(5)}>
                Confirm Booking
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <div className="success">
              <div className="success__icon">✓</div>
              <div className="panel-title">You&apos;re Booked.</div>
              <p className="panel-sub">
                We&apos;ve got you on the schedule. A confirmation text is on its way.
                <br />
                Questions? Call or text <strong style={{ color: 'var(--ink)' }}>{PHONE}</strong>.
              </p>
              <dl className="summary" style={{ textAlign: 'left', maxWidth: 480, margin: '24px auto 0' }}>
                <div className="summary-row">
                  <dt>Service</dt>
                  <dd>{service}</dd>
                </div>
                {serviceHasRear && (
                  <div className="summary-row">
                    <dt>Rear Window</dt>
                    <dd>{rearGlassLabel}</dd>
                  </div>
                )}
                <div className="summary-row">
                  <dt>Date</dt>
                  <dd>{dateStr ?? 'Not selected'}</dd>
                </div>
                <div className="summary-row">
                  <dt>Time</dt>
                  <dd>{time}</dd>
                </div>
              </dl>
              <div style={{ marginTop: 32 }}>
                <Link href="/" className="btn btn--ghost">
                  Back To Home
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
