import axios from "axios"
import { useRecoilValue } from "recoil"
import { pagesAtom, randomKey } from "../Recoils/surveyAtoms"
import { useNavigate } from "react-router-dom"
axios.defaults.baseURL = process.env.REACT_APP_RESTAPI_URL

const useAxios = () => {
    const pages = useRecoilValue(pagesAtom)

    // 처음 켰을때 토큰 만료인지 확인
    // 만료되어 있다면 토큰 삭제
    const firstExpiredTokenCheck = (token) => {
        axios.post('/auth', {} ,
            {headers : {'Authorization' : `Bearer ${token}`}}
        ).catch(error => {
            if(error.status === 404) console.clear()
            if(error.response.data.errName){
                localStorage.clear()
            }
        })
    }

    const navigate = useNavigate()
    // 사용중일 때 토큰 만료시 로그인 페이지로 이동
    const expiredTokenCheck = (err) => { 
        if(err.response.data.errName === 'TokenExpiredError'){
            alert('세션이 만료되었습니다. 로그인 페이지로 이동합니다.')
            localStorage.clear()
            console.clear()
            navigate('/user/login')
        }
    }

    /** 아이디, 패스워드 */
    const login = async (userId, password) => {
        try {
            const { data } = await axios.post("/user/login", { userId, password })
            if (data.code === 200) {
                const {name, email, userId, token} = data.data
                console.log(`${name} 로그인`)
                localStorage.setItem("token", token)
                localStorage.setItem('userInfo', JSON.stringify({name, email, userId}))
                return data.data
            } else {
                console.log(data.msg)
            }
        } catch (error) {
            console.log('로그인 오류:', error)
        }
    }
    /** 이름, 아이디, 이메일, 연락처, 패스워드, 패스워드확인 */
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

    const createForm = async (url, title, pages, token) => {
        try {
            const { data } = await axios.post("/form/create", 
            { url, title, pages },
            {headers : {'Authorization' : `Bearer ${token}`}} // 헤더
            )
            if (data.code === 200) {
                console.log('저장 성공')
                return data.data
            } else {
                console.log(data.msg)
            }
        } catch (error) {
            console.log('오류 발생:', error)
        }
    }

    const saveQ = async (pi, qi, token) => {
        const question = pages[pi].questions[qi]
        const id = randomKey()
        const {q, d: description, type, options, hasExtraOption} = question
        const { data } = await axios.post('/form/question/save', 
            { id, q, description, type, options, hasExtraOption},
            {headers : {'Authorization' : `Bearer ${token}`}}
        )
        if(data.code === 200){
            console.log('문항 저장 성공')
        }
    }

    
    const getMyQuestionList = async (token) => {
        try{
            const {data} = await axios.post('/form/question/load', {},
                {headers : {'Authorization' : `Bearer ${token}`}}
            )
            if(data.code === 200){
                return data.questions
            }
        }catch (error) {
            // console.log(error.response)
            // expiredTokenCheck(error)
            return []
        }
    }

    return { 
        firstExpiredTokenCheck,
        login, join, 
        createForm, saveQ, getMyQuestionList }
}
export default useAxios