import { date } from 'zod'

export function timeAgo(date: Date): string {
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 'en' : 'e'} geleden`
  }

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return `${minutes} minu${minutes !== 1 ? 'ten' : 'ut'} geleden`
  }

  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return `${hours} uur geleden`
  }

  const days = Math.floor(hours / 24)
  if (days < 7) {
    return `${days} da${days !== 1 ? 'gen' : 'g'} geleden`
  }

  const weeks = Math.floor(days / 7)
  if (weeks < 4) {
    return `${weeks} ${weeks !== 1 ? 'weken' : 'week'} geleden`
  }

  const months = Math.floor(days / 30.44) // Approximate month length
  if (months < 12) {
    return `${months} maand${months !== 1 ? 'en' : ''} geleden`
  }

  const years = Math.floor(days / 365.25) // Account for leap years
  return `${years} jaar geleden`
}

export const formatDate = (date: Date) => {
  return `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
}

export const formatTime = (date: Date) => {
  return `${date.getHours()}:${date.getMinutes()} `
}
