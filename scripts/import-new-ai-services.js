const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Настройка Supabase клиента
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Переменные окружения NEXT_PUBLIC_SUPABASE_URL и NEXT_PUBLIC_SUPABASE_ANON_KEY должны быть установлены');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Путь к новому CSV файлу
const csvFilePath = '/Users/cursor/Desktop/GigHub/База ИИ-сервис.csv';

// Маппинг ИИ-категорий к нашим категориям
const categoryMapping = {
  'Генерация изображений': 'Генерация изображений',
  'Чат-боты': 'Большие языковые модели',
  'Развлечения и lifestyle': 'Развлечения',
  'Email': 'Email',
  'E-commerce': 'E-commerce',
  'Аналитика данных': 'Аналитика данных',
  'Архитектура и дизайн интерьера': 'Архитектура и дизайн интерьера',
  'Аудио': 'Аудио',
  'Безопасность': 'Безопасность',
  'Бизнес и стартапы': 'Бизнес и стартапы',
  'Большие языковые модели': 'Большие языковые модели',
  'Видео': 'Видео',
  'Виртуальные аватары': 'Виртуальные аватары',
  'Здоровье и фитнес': 'Здоровье и фитнес',
  'Изображения': 'Изображения',
  'Маркетинг и продажи': 'Маркетинг и продажи',
  'Образ жизни': 'Образ жизни',
  'Обслуживание и поддержка клиентов': 'Обслуживание и поддержка клиентов',
  'Обучение, гайды и коучинг': 'Обучение, гайды и коучинг',
  'Продуктивность': 'Продуктивность',
  'Текст': 'Текст',
  'Развлечения': 'Развлечения',
  'Создание презентаций': 'Создание презентаций',
  'Разработка и IT': 'Разработка и IT',
  'Другое': 'Другое',
  'Инвестиции и финансы': 'Инвестиции и финансы',
  'Создание контента': 'Создание контента',
  'Социальные сети': 'Социальные сети'
};

// Функция для получения ID категории
async function getCategoryId(categoryName) {
  if (!categoryName) return null;
  
  const mappedCategory = categoryMapping[categoryName] || categoryName;
  
  const { data, error } = await supabase
    .from('categories')
    .select('id')
    .eq('name', mappedCategory)
    .single();
    
  if (error) {
    console.log(`Категория не найдена: ${mappedCategory}`);
    return null;
  }
  
  return data.id;
}

// Функция для парсинга CSV строки с учетом кавычек
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ';' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  // Добавляем последнее поле
  result.push(current.trim());
  
  return result;
}

// Функция для очистки и валидации данных
function cleanData(fields) {
  // Проверяем, что у нас достаточно полей
  if (fields.length < 18) {
    return null;
  }

  const [
    id,
    sortOrder,
    faq,
    faqRu,
    dateAdded,
    title,
    aiCategory,
    bookmarksCount,
    shortDescriptionRu,
    logoUrl,
    disadvantagesRu,
    coverUrl,
    advantagesRu,
    fullDescriptionRu,
    rating,
    serviceUrl,
    price,
    slug
  ] = fields;

  // Проверяем название
  if (!title || title.length < 2) {
    return null;
  }

  // Парсим ID
  let numericId = null;
  if (id) {
    const idMatch = id.match(/^(\d+)/);
    if (idMatch) {
      numericId = parseInt(idMatch[1]);
    }
  }
  
  if (!numericId) {
    numericId = Date.now() + Math.random() * 1000;
  }

  // Парсим рейтинг
  let numericRating = null;
  if (rating && !isNaN(parseFloat(rating))) {
    numericRating = Math.max(0, Math.min(5, parseFloat(rating)));
  }

  // Парсим количество закладок
  let numericBookmarks = 0;
  if (bookmarksCount && !isNaN(parseInt(bookmarksCount))) {
    numericBookmarks = Math.max(0, parseInt(bookmarksCount));
  }

  // Парсим дату
  let parsedDate = null;
  if (dateAdded) {
    try {
      parsedDate = new Date(dateAdded).toISOString().split('T')[0];
    } catch (e) {
      parsedDate = new Date().toISOString().split('T')[0];
    }
  } else {
    parsedDate = new Date().toISOString().split('T')[0];
  }

  // Генерируем slug если его нет
  let finalSlug = slug?.trim();
  if (!finalSlug) {
    finalSlug = title
      .toLowerCase()
      .replace(/[^a-zа-я0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }

  return {
    id: numericId,
    sort_order: sortOrder ? parseInt(sortOrder) : null,
    faq: faq?.trim() || null,
    faq_ru: faqRu?.trim() || null,
    date_added: parsedDate,
    title: title.trim(),
    ai_category: aiCategory?.trim() || null,
    bookmarks_count: numericBookmarks,
    short_description_ru: shortDescriptionRu?.trim() || null,
    logo_url: logoUrl?.trim() || null,
    disadvantages_ru: disadvantagesRu?.trim() || null,
    cover_url: coverUrl?.trim() || null,
    advantages_ru: advantagesRu?.trim() || null,
    full_description_ru: fullDescriptionRu?.trim() || null,
    rating: numericRating,
    service_url: serviceUrl?.trim() || null,
    price: price?.trim() || null,
    slug: finalSlug,
    status: 'active'
  };
}

async function importData() {
  console.log('Начинаем импорт данных из CSV файла...');
  
  // Читаем весь файл
  const fileContent = fs.readFileSync(csvFilePath, 'utf-8');
  const lines = fileContent.split('\n');
  
  console.log(`Всего строк в файле: ${lines.length}`);
  
  // Пропускаем первые 2 строки (мета-информация и заголовки)
  const dataLines = lines.slice(2).filter(line => line.trim());
  
  console.log(`Строк данных для обработки: ${dataLines.length}`);
  
  const services = [];
  let processedCount = 0;
  let skippedCount = 0;

  for (const line of dataLines) {
    processedCount++;
    
    try {
      const fields = parseCSVLine(line);
      const cleanedData = cleanData(fields);
      
      if (cleanedData) {
        services.push(cleanedData);
      } else {
        skippedCount++;
      }
    } catch (error) {
      console.error(`Ошибка обработки строки ${processedCount}:`, error.message);
      skippedCount++;
    }

    // Логируем прогресс каждые 1000 записей
    if (processedCount % 1000 === 0) {
      console.log(`Обработано ${processedCount} записей, валидных: ${services.length}, пропущено: ${skippedCount}`);
    }
  }

  console.log(`Завершена обработка CSV. Всего записей: ${processedCount}, валидных: ${services.length}, пропущено: ${skippedCount}`);
  
  if (services.length === 0) {
    console.log('Нет валидных данных для импорта');
    return;
  }

  console.log('Начинаем загрузку в базу данных...');
  
  // Сначала очищаем старые данные
  console.log('Очищаем старые данные...');
  const { error: deleteError } = await supabase
    .from('ai_services')
    .delete()
    .neq('id', 0); // Удаляем все записи
    
  if (deleteError) {
    console.error('Ошибка при очистке старых данных:', deleteError);
  } else {
    console.log('Старые данные очищены');
  }
  
  // Загружаем данные батчами по 100 записей
  const batchSize = 100;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < services.length; i += batchSize) {
    const batch = services.slice(i, i + batchSize);
    
    // Получаем category_id для каждого сервиса в батче
    for (const service of batch) {
      if (service.ai_category) {
        service.category_id = await getCategoryId(service.ai_category);
      }
    }

    try {
      const { data, error } = await supabase
        .from('ai_services')
        .insert(batch);

      if (error) {
        console.error(`Ошибка при загрузке батча ${Math.floor(i/batchSize) + 1}:`, error);
        errorCount += batch.length;
      } else {
        successCount += batch.length;
        console.log(`Загружен батч ${Math.floor(i/batchSize) + 1}/${Math.ceil(services.length/batchSize)}: ${batch.length} записей`);
      }
    } catch (err) {
      console.error(`Критическая ошибка при загрузке батча ${Math.floor(i/batchSize) + 1}:`, err);
      errorCount += batch.length;
    }
  }

  console.log(`\nИмпорт завершен!`);
  console.log(`Успешно загружено: ${successCount} записей`);
  console.log(`Ошибок: ${errorCount} записей`);
  console.log(`Всего обработано: ${processedCount} записей из CSV`);
}

// Запускаем импорт
importData()
  .then(() => {
    console.log('Импорт данных завершен успешно!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Ошибка при импорте данных:', error);
    process.exit(1);
  }); 