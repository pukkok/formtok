export const updateTimeLeft = (remainingMs) => {
  const seconds = Math.floor(remainingMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  const remainingSeconds = seconds % 60

  // INFO: :시간에 따른 포맷 설정
  if (hours > 0) {
    return `${hours}시간 ${remainingMinutes}분`
  } else if (remainingMinutes > 0) {
    return `${remainingMinutes}분 ${remainingSeconds}초`
  } else {
    return `${remainingSeconds}초`
  }
}