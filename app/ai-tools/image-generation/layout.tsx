import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL('https://gighub.ru'),
  title: 'Лучшие нейросети для изображений 2025 — ТОП-15 ИИ-генераторов картинок',
  description: 'Полный обзор лучших нейросетей для создания изображений: Midjourney, DALL-E 3, Stable Diffusion. Бесплатные и платные ИИ-генераторы с примерами и сравнением качества.',
  keywords: 'нейросети для изображений, нейросеть фото, ИИ генератор картинок, нейросеть онлайн, создание изображений ИИ, Midjourney, DALL-E, Stable Diffusion, бесплатные нейросети',
  openGraph: {
    title: 'Лучшие нейросети для изображений 2025 — ТОП-15 ИИ-генераторов',
    description: 'Полный обзор ТОП-15 нейросетей для создания изображений. Midjourney, DALL-E 3, Stable Diffusion и другие лучшие ИИ-генераторы 2025 года.',
    url: 'https://gighub.ru/ai-tools/image-generation',
    siteName: 'GigHub - Каталог лучших ИИ-сервисов',
    images: [
      {
        url: '/og-image-ai-images.jpg',
        width: 1200,
        height: 630,
        alt: 'Лучшие нейросети для изображений 2025',
      }
    ],
    locale: 'ru_RU',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Лучшие нейросети для изображений 2025',
    description: 'ТОП-15 ИИ-генераторов для создания изображений: Midjourney, DALL-E 3, Stable Diffusion и другие',
    images: ['/twitter-image-ai-images.jpg'],
    creator: '@gighub_ru',
  },
  alternates: {
    canonical: 'https://gighub.ru/ai-tools/image-generation',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [{ name: 'GigHub Team' }],
  category: 'Технологии',
}

export default function ImageGenerationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: 'Лучшие нейросети для изображений 2025',
            page_location: window.location.href,
            content_group1: 'AI Tools',
            content_group2: 'Image Generation',
            custom_map: {
              'custom_parameter_1': 'ai_tools_category'
            }
          });

          // Отслеживание времени на странице
          let startTime = Date.now();
          
          // Отслеживание скролла
          let maxScroll = 0;
          window.addEventListener('scroll', function() {
            let scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll) {
              maxScroll = scrollPercent;
              if (scrollPercent >= 25 || scrollPercent >= 50 || scrollPercent >= 75 || scrollPercent >= 90) {
                gtag('event', 'scroll', {
                  event_category: 'engagement',
                  event_label: scrollPercent + '%',
                  value: scrollPercent
                });
              }
            }
          });

          // Отслеживание времени при уходе со страницы
          window.addEventListener('beforeunload', function() {
            let timeOnPage = Math.round((Date.now() - startTime) / 1000);
            gtag('event', 'time_on_page', {
              event_category: 'engagement',
              event_label: 'seconds',
              value: timeOnPage
            });
          });
        `}
      </Script>

      {/* JSON-LD разметка для SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Лучшие нейросети для изображений 2025 — ТОП-15 ИИ-генераторов картинок",
            "description": "Полный обзор ТОП-15 нейросетей для создания изображений: Midjourney, DALL-E 3, Stable Diffusion и другие",
            "image": "https://gighub.ru/og-image-ai-images.jpg",
            "author": {
              "@type": "Organization",
              "name": "GigHub"
            },
            "publisher": {
              "@type": "Organization",
              "name": "GigHub",
              "logo": {
                "@type": "ImageObject",
                "url": "https://gighub.ru/logo.png"
              }
            },
            "datePublished": "2025-01-15",
            "dateModified": "2025-01-15",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://gighub.ru/ai-tools/image-generation"
            }
          })
        }}
      />
      
      {/* Хлебные крошки разметка */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Главная",
                "item": "https://gighub.ru"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "ИИ-инструменты",
                "item": "https://gighub.ru/ai-tools"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Нейросети для изображений",
                "item": "https://gighub.ru/ai-tools/image-generation"
              }
            ]
          })
        }}
      />

      {/* FAQ разметка */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Какая нейросеть лучше всего подходит для начинающих?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Для новичков рекомендуем Leonardo AI или Playground AI — они имеют простой интерфейс и хорошее бесплатное предложение."
                }
              },
              {
                "@type": "Question",
                "name": "Можно ли использовать изображения коммерчески?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Зависит от сервиса. Midjourney, Adobe Firefly и Leonardo AI разрешают коммерческое использование на платных планах."
                }
              },
              {
                "@type": "Question",
                "name": "Какие нейросети поддерживают русский язык?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Лучше всего с русским работают: Kandinsky 3.1, DALL-E 3, Bing Creator и Canva AI."
                }
              }
            ]
          })
        }}
      />

      {children}
    </>
  )
} 