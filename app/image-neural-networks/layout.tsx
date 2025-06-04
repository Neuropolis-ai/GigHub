import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Нейросети для изображений — ИИ-генераторы картинок и фото 2025',
  description: 'Лучшие нейросети для создания и обработки изображений. Midjourney, DALL-E, Stable Diffusion и другие ИИ-художники. Генерация фото, арт, дизайн.',
  keywords: 'нейросеть фото, нейросеть картинки, нейросеть изображения, midjourney, dall-e, генерация изображений, ии художник, нейросеть для рисования',
  openGraph: {
    title: 'Нейросети для изображений — ИИ-генераторы картинок',
    description: 'ТОП нейросетей для создания изображений. Midjourney, DALL-E и 300+ ИИ-художников.',
    url: 'https://gighub.ru/image-neural-networks',
    images: [
      {
        url: 'https://gighub.ru/og-image-neural-networks.jpg',
        width: 1200,
        height: 630,
        alt: 'Нейросети для изображений - создавайте арт с помощью ИИ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Нейросети для изображений — ИИ-генераторы картинок',
    description: 'ТОП нейросетей для создания изображений. Midjourney, DALL-E и 300+ ИИ-художников.',
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 