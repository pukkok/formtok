import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { endingMentAtom, pagesAtom } from "../../Recoils/surveyAtoms";
import {FormCardWrapper} from "../FormEditor/_StyledFormCard"
import DescriptionEditor from '../../Components/DescriptionEditor'
import FormViewerWrapper from './_StyledFomViewer'
import { Link, useParams, useResolvedPath } from "react-router-dom";
import ViewerQuestionForm from "./ViewerQuestionForm";

function FormViewer() {
    const {surveyId} = useParams()
    const {pathname} = useResolvedPath()
    const pages = useRecoilValue(pagesAtom)
    const endingMent = useRecoilValue(endingMentAtom)

    useEffect(() => {
        // console.log(pathname)
        // if(pages.length===0) surveyId
    },[pages, pathname])

    const [select, setSelect] = useState(null)
    const [currentIdx, setCurrentIdx] = useState(0)

    const moveLogs = useRef([0])
    
    const moveToPrevPage = () => {
        moveLogs.current.pop()
        setCurrentIdx(moveLogs.current.length > 0 ?moveLogs.current.length-1 : 0)
    }

    const moveToNextPage = () => {
        moveLogs.current = [...moveLogs.current, currentIdx]
        setCurrentIdx(pages[currentIdx].next || currentIdx+1)
    }

    const change = () => {}

    return (
    <FormViewerWrapper>
        <header>
            <Link to={`/my-form/edit/${surveyId}`}>돌아가기</Link>
            <p>진행 상황</p>
            <input type="range" onChange={change} max={pages.length} min={0} step={1} value={currentIdx}/>
        </header>

        <main>
            {pages[currentIdx] && <>
            <FormCardWrapper className="card viewer active">
                <h4>{`${(currentIdx+1)}/${pages.length} 페이지`}</h4>
                <div>
                    <p className="title-A">{pages[currentIdx].title || '제목 없는 페이지'}</p>
                    {pages[currentIdx].description && <DescriptionEditor  value={pages[currentIdx].description} isReadOnly={true}/>}
                </div>
            </FormCardWrapper>

            {pages[currentIdx].questions.map(question => {
                const {id, q, d, options, type} = question
                return <FormCardWrapper className="card viewer active" key={id}>
                    <div>
                        <p className="title-B">{q || '제목 없는 질문'}</p>
                        {d && <DescriptionEditor value={d}/>}
                    
                    <ViewerQuestionForm type={type} options={options} name={question.id}/>
                    
                    </div>
                </FormCardWrapper>
            })}
            <div className="btns">
                {currentIdx !== 0 && 
                <button className="prev" 
                onClick={moveToPrevPage}>이전</button>}

                {currentIdx !== pages.length - 1 ?
                    <button className="next" 
                    onClick={moveToNextPage}>다음</button>
                    : <button className="next" onClick={()=>setCurrentIdx(prev=> prev+=1)}>설문지 제출</button>
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