import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Каталог нейросетей — 2000+ ИИ-сервисов для генерации и автоматизации',
  description: 'Полный каталог нейросетей и ИИ-инструментов. Найдите лучшую нейросеть для генерации изображений, текста, музыки. Бесплатные и платные сервисы с рейтингами и отзывами.',
  keywords: 'каталог нейросетей, нейросеть для генерации, ии сервисы, искусственный интеллект, нейросеть картинки, нейросеть текст',
  openGraph: {
    title: 'Каталог нейросетей — 2000+ ИИ-сервисов',
    description: 'Полный каталог нейросетей и ИИ-инструментов для генерации и автоматизации',
    url: 'https://gighub.ru/ai-services',
  },
  alternates: {
    canonical: 'https://gighub.ru/ai-services',
  },
}

export default function AIServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Каталог нейросетей и ИИ-сервисов",
            "description": "Полный каталог нейросетей и ИИ-инструментов для генерации изображений, текста, музыки и автоматизации задач",
            "url": "https://gighub.ru/ai-services",
            "mainEntity": {
              "@type": "ItemList",
              "name": "Каталог ИИ-сервисов",
              "numberOfItems": "2000+",
              "itemListElement": [
                {
                  "@type": "SoftwareApplication",
                  "name": "ChatGPT",
                  "applicationCategory": "Нейросеть для текста",
                  "operatingSystem": "Web Browser"
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "Midjourney",
                  "applicationCategory": "Нейросеть для изображений",
                  "operatingSystem": "Web Browser"
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "DALL-E",
                  "applicationCategory": "Генерация изображений",
                  "operatingSystem": "Web Browser"
                }
              ]
            }
          })
        }}
      />
      {children}
    </>
  )
} 