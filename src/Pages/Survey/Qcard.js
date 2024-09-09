import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeCardAtom, pagesAtom } from "../../recoils/surveyAtoms";
import classNames from "classnames";
import usePageActions from "../../hooks/usePageActions";
import questionForms from "../../constants/questionForms";
import Qform from "./Qform";
import { Icon } from "../../components/Icons";
import DropDown from "../../components/DropDown";
import DescriptionInput from "../../components/DescriptionInput";

function Qcard ({pi, qi}) {
    const pages = useRecoilValue(pagesAtom)
    const [activeCard, setActiveCard] = useRecoilState(activeCardAtom)
    const {changeQTitle, changeQDescription, changeQType} = usePageActions()

    // 질문 타입 변경
    const [typeIcon, setTypeIcon] = useState('format_list_numbered')
    const changeQTypeAction = (pi, qi, style, icon) => {
        changeQType(pi, qi, style)
        setTypeIcon(icon)
    }

    const [isRequire, setIsRequire] = useState(false)
    const requireCheck = () => {
        setIsRequire(!isRequire)
    }

    return <div className={classNames("card", 
        {active : `Q-${pi}-${qi}` === activeCard})}
        onClick={()=>setActiveCard(`Q-${pi}-${qi}`)}>
        <div className="pd">
            <input className="title-B" 
            placeholder="질문" onChange={e=>changeQTitle(e, pi, qi)}
            value={pages[pi].questions[qi].q}
            />
            <DescriptionInput 
            value={pages[pi].questions[qi].d} 
            placeholder={'질문 설명'}
            changeHandler={e=>changeQDescription(e, pi, qi)}/>

            <Qform pi={pi} qi={qi}/>

            <div className="add-option-wrapper">
                <DropDown initialItem={<><Icon code={typeIcon}/>{pages[pi].questions[qi].type}</>}>
                {questionForms.map(qs => {
                    return <li key={qs.form}>
                        <button onClick={()=>changeQTypeAction(pi, qi, qs.form, qs.icon)}>
                        <Icon code={qs.code}/>{qs.form}
                        </button>
                    </li>
                })}
                </DropDown>
                {pages[pi].questions[qi].type === '객관식' && <button 
                onClick={requireCheck}
                className={classNames("ox-btn", {o: isRequire})}>질문 다중 선택</button>}
                <button className={classNames("ox-btn", {o: isRequire})}>답변 필수</button>
                <button className={classNames("ox-btn", {o: isRequire})}>답변 별 페이지 이동</button>
            </div>
        </div>
    </div>
}

export default Qcard