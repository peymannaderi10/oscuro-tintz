'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { PHONE } from '@/lib/siteMeta';

type ServiceKey =
  | 'carbonFull'
  | 'ceramicFull'
  | 'ceramicPlusFull'
  | 'frontTwo'
  | 'windshield'
  | 'sunroof'
  | 'panoramic'
  | 'sunStrip'
  | 'tintRemoval'
  | 'custom';

type LocationKey = 'shop' | 'mobile';
type RearGlass = 'standard' | 'one-piece' | 'unsure';

const REAR_GLASS_OPTIONS: { value: RearGlass; label: string; meta: string; img?: string }[] = [
  { value: 'standard',  label: 'Standard',         meta: 'Separate rear glass, like most cars', img: '/Oscuro%20tints/standard.png' },
  { value: 'one-piece', label: 'Full / One-Piece', meta: 'Extends to the roof in one solid panel (Tesla Model 3/Y, etc.)', img: '/Oscuro%20tints/full-one-piece.png' },
  { value: 'unsure',    label: 'Not Sure',         meta: "We'll confirm with you" },
];

const SERVICES: { key: ServiceKey; label: string; meta: string; hasRear: boolean }[] = [
  { key: 'carbonFull',      label: 'Carbon, Full',         meta: 'From $290 · ~3 hrs',            hasRear: true  },
  { key: 'ceramicFull',     label: 'Ceramic, Full',        meta: 'From $390 · ~3 hrs',            hasRear: true  },
  { key: 'ceramicPlusFull', label: 'Ceramic Plus, Full',   meta: 'From $500 · ~3 hrs',            hasRear: true  },
  { key: 'frontTwo',        label: 'Front Two',            meta: 'From $120 · ~1 hr',             hasRear: false },
  { key: 'windshield',      label: 'Windshield',           meta: 'From $140 · ~1 hr',             hasRear: false },
  { key: 'sunroof',         label: 'Sunroof',              meta: 'From $80 · ~30 min',            hasRear: false },
  { key: 'panoramic',       label: 'Panoramic Sunroof',    meta: 'From $120 · ~45 min',           hasRear: false },
  { key: 'sunStrip',        label: 'Sun Strip',            meta: 'From $50 · ~30 min',            hasRear: false },
  { key: 'tintRemoval',     label: 'Tint Removal',         meta: 'From $50 · ~1–2 hrs',           hasRear: true  },
  { key: 'custom',          label: 'Custom',               meta: "We'll confirm",                  hasRear: true  },
];

const LOCATIONS: { value: LocationKey; label: string; meta: string }[] = [
  { value: 'shop',   label: 'Our Shop', meta: 'Yuba City, CA' },
  { value: 'mobile', label: 'Mobile',   meta: 'We come to you' },
];

const STEPS = [
  { n: '01', label: 'Service',     sub: 'Pick your install' },
  { n: '02', label: 'Date & Time', sub: 'Choose a slot' },
  { n: '03', label: 'Vehicle',     sub: 'Year / make / model' },
  { n: '04', label: 'Your Info',   sub: 'Confirm & book' },
];

type AvailabilitySlot = {
  startAt: string;
  appointmentSegments?: {
    teamMemberId?: string;
    serviceVariationVersion?: string | number;
  }[];
};

type Slot = {
  startAt: string;
  teamMemberId: string;
  serviceVariationVersion: string;
};

const PT_TZ = 'America/Los_Angeles';

function fmtDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Maps a Square ISO startAt to the Pacific-time date key (YYYY-MM-DD). */
function dateKeyInPT(iso: string): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: PT_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date(iso));
  const y = parts.find((p) => p.type === 'year')?.value ?? '';
  const m = parts.find((p) => p.type === 'month')?.value ?? '';
  const d = parts.find((p) => p.type === 'day')?.value ?? '';
  return `${y}-${m}-${d}`;
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: PT_TZ,
  });
}

export function BookingFlow() {
  const [step, setStep] = useState(1);
  const [serviceKey, setServiceKey] = useState<ServiceKey | null>(null);
  const [location, setLocation] = useState<LocationKey>('shop');
  const [rearGlass, setRearGlass] = useState<RearGlass>('standard');
  const [notes, setNotes] = useState<string[]>([]);

  // Vehicle
  const [vehicleYear, setVehicleYear] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleBody, setVehicleBody] = useState('Sedan');

  // Contact
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Calendar / availability
  const today = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState<number>(today.getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [slotsByDate, setSlotsByDate] = useState<Record<string, Slot[]>>({});
  const [loadingRange, setLoadingRange] = useState(false);
  const [rangeError, setRangeError] = useState<string | null>(null);
  const fetchedRangesRef = useRef<Set<string>>(new Set());

  // Submit
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const service = serviceKey ? SERVICES.find((s) => s.key === serviceKey) ?? null : null;
  const serviceHasRear = service?.hasRear ?? false;
  const locationLabel = LOCATIONS.find((l) => l.value === location)!.label;
  const monthName = new Date(viewYear, viewMonth, 1).toLocaleString('en-US', { month: 'long' });

  const dateStr = selectedDate
    ? new Date(`${selectedDate}T12:00:00`).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  const rearGlassLabel = !serviceHasRear
    ? 'N/A (front-only service)'
    : rearGlass === 'one-piece'
      ? 'Full / One-Piece (custom quote)'
      : rearGlass === 'unsure'
        ? "Not Sure (we'll confirm)"
        : 'Standard';

  const isAtTodayMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth();
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 6, 1);
  const isAtMaxMonth = viewYear === maxDate.getFullYear() && viewMonth === maxDate.getMonth();

  // ----- Calendar helpers -----
  const calendar = useMemo(() => {
    const isCurrentMonth = today.getFullYear() === viewYear && today.getMonth() === viewMonth;
    const firstVisible = isCurrentMonth ? today.getDate() : 1;
    const firstVisibleDate = new Date(viewYear, viewMonth, firstVisible);
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const startDay = firstVisibleDate.getDay();
    return { startDay, daysInMonth, firstVisible };
  }, [viewYear, viewMonth, today]);

  const goToPrevMonth = () => {
    if (isAtTodayMonth) return;
    const prev = new Date(viewYear, viewMonth - 1, 1);
    setViewYear(prev.getFullYear());
    setViewMonth(prev.getMonth());
    setSelectedDate(null);
    setSelectedSlot(null);
  };
  const goToNextMonth = () => {
    if (isAtMaxMonth) return;
    const next = new Date(viewYear, viewMonth + 1, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  // ----- Availability fetch -----
  const parseSlots = useCallback((data: { availabilities?: AvailabilitySlot[] }) => {
    const out: Record<string, Slot[]> = {};
    for (const a of data.availabilities ?? []) {
      const seg = a.appointmentSegments?.[0];
      if (!seg?.teamMemberId || seg.serviceVariationVersion == null) continue;
      const slot: Slot = {
        startAt: a.startAt,
        teamMemberId: seg.teamMemberId,
        serviceVariationVersion: String(seg.serviceVariationVersion),
      };
      const key = dateKeyInPT(slot.startAt);
      if (!out[key]) out[key] = [];
      out[key].push(slot);
    }
    for (const k of Object.keys(out)) {
      out[k].sort((a, b) => a.startAt.localeCompare(b.startAt));
    }
    return out;
  }, []);

  // Quiet fetch (no loading spinner) for background prefetching.
  const fetchRangeQuiet = useCallback(
    async (service: ServiceKey, startDate: string, endDate: string) => {
      const key = `${service}|${startDate}|${endDate}`;
      if (fetchedRangesRef.current.has(key)) return;
      fetchedRangesRef.current.add(key);
      try {
        const res = await fetch(
          `/api/availability?service=${service}&startDate=${startDate}&endDate=${endDate}`,
        );
        const data = await res.json();
        if (!res.ok) return;
        setSlotsByDate((prev) => ({ ...prev, ...parseSlots(data) }));
      } catch {
        fetchedRangesRef.current.delete(key);
      }
    },
    [parseSlots],
  );

  // Explicit fetch with loading state (for the visible month on step 2).
  const fetchRange = useCallback(
    async (startDate: string, endDate: string) => {
      if (!serviceKey) return;
      const key = `${serviceKey}|${startDate}|${endDate}`;
      if (fetchedRangesRef.current.has(key)) return;
      fetchedRangesRef.current.add(key);
      setLoadingRange(true);
      setRangeError(null);
      try {
        const res = await fetch(
          `/api/availability?service=${serviceKey}&startDate=${startDate}&endDate=${endDate}`,
        );
        const data = await res.json();
        if (!res.ok) {
          fetchedRangesRef.current.delete(key);
          setRangeError(data.error || 'Failed to load availability');
          return;
        }
        setSlotsByDate((prev) => ({ ...prev, ...parseSlots(data) }));
      } catch {
        fetchedRangesRef.current.delete(key);
        setRangeError('Could not connect to the server. Please try again.');
      } finally {
        setLoadingRange(false);
      }
    },
    [serviceKey, parseSlots],
  );

  // Reset cache + selected slot if the user changes service after fetching.
  const preloadedServiceRef = useRef<ServiceKey | null>(null);
  useEffect(() => {
    fetchedRangesRef.current.clear();
    setSlotsByDate({});
    setSelectedSlot(null);
    setSelectedDate(null);
    preloadedServiceRef.current = null;
  }, [serviceKey]);

  // Prefetch 3 months of availability in a single request when a service
  // is selected so slots are cached by the time the user reaches step 2.
  useEffect(() => {
    if (!serviceKey) return;
    if (preloadedServiceRef.current === serviceKey) return;
    preloadedServiceRef.current = serviceKey;
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 3, 0);
    fetchRangeQuiet(serviceKey, fmtDateKey(start), fmtDateKey(end));
  }, [serviceKey, fetchRangeQuiet]);

  // Also fetch the visible month on step 2 (covers months beyond the
  // 3-month prefetch if the user navigates far out).
  useEffect(() => {
    if (step !== 2) return;
    const startD = new Date(viewYear, viewMonth, 1);
    const endD = new Date(viewYear, viewMonth + 1, 0);
    fetchRange(fmtDateKey(startD), fmtDateKey(endD));
  }, [step, viewYear, viewMonth, fetchRange]);

  const slotsForSelected = selectedDate ? slotsByDate[selectedDate] ?? [] : [];

  // ----- Step navigation -----
  const go = (n: number) => {
    setStep(n);
    if (typeof window !== 'undefined') {
      const panel = document.querySelector('.booking-panel') as HTMLElement | null;
      if (panel) {
        const top = panel.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  const validateContactStep = (): boolean => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!phone.trim()) errs.phone = 'Phone is required';
    if (!email.trim()) errs.email = 'Email is required';
    else if (!/.+@.+\..+/.test(email)) errs.email = 'Enter a valid email';
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleConfirm = async () => {
    if (!validateContactStep()) return;
    if (!selectedSlot) {
      setSubmitError('Please pick a date and time before confirming.');
      go(2);
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);

    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0] ?? '';
    const lastName = nameParts.slice(1).join(' ');

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email: email.trim(),
          phone: phone.trim(),
          serviceKey,
          rearGlass: serviceHasRear ? rearGlass : 'standard',
          vehicleYear: vehicleYear.trim(),
          vehicleMake: vehicleMake.trim(),
          vehicleModel: vehicleModel.trim(),
          vehicleBody,
          serviceLocation: locationLabel,
          notes: notes.filter((n) => n.trim()).join('\n').trim(),
          startAt: selectedSlot.startAt,
          serviceVariationVersion: selectedSlot.serviceVariationVersion,
          teamMemberId: selectedSlot.teamMemberId,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || 'Failed to create booking. Please try again.');
        return;
      }
      setBookingId(data.booking?.id ?? null);
      go(5);
    } catch {
      setSubmitError('Could not connect to the server. Please try again.');
    } finally {
      setIsSubmitting(false);
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
                  key={s.key}
                  className={`tile${serviceKey === s.key ? ' is-selected' : ''}`}
                  onClick={() => setServiceKey(s.key)}
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
              <button className="btn btn--primary" onClick={() => go(2)} disabled={!serviceKey}>
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="panel-title">02 · Pick A Date</div>
            <p className="panel-sub">Real availability from our calendar. All times in PT.</p>
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
                {monthName} {viewYear}
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
            {rangeError && (
              <p className="panel-sub" style={{ color: '#ff8080' }}>
                {rangeError}
              </p>
            )}
            {loadingRange && !rangeError ? (
              <div className="cal-spinner">
                <div className="cal-spinner__ring" />
                <p>Loading availability…</p>
              </div>
            ) : (
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
                const key = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                const hasSlots = (slotsByDate[key]?.length ?? 0) > 0;
                const isSelected = selectedDate === key;
                const cls = `cal__cell${isSelected ? ' is-selected' : ''}${!hasSlots ? ' is-disabled' : ''}`;
                return (
                  <button
                    key={`d-${d}`}
                    className={cls}
                    disabled={!hasSlots}
                    onClick={() => {
                      if (!hasSlots) return;
                      setSelectedDate(key);
                      setSelectedSlot(null);
                    }}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
            )}
            <div className="panel-title" style={{ marginTop: 28 }}>
              Available Times
            </div>
            {selectedDate ? (
              slotsForSelected.length > 0 ? (
                <div className="times">
                  {slotsForSelected.map((s) => (
                    <button
                      key={s.startAt}
                      className={`time${selectedSlot?.startAt === s.startAt ? ' is-selected' : ''}`}
                      onClick={() => setSelectedSlot(s)}
                    >
                      {formatTime(s.startAt)}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="panel-sub">No times available on this date.</p>
              )
            ) : (
              <p className="panel-sub">Pick a date above to see available times.</p>
            )}
            <div className="panel-nav">
              <button className="btn btn--ghost" onClick={() => go(1)}>
                ← Back
              </button>
              <button
                className="btn btn--primary"
                onClick={() => go(3)}
                disabled={!selectedSlot}
              >
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
                  <input
                    type="text"
                    placeholder="2022"
                    value={vehicleYear}
                    onChange={(e) => setVehicleYear(e.target.value)}
                  />
                </div>
                <div>
                  <label>Make</label>
                  <input
                    type="text"
                    placeholder="Toyota"
                    value={vehicleMake}
                    onChange={(e) => setVehicleMake(e.target.value)}
                  />
                </div>
              </div>
              <div className="form__row">
                <div>
                  <label>Model</label>
                  <input
                    type="text"
                    placeholder="Tacoma"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                  />
                </div>
                <div>
                  <label>Body Style</label>
                  <select value={vehicleBody} onChange={(e) => setVehicleBody(e.target.value)}>
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
                    Got it. One-piece rear glass takes more film and time. We&apos;ll send a custom quote based on
                    your vehicle&apos;s actual glass area before confirming.
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
                  <input
                    type="text"
                    placeholder="Your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  {fieldErrors.fullName && (
                    <p className="form__status" style={{ color: '#ff8080' }}>{fieldErrors.fullName}</p>
                  )}
                </div>
                <div>
                  <label>Phone</label>
                  <input
                    type="tel"
                    placeholder="(xxx) xxx-xxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {fieldErrors.phone && (
                    <p className="form__status" style={{ color: '#ff8080' }}>{fieldErrors.phone}</p>
                  )}
                </div>
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {fieldErrors.email && (
                  <p className="form__status" style={{ color: '#ff8080' }}>{fieldErrors.email}</p>
                )}
              </div>
            </form>
            <dl className="summary">
              <div className="summary-row">
                <dt>Service</dt>
                <dd>{service?.label ?? 'Not selected'}</dd>
              </div>
              <div className="summary-row">
                <dt>Location</dt>
                <dd>{locationLabel}</dd>
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
                <dd>{selectedSlot ? formatTime(selectedSlot.startAt) : 'Not selected'}</dd>
              </div>
            </dl>
            {submitError && (
              <p className="form__status" style={{ color: '#ff8080', marginTop: 16 }}>
                {submitError}
              </p>
            )}
            <div className="panel-nav">
              <button className="btn btn--ghost" onClick={() => go(3)} disabled={isSubmitting}>
                ← Back
              </button>
              <button
                className="btn btn--primary"
                onClick={handleConfirm}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting…' : 'Confirm Booking'}
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
                  <dd>{service?.label ?? 'Not selected'}</dd>
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
                  <dd>{selectedSlot ? formatTime(selectedSlot.startAt) : 'Not selected'}</dd>
                </div>
                {bookingId && (
                  <div className="summary-row">
                    <dt>Booking #</dt>
                    <dd style={{ fontFamily: 'monospace', fontSize: 12 }}>{bookingId}</dd>
                  </div>
                )}
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
