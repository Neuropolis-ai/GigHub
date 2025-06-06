const fs = require('fs');

function createBulkImport() {
  console.log('🚀 Создаем систему массового импорта для 13,000+ сервисов...');
  
  const csvFile = '/Users/cursor/Desktop/GigHub/ИИ-сервисы база.csv';
  
  if (!fs.existsSync(csvFile)) {
    console.error(`❌ CSV файл не найден: ${csvFile}`);
    return;
  }
  
  console.log('📖 Читаем CSV файл...');
  const csvContent = fs.readFileSync(csvFile, 'utf-8');
  const lines = csvContent.split('\n');
  
  console.log(`📊 Всего строк в файле: ${lines.length}`);
  
  // Берем заголовки
  const headers = lines[0].split(';').map(h => h.trim().replace(/"/g, ''));
  console.log('📋 Заголовки CSV:', headers.slice(0, 10));
  
  // Маппинг категорий
  const categoryMapping = {
    'Изображения': 10,
    'Генерация изображений': 10,
    'Большие языковые модели': 6,
    'Чат-боты': 7,
    'Аудио': 12,
    'Музыка': 12,
    'Видео': 9,
    'Продуктивность': 17,
    'Автоматизация': 17,
    'Создание контента': 28,
    'Текст': 11,
    'Обработка текста': 11,
    'Анализ данных': 3,
    'Кодирование': 8,
    'Разработка': 25,
    'Разработка и IT': 25,
    'Бизнес': 16,
    'Бизнес и стартапы': 16,
    'Маркетинг': 18,
    'Email': 14,
    'Социальные сети': 21,
    'Образование': 23,
    'Обучение, гайды и коучинг': 23,
    'Здоровье': 15,
    'Развлечения': 24,
    'Lifestyle': 24,
    'Развлечения и lifestyle': 24,
    'Финансы': 13,
    'Инвестиции и финансы': 13,
    'Безопасность': 5,
    'Другое': 5
  };
  
  // Создаем батчи по 1000 записей для эффективного импорта
  const batchSize = 1000;
  const batches = [];
  let processedRows = 0;
  let validRows = 0;
  
  console.log('🔄 Обрабатываем данные и создаем SQL батчи...');
  
  for (let i = 1; i < lines.length && processedRows < 15000; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Простое разбиение по точкам с запятой (игнорируя сложные случаи для скорости)
    const fields = line.split(';').map(f => f.trim().replace(/^"|"$/g, ''));
    
    if (fields.length < 10) continue; // Пропускаем неполные строки
    
    // Извлекаем основные поля
    const title = fields[3] || `Service_${Date.now()}_${i}`;
    const category = fields[4] || 'Другое';
    const categoryId = categoryMapping[category] || 5;
    const bookmarks = parseInt(fields[5]) || 0;
    const shortDesc = fields[6] || '';
    const logoUrl = fields[7] || null;
    const coverUrl = fields[8] || null;
    const fullDesc = fields[9] || '';
    const rating = parseFloat(fields[10]) || null;
    const serviceUrl = fields[11] || null;
    const price = fields[12] || null;
    const slug = fields[13] || title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    // Генерируем уникальный ID
    const id = Date.now() + i + Math.floor(Math.random() * 1000);
    const sortOrder = i;
    const dateAdded = new Date().toISOString().split('T')[0];
    
    const values = `(${id}, ${sortOrder}, '${dateAdded}', ${escapeSQL(title)}, ${escapeSQL(category)}, ${bookmarks}, ${escapeSQL(shortDesc)}, ${escapeSQL(logoUrl)}, ${escapeSQL(coverUrl)}, ${escapeSQL(fullDesc)}, ${rating}, ${escapeSQL(serviceUrl)}, ${escapeSQL(price)}, ${escapeSQL(slug)}, ${categoryId})`;
    
    if (!batches[Math.floor(validRows / batchSize)]) {
      batches[Math.floor(validRows / batchSize)] = [];
    }
    
    batches[Math.floor(validRows / batchSize)].push(values);
    validRows++;
    processedRows++;
    
    if (processedRows % 1000 === 0) {
      console.log(`⏳ Обработано ${processedRows} строк...`);
    }
  }
  
  console.log(`✅ Создано ${batches.length} батчей с ${validRows} валидными записями`);
  
  // Создаем SQL файлы для каждого батча
  batches.forEach((batch, index) => {
    const sql = `INSERT INTO ai_services (id, sort_order, date_added, title, ai_category, bookmarks_count, short_description_ru, logo_url, cover_url, full_description_ru, rating, service_url, price, slug, category_id) VALUES\n${batch.join(',\n')};`;
    
    const filename = `/Users/cursor/Desktop/GigHub/scripts/bulk_batch_${index + 1}.sql`;
    fs.writeFileSync(filename, sql);
    console.log(`📝 Создан файл: bulk_batch_${index + 1}.sql (${batch.length} записей)`);
  });
  
  // Создаем мастер-скрипт для выполнения всех батчей
  const masterScript = batches.map((_, index) => 
    `-- Батч ${index + 1}\n-- Выполните эту команду через mcp_supabase_execute_sql\n-- ${fs.readFileSync(`/Users/cursor/Desktop/GigHub/scripts/bulk_batch_${index + 1}.sql`, 'utf-8').substring(0, 200)}...`
  ).join('\n\n');
  
  fs.writeFileSync('/Users/cursor/Desktop/GigHub/scripts/master_import_plan.txt', masterScript);
  
  console.log('\n🎯 План массового импорта создан!');
  console.log(`📊 Статистика:`);
  console.log(`   • Всего батчей: ${batches.length}`);
  console.log(`   • Записей в каждом батче: ~${batchSize}`);
  console.log(`   • Общее количество записей: ${validRows}`);
  console.log(`   • Файлы сохранены в scripts/bulk_batch_*.sql`);
  console.log(`   • План импорта: scripts/master_import_plan.txt`);
  
  return {
    totalBatches: batches.length,
    totalRecords: validRows,
    batchSize,
    files: batches.map((_, i) => `bulk_batch_${i + 1}.sql`)
  };
}

function escapeSQL(value) {
  if (value === null || value === undefined) return 'NULL';
  if (typeof value === 'number') return value;
  return "'" + String(value).replace(/'/g, "''").substring(0, 1000) + "'";
}

if (require.main === module) {
  createBulkImport();
}

module.exports = { createBulkImport }; 