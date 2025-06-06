const fs = require('fs');

// Функция для парсинга CSV с учетом многострочных полей
function parseCSVLine(line, inQuotes = false) {
  const result = [];
  let current = '';
  let insideQuotes = inQuotes;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        // Escaped quote
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        insideQuotes = !insideQuotes;
      }
    } else if (char === ';' && !insideQuotes) {
      // Field separator
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  // Add the last field
  result.push(current.trim());
  
  return { fields: result, stillInQuotes: insideQuotes };
}

// Функция для очистки и валидации данных
function cleanData(value) {
  if (!value || value === '' || value === 'null' || value === 'undefined') {
    return null;
  }
  return value.trim().replace(/'/g, "''"); // Экранируем одинарные кавычки для SQL
}

function parseDate(dateStr) {
  if (!dateStr) return null;
  
  try {
    if (dateStr.includes('am') || dateStr.includes('pm')) {
      return new Date(dateStr).toISOString();
    }
    
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return null;
    }
    
    return date.toISOString();
  } catch (error) {
    return null;
  }
}

function parseNumber(value) {
  if (!value || value === '') return null;
  const num = parseFloat(value.replace(',', '.'));
  return isNaN(num) ? null : num;
}

// Маппинг категорий (русские названия -> ID)
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
  'Текст': 11,
  'Аналитика данных': 3,
  'Виртуальные аватары': 4,
  'Email': 14,
  'Безопасность': 15,
  'Бизнес и стартапы': 16,
  'Архитектура и дизайн интерьера': 18,
  'Здоровье и фитнес': 19,
  'Маркетинг и продажи': 20,
  'Образ жизни': 21,
  'Обслуживание и поддержка клиентов': 22,
  'Обучение, гайды и коучинг': 23,
  'Создание презентаций': 24,
  'Разработка и IT': 25,
  'Развлечения': 26,
  'Инвестиции и финансы': 27,
  'Создание контента': 28,
  'Социальные сети': 29,
  'E-commerce': 13,
  'Другое': 5
};

// Основная функция импорта
function processCSVData() {
  console.log('🚀 Обрабатываем CSV файл...');
  
  const csvPath = '/Users/cursor/Desktop/GigHub/ИИ-сервисы база.csv';
  
  if (!fs.existsSync(csvPath)) {
    console.error(`❌ Файл не найден: ${csvPath}`);
    return;
  }
  
  const fileContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = fileContent.split('\n');
  
  console.log(`📊 Найдено ${lines.length} строк в CSV файле`);
  
  // Парсим заголовки
  const headers = lines[0].split(';').map(h => h.trim());
  console.log('📋 Заголовки:', headers);
  
  let processedRows = 0;
  let currentRecord = [];
  let inMultilineField = false;
  let sqlInserts = [];
  
  for (let i = 1; i < lines.length && processedRows < 1000; i++) { // Увеличиваем лимит до 1000
    const line = lines[i].trim();
    
    if (!line) continue;
    
    try {
      const parseResult = parseCSVLine(line, inMultilineField);
      
      if (inMultilineField) {
        // Продолжаем предыдущую запись
        const lastFieldIndex = currentRecord.length - 1;
        currentRecord[lastFieldIndex] += '\\n' + parseResult.fields[0];
        
        if (!parseResult.stillInQuotes) {
          // Заканчиваем многострочное поле
          for (let j = 1; j < parseResult.fields.length; j++) {
            currentRecord.push(parseResult.fields[j]);
          }
          inMultilineField = false;
        }
      } else {
        currentRecord = parseResult.fields;
        inMultilineField = parseResult.stillInQuotes;
      }
      
      // Если запись завершена
      if (!inMultilineField && currentRecord.length >= headers.length) {
        processedRows++;
        
        // Маппим данные на поля базы данных
        const record = {
          id: parseInt(currentRecord[0]?.split('x')[0]) || null,
          sort_order: parseNumber(currentRecord[1]),
          faq_en: cleanData(currentRecord[2]),
          faq_ru: cleanData(currentRecord[3]),
          date_added: parseDate(currentRecord[4]),
          title: cleanData(currentRecord[5]),
          ai_category: cleanData(currentRecord[6]),
          bookmarks_count: parseNumber(currentRecord[7]),
          short_description_ru: cleanData(currentRecord[8]),
          logo_url: cleanData(currentRecord[9]),
          disadvantages_ru: cleanData(currentRecord[10]),
          cover_url: cleanData(currentRecord[11]),
          advantages_ru: cleanData(currentRecord[12]),
          full_description_ru: cleanData(currentRecord[13]),
          rating: parseNumber(currentRecord[14]) || parseNumber(currentRecord[15]),
          service_url: cleanData(currentRecord[16]),
          price: cleanData(currentRecord[17]),
          slug: cleanData(currentRecord[18])
        };
        
        // Определяем category_id на основе ai_category
        if (record.ai_category && categoryMapping[record.ai_category]) {
          record.category_id = categoryMapping[record.ai_category];
        }
        
        // Обязательные поля
        if (!record.title) {
          console.warn(`⚠️ Пропускаем запись без названия: строка ${i}`);
          currentRecord = [];
          continue;
        }
        
        // Генерируем SQL INSERT
        const fields = [];
        const values = [];
        
        Object.keys(record).forEach(key => {
          if (record[key] !== null && record[key] !== undefined && record[key] !== '') {
            fields.push(key);
            if (typeof record[key] === 'string') {
              values.push(`'${record[key]}'`);
            } else {
              values.push(record[key]);
            }
          }
        });
        
        if (fields.length > 0) {
          const sqlInsert = `INSERT INTO ai_services (${fields.join(', ')}) VALUES (${values.join(', ')});`;
          sqlInserts.push(sqlInsert);
        }
        
        currentRecord = [];
        
        if (processedRows % 10 === 0) {
          console.log(`Обработано ${processedRows} записей...`);
        }
      }
      
    } catch (error) {
      console.error(`❌ Ошибка обработки строки ${i}:`, error.message);
      currentRecord = [];
      inMultilineField = false;
    }
  }
  
  console.log(`\n📊 Результаты обработки:`);
  console.log(`- Обработано строк: ${processedRows}`);
  console.log(`- Сгенерировано SQL запросов: ${sqlInserts.length}`);
  
  // Записываем SQL в файл
  const sqlContent = sqlInserts.join('\n\n');
  fs.writeFileSync('/Users/cursor/Desktop/GigHub/scripts/import_data.sql', sqlContent);
  console.log('✅ SQL команды сохранены в scripts/import_data.sql');
  
  // Выводим первые несколько команд для проверки
  console.log('\n📝 Первые 3 SQL команды:');
  sqlInserts.slice(0, 3).forEach((sql, index) => {
    console.log(`${index + 1}. ${sql.substring(0, 200)}...`);
  });
}

// Запускаем обработку
if (require.main === module) {
  processCSVData();
}

module.exports = { processCSVData }; 