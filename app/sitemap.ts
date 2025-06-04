import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://gighub.ru',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://gighub.ru/ai-services',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://gighub.ru/categories',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://gighub.ru/free-neural-networks',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://gighub.ru/online-neural-networks',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://gighub.ru/russian-neural-networks',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    // TODO: Добавить все страницы ИИ-сервисов динамически
  ]
} 