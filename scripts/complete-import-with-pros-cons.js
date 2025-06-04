const fs = require('fs');

function createCompleteImport() {
  console.log('🚀 Создаем ПОЛНЫЙ импорт с плюсами, минусами и описаниями...');
  
  const csvFile = '/Users/cursor/Desktop/GigHub/ИИ-сервисы база.csv';
  
  if (!fs.existsSync(csvFile)) {
    console.error(`❌ CSV файл не найден: ${csvFile}`);
    return;
  }
  
  console.log('📖 Читаем CSV файл...');
  const csvContent = fs.readFileSync(csvFile, 'utf-8');
  const lines = csvContent.split('\n');
  
  console.log(`📊 Всего строк в файле: ${lines.length}`);
  
  // Берем заголовки и убираем кавычки
  const headers = lines[0].split(';').map(h => h.trim().replace(/"/g, ''));
  console.log('📋 Заголовки CSV:', headers);
  
  // Маппинг заголовков к нашим полям
  const headerMapping = {
    'id': 'id',
    'sort (просмотр)': 'sort_order',
    'Датадобавления': 'date_added',
    'Заголовок': 'title',
    'ИИ-категория': 'ai_category',
    'Кол-возакладок': 'bookmarks_count',
    'Краткоеописание (рус)': 'short_description_ru',
    'Плюсысервиса (рус)': 'pros_ru',
    'Минусы сервиса (рус)': 'cons_ru',
    'Полное описание (рус)': 'full_description_ru',
    'Логотип': 'logo_url',
    'Обложка': 'cover_url',
    'рейтинг': 'rating',
    'Ссылканасервис': 'service_url',
    'Цена': 'price',
    'Slug': 'slug'
  };
  
  console.log('🗂️ Маппинг полей:', headerMapping);
  
  // Маппинг категорий
  const categoryMapping = {
    'Изображения': 10,
    'Генерация изображений': 10,
    'Большие языковые модели': 1,
    'Чат-боты': 2,
    'Текст': 3,
    'Аудио': 4,
    'Видео': 5,
    'Обучение, гайды и коучинг': 6,
    'Трудоустройство и HR': 7,
    'Маркетинг и продажи': 8,
    'E-commerce': 9,
    'Создание контента': 11,
    'Документы': 12,
    'Email': 13,
    'Социальные сети': 14,
    'Продуктивность': 15,
    'Разработка и IT': 16,
    'Безопасность': 17,
    'Аналитика данных': 18,
    'Управление продуктами': 19,
    'Архитектура и дизайн интерьера': 20,
    'Здоровье и фитнес': 21,
    'Создание презентаций': 22,
    'Виртуальные аватары': 23,
    'Развлечения и lifestyle': 24,
    'Обслуживание и поддержка клиентов': 25,
    'Бизнес и стартапы': 26,
    'Другое': 5
  };
  
  let validRecords = [];
  let processedCount = 0;
  let errorCount = 0;
  
  // Обрабатываем строки данных
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    try {
      // Простой парсинг CSV (разделитель ;)
      const values = line.split(';');
      
      if (values.length < 10) {
        console.log(`⚠️ Пропускаем строку ${i}: недостаточно полей`);
        continue;
      }
      
      // Извлекаем значения по позициям
      const id = values[0] ? values[0].trim() : null;
      const sortOrder = values[1] ? parseInt(values[1].trim()) || 0 : 0;
      const dateAdded = '2025-06-04'; // Стандартная дата
      const title = values[5] ? values[5].trim().replace(/"/g, '') : `Service_${Date.now()}_${i}`;
      const aiCategory = values[6] ? values[6].trim().replace(/"/g, '') : '';
      const bookmarksCount = values[7] ? parseInt(values[7].trim()) || 0 : 0;
      const shortDescription = values[8] ? values[8].trim().replace(/"/g, '') : '';
      const logoUrl = values[9] ? values[9].trim().replace(/"/g, '') : null;
      const cons = values[10] ? values[10].trim().replace(/"/g, '') : null; // Минусы
      const coverUrl = values[11] ? values[11].trim().replace(/"/g, '') : null;
      const pros = values[12] ? values[12].trim().replace(/"/g, '') : null; // Плюсы
      const fullDescription = values[13] ? values[13].trim().replace(/"/g, '') : null;
      const rating = values[14] ? parseFloat(values[14].trim()) || 5.0 : 5.0;
      const serviceUrl = values[16] ? values[16].trim().replace(/"/g, '') : null;
      const price = values[17] ? values[17].trim().replace(/"/g, '') : null;
      const slug = values[18] ? values[18].trim().replace(/"/g, '') : `service-${Date.now()}-${i}`;
      
      // Определяем категорию
      const categoryId = categoryMapping[aiCategory] || 5;
      
      // Создаем уникальный ID если его нет
      const finalId = id || Date.now() + Math.floor(Math.random() * 1000);
      
      validRecords.push({
        id: finalId,
        sort_order: sortOrder,
        date_added: dateAdded,
        title: title,
        ai_category: aiCategory,
        bookmarks_count: bookmarksCount,
        short_description_ru: shortDescription,
        pros_ru: pros,
        cons_ru: cons,
        logo_url: logoUrl,
        cover_url: coverUrl,
        full_description_ru: fullDescription,
        rating: rating,
        service_url: serviceUrl,
        price: price,
        slug: slug,
        category_id: categoryId
      });
      
      processedCount++;
      
      if (processedCount % 1000 === 0) {
        console.log(`✅ Обработано ${processedCount} записей...`);
      }
      
    } catch (error) {
      errorCount++;
      console.log(`❌ Ошибка в строке ${i}:`, error.message);
    }
  }
  
  console.log(`\n📊 РЕЗУЛЬТАТЫ ОБРАБОТКИ:`);
  console.log(`✅ Валидных записей: ${validRecords.length}`);
  console.log(`❌ Ошибок: ${errorCount}`);
  
  // Создаем SQL файлы
  createSQLFiles(validRecords);
}

function createSQLFiles(records) {
  console.log('\n🔧 Создаем SQL файлы для импорта...');
  
  // Тестовый файл (первые 1000 записей)
  const testRecords = records.slice(0, 1000);
  createSQLFile(testRecords, 'scripts/TEST_IMPORT_COMPLETE.sql', 'ТЕСТОВЫЙ ИМПОРТ (ПЕРВЫЕ 1000 ЗАПИСЕЙ С ПЛЮСАМИ И МИНУСАМИ)');
  
  // Полный файл
  createSQLFile(records, 'scripts/MEGA_IMPORT_COMPLETE.sql', 'ПОЛНЫЙ ИМПОРТ ВСЕХ ЗАПИСЕЙ С ПЛЮСАМИ И МИНУСАМИ');
  
  console.log('\n🎉 Готово! Файлы созданы:');
  console.log('📄 TEST_IMPORT_COMPLETE.sql - тест с плюсами и минусами');
  console.log('📄 MEGA_IMPORT_COMPLETE.sql - полный импорт с плюсами и минусами');
}

function createSQLFile(records, filename, description) {
  let sql = `-- ${description}\n-- Для проверки работоспособности\n\nBEGIN;\n`;
  
  const batchSize = 1000;
  const totalBatches = Math.ceil(records.length / batchSize);
  
  for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
    const startIndex = batchIndex * batchSize;
    const endIndex = Math.min(startIndex + batchSize, records.length);
    const batchRecords = records.slice(startIndex, endIndex);
    
    sql += `INSERT INTO ai_services (id, sort_order, date_added, title, ai_category, bookmarks_count, short_description_ru, pros_ru, cons_ru, logo_url, cover_url, full_description_ru, rating, service_url, price, slug, category_id) VALUES\n`;
    
    const values = batchRecords.map(record => {
      return `(${record.id}, ${record.sort_order}, '${record.date_added}', ${escapeSQL(record.title)}, ${escapeSQL(record.ai_category)}, ${record.bookmarks_count}, ${escapeSQL(record.short_description_ru)}, ${escapeSQL(record.pros_ru)}, ${escapeSQL(record.cons_ru)}, ${escapeSQL(record.logo_url)}, ${escapeSQL(record.cover_url)}, ${escapeSQL(record.full_description_ru)}, ${record.rating}, ${escapeSQL(record.service_url)}, ${escapeSQL(record.price)}, ${escapeSQL(record.slug)}, ${record.category_id})`;
    });
    
    sql += values.join(',\n') + ';\n\n';
  }
  
  sql += `COMMIT;\n\n-- Проверяем результат\nSELECT \n  COUNT(*) as total_services,\n  COUNT(pros_ru) as services_with_pros,\n  COUNT(cons_ru) as services_with_cons,\n  COUNT(short_description_ru) as services_with_descriptions\nFROM ai_services;`;
  
  fs.writeFileSync(filename, sql);
  
  const stats = fs.statSync(filename);
  console.log(`📄 ${filename}: ${Math.round(stats.size / 1024)} KB, ${records.length} записей`);
}

function escapeSQL(value) {
  if (value === null || value === undefined) {
    return 'NULL';
  }
  
  // Экранируем одинарные кавычки
  const escaped = value.toString().replace(/'/g, "''");
  return `'${escaped}'`;
}

// Запускаем
createCompleteImport(); 