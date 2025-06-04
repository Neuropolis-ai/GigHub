const fs = require('fs');

// Функция для создания SQL-команд для следующих батчей
function continueImport() {
  console.log('🚀 Продолжаем импорт данных...');
  
  const commandsFile = '/Users/cursor/Desktop/GigHub/scripts/mass_import_commands.txt';
  
  if (!fs.existsSync(commandsFile)) {
    console.error(`❌ Файл команд не найден: ${commandsFile}`);
    return;
  }
  
  const content = fs.readFileSync(commandsFile, 'utf-8');
  const allCommands = content.split('\n\n').filter(cmd => cmd.trim() && cmd.includes('INSERT'));
  
  console.log(`📊 Всего команд в файле: ${allCommands.length}`);
  
  // Пропускаем уже выполненные команды (первые 10-15) и берем следующие 20
  const startIndex = 15; // Пропускаем уже выполненные
  const batchSize = 20;   // Импортируем по 20 записей
  
  const nextBatch = allCommands.slice(startIndex, startIndex + batchSize);
  
  console.log(`\n📝 Команды для выполнения (${nextBatch.length} штук):`);
  console.log('Скопируйте и выполните каждую команду через mcp_supabase_execute_sql:\n');
  
  nextBatch.forEach((cmd, index) => {
    console.log(`--- Команда ${index + 1} ---`);
    console.log(cmd.trim());
    console.log('\n');
  });
  
  // Сохраняем следующий батч в отдельный файл
  const nextBatchFile = '/Users/cursor/Desktop/GigHub/scripts/next_batch_import.txt';
  fs.writeFileSync(nextBatchFile, nextBatch.join('\n\n'));
  
  console.log(`✅ Следующий батч сохранен в ${nextBatchFile}`);
  console.log(`📈 Импортируем записи с ${startIndex + 1} по ${startIndex + nextBatch.length}`);
  
  return {
    totalCommands: allCommands.length,
    startIndex: startIndex + 1,
    endIndex: startIndex + nextBatch.length,
    batchSize: nextBatch.length,
    nextBatchFile
  };
}

if (require.main === module) {
  continueImport();
}

module.exports = { continueImport }; 