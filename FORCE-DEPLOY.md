# ✅ Instruções para Forçar Deploy no Vercel

## 🔧 Configurações Necessárias no Dashboard do Vercel

Se o deploy automático não está funcionando, você precisa configurar manualmente no Vercel:

### **1. Verificar Configurações do Git**

1. Acesse: https://vercel.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings** → **Git**
4. Verifique:
   - ✅ **Production Branch**: Deve ser `claude/explore-repo-contents-0176xyqfcZ5uAUtNSW5goFZM` OU `main`
   - ✅ **Automatic Deployments**: Deve estar ENABLED

### **2. Configurar a Branch para Deploy**

Se a branch atual não está configurada:

1. Em **Settings** → **Git**
2. Em **Production Branch**, adicione: `claude/explore-repo-contents-0176xyqfcZ5uAUtNSW5goFZM`
3. Ou mude para usar a branch `main` como produção
4. Salve as alterações

### **3. Forçar Deploy Manual**

Enquanto isso, você pode forçar o deploy manualmente:

#### **Opção A: Via Dashboard**
1. Vá em **Deployments**
2. Clique em **"Deploy"** (botão no canto superior direito)
3. Selecione a branch: `claude/explore-repo-contents-0176xyqfcZ5uAUtNSW5goFZM`
4. Clique em **"Deploy"**

#### **Opção B: Via GitHub**
1. No repositório do GitHub
2. Vá em **Settings** → **Webhooks**
3. Encontre o webhook do Vercel
4. Clique em **"Recent Deliveries"**
5. Clique em **"Redeliver"** no último delivery

#### **Opção C: Via Vercel CLI**
```bash
# Instalar Vercel CLI (se não tiver)
npm i -g vercel

# Fazer login
vercel login

# Link ao projeto (primeira vez)
vercel link

# Deploy
vercel --prod
```

---

## 🐛 Por Que Pode Não Estar Fazendo Deploy Automático?

### **Causa 1: Branch não configurada**
- O Vercel só faz deploy automático da branch de produção
- Configure em Settings → Git → Production Branch

### **Causa 2: Webhook não configurado**
- O GitHub precisa notificar o Vercel
- Verifique em GitHub → Settings → Webhooks

### **Causa 3: Deploy desabilitado**
- Pode estar desabilitado nas configurações
- Verifique em Settings → Git → Automatic Deployments

### **Causa 4: Build recente já existe**
- O Vercel pode ignorar se nada mudou
- Force um novo deploy manualmente

---

## 🚀 Solução Rápida: Deploy Manual Agora

### **Passo 1: No Dashboard do Vercel**

1. Acesse: https://vercel.com/dashboard
2. Selecione seu projeto
3. Clique no botão **"Deploy"** (canto superior direito)
4. Em **"Branch"**, selecione: `claude/explore-repo-contents-0176xyqfcZ5uAUtNSW5goFZM`
5. Clique em **"Deploy"**

**Isso vai iniciar o deploy imediatamente!**

### **Passo 2: Aguardar Build**

O deploy vai passar por:
1. ⏳ Building (1-2 min)
2. ⏳ Deploying (30s)
3. ✅ Ready!

### **Passo 3: Acessar o Site**

Quando completar, clique no link do deploy:
- URL: `https://seu-projeto.vercel.app`

---

## ✅ Checklist de Configuração

Verifique no Vercel:

- [ ] **Git Repository**: Conectado ao GitHub
- [ ] **Production Branch**: Configurada (main ou branch atual)
- [ ] **Automatic Deployments**: Habilitado
- [ ] **Environment Variables**: Todas configuradas
- [ ] **Build Command**: `npm run build`
- [ ] **Output Directory**: `.next`
- [ ] **Install Command**: `npm install`

---

## 📝 Commits Recentes (Já Enviados)

```
b68cd8d - feat: Configurar Vercel para deploy automático
eec02dc - (anterior)
b37f80f - chore: Trigger Vercel deploy
219c49f - docs: Adicionar guia completo de deploy no Vercel
```

**Tudo já está no GitHub!** Só falta o Vercel detectar ou você fazer deploy manual.

---

## 💡 Próximos Passos

1. **Faça deploy manual** via dashboard (mais rápido)
2. **Configure a branch** para deploys automáticos futuros
3. **Teste o site** quando o deploy completar
4. **Configure banco de dados** (execute schema SQL)

---

## 🆘 Se Ainda Não Funcionar

Se mesmo com deploy manual não funcionar:

1. Verifique se há erros de build nos logs
2. Confirme as variáveis de ambiente
3. Tente criar novo projeto no Vercel e reimportar

**Recomendação**: Force o deploy manual agora pelo dashboard! 🚀
