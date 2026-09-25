import { NextRequest, NextResponse } from "next/server";

const FIRST_TOUCH_COOKIE = "attribution_first";
const LAST_TOUCH_COOKIE = "attribution_last";
const VISITOR_COOKIE = "visitor_id";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 90; // 90 gün

type Attribution = {
  source: string;
  medium: string;
  campaign: string | null;
  content: string | null;
  term: string | null;
  referrer: string | null;
  landing_url: string;
  captured_at: string;
};

function getAttribution(
  request: NextRequest
): Attribution | null {
  const { searchParams, href } = request.nextUrl;

  const utmSource = searchParams.get("utm_source");
  const utmMedium = searchParams.get("utm_medium");
  const utmCampaign = searchParams.get("utm_campaign");
  const utmContent = searchParams.get("utm_content");
  const utmTerm = searchParams.get("utm_term");

  const referrer = request.headers.get("referer");

  /*
   * UTM varsa bunu kesin attribution olarak kabul ediyoruz.
   */
  if (
    utmSource ||
    utmMedium ||
    utmCampaign ||
    utmContent ||
    utmTerm
  ) {
    return {
      source: utmSource || "unknown",
      medium: utmMedium || "unknown",
      campaign: utmCampaign,
      content: utmContent,
      term: utmTerm,
      referrer,
      landing_url: href,
      captured_at: new Date().toISOString(),
    };
  }

  /*
   * UTM yok ama dışarıdan Referer geldiyse.
   */
  if (referrer) {
    try {
      const referrerUrl = new URL(referrer);

      return {
        source: referrerUrl.hostname,
        medium: "referral",
        campaign: null,
        content: null,
        term: null,
        referrer,
        landing_url: href,
        captured_at: new Date().toISOString(),
      };
    } catch {
      return {
        source: "referral",
        medium: "referral",
        campaign: null,
        content: null,
        term: null,
        referrer,
        landing_url: href,
        captured_at: new Date().toISOString(),
      };
    }
  }

  /*
   * Hiç attribution bilgisi yok.
   *
   * Burada NULL döndürüyoruz.
   *
   * Böylece mevcut kullanıcı:
   *
   * Instagram
   * ↓
   * /
   * ↓
   * /pricing
   * ↓
   * /signup
   *
   * sırasında "direct" olarak overwrite edilmez.
   */
  return null;
}

function getVisitorId(request: NextRequest) {
  return request.cookies.get(VISITOR_COOKIE)?.value;
}

function createVisitorId() {
  return crypto.randomUUID();
}

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  /*
   * -------------------------------------------------------
   * VISITOR ID
   * -------------------------------------------------------
   */

  let visitorId = getVisitorId(request);

  if (!visitorId) {
    visitorId = createVisitorId();

    response.cookies.set(VISITOR_COOKIE, visitorId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });
  }

  /*
   * -------------------------------------------------------
   * ATTRIBUTION
   * -------------------------------------------------------
   */

  const attribution = getAttribution(request);

  const firstTouch = request.cookies.get(
    FIRST_TOUCH_COOKIE
  );

  /*
   * FIRST TOUCH
   *
   * Sadece gerçekten attribution geldiyse ve
   * daha önce first-touch yoksa oluştur.
   */
  if (attribution && !firstTouch) {
    response.cookies.set(
      FIRST_TOUCH_COOKIE,
      JSON.stringify(attribution),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: COOKIE_MAX_AGE,
        path: "/",
      }
    );
  }

  /*
   * LAST TOUCH
   *
   * Sadece yeni attribution geldiyse güncelle.
   *
   * Internal navigation:
   * / → /pricing → /signup
   *
   * attribution olmadığı için LAST TOUCH değişmez.
   */
  if (attribution) {
    response.cookies.set(
      LAST_TOUCH_COOKIE,
      JSON.stringify(attribution),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: COOKIE_MAX_AGE,
        path: "/",
      }
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * API'yi proxy'den çıkarıyoruz.
     * Static dosyaları ve metadata dosyalarını da çıkarıyoruz.
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
