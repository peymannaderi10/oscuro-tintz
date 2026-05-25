'use client';

import { useCallback, useEffect, useImperativeHandle, useRef, useState, forwardRef } from 'react';

/* global Square types — the SDK is loaded via <script> tag, not npm */
interface SquareCard {
  attach: (selector: string) => Promise<void>;
  tokenize: () => Promise<{ status: string; token?: string; errors?: { message: string }[] }>;
  destroy: () => void;
}

interface SquareDigitalWallet {
  attach: (selector: string) => Promise<void>;
  tokenize: () => Promise<{ status: string; token?: string; errors?: { message: string }[] }>;
  destroy: () => void;
}

interface SquarePaymentRequest {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface SquarePayments {
  card: (opts?: Record<string, unknown>) => Promise<SquareCard>;
  applePay: (paymentRequest: SquarePaymentRequest) => Promise<SquareDigitalWallet | null>;
  googlePay: (paymentRequest: SquarePaymentRequest) => Promise<SquareDigitalWallet | null>;
  paymentRequest: (opts: Record<string, unknown>) => SquarePaymentRequest;
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
  const [hasApplePay, setHasApplePay] = useState(false);
  const [hasGooglePay, setHasGooglePay] = useState(false);
  const [walletPaid, setWalletPaid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [walletDebug, setWalletDebug] = useState<string | null>(null);
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

      // Apple Pay / Google Pay — only show if browser supports them.
      // These buttons handle their own UI. On tap they open the native
      // payment sheet, tokenize, and we store the token.
      try {
        const paymentRequest = payments.paymentRequest({
          countryCode: 'US',
          currencyCode: 'USD',
          total: { amount: '30.00', label: 'Booking Deposit' },
        });

        // Apple Pay
        const debugLines: string[] = [];
        try {
          const applePay = await payments.applePay(paymentRequest);
          if (applePay) {
            await applePay.attach('#square-apple-pay');
            setHasApplePay(true);
            debugLines.push('Apple Pay: ready');
          } else {
            debugLines.push('Apple Pay: returned null (no card in Wallet?)');
          }
        } catch (appleErr) {
          debugLines.push(`Apple Pay error: ${appleErr instanceof Error ? appleErr.message : String(appleErr)}`);
        }

        // Google Pay
        try {
          const googlePay = await payments.googlePay(paymentRequest);
          if (googlePay) {
            await googlePay.attach('#square-google-pay');
            setHasGooglePay(true);
            debugLines.push('Google Pay: ready');
          } else {
            debugLines.push('Google Pay: returned null');
          }
        } catch (googleErr) {
          debugLines.push(`Google Pay error: ${googleErr instanceof Error ? googleErr.message : String(googleErr)}`);
        }

        setWalletDebug(debugLines.join(' | '));
      } catch (walletErr) {
        setWalletDebug(`Wallet init error: ${walletErr instanceof Error ? walletErr.message : String(walletErr)}`);
      }

    } catch (err) {
      console.error('Square card init failed:', err);
      setError('Could not load the payment form. Please try again.');
    }
  }, []);

  useEffect(() => {
    // Listen for wallet payment tokens (Apple Pay / Google Pay fire events
    // on their containers when the user completes the native sheet).
    const handleWalletToken = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.token) {
        walletTokenRef.current = detail.token;
        setWalletPaid(true);
      }
    };

    const appleEl = document.getElementById('square-apple-pay');
    const googleEl = document.getElementById('square-google-pay');
    appleEl?.addEventListener('token', handleWalletToken);
    googleEl?.addEventListener('token', handleWalletToken);

    return () => {
      appleEl?.removeEventListener('token', handleWalletToken);
      googleEl?.removeEventListener('token', handleWalletToken);
    };
  }, [hasApplePay, hasGooglePay]);

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
      // If user already paid via Apple/Google Pay, use that token
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
      {/* Apple Pay / Google Pay — containers always in the DOM so the SDK
          can measure and attach. They start empty (zero height) and the
          SDK injects the button only if supported. We track which ones
          initialized successfully to show the divider. */}
      <div className="square-wallet-buttons">
        <div id="square-apple-pay" />
        <div id="square-google-pay" />
      </div>
      {(hasApplePay || hasGooglePay) && !walletPaid && (
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
      {walletDebug && (
        <p style={{ fontSize: 11, color: '#757575', marginTop: 8, fontFamily: 'monospace', wordBreak: 'break-all' }}>
          {walletDebug}
        </p>
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
