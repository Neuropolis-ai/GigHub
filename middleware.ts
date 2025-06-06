import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // ===========================================
  // SECURITY HEADERS - ЗАДАЧА 16
  // ===========================================
  
  // Content Security Policy
  response.headers.set('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'"
  ].join('; '))

  // Другие security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'payment=()',
    'usb=()'
  ].join(', '))
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')

  // ===========================================
  // PERFORMANCE OPTIMIZATION HEADERS
  // ===========================================
  
  const pathname = request.nextUrl.pathname

  // Оптимизация для статических ресурсов
  if (pathname.match(/\.(jpg|jpeg|png|gif|webp|avif|svg|ico)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    response.headers.set('Vary', 'Accept-Encoding')
  }

  // Оптимизация для JS/CSS файлов
  if (pathname.match(/\.(js|css)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    response.headers.set('Vary', 'Accept-Encoding')
  }

  // Оптимизация для шрифтов
  if (pathname.match(/\.(woff|woff2|eot|ttf|otf)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    response.headers.set('Vary', 'Accept-Encoding')
  }

  // Добавляем заголовки для HTML страниц
  if (!pathname.match(/\.(js|css|jpg|jpeg|png|gif|webp|avif|svg|ico|woff|woff2|eot|ttf|otf)$/)) {
    // Предзагрузка критических ресурсов
    response.headers.set('Link', [
      '</fonts/inter.woff2>; rel=preload; as=font; type=font/woff2; crossorigin',
      '</icons/favicon.ico>; rel=preload; as=image',
    ].join(', '))

    // Оптимизация для поисковых роботов
    response.headers.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
  }

  // ===========================================
  // API ROUTES SECURITY
  // ===========================================
  
  // Дополнительные security headers для API routes
  if (pathname.startsWith('/api/')) {
    response.headers.set('X-API-Version', '1.0')
    response.headers.set('X-Rate-Limit-Policy', 'standard')
    
    // Отключаем кэширование для API
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
  }

  // Перенаправления для старых URL с ID на slug
  if (pathname.match(/^\/ai-services\/\d+$/)) {
    // Если это числовой ID, добавляем параметр для API
    const id = pathname.split('/').pop()
    const url = request.nextUrl.clone()
    url.searchParams.set('legacy_id', id!)
    return NextResponse.rewrite(url)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
} 