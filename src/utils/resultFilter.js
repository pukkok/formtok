export const getResultWork = ({ isEnd, isOpen }) => {
  if (isEnd) return 'finish'
  if (isOpen) return 'active'
  return 'all' // 방지용
}

export const filterResultForms = (forms, work = 'all', keyword = '') => {
  return forms.filter(form => {
    const matchesKeyword = form.title.includes(keyword)
    if (work === 'all') return matchesKeyword

    const pickWork = getResultWork(form.options)
    return pickWork === work && matchesKeyword
  })
}