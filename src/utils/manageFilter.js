import dayjs from "dayjs"

export const getManageWork = ({ isOpen, isEnd, isUseStartPeriod, startDate, endDate }) => {
  const now = dayjs()
  const start = startDate ? dayjs(startDate) : null
  const end = endDate ? dayjs(endDate) : null

  if (isEnd) return 'finish'
  if (!isOpen) return 'draft'
  if (!isUseStartPeriod || (start?.isBefore(now) && (!end || end?.isAfter(now)))) return 'active'
  if (start?.isAfter(now)) return 'ready'
  if (end?.isBefore(now)) return 'finish'

  return 'draft'
}

export const filterManageForms = (forms, work, keyword = '') => {
  return forms.filter(form => {
    const matchesKeyword = form.title.includes(keyword)
    if (work === 'all') return matchesKeyword

    const pickWork = getManageWork(form.options)
    return pickWork === work && matchesKeyword
  })
}
