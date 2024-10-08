import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AnswerBoxAtom, endingMentAtom, pagesAtom, surveyListStyleAtom, surveyListStyleSelector } from "../../Recoils/surveyAtoms";
import {FormCardWrapper} from "../FormEditor/_StyledFormCard"
import DescriptionEditor from '../../Components/DescriptionEditor'
import FormViewerWrapper from './_StyledFomViewer'
import { Link, useParams, useResolvedPath } from "react-router-dom";
import ViewerQuestionForm from "./ViewerQuestionForm";
import { Icon } from "../../Components/Icons";
import FormViewerHeader from "./FormViewerHeader";
import classNames from "classnames";

function FormViewer() {
    const {surveyId} = useParams()
    const {pathname} = useResolvedPath()
    const pages = useRecoilValue(pagesAtom)
    const endingMent = useRecoilValue(endingMentAtom)
    const [answerBox, setAnswerBox] = useRecoilState(AnswerBoxAtom)
    const surveyListStyle = useRecoilValue(surveyListStyleAtom)
    const getListStyle = useRecoilValue(surveyListStyleSelector)
    

    useEffect(() => {
        let newAnswerBox = pages.reduce((acc, page) => {
            const {id, questions} = page
            const newQuestions = questions.reduce((qAcc, question) => {
                if(['날짜', '시간', '날짜 + 시간'].includes(question.type)){
                    qAcc[question.id] = {start:'', end:''}
                }
                else if(question.type ==='객관식(복수 선택)'){
                    qAcc[question.id] = []
                }
                else{
                    qAcc[question.id] = null
                }
                return qAcc
            }, {})
            acc[id] = {...newQuestions}
            return acc
        }, {})
        setAnswerBox(newAnswerBox)
    },[pages, setAnswerBox])

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

    return (
    <FormViewerWrapper>
        <FormViewerHeader surveyId={surveyId} current={currentIdx} max={pages.length}/>

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
                const {id, q, d, options, type, scoreRanges, essential, setPeriod} = question
                const listStyle = getListStyle(qi)
                return <FormCardWrapper className="card viewer active" key={id}>
                    <div>
                        <div className={classNames('question-title-box', {essential})}>
                            {listStyle && <span>{listStyle}</span>}
                            <p className="title-B">{q || '제목 없는 질문'}</p>
                        </div>
                        {d && <DescriptionEditor value={d} isReadOnly={true}/>} 
                    
                        <ViewerQuestionForm
                            type={type}
                            options={options}
                            scoreRanges={scoreRanges} 
                            setPeriod={setPeriod}
                            pageId={pages[currentIdx].id} questionId={id} 
                        />
                    
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
                    : <button className="next" onClick={moveToNextPage}>제출 <Icon code={'arrow_right_alt'}/></button>
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
            
            <Link to={pathname.includes('preview') ? '/my-form' : '/survey-answer'}>나가기</Link>
            </>}
        </main>

    </FormViewerWrapper>)
}

export default FormViewer