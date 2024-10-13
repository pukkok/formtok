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
import dayjs from "dayjs";

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
            // console.log(forms)
            setSerachedForms(forms)
            setMyForms(forms)
        }
        if(token && myForms.length === 0) getForms()
    }, [token, getMyFormList, myForms])

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

    const lightCheck = (isOpen, isEnd, isUseStartPeriod, startDate, endDate ) => {
        const now = dayjs()
        const start = startDate ? dayjs(startDate) : null
        const end = endDate ? dayjs(endDate) : null
        if(isEnd) return 'stop' // 설문 종료
        if(!isOpen) return 'making' // 설문게시 전
        if(!isUseStartPeriod || start?.isBefore(now) && (end?.isAfter(now) || !end)) return 'working'
        if(start?.isAfter(now)) return 'ready'
        if(end?.isBefore(now)) return 'stop'
        return ''
    }

    const [active, setActive] = useState(null)
    const search = (word) =>{
        const filteredForms = myForms.filter(form => form.title.includes(word))
        setActive(null)
        setSerachedForms(filteredForms)
    }

    const filtering = (work) => {
        setActive(work)
        if(!work) return setSerachedForms(myForms)
        const filteredForms = myForms.filter(form => {
            const { isOpen, isEnd, isUseStartPeriod, startDate, endDate } = form.options
            return work === lightCheck(isOpen, isEnd, isUseStartPeriod, startDate, endDate)
        })
        setSerachedForms(filteredForms)
    }

    const filters = [
        {work : null, text: '전체'},
        {work : 'making', text: '작성 중'},
        {work : 'ready', text: '설문 시작 전'},
        {work : 'working', text: '설문 진행 중'},
        {work : 'stop', text: '설문 종료'}
    ]

    return (
        <SurveyManagerWrapper>
            
            <header>
            <SearchForm placeholder="제목으로 검색" handleClick={search}/>

            <div>
                {filters.map(filter => {
                    const {work, text} = filter
                    return <button 
                        key={text} 
                        className={classNames(work, {active: active === work})}
                        onClick={() => filtering(work)}
                    >{text}</button>
                })}
            </div>
            </header>

            <div className="template-box">
                <div className="card">
                    <button className="create-survey-button" onClick={openModal}>
                        <AddCircleIcon/>
                    </button>
                </div>
                {searchedForms.length > 0 && searchedForms.map(form => {
                    const {title, url, pages, endingMent, listStyle, options, numberOfResponses, createdAt, lastModifiedAt} = form
                    // console.log(form)
                    const {isOpen, isEnd, isUseStartPeriod, startDate, endDate, maximumCount} = options
                    const light = lightCheck(isOpen, isEnd, isUseStartPeriod, startDate, endDate)
                    
                    return <div key={url} className="card">
                        <div className="form-box" onClick={() => goToLoadForm(title, url, pages, endingMent, listStyle, options)}>
                            <div className="form-status">
                                <span className={classNames("light", light)}></span>
                                <button title="복사" onClick={e=>copyFormAction(e, url, token)}><Icon code={'content_copy'}/></button>
                                <button title="삭제" onClick={e=>deleteFormAction(e, url, token)}><Icon code={'delete'}/></button>
                            </div>
                            <h4>{title}</h4>
                            <div className="info">
                                <p>생성일 | {dayjs(createdAt).format('YYYY-MM-DD')} </p>
                                <p>마지막 수정일 | {dayjs(lastModifiedAt).format('YYYY-MM-DD')}</p>
                                {/* <p>참여 {numberOfResponses.length || 0} | {maximumCount ? `최대 ${maximumCount}`: '제한 없음' }</p>
                                <p>{startDate ? <> 
                                    {startDate ? dayjs(startDate).format('YYYY-MM-DD') : '기간 제한 없음'}
                                    <span> ~ </span>  
                                    {endDate ? dayjs(endDate).format('YYYY-MM-DD') : '제한 없음'}
                                    </> :
                                    '기간 제한 없음'
                                    }
                                </p> */}
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