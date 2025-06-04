# Задачи по переносу базы данных ИИ-сервисов в Supabase через MCP

## Обзор проекта

У нас есть два связанных CSV файла:
- `/Users/cursor/Desktop/GigHub/Data Base/Категории ИИ-сервисов.csv` - категории ИИ-сервисов
- `/Users/cursor/Desktop/GigHub/Data Base/ИИ-сервис.csv` - ИИ-сервисы (большой файл >2MB)

**Цель:** Перенести эти данные в Supabase через MCP и интегрировать в наш Next.js проект для динамического отображения на русском языке.

## Технологический стек

### Основные технологии:
- **Supabase** - основная база данных PostgreSQL
- **Supabase MCP Server** - для управления через AI ассистентов
- **Next.js** - фронтенд-фреймворк
- **TypeScript** - типизация
- **TailwindCSS** - стилизация

### Рекомендуемые MCP серверы:
1. **alexander-zuev/supabase-mcp-server** - самый полнофункциональный (171 code snippets)
2. **supabase-community/supabase-mcp** - официальный комьюнити сервер

---

## ЗАДАЧА 1: Подготовка Supabase проекта
**Статус:** ❌ Не выполнено

### 1.1 Создание/настройка Supabase проекта
- [ ] Проверить существующий проект Supabase или создать новый
- [ ] Получить API ключи и connection string
- [ ] Настроить переменные окружения в `.env.local`:
  ```bash
  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
  SUPABASE_PROJECT_REF=your_project_ref
  SUPABASE_DB_PASSWORD=your_db_password
  ```

### 1.2 Анализ структуры CSV файлов
- [ ] Проанализировать структуру файла "Категории ИИ-сервисов.csv"
- [ ] Проанализировать структуру файла "ИИ-сервис.csv" (разбить на части если нужно)
- [ ] Определить связи между таблицами
- [ ] Создать диаграмму связей

---

## ЗАДАЧА 2: Проектирование схемы базы данных
**Статус:** ❌ Не выполнено

### 2.1 Создание схемы таблиц

#### Таблица категорий:
```sql
CREATE TABLE categories (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  parent_id BIGINT REFERENCES categories(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Таблица ИИ-сервисов:
```sql
CREATE TABLE ai_services (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  description TEXT,
  category_id BIGINT REFERENCES categories(id),
  url TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 2.2 Создание индексов и ограничений
- [ ] Создать индексы для поиска
- [ ] Добавить ограничения внешних ключей
- [ ] Настроить RLS (Row Level Security) если нужно

---

## ЗАДАЧА 3: Установка и настройка MCP сервера
**Статус:** ❌ Не выполнено

### 3.1 Установка Supabase MCP Server
```bash
# Вариант 1: через pipx (рекомендуется)
pipx install supabase-mcp-server

# Вариант 2: через uv
uv tool install supabase-mcp-server
```

### 3.2 Настройка MCP сервера
- [ ] Создать конфигурационный файл для MCP
- [ ] Настроить переменные окружения:
  ```bash
  QUERY_API_KEY=your-api-key
  SUPABASE_PROJECT_REF=your-project-ref
  SUPABASE_DB_PASSWORD=your-db-password
  SUPABASE_REGION=us-east-1
  ```

### 3.3 Интеграция с Cursor/Windsurf
- [ ] Добавить конфигурацию в настройки Cursor:
  ```json
  {
    "mcpServers": {
      "supabase": {
        "command": "/Users/username/.local/bin/supabase-mcp-server",
        "env": {
          "QUERY_API_KEY": "your-api-key",
          "SUPABASE_PROJECT_REF": "your-project-ref",
          "SUPABASE_DB_PASSWORD": "your-db-password"
        }
      }
    }
  }
  ```

---

## ЗАДАЧА 4: Создание миграций через MCP
**Статус:** ❌ Не выполнено

### 4.1 Создание файлов миграций
- [ ] Использовать MCP для создания миграции категорий:
  ```bash
  supabase migration new create_categories_table
  ```
- [ ] Использовать MCP для создания миграции ИИ-сервисов:
  ```bash
  supabase migration new create_ai_services_table
  ```

### 4.2 Применение миграций
- [ ] Применить миграции локально:
  ```bash
  supabase db reset
  ```
- [ ] Проверить создание таблиц
- [ ] Применить миграции на продакшн:
  ```bash
  supabase db push
  ```

---

## ЗАДАЧА 5: Импорт данных из CSV
**Статус:** ❌ Не выполнено

### 5.1 Подготовка CSV файлов
- [ ] Очистить и нормализовать данные в CSV
- [ ] Разбить большой файл на части если нужно
- [ ] Создать соответствие полей CSV с полями БД

### 5.2 Импорт через psql/MCP
- [ ] Импорт категорий:
  ```bash
  psql -h DATABASE_URL -p 5432 -d postgres -U postgres \
    -c "\COPY categories FROM './categories.csv' WITH DELIMITER ',' CSV HEADER"
  ```
- [ ] Импорт ИИ-сервисов:
  ```bash
  psql -h DATABASE_URL -p 5432 -d postgres -U postgres \
    -c "\COPY ai_services FROM './services.csv' WITH DELIMITER ',' CSV HEADER"
  ```

### 5.3 Создание индексов после импорта
- [ ] Создать индексы для ускорения поиска:
  ```sql
  CREATE INDEX idx_ai_services_category_id ON ai_services(category_id);
  CREATE INDEX idx_ai_services_name ON ai_services(name);
  CREATE INDEX idx_categories_slug ON categories(slug);
  ```

---

## ЗАДАЧА 6: Создание API слоя
**Статус:** ❌ Не выполнено

### 6.1 Установка Supabase клиента
```bash
npm install @supabase/supabase-js
```

### 6.2 Создание Supabase клиента
- [ ] Создать файл `lib/supabase.ts`:
  ```typescript
  import { createClient } from '@supabase/supabase-js'

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  export const supabase = createClient(supabaseUrl, supabaseKey)
  ```

### 6.3 Генерация TypeScript типов
- [ ] Сгенерировать типы из схемы БД:
  ```bash
  supabase gen types typescript --project-id your-project-ref > types/database.types.ts
  ```

---

## ЗАДАЧА 7: Создание API роутов
**Статус:** ❌ Не выполнено

### 7.1 API для категорий
- [ ] Создать `app/api/categories/route.ts`:
  ```typescript
  import { supabase } from '@/lib/supabase'
  import { NextResponse } from 'next/server'

  export async function GET() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  }
  ```

### 7.2 API для ИИ-сервисов
- [ ] Создать `app/api/ai-services/route.ts`
- [ ] Добавить фильтрацию по категориям
- [ ] Добавить поиск по названию
- [ ] Добавить пагинацию

### 7.3 API для связанных данных
- [ ] Создать `app/api/ai-services/[categoryId]/route.ts`
- [ ] Добавить поиск с JOIN между таблицами

---

## ЗАДАЧА 8: Создание компонентов для отображения данных
**Статус:** ❌ Не выполнено

### 8.1 Компонент списка категорий
- [ ] Создать `components/CategoryList.tsx`
- [ ] Добавить русскую локализацию
- [ ] Стилизовать с помощью TailwindCSS

### 8.2 Компонент списка ИИ-сервисов
- [ ] Создать `components/AIServicesList.tsx`
- [ ] Добавить карточки сервисов
- [ ] Добавить фильтрацию и поиск

### 8.3 Компонент поиска
- [ ] Создать `components/SearchBar.tsx`
- [ ] Реализовать живой поиск
- [ ] Добавить автодополнение

---

## ЗАДАЧА 9: Создание страниц приложения
**Статус:** ❌ Не выполнено

### 9.1 Главная страница со списком категорий
- [ ] Создать `app/page.tsx`
- [ ] Отображение категорий в виде сетки
- [ ] Добавить счетчики сервисов в каждой категории

### 9.2 Страница категории
- [ ] Создать `app/categories/[slug]/page.tsx`
- [ ] Отображение ИИ-сервисов в выбранной категории
- [ ] Добавить breadcrumbs

### 9.3 Страница поиска
- [ ] Создать `app/search/page.tsx`
- [ ] Глобальный поиск по всем сервисам
- [ ] Фильтры по категориям

---

## ЗАДАЧА 10: Оптимизация и тестирование
**Статус:** ❌ Не выполнено

### 10.1 Оптимизация производительности
- [ ] Добавить кэширование API запросов
- [ ] Оптимизировать SQL запросы
- [ ] Добавить lazy loading для больших списков

### 10.2 Добавление SEO
- [ ] Добавить метатеги
- [ ] Создать sitemap
- [ ] Оптимизировать для поисковых систем

### 10.3 Тестирование
- [ ] Протестировать все API endpoints
- [ ] Проверить корректность отображения данных
- [ ] Тестирование на мобильных устройствах

---

## ЗАДАЧА 11: Развертывание и мониторинг
**Статус:** ❌ Не выполнено

### 11.1 Подготовка к развертыванию
- [ ] Настроить переменные окружения для продакшн
- [ ] Проверить все миграции
- [ ] Создать backup стратегию

### 11.2 Мониторинг
- [ ] Настроить логирование ошибок
- [ ] Добавить мониторинг производительности БД
- [ ] Создать алерты для критических ошибок

---

## Примечания разработчика

### Технические требования:
- Все интерфейсы должны быть на русском языке
- Данные отображаются динамически из Supabase
- Используется MCP для управления базой данных
- Код должен быть типизирован с TypeScript
- Responsive дизайн обязателен

### Полезные команды:
```bash
# Проверка статуса MCP сервера
supabase status

# Применение миграций
supabase db push

# Генерация типов
supabase gen types typescript

# Локальный запуск Supabase
supabase start
```

### Структура проекта:
```
src/
├── app/
│   ├── api/
│   │   ├── categories/
│   │   └── ai-services/
│   ├── categories/
│   └── search/
├── components/
│   ├── CategoryList.tsx
│   ├── AIServicesList.tsx
│   └── SearchBar.tsx
├── lib/
│   └── supabase.ts
└── types/
    └── database.types.ts
```

### Checkpoint система:
После завершения каждой задачи, отметьте её как выполненную (✅) и переходите к следующей. Если возникают проблемы, создайте отдельную подзадачу для их решения. 