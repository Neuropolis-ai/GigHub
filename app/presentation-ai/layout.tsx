import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Нейросети для презентаций — ИИ для создания слайдов и дизайна 2025',
  description: 'Лучшие нейросети для создания презентаций и слайдов. Gamma, Beautiful.AI, Tome и другие ИИ-инструменты для быстрого создания профессиональных презентаций.',
  keywords: 'нейросеть для презентаций, ии презентации, создать презентацию нейросетью, gamma ai, beautiful ai, tome ai, автоматические слайды',
  openGraph: {
    title: 'Нейросети для презентаций — ИИ для создания слайдов',
    description: 'ТОП нейросетей для презентаций. Gamma, Beautiful.AI, Tome и 50+ ИИ-инструментов для слайдов.',
    url: 'https://gighub.ru/presentation-ai',
    images: [
      {
        url: 'https://gighub.ru/og-presentation-ai.jpg',
        width: 1200,
        height: 630,
        alt: 'Нейросети для презентаций - создавайте слайды с помощью ИИ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Нейросети для презентаций — ИИ для создания слайдов',
    description: 'ТОП нейросетей для презентаций. Gamma, Beautiful.AI, Tome и 50+ ИИ-инструментов для слайдов.',
  },
  alternates: {
    canonical: 'https://gighub.ru/presentation-ai',
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 