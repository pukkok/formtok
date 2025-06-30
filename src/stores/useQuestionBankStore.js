import { getAllMyQuestions } from "@/apis/questions"
import { safeRequest } from "@/utils/safeRequest"
import { create } from "zustand"

export const useQuestionBankStore = create((set, get) => ({
  questions: [],
  searchedQuestions: [],
  setSearchedQuestions: (arr) => set({searchedQuestions: arr}),

  selectedQuestions: [],
  toggleSelectedQuestions: (id) => {
    const { selectedQuestions } = get()
    
    selectedQuestions.includes(id) ? 
    set({ selectedQuestions: [...selectedQuestions.filter(qId => qId !== id)] }) :
    set({ selectedQuestions: [...selectedQuestions, id]})
  },

  loadQuestions: async () => {
    const { result } = await safeRequest(getAllMyQuestions(), {
      successMessage: '설문지 리스트 다가져옴'
    })

    if(result) {
      set({questions : result.questions, searchedQuestions: result.questions})
    }
  }

}))