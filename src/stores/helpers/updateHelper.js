export const updatePageField = (pages, pi, updateFn) =>
  pages.map((page, pIdx) => (pIdx === pi ? updateFn(page) : page))

export const updateQuestionField = (pages, pi, qi, updateFn) =>
  pages.map((page, pIdx) => {
    if (pIdx !== pi) return page
    return {
      ...page,
      questions: page.questions.map((q, qIdx) =>
        qIdx === qi ? updateFn(q) : q
      )
    }
})

export const updateOptionField = (pages, pi, qi, oi, updateFn) =>
  pages.map((page, pIdx) => {
    if (pIdx !== pi) return page
    return {
      ...page,
      questions: page.questions.map((q, qIdx) => {
        if (qIdx !== qi) return q
        return {
          ...q,
          options: q.options.map((opt, k) =>
            k === oi ? updateFn(opt) : opt
          )
        }
      })
    }
})


export const updateTableRowField = (pages, pi, qi, rowId, updateFn) =>
  pages.map((page, pIdx) => {
    if (pIdx !== pi) return page
    return {
      ...page,
      questions: page.questions.map((q, qIdx) => {
        if (qIdx !== qi) return q
        return {
          ...q,
          tableRows: q.tableRows.map((row) =>
            row.id === rowId ? updateFn(row) : row
          )
        }
      })
    }
})

export const updateTableColField = (pages, pi, qi, colId, updateFn) =>
  pages.map((page, pIdx) => {
    if (pIdx !== pi) return page
    return {
      ...page,
      questions: page.questions.map((q, qIdx) => {
        if (qIdx !== qi) return q
        return {
          ...q,
          tableCols: q.tableCols.map((col) =>
            col.id === colId ? updateFn(col) : col
          )
        }
      })
    }
})