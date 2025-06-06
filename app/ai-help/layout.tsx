import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Нейросеть помощь — ИИ-ассистенты и помощники для решения задач 2025',
  description: 'Лучшие нейросети-помощники для работы, учебы и повседневных задач. ChatGPT, Claude, Gemini и другие ИИ-ассистенты. Получите помощь от искусственного интеллекта.',
  keywords: 'нейросеть помощь, ии помощник, нейросеть ассистент, chatgpt помощь, ии для помощи, искусственный интеллект помощник, нейросеть для решения задач',
  openGraph: {
    title: 'Нейросеть помощь — ИИ-ассистенты и помощники',
    description: 'ТОП нейросетей-помощников для работы и учебы. ChatGPT, Claude, Gemini и 500+ ИИ-ассистентов.',
    url: 'https://gighub.ru/ai-help',
    images: [
      {
        url: 'https://gighub.ru/og-ai-help.jpg',
        width: 1200,
        height: 630,
        alt: 'Нейросеть помощь - ИИ-ассистенты для решения задач',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Нейросеть помощь — ИИ-ассистенты и помощники',
    description: 'ТОП нейросетей-помощников для работы и учебы',
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 