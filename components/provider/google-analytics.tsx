"use client";

import Script from "next/script";
import {
  usePathname,
  useSearchParams,
} from "next/navigation";
import { Suspense, useEffect } from "react";

const measurementId =
  process.env.NEXT_PUBLIC_GA_ID;

export function GoogleAnalytics() {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsTracker />
    </Suspense>
  );
}

function GoogleAnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!measurementId) return;

    const track = async () => {
      const query = searchParams.toString();

      const pagePath = query
        ? `${pathname}?${query}`
        : pathname;

      /*
       * --------------------------------------------------
       * OWN ANALYTICS
       * --------------------------------------------------
       */

      try {
        await fetch("/api/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventName: "page_view",
            page: pagePath,
          }),
          keepalive: true,
        });
      } catch {
        // Tracking başarısız olsa bile site çalışmaya devam eder.
      }

      /*
       * --------------------------------------------------
       * GOOGLE ANALYTICS
       * --------------------------------------------------
       */

      if (typeof window.gtag !== "function") {
        return;
      }

      window.gtag("config", measurementId, {
        page_path: pagePath,
      });
    };

    void track();
  }, [pathname, searchParams]);

  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />

      <Script
        id="google-analytics"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];

          function gtag() {
            dataLayer.push(arguments);
          }

          window.gtag = gtag;

          gtag('js', new Date());

          gtag('config', '${measurementId}', {
            send_page_view: false
          });
        `}
      </Script>
    </>
  );
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
