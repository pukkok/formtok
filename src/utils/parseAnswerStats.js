export const createRangeObj = (min, max) => {
  const result = {}
  for (let i = min; i <= max; i++) result[i] = 0
  return result
}

export const parseAnswers = (type, resultAnswers, pid, qid, options, hasExtraOption, scoreRanges) => {
  let values = null
  let extras = []
  let count = 0

  if (['객관식', '드롭다운'].includes(type)) {
    let list = options.reduce((acc, cur) => ({ ...acc, [cur.answer]: 0 }), {})
    if (hasExtraOption) list['기타'] = 0

    values = resultAnswers.reduce((acc, cur) => {
      const { answer, useExtra, extra } = cur.answers?.[pid]?.[qid] || {}
      if (answer || useExtra) count++
      if (useExtra) {
        acc['기타']++
        extras.push(extra)
      } else if (answer in acc) {
        acc[answer]++
      }
      return acc
    }, { ...list })
  }

  if (type === '객관식(복수 선택)') {
    let list = options.reduce((acc, cur) => ({ ...acc, [cur.answer]: 0 }), {})
    values = resultAnswers.reduce((acc, cur) => {
      const answers = cur.answers?.[pid]?.[qid]?.answer || []
      if (answers.length) count++
      answers.forEach(a => {
        if (a in acc) acc[a]++
      })
      return acc
    }, { ...list })
  }

  if (type === '점수 선택형') {
    const rangeObj = createRangeObj(scoreRanges.min, scoreRanges.max)
    values = resultAnswers.reduce((acc, cur) => {
      const answer = cur.answers?.[pid]?.[qid]?.answer
      if (answer in acc) {
        acc[answer]++
        count++
      }
      return acc
    }, { ...rangeObj })
  }

  if (['서술형', '단답형'].includes(type)) {
    values = resultAnswers
      .map(cur => cur.answers?.[pid]?.[qid]?.answer)
      .filter(Boolean)
    count = values.length
  }

  if (['날짜', '시간', '날짜 + 시간'].includes(type)) {
    values = resultAnswers
      .map(cur => cur.answers?.[pid]?.[qid])
      .filter(d => d?.start)
    count = values.length
  }

  return { values, extras, count }
}

