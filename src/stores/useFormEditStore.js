import { getMyForm } from '@/apis/forms'
import { randomKey, randomUrl } from '@/utils/generateKey'
import { safeRequest } from '@/utils/safeRequest'
import { toast } from 'sonner'
import { create } from 'zustand'
import { updatePageField, updateQuestionField, updateOptionField, updateTableColField, updateTableRowField } from './helpers/updateHelper'

export const useFormEditStore = create((set, get) => ({
  isLoaded: false,
  setIsLoaded: (boolean) => set({isLoaded: boolean}),

  url: '',
  setUrl: (url) => set({url}),
  
  title:'',
  setTitle: (title) => set({title}),

  pages: [],
  setPages: (pages) => set({pages}),
  
  endingMent: { title: '', description: '' },
  setEndingMent: (endingMent) => set({ endingMent }),

  listStyle : null,
  setListStyle: (listStyle) => set({listStyle}),
  getListStylePreview: () => {
    const style = get().listStyle
    switch (style) {
      case 'N': return '1. 2. 3.'
      case 'Q': return 'Q. Q. Q.'
      case 'QN': return 'Q1. Q2. Q3.'
      default: return '없음'
    }
  },

  getListStyleForIndex: (qi) => {
    const style = get().listStyle
    switch (style) {
      case 'N': return `${qi + 1}.`
      case 'Q': return 'Q.'
      case 'QN': return `Q${qi + 1}.`
      default: return ''
    }
  },

  

  updateQuestion: (pi, qi, updateData) => {
    const pages = get().pages
    const updatedPages = updateQuestionField(pages, pi, qi, (question) => ({
      ...question,
      ...updateData
    }))
    set({ pages: updatedPages })
  },

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

  // 테이블 행/열 값 업데이트
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

  // 테이블 초기화 (데이터 비우기)
  resetTable: (pi, qi) => {
    const pages = get().pages
    const updatedPages = updateQuestionField(pages, pi, qi, (question) => ({
      ...question,
      tableCols: [],
      tableRows: [],
    }))
    set({ pages: updatedPages })
  },

  options: {
    isOpen: false,
    isEnd: false,
    isPublic: false,
    isUseStartPeriod : false,
    startDate: '',
    isUseEndPeriod : false,
    endDate: '',
    isNeedLogin : false,
    isUseMaximum : false,
    maximumCount : null,
    isAllowConfirmation : false,
    isAllowModify: false,
    isRevealTheResult: false,
  },

  settingForm: ({title, pages, endingMent, listStyle, options}) => {
    set({title, pages, endingMent, listStyle, options})
  },

  loadForm: async (url, force=false) => {
    if(!force && get().isLoaded) return

    const { result } = await safeRequest(getMyForm(url), {
      onError: () => toast.error('설문지 불러오기 실패')
    })

    if (result) {
      const {title, pages, endingMent, listStyle, options} = result.form
      set({ title, pages, endingMent, listStyle, options })
    }
  },

  createUrl: () => {
    set({ url : randomUrl() })
  },

  createPage: () => {
    set({
      pages: [{ // INFO: 초기 모델링
        id: 'P'+randomKey(), 
        title: '', 
        description : '',
        questions: [
          {id: 'Q'+randomKey(), 
            type: '객관식', q: '', d: '', 
            options: [{id : 'O'+randomKey(), answer: ''}],
            hasExtraOption: false,
            scoreRanges : {min:1, max:5, minText: '', maxText: ''},
            tableRows: [],
            tableCols: [],
            hasDescription : false,
            period: {start: '', end: null},
            setPeriod : false, // 날짜 타입일때 사용
            essential : false, // 필수 질문
            setNextToPage : false, // 답변별 페이지 이동
            next : null // 다음 페이지 설정
          }
        ],
        next : null
      }]
    })
  },

  createOption: () => {
    set({
      options: {
        isOpen: false,
        isEnd: false,
        isPublic: false,
        isUseStartPeriod : false,
        startDate: '',
        isUseEndPeriod : false,
        endDate: '',
        isNeedLogin : false,
        isUseMaximum : false,
        maximumCount : null,
        isAllowConfirmation : false,
        isAllowModify: false,
        isRevealTheResult: false,
      } 
    })
  },

  createEndingMent: () => {
    set({
      endingMent: {
        title: '', 
        description: ''
      }
    })
  },

  
  originData: {},
  settingOriginData:() => {
    set({originData : {
        title: get().title, 
        pages: get().pages,
        endingMent: get().endingMent,
        listStyle: get().listStyle,
        options: get().options
      }
    })
  }
}))