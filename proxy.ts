import { NextRequest, NextResponse } from 'next/server';

const ATTRIBUTION_COOKIE = 'marketing_attribution';

export function proxy(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  // UTM parametrelerini al
  const utmSource = searchParams.get('utm_source');
  const utmMedium = searchParams.get('utm_medium');
  const utmCampaign = searchParams.get('utm_campaign');
  const utmContent = searchParams.get('utm_content');
  const utmTerm = searchParams.get('utm_term');

  // Kullanıcının geldiği kaynak
  const referrer = request.headers.get('referer');

  // Mevcut attribution cookie'si
  const existingAttribution = request.cookies.get(
    ATTRIBUTION_COOKIE
  )?.value;

  const response = NextResponse.next();

  // Sadece gerçekten attribution bilgisi varsa kaydet
  const hasAttribution =
    utmSource ||
    utmMedium ||
    utmCampaign ||
    utmContent ||
    utmTerm ||
    referrer;

  // İlk touch attribution:
  // Kullanıcı daha önce attribution cookie'sine sahipse değiştirme.
  if (hasAttribution && !existingAttribution) {
    const attribution = {
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_content: utmContent,
      utm_term: utmTerm,
      referrer: referrer ?? null,
      landing_url: request.nextUrl.href,
      captured_at: new Date().toISOString(),
    };

    response.cookies.set(
      ATTRIBUTION_COOKIE,
      JSON.stringify(attribution),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 90, // 90 gün
        path: '/',
      }
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Sayfa request'lerinde çalışır.
     * Next.js internal/static dosyalarını hariç tutar.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
