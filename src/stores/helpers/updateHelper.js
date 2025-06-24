export const updatePageField = (pages, pi, updateFn) =>
  pages.map((page, i) => (i === pi ? updateFn(page) : page))

export const updateQuestionField = (pages, pi, qi, updateFn) =>
  pages.map((page, i) => {
    if (i !== pi) return page
    return {
      ...page,
      questions: page.questions.map((q, j) =>
        j === qi ? updateFn(q) : q
      ),
    }
  })

export const updateOptionField = (pages, pi, qi, oi, updateFn) =>
  pages.map((page, i) => {
    if (i !== pi) return page
    return {
      ...page,
      questions: page.questions.map((q, j) => {
        if (j !== qi) return q
        return {
          ...q,
          options: q.options.map((opt, k) =>
            k === oi ? updateFn(opt) : opt
          )
        }
      }),
    }
  })
