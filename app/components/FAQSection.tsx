'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'

const faqData = [
  {
    question: "Что такое нейросеть?",
    answer: "Нейросеть (нейронная сеть) — это модель искусственного интеллекта, которая имитирует работу человеческого мозга для решения различных задач: генерации текста, изображений, анализа данных и автоматизации процессов. Современные нейросети могут создавать реалистичные картинки, писать тексты, переводить языки и многое другое."
  },
  {
    question: "Какие бывают типы нейросетей?",
    answer: "Основные типы нейросетей включают: генеративные ИИ для создания изображений (Midjourney, DALL-E, Stable Diffusion), большие языковые модели для работы с текстом (ChatGPT, Claude, Gemini), мультимодальные системы, нейросети для музыки и аудио, видеогенерации и специализированные ИИ для программирования и автоматизации."
  },
  {
    question: "Есть ли бесплатные нейросети?",
    answer: "Да, многие нейросети предлагают бесплатный тариф или пробный период: ChatGPT (ограниченно), Claude, Google Gemini, Stable Diffusion, Leonardo AI, Runway и другие. У нас есть отдельный раздел с бесплатными ИИ-сервисами, где собраны лучшие бесплатные нейросети для различных задач."
  },
  {
    question: "Как выбрать нейросеть для своих задач?",
    answer: "Выбор зависит от цели: для генерации изображений используйте Midjourney, DALL-E или Stable Diffusion; для работы с текстом - ChatGPT, Claude или Gemini; для создания презентаций - Gamma или Beautiful.ai; для анализа данных - специализированные ИИ-платформы. Наш каталог поможет найти подходящий инструмент с фильтрами по категориям."
  },
  {
    question: "Безопасно ли использовать нейросети?",
    answer: "Большинство популярных нейросетей безопасны для использования. Однако важно: не передавать конфиденциальную информацию в бесплатные ИИ-чаты, проверять результаты работы ИИ (особенно фактическую информацию), соблюдать авторские права при использовании созданного контента и выбирать проверенные сервисы из нашего каталога."
  },
  {
    question: "Можно ли использовать нейросети для бизнеса?",
    answer: "Да, нейросети активно используются в бизнесе для: создания контента и маркетинговых материалов, автоматизации клиентской поддержки, анализа данных и аналитики, генерации кода и автоматизации разработки, создания презентаций и дизайна. Многие сервисы предлагают коммерческие лицензии и API для интеграции."
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      {/* JSON-LD разметка для FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />

      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <HelpCircle className="w-8 h-8 text-accent-primary" />
              <span className="text-accent-primary font-semibold text-lg">
                Часто задаваемые вопросы
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Всё о <span className="text-gradient">нейросетях</span>
            </h2>
            
            <p className="text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
              Ответы на популярные вопросы о нейросетях, искусственном интеллекте 
              и использовании ИИ-инструментов для решения ваших задач
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transform hover:scale-105 transition-all duration-300"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-8 py-6 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-inset"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-text-primary pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0 transform transition-transform duration-300" style={{ transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      {openIndex === index ? (
                        <ChevronUp className="w-6 h-6 text-accent-primary" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </div>
                </button>
                
                {openIndex === index && (
                  <div className="px-8 pb-6 border-t border-gray-100 animate-fadeIn">
                    <p className="text-text-secondary leading-relaxed pt-4">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA секция */}
          <div className="text-center mt-12 p-8 bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 rounded-3xl border border-accent-primary/20">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Готовы найти свою идеальную нейросеть?
            </h3>
            <p className="text-text-secondary mb-6">
              Исследуйте наш каталог из 2000+ проверенных ИИ-инструментов
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/ai-services"
                className="inline-flex items-center px-8 py-4 bg-accent-primary text-white rounded-xl hover:bg-accent-primary/90 transition-colors font-semibold transform hover:scale-105 active:scale-95"
              >
                Открыть каталог
              </a>
              <a
                href="/free-neural-networks"
                className="inline-flex items-center px-8 py-4 border-2 border-accent-primary text-accent-primary rounded-xl hover:bg-accent-primary hover:text-white transition-colors font-semibold transform hover:scale-105 active:scale-95"
              >
                Бесплатные нейросети
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
} 