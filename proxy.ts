import { NextRequest, NextResponse } from 'next/server';

const FIRST_TOUCH_COOKIE = 'attribution_first';
const LAST_TOUCH_COOKIE = 'attribution_last';

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

function getAttribution(request: NextRequest): Attribution | null {
  const { searchParams, href } = request.nextUrl;

  const utmSource = searchParams.get('utm_source');
  const utmMedium = searchParams.get('utm_medium');

  const utmCampaign = searchParams.get('utm_campaign');
  const utmContent = searchParams.get('utm_content');
  const utmTerm = searchParams.get('utm_term');

  const referrer = request.headers.get('referer');

  /*
   * 1. UTM varsa UTM'i esas al.
   *
   * Örnek:
   * ?utm_source=instagram&utm_medium=bio
   */
  if (utmSource || utmMedium) {
    return {
      source: utmSource || 'unknown',
      medium: utmMedium || 'unknown',
      campaign: utmCampaign,
      content: utmContent,
      term: utmTerm,
      referrer,
      landing_url: href,
      captured_at: new Date().toISOString(),
    };
  }

  /*
   * 2. UTM yok ama Referer varsa
   */
  if (referrer) {
    let source = 'referral';

    try {
      const referrerUrl = new URL(referrer);
      source = referrerUrl.hostname;
    } catch {
      // Geçersiz referer gelirse referral olarak bırak
    }

    return {
      source,
      medium: 'referral',
      campaign: null,
      content: null,
      term: null,
      referrer,
      landing_url: href,
      captured_at: new Date().toISOString(),
    };
  }

  /*
   * 3. Hiçbir kaynak bilgisi yoksa
   *
   * Direct:
   * Kullanıcı URL'yi direkt yazmış olabilir,
   * bookmark kullanmış olabilir veya browser/app
   * Referer göndermemiş olabilir.
   */
  return {
    source: 'direct',
    medium: 'none',
    campaign: null,
    content: null,
    term: null,
    referrer: null,
    landing_url: href,
    captured_at: new Date().toISOString(),
  };
}

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  const firstTouch = request.cookies.get(FIRST_TOUCH_COOKIE);
  const lastTouch = request.cookies.get(LAST_TOUCH_COOKIE);

  const attribution = getAttribution(request);

  /*
   * Her gelen trafik için LAST TOUCH'u güncelle.
   *
   * Örneğin:
   *
   * İlk geliş:
   * Instagram
   *
   * Sonra:
   * Google
   *
   * first_touch = Instagram
   * last_touch  = Google
   */
  if (attribution) {
    response.cookies.set(
      LAST_TOUCH_COOKIE,
      JSON.stringify(attribution),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: COOKIE_MAX_AGE,
        path: '/',
      }
    );

    /*
     * FIRST TOUCH sadece ilk kez oluşturulur.
     */
    if (!firstTouch) {
      response.cookies.set(
        FIRST_TOUCH_COOKIE,
        JSON.stringify(attribution),
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: COOKIE_MAX_AGE,
          path: '/',
        }
      );
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Next.js internal dosyalarını hariç tut.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
