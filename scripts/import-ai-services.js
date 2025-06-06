const fs = require('fs');
const csv = require('csv-parser');
const { createClient } = require('@supabase/supabase-js');

// Конфигурация Supabase
const supabaseUrl = 'https://mjfkgzxcnoukmnyemyil.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZmtnenhjbm91a21ueWVteWlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMjA2ODUsImV4cCI6MjA2NDU5NjY4NX0.jlBo0GnE2hUZvL7Npnf4fHN7yjtEUjMbD5emuOhZyL4';

const supabase = createClient(supabaseUrl, supabaseKey);

// Путь к CSV файлу
const csvFilePath = '../Data Base/ИИ-сервис.csv';

// Размер пакета для импорта
const BATCH_SIZE = 100;

// Маппинг категорий (нужно будет заполнить на основе данных)
const categoryMapping = {
  'E-commerce': 1,
  'Email': 2,
  'Аналитика данных': 3,
  'Архитектура и дизайн интерьера': 4,
  'Аудио': 12,
  'Безопасность': 5,
  'Бизнес и стартапы': 6,
  'Большие языковые модели': 7,
  'Видео': 9,
  'Виртуальные аватары': 8,
  'Здоровье и фитнес': 13,
  'Изображения': 10,
  'Маркетинг и продажи': 14,
  'Образ жизни': 18,
  'Обслуживание и поддержка клиентов': 15,
  'Обучение, гайды и коучинг': 16,
  'Продуктивность': 17,
  'Текст': 11
};

// Функция для очистки и валидации данных
function cleanData(row) {
  return {
    name: row['Название'] || 'Неизвестный сервис',
    price: row['Цена'] || null,
    service_url: row['Ссылканасервис'] || null,
    disadvantages: row['Минусысервиса (рус)'] || null,
    short_description: row['Краткоеописание (рус)'] || null,
    full_description: row['Полное описание (рус)'] || null,
    faq: row['Вопросыиответы'] || null,
    faq_ru: row['Вопросыиответы (рус)'] || null,
    category_id: null, // Будет определяться по логике
    status: 'active'
  };
}

// Функция для определения категории по названию сервиса
function determineCategoryId(serviceName, description) {
  const text = (serviceName + ' ' + (description || '')).toLowerCase();
  
  // Простая логика определения категории по ключевым словам
  if (text.includes('email') || text.includes('mail') || text.includes('почт')) return categoryMapping['Email'];
  if (text.includes('video') || text.includes('видео')) return categoryMapping['Видео'];
  if (text.includes('image') || text.includes('photo') || text.includes('изображ')) return categoryMapping['Изображения'];
  if (text.includes('text') || text.includes('текст') || text.includes('writing')) return categoryMapping['Текст'];
  if (text.includes('audio') || text.includes('music') || text.includes('аудио')) return categoryMapping['Аудио'];
  if (text.includes('analytics') || text.includes('data') || text.includes('аналитик')) return categoryMapping['Аналитика данных'];
  if (text.includes('design') || text.includes('дизайн') || text.includes('interior')) return categoryMapping['Архитектура и дизайн интерьера'];
  if (text.includes('security') || text.includes('безопасн')) return categoryMapping['Безопасность'];
  if (text.includes('business') || text.includes('бизнес') || text.includes('startup')) return categoryMapping['Бизнес и стартапы'];
  if (text.includes('health') || text.includes('fitness') || text.includes('здоров')) return categoryMapping['Здоровье и фитнес'];
  if (text.includes('marketing') || text.includes('sales') || text.includes('маркетинг')) return categoryMapping['Маркетинг и продажи'];
  if (text.includes('support') || text.includes('customer') || text.includes('поддержк')) return categoryMapping['Обслуживание и поддержка клиентов'];
  if (text.includes('education') || text.includes('learning') || text.includes('обучен')) return categoryMapping['Обучение, гайды и коучинг'];
  if (text.includes('productivity') || text.includes('продуктивн')) return categoryMapping['Продуктивность'];
  if (text.includes('avatar') || text.includes('аватар')) return categoryMapping['Виртуальные аватары'];
  if (text.includes('gpt') || text.includes('llm') || text.includes('language model')) return categoryMapping['Большие языковые модели'];
  if (text.includes('ecommerce') || text.includes('shop') || text.includes('store')) return categoryMapping['E-commerce'];
  
  // По умолчанию - Продуктивность
  return categoryMapping['Продуктивность'];
}

// Функция для импорта пакета данных
async function importBatch(batch) {
  try {
    const { data, error } = await supabase
      .from('ai_services')
      .insert(batch);
    
    if (error) {
      console.error('Ошибка при импорте пакета:', error);
      return false;
    }
    
    console.log(`Успешно импортировано ${batch.length} записей`);
    return true;
  } catch (error) {
    console.error('Непредвиденная ошибка при импорте:', error);
    return false;
  }
}

// Основная функция импорта
async function importAIServices() {
  console.log('Начинаем импорт ИИ-сервисов...');
  
  const results = [];
  let batch = [];
  let totalProcessed = 0;
  let totalImported = 0;
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', async (row) => {
        try {
          const cleanedData = cleanData(row);
          cleanedData.category_id = determineCategoryId(cleanedData.name, cleanedData.short_description);
          
          batch.push(cleanedData);
          totalProcessed++;
          
          // Когда пакет заполнен, импортируем его
          if (batch.length >= BATCH_SIZE) {
            const success = await importBatch(batch);
            if (success) {
              totalImported += batch.length;
            }
            batch = []; // Очищаем пакет
            
            // Небольшая пауза между пакетами
            await new Promise(resolve => setTimeout(resolve, 100));
          }
          
          // Логируем прогресс каждые 1000 записей
          if (totalProcessed % 1000 === 0) {
            console.log(`Обработано: ${totalProcessed}, Импортировано: ${totalImported}`);
          }
        } catch (error) {
          console.error('Ошибка при обработке строки:', error);
        }
      })
      .on('end', async () => {
        // Импортируем оставшиеся записи
        if (batch.length > 0) {
          const success = await importBatch(batch);
          if (success) {
            totalImported += batch.length;
          }
        }
        
        console.log(`Импорт завершен. Всего обработано: ${totalProcessed}, Импортировано: ${totalImported}`);
        resolve({ totalProcessed, totalImported });
      })
      .on('error', (error) => {
        console.error('Ошибка при чтении CSV файла:', error);
        reject(error);
      });
  });
}

// Запуск импорта
if (require.main === module) {
  importAIServices()
    .then((result) => {
      console.log('Импорт успешно завершен:', result);
      process.exit(0);
    })
    .catch((error) => {
      console.error('Ошибка импорта:', error);
      process.exit(1);
    });
}

module.exports = { importAIServices }; 