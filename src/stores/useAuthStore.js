import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  token: '',
  userInfo: null,

  logoutAction: () => {
    localStorage.clear()
    set({ token: '', userInfo: null })
  },

  setAuth: (token, userInfo) => {
    localStorage.setItem("token", token)
    localStorage.setItem("userInfo", JSON.stringify(userInfo))
    set({ token, userInfo })
  },
}))
