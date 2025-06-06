const fs = require('fs');

function createSuperImport() {
  console.log('🚀 Создаем суперфайл для импорта через веб-интерфейс Supabase...');
  
  const totalBatches = 13;
  let allCommands = [];
  let totalRecords = 0;
  
  // Собираем все команды из всех батчей
  for (let i = 1; i <= totalBatches; i++) {
    const batchFile = `/Users/cursor/Desktop/GigHub/scripts/bulk_batch_${i}.sql`;
    
    if (fs.existsSync(batchFile)) {
      const content = fs.readFileSync(batchFile, 'utf-8').trim();
      
      // Разбиваем на отдельные команды INSERT
      const insertCommands = content.split('INSERT INTO ai_services').filter(cmd => cmd.trim());
      
      insertCommands.forEach((cmd, index) => {
        if (index === 0 && cmd.includes('VALUES')) {
          // Первая команда уже содержит полный INSERT
          allCommands.push(content);
        }
      });
      
      // Считаем записи по количеству VALUE строк
      const valueMatches = content.match(/\(/g);
      const recordsInBatch = valueMatches ? valueMatches.length : 0;
      totalRecords += recordsInBatch;
      
      console.log(`📦 Батч ${i}: ${recordsInBatch} записей`);
    }
  }
  
  // Создаем мега-файл со всеми командами
  const megaInsert = `-- МАССОВЫЙ ИМПОРТ ИИ-СЕРВИСОВ
-- Общее количество записей: ${totalRecords}
-- Дата создания: ${new Date().toLocaleString('ru-RU')}

-- Отключаем проверки для ускорения
SET session_replication_role = 'replica';

-- Начинаем транзакцию
BEGIN;

${allCommands.join('\n\n')}

-- Подтверждаем транзакцию
COMMIT;

-- Включаем обратно проверки
SET session_replication_role = 'origin';

-- Обновляем статистику
ANALYZE ai_services;

-- Проверяем результат
SELECT 
  COUNT(*) as total_services,
  COUNT(DISTINCT ai_category) as unique_categories,
  AVG(rating) as avg_rating,
  SUM(bookmarks_count) as total_bookmarks
FROM ai_services;`;
  
  const megaFile = '/Users/cursor/Desktop/GigHub/scripts/MEGA_IMPORT.sql';
  fs.writeFileSync(megaFile, megaInsert);
  
  // Создаем также файл меньшего размера для тестирования (первые 100 записей)
  const firstBatch = fs.readFileSync('/Users/cursor/Desktop/GigHub/scripts/bulk_batch_1.sql', 'utf-8');
  const testInsert = `-- ТЕСТОВЫЙ ИМПОРТ (ПЕРВЫЕ 1000 ЗАПИСЕЙ)
-- Для проверки работоспособности

BEGIN;
${firstBatch}
COMMIT;

-- Проверяем результат
SELECT COUNT(*) as imported_records FROM ai_services WHERE sort_order BETWEEN 1 AND 1000;`;
  
  const testFile = '/Users/cursor/Desktop/GigHub/scripts/TEST_IMPORT.sql';
  fs.writeFileSync(testFile, testInsert);
  
  console.log(`\n✅ Создан мега-файл импорта: ${megaFile}`);
  console.log(`📊 Общее количество записей: ${totalRecords}`);
  console.log(`🧪 Создан тестовый файл: ${testFile}`);
  
  console.log('\n🎯 ИНСТРУКЦИИ ПО ИМПОРТУ:');
  console.log('1. Откройте Supabase Dashboard -> SQL Editor');
  console.log('2. Сначала выполните TEST_IMPORT.sql для проверки');
  console.log('3. Если тест успешен, выполните MEGA_IMPORT.sql');
  console.log('4. Процесс может занять несколько минут');
  console.log('5. Следите за прогрессом в консоли Supabase');
  
  // Создаем пошаговые инструкции
  const instructions = `🚀 ПОШАГОВЫЕ ИНСТРУКЦИИ ПО МАССОВОМУ ИМПОРТУ

📋 ЧТО У НАС ЕСТЬ:
✅ ${totalRecords} записей ИИ-сервисов готовы к импорту
✅ SQL файлы оптимизированы для быстрого выполнения
✅ Транзакции настроены для безопасности данных

🔥 ПЛАН ДЕЙСТВИЙ:

1️⃣ ТЕСТИРОВАНИЕ (2-3 минуты):
   • Откройте https://supabase.com/dashboard
   • Перейдите в SQL Editor
   • Скопируйте содержимое файла TEST_IMPORT.sql
   • Нажмите "Run" и дождитесь результата
   • Должно появиться: "imported_records: 1000"

2️⃣ ПОЛНЫЙ ИМПОРТ (5-10 минут):
   • В SQL Editor скопируйте содержимое MEGA_IMPORT.sql
   • Нажмите "Run" и ПОДОЖДИТЕ
   • НЕ закрывайте браузер во время выполнения
   • В конце должна появиться статистика:
     - total_services: ${totalRecords}
     - unique_categories: ~30
     - avg_rating: ~3.0
     - total_bookmarks: >50000

3️⃣ ПРОВЕРКА РЕЗУЛЬТАТА:
   • Откройте ваше приложение на localhost:3000
   • Проверьте каталог /ai-services
   • Должно отображаться ${Math.floor(totalRecords/1000)}K+ сервисов

⚠️  ВАЖНЫЕ ЗАМЕЧАНИЯ:
• Импорт занимает 5-10 минут - НЕ прерывайте процесс
• При ошибках сначала выполните TEST_IMPORT.sql
• Если тест не работает - проблема с базой данных
• При успехе теста можно смело запускать полный импорт

🎉 ПОСЛЕ ИМПОРТА:
У вас будет ${Math.floor(totalRecords/1000)}K+ ИИ-сервисов с:
• Логотипами и обложками
• Рейтингами и описаниями  
• Категориями и закладками
• Полной мультиязычной поддержкой

📞 В случае проблем сообщите:
• Текст ошибки из SQL Editor
• Номер строки где произошла ошибка
• Результат выполнения TEST_IMPORT.sql`;

  fs.writeFileSync('/Users/cursor/Desktop/GigHub/scripts/IMPORT_INSTRUCTIONS.md', instructions);
  
  console.log('\n📖 Подробные инструкции: IMPORT_INSTRUCTIONS.md');
  
  return {
    totalRecords,
    megaFile,
    testFile,
    instructionsFile: '/Users/cursor/Desktop/GigHub/scripts/IMPORT_INSTRUCTIONS.md'
  };
}

if (require.main === module) {
  createSuperImport();
}

module.exports = { createSuperImport }; 