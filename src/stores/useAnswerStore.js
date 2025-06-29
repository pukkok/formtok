import { submitAnswer } from '@/apis/answers'
import { safeRequest } from '@/utils/safeRequest'
import { create } from 'zustand'

export const useAnswerStore = create((set, get) => ({

  answerBox: null,
  setAnswerBox: (answers) => set({ answerBox: answers }),

  answerPickOne: (pick, pageId, questionId) => {
    get()._updateAnswer(pageId, questionId, prev => ({
      answer: prev.answer === pick ? '' : pick,
      useExtra: false,
      extra: '',
    }))
  },

  answerPickMultiple: (pick, pageId, questionId) => {
    get()._updateAnswer(pageId, questionId, prev => ({
      answer: prev.answer.includes(pick)
        ? prev.answer.filter(p => p !== pick)
        : [...prev.answer, pick]
    }))
  },

  extraPick: (pageId, questionId, isMultiple = false) => {
    get()._updateAnswer(pageId, questionId, prev => ({
      answer: isMultiple ? prev.answer : '',
      useExtra: !prev.useExtra,
      extra: prev.useExtra ? prev.extra : ''
    }))
  },

  extraInValue: (value, pageId, questionId) => {
    get()._updateAnswer(pageId, questionId, () => ({ extra: value }))
  },

  answerInValue: (value, pageId, questionId) => {
    get()._updateAnswer(pageId, questionId, () => ({ answer: value }))
  },

  answerInHTML: (html, pageId, questionId, reset = false) => {
    let validHtml = ''
    if(html !== '<br>' && html) validHtml = html 
    get()._updateAnswer(pageId, questionId, () => ({ answer: reset ? '' : validHtml }))
  },

  answerDateType: (value, pageId, questionId, ForB) => {
    get()._updateAnswer(pageId, questionId, prev => ({ ...prev, [ForB]: value }))
  },

  answerPeriodValueReset: (value, pageId, questionId, ForB) => {
    get()._updateAnswer(pageId, questionId, prev => ({ ...prev, [ForB]: value }))
  },

  _updateAnswer: (pageId, questionId, updater) => {
    const { answerBox } = get()
    const prev = answerBox?.[pageId]?.[questionId] || {}
    set({
      answerBox: {
        ...answerBox,
        [pageId]: {
          ...answerBox[pageId],
          [questionId]: {
            ...prev,
            ...updater(prev),
          }
        }
      }
    })
  },


  // INFO: ---------- API 사용 -----------
  submitAnswerAction: async (url) => {
    const {answerBox : answers } = get()
    const { result } = await safeRequest(submitAnswer(url, answers), {
      successMessage: '설문지 제출 완료!'
    })

    if(result) {
      set({answerBox: null})
      return true
    }
    return false
  }

}))
