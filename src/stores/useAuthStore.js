import { refreshAuthToken } from '@/apis/auth'
import { toast } from 'sonner'
import { create } from 'zustand'

export const useAuthStore = create((set, get) => ({
  token: '',
  userInfo: null,
  isHydrated: false,

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
        set({ token, userInfo: JSON.parse(userInfo), isHydrated: true })
      } catch (err) { // INFO: 실패 경우
        console.error('유저 정보 파싱 실패', err)
        localStorage.clear()
        set({ isHydrated : true })
      } 
    } else { // INFO: 토큰이 없는 경우
      set({ isHydrated : true })
    }
  },

  refreshAuthTokenAction : async () => {
    const oldToken = get().token
    const newToken = await refreshAuthToken(oldToken)
    
    if(newToken) {
      toast.success('로그인 시간이 연장되었습니다.', {duration : 1000})
      localStorage.setItem("token", newToken)
      set({token : newToken})
    }
  }
}))
