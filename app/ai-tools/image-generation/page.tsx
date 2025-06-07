'use client'

import Link from 'next/link'
import ImageGenerationHero from '../../components/ImageGenerationHero'
import TopAIToolsRecommendations from '../../components/TopAIToolsRecommendations'
import DetailedAIToolsReview from '../../components/DetailedAIToolsReview'
import InteractiveComparisonTable from '../../components/InteractiveComparisonTable'
import PromptMasteryGuide from '../../components/PromptMasteryGuide'
import AdvancedFAQSection from '../../components/AdvancedFAQSection'
import AuthorAndCommentsSection from '../../components/AuthorAndCommentsSection'

// FAQ данные для JSON-LD
const faqData = [
  {
    questionName: "Какая нейросеть лучше всего подходит для начинающих?",
    acceptedAnswerText: "Для начинающих рекомендуется Leonardo AI или DALL-E 3. Leonardo AI предоставляет 150 бесплатных токенов в день и имеет простой интерфейс, а DALL-E 3 интегрирован с ChatGPT и понимает русский язык."
  },
  {
    questionName: "Можно ли использовать изображения коммерчески?",
    acceptedAnswerText: "Да, большинство нейросетей позволяют коммерческое использование сгенерированных изображений. Однако условия различаются: Midjourney и DALL-E 3 разрешают коммерческое использование при наличии подписки, Stable Diffusion полностью свободен для любого использования."
  },
  {
    questionName: "Какие нейросети поддерживают русский язык?",
    acceptedAnswerText: "Русский язык поддерживают: Kandinsky 3.1 (разработан в России), DALL-E 3 (через ChatGPT), Leonardo AI и Stable Diffusion. Midjourney работает только с английскими промптами, но можно использовать переводчик."
  },
  {
    questionName: "Сколько времени занимает генерация изображения?",
    acceptedAnswerText: "Время генерации зависит от нейросети: DALL-E 3 - 10-30 секунд, Leonardo AI - 5-15 секунд, Midjourney - 30-60 секунд, Stable Diffusion - 5-30 секунд в зависимости от настроек и мощности компьютера."
  },
  {
    questionName: "Нужен ли мощный компьютер для работы с нейросетями?",
    acceptedAnswerText: "Для большинства онлайн-сервисов (Midjourney, DALL-E 3, Leonardo AI) мощный компьютер не нужен - все вычисления происходят на серверах. Мощная видеокарта нужна только для локального запуска Stable Diffusion."
  }
];

// Главный компонент страницы
export default function ImageGenerationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-accent-primary/5 via-background to-accent-secondary/5">
      {/* Хлебные крошки */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="text-sm text-text-secondary">
            <Link href="/" className="hover:text-accent-primary">Главная</Link>
            <span className="mx-2">/</span>
            <Link href="/ai-tools" className="hover:text-accent-primary">ИИ-инструменты</Link>
            <span className="mx-2">/</span>
            <span className="text-text-primary">Нейросети для изображений</span>
          </nav>
        </div>
      </div>

      {/* Hero-компонент */}
      <ImageGenerationHero />
      
      {/* Компонент "Топ-3 нейросети" */}
      <TopAIToolsRecommendations />

      {/* Компонент "Детальные обзоры" */}
      <DetailedAIToolsReview />

      {/* Компонент "Интерактивная сравнительная таблица" */}
      <InteractiveComparisonTable />

      {/* Компонент "Искусство промта" */}
      <PromptMasteryGuide />

      {/* Расширенный FAQ компонент */}
      <AdvancedFAQSection />

      {/* Блок доверия с автором и комментариями */}
      <AuthorAndCommentsSection />

      {/* Заключение */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center bg-white rounded-xl shadow-lg p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            🎯 Заключение: Выбираем лучшую нейросеть для изображений
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            <strong>Нейросети для генерации изображений</strong> в 2025 году достигли невероятного уровня развития. 
            Будущее создания визуального контента уже здесь — выбирайте подходящий инструмент и творите без границ!
          </p>
          
          {/* Наши рекомендации */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: "🎨", title: "Для художников", tool: "Midjourney", desc: "Непревзойденное качество" },
              { icon: "💼", title: "Для бизнеса", tool: "Adobe Firefly", desc: "Профессиональные инструменты" },
              { icon: "🆓", title: "Для экономии", tool: "Stable Diffusion", desc: "Бесплатно и мощно" },
              { icon: "🇷🇺", title: "Для русских", tool: "Kandinsky 3.1", desc: "Понимает наш язык" },
              { icon: "👶", title: "Для новичков", tool: "DALL-E 3", desc: "Простой старт" },
              { icon: "⚡", title: "Для энтузиастов", tool: "Stable Diffusion 3", desc: "Полная свобода" }
            ].map((rec, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">{rec.icon}</div>
                <div className="font-semibold text-gray-900">{rec.title}</div>
                <div className="text-purple-600 font-medium">{rec.tool}</div>
                <div className="text-sm text-gray-600">{rec.desc}</div>
              </div>
            ))}
          </div>

          {/* CTA кнопки */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/ai-tools" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all">
              Смотреть все ИИ-инструменты
            </Link>
            <Link href="/ai-tools?category=free" className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-medium hover:bg-purple-50 transition-all">
              Только бесплатные
            </Link>
          </div>
        </section>
      </div>

      {/* JSON-LD структурированные данные */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map((faq) => ({
              "@type": "Question",
              "name": faq.questionName,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.acceptedAnswerText
              }
            }))
          })
        }}
      />
    </main>
  )
} 