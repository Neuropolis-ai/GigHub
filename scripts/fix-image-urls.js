// Загружаем переменные окружения
require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

// Конфигурация Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixImageUrls() {
  try {
    console.log('🔧 Исправляем protocol-relative URLs в базе данных...');
    
    let totalProcessed = 0;
    let totalUpdated = 0;
    let offset = 0;
    const pageSize = 1000;
    
    while (true) {
      // Получаем записи с protocol-relative URLs
      const { data: services, error: servicesError } = await supabase
        .from('ai_services')
        .select('id, logo_url, cover_url')
        .or('logo_url.like.//%, cover_url.like.//%')
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
      
      // Обрабатываем текущую порцию
      for (const service of services) {
        let needsUpdate = false;
        const updates = {};
        
        // Исправляем logo_url
        if (service.logo_url && service.logo_url.startsWith('//')) {
          updates.logo_url = `https:${service.logo_url}`;
          needsUpdate = true;
        }
        
        // Исправляем cover_url
        if (service.cover_url && service.cover_url.startsWith('//')) {
          updates.cover_url = `https:${service.cover_url}`;
          needsUpdate = true;
        }
        
        if (needsUpdate) {
          const { error: updateError } = await supabase
            .from('ai_services')
            .update(updates)
            .eq('id', service.id);
          
          if (updateError) {
            console.error(`❌ Ошибка обновления сервиса ${service.id}:`, updateError);
          } else {
            batchUpdated++;
          }
        }
      }
      
      totalProcessed += services.length;
      totalUpdated += batchUpdated;
      
      console.log(`📊 Порция завершена: +${batchUpdated} обновлено`);
      console.log(`📈 Всего: ${totalProcessed} обработано, ${totalUpdated} обновлено`);
      
      offset += pageSize;
      
      // Прерываем если получили меньше записей чем ожидали
      if (services.length < pageSize) {
        break;
      }
    }
    
    console.log(`✅ Исправление завершено! Всего обновлено ${totalUpdated} сервисов`);
    
  } catch (error) {
    console.error('💥 Фатальная ошибка:', error);
    process.exit(1);
  }
}

fixImageUrls(); 