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
   * UTM varsa kesin attribution.
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
   * Referer varsa referral.
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
      return null;
    }
  }

  /*
   * UTM ve Referer yoksa attribution yok.
   *
   * Burada DIRECT yazmıyoruz.
   *
   * Çünkü kullanıcı zaten Instagram'dan geldiyse
   * internal navigation'da attribution bozulmamalı.
   */
  return null;
}

function createVisitorId() {
  return crypto.randomUUID();
}

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  /*
   * Visitor ID oluştur.
   */
  let visitorId =
    request.cookies.get(VISITOR_COOKIE)?.value;

  if (!visitorId) {
    visitorId = createVisitorId();

    response.cookies.set(
      VISITOR_COOKIE,
      visitorId,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: COOKIE_MAX_AGE,
        path: "/",
      }
    );
  }

  /*
   * Attribution yakala.
   */
  const attribution = getAttribution(request);

  const firstTouch = request.cookies.get(
    FIRST_TOUCH_COOKIE
  );

  /*
   * FIRST TOUCH
   *
   * Sadece ilk attribution geldiğinde oluştur.
   */
  if (attribution && !firstTouch) {
    response.cookies.set(
      FIRST_TOUCH_COOKIE,
      JSON.stringify(attribution),
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: COOKIE_MAX_AGE,
        path: "/",
      }
    );
  }

  /*
   * LAST TOUCH
   *
   * Sadece yeni attribution varsa güncelle.
   *
   * /pricing
   * /about
   * /signup
   *
   * gibi internal navigation'larda
   * attribution değişmez.
   */
  if (attribution) {
    response.cookies.set(
      LAST_TOUCH_COOKIE,
      JSON.stringify(attribution),
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
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
     * Sadece gerçek sayfa request'lerini hedefle.
     *
     * API
     * _next
     * static
     * image
     * favicon
     * sitemap
     * robots
     * dosya uzantıları
     *
     * tracking'e girmeyecek.
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|mjs|map|txt|xml|woff|woff2|ttf|otf)$).*)",
  ],
};
