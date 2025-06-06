import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Блог о нейросетях и ИИ — Новости, гайды и обзоры 2025',
  description: 'Актуальные статьи о нейросетях, искусственном интеллекте и ИИ-технологиях. Гайды по использованию, обзоры новых сервисов и тренды в мире ИИ.',
  keywords: 'блог нейросети, новости ии, гайды по нейросетям, обзоры ии сервисов, искусственный интеллект блог, нейросети статьи',
  openGraph: {
    title: 'Блог о нейросетях и ИИ — Новости и гайды',
    description: 'Актуальные статьи о нейросетях и искусственном интеллекте',
    url: 'https://gighub.ru/blog',
    images: [
      {
        url: 'https://gighub.ru/og-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'Блог о нейросетях и ИИ-технологиях',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Блог о нейросетях и ИИ — Новости и гайды',
    description: 'Актуальные статьи о нейросетях и искусственном интеллекте',
  },
  alternates: {
    canonical: 'https://gighub.ru/blog',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 