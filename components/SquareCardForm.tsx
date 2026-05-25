'use client';

import { useCallback, useEffect, useImperativeHandle, useRef, useState, forwardRef } from 'react';

interface SquareCard {
  attach: (selector: string) => Promise<void>;
  tokenize: () => Promise<{ status: string; token?: string; errors?: { message: string }[] }>;
  destroy: () => void;
}

interface SquarePayments {
  card: (opts?: Record<string, unknown>) => Promise<SquareCard>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  applePay: (paymentRequest: any) => Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  googlePay: (paymentRequest: any) => Promise<any>;
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
  '.message-text': {
    color: '#B0B0B0',
  },
  '.message-icon': {
    color: '#B0B0B0',
  },
  '.message-text.is-error': {
    color: '#ff8080',
  },
  '.message-icon.is-error': {
    color: '#ff8080',
  },
};

export const SquareCardForm = forwardRef<SquareCardFormHandle>(function SquareCardForm(_, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<SquareCard | null>(null);
  const walletTokenRef = useRef<string | null>(null);
  const [ready, setReady] = useState(false);
  const [hasWallet, setHasWallet] = useState(false);
  const [walletPaid, setWalletPaid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debug, setDebug] = useState<string[]>([]);
  const initAttempted = useRef(false);

  const addDebug = (msg: string) => setDebug((prev) => [...prev, msg]);

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
      addDebug('SDK initialized');

      // Card form
      const card = await payments.card({ style: CARD_STYLE });
      if (containerRef.current) {
        await card.attach('#square-card-container');
        cardRef.current = card;
        setReady(true);
        addDebug('Card form attached');
      }

      // Digital wallets
      try {
        const paymentRequest = payments.paymentRequest({
          countryCode: 'US',
          currencyCode: 'USD',
          total: { amount: '30.00', label: 'Booking Deposit' },
        });
        addDebug('Payment request created');

        // Apple Pay
        try {
          addDebug('Calling payments.applePay()...');
          const applePay = await payments.applePay(paymentRequest);
          addDebug(`applePay returned: ${applePay ? typeof applePay : 'null'}`);
          if (applePay) {
            const ownKeys = Object.keys(applePay).join(', ');
            const ownNames = Object.getOwnPropertyNames(applePay).join(', ');
            const protoMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(applePay)).join(', ');
            addDebug(`applePay own keys: [${ownKeys}]`);
            addDebug(`applePay own names: [${ownNames}]`);
            addDebug(`applePay proto: [${protoMethods}]`);
            addDebug(`applePay JSON: ${JSON.stringify(applePay).slice(0, 200)}`);
            if (typeof applePay.attach === 'function') {
              await applePay.attach('#square-apple-pay');
              setHasWallet(true);
              addDebug('Apple Pay attached');
            } else {
              addDebug('applePay has no attach — storing for manual tokenize');
              // Store for tokenize on click — some SDK versions don't have attach
              walletTokenRef.current = null;
            }
          }
        } catch (appleErr) {
          addDebug(`Apple Pay error: ${appleErr instanceof Error ? appleErr.message : String(appleErr)}`);
        }

        // Google Pay
        try {
          addDebug('Calling payments.googlePay()...');
          const googlePay = await payments.googlePay(paymentRequest);
          addDebug(`googlePay returned: ${googlePay ? typeof googlePay : 'null'}`);
          if (googlePay) {
            const gMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(googlePay)).join(', ');
            addDebug(`googlePay proto: [${gMethods}]`);
            await googlePay.attach('#square-google-pay');
            setHasWallet(true);
            addDebug('Google Pay attached');
          }
        } catch (googleErr) {
          addDebug(`Google Pay error: ${googleErr instanceof Error ? googleErr.message : String(googleErr)}`);
        }

      } catch (walletErr) {
        addDebug(`Wallet init error: ${walletErr instanceof Error ? walletErr.message : String(walletErr)}`);
      }

    } catch (err) {
      console.error('Square card init failed:', err);
      setError('Could not load the payment form. Please try again.');
    }
  }, []);

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
        if (result.status === 'OK' && result.token) {
          return result.token;
        }
        const msg = result.errors?.map((e) => e.message).join(', ') || 'Card verification failed.';
        setError(msg);
        return null;
      } catch {
        setError('Payment processing error. Please try again.');
        return null;
      }
    },
  }));

  return (
    <div className="square-card-form">
      {/* Wallet containers — SDK injects buttons here */}
      <div id="square-apple-pay" />
      <div id="square-google-pay" />
      {hasWallet && !walletPaid && (
        <div className="square-card-form__divider">
          <span>or pay with card</span>
        </div>
      )}
      {walletPaid && (
        <p className="square-card-form__wallet-ok">
          ✓ Payment method ready. Click &quot;Confirm &amp; Pay Deposit&quot; to complete.
        </p>
      )}
      {!walletPaid && (
        <>
          <div ref={containerRef} id="square-card-container" />
          {!ready && !error && <p className="square-card-form__loading">Loading payment form…</p>}
        </>
      )}
      {error && <p className="square-card-form__error">{error}</p>}
      {/* Debug output */}
      {debug.length > 0 && (
        <div style={{ marginTop: 12, padding: 12, border: '1px solid #333', background: '#111', fontSize: 11, fontFamily: 'monospace', color: '#999', lineHeight: 1.6, wordBreak: 'break-all' }}>
          {debug.map((d, i) => <div key={i}>{d}</div>)}
        </div>
      )}
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
