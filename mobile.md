# Комплексный аудит мобильной версии каталога AI-сервисов GigHub

## 📱 Анализ текущего состояния

Проведен детальный анализ всех компонентов и страниц сайта https://www.gighub.ru/. Сайт использует современный стек: **Next.js 14**, **Tailwind CSS**, **Framer Motion**, но требует значительных улучшений для мобильного UX.

### 🔍 Проанализированные компоненты и страницы

#### ✅ Успешно проанализированы:
- **Главная страница** (`/`) - Hero секция, категории, featured tools
- **Каталог AI-сервисов** (`/ai-services`) - форма фильтров, карточки, пагинация  
- **Layout и Header** - навигация, меню, брендинг
- **Ключевые компоненты**: HeroSection, CategoryGrid, ServiceCard, Footer
- **Дизайн-система**: Tailwind config, глобальные стили

#### ❌ Проблемные страницы:
- **Страница категорий** (`/categories`) - Application error (требует исправления)

## 📊 Результаты детального анализа

### 🎯 **Главная страница (/)** 

#### Положительные стороны:
- ✅ Современный дизайн с градиентами и анимациями
- ✅ Использование Framer Motion для плавных переходов  
- ✅ Базовая адаптивность с `sm:`, `lg:` классами
- ✅ Semantic HTML структура

#### Критические проблемы:
- ❌ **HeroSection**: min-h-screen создает проблемы на мобильных (особенно с малой высотой экрана)
- ❌ **Типографика**: текст слишком мелкий на мобильных (`text-4xl` недостаточно для заголовка)
- ❌ **Кнопки**: CTA кнопки слишком маленькие для сенсорного взаимодействия
- ❌ **Отступы**: недостаточные margin/padding для комфортного touch-интерфейса

### 🛒 **Каталог AI-сервисов (/ai-services)**

#### Положительные стороны:
- ✅ Адаптивная сетка `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- ✅ Suspense boundary для оптимизации загрузки
- ✅ Базовая пагинация

#### Критические проблемы:
- ❌ **Форма фильтров**: занимает много места, неудобна на мобильных
- ❌ **ServiceCard**: недостаточные touch targets (< 44px)
- ❌ **Селекты**: стандартные HTML select неудобны на мобильных
- ❌ **Поиск**: поле поиска слишком маленькое
- ❌ **Пагинация**: кнопки слишком малы для touch

### 🎨 **Компоненты**

#### **Header**:
- ✅ Есть мобильное меню с гамбургером
- ❌ Touch targets недостаточны (< 44px)
- ❌ Меню не оптимизировано для одноручного использования

#### **CategoryGrid**:
- ✅ Адаптивная сетка 
- ❌ Карточки категорий слишком малы на мобильных
- ❌ Hover эффекты не работают на touch-устройствах

#### **ServiceCard**:
- ❌ Минимальная высота недостаточна
- ❌ Текст может быть нечитаемым
- ❌ Кнопки действий слишком малы

## 🚀 ДЕТАЛЬНЫЙ ПЛАН МОБИЛЬНОЙ ОПТИМИЗАЦИИ

### **ЭТАП 1: Навигация и хедер (2-3 часа)**

#### 1.1 Улучшение мобильного меню
```jsx
// app/components/Header.tsx - обновления
const [isMenuOpen, setIsMenuOpen] = useState(false)

// Увеличить touch targets до 44px минимум
<motion.button
  className="md:hidden p-3 rounded-xl text-text-secondary hover:text-accent-primary min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors touch-manipulation"
  onClick={() => setIsMenuOpen(!isMenuOpen)}
>
  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
</motion.button>

// Полноэкранное мобильное меню
{isMenuOpen && (
  <motion.div
    className="fixed inset-0 z-50 bg-white md:hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="p-6 pt-20">
      <nav className="space-y-6">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-4 py-4 text-xl font-medium min-h-[60px] rounded-xl px-4 hover:bg-accent-primary/10 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <Icon className="w-6 h-6" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  </motion.div>
)}
```

#### 1.2 Sticky навигация с safe areas
```css
/* app/globals.css */
@layer utilities {
  .safe-area-inset {
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  }
}
```

### **ЭТАП 2: Hero секция (2-3 часа)**

#### 2.1 Оптимизация для мобильных экранов
```jsx
// app/components/HeroSection.tsx - улучшения
<section className="relative min-h-[100svh] lg:min-h-screen flex items-center justify-center overflow-hidden safe-area-inset">
  {/* Адаптивные отступы */}
  <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div className="space-y-6 sm:space-y-8 py-12 sm:py-20">
      
      {/* Улучшенная типографика */}
      <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
        <span className="text-text-primary">Каталог лучших</span>
        <br />
        <span className="text-gradient">ИИ-инструментов</span>
        <br />
        <span className="text-text-primary">и нейросетей 2025</span>
      </motion.h1>

      {/* Улучшенный subtitle */}
      <motion.p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed px-4">
        Откройте для себя 2000+ проверенных нейросетей и AI-сервисов
      </motion.p>

      {/* Мобильно-оптимизированные CTA */}
      <motion.div className="flex flex-col gap-4 justify-center pt-6 px-4">
        <Link href="/ai-services">
          <motion.button 
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-8 py-4 min-h-[56px] bg-accent-primary text-white rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 touch-manipulation"
          >
            <span className="flex items-center justify-center gap-2">
              Начать исследование
              <ArrowRight className="w-5 h-5" />
            </span>
          </motion.button>
        </Link>
        
        <Link href="/ai-services">
          <motion.button 
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-8 py-4 min-h-[56px] bg-white/90 backdrop-blur-sm text-text-primary rounded-xl font-medium text-lg border border-gray-200/60 transition-all duration-300 touch-manipulation"
          >
            Посмотреть каталог
          </motion.button>
        </Link>
      </motion.div>
    </div>
  </div>
</section>
```

### **ЭТАП 3: Форма фильтров (3-4 часа)**

#### 3.1 Мобильная компоновка фильтров
```jsx
// app/ai-services/page.tsx - обновления
<div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-4 sm:p-6 mb-8">
  <div className="space-y-4">
    {/* Поиск на всю ширину */}
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Поиск по названию или описанию..."
        className="w-full pl-12 pr-4 py-4 min-h-[56px] text-base bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-accent-primary outline-none transition-all touch-manipulation"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>

    {/* Фильтры в две колонки на мобильном */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Категория */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Категория</label>
        <select 
          className="w-full py-4 px-4 min-h-[56px] text-base bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-accent-primary outline-none transition-all touch-manipulation"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">Все категории</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug || category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Сортировка */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Сортировка</label>
        <select 
          className="w-full py-4 px-4 min-h-[56px] text-base bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-accent-primary outline-none transition-all touch-manipulation"
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="bookmarks_count">По популярности</option>
          <option value="created_at">По дате добавления</option>
          <option value="title">По названию</option>
        </select>
      </div>
    </div>
  </div>
</div>
```

### **ЭТАП 4: Карточки сервисов (3-4 часа)**

#### 4.1 Мобильная оптимизация ServiceCard
```jsx
// app/components/ServiceCard.tsx - обновления
<motion.div
  whileHover={{ y: -4, scale: 1.01 }} // Уменьшаем hover эффект на мобильных
  whileTap={{ scale: 0.98 }} // Добавляем tap feedback
  className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-accent-primary/30 cursor-pointer min-h-[320px] sm:min-h-[350px] flex flex-col h-full touch-manipulation"
>
  <Link href={serviceLink} className="block flex-1 flex flex-col h-full" onClick={handleCardClick}>
    
    {/* Улучшенная обложка */}
    {normalizedCoverUrl && (
      <div className="aspect-[4/3] sm:aspect-video rounded-t-3xl overflow-hidden">
        <Image
          src={normalizedCoverUrl}
          alt={`Скриншот интерфейса ${title}`}
          width={400}
          height={300}
          className="w-full h-full object-cover"
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
    )}

    {/* Улучшенный контент */}
    <div className="p-4 sm:p-6 flex-1 flex flex-col">
      {/* Header с увеличенным логотипом */}
      <div className="flex items-start gap-3 mb-4">
        {normalizedLogoUrl && normalizedCoverUrl && (
          <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 shadow-sm">
            <Image
              src={normalizedLogoUrl}
              alt={`Логотип ${title}`}
              width={64}
              height={64}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        )}
        
        {/* Заголовок с улучшенной типографикой */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-2 line-clamp-2 leading-tight">
            {title}
          </h3>
          {price && (
            <div className="text-accent-primary font-medium text-sm sm:text-base">
              {price}
            </div>
          )}
        </div>
      </div>

      {/* Описание с улучшенной читаемостью */}
      {short_description_ru && (
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed line-clamp-3 mb-4 flex-1">
          {short_description_ru}
        </p>
      )}

      {/* Footer с улучшенными touch targets */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
        {bookmarks_count !== null && bookmarks_count !== undefined && (
          <div className="flex items-center gap-2 text-text-secondary">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">{bookmarks_count}</span>
          </div>
        )}
        
        <div className="w-10 h-10 rounded-full bg-accent-primary/10 flex items-center justify-center group-hover:bg-accent-primary transition-all duration-300">
          <ExternalLink className="w-4 h-4 text-accent-primary group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  </Link>
</motion.div>
```

### **ЭТАП 5: Категории и сетки (2-3 часа)**

#### 5.1 Улучшение CategoryGrid
```jsx
// app/components/CategoryGrid.tsx - обновления  
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
  {categories.map((category, index) => (
    <motion.div
      key={category.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="group relative"
    >
      <Link href={`/ai-services?category=${category.slug}`}>
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-gray-200 hover:border-accent-primary/30 shadow-lg hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 h-full cursor-pointer min-h-[160px] sm:min-h-[180px] touch-manipulation">
          
          {/* Иконка с адаптивным размером */}
          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${category.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-full h-full text-white" />
          </div>

          {/* Контент */}
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors line-clamp-2">
              {category.name}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-3 line-clamp-2">
              {category.description}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto">
            <span className="text-accent-primary font-semibold text-sm">
              {category.count} сервисов
            </span>
            <div className="w-8 h-8 rounded-full bg-accent-primary/10 flex items-center justify-center group-hover:bg-accent-primary transition-all duration-300">
              <span className="text-accent-primary group-hover:text-white text-sm">→</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  ))}
</div>
```

### **ЭТАП 6: Пагинация и навигация (1-2 часа)**

#### 6.1 Мобильная пагинация
```jsx
// Компонент пагинации с улучшенными touch targets
<div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
  <div className="flex items-center gap-2">
    <button 
      className="px-4 py-3 sm:px-6 sm:py-3 min-w-[48px] min-h-[48px] rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors touch-manipulation"
      onClick={() => handlePageChange(pagination.page - 1)}
      disabled={!pagination.hasPreviousPage}
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
    
    {/* Номера страниц только на больших экранах */}
    <div className="hidden sm:flex items-center gap-2">
      {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => (
        <button
          key={i + 1}
          className={`px-4 py-3 min-w-[48px] min-h-[48px] rounded-xl font-medium transition-colors touch-manipulation ${
            pagination.page === i + 1
              ? 'bg-accent-primary text-white'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => handlePageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
    
    {/* Мобильный индикатор страниц */}
    <div className="sm:hidden px-4 py-3 text-sm text-gray-700 font-medium">
      {pagination.page} из {pagination.totalPages}
    </div>
    
    <button 
      className="px-4 py-3 sm:px-6 sm:py-3 min-w-[48px] min-h-[48px] rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors touch-manipulation"
      onClick={() => handlePageChange(pagination.page + 1)}
      disabled={!pagination.hasNextPage}
    >
      <ChevronRight className="w-5 h-5" />
    </button>
  </div>
</div>
```

### **ЭТАП 7: Анимации и производительность (2-3 часа)**

#### 7.1 Отзывчивые анимации по лучшим практикам
```jsx
// Использование motion-safe для пользователей с предпочтением уменьшенной анимации
<motion.div
  className="motion-safe:animate-bounce"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ 
    duration: window.innerWidth < 768 ? 0.3 : 0.6, // Быстрее на мобильных
    ease: "easeOut" 
  }}
>
```

#### 7.2 Улучшение Tailwind config для мобильных
```js
// tailwind.config.js - обновления
module.exports = {
  theme: {
    extend: {
      spacing: {
        'safe': 'env(safe-area-inset-bottom)',
        '18': '4.5rem',
        '88': '22rem',
      },
      minHeight: {
        'touch': '44px',
        'input': '56px',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.6' }],
        'base': ['1rem', { lineHeight: '1.6' }],
        'lg': ['1.125rem', { lineHeight: '1.6' }],
      },
      animation: {
        'fade-in-mobile': 'fadeIn 0.3s ease-in-out',
        'slide-up-mobile': 'slideUp 0.4s ease-out',
        'scale-in-mobile': 'scaleIn 0.2s ease-out',
      },
    },
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
}
```

### **ЭТАП 8: Глобальные мобильные улучшения (2-3 часа)**

#### 8.1 Обновление глобальных стилей
```css
/* app/globals.css - дополнения */
@layer base {
  html {
    font-family: 'Inter', sans-serif;
    /* Предотвращение 300ms задержки на мобильных */
    touch-action: manipulation;
    /* Улучшение рендеринга шрифтов */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  body {
    background-color: #F9FAFB;
    color: #111827;
    /* Предотвращение горизонтального скролла */
    overflow-x: hidden;
  }
  
  /* Улучшение фокуса для accessibility */
  *:focus-visible {
    outline: 2px solid #6366F1;
    outline-offset: 2px;
  }
}

@layer utilities {
  /* Touch-friendly утилиты */
  .touch-manipulation {
    touch-action: manipulation;
  }
  
  .tap-highlight-none {
    -webkit-tap-highlight-color: transparent;
  }
  
  /* Безопасные зоны для современных устройств */
  .safe-top {
    padding-top: env(safe-area-inset-top);
  }
  
  .safe-bottom {
    padding-bottom: env(safe-area-inset-bottom);
  }
  
  .safe-left {
    padding-left: env(safe-area-inset-left);
  }
  
  .safe-right {
    padding-right: env(safe-area-inset-right);
  }
  
  /* Viewport units для мобильных */
  .min-h-screen-mobile {
    min-height: 100vh;
    min-height: 100svh; /* Поддержка новых viewport units */
  }
  
  /* Responsive text размеры */
  .text-responsive-xs { font-size: clamp(0.75rem, 2vw, 0.875rem); }
  .text-responsive-sm { font-size: clamp(0.875rem, 2.5vw, 1rem); }
  .text-responsive-base { font-size: clamp(1rem, 3vw, 1.125rem); }
  .text-responsive-lg { font-size: clamp(1.125rem, 3.5vw, 1.25rem); }
  .text-responsive-xl { font-size: clamp(1.25rem, 4vw, 1.5rem); }
}
```

## 🎨 **ДОПОЛНИТЕЛЬНЫЕ РЕКОМЕНДАЦИИ**

### **Accessibility & UX**

#### Минимальные размеры touch targets:
- **Кнопки**: `min-w-[44px] min-h-[44px]` (согласно iOS HIG)
- **Ссылки**: `py-3 px-4` минимум
- **Поля ввода**: `min-h-[56px]` для комфорта

#### Улучшения типографики:
```jsx
// Адаптивные размеры текста
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
<p className="text-sm sm:text-base lg:text-lg">
<span className="text-xs sm:text-sm lg:text-base">
```

#### Spacing система:
```jsx
// Адаптивные отступы
<div className="px-4 sm:px-6 lg:px-8">
<div className="py-6 sm:py-8 lg:py-12">
<div className="space-y-4 sm:space-y-6 lg:space-y-8">
```

### **Performance оптимизации**

#### Lazy loading и Image оптимизация:
```jsx
<Image
  src={imageUrl}
  alt="Description"
  width={400}
  height={300}
  loading="lazy"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

#### Уменьшение bundle size:
- Использование dynamic imports для тяжелых компонентов
- Tree shaking неиспользуемых Framer Motion компонентов
- Оптимизация Tailwind CSS (purging неиспользуемых классов)

### **Современные Web API**

#### Viewport Meta Tag оптимизация:
```html
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover">
```

#### PWA поддержка:
```html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="theme-color" content="#6366F1">
```

## 🧪 **ТЕСТИРОВАНИЕ**

### **Устройства для тестирования:**
- **iPhone SE** (375×667) - минимальный размер
- **iPhone 12/13/14** (390×844) - стандарт
- **iPhone 14 Plus** (428×926) - большой iPhone
- **Samsung Galaxy S21** (360×800) - Android стандарт
- **iPad Mini** (744×1133) - планшеты

### **Браузеры:**
- Safari Mobile (iOS)
- Chrome Mobile (Android)
- Samsung Internet
- Firefox Mobile

### **Инструменты:**
- Chrome DevTools Device Emulation
- Firefox Responsive Design Mode
- Real Device Testing
- BrowserStack/Sauce Labs

## ✅ **КРИТЕРИИ УСПЕХА**

### **Core Web Vitals:**
- [ ] **LCP** < 2.5s на мобильных
- [ ] **FID** < 100ms  
- [ ] **CLS** < 0.1

### **Accessibility:**
- [ ] Все touch targets ≥ 44px
- [ ] Контрастность ≥ 4.5:1
- [ ] Keyboard navigation поддержка
- [ ] Screen reader compatibility

### **UX Метрики:**
- [ ] Навигация одной рукой удобна
- [ ] Контент читается без зума
- [ ] Формы легко заполняются
- [ ] Анимации не вызывают motion sickness

### **Performance:**
- [ ] Mobile PageSpeed Score > 90
- [ ] Time to Interactive < 3s
- [ ] Bundle size оптимизирован

## 📋 **TIMELINE И ПРИОРИТЕТЫ**

### **🔥 Критический приоритет (Неделя 1):**
1. Исправление touch targets (Header, кнопки)
2. Мобильная навигация
3. Форма фильтров адаптация
4. ServiceCard оптимизация

### **⚡ Высокий приоритет (Неделя 2):**
1. HeroSection мобильная версия
2. CategoryGrid улучшения  
3. Типографика и spacing
4. Пагинация

### **📈 Средний приоритет (Неделя 3):**
1. Анимации оптимизация
2. Performance улучшения
3. Accessibility аудит
4. Cross-browser тестирование

### **🎨 Низкий приоритет (Неделя 4):**
1. PWA функции
2. Advanced interactions
3. Micro-animations
4. Polish и детали

---

**Общая оценка времени**: 25-35 часов разработки  
**Команда**: 1-2 Frontend разработчика + UX консультант  
**Инструменты**: VS Code, Chrome DevTools, Figma для mockups  

**📱 Результат**: Современный, отзывчивый и удобный мобильный интерфейс, соответствующий лучшим практикам индустрии и обеспечивающий отличный пользовательский опыт на всех устройствах. 