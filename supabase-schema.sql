-- ============================================
-- SCHEMA SQL COMPLETO PARA SUPABASE
-- Aplicativo: Cuidar de Mim Também é Amor
-- ============================================

-- Habilitar extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABELAS
-- ============================================

-- TABELA: profiles (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  is_mother BOOLEAN DEFAULT false,
  children_count INTEGER,
  children_ages TEXT[],
  main_difficulty TEXT[],
  available_time INTEGER, -- em minutos
  preferred_time TIME,
  interest_areas TEXT[],
  onboarding_completed BOOLEAN DEFAULT false,
  subscription_status TEXT DEFAULT 'free', -- 'free', 'premium', 'vip'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- TABELA: practices (seed data)
CREATE TABLE practices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  dimension TEXT NOT NULL, -- 'emocional', 'fisico', 'intelectual', 'espiritual', 'social'
  duration_minutes INTEGER NOT NULL,
  description TEXT NOT NULL,
  instructions JSONB NOT NULL, -- array de strings
  reflection_prompt TEXT,
  order_index INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- TABELA: completed_practices
CREATE TABLE completed_practices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  practice_id UUID REFERENCES practices(id),
  completed_at TIMESTAMP DEFAULT NOW(),
  reflection_text TEXT,
  date DATE DEFAULT CURRENT_DATE
);

-- INDEX para buscar práticas completadas por usuário e data
CREATE INDEX idx_completed_practices_user_date ON completed_practices(user_id, date);

-- TABELA: emotional_checkins
CREATE TABLE emotional_checkins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE DEFAULT CURRENT_DATE,
  time TIME DEFAULT CURRENT_TIME,
  mood TEXT NOT NULL, -- 'very_happy', 'happy', 'neutral', 'sad', 'very_sad'
  mood_emoji TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- INDEX para buscar checkins por usuário e data
CREATE INDEX idx_emotional_checkins_user_date ON emotional_checkins(user_id, date);

-- TABELA: daily_habits
CREATE TABLE daily_habits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE DEFAULT CURRENT_DATE,
  water_glasses INTEGER DEFAULT 0,
  good_sleep BOOLEAN,
  exercised BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- TABELA: planner_tasks
CREATE TABLE planner_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE DEFAULT CURRENT_DATE,
  period TEXT NOT NULL, -- 'morning', 'afternoon', 'night'
  description TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- INDEX para buscar tarefas por usuário e data
CREATE INDEX idx_planner_tasks_user_date ON planner_tasks(user_id, date);

-- TABELA: daily_reflections
CREATE TABLE daily_reflections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE DEFAULT CURRENT_DATE,
  general_notes TEXT,
  gratitude TEXT,
  mood_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- TABELA: motivational_quotes (seed data)
CREATE TABLE motivational_quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  text TEXT NOT NULL,
  author TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- TABELA: favorite_quotes
CREATE TABLE favorite_quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  quote_id UUID REFERENCES motivational_quotes(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, quote_id)
);

-- TABELA: dimension_progress (calculado dinamicamente ou cached)
CREATE TABLE dimension_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  dimension TEXT NOT NULL,
  percentage INTEGER DEFAULT 0,
  last_practice_date DATE,
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, dimension)
);

-- ============================================
-- FUNÇÕES
-- ============================================

-- FUNÇÃO para calcular streak (sequência de dias)
CREATE OR REPLACE FUNCTION calculate_user_streak(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  streak_count INTEGER := 0;
  current_date DATE := CURRENT_DATE;
BEGIN
  LOOP
    IF EXISTS (
      SELECT 1 FROM completed_practices
      WHERE user_id = p_user_id
      AND date = current_date
    ) THEN
      streak_count := streak_count + 1;
      current_date := current_date - 1;
    ELSE
      EXIT;
    END IF;
  END LOOP;
  RETURN streak_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE completed_practices ENABLE ROW LEVEL SECURITY;
ALTER TABLE emotional_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE planner_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_reflections ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorite_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE dimension_progress ENABLE ROW LEVEL SECURITY;

-- Policies: usuários só podem ver/editar seus próprios dados
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own completed practices" ON completed_practices FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own completed practices" ON completed_practices FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own checkins" ON emotional_checkins FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own checkins" ON emotional_checkins FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own habits" ON daily_habits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own habits" ON daily_habits FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own habits" ON daily_habits FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own planner tasks" ON planner_tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own planner tasks" ON planner_tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own planner tasks" ON planner_tasks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own planner tasks" ON planner_tasks FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own reflections" ON daily_reflections FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own reflections" ON daily_reflections FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reflections" ON daily_reflections FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own favorite quotes" ON favorite_quotes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own favorite quotes" ON favorite_quotes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own favorite quotes" ON favorite_quotes FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own dimension progress" ON dimension_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own dimension progress" ON dimension_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own dimension progress" ON dimension_progress FOR UPDATE USING (auth.uid() = user_id);

-- Practices e quotes são públicas (read-only)
CREATE POLICY "Anyone can view practices" ON practices FOR SELECT USING (true);
CREATE POLICY "Anyone can view quotes" ON motivational_quotes FOR SELECT USING (true);

-- ============================================
-- TRIGGER para criar perfil após signup
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'name', ''), new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- COMENTÁRIOS
-- ============================================

COMMENT ON TABLE profiles IS 'Perfis dos usuários com dados de onboarding';
COMMENT ON TABLE practices IS 'Biblioteca de 10 práticas de autocuidado';
COMMENT ON TABLE completed_practices IS 'Histórico de práticas completadas pelos usuários';
COMMENT ON TABLE emotional_checkins IS 'Check-ins emocionais diários';
COMMENT ON TABLE daily_habits IS 'Tracking de hábitos diários (água, sono, exercício)';
COMMENT ON TABLE planner_tasks IS 'Tarefas do planner digital (manhã/tarde/noite)';
COMMENT ON TABLE daily_reflections IS 'Reflexões diárias dos usuários';
COMMENT ON TABLE motivational_quotes IS 'Frases motivacionais';
COMMENT ON TABLE favorite_quotes IS 'Frases favoritadas pelos usuários';
COMMENT ON TABLE dimension_progress IS 'Progresso das 5 dimensões de autocuidado';
