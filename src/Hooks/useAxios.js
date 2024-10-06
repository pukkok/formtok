import axios from "axios"
import { useRecoilValue } from "recoil"
import { pagesAtom, randomKey } from "../Recoils/surveyAtoms"
// import { useNavigate } from "react-router-dom"

axios.defaults.baseURL = origin.includes('localhost') ? `http://localhost:5000` : process.env.REACT_APP_RESTAPI_URL

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

    const refreshAuthToken = async (oldToken) => {
        try {
            const { data } = await axios.post('/refresh-token', {}, 
                {headers : {'Authorization' : `Bearer ${oldToken}`}} // 헤더
            )
            const newToken = data.token
            // 새로운 토큰을 로컬 스토리지에 저장하거나 다른 방식으로 관리
            console.log('연장 완료')
            localStorage.setItem('token', newToken)
            return newToken
        } catch (error) {
            console.error('토큰 갱신 실패', error)
            // 필요한 경우 로그아웃 처리 또는 재인증 절차 진행
            // localStorage.clear()
        }
    }

    // const navigate = useNavigate()
    // 사용중일 때 토큰 만료시 로그인 페이지로 이동
    // const expiredTokenCheck = (err) => { 
    //     if(err.response.data.errName === 'TokenExpiredError'){
    //         alert('세션이 만료되었습니다. 로그인 페이지로 이동합니다.')
    //         localStorage.clear()
    //         console.clear()
    //         navigate('/user/login')
    //     }
    // }

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
                alert(data.msg)
            }
        } catch (error) {
            console.log('로그인 오류')
        }
    }
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
                console.log('회원가입 성공')
            } else {
                console.log('회원가입 실패')
            }
            return data.msg
        } catch (error) {
            console.log('회원가입 오류')
        }
    }

    const createForm = async (url, title, pages, token) => {
        try {
            const { data } = await axios.post("/form/create", 
            { url, title, pages },
            {headers : {'Authorization' : `Bearer ${token}`}} // 헤더
            )
            if (data.code === 200) {
                console.log('설문지 생성 성공')
                return true
            } else {
                console.log(data.msg)
            }
        } catch (error) {
            console.log('설문지 생성 오류 발생')
        }
    }

    const saveForm = async (url, title, pages, endingMent, token) => {
        try{
            const { data } = await axios.post('/form/edit', 
            { url, title, endingMent, pages},
            {headers : {'Authorization' : `Bearer ${token}`}}
            )
            if(data.code === 200) {
                alert('성공적으로 저장 되었습니다.')
            }else{
                console.log(data.msg)
            }
        } catch (error) {
            console.log('설문지 저장 오류 발생')
        }
    }

    const copyForm = async (url, token) => {
        try{
            const {data} = await axios.post('/form/my-form/copy', 
            {url},
            {headers : {'Authorization' : `Bearer ${token}`}}
            )
            if(data.code === 200){
                console.log('설문지 복사 성공')
                return true
            }else{
                console.log(data.msg)
            }
        }catch (error) {
            console.log('설문지 복사 오류 발생')
        }
    }

    const deleteForm = async (url, token) => {
        try{
            const {data} = await axios.post('/form/my-form/delete', 
            {url},
            {headers : {'Authorization' : `Bearer ${token}`}}
            )
            if(data.code === 200){
                console.log('삭제 완료')
                return true
            }else{
                console.log(data.msg)
            }
        }catch (error) {
            console.log('설문지 삭제 오류 발생')
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

    const getMyFormList = async (token) => {
        try{
            const {data} = await axios.post('/form/my-form/load', {},
                {headers : {'Authorization' : `Bearer ${token}`}}
            )
            if(data.code === 200) return data.forms
            else return []
        }catch (error){
            console.log(error)
            return []
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
            return []
        }
    }

    return { 
        firstExpiredTokenCheck, refreshAuthToken,
        login, join, idDupCheck,
        createForm, saveForm, copyForm, deleteForm,
        saveQ, 
        getMyFormList, getMyQuestionList }
}
export default useAxios