import { deleteManyQuestions, deleteQuesiton, getAllMyQuestions } from "@/apis/questions"
import { safeRequest } from "@/utils/safeRequest"
import { toast } from "sonner"
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
  resetSelectedQuestions: () => set({selectedQuestions : []}),

  loadQuestions: async () => {
    const { result } = await safeRequest(getAllMyQuestions(), {
      
    })

    if(result) {
      set({questions : result.questions, searchedQuestions: result.questions})
    }
  },

  deleteQuestionAction: async (id) => {
    const { result } = await safeRequest(deleteQuesiton(id), {
      successMessage: '문항이 삭제되었습니다.',
      successDuration: 2500
    })
    if(result) {
      get().loadQuestions()
    }
  },

  deleteManyQuestionsAction: async () => {
    const { selectedQuestions } = get()

    if(selectedQuestions.length === 0) return toast.error('선택된 문항이 없습니다.')
    
    const { result } = await safeRequest(deleteManyQuestions(selectedQuestions), {
      successMessage: '문항이 삭제되었습니다.',
      successDuration: 2500
    })

    if(result) {
      set({ selectedQuestions: [] })
      get().loadQuestions()
    }
  }

}))