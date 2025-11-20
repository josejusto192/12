# 🚀 Setup Rápido do Banco de Dados

## Opção 1: Automático (Recomendado) ⚡

Infelizmente, o Supabase não permite executar SQL arbitrário via API por questões de segurança. Mas criei scripts que **facilitam muito** o processo!

### Passo a Passo:

```bash
# 1. Verificar se as variáveis de ambiente estão configuradas
npm run setup-db

# 2. Se as tabelas não existirem, execute o SQL uma única vez:
#    - Acesse: https://app.supabase.com/project/_/sql
#    - Copie TODO o conteúdo de: supabase-schema.sql
#    - Cole e execute no SQL Editor
#    - Aguarde a confirmação

# 3. Popular o banco com dados iniciais (10 práticas + 12 frases)
npm run seed-data

# 4. Pronto! Iniciar o servidor
npm run dev
```

---

## Opção 2: Manual (Se preferir) 📝

### 1. Configurar Variáveis de Ambiente

Copie `.env.local.example` para `.env.local` e preencha:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Executar Schema SQL

1. Acesse: https://app.supabase.com/project/_/sql
2. Abra o arquivo: `supabase-schema.sql`
3. Copie **TODO** o conteúdo (Ctrl+A, Ctrl+C)
4. Cole no SQL Editor do Supabase
5. Clique em **Run** (Ctrl+Enter)
6. Aguarde a mensagem de sucesso

### 3. Popular Dados Iniciais

```bash
npm run seed-data
```

Isso vai inserir:
- ✅ 10 práticas de autocuidado
- ✅ 12 frases motivacionais

---

## ✅ Verificação

Execute para verificar se tudo está OK:

```bash
npm run setup-db
```

Você deve ver:
```
✓ Tabela profiles OK
✓ Tabela practices OK
✓ Tabela completed_practices OK
✓ Tabela emotional_checkins OK
✓ Tabela daily_habits OK
✓ Tabela planner_tasks OK
✓ Tabela daily_reflections OK
✓ Tabela motivational_quotes OK
✓ Tabela favorite_quotes OK
✓ Tabela dimension_progress OK
```

---

## 🎯 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run setup-db` | Verifica se as tabelas existem |
| `npm run seed-data` | Insere práticas e frases |
| `npm run setup` | Executa setup-db + seed-data |
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Build de produção |

---

## 🐛 Problemas Comuns

### "Variáveis de ambiente não encontradas"
- Certifique-se de ter o arquivo `.env.local` na raiz do projeto
- Verifique se copiou as credenciais corretas do Supabase

### "Tabela X não encontrada"
- Execute o SQL manualmente no Supabase Dashboard
- O arquivo está em: `supabase-schema.sql`

### "Erro ao inserir práticas/frases"
- Verifique se as tabelas foram criadas
- Execute: `npm run setup-db` para verificar

---

## 📚 Próximos Passos

Depois de configurar o banco:

1. ✅ Execute: `npm run dev`
2. ✅ Acesse: http://localhost:3000
3. ✅ Crie uma conta de teste
4. ✅ Explore o app!

---

**Nota**: Por questões de segurança, o Supabase não permite executar SQL via API. É necessário executar o schema SQL **uma única vez** manualmente no dashboard. Depois disso, os scripts automatizam todo o resto! 💜
