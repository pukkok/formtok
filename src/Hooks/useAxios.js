import axios from "axios"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { originalDataAtom, pagesAtom, randomKey } from "../Recoils/surveyAtoms"

axios.defaults.baseURL = origin.includes('localhost') ? `http://localhost:5000` : process.env.REACT_APP_RESTAPI_URL

const useAxios = () => {
    const pages = useRecoilValue(pagesAtom)
    const setOriginalData = useSetRecoilState(originalDataAtom)

    const refreshAuthToken = async (oldToken) => {
        try {
            const { data } = await axios.post('/refresh-token', {}, 
                {headers : {'Authorization' : `Bearer ${oldToken}`}} // 헤더
            )
            const newToken = data.token
            // 새로운 토큰을 로컬 스토리지에 저장하거나 다른 방식으로 관리
            alert('로그인 시간이 연장되었습니다.')
            localStorage.setItem('token', newToken)
            return newToken
        } catch (error) {
            alert('로그인 상태가 아닙니다.')
            // console.error('토큰 갱신 실패', error)
            // localStorage.clear()
        }
    }

    /** 아이디, 패스워드 */
    const login = async (userId, password) => {
        try {
            const { data } = await axios.post("/user/login", { userId, password })
            if (data.code === 200) {
                const {name, email, userId, token} = data.data
                // console.log(`${name} 로그인`)
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

    const createForm = async (url, title, pages, listStyle, options, token) => {
        try {
            const { data } = await axios.post("/form/create", 
            { url, title, pages, listStyle, options },
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

    const saveForm = async (url, title, pages, endingMent, listStyle, options, token) => {
        try{
            const { data } = await axios.post('/form/edit', 
            { url, title, endingMent, pages, listStyle, options},
            {headers : {'Authorization' : `Bearer ${token}`}}
            )
            if(data.code === 200) {
                setOriginalData(prev=> {
                    return prev = {...prev, title, endingMent, pages, listStyle, options}
                })
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

    const loadAllForms = async () => {
        try{
            const {data} = await axios.get('/form/all-forms')
            if(data.code === 200){
                return data.forms
            }else{
                alert('불러올 데이터가 없습니다.')
                return false
            }
        }catch(err){
            return console.log('전체 설문지 불러오기 실패')
        }
    }

    const loadSubmitForm = async (url) => {
        try{
            const {data} = await axios.get(`/form/submit-form/?url=${url}`)
            if(data.code === 200){
                return data.form
            }else{
                alert('설문지 불러오기에 실패했습니다.')
                return false
            }

        }catch(err){
            return console.log('선택한 설문지 불러오기 실패')
        }
    }

    const submitAnswer = async (userId, url, answer) => {
        try{
            const {data} = await axios.post('/answer/submit', {
                userId, url, answer
            })
            if(data.code === 200){
                alert(data.msg)
                return true
            }else{
                alert(data.msg)
                return false
            }
        }catch(err){
            return console.log('설문지 제출 오류')
        }
    }

    return { 
        refreshAuthToken, 
        login, join, idDupCheck, sendOtp, verifyOtp,
        createForm, saveForm, copyForm, deleteForm,
        saveQ, 
        getMyFormList, getMyQuestionList,
        loadAllForms, loadSubmitForm,
        submitAnswer,
    }
}
export default useAxios