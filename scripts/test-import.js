const fs = require('fs');
const csv = require('csv-parser');
const { createClient } = require('@supabase/supabase-js');

// Конфигурация Supabase
const supabaseUrl = 'https://mjfkgzxcnoukmnyemyil.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZmtnenhjbm91a21ueWVteWlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMjA2ODUsImV4cCI6MjA2NDU5NjY4NX0.jlBo0GnE2hUZvL7Npnf4fHN7yjtEUjMbD5emuOhZyL4';

const supabase = createClient(supabaseUrl, supabaseKey);

// Функция для извлечения названия сервиса из FAQ или URL
function extractServiceName(faq, url) {
  if (faq) {
    // Ищем название в начале FAQ
    const match = faq.match(/What is ([^?]+)\?/);
    if (match) {
      return match[1].trim();
    }
    
    // Ищем другие паттерны
    const match2 = faq.match(/([A-Za-z0-9\s]+) is an? AI/);
    if (match2) {
      return match2[1].trim();
    }
  }
  
  if (url) {
    // Извлекаем название из URL
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname.replace('www.', '');
      const name = hostname.split('.')[0];
      return name.charAt(0).toUpperCase() + name.slice(1);
    } catch (e) {
      // Если URL невалидный, пробуем извлечь из строки
      const match = url.match(/https?:\/\/(?:www\.)?([^\/\?]+)/);
      if (match) {
        const name = match[1].split('.')[0];
        return name.charAt(0).toUpperCase() + name.slice(1);
      }
    }
  }
  
  return 'Неизвестный сервис';
}

// Функция для определения категории
function determineCategoryId(serviceName, description, faq) {
  const text = (serviceName + ' ' + (description || '') + ' ' + (faq || '')).toLowerCase();
  
  // Логика определения категории
  if (text.includes('email') || text.includes('mail') || text.includes('почт')) return 2; // Email
  if (text.includes('video') || text.includes('видео') || text.includes('youtube')) return 9; // Видео
  if (text.includes('image') || text.includes('photo') || text.includes('изображ')) return 10; // Изображения
  if (text.includes('text') || text.includes('текст') || text.includes('writing')) return 11; // Текст
  if (text.includes('audio') || text.includes('music') || text.includes('аудио')) return 12; // Аудио
  if (text.includes('analytics') || text.includes('data') || text.includes('аналитик')) return 3; // Аналитика данных
  if (text.includes('design') || text.includes('дизайн') || text.includes('interior')) return 4; // Архитектура и дизайн
  if (text.includes('security') || text.includes('безопасн')) return 5; // Безопасность
  if (text.includes('business') || text.includes('бизнес') || text.includes('startup')) return 6; // Бизнес
  if (text.includes('health') || text.includes('fitness') || text.includes('здоров')) return 13; // Здоровье
  if (text.includes('marketing') || text.includes('sales') || text.includes('маркетинг')) return 14; // Маркетинг
  if (text.includes('support') || text.includes('customer') || text.includes('поддержк')) return 15; // Поддержка
  if (text.includes('education') || text.includes('learning') || text.includes('обучен')) return 16; // Обучение
  if (text.includes('productivity') || text.includes('продуктивн')) return 17; // Продуктивность
  if (text.includes('avatar') || text.includes('аватар')) return 8; // Аватары
  if (text.includes('gpt') || text.includes('llm') || text.includes('language model')) return 7; // LLM
  if (text.includes('ecommerce') || text.includes('shop') || text.includes('store')) return 1; // E-commerce
  
  return 17; // По умолчанию - Продуктивность
}

// Тестовый импорт первых 10 записей
async function testImport() {
  console.log('Начинаем тестовый импорт...');
  
  const csvFilePath = '../Data Base/ИИ-сервис.csv';
  const results = [];
  let count = 0;
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', async (row) => {
        if (count >= 5) return; // Импортируем только первые 5 записей для теста
        
        try {
          const serviceName = extractServiceName(row['Вопросыиответы'], row['Ссылканасервис']);
          const categoryId = determineCategoryId(serviceName, row['Краткоеописание (рус)'], row['Вопросыиответы']);
          
          const serviceData = {
            name: serviceName,
            price: row['Цена'] || null,
            service_url: row['Ссылканасервис'] || null,
            disadvantages: row['Минусысервиса (рус)'] || null,
            short_description: row['Краткоеописание (рус)'] || null,
            full_description: row['Полное описание (рус)'] || null,
            faq: row['Вопросыиответы'] || null,
            faq_ru: row['Вопросыиответы (рус)'] || null,
            category_id: categoryId,
            status: 'active'
          };
          
          console.log(`Обрабатываем сервис: ${serviceName} (категория: ${categoryId})`);
          console.log('Данные:', JSON.stringify(serviceData, null, 2));
          
          // Импортируем в базу
          const { data, error } = await supabase
            .from('ai_services')
            .insert([serviceData]);
          
          if (error) {
            console.error('Ошибка при импорте:', error);
          } else {
            console.log('Успешно импортировано!');
            results.push(serviceData);
          }
          
          count++;
        } catch (error) {
          console.error('Ошибка при обработке строки:', error);
        }
      })
      .on('end', () => {
        console.log(`Тестовый импорт завершен. Импортировано: ${results.length} записей`);
        resolve(results);
      })
      .on('error', (error) => {
        console.error('Ошибка при чтении CSV:', error);
        reject(error);
      });
  });
}

// Запуск тестового импорта
if (require.main === module) {
  testImport()
    .then((results) => {
      console.log('Тестовый импорт завершен успешно');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Ошибка тестового импорта:', error);
      process.exit(1);
    });
} 