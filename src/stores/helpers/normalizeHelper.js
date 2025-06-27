const normalizeHtml = (html) => {
  if (typeof html !== 'string') return ''
  const trimmed = html.trim().toLowerCase()
  return (
    trimmed === '' ||
    trimmed === '<p></p>' ||
    trimmed === '<p><br></p>'
  ) ? '' : html
}

export const normalizePages = (pages) => {
  return pages.map(page => ({
    ...page,
    description: normalizeHtml(page.description),
    questions: page.questions.map(q => ({
      ...q,
      d: normalizeHtml(q.d),
    }))
  }))
}

export const normalizeEndingMent = (endingMent) => {
  return {...endingMent, description: normalizeHtml(endingMent.description)}
}

export const normalizeSurveyOptions = (surveyOptions) => {
  return {...surveyOptions, maximumCount: surveyOptions.maximumCount === 0 ? null : surveyOptions.maximumCount}
}