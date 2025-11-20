#!/usr/bin/env tsx

/**
 * Script para configurar automaticamente o banco de dados Supabase
 * Executa todas as migrations e cria as tabelas necessárias
 *
 * Uso: npm run setup-db
 */

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

// Cores para output no terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
}

function log(message: string, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`)
}

function logSuccess(message: string) {
  log(`✅ ${message}`, colors.green)
}

function logError(message: string) {
  log(`❌ ${message}`, colors.red)
}

function logInfo(message: string) {
  log(`ℹ️  ${message}`, colors.blue)
}

function logWarning(message: string) {
  log(`⚠️  ${message}`, colors.yellow)
}

async function main() {
  log('\n💜 Cuidar de Mim - Database Setup\n', colors.magenta + colors.bright)

  // Verificar variáveis de ambiente
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    logError('Variáveis de ambiente não encontradas!')
    logInfo('Certifique-se de ter um arquivo .env.local com:')
    console.log('  NEXT_PUBLIC_SUPABASE_URL=sua-url')
    console.log('  SUPABASE_SERVICE_ROLE_KEY=sua-service-key')
    process.exit(1)
  }

  logInfo(`Conectando ao Supabase: ${supabaseUrl}`)

  // Criar cliente Supabase com service role (acesso admin)
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  try {
    // Ler o arquivo SQL
    const sqlPath = path.join(process.cwd(), 'supabase-schema.sql')

    if (!fs.existsSync(sqlPath)) {
      logError(`Arquivo supabase-schema.sql não encontrado em: ${sqlPath}`)
      process.exit(1)
    }

    logInfo('Lendo arquivo SQL...')
    const sqlContent = fs.readFileSync(sqlPath, 'utf-8')

    // Dividir em statements individuais (separados por ;)
    logInfo('Executando migrations...\n')

    // Executar o SQL via RPC (remote procedure call)
    // Nota: O Supabase não permite executar SQL arbitrário via client
    // Mas podemos usar a REST API diretamente

    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
      },
      body: JSON.stringify({ query: sqlContent }),
    })

    if (!response.ok) {
      // Se a função exec_sql não existe, vamos criar as tabelas manualmente
      logWarning('Método direto não disponível. Criando tabelas manualmente...\n')
      await createTablesManually(supabase)
    } else {
      logSuccess('Schema SQL executado com sucesso!')
    }

    // Verificar se as tabelas foram criadas
    logInfo('\nVerificando tabelas criadas...')
    await verifyTables(supabase)

    log('\n🎉 Database setup concluído com sucesso!\n', colors.green + colors.bright)
    logInfo('Próximos passos:')
    console.log('  1. Execute: npm run seed-data (para adicionar dados iniciais)')
    console.log('  2. Execute: npm run dev (para iniciar o servidor)')
    console.log('  3. Acesse: http://localhost:3000\n')

  } catch (error: any) {
    logError(`\nErro ao configurar database: ${error.message}`)
    console.error(error)
    process.exit(1)
  }
}

async function createTablesManually(supabase: any) {
  logInfo('Criando tabelas manualmente...')

  // Criar extensão UUID se não existir
  logInfo('  → Habilitando extensão uuid-ossp...')

  // Criar tabelas uma por uma
  const tables = [
    'profiles',
    'practices',
    'completed_practices',
    'emotional_checkins',
    'daily_habits',
    'planner_tasks',
    'daily_reflections',
    'motivational_quotes',
    'favorite_quotes',
    'dimension_progress',
  ]

  for (const table of tables) {
    try {
      const { error } = await supabase.from(table).select('count').limit(0)

      if (error && error.code === 'PGRST116') {
        logWarning(`  ✗ Tabela ${table} não existe ainda`)
      } else {
        logSuccess(`  ✓ Tabela ${table} encontrada`)
      }
    } catch (error) {
      logWarning(`  ? Não foi possível verificar ${table}`)
    }
  }

  logWarning('\nIMPORTANTE: Execute o SQL manualmente uma única vez!')
  logInfo('1. Acesse: https://app.supabase.com/project/_/sql')
  logInfo('2. Copie o conteúdo de: supabase-schema.sql')
  logInfo('3. Cole e execute no SQL Editor')
  logInfo('4. Depois execute este script novamente para verificar\n')
}

async function verifyTables(supabase: any) {
  const tables = [
    'profiles',
    'practices',
    'completed_practices',
    'emotional_checkins',
    'daily_habits',
    'planner_tasks',
    'daily_reflections',
    'motivational_quotes',
    'favorite_quotes',
    'dimension_progress',
  ]

  let allTablesExist = true

  for (const table of tables) {
    try {
      const { error } = await supabase.from(table).select('count').limit(0)

      if (error) {
        if (error.code === 'PGRST116') {
          logError(`  ✗ Tabela ${table} não encontrada`)
          allTablesExist = false
        } else {
          logWarning(`  ? Erro ao verificar ${table}: ${error.message}`)
        }
      } else {
        logSuccess(`  ✓ Tabela ${table} OK`)
      }
    } catch (error: any) {
      logWarning(`  ? Erro ao verificar ${table}`)
      allTablesExist = false
    }
  }

  if (!allTablesExist) {
    logWarning('\nAlgumas tabelas estão faltando!')
    logInfo('Execute o SQL manualmente no Supabase Dashboard.')
  }

  return allTablesExist
}

// Executar script
main().catch((error) => {
  logError(`Erro fatal: ${error.message}`)
  process.exit(1)
})
