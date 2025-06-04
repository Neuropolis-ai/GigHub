import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://gighub.ru'),
  title: 'Нейросети — Каталог лучших ИИ-сервисов и нейросетей 2025',
  description: 'Топ нейросетей для генерации изображений, текста и решения задач. 2000+ ИИ-сервисов онлайн бесплатно и на русском языке. Найдите лучшую нейросеть для ваших целей.',
  keywords: 'нейросети, нейросеть, ии сервисы, искусственный интеллект, генерация изображений, chatgpt, midjourney, бесплатные нейросети, нейросеть онлайн',
  openGraph: {
    title: 'Нейросети — Каталог лучших ИИ-сервисов 2025',
    description: 'Откройте для себя 2000+ нейросетей для генерации изображений, текста, музыки. Бесплатные и платные ИИ-инструменты в одном месте.',
    url: 'https://gighub.ru',
    siteName: 'GigHub - Каталог нейросетей',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "GigHub - Каталог нейросетей",
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
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
} 