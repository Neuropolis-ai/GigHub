'use client'

import { NextSeo, SoftwareAppJsonLd, BreadcrumbJsonLd } from 'next-seo'
import { AIServiceWithCategory } from '@/lib/supabase'

interface ServiceSEOProps {
  service: AIServiceWithCategory
}

const ServiceSEO = ({ service }: ServiceSEOProps) => {
  // Формируем описание до 160 символов для SEO
  const metaDescription = service.short_description_ru
    ? service.short_description_ru.length > 160
      ? service.short_description_ru.slice(0, 157) + '...'
      : service.short_description_ru
    : `${service.title} - инновационный ИИ-сервис для решения задач. Попробуйте нейросеть бесплатно на GigHub.`

  // Формируем ключевые слова
  const keywords = [
    service.title.toLowerCase(),
    'нейросеть',
    'ИИ-сервис',
    'искусственный интеллект',
    service.categories?.name.toLowerCase() || '',
    'gighub',
    'каталог нейросетей'
  ].filter(Boolean).join(', ')

  // URL страницы
  const pageUrl = `https://gighub.ru/ai-services/${service.slug || service.id}`
  
  // Изображение для социальных сетей (предпочитаем обложку, fallback на логотип)
  const socialImage = service.cover_url || service.logo_url || 'https://gighub.ru/og-default.jpg'

  // Breadcrumbs данные
  const breadcrumbs = [
    {
      position: 1,
      name: 'Главная',
      item: 'https://gighub.ru',
    },
    {
      position: 2,
      name: 'Каталог ИИ',
      item: 'https://gighub.ru/ai-services',
    },
  ]

  // Добавляем категорию если есть
  if (service.categories) {
    breadcrumbs.push({
      position: 3,
      name: service.categories.name,
      item: `https://gighub.ru/ai-services?category=${service.categories.slug}`,
    })
    breadcrumbs.push({
      position: 4,
      name: service.title,
      item: pageUrl,
    })
  } else {
    breadcrumbs.push({
      position: 3,
      name: service.title,
      item: pageUrl,
    })
  }

  return (
    <>
      <NextSeo
        title={`${service.title} - лучший ИИ-сервис | GigHub - Каталог нейросетей и ИИ-сервисов`}
        description={metaDescription}
        canonical={pageUrl}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: keywords,
          },
          {
            name: 'author',
            content: 'GigHub',
          },
          {
            name: 'robots',
            content: 'index, follow',
          },
        ]}
        openGraph={{
          title: service.title,
          description: metaDescription,
          url: pageUrl,
          siteName: 'GigHub - Каталог нейросетей и ИИ-сервисов',
          images: [
            {
              url: socialImage,
              width: 1200,
              height: 630,
              alt: `Скриншот интерфейса ${service.title}`,
              type: 'image/jpeg',
            },
          ],
          type: 'website',
          locale: 'ru_RU',
        }}
        twitter={{
          cardType: 'summary_large_image',
          site: '@gighub',
          handle: '@gighub',
        }}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.ico',
          },
          {
            rel: 'apple-touch-icon',
            href: '/apple-touch-icon.png',
            sizes: '180x180',
          },
        ]}
      />

      {/* SoftwareApplication Schema */}
      <SoftwareAppJsonLd
        name={service.title}
        price={service.price || "0"}
        priceCurrency="USD"
        aggregateRating={{
          ratingValue: service.rating?.toString() || "4.5",
          reviewCount: service.bookmarks_count?.toString() || "1",
          bestRating: "5",
          worstRating: "1"
        }}
        operatingSystem="Web"
        applicationCategory="AITool"
        author={{
          '@type': 'Organization',
          name: 'GigHub',
          url: 'https://gighub.ru'
        }}
        downloadUrl={service.service_url || pageUrl}
        screenshot={service.cover_url}
        description={metaDescription}
        datePublished={service.created_at}
        dateModified={service.updated_at || service.created_at}
        offers={{
          '@type': 'Offer',
          price: service.price === 'Бесплатно' ? '0' : service.price || '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock'
        }}
      />

      {/* Breadcrumb Schema */}
      <BreadcrumbJsonLd
        itemListElements={breadcrumbs}
      />
    </>
  )
}

export default ServiceSEO 