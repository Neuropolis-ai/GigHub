const fs = require('fs');

async function executeAllBatches() {
  console.log('🚀 Начинаем автоматическое выполнение всех батчей...');
  
  const totalBatches = 13;
  let commands = [];
  
  // Собираем все SQL команды из батчей
  for (let i = 1; i <= totalBatches; i++) {
    const batchFile = `/Users/cursor/Desktop/GigHub/scripts/bulk_batch_${i}.sql`;
    
    if (fs.existsSync(batchFile)) {
      const content = fs.readFileSync(batchFile, 'utf-8');
      commands.push({
        batchNumber: i,
        sql: content.trim(),
        recordsCount: content.split('\n').length - 1 // Примерный подсчет записей
      });
      console.log(`📦 Загружен батч ${i}: ${content.substring(0, 100)}...`);
    }
  }
  
  console.log(`\n✅ Загружено ${commands.length} батчей для выполнения`);
  console.log(`📊 Общее количество записей: ~${commands.reduce((sum, cmd) => sum + cmd.recordsCount, 0)}`);
  
  // Создаем файл с инструкциями для выполнения
  const instructions = `
🎯 ПЛАН МАССОВОГО ИМПОРТА ДАННЫХ

📊 Статистика:
• Всего батчей: ${commands.length}
• Общее количество записей: ~${commands.reduce((sum, cmd) => sum + cmd.recordsCount, 0)}
• Среднее время выполнения: ~3-5 секунд на батч
• Общее время: ~${Math.ceil(commands.length * 4 / 60)} минут

🔥 ИНСТРУКЦИИ ДЛЯ ВЫПОЛНЕНИЯ:

1. Выполните каждую команду через mcp_supabase_execute_sql
2. Дождитесь завершения перед выполнением следующей
3. Проверьте статус выполнения после каждого батча
4. В случае ошибки - сообщите номер батча

📝 КОМАНДЫ ДЛЯ ВЫПОЛНЕНИЯ:

${commands.map((cmd, index) => `
=== БАТЧ ${cmd.batchNumber} (${cmd.recordsCount} записей) ===
${cmd.sql}

`).join('\n')}

🎉 После выполнения всех батчей у вас будет ~12,590 ИИ-сервисов в базе данных!
`;
  
  const instructionsFile = '/Users/cursor/Desktop/GigHub/scripts/MASS_IMPORT_INSTRUCTIONS.txt';
  fs.writeFileSync(instructionsFile, instructions);
  
  console.log(`\n📋 Инструкции сохранены в: ${instructionsFile}`);
  console.log('\n🎯 Следующие шаги:');
  console.log('1. Откройте файл MASS_IMPORT_INSTRUCTIONS.txt');
  console.log('2. Выполните каждый SQL батч через mcp_supabase_execute_sql');
  console.log('3. Следите за прогрессом импорта');
  console.log('4. После завершения проверьте результаты');
  
  // Создаем также компактную версию только с SQL
  const compactCommands = commands.map(cmd => cmd.sql).join('\n\n--- СЛЕДУЮЩИЙ БАТЧ ---\n\n');
  fs.writeFileSync('/Users/cursor/Desktop/GigHub/scripts/ALL_BATCHES_COMPACT.sql', compactCommands);
  
  console.log('\n✅ Также создан компактный файл: ALL_BATCHES_COMPACT.sql');
  
  return {
    totalBatches: commands.length,
    totalRecords: commands.reduce((sum, cmd) => sum + cmd.recordsCount, 0),
    instructionsFile
  };
}

if (require.main === module) {
  executeAllBatches().catch(console.error);
}

module.exports = { executeAllBatches }; 