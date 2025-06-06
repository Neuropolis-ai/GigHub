const fs = require('fs');
const csv = require('csv-parser');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

// Конфигурация Supabase
const supabaseUrl = 'https://mjfkgzxcnoukmnyemyil.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZmtnenhjbm91a21ueWVteWlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMjA2ODUsImV4cCI6MjA2NDU5NjY4NX0.jlBo0GnE2hUZvL7Npnf4fHN7yjtEUjMbD5emuOhZyL4';

const supabase = createClient(supabaseUrl, supabaseKey);

// Пути к CSV файлам
const categoriesFilePath = path.join(__dirname, '../Data Base/Категории ИИ-сервисов.csv');
const servicesFilePath = path.join(__dirname, '../Data Base/ИИ-сервис.csv');

// Размер пакета для импорта
const BATCH_SIZE = 100;
const DELAY_BETWEEN_BATCHES = 300; // мс

// Функция для очистки строк
function cleanString(str) {
  if (!str || typeof str !== 'string') return null;
  
  return str
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Удаляем контрольные символы
    .replace(/\r\n/g, '\n') // Нормализуем переносы строк
    .replace(/\r/g, '\n')
    .trim();
}

// Функция для получения существующих категорий
async function getExistingCategories() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name');
    
    if (error) {
      console.error('Ошибка при получении категорий:', error);
      return {};
    }
    
    const categoryMap = {};
    data.forEach(cat => {
      categoryMap[cat.name] = cat.id;
    });
    
    return categoryMap;
  } catch (error) {
    console.error('Ошибка при подключении к базе данных:', error);
    return {};
  }
}

// Функция для импорта пакета данных
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

// Функция для загрузки дополнительных данных из второго CSV
async function loadServiceDetails() {
  console.log('📋 Загружаем дополнительные данные сервисов...');
  
  const serviceDetails = {};
  let processedRows = 0;
  
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(servicesFilePath)) {
      console.log('⚠️ Файл с деталями сервисов не найден, используем только основные данные');
      resolve(serviceDetails);
      return;
    }
    
    fs.createReadStream(servicesFilePath, { encoding: 'utf8' })
      .pipe(csv({
        skipEmptyLines: true,
        skipLinesWithError: true
      }))
      .on('data', (row) => {
        try {
          processedRows++;
          
          // Извлекаем название сервиса из URL или других полей
          const serviceUrl = cleanString(row['Ссылканасервис']);
          const shortDesc = cleanString(row['Краткоеописание (рус)']);
          const fullDesc = cleanString(row['Полное описание (рус)']);
          const price = cleanString(row['Цена']);
          const disadvantages = cleanString(row['Минусысервиса (рус)']);
          const faq = cleanString(row['Вопросыиответы']);
          const faqRu = cleanString(row['Вопросыиответы (рус)']);
          
          // Пытаемся извлечь название сервиса из URL
          if (serviceUrl) {
            let serviceName = null;
            
            // Извлекаем домен из URL
            try {
              const url = new URL(serviceUrl);
              serviceName = url.hostname.replace('www.', '').split('.')[0];
              serviceName = serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
            } catch (e) {
              // Если URL некорректный, пропускаем
            }
            
            if (serviceName && (shortDesc || fullDesc)) {
              serviceDetails[serviceName.toLowerCase()] = {
                name: serviceName,
                service_url: serviceUrl,
                short_description: shortDesc,
                full_description: fullDesc,
                price: price,
                disadvantages: disadvantages,
                faq: faq,
                faq_ru: faqRu
              };
            }
          }
          
          if (processedRows % 10000 === 0) {
            console.log(`📊 Обработано ${processedRows} строк деталей сервисов`);
          }
        } catch (error) {
          console.error('Ошибка при обработке строки деталей:', error);
        }
      })
      .on('end', () => {
        console.log(`✅ Загружено ${Object.keys(serviceDetails).length} деталей сервисов из ${processedRows} строк`);
        resolve(serviceDetails);
      })
      .on('error', (error) => {
        console.error('❌ Ошибка при чтении файла деталей:', error);
        resolve(serviceDetails); // Продолжаем без деталей
      });
  });
}

// Основная функция импорта
async function importFromCategories() {
  console.log('🚀 Начинаем импорт ИИ-сервисов из файла категорий...');
  
  // Проверяем существование файла
  if (!fs.existsSync(categoriesFilePath)) {
    throw new Error(`CSV файл категорий не найден: ${categoriesFilePath}`);
  }
  
  // Получаем существующие категории
  const categoryMap = await getExistingCategories();
  console.log(`📂 Найдено категорий в БД: ${Object.keys(categoryMap).length}`);
  
  // Загружаем дополнительные данные сервисов
  const serviceDetails = await loadServiceDetails();
  
  // Получаем существующие сервисы для проверки дубликатов
  const { data: existingServices } = await supabase
    .from('ai_services')
    .select('name');
  
  const existingServiceNames = new Set(
    existingServices ? existingServices.map(s => s.name.toLowerCase()) : []
  );
  
  console.log(`📋 Найдено существующих сервисов в БД: ${existingServiceNames.size}`);
  
  let batch = [];
  let totalProcessed = 0;
  let totalImported = 0;
  let totalErrors = 0;
  let skippedServices = 0;
  let duplicateSkipped = 0;
  
  const startTime = Date.now();
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(categoriesFilePath, { encoding: 'utf8' })
      .pipe(csv({
        skipEmptyLines: true,
        skipLinesWithError: true
      }))
      .on('data', async (row) => {
        try {
          const categoryName = cleanString(row['Категория (option)']) || cleanString(row['Название']);
          const servicesString = cleanString(row['ИИ-сервисы']);
          
          if (!categoryName || !servicesString || !categoryMap[categoryName]) {
            return;
          }
          
          const categoryId = categoryMap[categoryName];
          
          // Разбиваем строку сервисов на отдельные названия
          const serviceNames = servicesString
            .split(',')
            .map(name => name.trim())
            .filter(name => name.length > 0);
          
          console.log(`📋 Обрабатываем категорию "${categoryName}" с ${serviceNames.length} сервисами`);
          
          for (const serviceName of serviceNames) {
            if (!serviceName || serviceName.length < 2) {
              skippedServices++;
              continue;
            }
            
            // Проверяем на дубликаты
            if (existingServiceNames.has(serviceName.toLowerCase())) {
              duplicateSkipped++;
              console.log(`⚠️ Пропускаем дубликат: ${serviceName}`);
              continue;
            }
            
            // Ищем дополнительные данные для сервиса
            const details = serviceDetails[serviceName.toLowerCase()] || {};
            
            const serviceData = {
              name: details.name || serviceName,
              short_description: details.short_description || null,
              full_description: details.full_description || null,
              price: details.price || null,
              service_url: details.service_url || null,
              disadvantages: details.disadvantages || null,
              faq: details.faq || null,
              faq_ru: details.faq_ru || null,
              category_id: categoryId,
              status: 'active'
            };
            
            batch.push(serviceData);
            totalProcessed++;
            
            // Добавляем название в существующие для предотвращения дубликатов в рамках текущего импорта
            existingServiceNames.add(serviceName.toLowerCase());
            
            // Когда пакет заполнен, импортируем его
            if (batch.length >= BATCH_SIZE) {
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
            }
          }
          
          // Логируем прогресс каждые 1000 записей
          if (totalProcessed % 1000 === 0) {
            const elapsed = (Date.now() - startTime) / 1000;
            const rate = totalProcessed / elapsed;
            console.log(`📈 Обработано: ${totalProcessed}, Импортировано: ${totalImported}, Ошибок: ${totalErrors}, Дубликатов пропущено: ${duplicateSkipped}, Скорость: ${rate.toFixed(1)} записей/сек`);
          }
        } catch (error) {
          console.error('Ошибка при обработке строки категории:', error);
          totalErrors++;
        }
      })
      .on('end', async () => {
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
        
        // Проверяем финальное количество записей в БД
        const { data: finalData } = await supabase
          .from('ai_services')
          .select('id', { count: 'exact', head: true });
        const finalCount = finalData?.length || 0;
        
        console.log('\n🎉 Импорт завершен!');
        console.log(`📊 Статистика:`);
        console.log(`   - Обработано сервисов: ${totalProcessed}`);
        console.log(`   - Пропущено сервисов: ${skippedServices}`);
        console.log(`   - Пропущено дубликатов: ${duplicateSkipped}`);
        console.log(`   - Импортировано: ${totalImported}`);
        console.log(`   - Ошибок: ${totalErrors}`);
        console.log(`   - Время выполнения: ${elapsed.toFixed(1)} секунд`);
        console.log(`   - Итого записей в БД: ${finalCount}`);
        
        resolve({ 
          totalProcessed, 
          totalImported, 
          totalErrors, 
          skippedServices,
          duplicateSkipped,
          finalCount,
          elapsed 
        });
      })
      .on('error', (error) => {
        console.error('❌ Ошибка при чтении CSV файла категорий:', error);
        reject(error);
      });
  });
}

// Запуск импорта
if (require.main === module) {
  importFromCategories()
    .then((result) => {
      console.log('✅ Импорт успешно завершен:', result);
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Ошибка импорта:', error);
      process.exit(1);
    });
}

module.exports = { importFromCategories }; 