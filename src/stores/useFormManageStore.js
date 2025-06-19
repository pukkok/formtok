import { copyForm, deleteForm, getMyFormList } from "@/apis/forms";
import { safeRequest } from "@/utils/safeRequest";
import { create } from "zustand";

export const useFormManageStore = create((set, get) => ({
  allForms: [],
  searchedForms: [],
  isFetched: false,
  setSearchedForms: (arr) => set({ searchedForms: arr }),

  getMyFormListAction : async (force=false) => {
    if (!force && get().isFetched) return

    const { result } = await safeRequest(getMyFormList(), {
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
      await get().getMyFormListAction(true)
      return true
    }
  },

  deleteFormAction: async (url) => {
    const { result } = await safeRequest(deleteForm(url), {
      successMessage:'설문지 삭제가 완료되었습니다.',
      onError: '설문지 삭제에 실패했습니다.'
    })

    if(result) {
      await get().getMyFormListAction(true)
      return true
    }
  }
}))