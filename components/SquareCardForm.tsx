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
          <svg viewBox="0 0 41 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="google-pay-btn__logo">
            <path d="M19.526 2.635v4.083h2.518c.6 0 1.096-.202 1.488-.605.403-.402.605-.882.605-1.437 0-.544-.202-1.018-.605-1.422-.392-.413-.888-.62-1.488-.62h-2.518zm0 5.52v4.736h-1.504V1.198h3.99c1.013 0 1.873.337 2.582 1.012.72.675 1.08 1.497 1.08 2.466 0 .991-.36 1.819-1.08 2.482-.697.665-1.559.996-2.583.996h-2.485v.001zm7.668 2.287c0 .392.166.718.499.98.332.26.722.391 1.168.391.633 0 1.196-.234 1.692-.701.497-.469.744-1.019.744-1.65-.469-.37-1.123-.555-1.962-.555-.61 0-1.12.148-1.528.442-.409.294-.613.657-.613 1.093m1.946-5.815c1.112 0 1.989.297 2.633.89.642.594.964 1.408.964 2.442v4.932h-1.439v-1.11h-.065c-.622.914-1.45 1.372-2.486 1.372-.882 0-1.621-.262-2.215-.784-.594-.523-.891-1.176-.891-1.96 0-.828.313-1.486.94-1.976s1.463-.735 2.51-.735c.892 0 1.629.163 2.206.49v-.344c0-.522-.207-.966-.621-1.33a2.132 2.132 0 0 0-1.455-.547c-.84 0-1.504.353-1.995 1.062l-1.324-.834c.73-1.045 1.81-1.568 3.238-1.568m11.853.262l-5.02 11.537H34.42l1.864-4.026-3.302-7.511h1.635l2.387 5.749h.032l2.322-5.749z" fill="white"/>
            <path d="M13.448 7.134c0-.473-.04-.93-.116-1.366H6.988v2.588h3.634a3.11 3.11 0 0 1-1.344 2.042v1.68h2.169c1.27-1.17 2.001-2.9 2.001-4.944" fill="#4285F4"/>
            <path d="M6.988 12.735c1.816 0 3.344-.596 4.459-1.621l-2.169-1.681c-.603.406-1.38.643-2.29.643-1.754 0-3.244-1.182-3.776-2.774H.978v1.731a6.728 6.728 0 0 0 6.01 3.703" fill="#34A853"/>
            <path d="M3.212 7.303a4.022 4.022 0 0 1 0-2.594V2.978H.978A6.728 6.728 0 0 0 .262 6.006c0 1.089.26 2.119.716 3.028l2.234-1.731z" fill="#FBBC04"/>
            <path d="M6.988 1.935c.988 0 1.875.339 2.573 1.005l1.92-1.918C10.327.382 8.8-.262 6.989-.262a6.728 6.728 0 0 0-6.01 3.704l2.234 1.731c.532-1.592 2.022-2.774 3.776-2.774z" fill="#EA4335"/>
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
