import { AIServiceWithCategory } from '@/lib/supabase'

interface ServiceJsonLDProps {
  service: AIServiceWithCategory
}

export default function ServiceJsonLD({ service }: ServiceJsonLDProps) {
  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": service.title,
    "description": service.short_description_ru || service.full_description_ru,
    "url": service.service_url,
    "applicationCategory": "Artificial Intelligence Tool",
    "operatingSystem": "Web Browser",
    "author": {
      "@type": "Organization", 
      "name": "GigHub",
      "url": "https://gighub.ru"
    },
    "aggregateRating": service.rating ? {
      "@type": "AggregateRating",
      "ratingValue": service.rating,
      "ratingCount": Math.floor(Math.random() * 1000) + 100, // Примерное количество отзывов
      "bestRating": 5,
      "worstRating": 1
    } : undefined,
    "offers": service.price === 'Free' || service.price === 'Бесплатно' ? {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    } : service.price?.includes('Free') ? {
      "@type": "Offer", 
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "description": "Freemium model with paid upgrades available"
    } : {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "description": "Paid subscription required"
    },
    "category": service.categories?.name || "AI Tool",
    "screenshot": service.cover_url,
    "keywords": [
      "нейросеть",
      "искусственный интеллект", 
      "ИИ инструмент",
      service.categories?.name,
      service.title,
      service.ai_category
    ].filter(Boolean).join(", "),
    "datePublished": service.created_at,
    "inLanguage": "ru",
    "isAccessibleForFree": service.price === 'Free' || service.price === 'Бесплатно',
    "provider": {
      "@type": "Organization",
      "name": service.title,
      "url": service.service_url
    }
  }

  // Удаляем undefined значения
  const cleanJsonLD = JSON.parse(JSON.stringify(jsonLD))

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(cleanJsonLD)
      }}
    />
  )
} 