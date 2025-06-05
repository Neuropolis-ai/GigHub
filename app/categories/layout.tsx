import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Категории нейросетей — Выберите ИИ-инструменты по задачам',
  description: 'Все категории нейросетей: генерация изображений, обработка текста, создание музыки, чат-боты и другие ИИ-инструменты. Найдите нужную категорию сервисов.',
  keywords: 'категории нейросетей, нейросеть изображения, нейросеть текст, нейросеть музыка, типы нейросетей, виды ИИ',
  openGraph: {
    title: 'Категории нейросетей — ИИ-инструменты по задачам',
    description: 'Все категории нейросетей и ИИ-инструментов по типам задач',
    url: 'https://gighub.ru/categories',
  },
  alternates: {
    canonical: 'https://gighub.ru/categories',
  },
}

export default function CategoriesLayout({
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
            "name": "Категории нейросетей и ИИ-сервисов",
            "description": "Полный каталог категорий ИИ-инструментов для различных задач: генерация изображений, текста, музыки и других типов контента",
            "url": "https://gighub.ru/categories",
            "mainEntity": {
              "@type": "ItemList",
              "name": "Категории ИИ-сервисов",
              "itemListElement": [
                {
                  "@type": "Thing",
                  "name": "Генерация изображений",
                  "description": "Нейросети для создания картинок, фото и арт-работ",
                  "url": "https://gighub.ru/ai-services?category=images"
                },
                {
                  "@type": "Thing",
                  "name": "Обработка текста",
                  "description": "ИИ для создания и редактирования текстового контента",
                  "url": "https://gighub.ru/ai-services?category=text"
                },
                {
                  "@type": "Thing",
                  "name": "Чат-боты",
                  "description": "ИИ-ассистенты для общения и решения задач",
                  "url": "https://gighub.ru/ai-services?category=chat"
                },
                {
                  "@type": "Thing",
                  "name": "Генерация музыки",
                  "description": "ИИ для создания музыкальных композиций",
                  "url": "https://gighub.ru/ai-services?category=music"
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