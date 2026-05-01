'use client';

import { useState } from 'react';

export function ContactForm() {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<string>('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSending(true);
    setStatus('Sending…');
    setTimeout(() => {
      form.reset();
      setSending(false);
      setStatus("Thanks, we'll get back to you within 24 hours.");
    }, 900);
  };

  return (
    <form className="form reveal" onSubmit={onSubmit} data-contact-form>
      <div>
        <span className="eyebrow">Send A Message</span>
        <h2 style={{ margin: '16px 0 28px' }}>Let&apos;s Talk</h2>
      </div>
      <div className="form__row">
        <div>
          <label>Name</label>
          <input type="text" required placeholder="Your name" />
        </div>
        <div>
          <label>Phone</label>
          <input type="tel" required placeholder="(xxx) xxx-xxxx" />
        </div>
      </div>
      <div>
        <label>Email</label>
        <input type="email" required placeholder="you@example.com" />
      </div>
      <div className="form__row">
        <div>
          <label>Vehicle</label>
          <input type="text" placeholder="Year / Make / Model" />
        </div>
        <div>
          <label>Service</label>
          <select>
            <option>Ceramic Tint</option>
            <option>Carbon Tint</option>
            <option>Tint Removal</option>
            <option>Mobile Install</option>
            <option>Other / Not Sure</option>
          </select>
        </div>
      </div>
      <div>
        <label>Message</label>
        <textarea placeholder="Tell me about the job…"></textarea>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
        <button type="submit" className="btn btn--primary" disabled={sending}>
          {sending ? 'Sending…' : 'Send Message'}
        </button>
        <span className={`form__status${status && !sending ? ' is-ok' : ''}`}>{status}</span>
      </div>
    </form>
  );
}
