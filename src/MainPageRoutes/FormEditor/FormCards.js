import React, { useState, useEffect } from "react";

import { useRecoilValue, useRecoilState } from "recoil";
import { pagesAtom, endingMentAtom, activeCardAtom } from "../../Recoils/surveyAtoms";

import usePageActions from "../../Hooks/usePageActions";
import classNames from "classnames";
import { FormCardWrapper, QuestionOptionsWrapper } from "./_StyledFormCard";
import questionForms from '../../Datas/questionForms'

import QuestionForm from "./QuestionForm";

import DescriptionEditor from "../../Components/DescriptionEditor";
import ToggleButton from '../../Components/ToggleButton'
import DropDown from "../../Components/DropDown";
import MoreVert from "../../Components/MoreVert";
import { Icon } from "../../Components/Icons";

function PageCard({pi}) {
    const pages = useRecoilValue(pagesAtom)
    const [activeCard, setActiveCard] = useRecoilState(activeCardAtom)

    const [pageCnt, setPageCnt] = useState('1/1')
    useEffect(() => {
        setPageCnt(`${pi+1}/${pages.length}`)
    }, [pages, pi])

    const {changePTitle, changePDescription} = usePageActions()
    
    return (
        <FormCardWrapper 
        className={classNames("card", {active : `P-${pi}` === activeCard})}
        onClick={()=>setActiveCard(`P-${pi}`)}>
            <h4>{pageCnt} 페이지</h4>
            <div>
                <input className="title-A" 
                placeholder="페이지 제목" 
                onChange={e=>changePTitle(e, pi)} value={pages[pi].title}/>
                
                <DescriptionEditor
                value={pages[pi].description}
                pi={pi}
                placeholder={'페이지 설명'}
                handleChange={changePDescription}
                />
            </div>
        </FormCardWrapper>
    )
}

function QuestionCard ({pi, qi}) {
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
        description: false, essential: false, next: false, multiSelect: false, 
    })
    
    const [isRequire, setIsRequire] = useState(false)
    const requireCheck = () => {
        setIsRequire(!isRequire)
    }

    const usedCheck = (toggle, pi, qi) => {
        // 설명 추가기능 종료시 설명 부분 초기화
        if(toggle === 'description'){
            !isUsedOptipn[toggle] && changeQDescription('', pi, qi)
        }
        setisUsedOptions({...isUsedOptipn, [toggle] : !isUsedOptipn[toggle]})
    }

    return (
        <FormCardWrapper 
        className={classNames("card", {active : `Q-${pi}-${qi}` === activeCard})} 
        onClick={()=>setActiveCard(`Q-${pi}-${qi}`)}>
    
            <QuestionOptionsWrapper className="question-options-wrapper">
                <DropDown initialItem={<><Icon code={typeIcon}/>{pages[pi].questions[qi].type}</>}>
                {questionForms.map(qs => {
                    return <li key={qs.form}>
                        <button onClick={()=>changeQTypeAction(pi, qi, qs.form, qs.code)}>
                        <Icon code={qs.code}/>{qs.form}
                        </button>
                    </li>
                })}
                </DropDown>

                <div className={'toggle-options'}>
                    <p>필수</p>
                    <ToggleButton onClick={()=>usedCheck('essential')} isOn={isUsedOptipn.essential}/>
                </div>

                <MoreVert autoClose={false}>
                    <p>설명 추가 <ToggleButton onClick={()=>usedCheck('description', pi, qi)} isOn={isUsedOptipn.description}/></p>
                    <p>답변별 페이지 이동<ToggleButton onClick={requireCheck} isOn={isRequire}/></p>
                    <p>복수 선택 <ToggleButton onClick={requireCheck} isOn={isRequire}/></p>
                </MoreVert>
            </QuestionOptionsWrapper>
    
            <div>
                <div className={classNames({essential : isUsedOptipn.essential})}>
                    <input className={"title-B"}
                    placeholder="질문" onChange={e=>changeQTitle(e, pi, qi)}
                    value={pages[pi].questions[qi].q}
                    />
                </div>
                {isUsedOptipn.description && <DescriptionEditor 
                value={pages[pi].questions[qi].d}
                placeholder={'질문 설명'}
                pi={pi} qi={qi}
                handleChange={changeQDescription}/>}
    
                <QuestionForm pi={pi} qi={qi}/>
            </div>
        </FormCardWrapper>
    )
        
}

function EndingCard () {

    const endingMent = useRecoilValue(endingMentAtom)
    const [activeCard, setActiveCard] = useRecoilState(activeCardAtom)

    const { changeEndingTitle, changeEndingDescription } = usePageActions()

    return (
    <FormCardWrapper className={classNames("card ending-field", 
    {active : `end` === activeCard})}
    onClick={()=>setActiveCard(`end`)}>
        <h4>엔딩 메세지</h4>
        <div>
            <input className="title-B"
            value={endingMent.title}
            placeholder="응답해 주셔서 감사합니다." 
            onChange={e=>changeEndingTitle(e)}
            />
            
            <DescriptionEditor
            value={endingMent.description}
            placeholder={'추가 설명'}
            handleChange={changeEndingDescription}
            />
        </div>

    </FormCardWrapper>
    )
    
}

export {PageCard, QuestionCard, EndingCard}