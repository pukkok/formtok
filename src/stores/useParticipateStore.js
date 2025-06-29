import { getAvailableForms } from '@/apis/forms'
import { safeRequest } from '@/utils/safeRequest'
import { create } from 'zustand'

export const useParticipateStore = create((set, get) => ({
  
  surveyForms: [],
  setSurveyForms: (form) => set({surveyForms: form}),
  currentPageIndex: 0,
  setCurrentPageIndex: (number) => set({currentPageIndex: number}),

  allForms: [],

  searchedForms: [],
  setSearchedForms: (arr) => set({ searchedForms: arr }),

  getAvailableFormsAction: async () => {
    const { result } = await safeRequest(getAvailableForms(), {
      loadingMessage: '종이 줍는 중..'
    })

    if(result) {
      set({allForms: result.forms, searchedForms: result.forms})
    }
  }

}))