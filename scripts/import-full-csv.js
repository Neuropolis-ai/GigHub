const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Загружаем переменные окружения
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Не найдены переменные окружения SUPABASE_URL или SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
  return value.trim();
}

function parseDate(dateStr) {
  if (!dateStr) return null;
  
  try {
    // Парсим разные форматы дат
    if (dateStr.includes('am') || dateStr.includes('pm')) {
      return new Date(dateStr).toISOString();
    }
    
    // Попробуем другие форматы
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return null;
    }
    
    return date.toISOString();
  } catch (error) {
    console.warn(`⚠️ Не удалось распарсить дату: ${dateStr}`);
    return null;
  }
}

function parseNumber(value) {
  if (!value || value === '') return null;
  const num = parseFloat(value.replace(',', '.'));
  return isNaN(num) ? null : num;
}

// Основная функция импорта
async function importCSVData() {
  console.log('🚀 Начинаем импорт данных из CSV файла...');
  
  const csvPath = '/Users/cursor/Desktop/GigHub/ИИ-сервисы база.csv';
  
  if (!fs.existsSync(csvPath)) {
    console.error(`❌ Файл не найден: ${csvPath}`);
    return;
  }
  
  const fileContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = fileContent.split('\n');
  
  console.log(`📊 Найдено ${lines.length} строк в CSV файле`);
  
  if (lines.length < 2) {
    console.error('❌ CSV файл пустой или содержит только заголовки');
    return;
  }
  
  // Парсим заголовки
  const headers = lines[0].split(';').map(h => h.trim());
  console.log('📋 Заголовки:', headers);
  
  let processedRows = 0;
  let successfulInserts = 0;
  let currentRecord = [];
  let inMultilineField = false;
  
  // Очищаем существующие данные (опционально)
  console.log('🧹 Очищаем существующие данные...');
  await supabase.from('ai_services').delete().neq('id', 0);
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (!line) continue;
    
    try {
      const parseResult = parseCSVLine(line, inMultilineField);
      
      if (inMultilineField) {
        // Продолжаем предыдущую запись
        const lastFieldIndex = currentRecord.length - 1;
        currentRecord[lastFieldIndex] += '\n' + parseResult.fields[0];
        
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
        
        // Убираем пустые значения
        Object.keys(record).forEach(key => {
          if (record[key] === null || record[key] === undefined || record[key] === '') {
            delete record[key];
          }
        });
        
        // Обязательные поля
        if (!record.title) {
          console.warn(`⚠️ Пропускаем запись без названия: строка ${i}`);
          currentRecord = [];
          continue;
        }
        
        try {
          const { data, error } = await supabase
            .from('ai_services')
            .insert(record)
            .select('id');
          
          if (error) {
            console.error(`❌ Ошибка вставки записи "${record.title}":`, error.message);
          } else {
            successfulInserts++;
            if (successfulInserts % 100 === 0) {
              console.log(`✅ Успешно импортировано ${successfulInserts} записей...`);
            }
          }
        } catch (dbError) {
          console.error(`❌ Ошибка базы данных для "${record.title}":`, dbError.message);
        }
        
        currentRecord = [];
      }
      
    } catch (error) {
      console.error(`❌ Ошибка обработки строки ${i}:`, error.message);
      currentRecord = [];
      inMultilineField = false;
    }
  }
  
  console.log(`\n📊 Результаты импорта:`);
  console.log(`- Обработано строк: ${processedRows}`);
  console.log(`- Успешно импортировано: ${successfulInserts}`);
  console.log(`- Ошибок: ${processedRows - successfulInserts}`);
  
  if (successfulInserts > 0) {
    console.log('\n✅ Импорт завершен успешно!');
  } else {
    console.log('\n❌ Не удалось импортировать ни одной записи');
  }
}

// Запускаем импорт
if (require.main === module) {
  importCSVData().catch(console.error);
}

module.exports = { importCSVData }; 