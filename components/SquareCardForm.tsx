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

      // Google Pay — uses attach() to render its own button
      try {
        const googlePay = await payments.googlePay(paymentRequest);
        if (googlePay && typeof googlePay.attach === 'function') {
          await googlePay.attach('#google-pay-button');
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

  // Google Pay click handler — per Square docs, listen for click on the
  // container and call tokenize.
  useEffect(() => {
    if (!hasGooglePay || !googlePayRef.current) return;
    const btn = document.getElementById('google-pay-button');
    if (!btn) return;

    const handler = async () => {
      if (disabledRef.current) return;
      try {
        const result = await googlePayRef.current!.tokenize();
        if (result.status === 'OK' && result.token) {
          walletTokenRef.current = result.token;
          setWalletPaid(true);
          setError(null);
          onWalletTokenRef.current?.(result.token);
        } else if (result.status === 'Cancel') {
          // User dismissed — let them retry
        }
      } catch (err) {
        setError(`Google Pay error: ${err instanceof Error ? err.message : String(err)}`);
      }
    };

    btn.addEventListener('click', handler);
    return () => btn.removeEventListener('click', handler);
  }, [hasGooglePay]);

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
          id="apple-pay-button"
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
        />
      )}

      {/* Google Pay — per docs: <div id="google-pay-button">, SDK renders
          via attach(), click handler calls tokenize() */}
      {!walletPaid && <div id="google-pay-button" />}

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
