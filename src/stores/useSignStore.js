import { idDuplicateCheck, join, login, sendOtp, verifyOtp } from "@/apis/auth";
import { safeRequest } from "@/utils/safeRequest";
import { toast } from "sonner";

const { create } = require("zustand");

const INITIAL_LOGIN_FORMS = {userId: '', password: ''}
const INITIAL_JOIN_FORMS = {name: '', userId: '', email: '', otp:'', phone: '', password: '', confirmPassword : ''}
const INITIAL_PASS = { userId: false, email: false }

export const useSignStore = create((set, get) => ({

  // INFO: 폼 변경을 위한 ACTIVE 관리
  activeForm: 'login',
  changeActiveForm: (form) => {
    set({activeForm : form})
    if (form === 'login') {
      get().resetJoinInputs()
      get().resetPass()
      set({ hideOtp : true })
    } else {
      get().resetLoginInputs()
    }
  },
  
  loginInputs: INITIAL_LOGIN_FORMS,
  // INFO : 로그인 입력창 타이핑
  loginTyping : (e) => {
    const prevLoginInputs = get().loginInputs
    const { name, value } = e.target
    set({loginInputs : { ...prevLoginInputs, [name] : value }}) 
  },
  resetLoginInputs: () => {
    set({ loginInputs: INITIAL_LOGIN_FORMS })
  },

  // INFO: 회원가입시 패스 처리
  pass: INITIAL_PASS,
  resetPass: () => {
    set({pass: INITIAL_PASS})
  },

  // INFO: OTP 숨기기
  hideOtp: true,

  joinInputs: INITIAL_JOIN_FORMS,
  joinTyping: (e) => {
    const prevPass = get().pass
    const prevJoinInputs = get().joinInputs
		const { name, value } = e.target

    if (name === 'phone') {
      let onlyNums = value.replace(/[^\d]/g, '').slice(0, 11)

      // 하이픈 포맷
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

		set({joinInputs : { ...prevJoinInputs, [name]: value }})

		if (name === 'userId') set({ pass : { ...prevPass, userId: false } })
		if (name === 'email') set({ pass : { ...prevPass, email: false } })
	},
  resetJoinInputs: () => {
    set({ joinInputs: INITIAL_JOIN_FORMS })
  },
  
  // INFO : 현재 input의 name을 확인한다.
  currentFocusedInputName : '',
  setCurrentFocusedInputName: (value) => {
    set({currentFocusedInputName : value})
  },

  // INFO: 캡스락 상태 관리
  isCapsLockActive: false,
  setIsCapsLockAcive: (value) => {
    set({isCapsLockActive : value})
  },

  loginAction: async () => {
    const { userId, password } = get().loginInputs
    const { result } = await safeRequest(login(userId, password), {
      onError: (err) => toast.error(err.msg, {duration : 2000})
    })

    if(result) {
      const { name, email, userId, token } = result.data
      localStorage.setItem("token", token)
      localStorage.setItem('userInfo', JSON.stringify({ name, email, userId }))
      return result.data
    }

    return false
  },

  idDuplicateCheckAction: async () => {
    const userId = get().joinInputs.userId
    const { result } = await safeRequest(idDuplicateCheck(userId), {
      successMessage: '사용가능한 아이디 입니다.',
      onError: (err) => toast.error(err.msg, { duration : 1500 })
    })
    if (result) {
      const prevPass = get().pass
      set({pass : { ...prevPass, userId: true } })
    }
  },

  sendOtpAction: async () => {
    const email = get().joinInputs.email
    const { result } = await safeRequest(sendOtp(email), {
      successMessage: '메일이 발송되었습니다.',
      onError: (err) => toast.error('메일 발송에 실패하였습니다.', { duration: 1500 })
    })
    if(result) set({hideOtp : false})
  },

  verifyOtpAction: async () => {
    const { email, otp } = get().joinInputs
    const { result } = await safeRequest(verifyOtp(email, otp), {
      successMessage: '인증이 완료되었습니다.',
      onError: (err) => toast.error(err.msg)
    })
    if(result) {
      const prevPass = get().pass
      const prevJoinInputs = get().joinInputs
      set({
        pass : {...prevPass, email: true },
        joinInputs: { ...prevJoinInputs, otp: ''},
        hideOtp : true
      })
    }
  },

  joinAction: async () => {
    const inputs = get().joinInputs
    const { result } = await safeRequest(join({ ...inputs }), {
      successMessage: '회원가입이 완료되었습니다.',
      onError: (err) => toast.error(err.msg)
    })
    if(result) return true
    else return false
  }
  

}))