import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ИИ чат-боты — лучшие нейросети для общения и поддержки 2025',
  description: 'Топ чат-ботов на основе ИИ. ChatGPT, Claude, Character.AI, Poe и другие умные помощники для бизнеса, обучения и развлечений.',
  keywords: 'ии чат, чат боты нейросети, chatgpt, claude ai, character ai, poe ai, нейросеть для общения, ии помощник',
  openGraph: {
    title: 'ИИ чат-боты — лучшие нейросети для общения',
    description: 'ТОП чат-ботов с ИИ. ChatGPT, Claude, Character.AI, Poe и 50+ умных помощников.',
    url: 'https://gighub.ru/ai-chat',
    images: [
      {
        url: 'https://gighub.ru/og-ai-chat.jpg',
        width: 1200,
        height: 630,
        alt: 'ИИ чат-боты - общайтесь с лучшими нейросетями',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ИИ чат-боты — лучшие нейросети для общения',
    description: 'ТОП чат-ботов с ИИ. ChatGPT, Claude, Character.AI, Poe и 50+ умных помощников.',
  },
  alternates: {
    canonical: 'https://gighub.ru/ai-chat',
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 