import { createClient } from '@/lib/supabase/client'

/**
 * Calcula o progresso de uma dimensão específica para um usuário
 * Baseado nas práticas completadas nos últimos 30 dias
 */
export async function calculateDimensionProgress(
  userId: string,
  dimension: string
): Promise<number> {
  const supabase = createClient()

  // Data de 30 dias atrás
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  // Total de práticas dessa dimensão
  const { count: totalPractices } = await supabase
    .from('practices')
    .select('*', { count: 'exact', head: true })
    .eq('dimension', dimension)

  // Práticas completadas pelo usuário (últimos 30 dias)
  const { count: completedPractices } = await supabase
    .from('completed_practices')
    .select('practice_id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('completed_at', thirtyDaysAgo.toISOString())
    .in(
      'practice_id',
      supabase.from('practices').select('id').eq('dimension', dimension)
    )

  if (!totalPractices || totalPractices === 0) return 0

  const percentage = Math.min(
    Math.round(((completedPractices || 0) / totalPractices) * 100),
    100
  )

  return percentage
}

/**
 * Calcula o streak (sequência de dias) do usuário
 * Dias consecutivos com pelo menos uma prática completada
 */
export async function calculateUserStreak(userId: string): Promise<number> {
  const supabase = createClient()

  // Buscar todas as datas únicas de práticas completadas (ordenadas desc)
  const { data: completedDates } = await supabase
    .from('completed_practices')
    .select('date')
    .eq('user_id', userId)
    .order('date', { ascending: false })

  if (!completedDates || completedDates.length === 0) return 0

  // Remover duplicatas
  const uniqueDates = [...new Set(completedDates.map((d) => d.date))].sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  )

  let streak = 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Verificar se tem prática hoje ou ontem
  const mostRecent = new Date(uniqueDates[0])
  mostRecent.setHours(0, 0, 0, 0)

  const daysDiff = Math.floor(
    (today.getTime() - mostRecent.getTime()) / (1000 * 60 * 60 * 24)
  )

  // Se a última prática foi há mais de 1 dia, streak = 0
  if (daysDiff > 1) return 0

  // Contar dias consecutivos
  streak = 1
  for (let i = 1; i < uniqueDates.length; i++) {
    const currentDate = new Date(uniqueDates[i - 1])
    const prevDate = new Date(uniqueDates[i])

    currentDate.setHours(0, 0, 0, 0)
    prevDate.setHours(0, 0, 0, 0)

    const diff = Math.floor(
      (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    if (diff === 1) {
      streak++
    } else {
      break
    }
  }

  return streak
}

/**
 * Recomenda uma prática baseada no perfil do usuário
 */
export async function recommendPractice(userId: string) {
  const supabase = createClient()

  // Buscar perfil do usuário
  const { data: profile } = await supabase
    .from('profiles')
    .select('available_time, interest_areas')
    .eq('id', userId)
    .single()

  if (!profile) return null

  // Buscar progresso das dimensões
  const { data: dimensionProgress } = await supabase
    .from('dimension_progress')
    .select('*')
    .eq('user_id', userId)
    .order('percentage', { ascending: true })

  // Dimensão com menor progresso
  const lowestDimension = dimensionProgress?.[0]?.dimension

  // Práticas já feitas hoje
  const today = new Date().toISOString().split('T')[0]
  const { data: todayCompleted } = await supabase
    .from('completed_practices')
    .select('practice_id')
    .eq('user_id', userId)
    .eq('date', today)

  const todayCompletedIds =
    todayCompleted?.map((c) => c.practice_id) || []

  // Buscar prática recomendada
  let query = supabase
    .from('practices')
    .select('*')
    .lte('duration_minutes', profile.available_time || 10)
    .order('duration_minutes', { ascending: true })

  if (lowestDimension) {
    query = query.eq('dimension', lowestDimension)
  }

  if (todayCompletedIds.length > 0) {
    query = query.not('id', 'in', `(${todayCompletedIds.join(',')})`)
  }

  const { data: practice } = await query.limit(1).single()

  return practice
}

/**
 * Formata duração em minutos para string legível
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} minuto${minutes !== 1 ? 's' : ''}`
  }

  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (mins === 0) {
    return `${hours} hora${hours !== 1 ? 's' : ''}`
  }

  return `${hours}h ${mins}min`
}
