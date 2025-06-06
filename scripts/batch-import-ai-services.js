const fs = require('fs');
const csv = require('csv-parser');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

// Конфигурация Supabase
const supabaseUrl = 'https://mjfkgzxcnoukmnyemyil.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZmtnenhjbm91a21ueWVteWlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMjA2ODUsImV4cCI6MjA2NDU5NjY4NX0.jlBo0GnE2hUZvL7Npnf4fHN7yjtEUjMbD5emuOhZyL4';

const supabase = createClient(supabaseUrl, supabaseKey);

// Путь к CSV файлу
const csvFilePath = path.join(__dirname, '../Data Base/ИИ-сервис.csv');

// Размер пакета для импорта (уменьшен для стабильности)
const BATCH_SIZE = 50;
const DELAY_BETWEEN_BATCHES = 200; // мс

// Маппинг категорий
const categoryMapping = {
  'E-commerce': 1,
  'Email': 2,
  'Аналитика данных': 3,
  'Архитектура и дизайн интерьера': 4,
  'Безопасность': 5,
  'Бизнес и стартапы': 6,
  'Большие языковые модели': 7,
  'Виртуальные аватары': 8,
  'Видео': 9,
  'Изображения': 10,
  'Текст': 11,
  'Аудио': 12,
  'Здоровье и фитнес': 13,
  'Маркетинг и продажи': 14,
  'Обслуживание и поддержка клиентов': 15,
  'Обучение, гайды и коучинг': 16,
  'Продуктивность': 17,
  'Образ жизни': 18
};

// Функция для очистки строк от проблемных символов
function cleanString(str) {
  if (!str || typeof str !== 'string') return null;
  
  return str
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Удаляем контрольные символы
    .replace(/\r\n/g, '\n') // Нормализуем переносы строк
    .replace(/\r/g, '\n')
    .trim();
}

// Функция для очистки и валидации данных
function cleanData(row) {
  const name = cleanString(row['Название']) || cleanString(row['ИИ-сервисы']) || 'Неизвестный сервис';
  
  return {
    name: name.substring(0, 255), // Ограничиваем длину
    price: cleanString(row['Цена'])?.substring(0, 100),
    service_url: cleanString(row['Ссылканасервис'])?.substring(0, 500),
    disadvantages: cleanString(row['Минусысервиса (рус)']),
    short_description: cleanString(row['Краткоеописание (рус)']),
    full_description: cleanString(row['Полное описание (рус)']),
    faq: cleanString(row['Вопросыиответы']),
    faq_ru: cleanString(row['Вопросыиответы (рус)']),
    category_id: null,
    status: 'active'
  };
}

// Улучшенная функция для определения категории
function determineCategoryId(serviceName, description) {
  const text = (serviceName + ' ' + (description || '')).toLowerCase();
  
  // Более детальная логика определения категории
  const patterns = {
    'Email': ['email', 'mail', 'почт', 'письм', 'рассылк'],
    'Видео': ['video', 'видео', 'фильм', 'movie', 'cinema', 'youtube', 'streaming'],
    'Изображения': ['image', 'photo', 'изображ', 'картинк', 'фото', 'picture', 'graphic', 'visual'],
    'Текст': ['text', 'текст', 'writing', 'писать', 'редактор', 'editor', 'content', 'контент'],
    'Аудио': ['audio', 'music', 'аудио', 'музык', 'звук', 'sound', 'voice', 'голос'],
    'Аналитика данных': ['analytics', 'data', 'аналитик', 'данн', 'статистик', 'metric', 'dashboard'],
    'Архитектура и дизайн интерьера': ['design', 'дизайн', 'interior', 'интерьер', 'архитектур', 'architecture'],
    'Безопасность': ['security', 'безопасн', 'защит', 'protect', 'cyber', 'киберб'],
    'Бизнес и стартапы': ['business', 'бизнес', 'startup', 'стартап', 'предпринимат', 'entrepreneur'],
    'Здоровье и фитнес': ['health', 'fitness', 'здоров', 'фитнес', 'медицин', 'medical'],
    'Маркетинг и продажи': ['marketing', 'sales', 'маркетинг', 'продаж', 'реклам', 'advertising'],
    'Обслуживание и поддержка клиентов': ['support', 'customer', 'поддержк', 'клиент', 'service', 'help'],
    'Обучение, гайды и коучинг': ['education', 'learning', 'обучен', 'учеб', 'course', 'tutorial', 'coaching'],
    'Продуктивность': ['productivity', 'продуктивн', 'эффективн', 'task', 'задач', 'планиров'],
    'Виртуальные аватары': ['avatar', 'аватар', 'virtual', 'виртуальн', 'character', 'персонаж'],
    'Большие языковые модели': ['gpt', 'llm', 'language model', 'языков', 'chatbot', 'чатбот', 'ai assistant'],
    'E-commerce': ['ecommerce', 'shop', 'store', 'магазин', 'торговл', 'продаж', 'commerce'],
    'Образ жизни': ['lifestyle', 'образ жизни', 'жизн', 'personal', 'персональн']
  };
  
  for (const [category, keywords] of Object.entries(patterns)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return categoryMapping[category];
    }
  }
  
  // По умолчанию - Продуктивность
  return categoryMapping['Продуктивность'];
}

// Функция для импорта пакета данных с повторными попытками
async function importBatch(batch, retryCount = 0) {
  const maxRetries = 3;
  
  try {
    const { data, error } = await supabase
      .from('ai_services')
      .insert(batch);
    
    if (error) {
      if (retryCount < maxRetries) {
        console.log(`Повторная попытка ${retryCount + 1}/${maxRetries} для пакета из ${batch.length} записей`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
        return await importBatch(batch, retryCount + 1);
      } else {
        console.error('Ошибка при импорте пакета после всех попыток:', error);
        return false;
      }
    }
    
    return true;
  } catch (error) {
    if (retryCount < maxRetries) {
      console.log(`Повторная попытка ${retryCount + 1}/${maxRetries} после ошибки:`, error.message);
      await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
      return await importBatch(batch, retryCount + 1);
    } else {
      console.error('Непредвиденная ошибка при импорте после всех попыток:', error);
      return false;
    }
  }
}

// Функция для проверки существующих записей
async function getExistingCount() {
  try {
    const { data, error } = await supabase
      .from('ai_services')
      .select('id', { count: 'exact', head: true });
    
    if (error) {
      console.error('Ошибка при получении количества записей:', error);
      return 0;
    }
    
    return data?.length || 0;
  } catch (error) {
    console.error('Ошибка при подключении к базе данных:', error);
    return 0;
  }
}

// Основная функция импорта
async function importAIServices() {
  console.log('🚀 Начинаем импорт ИИ-сервисов...');
  
  // Проверяем существование файла
  if (!fs.existsSync(csvFilePath)) {
    throw new Error(`CSV файл не найден: ${csvFilePath}`);
  }
  
  const existingCount = await getExistingCount();
  console.log(`📊 Текущее количество записей в БД: ${existingCount}`);
  
  let batch = [];
  let totalProcessed = 0;
  let totalImported = 0;
  let totalErrors = 0;
  let skippedRows = 0;
  
  const startTime = Date.now();
  
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(csvFilePath, { encoding: 'utf8' })
      .pipe(csv({
        skipEmptyLines: true,
        skipLinesWithError: true
      }));
    
    stream.on('data', async (row) => {
      try {
        // Пропускаем пустые или некорректные строки
        if (!row || Object.keys(row).length === 0) {
          skippedRows++;
          return;
        }
        
        const cleanedData = cleanData(row);
        
        // Проверяем обязательные поля
        if (!cleanedData.name || cleanedData.name === 'Неизвестный сервис') {
          skippedRows++;
          return;
        }
        
        cleanedData.category_id = determineCategoryId(cleanedData.name, cleanedData.short_description);
        
        batch.push(cleanedData);
        totalProcessed++;
        
        // Когда пакет заполнен, импортируем его
        if (batch.length >= BATCH_SIZE) {
          stream.pause(); // Приостанавливаем чтение
          
          const success = await importBatch(batch);
          if (success) {
            totalImported += batch.length;
            console.log(`✅ Импортировано ${batch.length} записей (всего: ${totalImported})`);
          } else {
            totalErrors += batch.length;
            console.log(`❌ Ошибка импорта ${batch.length} записей`);
          }
          
          batch = []; // Очищаем пакет
          
          // Пауза между пакетами
          await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES));
          
          stream.resume(); // Возобновляем чтение
        }
        
        // Логируем прогресс каждые 5000 записей
        if (totalProcessed % 5000 === 0) {
          const elapsed = (Date.now() - startTime) / 1000;
          const rate = totalProcessed / elapsed;
          console.log(`📈 Обработано: ${totalProcessed}, Импортировано: ${totalImported}, Ошибок: ${totalErrors}, Скорость: ${rate.toFixed(1)} записей/сек`);
        }
      } catch (error) {
        console.error('Ошибка при обработке строки:', error);
        totalErrors++;
      }
    });
    
    stream.on('end', async () => {
      // Импортируем оставшиеся записи
      if (batch.length > 0) {
        console.log(`📦 Импортируем последний пакет из ${batch.length} записей...`);
        const success = await importBatch(batch);
        if (success) {
          totalImported += batch.length;
        } else {
          totalErrors += batch.length;
        }
      }
      
      const elapsed = (Date.now() - startTime) / 1000;
      const finalCount = await getExistingCount();
      
      console.log('\n🎉 Импорт завершен!');
      console.log(`📊 Статистика:`);
      console.log(`   - Обработано строк: ${totalProcessed}`);
      console.log(`   - Пропущено строк: ${skippedRows}`);
      console.log(`   - Импортировано: ${totalImported}`);
      console.log(`   - Ошибок: ${totalErrors}`);
      console.log(`   - Время выполнения: ${elapsed.toFixed(1)} секунд`);
      console.log(`   - Итого записей в БД: ${finalCount}`);
      
      resolve({ 
        totalProcessed, 
        totalImported, 
        totalErrors, 
        skippedRows,
        finalCount,
        elapsed 
      });
    });
    
    stream.on('error', (error) => {
      console.error('❌ Ошибка при чтении CSV файла:', error);
      reject(error);
    });
  });
}

// Запуск импорта
if (require.main === module) {
  importAIServices()
    .then((result) => {
      console.log('✅ Импорт успешно завершен:', result);
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Ошибка импорта:', error);
      process.exit(1);
    });
}

module.exports = { importAIServices }; 