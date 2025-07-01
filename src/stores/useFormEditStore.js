import { getMyForm, saveForm } from '@/apis/forms'
import { saveQuestion } from '@/apis/questions'
import { randomKey } from '@/utils/generateKey'
import { safeRequest } from '@/utils/safeRequest'
import { toast } from 'sonner'
import { create } from 'zustand'
import { updatePageField, updateQuestionField, updateOptionField, updateTableColField, updateTableRowField } from './helpers/updateHelper'
import { normalizePages, normalizeEndingMent, normalizeSurveyOptions } from './helpers/normalizeHelper'
import _ from 'lodash'
import { createPage, createQuestion, initialSurveyOptions, initialEndingMent } from './helpers/formFactory'

export const useFormEditStore = create((set, get) => ({
  isLoaded: false,
  setIsLoaded: (boolean) => set({isLoaded: boolean}),

  url: '',
  setUrl: (url) => set({url}),
  
  title:'',
  setTitle: (title) => set({title}),

  pages: [],
  setPages: (pages) => set({pages}),
  
  endingMent: initialEndingMent(),
  setEndingMent: (endingMent) => set({ endingMent }),

  listStyle : null,
  setListStyle: (listStyle) => set({listStyle}),

  // INFO: ----------- 설문지 옵션 관리 -----------
  surveyOptions: initialSurveyOptions(),

  updateSurveyOptions: (updated) => {
    const surveyOptions = get().surveyOptions
    set({surveyOptions : { ...surveyOptions, ...updated }})
  },

  // INFO: ------------ Pages 관리 ---------------
  addPage: (pi, isCopy=false) => {
    const { pages } = get()
    
    let updatedPage = {}
    if(isCopy) {
      const id = 'P' + randomKey()
      updatedPage = {
        ...pages[pi], id, 
        title: pages[pi].title ? pages[pi].title+'(사본)' : '',
        questions: pages[pi].questions.map((question, qi) => {
          const id = 'Q' + randomKey() + qi
          return question = {...question, id}
        })
      }
    } else {
      updatedPage = createPage()
    }    

    const updatedPages = [
      ...pages.slice(0, pi + 1),
      updatedPage,
      ...pages.slice(pi + 1)
    ]

    set({ pages: updatedPages })
  },

  updatePage: (pi, updateData) => {
    const pages = get().pages
    const updatedPages = updatePageField(pages, pi, (page) => ({
      ...page, ...updateData
    }))
    set({ pages: updatedPages })
  },

  deletePage: (pi) => {
    const pages = get().pages
    const updatedPages = pages.filter((_, idx) => pi !== idx)
    set({ pages: updatedPages})
  },

  // INFO : -------------- Question 관리 -----------------
  addQuestion: (pi, qi, isCopy=false) => {
    const { pages } = get()
    const page = pages[pi]

    let updatedQuestion = {}
    if(isCopy) {
      const id = 'Q' + randomKey()
      updatedQuestion = {
        ...page.questions[qi], id,
        q: page.questions[qi].q ? page.questions[qi].q + '(사본)' : page.questions[qi].q,
        d: page.questions[qi].d
      }
    } else {
      updatedQuestion = createQuestion()
    }

    const updatedQuestions = [
      ...page.questions.slice(0, qi + 1),
      updatedQuestion,
      ...page.questions.slice(qi + 1)
    ]

    const updatedPages = [
      ...pages.slice(0, pi),
      { ...page, questions: updatedQuestions },
      ...pages.slice(pi + 1)
    ]

    set({ pages: updatedPages })
  },

  updateQuestion: (pi, qi, updateData) => {
    const pages = get().pages
    const updatedPages = updateQuestionField(pages, pi, qi, (question) => ({
      ...question,
      ...updateData
    }))
    set({ pages: updatedPages })
  },

  deleteQuestion: (pi, qi) => {
    const pages = get().pages
    const updatedPages = pages.map((page, idx) => {
      if(idx === pi) {
        const updatedQuestions = page.questions.filter((_, idx2) => qi !== idx2)
        return page = {...page, questions: updatedQuestions}
      }
      return page
    })
    set({ pages: updatedPages})
  },

  // INFO: --------------- 문항 옵션 관리 -----------------
  addOption: (pi, qi) => {
    const id = 'O' + randomKey()
    const pages = get().pages
    const updatedPages = updateQuestionField(pages, pi, qi, (question) => ({
      ...question,
      options: [...question.options, { id, answer: '' }]
    }))
    set({ pages: updatedPages })
  },

  updateOption: (pi, qi, oi, updateData) => {
    const pages = get().pages
    const updatedPages = updateOptionField(pages, pi, qi, oi, (opt) => ({
      ...opt,
      ...updateData
    }))
    set({ pages: updatedPages })
  },

  deleteOption: (pi, qi, oi) => {
    const pages = get().pages
    const updatedPages = updateQuestionField(pages, pi, qi, (question) => ({
      ...question,
      options: question.options.filter((_, i) => i !== oi)
    }))
    set({ pages: updatedPages })
  },

  // INFO: ------------ 테이블(문항) 관리 ---------------
  initialTable: (pi, qi) => {
    const pages = get().pages
    const updatedPages = updateQuestionField(pages, pi, qi, (question) => ({
      ...question,
      tableRows: [
        { id: 'R' + randomKey(), value: '' },
        { id: 'R' + randomKey(), value: '' },
      ],
      tableCols: [
        { id: 'C' + randomKey(), value: '' },
        { id: 'C' + randomKey(), value: '' },
      ],
    }))
    set({ pages: updatedPages })
  },

  addTableRowOrCol: (pi, qi, rowOrCol) => {
    const pages = get().pages
    const updatedPages = updateQuestionField(pages, pi, qi, (question) => {
      if (rowOrCol === 'row') {
        return {
          ...question,
          tableRows: [...question.tableRows, { id: 'R' + randomKey(), value: '' }],
        }
      } else if (rowOrCol === 'col') {
        return {
          ...question,
          tableCols: [...question.tableCols, { id: 'C' + randomKey(), value: '' }],
        }
      }
      return question
    })
    set({ pages: updatedPages })
  },

  deleteTableRowOrCol: (pi, qi, id, rowOrCol) => {
    const pages = get().pages
    let updatedPages
    if (rowOrCol === 'row') {
      updatedPages = updateQuestionField(pages, pi, qi, (question) => {
        // 최소 2개 미만으로 삭제 방지
        if (question.tableRows.length <= 2) return question 
        return {
          ...question,
          tableRows: question.tableRows.filter((row) => row.id !== id),
        }
      })
    } else if (rowOrCol === 'col') {
      updatedPages = updateQuestionField(pages, pi, qi, (question) => {
        // 최소 2개 미만으로 삭제 방지
        if (question.tableCols.length <= 2) return question 
        return {
          ...question,
          tableCols: question.tableCols.filter((col) => col.id !== id),
        }
      })
    }
    set({ pages: updatedPages })
  },

  // INFO: 테이블 행/열 값 업데이트
  updateTableValue: (pi, qi, id, value, rowOrCol) => {
    const pages = get().pages
    let updatedPages
    if (rowOrCol === 'row') {
      updatedPages = updateTableRowField(pages, pi, qi, id, (row) => ({
        ...row,
        value: value,
      }))
    } else if (rowOrCol === 'col') {
      updatedPages = updateTableColField(pages, pi, qi, id, (col) => ({
        ...col,
        value: value,
      }))
    }
    set({ pages: updatedPages })
  },

  // INFO: 테이블 초기화 (데이터 비우기)
  resetTable: (pi, qi) => {
    const pages = get().pages
    const updatedPages = updateQuestionField(pages, pi, qi, (question) => ({
      ...question,
      tableCols: [],
      tableRows: [],
    }))
    set({ pages: updatedPages })
  },

  // INFO: ------------- 위치 변경 (드래그 앤 드롭) --------------
  reorderPage: (dragPi, dropPi) => {
    const pages = get().pages
    let copyPages = [...pages] 
    const [targetPage] = copyPages.splice(dragPi, 1)
    copyPages.splice(dropPi, 0, targetPage)
    set({ pages: copyPages })
  },
  
  reorderQuestion: (p1, q1, p2, q2) => {
    const pages = get().pages
    let copyPages = [...pages]
    const dragQuestion = copyPages[p1].questions[q1]

    if(p1 !== p2) { // TODO: 다른 페이지로 넘긴다.
      copyPages = copyPages.map((page, idx) => {
        if (p1 === idx) {
          const filteredQuestions = page.questions.filter((_, idx2) => q1 !== idx2)
          return { ...page, questions: filteredQuestions }
        }
        if (p2 === idx) {
          const updatedQuestions = [...page.questions]
          updatedQuestions.splice(q2, 0, dragQuestion)
          return { ...page, questions: updatedQuestions }
        }
        return page
      })
    } else { // TODO: 같은 페이지에서 이동한다.
      const updatedQuestions = [...copyPages[p1].questions]
      updatedQuestions.splice(q1, 1)
      updatedQuestions.splice(q2, 0, dragQuestion)

      copyPages = copyPages.map((page, idx) => {
        if (p1 === idx) {
          return { ...page, questions: updatedQuestions }
        }
        return page
      })
    }

    set({pages: copyPages})
  },

  settingForm: ({title, pages, endingMent, listStyle, surveyOptions}) => {
    set({
      title, pages, endingMent, listStyle, surveyOptions,
      originData: { title, pages, endingMent, listStyle, surveyOptions }
    })
  },

  // INFO: ---------- 오리진 체크 ----------- 
  // TODO : 변한 값이 있다면 탭을 벗어날 때 경고한다
  originData: null,
  settingOriginData:() => {
    const { title, pages, endingMent, listStyle, surveyOptions} = get()
    set({originData : { title, pages, endingMent, listStyle, surveyOptions }
    })
  },
  isModified: () => {// INFO: 가장 많이 변할것 같은 데이터 우선순위로 비교
    const {pages, title, endingMent, listStyle, surveyOptions, originData} = get()
    if(originData === null) return false // 들어가기 전
    // 변경된 경우 바로 true 리턴
    // console.log('통과1')
    if (!_.isEqual(normalizePages(pages), normalizePages(originData.pages))) return true // pages 비교
    // console.log('통과2')
    if (!_.isEqual(title, originData.title)) return true // title 비교
    if (!_.isEqual(normalizeEndingMent(endingMent), normalizeEndingMent(originData.endingMent))) return true // endingMent 비교
    if (!_.isEqual(listStyle, originData.listStyle)) return true // listStyle 비교
    if (!_.isEqual(normalizeSurveyOptions(surveyOptions), normalizeSurveyOptions(originData.surveyOptions))) return true // options 비교
    // 모든 항목이 동일한 경우 false 리턴
    return false
  },
  resetOriginData: () => set({originData: null}),
  

  // INFO: ---------- API 정리 -----------
  loadForm: async (url, force=false) => {
    if(!force && get().isLoaded) return

    const { result } = await safeRequest(getMyForm(url), {
      onError: () => toast.error('설문지 불러오기 실패')
    })

    if (result) {
      const {title, pages, endingMent, listStyle, options} = result.form
      set({ title, pages, endingMent, listStyle, surveyOptions: options,
        originData : { title, pages, endingMent, listStyle, surveyOptions : options }
      })
    }
    return true // 종료 체크
  },

  saveFormAction: async (url) => {
    const { title, pages, endingMent, listStyle, surveyOptions } = get()
    
    const updateOption = {
      ...surveyOptions,
      startDate : surveyOptions.isUseStartPeriod ? surveyOptions.startDate : '',   
      endDate : surveyOptions.isUseEndPeriod ? surveyOptions.endDate : '',   
      maximumCount : surveyOptions.isUseMaximum ? surveyOptions.maximumCount || 0 : null,   
    }

    const { result } = await safeRequest(saveForm(url, title, pages, endingMent, listStyle, updateOption), {
      successMessage: '성공적으로 저장 되었습니다.',
      onError: () => toast.error('설문지 저장 실패')
    })
    if(result) {
      get().settingOriginData()
    }
  },

  saveQuestionAction: async (pi, qi) => {
    const pages = get().pages
    const id = randomKey()
    const question = pages[pi].questions[qi]
    
    await safeRequest(saveQuestion({...question, id}), {
      successMessage: '문항이 저장되었습니다.',
      onError: () => toast.error('문항 저장에 실패하였습니다.')
    })
  },

}))