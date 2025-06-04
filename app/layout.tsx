import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'GigHub — Платформа лучших ИИ-инструментов',
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
      <body className={`${inter.className} font-sans antialiased`}>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
} 