import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // 1. İsteğin yapıldığı tüm URL'yi (uzun link, UTM parametreleri vb.) al
  const currentUrl = request.nextUrl.href;

  // 2. Kullanıcının hangi siteden/linkten geldiğini yakala (Referer Header)
  const referrer = request.headers.get('referer') || 'Direkt Ziyaret / Bilinmiyor';

  // 3. Yanıtı (Response) oluştur ve mevcut istek header'larını koru
  const response = NextResponse.next();

  // 4. İstenen bilgileri özel yanıt Header'larına yaz
  // Geldiği yer (Sitenizin yazıldığı dış kaynak veya yönlendiren link)
  response.headers.set('x-referrer-source', referrer);
  
  // Girilen tam uzun URL (utm_source vb. query parametreleriyle birlikte)
  response.headers.set('x-original-url', currentUrl);

  // Eğer utm_source özel olarak varsa onu da ayrıca header olarak ayırabiliriz:
  const utmSource = request.nextUrl.searchParams.get('utm_source');
  if (utmSource) {
    response.headers.set('x-utm-source', utmSource);
  }

  return response;
}

// Görseller, static dosyalar ve API'leri yormamak için filtreleme
export const config = {
  matcher: [
    /*
     * Aşağıdaki yollar DIŞINDAKİ tüm sayfa isteklerinde çalışır:
     * - _next/static (statik dosyalar)
     * - _next/image (görsel optimizasyonları)
     * - favicon.ico (ikon)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};