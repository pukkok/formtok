import React, {useEffect, useState} from "react";
import ContentEditable from "react-contenteditable";
import { useRecoilState } from "recoil";
import { pagesAtom, randomKey } from "../../../Recoil/AdminRecoil";
import classNames from "classnames";
import AddAnswer from "../../../Component/AddAnswer";

function QuestionEditor ({pageIdx, questionIdx, type = '장문형'}) {
    const [pages, setPages] = useRecoilState(pagesAtom)

    const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);

    useEffect(() => {
        if(pages[pageIdx].questions[questionIdx].d){
            setIsPlaceholderVisible(false)
        }
    },[pages[pageIdx].questions[questionIdx].d])

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

    const [Qtype, setQtype] = useState('객관식')
    const changeType = (e) => {
        setQtype(e.target.innerText)
        setIsOpenTypeList(false)
    }

    const [isOpenTypeList, setIsOpenTypeList] = useState(false)
    const [isRequire, setIsRequire] = useState(false)

    const requireCheck = () => {
        setIsRequire(!isRequire)
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
            </div>
            <QuestionStyle style={Qtype}/>
            <div className="add-option-wrapper">
                <div className="list-box">
                    <button 
                    className={classNames("list-open-btn", {open : isOpenTypeList})}
                    onClick={()=>{setIsOpenTypeList(!isOpenTypeList)}}>{Qtype}</button>
                    <ul className={classNames({open: isOpenTypeList})}>
                        <li><button onClick={changeType}>서술형</button></li>
                        <li><button onClick={changeType}>단답형</button></li>
                        <li><button onClick={changeType}>객관식</button></li>
                        <li><button onClick={changeType}>드롭다운</button></li>
                        <li><button onClick={changeType}>날짜/시간</button></li>
                        <li><button onClick={changeType}>표형</button></li>
                        <li><button onClick={changeType}>점수 선택형</button></li>
                    </ul>
                </div>
                {Qtype === '객관식' && <button 
                onClick={requireCheck}
                className={classNames("ox-btn", {o: isRequire})}>질문 다중 선택</button>}
                <button className={classNames("ox-btn", {o: isRequire})}>답변 필수</button>
                <button className={classNames("ox-btn", {o: isRequire})}>답변 별 페이지 이동</button>
            </div>
        </div>
        
    </>
}

export default QuestionEditor

function QuestionStyle ({style = '객관식'}){
    const [answers, setAnswers] = useState([{id: 'A'+randomKey(), type: 'text'}])
    const [extra, setExtra] = useState(false)
    const addInput = () => {
        const id = 'A'+randomKey()
        setAnswers(prev => [...prev, {id, type: 'text'}])
    }

    return <>
        {style === '객관식' && 
        <div className="multiple">
            {answers.map((answer, idx) => {
                const {id, type} = answer
                return <AddAnswer key={id} type={type} placeholder={'옵션'+(idx+1)}/>
            })}
            {extra && <AddAnswer defaultValue={'기타'} disabled={true} handleClick={()=>setExtra(false)}/>}
            <div className="add-btns">
                <button className="add-answer-btn" onClick={addInput}>항목 추가</button>
                {!extra && <>
                    또는
                    <button className="add-extra-btn"onClick={()=>setExtra(true)}>'기타' 추가</button>
                </>}
            </div>
        </div>
        }
        {style === '장문형'}
        {style === '단답형' && 
            <input placeholder={'단답형'} disabled={true}/>
        }
        {style === '날짜/시간' &&
        <>
            <input type="date"/>
            <input type="time"/>
        </>
        }
    </>
}