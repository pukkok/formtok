import { refreshAuthToken } from '@/apis/auth'
import { toast } from 'sonner'
import { create } from 'zustand'

export const useAuthStore = create((set, get) => ({
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

  initializeAuth: () => {
    const token = localStorage.getItem('token')
    const userInfo = localStorage.getItem('userInfo')
    if (token && userInfo) {
      try {
        set({ token, userInfo: JSON.parse(userInfo) })
      } catch (err) {
        console.error('유저 정보 파싱 실패', err)
        localStorage.clear()
      }
    }
  },

  refreshAuthTokenAction : async () => {
    const oldToken = get().token
    const newToken = await refreshAuthToken(oldToken)

    if(newToken) {
      toast.success('로그인 시간이 연장되었습니다.', {duration : 1000})
      set({token : newToken})
    }
  }
}))
