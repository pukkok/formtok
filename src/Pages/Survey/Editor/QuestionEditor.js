import React, {useEffect, useState} from "react";
import ContentEditable from "react-contenteditable";
import { useRecoilState } from "recoil";
import { pagesAtom } from "../../../Recoil/AdminRecoil";

function QuestionEditor ({pageIdx, questionIdx, type = '장문형'}) {
    const [pages, setPages] = useRecoilState(pagesAtom)

    const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
    const changeTitle = (e) => {
        setPages(prevPages => {
            return prevPages.map((page, idx) => {
                if(idx === pageIdx){
                    let changeQ = page.questions.map((question, idx2) => {
                        if(idx2 === questionIdx) question = {...question, q : e.target.value}
                        return question
                    })
                    page = {...page, questions : changeQ}
                }
                return page
            })
        })
    }

    const changeDescription = (e) => {
        setPages(prevPages => {
            return prevPages.map((page, idx) => {
                if(idx === pageIdx){
                    let changeQ = page.questions.map((question, idx2) => {
                        if(idx2 === questionIdx) question = {...question, d : e.target.value}
                        return question
                    })
                    page = {...page, questions : changeQ}
                }
                return page
            })
        })
        // value가 없을때 placeholder 상태
        setIsPlaceholderVisible(e.target.value === "")
    }

    
    const [typeSummary, setTypeSummary] = useState('객관식')
    const changeSummary = (e) => {
        setTypeSummary(e.target.innerText)
    }

    return <>
        <div className="pd-box">
            <input className="question-title" 
            placeholder="질문" onChange={changeTitle}
            value={pages[pageIdx].questions[questionIdx].q}
            />

            <div className="content-editor-wrapper">
                {isPlaceholderVisible && (
                <p className="content-placeholder">
                    질문 설명
                </p>
                )}
                <ContentEditable
                className="content-editor"
                html={pages[pageIdx].questions[questionIdx].d}
                tagName="p"
                onChange={changeDescription}
                />
                {typeSummary === '서술형' && <TextAnswer style={'long'}/>}
                {typeSummary === '단답형' && <TextAnswer style={'short'}/>}
                {typeSummary === '날짜/시간' && <DateAnser/>}
                
            </div>

            <details>
                <summary>{typeSummary}</summary>
                <button onClick={changeSummary}>서술형</button>
                <button onClick={changeSummary}>단답형</button>
                <button onClick={changeSummary}>객관식</button>
                <button onClick={changeSummary}>드롭다운</button>
                <button onClick={changeSummary}>날짜/시간</button>
                <button onClick={changeSummary}>표형</button>
                <button onClick={changeSummary}>점수 선택형</button>
            </details>

            <div>
                <button>필수</button>
                {typeSummary === '객관식' && <button>다중 선택</button>}
            </div>
        </div>
        
    </>
}

export default QuestionEditor

function TextAnswer ({style = 'long'}) {
    const text = style === 'long' ? '장문형' : '단답형'

    return <input className={style} placeholder={text} disabled={true}/>
}

function MultipleAnswer () {

    return <input/>
}

function DateAnser () {
    return <>
        <input type="date"/>
        <input type="time"/>
    </>
}