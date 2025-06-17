import { create } from 'zustand'
import { login } from '@/apis/auth'
import { toast } from 'sonner'
import { safeRequest } from '@/utils/safeRequest'
import { useAuthStore } from './useAuthStore'

const INITIAL_LOGIN_FORMS = { userId: '', password: '' }

export const useLoginFormStore = create((set, get) => ({
  loginInputs: INITIAL_LOGIN_FORMS,

  setLoginInputs: (inputs) => set({ loginInputs: inputs }),

  resetLoginInputs: () => {
    set({ loginInputs: INITIAL_LOGIN_FORMS })
  },

  loginAction: async () => {
    const { userId, password } = get().loginInputs
    const { result } = await safeRequest(login(userId, password), {
      onError: (err) => toast.error(err.msg, { duration: 2000 })
    })

    if (result) {
      const { name, email, userId, token } = result.data
      useAuthStore.getState().setAuth(token, { name, email, userId })
      return true
    }

    return false
  }
}))
