import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Добавляем заголовки для оптимизации производительности
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
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 