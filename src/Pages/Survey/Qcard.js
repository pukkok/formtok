import React, { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import { useRecoilState } from "recoil";
import { pagesAtom } from "../../recoils/surveyAtoms";
import classNames from "classnames";
import usePageActions from "../../hooks/usePageActions";
import questionForms from "../../constants/questionForms";
import useOutsideClick from "../../hooks/useOutsideClick";
import Qform from "./Qform";
import { Icon } from "../../components/Icons";

function Qcard ({pi, qi}) {
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
    
    // 질문 설명입력
    const changeQDescriptionAction = (e, pi, qi) => {
        changeQDescription(e, pi, qi)
        // value가 없을때 placeholder 상태
        setIsPlaceholderVisible(e.target.value === "")
    }

    // 질문 타입 변경
    const [typeIcon, setTypeIcon] = useState('format_list_numbered')
    const changeQTypeAction = (pi, qi, style, icon) => {
        changeQType(pi, qi, style)
        setTypeIcon(icon)
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
            <Qform pi={pi} qi={qi}/>
            <div className="add-option-wrapper">
                <div className="drop-down-wrapper" ref={dropdownRef}>
                    <button 
                    className={classNames("drop-down-btn", {open : isOpenTypeList})}
                    onClick={()=>{setIsOpenTypeList(!isOpenTypeList)}}>
                        <Icon code={typeIcon}/>
                        {pages[pi].questions[qi].type}</button>
                    <ul className={classNames({open: isOpenTypeList})}>
                        {questionForms.map(qs => {
                            return <li key={qs.form}>
                                <button onClick={()=>changeQTypeAction(pi, qi, qs.form, qs.icon)}>
                                <Icon code={qs.code}/>    
                                {qs.form}
                                </button>
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

export default Qcard