'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { PHONE } from '@/lib/siteMeta';

type Service = string;
type Location = string;

const SERVICES: { value: Service; label: string; meta: string }[] = [
  { value: 'Ceramic Tint, Full', label: 'Ceramic, Full', meta: 'From $390 · ~3 hrs' },
  { value: 'Carbon Tint, Full', label: 'Carbon, Full', meta: 'From $290 · ~3 hrs' },
  { value: 'Front Two Windows', label: 'Front Two', meta: 'From $120 · ~1 hr' },
  { value: 'Windshield, 70%', label: 'Windshield 70%', meta: 'From $150 · ~1 hr' },
  { value: 'Tint Removal', label: 'Tint Removal', meta: 'From $50 · ~1–2 hrs' },
  { value: 'Custom / Not Sure', label: 'Custom', meta: "We'll confirm" },
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

  const year = TODAY.getFullYear();
  const month = TODAY.getMonth();
  const dateStr = day != null ? `April ${day}, ${year}` : null;

  const calendar = useMemo(() => {
    const first = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = first.getDay();
    return { startDay, daysInMonth };
  }, [year, month]);

  const go = (n: number) => {
    setStep(n);
    if (typeof window !== 'undefined') {
      const grid = document.querySelector('.book-grid') as HTMLElement | null;
      if (grid) window.scrollTo({ top: grid.offsetTop - 100, behavior: 'smooth' });
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
        <div className="api-note">Square Appointments integration, API to be wired</div>
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
            <p className="panel-sub">Available dates this month. All times in PT.</p>
            <div className="cal">
              {dayLabels.map((d, i) => (
                <div key={`dl-${i}`} className="cal__day">
                  {d}
                </div>
              ))}
              {Array.from({ length: calendar.startDay }).map((_, i) => (
                <div key={`bl-${i}`} className="cal__cell is-disabled"></div>
              ))}
              {Array.from({ length: calendar.daysInMonth }).map((_, i) => {
                const d = i + 1;
                const dateObj = new Date(year, month, d);
                const disabled = dateObj < TODAY;
                const cls = `cal__cell${disabled ? ' is-disabled' : ''}${d === day ? ' is-selected' : ''}`;
                return (
                  <button
                    key={`d-${d}`}
                    className={cls}
                    disabled={disabled}
                    onClick={() => !disabled && setDay(d)}
                  >
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
                <textarea placeholder="Shade preference, specific windows, anything we should know…" />
              </div>
            </form>
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
              <div className="summary-row">
                <dt>Date</dt>
                <dd>{dateStr ?? '—'}</dd>
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
                <div className="summary-row">
                  <dt>Date</dt>
                  <dd>{dateStr ?? '—'}</dd>
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
