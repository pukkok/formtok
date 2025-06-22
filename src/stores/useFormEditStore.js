import { getMyForm } from '@/apis/forms'
import { randomKey, randomUrl } from '@/utils/generateKey'
import { safeRequest } from '@/utils/safeRequest'
import { toast } from 'sonner'
import { create } from 'zustand'

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
            essentail : false, // 필수 질문
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