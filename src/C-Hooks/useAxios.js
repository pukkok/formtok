import axios from "axios"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { originalDataAtom, pagesAtom, randomKey } from "../C-Recoils/surveyAtoms"
import { useCallback } from "react"

axios.defaults.baseURL = origin.includes('localhost') ? `http://localhost:5000` : process.env.REACT_APP_RESTAPI_URL

const useAxios = () => {
    const pages = useRecoilValue(pagesAtom)
    const setOriginalData = useSetRecoilState(originalDataAtom)
    const token = localStorage.getItem('token') || ''

    const refreshAuthToken = async (oldToken) => {
        try {
            const { data } = await axios.post('/refresh-token', {}, 
                {headers : {'Authorization' : `Bearer ${oldToken}`}} 
            )
            const newToken = data.token
            // 새로운 토큰을 로컬 스토리지에 저장하거나 다른 방식으로 관리
            alert('로그인 시간이 연장되었습니다.')
            localStorage.setItem('token', newToken)
            return newToken
        } catch (error) {
            alert('로그인 상태가 아닙니다.')
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

    const saveForm = async (url, title, pages, endingMent, listStyle, options) => {
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
                return true
            }else{
                console.log(data.msg)
            }
        } catch (error) {
            // console.log('설문지 저장 오류 발생')
            if(error.response.status === 401){ // 권한 없음
                return false
            }
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
                console.log('설문지 삭제 완료')
                return true
            }else{
                console.log(data.msg)
            }
        }catch (error) {
            console.log('설문지 삭제 오류 발생')
        }
    }

    const saveQ = async (pi, qi) => { // 질문 저장
        const question = pages[pi].questions[qi]
        const id = randomKey()
        const {q, d: description, type, options, hasExtraOption} = question
        try{
            const { data } = await axios.post('/form/question/save', 
                { id, q, description, type, options, hasExtraOption},
                {headers : {'Authorization' : `Bearer ${token}`}}
            )
            if(data.code === 200){
                console.log('문항 저장 성공')
            }
        } catch (error) {

        }
    }

    const getMyFormList = useCallback(async () => {
        if(!token) return []
        try{
            const {data} = await axios.post('/form/my-form/load', {},
                {headers : {'Authorization' : `Bearer ${token}`}}
            )
            if(data.code === 200) return data.forms
            else return []
        }catch (error){
            return []
        }
    }, [token])

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

    const loadAllForms = useCallback(async () => {
        try{
            const {data} = await axios.get('/form/all-forms')
            if(data.code === 200){
                return data.forms
            }else{
                alert('불러올 데이터가 없습니다.')
                return false
            }
        }catch(error){
            return console.log('전체 설문지 불러오기 실패')
        }
    }, [])

    const loadSubmitForm = useCallback(async (url) => {
        try{
            const {data} = await axios.post(`/form/submit-form/?url=${url}`, {},
                {headers : {'Authorization' : `Bearer ${token}`}}
            )
            return data
        }catch(error){
            alert(error.response.data.msg)
            return false
        }
    },[token])

    const submitAnswer = async (url, answers) => {
        try{
            const {data} = await axios.post(`/answer/submit/?url=${url}`, 
                {answers},
                {headers : {'Authorization' : `Bearer ${token}`}})
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
        createForm, saveForm, copyForm, deleteForm,
        saveQ, 
        getMyFormList, getMyQuestionList,
        loadAllForms, loadSubmitForm,
        submitAnswer,
    }
}
export default useAxios