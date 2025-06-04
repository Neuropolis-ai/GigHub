import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Нейросети онлайн — ИИ-сервисы в браузере без установки 2025',
  description: 'Лучшие нейросети, работающие онлайн в браузере. Генерация изображений, обработка текста и решение задач без скачивания программ. Быстрый доступ к ИИ.',
  keywords: 'нейросети онлайн, нейросеть в браузере, онлайн ии, веб нейросеть, нейросеть без установки, онлайн искусственный интеллект',
  openGraph: {
    title: 'Нейросети онлайн — ИИ в браузере без установки',
    description: 'Лучшие онлайн нейросети без установки. ChatGPT, Midjourney и 500+ ИИ-сервисов в браузере.',
    url: 'https://gighub.ru/online-neural-networks',
    images: [
      {
        url: 'https://gighub.ru/og-online-neural-networks.jpg',
        width: 1200,
        height: 630,
        alt: 'Нейросети онлайн - работайте с ИИ прямо в браузере',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Нейросети онлайн — ИИ в браузере без установки',
    description: 'Лучшие онлайн нейросети без установки. ChatGPT, Midjourney и 500+ ИИ-сервисов в браузере.',
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 