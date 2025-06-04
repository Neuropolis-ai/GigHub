const fs = require('fs');

async function processBatch() {
  console.log('🚀 Подготовка батч-импорта...');
  
  const sqlFile = '/Users/cursor/Desktop/GigHub/scripts/import_data.sql';
  
  if (!fs.existsSync(sqlFile)) {
    console.error(`❌ Файл SQL не найден: ${sqlFile}`);
    return;
  }
  
  const sqlContent = fs.readFileSync(sqlFile, 'utf-8');
  const sqlCommands = sqlContent.split('\n\n').filter(cmd => cmd.trim() && cmd.includes('INSERT'));
  
  console.log(`📊 Найдено ${sqlCommands.length} SQL команд для импорта`);
  
  // Создаем батчи по 10 команд
  const batchSize = 10;
  const batches = [];
  
  for (let i = 0; i < sqlCommands.length; i += batchSize) {
    batches.push(sqlCommands.slice(i, i + batchSize));
  }
  
  console.log(`📦 Создано ${batches.length} батчей по ${batchSize} команд каждый`);
  
  // Сохраняем каждый батч в отдельный файл
  batches.forEach((batch, index) => {
    const batchContent = batch.join('\n\n');
    const batchFile = `/Users/cursor/Desktop/GigHub/scripts/batch_${index + 1}.sql`;
    fs.writeFileSync(batchFile, batchContent);
    console.log(`✅ Сохранен batch_${index + 1}.sql (${batch.length} команд)`);
  });
  
  console.log('\n🎯 Следующие шаги:');
  console.log('1. Импортируйте каждый батч через mcp_supabase_execute_sql');
  console.log('2. Начните с batch_1.sql и продолжайте по порядку');
  console.log('3. Мониторьте процесс и обрабатывайте ошибки');
  
  // Выводим первый батч для начала
  console.log('\n📝 Первый батч для импорта:');
  const firstBatch = fs.readFileSync('/Users/cursor/Desktop/GigHub/scripts/batch_1.sql', 'utf-8');
  console.log(firstBatch.substring(0, 1000) + '...');
}

if (require.main === module) {
  processBatch().catch(console.error);
}

module.exports = { processBatch }; 