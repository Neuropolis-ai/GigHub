// Загружаем переменные окружения
require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

// Конфигурация Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkDatabase() {
  try {
    console.log('🔍 Проверяем базу данных...');
    
    // Проверяем общее количество записей в ai_services
    const { count: totalServices, error: servicesError } = await supabase
      .from('ai_services')
      .select('*', { count: 'exact', head: true });
    
    if (servicesError) {
      console.error('❌ Ошибка при подсчете сервисов:', servicesError);
    } else {
      console.log(`📊 Всего сервисов в базе: ${totalServices}`);
    }
    
    // Проверяем количество категорий
    const { count: totalCategories, error: categoriesError } = await supabase
      .from('categories')
      .select('*', { count: 'exact', head: true });
    
    if (categoriesError) {
      console.error('❌ Ошибка при подсчете категорий:', categoriesError);
    } else {
      console.log(`📂 Всего категорий в базе: ${totalCategories}`);
    }
    
    // Проверяем сколько сервисов имеют category_id
    const { count: servicesWithCategory, error: categoryLinkError } = await supabase
      .from('ai_services')
      .select('*', { count: 'exact', head: true })
      .not('category_id', 'is', null);
    
    if (categoryLinkError) {
      console.error('❌ Ошибка при подсчете связанных сервисов:', categoryLinkError);
    } else {
      console.log(`🔗 Сервисов с category_id: ${servicesWithCategory}`);
    }
    
    // Проверяем последние 5 записей
    const { data: latestServices, error: latestError } = await supabase
      .from('ai_services')
      .select('id, title, ai_category, category_id, created_at')
      .order('created_at', { ascending: false })
      .limit(5);
    
    if (latestError) {
      console.error('❌ Ошибка при получении последних записей:', latestError);
    } else {
      console.log('📝 Последние 5 записей:');
      latestServices.forEach((service, index) => {
        console.log(`  ${index + 1}. ${service.title} (ID: ${service.id}, Категория: ${service.ai_category}, Category_ID: ${service.category_id})`);
      });
    }
    
  } catch (error) {
    console.error('💥 Фатальная ошибка:', error);
  }
}

checkDatabase(); 