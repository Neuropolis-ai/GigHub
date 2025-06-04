import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Нейросети для текста — ИИ-генераторы и редакторы текста 2025',
  description: 'Лучшие нейросети для создания, редактирования и обработки текста. ChatGPT, Claude, Jasper и другие ИИ-писатели. Копирайтинг, рерайт, переводы.',
  keywords: 'нейросеть текст, генерация текста, ии копирайтинг, нейросеть для письма, chatgpt, claude, jasper, ии писатель',
  openGraph: {
    title: 'Нейросети для текста — ИИ-генераторы текста',
    description: 'ТОП нейросетей для создания и обработки текста. ChatGPT, Claude и 200+ ИИ-писателей.',
    url: 'https://gighub.ru/text-neural-networks',
    images: [
      {
        url: 'https://gighub.ru/og-text-neural-networks.jpg',
        width: 1200,
        height: 630,
        alt: 'Нейросети для текста - создавайте контент с помощью ИИ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Нейросети для текста — ИИ-генераторы текста',
    description: 'ТОП нейросетей для создания и обработки текста. ChatGPT, Claude и 200+ ИИ-писателей.',
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 