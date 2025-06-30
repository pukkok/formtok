export const getQuestionGroup = (type) => {
  switch (type) {
    case '서술형':
    case '단답형':
      return 'text'
    case '객관식':
    case '객관식(복수 선택)':
      return 'choice'
    case '드롭다운':
      return 'dropdown'
    case '날짜':
    case '시간':
    case '날짜 + 시간':
      return 'datetime'
    case '표형':
      return 'table'
    case '점수 선택형':
      return 'score'
    default:
      return 'all'
  }
}

export const filterQuestionBank = (questions, work = 'all', keyword = '') => {
  return questions.filter(question => {
    const matchesKeyword = question.q.includes(keyword)
    if (work === 'all') return matchesKeyword

    const group = getQuestionGroup(question.type)
    return group === work && matchesKeyword
  })
}