# SEO-оптимизация страниц сервисов GigHub

## Статус выполнения: 🟡 В разработке

### Краткое описание
Список задач для полной SEO-оптимизации индивидуальных страниц ИИ-сервисов на платформе GigHub.

## 🎯 Основные задачи

### 1. ✅ Внедрение слагов в URL
- [x] Обновлен API endpoint для поддержки slug и ID
- [x] Модифицирован компонент ServiceCard для использования slug
- [x] Добавлена поддержка обратной совместимости с существующими ID
- [x] URL теперь: `/ai-services/{slug}` вместо `/ai-services/{id}`

### 2. ✅ Динамические метатеги и Open Graph
**Приоритет: Высокий** - ВЫПОЛНЕНО
- [x] Внедрить `NextSeo` компонент на страницах сервисов
- [x] Динамические метатеги:
  - [x] `title`: "{service.title} - лучший ИИ-сервис | GigHub"
  - [x] `description`: сокращенное описание сервиса (до 160 символов)
  - [x] `keywords`: категория + функциональность сервиса
  - [x] `canonical`: полный URL со slug
- [x] Open Graph теги:
  - [x] `og:title`, `og:description`, `og:image` (обложка сервиса)
  - [x] `og:type`: "website" 
  - [x] `og:site_name`: "GigHub - Каталог нейросетей и ИИ-сервисов"
- [x] Twitter Card теги:
  - [x] `twitter:card`: "summary_large_image"
  - [x] `twitter:title`, `twitter:description`, `twitter:image`

### 3. ✅ JSON-LD структурированные данные
**Приоритет: Высокий** - ВЫПОЛНЕНО
- [x] **SoftwareApplication Schema**:
  ```json
  {
    "@type": "SoftwareApplication",
    "name": "service.title",
    "description": "service.short_description_ru",
    "url": "service.service_url",
    "screenshot": "service.cover_url",
    "applicationCategory": "AITool",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "service.price",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating", 
      "ratingValue": "service.rating",
      "reviewCount": "service.bookmarks_count"
    }
  }
  ```
- [ ] **Organization Schema** для провайдера сервиса
- [ ] **WebPage Schema** для самой страницы
- [x] **BreadcrumbList Schema** для навигации

### 4. ✅ Breadcrumbs (хлебные крошки)
**Приоритет: Средний** - ВЫПОЛНЕНО
- [x] Визуальные breadcrumbs в UI
- [x] Структурированные данные BreadcrumbList:
  ```
  Главная > Каталог ИИ > {Категория} > {Название сервиса}
  ```

### 5. ✅ FAQ Schema для страниц сервисов
**Приоритет: Средний** - ВЫПОЛНЕНО
- [x] Парсинг существующего поля `faq_ru`
- [x] Внедрение `FAQPageJsonLd` компонента
- [x] Структурированное отображение FAQ в UI

### 6. 🟡 Оптимизация изображений для SEO
**Приоритет: Средний** - ЧАСТИЧНО ВЫПОЛНЕНО
- [x] Добавить alt-теги для всех изображений:
  - [x] Логотипы: "Логотип {service.title}"
  - [x] Обложки: "Скриншот интерфейса {service.title}"
- [ ] Оптимизация размеров изображений для Open Graph (1200x630)
- [ ] WebP формат для ускорения загрузки
- [ ] Lazy loading для изображений

### 7. 🔴 Семантическая разметка HTML
**Приоритет: Средний**
- [ ] Использование семантических тегов:
  - [ ] `<article>` для контента сервиса
  - [ ] `<section>` для различных блоков
  - [ ] `<aside>` для похожих сервисов
  - [ ] `<h1>`, `<h2>`, `<h3>` для иерархии заголовков

### 8. 🔴 Robots.txt и sitemap
**Приоритет: Низкий**
- [ ] Добавить страницы сервисов в sitemap.xml
- [ ] Обновить robots.txt для индексации /ai-services/*
- [ ] Динамическая генерация sitemap с учетом slug

### 9. 🔴 Локализация и языковые альтернативы
**Приоритет: Низкий (будущее)**
- [ ] Подготовка к мультиязычности:
  - [ ] `hreflang` теги для русской версии
  - [ ] Подготовка структуры для английской версии

### 10. 🔴 Производительность и Core Web Vitals
**Приоритет: Средний**
- [ ] Оптимизация LCP (Largest Contentful Paint):
  - [ ] Приоритет загрузки для обложки сервиса
  - [ ] Предзагрузка критических ресурсов
- [ ] Минимизация CLS (Cumulative Layout Shift):
  - [ ] Фиксированные размеры для изображений
  - [ ] Скелетоны при загрузке данных

### 11. 🔴 Социальные сигналы
**Приоритет: Низкий**
- [ ] Кнопки социального шеринга:
  - [ ] "Поделиться в Telegram"
  - [ ] "Поделиться ВКонтакте" 
  - [ ] "Скопировать ссылку"
- [ ] Микроразметка для кнопок действий

### 12. 🔴 Аналитика и отслеживание
**Приоритет: Средний**
- [ ] Google Analytics 4 события:
  - [ ] `view_item` при просмотре сервиса
  - [ ] `click` при переходе на внешний сайт
  - [ ] `share` при использовании кнопок шеринга
- [ ] Яндекс.Метрика цели для российской аудитории

## 🔧 Технические детали реализации

### Зависимости
```bash
npm install next-seo
```

### Структура компонентов
```
app/ai-services/[slug]/
├── page.tsx          # Основная страница с NextSeo
├── layout.tsx        # Layout с базовыми метатегами  
└── components/
    ├── ServiceSEO.tsx    # SEO компонент с JSON-LD
    ├── Breadcrumbs.tsx   # Хлебные крошки
    └── FAQSection.tsx    # FAQ с структурированными данными
```

### Пример реализации NextSeo
```tsx
import { NextSeo, SoftwareAppJsonLd } from 'next-seo';

const ServiceSEO = ({ service }) => (
  <>
    <NextSeo
      title={`${service.title} - лучший ИИ-сервис | GigHub`}
      description={service.short_description_ru?.slice(0, 160)}
      canonical={`https://gighub.ru/ai-services/${service.slug}`}
      openGraph={{
        title: service.title,
        description: service.short_description_ru,
        url: `https://gighub.ru/ai-services/${service.slug}`,
        siteName: 'GigHub - Каталог ИИ-сервисов',
        images: [{
          url: service.cover_url,
          width: 1200,
          height: 630,
          alt: `Скриншот ${service.title}`,
        }],
        type: 'website',
      }}
      twitter={{
        cardType: 'summary_large_image',
      }}
    />
    <SoftwareAppJsonLd
      name={service.title}
      price={service.price || "0"}
      priceCurrency="USD"
      aggregateRating={{
        ratingValue: service.rating?.toString() || "5",
        reviewCount: service.bookmarks_count?.toString() || "1"
      }}
      operatingSystem="Web"
      applicationCategory="AITool"
    />
  </>
);
```

## 📊 Ожидаемые результаты

### Краткосрочные (1-2 недели)
- Улучшение позиций в поисковой выдаче на 20-30%
- Увеличение CTR из поисковых систем на 25%
- Корректное отображение превью в социальных сетях

### Среднесрочные (1-2 месяца)  
- Увеличение органического трафика на 40-60%
- Появление rich snippets в Google/Yandex
- Улучшение индексации новых страниц сервисов

### Долгосрочные (3-6 месяцев)
- Попадание в топ-3 по запросам "{название сервиса} обзор"
- Увеличение времени пребывания на сайте на 35%
- Улучшение общего Domain Authority

## 🎯 Ключевые метрики для отслеживания

1. **Позиции в поиске**: мониторинг по целевым запросам
2. **Органический трафик**: рост посещений из поисковых систем  
3. **CTR**: процент кликов из поисковой выдачи
4. **Core Web Vitals**: LCP, FID, CLS показатели
5. **Индексация**: количество проиндексированных страниц
6. **Конверсии**: переходы на сайты сервисов

---

**Последнее обновление**: 2025-01-08  
**Ответственный**: AI Agent  
**Статус проекта**: Активная разработка 