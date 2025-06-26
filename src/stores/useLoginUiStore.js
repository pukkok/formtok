import { create } from 'zustand'
import { useLoginFormStore } from './useLoginFormStore'
import { useJoinFormStore } from './useJoinFormStore'

export const useLoginUiStore = create((set) => ({
  activeForm: 'login',
  changeActiveForm: (form) => {
    set({ activeForm: form })

    const resetLoginInputs = useLoginFormStore.getState().resetLoginInputs
    const resetJoinInputs = useJoinFormStore.getState().resetJoinInputs
    const resetPass = useJoinFormStore.getState().resetPass

    if (form === 'login') {
      resetJoinInputs()
      resetPass()
      useJoinFormStore.setState({ hideOtp: true })
    } else {
      resetLoginInputs()
    }
  },

  isCapsLockActive: false,
  setIsCapsLockActive: (value) => set({ isCapsLockActive: value }),

  currentFocusedInputName: '',
  setCurrentFocusedInputName: (name) => set({ currentFocusedInputName: name }),
}))