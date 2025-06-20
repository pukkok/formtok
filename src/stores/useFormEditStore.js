import { create } from 'zustand'

export const useFormEditStore = create((set, get) => ({
  title:'',
  setTitle: (value) => set({title: value}),

  pages: [],
  setPages: (arr) => set({pages: arr}),
  
  endingMent: {
    title: '',
    description: ''
  },
  setEndingMent: (obj) => set({ endingMent : obj }),

  listStyle : '',
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
  originalData: [],

  loadForm: ({title, pages, endingMent, listStyle, options}) => {
    set({title, pages, endingMent, listStyle, options})
  }
}))