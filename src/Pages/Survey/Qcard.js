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
import ToggleButton from "../../components/ToggleButton";
import MoreVert from '../../components/MoreVert'

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
    const [isUsedOptipn, setisUsedOptions] = useState({
        detail: false, essential: false, next: false, multiSelect: false, 
    })
    
    const [isRequire, setIsRequire] = useState(false)
    const requireCheck = () => {
        setIsRequire(!isRequire)
    }

    const usedCheck = (toggle) => {
        // 설명 추가를 끄면 설명도 지워버리도록 구현하기
        setisUsedOptions({...isUsedOptipn, [toggle] : !isUsedOptipn[toggle]})
    }

    return <div className={classNames("card", 
        {active : `Q-${pi}-${qi}` === activeCard})} 
        onClick={()=>setActiveCard(`Q-${pi}-${qi}`)}>

            <div className="add-option-wrapper pd">

                <DropDown initialItem={<><Icon code={typeIcon}/>{pages[pi].questions[qi].type}</>}>
                {questionForms.map(qs => {
                    return <li key={qs.form}>
                        <button onClick={()=>changeQTypeAction(pi, qi, qs.form, qs.code)}>
                        <Icon code={qs.code}/>{qs.form}
                        </button>
                    </li>
                })}
                </DropDown>    

                <div className={'toggle-option'}>
                    <p>필수</p>
                    <ToggleButton onClick={()=>usedCheck('essential')} isOn={isUsedOptipn.essential}/></div>

                <MoreVert autoClose={false}>
                    <p>설명 추가 <ToggleButton onClick={()=>usedCheck('detail')} isOn={isUsedOptipn.detail}/></p>
                    <p>답변별 페이지 이동<ToggleButton onClick={requireCheck} isOn={isRequire}/></p>
                    <p>복수 선택 <ToggleButton onClick={requireCheck} isOn={isRequire}/></p>
                </MoreVert>
            </div>

        <div className="pd">
            <div className={classNames({essential : isUsedOptipn.essential})}>
                <input className={"title-B"}
                placeholder="질문" onChange={e=>changeQTitle(e, pi, qi)}
                value={pages[pi].questions[qi].q}
                />
            </div>
            {isUsedOptipn.detail && <DescriptionInput 
            value={pages[pi].questions[qi].d}
            placeholder={'질문 설명'}
            changeHandler={e=>changeQDescription(e, pi, qi)}/>}

            <Qform pi={pi} qi={qi}/>
        </div>
    </div>
}

export default Qcard