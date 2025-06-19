import { refreshAuthToken } from '@/apis/auth'
import { toast } from 'sonner'
import { create } from 'zustand'
import { jwtDecode } from 'jwt-decode'

export const useAuthStore = create((set, get) => ({
  token: '',
  userInfo: null,
  isHydrated: false,
  exp: 0,

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
        const { exp } = jwtDecode(token)
        const now = Date.now()

        if (exp * 1000 <= now) {
          localStorage.clear()
        } else {
          set({
            token,
            exp: exp,
            userInfo: JSON.parse(userInfo),
          })
        }
      } catch (err) { // INFO: 파싱 실패 경우
        console.error('유저 정보 파싱 실패', err)
        localStorage.clear()
      }
    }

    set({ isHydrated: true }) // INFO: 토큰이 없는 경우
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
