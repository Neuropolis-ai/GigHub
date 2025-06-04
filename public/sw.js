const CACHE_NAME = 'gighub-v1.0.0'
const urlsToCache = [
  '/',
  '/ai-services',
  '/categories',
  '/free-neural-networks',
  '/online-neural-networks',
  '/text-neural-networks', 
  '/image-neural-networks',
  '/russian-neural-networks',
  '/ai-help',
  '/presentation-ai',
  '/ai-chat',
  '/gpt-neural-networks',
  '/blog',
  '/offline',
  '/manifest.json'
]

// Установка Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('GigHub: Service Worker кэширует основные ресурсы')
        return cache.addAll(urlsToCache)
      })
  )
})

// Активация Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('GigHub: Удаляем старый кэш', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Обработка fetch запросов
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Возвращаем кэшированную версию или делаем новый запрос
        if (response) {
          return response
        }

        return fetch(event.request).then((response) => {
          // Проверяем валидность ответа
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response
          }

          // Клонируем ответ для кэширования
          const responseToCache = response.clone()

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache)
            })

          return response
        }).catch(() => {
          // Если запрос не удался, показываем оффлайн страницу для навигационных запросов
          if (event.request.destination === 'document') {
            return caches.match('/offline')
          }
        })
      })
  )
})

// Push уведомления (для будущего использования)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Новые нейросети добавлены в каталог!',
    icon: '/icon-192x192.png',
    badge: '/icon-96x96.png',
    tag: 'gighub-notification',
    actions: [
      {
        action: 'explore',
        title: 'Исследовать',
        icon: '/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Закрыть'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('GigHub - Каталог нейросетей', options)
  )
})

// Обработка кликов по уведомлениям
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/ai-services')
    )
  }
}) 