import React, {useEffect, useState, useRef} from "react";
import ContentEditable from "react-contenteditable";
import { useRecoilState } from "recoil";
import { pagesAtom, randomKey } from "../../../Recoil/AdminRecoil";
import classNames from "classnames";
import AddAnswer from "../../../Component/AddAnswer";
import usePageActions from "../../../CustomHook/usePageActions";
import { questionStyles } from "../../../Data/questionDatas";
import useOutsideClick from "../../../CustomHook/useOutsideClick";



function QuestionEditor ({pi, qi}) {
    const [pages, setPages] = useRecoilState(pagesAtom)
    const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
    // 맨처음 
    useEffect(() => {
        if(pages[pi].questions[qi].d){
            setIsPlaceholderVisible(false)
        }
    },[pages[pi].questions[qi].d])

    const {isOpen : isOpenTypeList, setIsOpen : setIsOpenTypeList, ref: dropdownRef} = useOutsideClick()

    const {changeQTitle, changeQDescription, changeQType} = usePageActions()
    
    const changeQDescriptionAction = (e, pi, qi) => {
        changeQDescription(e, pi, qi)
        // value가 없을때 placeholder 상태
        setIsPlaceholderVisible(e.target.value === "")
    }

    const changeQTypeAction = (pi, qi, style) => {
        changeQType(pi, qi, style)
        setIsOpenTypeList(false)
    }

    const [isRequire, setIsRequire] = useState(false)

    const requireCheck = () => {
        setIsRequire(!isRequire)
    }

    return <>
        <div className="pd-box">
            <input className="question-title" 
            placeholder="질문" onChange={e=>changeQTitle(e, pi, qi)}
            value={pages[pi].questions[qi].q}
            />

            <div className="content-editor-wrapper">
                {isPlaceholderVisible && (
                <p className="content-placeholder">
                    질문 설명
                </p>
                )}
                <ContentEditable
                className="content-editor"
                html={pages[pi].questions[qi].d}
                tagName="p"
                onChange={e=>changeQDescriptionAction(e, pi, qi)}
                />
            </div>
            <QuestionStyle pi={pi} qi={qi}/>
            <div className="add-option-wrapper">
                <div className="list-box" ref={dropdownRef}>
                    <button 
                    className={classNames("list-open-btn", "drop-down-btn", {open : isOpenTypeList})}
                    onClick={()=>{setIsOpenTypeList(!isOpenTypeList)}}>{pages[pi].questions[qi].type}</button>
                    <ul className={classNames({open: isOpenTypeList})}>
                        {questionStyles.map(qs => {
                            return <li key={qs.style}>
                                <span className="material-symbols-outlined">{qs.icon}</span>
                                <button onClick={()=>changeQTypeAction(pi, qi, qs.style)}>{qs.style}</button>
                            </li>
                        })}
                    </ul>
                </div>
                {pages[pi].questions[qi].type === '객관식' && <button 
                onClick={requireCheck}
                className={classNames("ox-btn", {o: isRequire})}>질문 다중 선택</button>}
                <button className={classNames("ox-btn", {o: isRequire})}>답변 필수</button>
                <button className={classNames("ox-btn", {o: isRequire})}>답변 별 페이지 이동</button>
            </div>
        </div>
    </>
}

export default QuestionEditor

function QuestionStyle ({pi, qi}){
    const [pages, setPages] = useRecoilState(pagesAtom)
    const style = pages[pi].questions[qi].type || '객관식'
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
        {style === '서술형' &&
            <p className="long-text">서술형</p>
        }
        {style === '단답형' && 
            <p className="short-text">단답형</p>
        }
        {style === '날짜/시간' &&
        <>
            <input type="date"/>
            <input type="time"/>
        </>
        }
    </>
}