import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Horizon — Платформа лучших ИИ-инструментов',
  description: 'Откройте для себя лучшие нейросети и ИИ-сервисы мира в одном месте. Генерация изображений, чат-боты, автоматизация и многое другое.',
  keywords: 'AI, нейросети, искусственный интеллект, генерация изображений, чат-боты, автоматизация',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
} 