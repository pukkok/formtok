import dayjs from "dayjs"

export const randomKey = () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const now = dayjs().format('YYYYMMDD') // 더 안전한 포맷
  const length = Math.floor(5 + Math.random() * 5)
  const randomStr = Array.from({ length }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('')
  return `${randomStr}${now}`
}

export const randomUrl = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}
