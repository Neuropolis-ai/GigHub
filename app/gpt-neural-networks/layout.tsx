import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GPT нейросети — ChatGPT и другие GPT-модели для работы и творчества 2025',
  description: 'Полный гид по GPT нейросетям. ChatGPT, GPT-4, GPT-3.5, AutoGPT и другие модели генеративного ИИ. История развития, сравнение версий и лучшие GPT-сервисы.',
  keywords: 'gpt нейросеть, chatgpt, gpt-4, gpt-3.5, autogpt, генеративный ии, openai gpt, нейросеть gpt, gpt модели, искусственный интеллект gpt',
  openGraph: {
    title: 'GPT нейросети — ChatGPT и все GPT-модели',
    description: 'Полный гид по GPT нейросетям. ChatGPT, GPT-4, AutoGPT и 50+ GPT-сервисов.',
    url: 'https://gighub.ru/gpt-neural-networks',
    images: [
      {
        url: 'https://gighub.ru/og-gpt-neural-networks.jpg',
        width: 1200,
        height: 630,
        alt: 'GPT нейросети - полный гид по ChatGPT и GPT-моделям',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GPT нейросети — ChatGPT и все GPT-модели',
    description: 'Полный гид по GPT нейросетям. ChatGPT, GPT-4, AutoGPT и 50+ GPT-сервисов.',
  },
  alternates: {
    canonical: 'https://gighub.ru/gpt-neural-networks',
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 