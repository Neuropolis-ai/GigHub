import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Бесплатные нейросети — Лучшие ИИ-сервисы без оплаты в 2025',
  description: 'ТОП бесплатных нейросетей для генерации изображений, текста и решения задач. Полнофункциональные ИИ-инструменты без регистрации и платы. Протестированные сервисы.',
  keywords: 'бесплатные нейросети, нейросеть бесплатно, бесплатная нейросеть, ии бесплатно, нейросеть без оплаты',
  openGraph: {
    title: 'Бесплатные нейросети — Лучшие ИИ-сервисы без оплаты',
    description: 'ТОП бесплатных нейросетей для генерации изображений, текста и решения задач',
    url: 'https://gighub.ru/free-neural-networks',
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 