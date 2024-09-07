import axios from "axios"
axios.defaults.baseURL = process.env.REACT_APP_RESTAPI_URL

const useAxios = () => {
    const login = async (userId, password) => {
        try {
            const { data } = await axios.post(`/user/login`, { userId, password })
            if (data.code === 200) {
                console.log('로그인 완료', data.data)
                return data.data // 로그인 성공 시 사용자 데이터 반환
            } else {
                console.log(data.msg)
            }
        } catch (error) {
            console.log('로그인 오류:', error)
        }
    }

    const join = async ({ name, userId, email, phone, password, confirmPassword }) => {
        try {
            const { data } = await axios.post(`/user/join`, {
                name, userId, email, phone, password, confirmPassword
            })
            if (data.code === 200) {
                console.log('회원가입 성공:', data.msg)
                return data.msg
            } else {
                console.log('회원가입 실패:', data.msg)
            }
        } catch (error) {
            console.error('회원가입 오류:', error)
        }
    }

    return { login, join }
}
export default useAxios