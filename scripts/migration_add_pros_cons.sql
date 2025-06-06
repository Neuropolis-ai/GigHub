-- МИГРАЦИЯ: Добавление полей плюсов и минусов ИИ-сервисов
-- Применить через Supabase Dashboard: https://supabase.com/dashboard/project/zbpjqtflpvbsqcccqlqs/sql

BEGIN;

-- Добавляем поля для плюсов и минусов сервисов
ALTER TABLE ai_services 
ADD COLUMN IF NOT EXISTS pros_ru TEXT,
ADD COLUMN IF NOT EXISTS cons_ru TEXT;

-- Добавляем комментарии к полям
COMMENT ON COLUMN ai_services.pros_ru IS 'Плюсы и преимущества ИИ-сервиса на русском языке';
COMMENT ON COLUMN ai_services.cons_ru IS 'Минусы и недостатки ИИ-сервиса на русском языке';

-- Создаем индексы для полнотекстового поиска
CREATE INDEX IF NOT EXISTS idx_ai_services_pros_ru_gin ON ai_services USING gin(to_tsvector('russian', pros_ru));
CREATE INDEX IF NOT EXISTS idx_ai_services_cons_ru_gin ON ai_services USING gin(to_tsvector('russian', cons_ru));

COMMIT;

-- Проверяем что поля добавлены
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'ai_services' 
AND column_name IN ('pros_ru', 'cons_ru'); 