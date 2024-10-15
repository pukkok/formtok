import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { AnswerBoxAtom, endingMentAtom, pagesAtom, surveyListStyleSelector, surveyTitleAtom, surveyListStyleAtom, surveyOptionsAtom } from "../Recoils/surveyAtoms";
import {FormCardWrapper} from "../FormEditor/Card/FormCards.styled"
import DescriptionEditor from '../Components/DescriptionEditor'
import { Link, useNavigate, useParams, useResolvedPath } from "react-router-dom";
import ViewerQuestionForm from "./ViewerAnswerForm";
import { Icon } from "../Components/Icons";
import FormViewerHeader from "./FormViewerHeader";
import classNames from "classnames";
import useAxios from "../Hooks/useAxios";
import FormTokLoading from "../Components/FormTokLoading";
import { gridAtom } from "../Recoils/screenAtom";
import styled from "styled-components";

const FormViewerWrapper = styled.section`

    main{
        max-width: 700px;
        margin: 0 auto;
        margin-bottom: 10vh;
    }

    .btns{
        display: flex;
        button{
            display: flex;
            align-items: center;
            padding: 6px 8px;
            border-radius: 8px;
            gap: 10px
        }
    
        button.prev{
            background-color: var(--pk-standard-btn-bg);
            color: var(--pk-light-grey);
            margin-right: 12px;
        }
        button.next{
            background-color: var(--pk-point);
            color: var(--pk-light-grey);
        }
    }

    a{
        width: fit-content;
        display: flex;
        align-items: center;
        padding: 6px 8px;
        border-radius: 8px;
        gap: 10px;
        background-color: var(--pk-point);
        color: var(--pk-light-grey);
        cursor: pointer;
    }
`

function FormViewer() {
    const {surveyId} = useParams()
    const {pathname} = useResolvedPath()

    const setTitle = useSetRecoilState(surveyTitleAtom)
    const setPages = useSetRecoilState(pagesAtom)
    const setEndingMent = useSetRecoilState(endingMentAtom)
    const setSurveyListStyle = useSetRecoilState(surveyListStyleAtom)
    const setSurveyOptions = useSetRecoilState(surveyOptionsAtom)

    const pages = useRecoilValue(pagesAtom)
    const endingMent = useRecoilValue(endingMentAtom)
    const [answerBox, setAnswerBox] = useRecoilState(AnswerBoxAtom)
    const getListStyle = useRecoilValue(surveyListStyleSelector)

    const [isLoadingEnd, setIsLoadingEnd] = useState(false)
    const grid = useRecoilValue(gridAtom) // 화면 비율에 맞춰서 로딩 이미지 중앙에 배치

    const { loadSubmitForm } = useAxios()
    const navigate = useNavigate()


    useEffect(() => {
        if(pathname.includes('preview')){
            const newAnswerBox = pages.reduce((acc, page) => {
                const {id, questions} = page
                const newQuestions = questions.reduce((qAcc, question) => {
                    if(['날짜', '시간', '날짜 + 시간'].includes(question.type)){
                        qAcc[question.id] = {start:'', end:''}
                    }
                    else if(question.type ==='객관식(복수 선택)'){
                        qAcc[question.id] = {answer: [], useExtra: false, extra: ''}
                    }
                    else if(question.type ==='객관식'){
                        qAcc[question.id] = {answer: '', useExtra: false, extra: ''}
                    }
                    else{
                        qAcc[question.id] = {answer: ''}
                    }
                    return qAcc
                }, {})
                acc[id] = {...newQuestions}
                return acc
            }, {})
            return setAnswerBox(newAnswerBox)  
        }
        const loadSubmitFormAction = async () => {
            const {form, submittedAnswer} = await loadSubmitForm(surveyId)
            
            if(form){
                const {title, pages, endingMent, listStyle, options} = form
                setTitle(title)
                setPages(pages)
                setEndingMent(endingMent)
                setSurveyListStyle(listStyle)
                setSurveyOptions(options)
                if(submittedAnswer){
                    return setAnswerBox(submittedAnswer)
                }
                const newAnswerBox = pages.reduce((acc, page) => {
                    const {id, questions} = page
                    const newQuestions = questions.reduce((qAcc, question) => {
                        if(['날짜', '시간', '날짜 + 시간'].includes(question.type)){
                            qAcc[question.id] = {start:'', end:''}
                        }
                        else if(question.type ==='객관식(복수 선택)'){
                            qAcc[question.id] = {answer: [], useExtra: false, extra: ''}
                        }
                        else if(question.type ==='객관식'){
                            qAcc[question.id] = {answer: '', useExtra: false, extra: ''}
                        }
                        else{
                            qAcc[question.id] = {answer: ''}
                        }
                        return qAcc
                    }, {})
                    acc[id] = {...newQuestions}
                    return acc
                }, {})
                return setAnswerBox(newAnswerBox)
            }else{
                return navigate('/form-list')
            }
        }

        loadSubmitFormAction()
    }, [surveyId, navigate, pages, pathname,
        setAnswerBox, setTitle, setPages, setEndingMent, setSurveyListStyle, setSurveyOptions
    ])

    const [currentIdx, setCurrentIdx] = useState(0)
    const moveLogs = useRef([0]) // 움직인 기록 남기기
    const moveToPrevPage = () => {
        moveLogs.current.pop()
        setCurrentIdx(moveLogs.current.length > 0 ? moveLogs.current.length-1 : 0)
    }

    const canMoveToNextPage = () => {
        const currentPage = pages[currentIdx]
        if (!currentPage) return false
        const pageId = currentPage.id

        const essentialCheck = currentPage.questions.every(question => {
            const {id : questionId, essential, type, setPeriod} = question
            const answer = answerBox[pageId][questionId]
            if(essential){
                if(['날짜', '시간', '날짜 + 시간'].includes(type)){
                    if(setPeriod){
                        return answer.start !== '' && answer.end !== ''
                    }else{
                        return answer.start !== ''
                    }
                }
                else if(type ==='객관식(복수 선택)'){
                    return answer.length > 0
                }
                else{
                    return answer
                }
            }else{
                return true
            }
        })
        return essentialCheck
    }

    const moveToNextPage = () => {
        const essentialCheck = canMoveToNextPage()
        if(!essentialCheck) return alert('필수 질문에 대한 답변을 입력해주세요.')
        
        moveLogs.current = [...moveLogs.current, currentIdx]
        setCurrentIdx(pages[currentIdx].next || currentIdx+1)
    }

    const { submitAnswer } = useAxios()

    const submitAnswerAction = async () => { // 답변 제출
        if(pathname.includes('preview')){
            alert('설문이 제출되었습니다.(미리보기 종료)')
            moveToNextPage()
            setAnswerBox({})
            return 
        } 

        const success = await submitAnswer(surveyId, answerBox)
        if(success){
            moveToNextPage()
            setAnswerBox({})
        }
    }



    return (
    <FormViewerWrapper>
        <FormViewerHeader surveyId={surveyId} current={currentIdx} max={pages.length}/>
        {pages.length > 0 ? 
        
        !pathname.includes('preview') &&
        !isLoadingEnd ? 
        <FormTokLoading setFinish={setIsLoadingEnd} width={window.innerWidth - grid} height={500}/> :

        <main>
            {pages[currentIdx] && <>
            <FormCardWrapper className="card viewer active">
                <h4>{`${(currentIdx+1)}/${pages.length} 페이지`}</h4>

                <div>
                    <p className="title-A">{pages[currentIdx].title || '제목 없는 페이지'}</p>
                    {pages[currentIdx].description && <DescriptionEditor  value={pages[currentIdx].description} isReadOnly={true}/>}
                </div>
            </FormCardWrapper>

            {pages[currentIdx].questions.map((question, qi) => { // 질문
                const {id, q, d, options, type, scoreRanges, hasExtraOption, essential, setPeriod} = question

                const listStyle = getListStyle(qi)
                return <FormCardWrapper className="card viewer active" key={id}>
                    <div>
                        <div className={classNames('question-title-box', {essential})}>
                            {listStyle && <span>{listStyle}</span>}
                            <p className="title-B">
                                {q || '제목 없는 질문'} {type ==='객관식(복수 선택)' && '(복수 선택)'}
                                </p>
                        </div>
                        {d && <DescriptionEditor value={d} isReadOnly={true}/>} 
                    
                        {Object.keys(answerBox).length > 0 && 
                        <ViewerQuestionForm
                            type={type}
                            options={options}
                            answerBox={answerBox}
                            hasExtraOption={hasExtraOption}
                            scoreRanges={scoreRanges} 
                            setPeriod={setPeriod}
                            pageId={pages[currentIdx].id} questionId={id} 
                        />}
                    
                    </div>
                </FormCardWrapper>
            })}
            <div className="btns">
                {currentIdx !== 0 && 
                <button className="prev" 
                onClick={moveToPrevPage}><Icon code={'arrow_left_alt'}/></button>}

                {currentIdx !== pages.length - 1 ?
                    <button className="next" 
                    onClick={moveToNextPage}>다음페이지 <Icon code={'arrow_right_alt'}/></button>
                    : <button className="next" onClick={submitAnswerAction}>제출 <Icon code={'arrow_right_alt'}/></button>
                }
            </div>

            </>}
            {currentIdx === pages.length && <>
            <FormCardWrapper className="card viewer active">
                <h4>설문지 제출</h4>
                <div>
                    <p className="title-B">{endingMent.title || '설문 종료'}</p>
                    {endingMent.description && <DescriptionEditor value={endingMent.description} isReadOnly={true} />}
                </div>
            </FormCardWrapper>
            <Link to={pathname.includes('preview') ? pathname.replace('preview', 'edit') : '/form-list'}>{pathname.includes('preview') ? '미리보기 종료' : '다른설문 참여'}<Icon code={'arrow_right_alt'}/></Link>
            </>}
        </main> :
        <main></main>
        } 

    </FormViewerWrapper>)
}

export default FormViewer