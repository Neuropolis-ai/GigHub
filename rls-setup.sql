-- ===========================================
-- НАСТРОЙКА ROW LEVEL SECURITY ДЛЯ ПРОЕКТА GIGHUB
-- ===========================================
-- Выполните эти команды в Supabase SQL Editor
-- Dashboard -> SQL Editor -> New Query

-- ===========================================
-- ЗАДАЧА 4: Включение RLS на всех таблицах
-- ===========================================

-- 4.2: Включить RLS на таблице ai_services
ALTER TABLE ai_services ENABLE ROW LEVEL SECURITY;

-- 4.3: Включить RLS на таблице categories  
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- ===========================================
-- ЗАДАЧА 5: Создание системы аутентификации
-- ===========================================

-- 5.1: Создать таблицу profiles (если еще нет)
-- Supabase создает auth.users автоматически
-- Создаем профили пользователей
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включить RLS на таблице profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- ===========================================
-- ЗАДАЧА 6: Политики RLS для ai_services
-- ===========================================

-- 6.1: Политика чтения для всех пользователей (публичные данные)
CREATE POLICY "ai_services_select_public" ON ai_services
  FOR SELECT TO anon, authenticated
  USING (status = 'active');

-- 6.2: Политика вставки только для аутентифицированных пользователей
CREATE POLICY "ai_services_insert_auth" ON ai_services
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- 6.3: Политика обновления только для владельцев или админов
CREATE POLICY "ai_services_update_owner_admin" ON ai_services
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND (profiles.role = 'admin' OR profiles.role = 'moderator')
    )
  );

-- 6.4: Политика удаления только для админов
CREATE POLICY "ai_services_delete_admin" ON ai_services
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- ===========================================
-- ЗАДАЧА 7: Политики RLS для categories
-- ===========================================

-- 7.1: Политика чтения для всех
CREATE POLICY "categories_select_all" ON categories
  FOR SELECT TO anon, authenticated
  USING (true);

-- 7.2: Политики CUD только для админов
CREATE POLICY "categories_insert_admin" ON categories
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "categories_update_admin" ON categories
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "categories_delete_admin" ON categories
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- ===========================================
-- ЗАДАЧА 8: Политики для profiles
-- ===========================================

-- 8.1: Политика для просмотра собственного профиля
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

-- 8.2: Политика для обновления собственного профиля
CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

-- 8.3: Политика для вставки собственного профиля (при регистрации)
CREATE POLICY "profiles_insert_own" ON profiles
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

-- 8.4: Админы могут видеть всех пользователей
CREATE POLICY "profiles_admin_view_all" ON profiles
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles admin_profile
      WHERE admin_profile.id = auth.uid() 
      AND admin_profile.role = 'admin'
    )
  );

-- ===========================================
-- ТРИГГЕРЫ ДЛЯ АВТОМАТИЧЕСКОГО СОЗДАНИЯ ПРОФИЛЯ
-- ===========================================

-- Функция для создания профиля при регистрации
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Триггер на создание нового пользователя
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ===========================================
-- RPC ФУНКЦИИ ДЛЯ АДМИНСКИХ ОПЕРАЦИЙ
-- ===========================================

-- Функция для получения всех пользователей (только для админов)
CREATE OR REPLACE FUNCTION get_all_users()
RETURNS TABLE (
  id UUID,
  email TEXT,
  full_name TEXT,
  role TEXT,
  created_at TIMESTAMPTZ
) 
LANGUAGE sql SECURITY DEFINER
AS $$
  SELECT p.id, p.email, p.full_name, p.role, p.created_at
  FROM profiles p
  WHERE EXISTS (
    SELECT 1 FROM profiles admin_profile
    WHERE admin_profile.id = auth.uid() 
    AND admin_profile.role = 'admin'
  );
$$;

-- Функция для изменения роли пользователя (только для админов)
CREATE OR REPLACE FUNCTION change_user_role(user_id UUID, new_role TEXT)
RETURNS BOOLEAN
LANGUAGE sql SECURITY DEFINER
AS $$
  UPDATE profiles 
  SET role = new_role, updated_at = NOW()
  WHERE id = user_id
  AND EXISTS (
    SELECT 1 FROM profiles admin_profile
    WHERE admin_profile.id = auth.uid() 
    AND admin_profile.role = 'admin'
  );
  
  SELECT FOUND;
$$;

-- ===========================================
-- ПРОВЕРКА НАСТРОЕК RLS
-- ===========================================

-- Проверить, что RLS включен на всех таблицах
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('ai_services', 'categories', 'profiles');

-- Показать все политики
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE schemaname = 'public';

-- ===========================================
-- ИНСТРУКЦИИ ПО ВЫПОЛНЕНИЮ
-- ===========================================

-- 1. Скопируйте и выполните эти команды в Supabase SQL Editor
-- 2. Выполняйте по частям, проверяя результат каждой секции
-- 3. После выполнения проверьте политики в Dashboard -> Authentication -> Policies
-- 4. Убедитесь, что RLS включен на всех таблицах в Dashboard -> Database -> Tables
-- 5. Протестируйте доступ через anon и authenticated соединения 