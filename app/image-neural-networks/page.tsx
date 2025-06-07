'use client'

import Link from 'next/link'
import ImageGenerationHero from '../components/ImageGenerationHero'
import TopAIToolsRecommendations from '../components/TopAIToolsRecommendations'
import DetailedAIToolsReview from '../components/DetailedAIToolsReview'
import InteractiveComparisonTable from '../components/InteractiveComparisonTable'
import PromptMasteryGuide from '../components/PromptMasteryGuide'
import AdvancedFAQSection from '../components/AdvancedFAQSection'
import AuthorAndCommentsSection from '../components/AuthorAndCommentsSection'

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