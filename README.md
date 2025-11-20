# 💜 Cuidar de Mim Também é Amor

MVP de autocuidado para mulheres, mães e donas de casa no Brasil.

## 🚀 Stack Técnica

- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (Auth, Database, Storage, Row Level Security)
- **Hospedagem**: Vercel-ready

---

## ✅ Status do Projeto

**Build**: ✅ Passando
**Deploy**: ✅ Pronto para Vercel
**Autenticação**: ✅ Implementada
**Database Schema**: ✅ Completo

---

## 📋 Pré-requisitos

- Node.js 18+
- Conta no Supabase (gratuita)
- npm ou yarn

---

## ⚙️ Configuração Inicial

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Supabase

#### Passo 1: Criar Projeto no Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Preencha os dados e aguarde a criação

#### Passo 2: Executar o Schema SQL
1. No dashboard do Supabase, vá em **SQL Editor**
2. Abra o arquivo `supabase-schema.sql` deste projeto
3. Copie **TODO** o conteúdo
4. Cole no SQL Editor e clique em **Run**
5. Verifique se todas as tabelas foram criadas em **Database > Tables**

#### Passo 3: Configurar Variáveis de Ambiente

1. Copie o arquivo de exemplo:
```bash
cp .env.local.example .env.local
```

2. No Supabase, vá em **Settings > API**
3. Copie as credenciais e cole no `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Rodar o Projeto

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deploy na Vercel

### Opção 1: Via Dashboard (Recomendado)

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **Add New Project**
3. Importe este repositório
4. Selecione a branch: `claude/explore-repo-contents-0176xyqfcZ5uAUtNSW5goFZM`
5. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_APP_URL` (use a URL do Vercel)
6. Clique em **Deploy**

### Opção 2: Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configurar variáveis de ambiente
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add NEXT_PUBLIC_APP_URL

# Deploy para produção
vercel --prod
```

---

## 📊 Schema do Banco de Dados

### Tabelas Principais

| Tabela | Descrição |
|--------|-----------|
| `profiles` | Dados dos usuários e onboarding |
| `practices` | 10 práticas de autocuidado |
| `completed_practices` | Histórico de práticas completadas |
| `emotional_checkins` | Check-ins emocionais diários |
| `daily_habits` | Tracking de água, sono, exercício |
| `planner_tasks` | Tarefas do planner digital |
| `daily_reflections` | Reflexões diárias |
| `motivational_quotes` | Frases motivacionais |
| `favorite_quotes` | Frases favoritas |
| `dimension_progress` | Progresso das 5 dimensões |

### 5 Dimensões do Autocuidado

1. 💜 **Emocional** - Mindfulness, autoconhecimento
2. 💪 **Físico** - Movimento, sono, nutrição
3. 🧠 **Intelectual** - Criatividade, aprendizado
4. ✨ **Espiritual** - Conexão, propósito
5. 👥 **Social** - Relacionamentos, comunidade

---

## 📁 Estrutura do Projeto

```
/src
├── app/                    # Next.js App Router
│   ├── (auth)/            # Rotas de autenticação
│   │   ├── login/         # Página de login
│   │   └── register/      # Página de registro
│   ├── auth/callback/     # OAuth callback
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout raiz
│   └── page.tsx           # Landing page
├── components/
│   └── ui/                # Componentes shadcn/ui
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── progress.tsx
│       ├── badge.tsx
│       ├── textarea.tsx
│       └── checkbox.tsx
├── lib/
│   ├── supabase/          # Cliente Supabase
│   │   ├── client.ts      # Browser client
│   │   └── server.ts      # Server client
│   └── utils/             # Helpers
│       ├── calculations.ts # Lógica de negócio
│       └── date-helpers.ts # Formatação de datas
├── types/
│   └── database.ts        # TypeScript types do schema
└── middleware.ts          # Proteção de rotas
```

---

## 🔒 Segurança

- ✅ Row Level Security (RLS) habilitado
- ✅ Policies configuradas por usuário
- ✅ Middleware de autenticação
- ✅ Variáveis de ambiente protegidas
- ✅ HTTPS obrigatório em produção

---

## 🎨 Design System

### Cores

```css
--primary: #FF1493      /* Rosa/Magenta */
--secondary: #9370DB    /* Roxo/Lavanda */
--accent: #F5F5DC       /* Bege/Creme */
--background: #FAFAFA   /* Branco suave */
```

### Componentes

Usando shadcn/ui para UI consistente e acessível:
- Buttons, Cards, Inputs
- Progress bars, Badges
- Textareas, Checkboxes

---

## 📋 Funcionalidades Implementadas

### ✅ Concluído

1. **Setup Completo**
   - Next.js 14+ com TypeScript
   - Tailwind CSS v4 configurado
   - shadcn/ui components
   - Supabase integrado

2. **Autenticação**
   - Login com email/senha
   - Registro de usuários
   - Google OAuth ready
   - Middleware de proteção de rotas
   - Callback handler

3. **Schema SQL Completo**
   - 10 tabelas com relacionamentos
   - Row Level Security (RLS)
   - Índices otimizados
   - Função de cálculo de streak
   - Trigger automático de perfil

4. **Helpers e Utilitários**
   - Cálculo de streak
   - Progresso das dimensões
   - Recomendação de práticas
   - Formatação de datas em PT-BR

### 🚧 A Implementar

1. **Onboarding** - Fluxo de 5-7 perguntas
2. **Dashboard** - Check-in emocional, dimensões, hábitos
3. **Práticas** - Biblioteca e player com timer
4. **Planner** - Organização diária (manhã/tarde/noite)
5. **Progresso** - Gráficos e estatísticas
6. **Frases Motivacionais** - Sistema de frase do dia
7. **PWA** - Manifest e service worker
8. **Seed Data** - 10 práticas + 12 frases

---

## 🐛 Troubleshooting

### Build Errors

**Problema**: `Cannot apply unknown utility class border-border`
**Solução**: ✅ Já corrigido! Removemos `@apply border-border` do CSS global.

**Problema**: Erros de tipo do Supabase
**Solução**: ✅ Já corrigido! Adicionamos tipagens explícitas nas funções.

### Variáveis de Ambiente

Se o projeto não conectar ao Supabase:
1. Verifique se `.env.local` existe
2. Confirme que as variáveis estão corretas
3. Reinicie o servidor de desenvolvimento

### Middleware Warning

O aviso sobre middleware deprecated é normal e não afeta o funcionamento:
```
⚠ The "middleware" file convention is deprecated. Please use "proxy" instead.
```

Isso será atualizado em uma versão futura do Next.js.

---

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar em produção
npm start

# Lint
npm run lint
```

---

## 🔄 Atualizações Recentes

### v1.0.1 (Atual)
- ✅ Corrigido erro de build do Tailwind CSS v4
- ✅ Corrigido erros de TypeScript nas funções de cálculo
- ✅ Build passando com sucesso
- ✅ Deploy ready para Vercel

### v1.0.0
- ✅ Setup inicial do projeto
- ✅ Autenticação implementada
- ✅ Schema SQL completo
- ✅ Estrutura base criada

---

## 📚 Documentação

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

---

## 🤝 Contribuindo

Este é um MVP em desenvolvimento ativo. Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

ISC

---

## 📞 Suporte

Se precisar de ajuda:
- Verifique a documentação no `README.md`
- Consulte o schema SQL com comentários
- Revise os comentários no código
- Abra uma issue no GitHub

---

## ✨ Próximos Passos Recomendados

1. **Configure o Supabase** - Execute o schema SQL
2. **Configure Google OAuth** (opcional) - Para login social
3. **Implemente o Onboarding** - Primeira experiência do usuário
4. **Adicione Seed Data** - 10 práticas e 12 frases
5. **Crie o Dashboard** - Experiência principal

---

Feito com 💜 para mulheres que merecem se priorizar
