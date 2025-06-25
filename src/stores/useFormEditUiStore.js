import { create } from 'zustand'

export const useFormEditUiStore = create((set, get) => ({
  activeCard: 'P-0',
  setActiveCard: (value) => set({activeCard : value}),

  foldQuestions: [],
  toggleFoldQuestion: (value) => {
    const foldQuestions = get().foldQuestions
    foldQuestions.includes(value) ?
    set({foldQuestions : foldQuestions.filter(q => q !== value)}) :
    set({foldQuestions : [...foldQuestions, value]})
  },

}))