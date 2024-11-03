import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { surveyTitleAtom, endingMentAtom, surveyListStyleAtom, surveyOptionsAtom, originalDataAtom } from "../C-Recoils/surveyAtoms"
import { useSetRecoilState } from "recoil"
import { SurveyManagerWrapper } from "./_StyledFormManager"
import SearchForm from "../A-Components/SearchForm"
import useAxios from "../C-Hooks/useAxios"
import classNames from "classnames"
import usePageActions from "../C-Hooks/usePageActions"
import CreateFormModal from "./CreateFormModal"
import dayjs from "dayjs"

import { IoMdAddCircle } from "react-icons/io";
import SearchFilter from "../A-Components/SearchFilter"
import { CopyIcon, DeleteIcon } from "../A-Components/Icons/Icons"

function FormManager() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    // Recoil 상태 관리 (설문 데이터 설정)
    const setTitle = useSetRecoilState(surveyTitleAtom)
    const setEndingMent = useSetRecoilState(endingMentAtom)
    const setSurveyListStyle = useSetRecoilState(surveyListStyleAtom)
    const setSurveyOptions = useSetRecoilState(surveyOptionsAtom)
    const setOriginalData = useSetRecoilState(originalDataAtom)

    // 상태 값: 전체 설문 목록과 검색된 설문 목록
    const [myForms, setMyForms] = useState([])
    const [searchedForms, setSearchedForms] = useState([])

    // Axios 커스텀 훅: 설문 리스트, 복사, 삭제 기능
    const { getMyFormList, copyForm, deleteForm } = useAxios()
    const { loadPages } = usePageActions()

    // 모달 참조
    const createFormModalRef = useRef(null)

    // 페이지 처음 로드 시, 설문 목록 불러오기
    useEffect(() => {
        const fetchForms = async () => {
            if (token && myForms.length === 0) {
                const forms = await getMyFormList(token)
                setMyForms(forms)
                setSearchedForms(forms)
            }
        }
        fetchForms()
    }, [token, getMyFormList, myForms])

    // 모달 열기
    const openModal = () => createFormModalRef.current.showModal()

    // 선택한 설문 불러오기
    const goToLoadForm = (title, url, pages, endingMent, listStyle, options) => {
        setTitle(title)
        loadPages(pages)
        setEndingMent(endingMent)
        setSurveyListStyle(listStyle)
        setSurveyOptions(options)
        setOriginalData({ title, pages, endingMent, listStyle, options })
        navigate(`/my-form/edit/${url}`)
    }

    // 설문 복사
    const copyFormAction = async (e, url) => {
        e.stopPropagation()
        const success = await copyForm(url, token)
        if (success) {
            const forms = await getMyFormList(token)
            alert('복사되었습니다.')
            setMyForms(forms)
            setSearchedForms(forms)
        }
    }

    // 설문 삭제
    const deleteFormAction = async (e, url) => {
        e.stopPropagation()
        const confirmation = prompt('정말로 삭제하시겠습니까? "삭제"를 입력해주세요.')
        if (confirmation !== '삭제') return alert('취소되었습니다.')

        const success = await deleteForm(url, token)
        if (success) {
            const forms = await getMyFormList(token)
            alert('설문지가 삭제되었습니다.')
            setMyForms(forms)
            setSearchedForms(forms)
        }
    }

    // 설문의 상태 체크
    const lightCheck = (isOpen, isEnd, isUseStartPeriod, startDate, endDate) => {
        const now = dayjs()
        const start = startDate ? dayjs(startDate) : null
        const end = endDate ? dayjs(endDate) : null

        if (isEnd) return 'stop' // 설문 종료
        if (!isOpen) return 'making' // 설문 작성 중
        if (!isUseStartPeriod || (start?.isBefore(now) && (!end || end?.isAfter(now)))) return 'working' // 설문 진행 중
        if (start?.isAfter(now)) return 'ready' // 설문 시작 전
        if (end?.isBefore(now)) return 'stop' // 설문 종료

        return ''
    }
    const [active, setActive] = useState(null)
    // 검색 기능
    const search = (word) => {
        const filteredForms = myForms.filter((form) => form.title.includes(word))
        setActive(null)
        setSearchedForms(filteredForms)
    }

    // 필터링 기능
    const filtering = (work) => {
        setActive(work)
        if (!work) return setSearchedForms(myForms)

        const filteredForms = myForms.filter((form) => {
            const { isOpen, isEnd, isUseStartPeriod, startDate, endDate } = form.options
            return work === lightCheck(isOpen, isEnd, isUseStartPeriod, startDate, endDate)
        })

        setSearchedForms(filteredForms)
    }

    // 필터 옵션
    const filters = [
        { work: null, text: '전체' },
        { work: 'making', text: '작성 중', bgColor: '#779ecb' },
        { work: 'ready', text: '설문 시작 전', bgColor: '#ffd700'},
        { work: 'working', text: '설문 진행 중', bgColor: '#77dd77' },
        { work: 'stop', text: '설문 종료', bgColor: '#ff6961' }
    ]

    return (
        <SurveyManagerWrapper>
            <header>
                <SearchForm placeholder="제목으로 검색" handleClick={search} />
                <SearchFilter filters={filters} fitering={filtering} active={active}/>
            </header>

            {/* 설문 목록 표시 */}
            <div className="template-box">
                {/* 설문 생성 버튼 */}
                <div className="card">
                    <button className="create-survey-button" onClick={openModal}>
                        <IoMdAddCircle />
                    </button>
                </div>

                {/* 설문 카드 목록 */}
                {searchedForms.length > 0 &&
                    searchedForms.map((form) => {
                        const { title, url, pages, endingMent, listStyle, options, createdAt, lastModifiedAt } = form
                        const light = lightCheck(options.isOpen, options.isEnd, options.isUseStartPeriod, options.startDate, options.endDate)

                        return (
                            <div key={url} className="card">
                                <div className="form-box" onClick={() => goToLoadForm(title, url, pages, endingMent, listStyle, options)}>
                                    <div className="form-status">
                                        <span className={classNames("light", light)}></span>
                                        <button title="복사" onClick={(e) => copyFormAction(e, url)}>
                                            <CopyIcon />
                                        </button>
                                        <button title="삭제" onClick={(e) => deleteFormAction(e, url)}>
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                    <h4>{title}</h4>
                                    <div className="info">
                                        <p>생성일 | {dayjs(createdAt).format('YYYY-MM-DD')}</p>
                                        <p>마지막 수정일 | {dayjs(lastModifiedAt).format('YYYY-MM-DD')}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>

            {/* 설문 생성 모달 */}
            <CreateFormModal token={token} ref={createFormModalRef} />
        </SurveyManagerWrapper>
    )
}

export default FormManager
