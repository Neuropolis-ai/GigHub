const fs = require('fs');

async function massImport() {
  console.log('🚀 Начинаем массовый импорт данных...');
  
  // Найти все файлы батчей
  const batchFiles = [];
  for (let i = 4; i <= 100; i++) {
    const filePath = `/Users/cursor/Desktop/GigHub/scripts/batch_${i}.sql`;
    if (fs.existsSync(filePath)) {
      batchFiles.push(filePath);
    }
  }
  
  console.log(`📦 Найдено ${batchFiles.length} файлов батчей для импорта`);
  
  let totalCommands = 0;
  let commandsToExecute = [];
  
  // Читаем каждый батч и извлекаем команды
  for (const batchFile of batchFiles.slice(0, 20)) { // Берем первые 20 батчей для начала
    const content = fs.readFileSync(batchFile, 'utf-8');
    const commands = content.split('\n\n').filter(cmd => cmd.trim() && cmd.includes('INSERT'));
    
    commands.forEach(cmd => {
      // Упрощаем команду для выполнения через MCP
      const cleanCmd = cmd.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
      if (cleanCmd.length > 0) {
        commandsToExecute.push(cleanCmd);
        totalCommands++;
      }
    });
  }
  
  console.log(`📊 Подготовлено ${totalCommands} команд для выполнения`);
  
  // Сохраняем команды в файл для последующего выполнения
  const outputFile = '/Users/cursor/Desktop/GigHub/scripts/mass_import_commands.txt';
  fs.writeFileSync(outputFile, commandsToExecute.join('\n\n'));
  
  console.log(`✅ Команды сохранены в ${outputFile}`);
  console.log('\n🎯 Следующие шаги:');
  console.log('1. Выполните команды через mcp_supabase_execute_sql');
  console.log('2. Мониторьте процесс импорта');
  console.log('3. Проверяйте ошибки и корректируйте при необходимости');
  
  // Выводим первые несколько команд
  console.log('\n📝 Примеры команд для выполнения:');
  commandsToExecute.slice(0, 3).forEach((cmd, index) => {
    console.log(`${index + 1}. ${cmd.substring(0, 200)}...`);
  });
  
  return {
    totalCommands,
    outputFile,
    commandsPreview: commandsToExecute.slice(0, 10)
  };
}

if (require.main === module) {
  massImport().catch(console.error);
}

module.exports = { massImport }; 