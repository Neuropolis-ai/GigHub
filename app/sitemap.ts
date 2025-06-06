import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gighub.ru'
  
  // Статические страницы
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/ai-services`,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // TODO: Добавить динамические страницы сервисов
  // Это будет реализовано после подключения к базе данных
  // const services = await getServices()
  // const servicePages = services.map(service => ({
  //   url: `${baseUrl}/ai-services/${service.slug || service.id}`,
  //   lastModified: new Date(service.updated_at || service.created_at),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.8,
  // }))

  return [
    ...staticPages,
    // ...servicePages (будет добавлено позже)
  ]
} 