export const formatPhone = (value) => {
  const onlyNums = value.replace(/[^\d]/g, '').slice(0, 11)

  if (onlyNums.length < 4) return onlyNums
  if (onlyNums.length < 8) return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
  return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7)}`
}