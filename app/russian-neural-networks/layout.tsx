import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Нейросети на русском языке — ИИ-сервисы с поддержкой русского 2025',
  description: 'Подборка нейросетей с полной поддержкой русского языка. ИИ-чаты, генераторы текста и изображений, понимающие русский. Отечественные и зарубежные сервисы.',
  keywords: 'нейросети на русском, русские нейросети, ии на русском языке, нейросеть русский язык, yandex gpt, gigachat, kandinsky',
  openGraph: {
    title: 'Нейросети на русском — ИИ с поддержкой русского языка',
    description: 'ТОП русскоязычных нейросетей и ИИ-сервисов. YandexGPT, GigaChat, Kandinsky и другие.',
    url: 'https://gighub.ru/russian-neural-networks',
    images: [
      {
        url: 'https://gighub.ru/og-russian-neural-networks.jpg',
        width: 1200,
        height: 630,
        alt: 'Нейросети на русском языке - ИИ для российских пользователей',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Нейросети на русском — ИИ с поддержкой русского языка',
    description: 'ТОП русскоязычных нейросетей и ИИ-сервисов',
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 