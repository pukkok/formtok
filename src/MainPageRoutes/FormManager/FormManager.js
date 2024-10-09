import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddCircleIcon, Icon } from "../../Components/Icons";
import { surveyTitleAtom, endingMentAtom, surveyListStyleAtom, surveyOptionsAtom, originalDataAtom } from "../../Recoils/surveyAtoms";
import { useSetRecoilState } from "recoil";
import { SurveyManagerWrapper } from "./_StyledFormManager";
import SearchForm from "../../Components/SearchForm";
import useAxios from "../../Hooks/useAxios";
import classNames from "classnames";
import usePageActions from "../../Hooks/usePageActions";
import CreateFormModal from "./CreateFormModal";

function FormManager () {
    const setTitle = useSetRecoilState(surveyTitleAtom)
    const setEndingMent = useSetRecoilState(endingMentAtom)
    const setSurveyListStyle = useSetRecoilState(surveyListStyleAtom)
    const setSurveyOptions = useSetRecoilState(surveyOptionsAtom)
    const setOriginalData = useSetRecoilState(originalDataAtom)
    const naviate = useNavigate()
    const token = localStorage.getItem('token')

    const [myForms, setMyForms] = useState([]) // 전체 데이터
    const [searchedForms, setSerachedForms] = useState([]) // 초기 데이터

    // custom hooks
    const { getMyFormList, copyForm, deleteForm } = useAxios()
    const { loadPages } = usePageActions() 

    useEffect(() => {
        const getForms = async () => {
            const forms = await getMyFormList(token)
            setSerachedForms(forms)
            setMyForms(forms)
        }
        if(token && myForms.length === 0) getForms()
    }, [token, getMyFormList])

    // 모달 열고 닫기
    const createFormModalRef = useRef(null)
    const openModal = () => {
        createFormModalRef.current.showModal()
    }

    // 불러온 폼으로 이동
    const goToLoadForm = (title, url, pages, endingMent={title: '', description: ''}, listStyle, options) => {
        setTitle(title)
        loadPages(pages)
        setEndingMent(endingMent)
        setSurveyListStyle(listStyle)
        setSurveyOptions(options)

        setOriginalData({title, pages, endingMent, listStyle, options}) // 불러온 처음 데이터 저장
        naviate(`/my-form/edit/${url}`)
    }
    
    const search = (word) =>{
        const filteredForms = myForms.filter(form => form.title.includes(word))
        setSerachedForms(filteredForms)
    }

    const copyFormAction = async (e, url, token) => {
        e.stopPropagation()
        const success = await copyForm(url, token)
        if(success){
            const forms = await getMyFormList(token)
            alert('복사되었습니다.')
            setSerachedForms(forms)
            setMyForms(forms)
        }
    }

    const deleteFormAction = async (e, url, token) => {
        e.stopPropagation()
        
        let lastChance = prompt(`정말로 삭제를 원하시나요? \n삭제를 원하시면 "삭제"를 입력해주세요`)
        if(lastChance !== '삭제') return alert('취소 되었습니다.')

        const success = await deleteForm(url, token)
        if(success){
            const forms = await getMyFormList(token)
            alert('설문지가 삭제되었습니다.')
            setSerachedForms(forms)
            setMyForms(forms)
        }
    }

    const testlayouts = [ // 임시 틀 데이터
        {count: '응답 72', full: '응답제한 200', startDate: '2024.05.12', endDate: '2024.05.24', light: 'stop'},
        {count: '응답 10', full: '응답제한 없음', startDate: '2024.05.24', endDate: '2024.05.30', light: 'making'},
        {count: '응답 100', full: '응답제한 100', startDate: '2024.06.30', endDate: '2024.07.15', light: 'stop'},
        {count: '응답 25', full: '응답제한 50', startDate: '2024.07.11', endDate: null, light: 'ready' },
        {count: '응답 80', full: '응답제한 200', startDate: '2024.07.24', endDate: '2024.08.02', light: 'ready'},
        {count: '응답 120', full: '응답제한 없음', startDate: '2024.08.03', endDate: null, light: 'working'},
        {count: '응답 110', full: '응답제한 200', startDate: '2024.08.08', endDate: null, light: 'working'},
        {count: '응답 60', full: '응답제한 300', startDate: '2024.08.13', endDate: '2024.09.12', light: 'green'},
        {count: '응답 40', full: '응답제한 100', startDate: '2024.09.27', endDate: '2024.09.28', light: 'green'},
        {count: '응답 80', full: '응답제한 120', startDate: '2024.10.12', endDate: '2024.10.19', light: 'green'},
        {count: '응답 20', full: '응답제한 100', startDate: '2024.10.12', endDate: null},
    ]

    // const allQuetinoCount = pages.reduce((acc, currentPage) => {
    //     return acc += currentPage.questions.length
    // }, 0)

    return (
        <SurveyManagerWrapper>
            <SearchForm placeholder="제목으로 검색" handleClick={search}/>
            
            <div className="template-box">
                <div className="card">
                    <button className="create-survey-button" onClick={openModal}>
                        <AddCircleIcon/>
                    </button>
                </div>
                {searchedForms.length > 0 && searchedForms.map((form, idx) => {
                    
                    const {title, url, pages, endingMent, listStyle, options} = form
                    //임시
                    const {count, full, startDate, endDate, light} = testlayouts[idx]
                    return <div key={url} className="card">
                        <div className="form-box" onClick={() => goToLoadForm(title, url, pages, endingMent, listStyle, options)}>
                            <div className="form-status">
                                <span className={classNames("light", light)}></span>
                                <button title="복사" onClick={e=>copyFormAction(e, url, token)}><Icon code={'content_copy'}/></button>
                                <button title="삭제" onClick={e=>deleteFormAction(e, url, token)}><Icon code={'delete'}/></button>
                            </div>
                            <h4>{title}</h4>
                            <div className="info">
                                <p>{count} | {full}</p>
                                <p>{startDate} ~ {endDate || ''}</p>
                            </div>
                        </div>
                    </div>
                })}
            </div>

            <CreateFormModal token={token} ref={createFormModalRef}/>
            
        </SurveyManagerWrapper>
    )
}
export default FormManager





// 시작 전 // 노란 불, 중지 // 빨간 불, 종료, 진행 중 // 녹색불 , 작성 중 // 파란색

// 접속시 => 설문이 종료되었습니다.
// 시작 전 => 설문 시작일(0월 0일 09:00시) 부터 설문이 가능합니다.