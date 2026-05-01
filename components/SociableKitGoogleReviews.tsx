'use client';

import { useEffect } from 'react';

const SCRIPT_SRC = 'https://widgets.sociablekit.com/google-reviews/widget.js';

export function SociableKitGoogleReviews({ embedId }: { embedId: string }) {
  useEffect(() => {
    // Inject the widget script only once per session, then leave it in
    // place. Navigating away from /reviews and back doesn't re-fetch the
    // script — the SociableKit runtime stays loaded and re-attaches to
    // this div when it remounts.
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;

    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.defer = true;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return <div className="sk-ww-google-reviews" data-embed-id={embedId} />;
}
