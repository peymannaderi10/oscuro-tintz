'use client';

import { useCallback, useEffect, useImperativeHandle, useRef, useState, forwardRef } from 'react';

interface SquareCard {
  attach: (selector: string) => Promise<void>;
  tokenize: () => Promise<{ status: string; token?: string; errors?: { message: string }[] }>;
  destroy: () => void;
}

interface SquareWallet {
  tokenize: () => Promise<{ status: string; token?: string; errors?: { message: string }[] }>;
  destroy?: () => void;
  attach?: (selector: string) => Promise<void>;
}

interface SquarePayments {
  card: (opts?: Record<string, unknown>) => Promise<SquareCard>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  applePay: (paymentRequest: any) => Promise<SquareWallet | null>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  googlePay: (paymentRequest: any) => Promise<SquareWallet | null>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  paymentRequest: (opts: Record<string, unknown>) => any;
}

interface SquareGlobal {
  payments: (appId: string, locationId: string) => SquarePayments;
}

declare global {
  interface Window {
    Square?: SquareGlobal;
  }
}

export interface SquareCardFormHandle {
  tokenize: () => Promise<string | null>;
}

interface SquareCardFormProps {
  onWalletToken?: (token: string) => void;
  disabled?: boolean;
}

const SCRIPT_URL = 'https://web.squarecdn.com/v1/square.js';

const CARD_STYLE = {
  '.input-container': {
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: '4px',
  },
  '.input-container.is-focus': {
    borderColor: '#F5F5F5',
  },
  '.input-container.is-error': {
    borderColor: '#ff8080',
  },
  input: {
    backgroundColor: '#000000',
    color: '#F5F5F5',
    fontFamily: 'sans-serif',
    fontSize: '15px',
  },
  'input::placeholder': {
    color: '#757575',
  },
  'input.is-error': {
    color: '#ff8080',
  },
  '.message-text': { color: '#B0B0B0' },
  '.message-icon': { color: '#B0B0B0' },
  '.message-text.is-error': { color: '#ff8080' },
  '.message-icon.is-error': { color: '#ff8080' },
};

export const SquareCardForm = forwardRef<SquareCardFormHandle, SquareCardFormProps>(function SquareCardForm({ onWalletToken, disabled }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<SquareCard | null>(null);
  const applePayRef = useRef<SquareWallet | null>(null);
  const googlePayRef = useRef<SquareWallet | null>(null);
  const walletTokenRef = useRef<string | null>(null);
  const [ready, setReady] = useState(false);
  const [hasApplePay, setHasApplePay] = useState(false);
  const [hasGooglePay, setHasGooglePay] = useState(false);
  const [walletPaid, setWalletPaid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initAttempted = useRef(false);

  const initCard = useCallback(async () => {
    if (initAttempted.current) return;
    initAttempted.current = true;

    const appId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
    const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

    if (!appId || !locationId) {
      setError('Square payment configuration is missing.');
      return;
    }

    try {
      const payments = window.Square!.payments(appId, locationId);

      // Card form
      const card = await payments.card({ style: CARD_STYLE });
      if (containerRef.current) {
        await card.attach('#square-card-container');
        cardRef.current = card;
        setReady(true);
      }

      const paymentRequest = payments.paymentRequest({
        countryCode: 'US',
        currencyCode: 'USD',
        total: { amount: '30.00', label: 'Booking Deposit' },
      });

      // Apple Pay — no attach(), we render our own button
      try {
        const applePay = await payments.applePay(paymentRequest);
        if (applePay && typeof applePay.tokenize === 'function') {
          applePayRef.current = applePay;
          setHasApplePay(true);
        }
      } catch { /* not available */ }

      // Google Pay — SDK returns a tokenizer; we render our own button
      try {
        const googlePay = await payments.googlePay(paymentRequest);
        if (googlePay && typeof googlePay.tokenize === 'function') {
          googlePayRef.current = googlePay;
          setHasGooglePay(true);
        }
      } catch { /* not available */ }

    } catch (err) {
      console.error('Square init failed:', err);
      setError('Could not load the payment form. Please try again.');
    }
  }, []);

  // Keep refs to latest callbacks so the Google Pay click handler
  // (attached once) always sees fresh values.
  const onWalletTokenRef = useRef(onWalletToken);
  const disabledRef = useRef(disabled);
  useEffect(() => { onWalletTokenRef.current = onWalletToken; }, [onWalletToken]);
  useEffect(() => { disabledRef.current = disabled; }, [disabled]);


  useEffect(() => {
    if (window.Square) {
      initCard();
      return;
    }

    if (document.querySelector(`script[src="${SCRIPT_URL}"]`)) {
      const check = setInterval(() => {
        if (window.Square) {
          clearInterval(check);
          initCard();
        }
      }, 100);
      return () => clearInterval(check);
    }

    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = () => initCard();
    script.onerror = () => setError('Failed to load Square payment SDK.');
    document.head.appendChild(script);

    return () => {
      if (cardRef.current) {
        try { cardRef.current.destroy(); } catch { /* noop */ }
        cardRef.current = null;
      }
    };
  }, [initCard]);

  useImperativeHandle(ref, () => ({
    async tokenize() {
      if (walletTokenRef.current) return walletTokenRef.current;

      if (!cardRef.current) return null;
      try {
        const result = await cardRef.current.tokenize();
        if (result.status === 'OK' && result.token) return result.token;
        const msg = result.errors?.map((e) => e.message).join(', ') || 'Card verification failed.';
        setError(msg);
        return null;
      } catch {
        setError('Payment processing error. Please try again.');
        return null;
      }
    },
  }));

  const hasWallet = hasApplePay || hasGooglePay;

  return (
    <div className="square-card-form">
      {/* Apple Pay — per docs: <button id="apple-pay-button">, no attach(),
          tokenize() called immediately in click handler */}
      {hasApplePay && !walletPaid && (
        <button
          type="button"
          className="apple-pay-btn"
          onClick={async (e) => {
            e.preventDefault();
            if (disabled || !applePayRef.current) return;
            const result = await applePayRef.current.tokenize();
            if (result.status === 'OK' && result.token) {
              walletTokenRef.current = result.token;
              setWalletPaid(true);
              setError(null);
              onWalletToken?.(result.token);
            } else if (result.status === 'Cancel') {
              // User dismissed the Apple Pay sheet — do nothing, let them retry
            } else {
              setError(result.errors?.map((err) => err.message).join(', ') || 'Apple Pay failed.');
            }
          }}
        >
          <svg viewBox="0 -34.55 120.3 120.3" xmlns="http://www.w3.org/2000/svg" className="apple-pay-btn__logo" fill="#ffffff">
            <path d="M22.8 6.6c1.4-1.8 2.4-4.2 2.1-6.6-2.1.1-4.6 1.4-6.1 3.1-1.3 1.5-2.5 4-2.2 6.3 2.4.3 4.7-1 6.2-2.8M24.9 10c-3.4-.2-6.3 1.9-7.9 1.9-1.6 0-4.1-1.8-6.8-1.8-3.5.1-6.7 2-8.5 5.2-3.6 6.3-1 15.6 2.6 20.7 1.7 2.5 3.8 5.3 6.5 5.2 2.6-.1 3.6-1.7 6.7-1.7s4 1.7 6.8 1.6 4.6-2.5 6.3-5.1c2-2.9 2.8-5.7 2.8-5.8-.1-.1-5.5-2.1-5.5-8.3-.1-5.2 4.2-7.7 4.4-7.8-2.3-3.6-6.1-4-7.4-4.1" />
            <path d="M54.3 2.9c7.4 0 12.5 5.1 12.5 12.4 0 7.4-5.2 12.5-12.7 12.5H46v12.9h-5.9V2.9h14.2zm-8.3 20h6.7c5.1 0 8-2.8 8-7.5 0-4.8-2.9-7.5-8-7.5h-6.8v15h.1zM68.3 33c0-4.8 3.7-7.8 10.3-8.2l7.6-.4v-2.1c0-3.1-2.1-4.9-5.5-4.9-3.3 0-5.3 1.6-5.8 4h-5.4c.3-5 4.6-8.7 11.4-8.7 6.7 0 11 3.5 11 9.1v19h-5.4v-4.5h-.1c-1.6 3.1-5.1 5-8.7 5-5.6 0-9.4-3.4-9.4-8.3zm17.9-2.5v-2.2l-6.8.4c-3.4.2-5.3 1.7-5.3 4.1 0 2.4 2 4 5 4 4 0 7.1-2.7 7.1-6.3zM96.9 51v-4.6c.4.1 1.4.1 1.8.1 2.6 0 4-1.1 4.9-3.9 0-.1.5-1.7.5-1.7l-10-27.6h6.1l7 22.5h.1l7-22.5h6L110 42.4c-2.4 6.7-5.1 8.8-10.8 8.8-.4-.1-1.8-.1-2.3-.2z" />
          </svg>
        </button>
      )}

      {/* Google Pay — our own styled button, calls tokenize() on click */}
      {hasGooglePay && !walletPaid && (
        <button
          type="button"
          className="google-pay-btn"
          disabled={disabled}
          onClick={async () => {
            if (disabled || !googlePayRef.current) return;
            try {
              const result = await googlePayRef.current.tokenize();
              if (result.status === 'OK' && result.token) {
                walletTokenRef.current = result.token;
                setWalletPaid(true);
                setError(null);
                onWalletTokenRef.current?.(result.token);
              }
            } catch (err) {
              setError(`Google Pay error: ${err instanceof Error ? err.message : String(err)}`);
            }
          }}
        >
          <svg viewBox="0 0 2387.3 948" fill="none" xmlns="http://www.w3.org/2000/svg" className="google-pay-btn__logo">
            <path d="M1129.1,463.2V741h-88.2V54.8h233.8c56.4-1.2,110.9,20.2,151.4,59.4c41,36.9,64.1,89.7,63.2,144.8c1.2,55.5-21.9,108.7-63.2,145.7c-40.9,39-91.4,58.5-151.4,58.4L1129.1,463.2z M1129.1,139.3v239.6h147.8c32.8,1,64.4-11.9,87.2-35.5c46.3-45,47.4-119.1,2.3-165.4c-0.8-0.8-1.5-1.6-2.3-2.3c-22.5-24.1-54.3-37.3-87.2-36.4L1129.1,139.3z M1692.5,256.2c65.2,0,116.6,17.4,154.3,52.2c37.7,34.8,56.5,82.6,56.5,143.2V741H1819v-65.2h-3.8c-36.5,53.7-85.1,80.5-145.7,80.5c-51.7,0-95-15.3-129.8-46c-33.8-28.5-53-70.7-52.2-115c0-48.6,18.4-87.2,55.1-115.9c36.7-28.7,85.7-43.1,147.1-43.1c52.3,0,95.5,9.6,129.3,28.7v-20.2c0.2-30.2-13.2-58.8-36.4-78c-23.3-21-53.7-32.5-85.1-32.1c-49.2,0-88.2,20.8-116.9,62.3l-77.6-48.9C1545.6,286.8,1608.8,256.2,1692.5,256.2z M1578.4,597.3c-0.1,22.8,10.8,44.2,29.2,57.5c19.5,15.3,43.7,23.5,68.5,23c37.2-0.1,72.9-14.9,99.2-41.2c29.2-27.5,43.8-59.7,43.8-96.8c-27.5-21.9-65.8-32.9-115-32.9c-35.8,0-65.7,8.6-89.6,25.9C1590.4,550.4,1578.4,571.7,1578.4,597.3z M2387.3,271.5L2093,948h-91l109.2-236.7l-193.6-439.8h95.8l139.9,337.3h1.9l136.1-337.3L2387.3,271.5z" fill="#ffffff"/>
            <path d="M772.8,403.2c0-26.9-2.2-53.7-6.8-80.2H394.2v151.8h212.9c-8.8,49-37.2,92.3-78.7,119.8v98.6h127.1C729.9,624.7,772.8,523.2,772.8,403.2z" fill="#4285F4"/>
            <path d="M394.2,788.5c106.4,0,196-34.9,261.3-95.2l-127.1-98.6c-35.4,24-80.9,37.7-134.2,37.7c-102.8,0-190.1-69.3-221.3-162.7H42v101.6C108.9,704.5,245.2,788.5,394.2,788.5z" fill="#34A853"/>
            <path d="M172.9,469.7c-16.5-48.9-16.5-102,0-150.9V217.2H42c-56,111.4-56,242.7,0,354.1L172.9,469.7z" fill="#FBBC04"/>
            <path d="M394.2,156.1c56.2-0.9,110.5,20.3,151.2,59.1L658,102.7C586.6,35.7,492.1-1.1,394.2,0C245.2,0,108.9,84.1,42,217.2l130.9,101.6C204.1,225.4,291.4,156.1,394.2,156.1z" fill="#EA4335"/>
          </svg>
        </button>
      )}

      {hasWallet && !walletPaid && (
        <div className="square-card-form__divider">
          <span>or pay with card</span>
        </div>
      )}

      {walletPaid && (
        <p className="square-card-form__wallet-ok">
          ✓ Payment ready. Click &quot;Confirm &amp; Pay Deposit&quot; to complete.
        </p>
      )}

      {!walletPaid && (
        <>
          <div ref={containerRef} id="square-card-container" />
          {!ready && !error && <p className="square-card-form__loading">Loading payment form…</p>}
        </>
      )}

      {error && <p className="square-card-form__error">{error}</p>}

      <div className="square-card-form__badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="5" y="11" width="14" height="10" rx="1.5" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
        <span>Secured by</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17,22H7c-2.8,0-5-2.2-5-5V7c0-2.8,2.2-5,5-5h10c2.8,0,5,2.2,5,5v10C22,19.7,19.8,22,17,22z M7,4C5.3,4,4,5.3,4,7v10c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3V7c0-1.7-1.3-3-3-3H7z" />
          <path d="M14,9h-4c-0.6,0-1,0.4-1,1v4c0,0.6,0.4,1,1,1h4c0.6,0,1-0.4,1-1v-4C15,9.4,14.6,9,14,9z" />
        </svg>
        <span>Square</span>
      </div>
    </div>
  );
});
