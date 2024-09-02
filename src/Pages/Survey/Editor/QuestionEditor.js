import React, {useEffect, useState} from "react";
import ContentEditable from "react-contenteditable";
import { useRecoilState } from "recoil";
import { pagesAtom } from "../../../Recoil/AdminRecoil";

function QuestionEditor ({pageIdx, questionIdx, type = '장문형'}) {
    const [pages, setPages] = useRecoilState(pagesAtom)

    const [title, setTitle] = useState('') // page title
    const [html, setHtml] = useState('') // page description
    const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
    const changeTitle = (e) => {
        setTitle(e.target.value)
    }


    useEffect(() => {
        setPages(prevPages => {
            return prevPages.map((page, idx) => {
                if(idx === pageIdx){
                    let changeQ = page.questions.map((question, idx2) => {
                        if(idx2 === questionIdx) question = {...question, q : title}
                        return question
                    })
                    page = {...page, questions : changeQ}
                }
                return page
            })
        })
    },[title])

    const changeDescription = (e) => {
        const {value} = e.target
        setHtml(value)
        // value가 없을때 placeholder 상태
        setIsPlaceholderVisible(value === "")
    }

    
    const [typeSummary, setTypeSummary] = useState('객관식')
    const changeSummary = (e) => {
        setTypeSummary(e.target.innerText)
    }

    // useEffect(() => {
    //     setPages(prevPages => {
    //         return prevPages.map((page, idx) => {
    //             if(idx === pageIdx){
    //                 page.questions = page.questions.map((question, idx2) => {
    
    //                 })
    //             }
    //             return page
    //         })
    //     })

    // },[title, html, pageIdx])

    return <>
        <div className="pd-box">
            <input className="question-title" 
            placeholder="질문" onChange={changeTitle}
            value={title}
            />

            <div className="content-editor-wrapper">
                {isPlaceholderVisible && (
                <p className="content-placeholder">
                    질문 설명
                </p>
                )}
                <ContentEditable
                className="content-editor"
                html={html}
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