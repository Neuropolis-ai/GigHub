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
  variable: '--font-inter'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://gighub.ru'),
  title: 'Нейросети — Каталог лучших ИИ-сервисов и нейросетей 2025',
  description: 'Топ нейросетей для генерации изображений, текста и решения задач. 2000+ ИИ-сервисов онлайн бесплатно и на русском языке. Найдите лучшую нейросеть для ваших целей.',
  keywords: 'нейросети, нейросеть, ии сервисы, искусственный интеллект, генерация изображений, chatgpt, midjourney, бесплатные нейросети, нейросеть онлайн',
  openGraph: {
    title: 'Нейросети — Каталог лучших ИИ-сервисов 2025',
    description: 'Откройте для себя 2000+ нейросетей для генерации изображений, текста, музыки. Бесплатные и платные ИИ-инструменты в одном месте.',
    url: 'https://gighub.ru',
    siteName: 'GigHub - Каталог нейросетей и ИИ-сервисов',
    images: [
      {
        url: 'https://gighub.ru/og-neyroseti.jpg',
        width: 1200,
        height: 630,
        alt: 'Каталог лучших нейросетей и ИИ-сервисов',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Нейросети — Каталог лучших ИИ-сервисов 2025',
    description: 'Откройте для себя 2000+ нейросетей для генерации изображений, текста, музыки',
    images: ['https://gighub.ru/twitter-neyroseti.jpg'],
  },
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
    <html lang="ru">
      <head>
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