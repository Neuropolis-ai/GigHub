import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import CriticalCSS from './components/CriticalCSS'
import WebVitals from './components/WebVitals'
import Script from 'next/script'

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'GigHub - Каталог нейросетей и ИИ-сервисов',
  description: 'Открой для себя лучшие нейросети и ИИ-сервисы. Более 1000+ инструментов для работы, творчества и бизнеса. Читай обзоры, сравнивай возможности.',
  keywords: 'нейросети, ИИ, искусственный интеллект, ChatGPT, Midjourney, AI инструменты, машинное обучение',
  authors: [{ name: 'GigHub Team' }],
  creator: 'GigHub',
  publisher: 'GigHub',
  category: 'technology',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'ваш-google-verification-код',
    yandex: 'ваш-yandex-verification-код',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://gighub.ru',
    siteName: 'GigHub - Каталог нейросетей и ИИ-сервисов',
    title: 'GigHub - Каталог нейросетей и ИИ-сервисов',
    description: 'Открой для себя лучшие нейросети и ИИ-сервисы. Более 1000+ инструментов для работы, творчества и бизнеса.',
    images: [
      {
        url: 'https://gighub.ru/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GigHub - Каталог нейросетей и ИИ-сервисов',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GigHub - Каталог нейросетей и ИИ-сервисов',
    description: 'Открой для себя лучшие нейросети и ИИ-сервисы. Более 1000+ инструментов для работы, творчества и бизнеса.',
    images: ['https://gighub.ru/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://gighub.ru',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={inter.variable}>
      <head>
        {/* Предзагрузка критических ресурсов */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://media.theresanaiforthat.com" />
        <link rel="preconnect" href="https://f55ed2adb1bb673919f5f8189e32d3a1.cdn.bubble.io" />
        
        {/* DNS предзагрузка для внешних сервисов */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//mc.yandex.ru" />
        
        {/* Favicons и иконки */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Метатег для цвета темы */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="color-scheme" content="light" />
        
        {/* Viewport оптимизация */}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* Critical CSS и Resource Hints */}
        <CriticalCSS />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "GigHub - Каталог нейросетей и ИИ-сервисов",
              "url": "https://gighub.ru",
              "description": "Каталог лучших нейросетей и ИИ-сервисов для генерации изображений, текста и решения задач",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://gighub.ru/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "mainEntity": {
                "@type": "ItemList",
                "name": "Каталог нейросетей",
                "numberOfItems": "2000+",
                "itemListElement": [
                  {
                    "@type": "SoftwareApplication",
                    "name": "ChatGPT",
                    "applicationCategory": "ИИ-чат",
                    "operatingSystem": "Web"
                  },
                  {
                    "@type": "SoftwareApplication", 
                    "name": "Midjourney",
                    "applicationCategory": "Генерация изображений",
                    "operatingSystem": "Web"
                  }
                ]
              }
            })
          }}
        />
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>

        {/* Yandex.Metrica */}
        <Script id="yandex-metrica" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            
            ym(12345678, "init", {
                 clickmap:true,
                 trackLinks:true,
                 accurateTrackBounce:true,
                 webvisor:true
            });
          `}
        </Script>
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/12345678" style={{position:'absolute', left:'-9999px'}} alt="" />
          </div>
        </noscript>

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8B5CF6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="GigHub" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />

        {/* Service Worker Registration */}
        <Script id="sw-registration" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                  .then(function(registration) {
                    console.log('GigHub: Service Worker зарегистрирован', registration.scope);
                  })
                  .catch(function(error) {
                    console.log('GigHub: Ошибка регистрации Service Worker', error);
                  });
              });
            }
          `}
        </Script>
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        <WebVitals />
      </body>
    </html>
  )
} 