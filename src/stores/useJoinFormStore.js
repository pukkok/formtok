import { create } from 'zustand'
import { join, sendOtp, verifyOtp, idDuplicateCheck } from '@/apis/auth'
import { toast } from 'sonner'
import { safeRequest } from '@/utils/safeRequest'

const INITIAL_JOIN_FORMS = {
  name: '', userId: '', email: '', otp: '',
  phone: '', password: '', confirmPassword: ''
}
const INITIAL_PASS = { userId: false, email: false }

export const useJoinFormStore = create((set, get) => ({
  joinInputs: INITIAL_JOIN_FORMS,
  pass: INITIAL_PASS,
  hideOtp: true,

  setJoinInputs: (inputs) => set({ joinInputs: inputs }),  
  setPass: (pass) => set({ pass : pass }),

  joinTyping: (e) => {
    const { name, value } = e.target
    const prevJoinInputs = get().joinInputs
    const prevPass = get().pass

    if (name === 'phone') {
      let onlyNums = value.replace(/[^\d]/g, '').slice(0, 11)
      let formatted = onlyNums
      if (onlyNums.length < 4) {
        formatted = onlyNums
      } else if (onlyNums.length < 8) {
        formatted = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
      } else {
        formatted = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7)}`
      }

      set({ joinInputs: { ...prevJoinInputs, [name]: formatted } })
      return
    }

    set({ joinInputs: { ...prevJoinInputs, [name]: value } })

    if (name === 'userId') set({ pass: { ...prevPass, userId: false } })
    if (name === 'email') set({ pass: { ...prevPass, email: false } })
  },

  resetJoinInputs: () => {
    set({ joinInputs: INITIAL_JOIN_FORMS })
  },

  resetPass: () => {
    set({ pass: INITIAL_PASS })
  },

  idDuplicateCheckAction: async () => {
    const userId = get().joinInputs.userId
    const { result } = await safeRequest(idDuplicateCheck(userId), {
      loadingMessage: 'ID 검사 중...',
      successMessage: '사용가능한 아이디 입니다.',
      onError: (err) => toast.error(err.msg, { duration: 1500 })
    })
    if (result) {
      set((state) => ({
        pass: { ...state.pass, userId: true }
      }))
    }
  },

  sendOtpAction: async () => {
    const email = get().joinInputs.email
    const { result } = await safeRequest(sendOtp(email), {
      successMessage: '메일이 발송되었습니다.',
      onError: () => toast.error('메일 발송에 실패하였습니다.', { duration: 1500 })
    })
    if (result) set({ hideOtp: false })
  },

  verifyOtpAction: async () => {
    const { email, otp } = get().joinInputs
    const { result } = await safeRequest(verifyOtp(email, otp), {
      successMessage: '인증이 완료되었습니다.',
      onError: (err) => toast.error(err.msg)
    })
    if (result) {
      set((state) => ({
        pass: { ...state.pass, email: true },
        joinInputs: { ...state.joinInputs, otp: '' },
        hideOtp: true
      }))
    }
  },

  joinAction: async () => {
    const inputs = get().joinInputs
    const { result } = await safeRequest(join(inputs), {
      successMessage: '회원가입이 완료되었습니다.',
      onError: (err) => toast.error(err.msg)
    })
    return !!result
  }
}))
