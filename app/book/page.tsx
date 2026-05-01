import Link from 'next/link';
import type { Metadata } from 'next';
import { BookingFlow } from '@/components/BookingFlow';

export const metadata: Metadata = {
  title: 'Book',
  description:
    'Book a window tinting appointment with Oscuro Tintz. Pick your service, date, time, and vehicle. Mobile service available across Yuba City and Sutter County.',
  alternates: { canonical: '/book' },
};

const bookStyles = `
  .book-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: clamp(32px, 5vw, 72px); align-items: flex-start; }
  @media (max-width: 900px) { .book-grid { grid-template-columns: 1fr; } }

  .steps { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
  .steps li { padding: 20px 24px; border: 1px solid var(--line); background: var(--bg-2); display: grid; grid-template-columns: auto 1fr; gap: 18px; align-items: center; transition: border-color .2s; }
  .steps li.is-current { border-color: var(--ink); background: var(--bg-3); }
  .steps li.is-done { opacity: 0.6; }
  .steps__n { width: 40px; height: 40px; border: 1px solid var(--line-strong); display: flex; align-items: center; justify-content: center; font-family: 'Oswald', sans-serif; font-size: 16px; letter-spacing: 0.1em; }
  .steps li.is-current .steps__n { border-color: var(--ink); background: var(--ink); color: #000; }
  .steps__label { font-family: 'Oswald', sans-serif; font-size: 16px; letter-spacing: 0.08em; text-transform: uppercase; }
  .steps__sub { font-size: 12px; color: var(--ink-muted); letter-spacing: 0.04em; margin-top: 4px; }

  .booking-panel { border: 1px solid var(--line); background: var(--bg-2); padding: clamp(28px, 4vw, 48px); min-height: 560px; }
  .panel-title { font-family: 'Oswald', sans-serif; font-size: 28px; text-transform: uppercase; margin-bottom: 10px; }
  .panel-sub { color: var(--ink-muted); margin-bottom: 32px; }

  .tile-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 24px; }
  @media (max-width: 600px) { .tile-grid { grid-template-columns: repeat(2, 1fr); } }
  .tile { padding: 20px 18px; border: 1px solid var(--line); background: var(--bg); cursor: pointer; transition: all .2s; text-align: left; display: grid; gap: 6px; }
  .tile:hover { border-color: var(--line-strong); }
  .tile.is-selected { border-color: var(--ink); background: var(--bg-3); }
  .tile__label { font-family: 'Oswald', sans-serif; font-size: 15px; text-transform: uppercase; letter-spacing: 0.04em; }
  .tile__meta { font-size: 12px; color: var(--ink-muted); }

  .cal { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; margin-bottom: 24px; }
  .cal__day, .cal__cell { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 500; border: 1px solid transparent; }
  .cal__day { color: var(--ink-dim); font-size: 10px; letter-spacing: 0.2em; aspect-ratio: auto; padding: 10px 0; }
  .cal__cell { background: var(--bg); border-color: var(--line); cursor: pointer; color: var(--ink); transition: all .15s; }
  .cal__cell:hover { border-color: var(--line-strong); background: var(--bg-3); }
  .cal__cell.is-disabled { color: var(--ink-dim); cursor: not-allowed; background: transparent; border-color: transparent; }
  .cal__cell.is-selected { background: var(--ink); color: #000; border-color: var(--ink); font-weight: 700; }

  .times { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
  @media (max-width: 600px) { .times { grid-template-columns: repeat(3, 1fr); } }
  .time { padding: 12px 0; text-align: center; border: 1px solid var(--line); background: var(--bg); cursor: pointer; font-size: 13px; letter-spacing: 0.1em; transition: all .2s; }
  .time:hover { border-color: var(--line-strong); }
  .time.is-selected { background: var(--ink); color: #000; border-color: var(--ink); font-weight: 700; }

  .summary { border: 1px solid var(--line); padding: 24px; background: var(--bg); margin-top: 32px; display: grid; gap: 12px; }
  .summary-row { display: flex; justify-content: space-between; font-size: 14px; }
  .summary-row dt { color: var(--ink-muted); letter-spacing: 0.08em; text-transform: uppercase; font-size: 11px; }
  .summary-row dd { margin: 0; font-family: 'Oswald', sans-serif; font-size: 14px; letter-spacing: 0.04em; text-transform: uppercase; }

  .panel-nav { display: flex; justify-content: space-between; margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--line); gap: 14px; }

  .success { text-align: center; padding: 40px 20px; }
  .success__icon { width: 80px; height: 80px; border: 1px solid var(--chrome-3); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; font-size: 32px; color: var(--chrome-3); }

  .api-note { font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink-dim); padding: 14px 18px; border: 1px dashed var(--line-strong); margin-top: 24px; display: inline-block; }
`;

export default function BookPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: bookStyles }} />

      <section className="pagehead">
        <div className="pagehead__bg"></div>
        <div className="container pagehead__inner reveal">
          <div className="breadcrumbs">
            <Link href="/">Home</Link> <span className="sep">/</span> <span>Book</span>
          </div>
          <span className="eyebrow">Reserve Your Install</span>
          <h1>Book An Appointment</h1>
          <p>Four quick steps, service, date &amp; time, vehicle, and your info. We&apos;ll confirm by text.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <BookingFlow />
        </div>
      </section>
    </>
  );
}
