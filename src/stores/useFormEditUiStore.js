import { create } from 'zustand'

export const useFormEditUiStore = create((set, get) => ({
  activeCard: '',
  setActiveCard: (value) => set({activeCard : value}) 
  
  

}))