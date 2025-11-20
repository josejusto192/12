# 💜 Cuidar de Mim Também é Amor

MVP de autocuidado para mulheres, mães e donas de casa no Brasil.

## 🚀 Stack Técnica

- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (Auth, Database, Storage, Row Level Security)
- **Hospedagem**: Vercel-ready

## 📋 Pré-requisitos

- Node.js 18+
- Conta no Supabase (gratuita)
- npm ou yarn

## ⚙️ Configuração Inicial

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Supabase

1. Crie um projeto no [Supabase](https://supabase.com)
2. Copie `.env.local.example` para `.env.local`
3. Preencha as variáveis de ambiente:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Executar Schema SQL

1. Abra o Supabase Dashboard
2. Vá em **SQL Editor**
3. Copie e execute o conteúdo de `supabase-schema.sql`
4. Isso criará todas as tabelas, índices, policies e funções

### 4. Configurar Google OAuth (Opcional)

1. No Supabase Dashboard, vá em **Authentication > Providers**
2. Habilite **Google**
3. Configure as credenciais do Google Cloud Console

### 5. Rodar o Projeto

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
/src
├── app/                    # Next.js App Router
│   ├── (auth)/            # Rotas de autenticação
│   │   ├── login/
│   │   └── register/
│   ├── (app)/             # Rotas protegidas
│   │   ├── dashboard/
│   │   ├── praticas/
│   │   ├── planner/
│   │   ├── progresso/
│   │   └── frases/
│   ├── onboarding/
│   └── auth/callback/
├── components/
│   ├── ui/                # Componentes shadcn/ui
│   ├── dashboard/
│   ├── practices/
│   ├── planner/
│   ├── progress/
│   └── quotes/
├── lib/
│   ├── supabase/          # Cliente Supabase
│   └── utils/             # Helpers e cálculos
├── types/
│   └── database.ts        # TypeScript types do schema
└── hooks/                 # Custom React hooks
```

## 🎯 Funcionalidades do MVP

### ✅ Implementado

1. **Setup Completo**
   - Next.js 14+ com TypeScript
   - Tailwind CSS configurado
   - shadcn/ui components
   - Supabase integrado

2. **Autenticação**
   - Login com email/senha
   - Registro de usuários
   - Google OAuth ready
   - Middleware de proteção de rotas

3. **Schema SQL Completo**
   - 10 tabelas
   - Row Level Security (RLS)
   - Índices otimizados
   - Função de cálculo de streak

### 🚧 A Implementar

1. **Onboarding** - Fluxo de 5-7 perguntas
2. **Dashboard** - Com check-in emocional, dimensões, hábitos
3. **Práticas** - Biblioteca e player com timer
4. **Planner** - Organização diária (manhã/tarde/noite)
5. **Progresso** - Gráficos e estatísticas
6. **Frases Motivacionais** - Sistema de frase do dia
7. **PWA** - Manifest e service worker
8. **Seed Data** - 10 práticas + 12 frases

## 📊 Schema do Banco de Dados

### Tabelas Principais

- **profiles** - Dados dos usuários e onboarding
- **practices** - 10 práticas de autocuidado
- **completed_practices** - Histórico de práticas
- **emotional_checkins** - Check-ins emocionais diários
- **daily_habits** - Tracking de água, sono, exercício
- **planner_tasks** - Tarefas do planner digital
- **daily_reflections** - Reflexões diárias
- **motivational_quotes** - Frases motivacionais
- **favorite_quotes** - Frases favoritas
- **dimension_progress** - Progresso das 5 dimensões

### 5 Dimensões do Autocuidado

1. 💜 **Emocional** - Mindfulness, autoconhecimento
2. 💪 **Físico** - Movimento, sono, nutrição
3. 🧠 **Intelectual** - Criatividade, aprendizado
4. ✨ **Espiritual** - Conexão, propósito
5. 👥 **Social** - Relacionamentos, comunidade

## 🔒 Segurança

- Row Level Security (RLS) habilitado
- Policies configuradas por usuário
- Middleware de autenticação
- Variáveis de ambiente protegidas

## 🚀 Deploy na Vercel

1. Conecte este repositório no Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push!

```bash
# Opcional: Preview antes do deploy
vercel
```

## 📝 Próximos Passos

Para continuar o desenvolvimento:

1. Implementar o fluxo de onboarding
2. Criar componentes do dashboard
3. Desenvolver sistema de práticas
4. Adicionar seed data no Supabase
5. Implementar gráficos de progresso
6. Configurar PWA
7. Testes com usuárias reais

## 📚 Documentação

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

## 🤝 Contribuindo

Este é um MVP em desenvolvimento. Sugestões e melhorias são bem-vindas!

## 📄 Licença

ISC

---

Feito com 💜 para mulheres que merecem se priorizar
