// Загружаем переменные окружения
require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const csv = require('csv-parser');
const { createClient } = require('@supabase/supabase-js');

// Конфигурация Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Используем anon key если service key недоступен
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Маппинг колонок CSV к полям базы данных
const columnMapping = {
  'id': 'id',
  'sort (просмотр)': 'sort_order',
  'Вопросы и ответы': 'faq',
  'Вопросыиответы (рус)': 'faq_ru',
  'Датадобавления': 'date_added',
  'Заголовок': 'title',
  'ИИ-категория': 'ai_category',
  'Кол-возакладок': 'bookmarks_count',
  'Краткоеописание (рус)': 'short_description_ru',
  'Логотип': 'logo_url',
  'Минусы сервиса (рус)': 'disadvantages_ru',
  'Обложка': 'cover_url',
  'Плюсысервиса (рус)': 'advantages_ru',
  'Полное описание (рус)': 'full_description_ru',
  'рейтинг': 'rating',
  'Рейтинг': 'rating',
  'Ссылканасервис': 'service_url',
  'Цена': 'price',
  'Slug': 'slug'
};

// Функция для очистки и преобразования данных
function cleanAndTransformData(row) {
  const cleaned = {};
  
  for (const [csvCol, dbCol] of Object.entries(columnMapping)) {
    let value = row[csvCol];
    
    if (value === undefined || value === null || value === '') {
      value = null;
    } else if (typeof value === 'string') {
      value = value.trim();
      if (value === '') value = null;
    }
    
    // Специальная обработка для определенных полей
    switch (dbCol) {
      case 'id':
        // Извлекаем числовую часть из ID, если он в формате timestamp
        if (typeof value === 'string' && value.includes('x')) {
          // Генерируем новый ID на основе хэша исходного ID
          cleaned[dbCol] = Math.abs(hashCode(value));
        } else {
          cleaned[dbCol] = parseInt(value) || Math.floor(Math.random() * 1000000);
        }
        break;
      case 'sort_order':
      case 'bookmarks_count':
        cleaned[dbCol] = parseInt(value) || 0;
        break;
      case 'rating':
        cleaned[dbCol] = parseFloat(value) || 0;
        break;
      case 'date_added':
        // Преобразуем дату в формат ISO
        if (value) {
          try {
            const date = new Date(value);
            cleaned[dbCol] = date.toISOString();
          } catch (e) {
            cleaned[dbCol] = new Date().toISOString();
          }
        }
        break;
      default:
        cleaned[dbCol] = value;
    }
  }
  
  // Добавляем обязательные поля
  cleaned.status = 'active';
  cleaned.created_at = new Date().toISOString();
  cleaned.updated_at = new Date().toISOString();
  
  return cleaned;
}

// Функция для генерации хэша строки
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

// Основная функция импорта
async function importCSVData() {
  console.log('🚀 Начинаем импорт данных из CSV...');
  
  const records = [];
  const batchSize = 100; // Импортируем по 100 записей за раз
  let totalProcessed = 0;
  let totalErrors = 0;
  
  return new Promise((resolve, reject) => {
    fs.createReadStream('ИИ-сервисы база.csv')
      .pipe(csv({ separator: ';' })) // CSV использует ; как разделитель
      .on('data', (row) => {
        try {
          const cleanedData = cleanAndTransformData(row);
          records.push(cleanedData);
          
          // Обрабатываем пакет когда достигаем размера
          if (records.length >= batchSize) {
            processBatch([...records]);
            records.length = 0; // Очищаем массив
          }
        } catch (error) {
          console.error('❌ Ошибка обработки строки:', error);
          totalErrors++;
        }
      })
      .on('end', async () => {
        // Обрабатываем оставшиеся записи
        if (records.length > 0) {
          await processBatch(records);
        }
        
        console.log(`✅ Импорт завершен! Обработано: ${totalProcessed}, Ошибок: ${totalErrors}`);
        resolve();
      })
      .on('error', (error) => {
        console.error('❌ Ошибка чтения файла:', error);
        reject(error);
      });
  });
  
  async function processBatch(batch) {
    try {
      console.log(`📦 Обрабатываем пакет из ${batch.length} записей...`);
      
      const { data, error } = await supabase
        .from('ai_services')
        .upsert(batch, {
          onConflict: 'id',
          ignoreDuplicates: false
        });
      
      if (error) {
        console.error('❌ Ошибка вставки пакета:', error);
        totalErrors += batch.length;
      } else {
        totalProcessed += batch.length;
        console.log(`✅ Успешно обработано ${batch.length} записей. Всего: ${totalProcessed}`);
      }
    } catch (error) {
      console.error('❌ Ошибка обработки пакета:', error);
      totalErrors += batch.length;
    }
  }
}

// Функция для создания недостающих категорий
async function createMissingCategories() {
  console.log('📂 Создаем недостающие категории...');
  
  // Получаем уникальные категории из CSV
  const categories = new Set();
  
  return new Promise((resolve, reject) => {
    fs.createReadStream('ИИ-сервисы база.csv')
      .pipe(csv({ separator: ';' }))
      .on('data', (row) => {
        const category = row['ИИ-категория'];
        if (category && category.trim()) {
          categories.add(category.trim());
        }
      })
      .on('end', async () => {
        console.log(`🔍 Найдено ${categories.size} уникальных категорий`);
        
        for (const categoryName of categories) {
          try {
            const slug = categoryName.toLowerCase()
              .replace(/[^a-zA-Zа-яё0-9]/g, '-')
              .replace(/-+/g, '-')
              .replace(/^-|-$/g, '');
            
            const { error } = await supabase
              .from('categories')
              .upsert({
                name: categoryName,
                slug: slug,
                description: `Категория: ${categoryName}`,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              }, {
                onConflict: 'slug',
                ignoreDuplicates: true
              });
            
            if (error && !error.message.includes('duplicate')) {
              console.error(`❌ Ошибка создания категории ${categoryName}:`, error);
            } else {
              console.log(`✅ Категория "${categoryName}" создана/обновлена`);
            }
          } catch (error) {
            console.error(`❌ Ошибка обработки категории ${categoryName}:`, error);
          }
        }
        
        resolve();
      })
      .on('error', reject);
  });
}

// Запуск импорта
async function main() {
  try {
    console.log('🎯 Проверяем подключение к Supabase...');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('❌ Отсутствуют переменные окружения SUPABASE');
    }
    
    // Сначала создаем категории
    await createMissingCategories();
    
    // Затем импортируем сервисы
    await importCSVData();
    
    console.log('🎉 Все данные успешно импортированы!');
  } catch (error) {
    console.error('💥 Фатальная ошибка:', error);
    process.exit(1);
  }
}

// Запускаем если скрипт вызван напрямую
if (require.main === module) {
  main();
}

module.exports = { importCSVData, createMissingCategories }; 