#!/usr/bin/env tsx

/**
 * Script para popular o banco de dados com dados iniciais
 * - 10 práticas de autocuidado
 * - 12 frases motivacionais
 *
 * Uso: npm run seed-data
 */

import { createClient } from '@supabase/supabase-js'

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  bright: '\x1b[1m',
}

function log(message: string, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`)
}

// 10 práticas de autocuidado do e-book
const practices = [
  {
    title: "Conexão Profunda",
    dimension: "emocional",
    duration_minutes: 2,
    description: "Feche os olhos por 2 minutos e respire profundamente, reconectando-se consigo mesma.",
    instructions: [
      "Feche os olhos",
      "Inspire profundamente por 30 segundos",
      "Expire lentamente por 30 segundos",
      "Sinta seu corpo relaxar completamente",
      "Observe as sensações presentes sem julgamento"
    ],
    reflection_prompt: "Como você se sente agora?",
    order_index: 1
  },
  {
    title: "Reconhecendo o Valor Pessoal",
    dimension: "emocional",
    duration_minutes: 5,
    description: "Escreva 3 coisas que você gosta em si mesma hoje.",
    instructions: [
      "Encontre um lugar tranquilo",
      "Escreva 3 coisas que você gosta em si mesma",
      "Podem ser qualidades, conquistas ou pequenos hábitos",
      "Reflita sobre o porquê de gostar dessas coisas",
      "Permita-se sentir orgulho dessas características"
    ],
    reflection_prompt: "Por que essas qualidades são importantes para você?",
    order_index: 2
  },
  {
    title: "Pequenas Ações, Grandes Impactos",
    dimension: "social",
    duration_minutes: 5,
    description: "Liste 3 pequenas ações que você pode fazer hoje só por você.",
    instructions: [
      "Pense em ações simples e rápidas",
      "Exemplos: beber água com limão, ouvir música favorita, ligar para um amigo",
      "Escreva suas 3 ações escolhidas",
      "Comprometa-se a realizá-las hoje",
      "Celebre cada uma ao completar"
    ],
    reflection_prompt: "Qual ação te trouxe mais alegria?",
    order_index: 3
  },
  {
    title: "Atenção Plena no Cotidiano",
    dimension: "espiritual",
    duration_minutes: 10,
    description: "Pratique mindfulness durante uma atividade cotidiana.",
    instructions: [
      "Escolha uma atividade diária (cozinhar, tomar banho, escovar dentes)",
      "Foque totalmente no momento presente",
      "Observe todos os detalhes: cores, texturas, aromas",
      "Preste atenção nas sensações físicas",
      "Observe os sons ao seu redor",
      "Sinta a diferença que a atenção plena faz"
    ],
    reflection_prompt: "O que você notou de diferente ao prestar atenção plena?",
    order_index: 4
  },
  {
    title: "Mapeando a Felicidade e a Paz",
    dimension: "emocional",
    duration_minutes: 5,
    description: "Identifique momentos de felicidade e paz no seu dia.",
    instructions: [
      "Pense no seu dia até agora",
      "Liste 3 momentos em que se sentiu feliz ou em paz",
      "Reflita sobre o que causou esses sentimentos",
      "Identifique padrões: pessoas, lugares, atividades",
      "Pense em como criar mais desses momentos"
    ],
    reflection_prompt: "Como você pode criar mais momentos assim na sua vida?",
    order_index: 5
  },
  {
    title: "Carta de Amor Próprio",
    dimension: "emocional",
    duration_minutes: 10,
    description: "Escreva uma carta carinhosa para você mesma.",
    instructions: [
      "Encontre um lugar confortável e privado",
      "Comece com 'Querida [seu nome]'",
      "Use palavras de carinho, incentivo e validação",
      "Relembre suas qualidades e conquistas recentes",
      "Reconheça os desafios que tem enfrentado",
      "Termine com uma mensagem de amor e apoio",
      "Guarde-a para reler quando precisar"
    ],
    reflection_prompt: "Como foi escrever essa carta? Que emoções surgiram?",
    order_index: 6
  },
  {
    title: "Alongamento e Conexão Corporal",
    dimension: "fisico",
    duration_minutes: 5,
    description: "Alongue seu corpo com consciência e respiração.",
    instructions: [
      "Respire profundamente 3 vezes",
      "Alongue o pescoço (direita, esquerda, frente, trás)",
      "Alongue os braços acima da cabeça",
      "Incline-se para tocar os pés (não force)",
      "Alongue as costas fazendo um gato/vaca",
      "Sinta cada músculo se soltando",
      "Respire profundamente ao final"
    ],
    reflection_prompt: "Onde seu corpo precisa de mais atenção?",
    order_index: 7
  },
  {
    title: "Encontrando o Prazer no Movimento",
    dimension: "fisico",
    duration_minutes: 10,
    description: "Movimente-se de uma forma prazerosa, sem pressão.",
    instructions: [
      "Escolha uma atividade física que você goste",
      "Pode ser dança, caminhada, yoga, natação, ou qualquer outra",
      "Faça por 10 minutos no seu ritmo",
      "Sem pressão de performance ou intensidade",
      "Foque no prazer de se movimentar",
      "Observe como seu corpo responde",
      "Celebre o movimento ao final"
    ],
    reflection_prompt: "Como seu corpo se sente após o movimento?",
    order_index: 8
  },
  {
    title: "O Santuário Pessoal",
    dimension: "espiritual",
    duration_minutes: 15,
    description: "Crie ou reorganize seu espaço sagrado.",
    instructions: [
      "Escolha um cantinho da casa (pode ser pequeno)",
      "Observe o que está lá atualmente",
      "Remova o que não serve mais ou não traz alegria",
      "Limpe e organize o espaço",
      "Adicione algo que traga alegria: planta, foto, objeto especial",
      "Adicione elementos sensoriais: vela aromática, almofada confortável",
      "Sente-se neste espaço por alguns minutos",
      "Sinta a energia transformada"
    ],
    reflection_prompt: "Como você se sente neste espaço agora?",
    order_index: 9
  },
  {
    title: "Conexão Sensorial",
    dimension: "intelectual",
    duration_minutes: 10,
    description: "Dedique-se a uma atividade criativa ou intelectual.",
    instructions: [
      "Escolha uma atividade criativa ou intelectual",
      "Pode ser desenhar, escrever, colorir, ouvir música, ler",
      "Desligue todas as distrações (celular, TV)",
      "Dedique-se totalmente por 10 minutos",
      "Observe como sua mente reage",
      "Permita-se fluir sem autocrítica",
      "Celebre sua criatividade ao final"
    ],
    reflection_prompt: "O que você criou ou aprendeu? Como se sentiu?",
    order_index: 10
  }
]

// 12 frases motivacionais do e-book
const quotes = [
  { text: "O cuidado que você dá a si mesma hoje será a energia que você terá amanhã para os outros." },
  { text: "Pequenos atos de amor próprio geram grandes mudanças no seu dia." },
  { text: "O autocuidado é uma forma de resistência. É dizer: 'eu também importo'." },
  { text: "Descansar não é um prêmio por um dia cheio. É uma necessidade humana." },
  { text: "Transforme tarefas comuns em momentos de cuidado." },
  { text: "Cinco minutos dedicados a você podem mudar toda a sua energia." },
  { text: "Você não precisa se sacrificar para ser uma boa mãe. Cuidar de você também é cuidar deles." },
  { text: "Permitir-se descansar é um ato de coragem e amor próprio." },
  { text: "O cuidado de hoje é a força de amanhã." },
  { text: "Cada pequeno gesto importa. Sua jornada de autocuidado é única e valiosa." },
  { text: "Você merece atenção, cuidado e amor todos os dias. Permita-se." },
  { text: "O autocuidado não é egoísmo, é a base para uma vida plena e feliz." }
]

async function main() {
  log('\n💜 Cuidar de Mim - Seed Data\n', colors.magenta + colors.bright)

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    log('❌ Variáveis de ambiente não encontradas!', colors.red)
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  try {
    // Inserir práticas
    log('📚 Inserindo 10 práticas de autocuidado...', colors.blue)

    const { data: existingPractices } = await supabase
      .from('practices')
      .select('count')

    if (existingPractices && existingPractices.length > 0) {
      log('⚠️  Práticas já existem. Pulando...', colors.blue)
    } else {
      const { error: practicesError } = await supabase
        .from('practices')
        .insert(practices)

      if (practicesError) {
        log(`❌ Erro ao inserir práticas: ${practicesError.message}`, colors.red)
      } else {
        log('✅ 10 práticas inseridas com sucesso!', colors.green)
      }
    }

    // Inserir frases
    log('\n💬 Inserindo 12 frases motivacionais...', colors.blue)

    const { data: existingQuotes } = await supabase
      .from('motivational_quotes')
      .select('count')

    if (existingQuotes && existingQuotes.length > 0) {
      log('⚠️  Frases já existem. Pulando...', colors.blue)
    } else {
      const { error: quotesError } = await supabase
        .from('motivational_quotes')
        .insert(quotes)

      if (quotesError) {
        log(`❌ Erro ao inserir frases: ${quotesError.message}`, colors.red)
      } else {
        log('✅ 12 frases inseridas com sucesso!', colors.green)
      }
    }

    log('\n🎉 Seed data concluído!\n', colors.green + colors.bright)

  } catch (error: any) {
    log(`\n❌ Erro: ${error.message}`, colors.red)
    process.exit(1)
  }
}

main()
