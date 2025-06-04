const fs = require('fs');

async function executeBatch() {
  console.log('🚀 Импорт всех записей из CSV файла...');
  
  const sqlFile = '/Users/cursor/Desktop/GigHub/scripts/import_data.sql';
  
  if (!fs.existsSync(sqlFile)) {
    console.error(`❌ Файл SQL не найден: ${sqlFile}`);
    return;
  }
  
  const sqlContent = fs.readFileSync(sqlFile, 'utf-8');
  const sqlCommands = sqlContent.split('\n\n').filter(cmd => cmd.trim());
  
  console.log(`📊 Найдено ${sqlCommands.length} SQL команд для выполнения`);
  
  // Выводим каждую команду для выполнения через MCP
  console.log('\n📝 SQL команды для выполнения через MCP Supabase:');
  console.log('Скопируйте и выполните каждую команду через mcp_supabase_execute_sql\n');
  
  sqlCommands.forEach((cmd, index) => {
    console.log(`--- Команда ${index + 1} ---`);
    console.log(cmd.substring(0, 500) + (cmd.length > 500 ? '...' : ''));
    console.log('');
  });
  
  console.log(`\n✅ Всего команд для импорта: ${sqlCommands.length}`);
  console.log('💡 Совет: Выполните команды по батчам через MCP для надежности');
}

if (require.main === module) {
  executeBatch().catch(console.error);
}

module.exports = { executeBatch }; 