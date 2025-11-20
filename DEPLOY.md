# 🚀 Guia de Deploy no Vercel

## ✅ Status Pré-Deploy

- ✅ Build passando localmente
- ✅ Middleware configurado
- ✅ Schema SQL pronto
- ✅ Scripts de seed prontos
- ✅ Variáveis de ambiente já conectadas pelo Vercel

---

## 📋 Deploy Passo a Passo

### **Opção 1: Deploy Automático (Recomendado)**

O Vercel já está monitorando este repositório. Qualquer push na branch `claude/explore-repo-contents-0176xyqfcZ5uAUtNSW5goFZM` dispara deploy automático!

**Status**: ✅ Já está configurado!

### **Opção 2: Deploy Manual via Dashboard**

1. Acesse: https://vercel.com/dashboard
2. Encontre o projeto: `cuidar-de-mim-app` (ou nome que você escolheu)
3. Clique em **"Redeploy"** se necessário
4. Aguarde 2-3 minutos

---

## 🔧 Configurações Necessárias no Vercel

### **1. Variáveis de Ambiente** (Já Configuradas ✅)

O Vercel já adicionou automaticamente:
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `SUPABASE_SERVICE_ROLE_KEY`
- ✅ `NEXT_PUBLIC_APP_URL`

**Importante**: Atualize `NEXT_PUBLIC_APP_URL` com a URL final do Vercel:
1. Após o primeiro deploy, copie a URL (ex: `https://seu-app.vercel.app`)
2. Vá em **Settings** → **Environment Variables**
3. Edite `NEXT_PUBLIC_APP_URL` para a URL do Vercel
4. Salve e faça **Redeploy**

---

## 🗄️ Configuração do Banco de Dados

### **Passo 1: Executar Schema SQL (Uma Vez)**

1. Acesse: https://app.supabase.com/project/_/sql
2. Copie **TODO** o conteúdo de `supabase-schema.sql`
3. Cole no SQL Editor
4. Clique em **Run** (Ctrl+Enter)
5. Aguarde ~10 segundos

✅ **Isso cria as 10 tabelas + funções + policies**

### **Passo 2: Popular Dados Iniciais**

Você pode fazer isso de **duas formas**:

#### **Forma A: Localmente (Recomendado)**
```bash
# No seu computador
npm run seed-data
```

#### **Forma B: Usando Vercel CLI**
```bash
# Instalar Vercel CLI (se não tiver)
npm i -g vercel

# Fazer login
vercel login

# Executar comando no Vercel
vercel env pull .env.local
npm run seed-data
```

Isso insere:
- 💜 10 práticas de autocuidado
- 💬 12 frases motivacionais

---

## ✅ Verificação Pós-Deploy

### **1. Testar o Site**

Acesse a URL do Vercel (ex: `https://seu-app.vercel.app`)

Você deve ver:
- ✅ Homepage com logo e botões "Entrar" e "Criar Conta"
- ✅ Página `/login` funcionando
- ✅ Página `/register` funcionando

### **2. Testar Autenticação**

1. Clique em **"Criar Conta"**
2. Preencha nome, email e senha
3. Clique em **"Criar conta"**
4. Deve criar a conta e redirecionar para onboarding

**Se der erro**: Verifique as variáveis de ambiente no Vercel

### **3. Verificar Logs**

Se algo der errado:
1. Vá em **Deployments** no Vercel
2. Clique no deploy mais recente
3. Vá em **Functions** → **Logs**
4. Veja os erros (se houver)

---

## 🐛 Troubleshooting

### **Erro: 404 NOT_FOUND**

**Causa**: Middleware sem variáveis de ambiente

**Solução**: ✅ Já corrigido! O middleware agora permite requisições sem env vars.

### **Erro: "Failed to fetch" no login**

**Causa**: Variáveis de ambiente incorretas

**Solução**:
1. Verifique no Vercel: **Settings** → **Environment Variables**
2. Confirme que `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` estão corretas
3. Faça **Redeploy**

### **Erro: "Table does not exist"**

**Causa**: Schema SQL não foi executado

**Solução**:
1. Execute o SQL no Supabase Dashboard (passo acima)
2. Verifique em **Database** → **Tables** se as 10 tabelas existem

### **Aviso: "middleware deprecated"**

**Não é um erro!** É apenas um aviso informativo. O middleware funciona normalmente.

---

## 🎯 Checklist Final

Antes de considerar o deploy completo:

- [ ] Deploy no Vercel concluído com sucesso
- [ ] Site acessível na URL do Vercel
- [ ] Variável `NEXT_PUBLIC_APP_URL` atualizada com URL do Vercel
- [ ] Schema SQL executado no Supabase
- [ ] Dados iniciais inseridos (10 práticas + 12 frases)
- [ ] Conta de teste criada com sucesso
- [ ] Login funcionando
- [ ] Sem erros nos logs do Vercel

---

## 📊 Monitoramento

### **Logs em Tempo Real**

```bash
# Instalar Vercel CLI
npm i -g vercel

# Ver logs em tempo real
vercel logs --follow
```

### **Analytics do Vercel**

Acesse: https://vercel.com/dashboard/analytics

Você verá:
- Número de visitantes
- Performance do site
- Erros (se houver)

---

## 🚀 Próximos Passos

Após o deploy bem-sucedido:

1. **Teste todas as páginas**:
   - Homepage `/`
   - Login `/login`
   - Registro `/register`

2. **Configure domínio customizado** (opcional):
   - Vá em **Settings** → **Domains**
   - Adicione seu domínio
   - Configure DNS

3. **Configure Google OAuth** (opcional):
   - No Supabase: **Authentication** → **Providers**
   - Habilite Google
   - Adicione URL do Vercel nos redirects

4. **Monitore erros**:
   - Use Vercel Analytics
   - Configure Sentry (opcional)

---

## 💡 Dicas

- **Deploy automático**: Cada push na branch dispara novo deploy
- **Preview deploys**: Branches diferentes criam URLs de preview
- **Rollback**: Você pode voltar para qualquer deploy anterior
- **Logs persistem**: Acesse logs antigos a qualquer momento

---

## 🎉 Pronto!

Seu MVP está no ar! 🚀

**URL do projeto**: Verifique no dashboard do Vercel

**Próximo desenvolvimento**: Implementar onboarding, dashboard e práticas interativas.

---

Precisa de ajuda? Verifique os logs ou entre em contato! 💜
