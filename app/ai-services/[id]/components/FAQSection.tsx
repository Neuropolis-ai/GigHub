'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { FAQPageJsonLd } from 'next-seo'

interface FAQSectionProps {
  faqText?: string | null
}

interface FAQItem {
  question: string
  answer: string
}

const FAQSection = ({ faqText }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Парсинг FAQ из текста
  const parseFAQ = (text: string): FAQItem[] => {
    if (!text) return []

    const lines = text.split('\n').filter(line => line.trim())
    const faqItems: FAQItem[] = []
    let currentQuestion = ''
    let currentAnswer = ''

    for (const line of lines) {
      const trimmedLine = line.trim()
      
      // Если строка начинается с "?", "Q:", "Вопрос:" или похожих паттернов - это вопрос
      if (trimmedLine.match(/^(\?|Q:|Вопрос:|В:)/i) || trimmedLine.endsWith('?')) {
        // Если у нас уже есть вопрос и ответ, сохраняем их
        if (currentQuestion && currentAnswer) {
          faqItems.push({
            question: currentQuestion.replace(/^(\?|Q:|Вопрос:|В:)\s*/i, ''),
            answer: currentAnswer.replace(/^(A:|Ответ:|О:)\s*/i, '')
          })
        }
        currentQuestion = trimmedLine
        currentAnswer = ''
      }
      // Если строка начинается с "A:", "Ответ:" или это ответ
      else if (trimmedLine.match(/^(A:|Ответ:|О:)/i) || currentQuestion) {
        currentAnswer += (currentAnswer ? ' ' : '') + trimmedLine
      }
    }

    // Добавляем последний элемент
    if (currentQuestion && currentAnswer) {
      faqItems.push({
        question: currentQuestion.replace(/^(\?|Q:|Вопрос:|В:)\s*/i, ''),
        answer: currentAnswer.replace(/^(A:|Ответ:|О:)\s*/i, '')
      })
    }

    return faqItems
  }

  const faqItems = faqText ? parseFAQ(faqText) : []

  if (faqItems.length === 0) {
    return null
  }

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Подготавливаем данные для JSON-LD
  const faqJsonLd = faqItems.map(item => ({
    questionName: item.question,
    acceptedAnswerText: item.answer
  }))

  return (
    <>
      {/* FAQ Schema */}
      <FAQPageJsonLd mainEntity={faqJsonLd} />
      
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Часто задаваемые вопросы
            </h2>
            <p className="text-xl text-gray-600">
              Ответы на популярные вопросы о сервисе
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {item.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-white border-t border-gray-200">
                        <p className="text-gray-700 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default FAQSection 