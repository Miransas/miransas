"use client";

import Script from "next/script";
import {
  usePathname,
  useSearchParams,
} from "next/navigation";
import {
  Suspense,
  useEffect,
} from "react";

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
    const query =
      searchParams.toString();

    const pagePath = query
      ? `${pathname}?${query}`
      : pathname;

    /*
     * Her page view için unique ID.
     *
     * React bunu development'ta iki kere
     * çalıştırsa bile her request'in ID'si farklı
     * olabileceği için aşağıdaki server-side
     * duplicate kontrolü aynı event'i korur.
     *
     * Ayrıca browser aynı event'i tekrar
     * gönderirse eventId sayesinde korunur.
     */
    const eventId =
      crypto.randomUUID();

    /*
     * OWN ANALYTICS
     */
    fetch("/api/track", {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        eventId,
        eventName: "page_view",
        page: pagePath,
      }),

      keepalive: true,
    }).catch(() => {
      // Tracking hatası siteyi etkilemesin.
    });

    /*
     * GA4
     */
    if (
      measurementId &&
      typeof window.gtag === "function"
    ) {
      window.gtag(
        "config",
        measurementId,
        {
          page_path: pagePath,
        }
      );
    }
  }, [pathname, searchParams]);

  if (!measurementId) {
    return null;
  }

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
          window.dataLayer =
            window.dataLayer || [];

          function gtag() {
            dataLayer.push(arguments);
          }

          window.gtag = gtag;

          gtag(
            'js',
            new Date()
          );

          gtag(
            'config',
            '${measurementId}',
            {
              send_page_view: false
            }
          );
        `}
      </Script>
    </>
  );
}

declare global {
  interface Window {
    dataLayer: unknown[];

    gtag: (
      ...args: unknown[]
    ) => void;
  }
}
