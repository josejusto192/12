import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns'
import { ptBR } from 'date-fns/locale'

/**
 * Formata uma data para o formato brasileiro
 */
export function formatDateBR(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
}

/**
 * Formata uma data de forma relativa (hoje, ontem, etc)
 */
export function formatRelativeDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date

  if (isToday(dateObj)) {
    return 'Hoje'
  }

  if (isYesterday(dateObj)) {
    return 'Ontem'
  }

  return format(dateObj, "dd 'de' MMMM", { locale: ptBR })
}

/**
 * Formata distância de tempo (há 2 horas, há 3 dias, etc)
 */
export function formatTimeAgo(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return formatDistanceToNow(dateObj, { addSuffix: true, locale: ptBR })
}

/**
 * Retorna a data de hoje no formato YYYY-MM-DD
 */
export function getTodayString(): string {
  return new Date().toISOString().split('T')[0]
}

/**
 * Gera saudação baseada no horário
 */
export function getGreeting(): string {
  const hour = new Date().getHours()

  if (hour < 12) {
    return 'Bom dia'
  } else if (hour < 18) {
    return 'Boa tarde'
  } else {
    return 'Boa noite'
  }
}

/**
 * Retorna o período do dia (morning, afternoon, night)
 */
export function getCurrentPeriod(): 'morning' | 'afternoon' | 'night' {
  const hour = new Date().getHours()

  if (hour < 12) {
    return 'morning'
  } else if (hour < 18) {
    return 'afternoon'
  } else {
    return 'night'
  }
}

/**
 * Traduz período do dia para português
 */
export function translatePeriod(
  period: 'morning' | 'afternoon' | 'night'
): string {
  const translations = {
    morning: 'Manhã',
    afternoon: 'Tarde',
    night: 'Noite',
  }

  return translations[period]
}
