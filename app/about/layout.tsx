import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'О проекте GigHub - Крупнейший агрегатор ИИ-сервисов | AI инструменты 2025',
  description: 'GigHub - ведущая платформа искусственного интеллекта. Объединяем лучшие ИИ-сервисы: от машинного перевода до компьютерного зрения. Присоединяйтесь к сообществу экспертов ИИ.',
  keywords: 'GigHub, искусственный интеллект, ИИ сервисы, AI платформа, машинное обучение, нейросети, автоматизация, аналитика данных, обработка языка, компьютерное зрение',
  authors: [{ name: 'GigHub Team' }],
  creator: 'GigHub',
  publisher: 'GigHub',
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
  openGraph: {
    title: 'О проекте GigHub - Крупнейший агрегатор ИИ-сервисов',
    description: 'Откройте для себя ведущую платформу искусственного интеллекта. Тысячи ИИ-инструментов для бизнеса, творчества и исследований в одном месте.',
    url: 'https://gighub.ru/about',
    siteName: 'GigHub',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'GigHub - О проекте',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'О проекте GigHub - Крупнейший агрегатор ИИ-сервисов',
    description: 'Ведущая платформа искусственного интеллекта. Тысячи ИИ-инструментов для всех задач.',
    images: ['/og-about.jpg'],
  },
  alternates: {
    canonical: 'https://gighub.ru/about',
  },
}

export default function AboutLayout({
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
            "@type": "AboutPage",
            "name": "О проекте GigHub",
            "description": "GigHub - крупнейший агрегатор онлайн-сервисов с искусственным интеллектом. Объединяем лучшие ИИ-инструменты для бизнеса, творчества и исследований.",
            "url": "https://gighub.ru/about",
            "mainEntity": {
              "@type": "Organization",
              "name": "GigHub",
              "description": "Ведущая платформа искусственного интеллекта и агрегатор ИИ-сервисов",
              "url": "https://gighub.ru",
              "logo": "https://gighub.ru/logo.png",
              "foundingDate": "2024",
              "slogan": "Создавая будущее с искусственным интеллектом",
              "serviceType": "AI Platform",
              "areaServed": "Worldwide",
              "knowsAbout": [
                "Искусственный интеллект",
                "Машинное обучение", 
                "Нейронные сети",
                "Обработка естественного языка",
                "Компьютерное зрение",
                "Аналитика данных",
                "Автоматизация процессов"
              ]
            }
          })
        }}
      />
      {children}
    </>
  )
} 