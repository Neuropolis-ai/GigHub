'use client'

import { motion } from 'framer-motion'
import ServiceCard from './ServiceCard'
import { AIServiceWithCategory } from '@/lib/supabase'

interface RelatedServicesProps {
  currentService: AIServiceWithCategory
  relatedServices: AIServiceWithCategory[]
  title?: string
}

export default function RelatedServices({ 
  currentService, 
  relatedServices, 
  title = "Похожие нейросети" 
}: RelatedServicesProps) {
  if (!relatedServices || relatedServices.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-text-primary mb-6">
            {title}
            {currentService.categories?.name && (
              <span className="text-purple-500"> в категории "{currentService.categories.name}"</span>
            )}
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Другие популярные ИИ-инструменты, которые могут вас заинтересовать
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedServices.slice(0, 6).map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ServiceCard {...service} index={index} />
            </motion.div>
          ))}
        </div>

        {relatedServices.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href={`/ai-services${currentService.category_id ? `?category_id=${currentService.category_id}` : ''}`}
              className="inline-flex items-center px-8 py-4 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors font-semibold"
            >
              Смотреть все сервисы
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
} 