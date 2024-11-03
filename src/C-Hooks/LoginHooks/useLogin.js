import axios from "axios"

const useLogin = () => {
  /** 아이디, 패스워드 */
  const login = async (userId, password) => {
    try {
      const { data } = await axios.post("/user/login", { userId, password })
      if (data.code === 200) {
        const {name, email, userId, token} = data.data
        localStorage.setItem("token", token)
        localStorage.setItem('userInfo', JSON.stringify({name, email, userId}))
        return data.data
      } else {
        alert(data.msg)
      }
    } catch (error) {
      console.log('로그인 오류')
    }
  }

  // 아이디 중복 확인
  const idDupCheck = async (userId) => {
    try {
      const {data} = await axios.post('/user/join/id-check', {
          userId
      })
      if(data.code === 200){ // 아이디 사용 가능
          alert(data.msg)
          return true
      }else{ // 아이디 사용 불가
          alert(data.msg)
      }
    } catch (error) {
      console.log('아이디 중복 확인 오류')
    }
  }

  /** 이름, 아이디, 이메일, 연락처, 패스워드, 패스워드확인 */
  const join = async ({ name, userId, email, phone, password, confirmPassword }) => {
    try {
      const { data } = await axios.post(`/user/join`, {
        name, userId, email, phone, password, confirmPassword
      })
      if (data.code === 200) {
        alert('회원가입이 완료되었습니다.')
        return true
      } else {
        alert(data.msg)
        return false
      }
    } catch (error) {
      console.log('회원가입 오류')
    }
  }

  // 이메일 인증
  const sendOtp = async (email) => {
    try {
      const { data } = await axios.post('/confirm/send-otp', { email })
      if(data.code === 200){
        alert('메일이 발송되었습니다.')
        return true
      }else{
        alert('메일 발송에 실패하였습니다.')
        return false
      }
    } catch (error) {
      console.error('메일 발송 오류')
    }
  }

  // 인증 코드 확인
  const verifyOtp = async (email, otp) => {
    try {
      const { data } = await axios.post('/confirm/verify-otp', { email, otp });
      if(data.code === 200){
        alert('인증이 완료되었습니다.')
        return true
      }else{
        alert('인증에 실패하였습니다.')
        return false
      }
    } catch (error) {
      console.error('OTP 확인 에러')
    }
  }

  return {
    login, join, idDupCheck, sendOtp, verifyOtp
  }
}

export default useLogin