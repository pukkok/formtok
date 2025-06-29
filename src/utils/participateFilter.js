import dayjs from 'dayjs'

export const getParticipateWorks = (form) => {
  const works = []
  const { url, options, numberOfResponses } = form
  const { isNeedLogin, isEnd, isOpen, endDate, maximumCount } = options
  const now = dayjs()
  const end = endDate ? dayjs(endDate) : null

  if (url === 'qZyT6oNPwY4') return ['faq']
  if (isEnd || (end && end.isBefore(now)) || numberOfResponses.length === maximumCount) return ['finish']
  if (!isNeedLogin) works.push('noLogin')
  if (isOpen) works.push('active')
  return works
}

export const isFinished = (form) => getParticipateWorks(form).includes('finish')
export const isActive = (form) => getParticipateWorks(form).includes('active')
export const isFaq = (form) => getParticipateWorks(form).includes('faq')
export const isNoLogin = (form) => getParticipateWorks(form).includes('noLogin')

export const matchFilterType = (form, filterType) => {
  switch (filterType) {
    case 'faq': return isFaq(form)
    case 'finish': return isFinished(form)
    case 'active': return isActive(form)
    case 'noLogin': return isNoLogin(form)
    default: return true
  }
}

export const filterForms = (forms, { keyword = '', filterType = 'all' } = {}) => {
  return forms.filter(form => {
    const matchesTitle = form.title.includes(keyword)
    const matchesFilter = matchFilterType(form, filterType)
    return matchesTitle && matchesFilter
  })
}
