import React, { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { activeCardAtom, pagesAtom } from "../../../Recoil/AdminRecoil";
import classNames from "classnames";

function QuestionTab () {
    const [pages, setPages] = useRecoilState(pagesAtom)
    const [activeCard, setActiveCard] = useRecoilState(activeCardAtom)
    const didmountRef = useRef(false)

    const addQuestion = () => {
        let pageCnt = activeCard.split('-')[1]
        let length
        setPages(prev => {
            return prev.map((page, idx) => {
                if(+pageCnt === idx){
                    length = page.questions.length
                    page = {...page, questions : [...page.questions, {type: 'multiple', q:'', a: []}]}
                }
                return page
            })
        })
        setActiveCard(`q-${pageCnt}-${length}`)
    }

    const addPage = () => {
        setPages([...pages, {header: {title: '', description :''}, questions: []}])
        setActiveCard(`h-${pages.length}`)
    }

    return(
        <div className="q-tab">
            <div className="summary-wrapper">
                {pages.map((page, idx) => {
                    const {header : {title}, questions } = page
                    return <React.Fragment key={idx}>
                        <div
                        onClick={()=>setActiveCard(`h-${idx}`)}
                        className={classNames('h-summary',
                        {active : `h-${idx}` === activeCard})}
                        >
                            <p>{idx+1}/{pages.length} 페이지</p>
                            {title ? title : '페이지 제목'}
                        </div>
                        {questions.map((question, idx2)=> {
                            const {type, q, a} = question
                            return <div
                            onClick={()=>setActiveCard(`q-${idx}-${idx2}`)}
                            className={classNames('q-summary', 
                            {active : `q-${idx}-${idx2}` === activeCard})}
                            key={idx2}
                            >{idx2}</div>
                        })}
                    </React.Fragment> 
                })}
            </div>
            <div className="q-btns">
                <button onClick={addQuestion}>문항 추가</button>
                <button onClick={addPage}>페이지 추가</button>
            </div>
        </div>
    )
}

function RemoteControl () {
    return <div className="remote-control">
        <nav>
            <button>전체 문항</button>
            <button>설문 설정</button>
        </nav>
        <QuestionTab/>
    </div>
}

export default RemoteControl


