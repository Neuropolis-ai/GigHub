// Загружаем переменные окружения
require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

// Конфигурация Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function linkCategories() {
  try {
    console.log('🔗 Начинаем связку сервисов с категориями...');
    
    // Получаем все категории
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name');
    
    if (categoriesError) {
      throw new Error(`Ошибка получения категорий: ${categoriesError.message}`);
    }
    
    console.log(`📂 Найдено ${categories.length} категорий`);
    
    // Создаем маппинг имя категории -> id
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.name] = cat.id;
    });
    
    let totalProcessed = 0;
    let totalUpdated = 0;
    let totalNotFound = 0;
    let offset = 0;
    const pageSize = 1000;
    
    while (true) {
      // Получаем сервисы без category_id порциями
      const { data: services, error: servicesError } = await supabase
        .from('ai_services')
        .select('id, ai_category')
        .is('category_id', null)
        .range(offset, offset + pageSize - 1);
      
      if (servicesError) {
        throw new Error(`Ошибка получения сервисов: ${servicesError.message}`);
      }
      
      if (!services || services.length === 0) {
        console.log('📋 Все записи обработаны');
        break;
      }
      
      console.log(`🔧 Обрабатываем ${services.length} сервисов (offset: ${offset})`);
      
      let batchUpdated = 0;
      let batchNotFound = 0;
      
      // Обрабатываем текущую порцию
      for (const service of services) {
        const categoryId = categoryMap[service.ai_category];
        
        if (categoryId) {
          // Обновляем category_id
          const { error: updateError } = await supabase
            .from('ai_services')
            .update({ category_id: categoryId })
            .eq('id', service.id);
          
          if (updateError) {
            console.error(`❌ Ошибка обновления сервиса ${service.id}:`, updateError);
          } else {
            batchUpdated++;
          }
        } else {
          batchNotFound++;
          if (batchNotFound <= 5) { // Показываем только первые 5 не найденных
            console.log(`⚠️  Категория "${service.ai_category}" не найдена для сервиса ${service.id}`);
          }
        }
      }
      
      totalProcessed += services.length;
      totalUpdated += batchUpdated;
      totalNotFound += batchNotFound;
      
      console.log(`📊 Порция завершена: +${batchUpdated} обновлено, +${batchNotFound} без категорий`);
      console.log(`📈 Всего: ${totalProcessed} обработано, ${totalUpdated} обновлено, ${totalNotFound} без категорий`);
      
      offset += pageSize;
      
      // Прерываем если получили меньше записей чем ожидали
      if (services.length < pageSize) {
        break;
      }
    }
    
    console.log(`✅ Связка завершена! Всего обновлено ${totalUpdated} сервисов, ${totalNotFound} без категорий`);
    
  } catch (error) {
    console.error('💥 Фатальная ошибка:', error);
    process.exit(1);
  }
}

linkCategories(); 