import { getResultAnswers } from "@/apis/answers"
import { copyForm, deleteForm, getAllMyForms } from "@/apis/forms"
import { safeRequest } from "@/utils/safeRequest"
import { create } from "zustand"

export const useFormManageStore = create((set, get) => ({
  allForms: [],
  searchedForms: [],
  isFetched: false,
  setSearchedForms: (arr) => set({ searchedForms: arr }),

  getAllMyFormsAction : async (force=false, filter={}) => {
    if (!force && get().isFetched) return

    const { result } = await safeRequest(getAllMyForms(filter), {
      loadingMessage: '설문지 불러오는 중...'
    })
    if(result) {
      set({searchedForms : [...result.forms], allForms: [...result.forms], isFetched: true})
      return result.forms
    } else {
      return set({ searchedForms: [], allForms: [], isFetched: true })
    }
  },

  copyFormAction: async (url) => {
    const { result } = await safeRequest(copyForm(url), {
      successMessage: '설문지 복사가 완료되었습니다.',
      onError: '설문지 복사에 실패했습니다.'
    })

    if(result) {
      await get().getAllMyFormsAction(true)
      return true
    }
  },

  deleteFormAction: async (url) => {
    const { result } = await safeRequest(deleteForm(url), {
      successMessage:'설문지 삭제가 완료되었습니다.',
      onError: '설문지 삭제에 실패했습니다.'
    })

    if(result) {
      await get().getAllMyFormsAction(true)
      return true
    }
  },

  // INFO : --------------- result 단독 -----------------

  resultAnswers: [],
  resultPage: [],
  setResultPage: (obj) => set({resultPage : obj}),

  getResultAnswersAction: async (url) => {
    const { result } = await safeRequest(getResultAnswers(url), {
      // successMessage: '설문 결과 답변 불러오기'
    }) 

    if(result) {
      set({ resultAnswers: result.list })
    }
  }


}))