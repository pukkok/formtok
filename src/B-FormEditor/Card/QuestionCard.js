import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeCardAtom, pagesAtom, surveyListStyleSelector } from "../../C-Recoils/surveyAtoms";
import usePageActions from "../../C-Hooks/usePageActions";
import { FormCardWrapper, QuestionOptionsWrapper } from "./FormCards.styled";
import classNames from "classnames";
import DropDown from "../../A-Components/DropDown";
import { Icon } from "../../A-Components/Icons";
import ToggleButton from "../../A-Components/ToggleButton";
import MoreVert from "../../A-Components/MoreVert";
import DescriptionEditor from "../../A-Components/DescriptionEditor";
import questionList from "../../A-Datas/questionList";
import QuestionForm from "../QuestionForm";

function QuestionCard ({pi, qi}) {
    const pages = useRecoilValue(pagesAtom)
    const [activeCard, setActiveCard] = useRecoilState(activeCardAtom)
    const {changeQTitle, changeQDescription, changeQType, usedOptionCheck} = usePageActions()
    
    const selectedQuestion = pages[pi].questions[qi]
    
    const getListStyle = useRecoilValue(surveyListStyleSelector)
    const listStyle = getListStyle(qi) // 리스트 스타일을 가져와서 변경함

    // 질문 타입 변경
    const [typeIcon, setTypeIcon] = useState('format_list_numbered')
    const changeQTypeAction = (pi, qi, style, icon) => {
        changeQType(pi, qi, style)
        setTypeIcon(icon)
    }

    const usedCheck = (toggle, pi, qi) => {
        // 설명 추가기능 종료시 설명 부분 초기화
        usedOptionCheck(pi, qi, toggle)
        if(toggle === 'hasDescription'){
            !pages[pi].questions[qi].hasDescription && changeQDescription('', pi, qi)
        }
    }

    return (
        <FormCardWrapper 
        className={classNames("card", {active : `Q-${pi}-${qi}` === activeCard})} 
        onClick={()=>setActiveCard(`Q-${pi}-${qi}`)}>
    
            <QuestionOptionsWrapper className="question-options-wrapper">
                <DropDown initialItem={<><Icon code={typeIcon}/>{selectedQuestion.type}</>} style={{minWidth : '230px'}}>
                {questionList.map(qs => {
                    return <li key={qs.form}>
                        <button onClick={()=>changeQTypeAction(pi, qi, qs.form, qs.code)}>
                        <Icon code={qs.code}/>{qs.form}
                        </button>
                    </li>
                })}
                </DropDown>

                <div className={'toggle-options'}>
                    <p>필수</p>
                    <ToggleButton onClick={()=>usedCheck('essential', pi, qi)} isOn={selectedQuestion.essential}/>
                </div>

                <MoreVert autoClose={false} addOptionClass={['날짜', '시간', '날짜 + 시간'].includes(selectedQuestion.type) && 'date-type'}>
                    <p>설명 추가 <ToggleButton onClick={()=>usedCheck('hasDescription', pi, qi)} isOn={selectedQuestion.hasDescription}/></p>
                    <p>답변별 페이지 이동<ToggleButton onClick={()=>usedCheck('setNextToPage', pi, qi)} isOn={selectedQuestion.setNextToPage}/></p>
                    {['날짜', '시간', '날짜 + 시간'].includes(selectedQuestion.type) &&
                    <p>기간으로 설정 <ToggleButton onClick={()=>usedCheck('setPeriod', pi, qi)} isOn={selectedQuestion.setPeriod}/></p>}
                </MoreVert>
            </QuestionOptionsWrapper>
    
            <div>
                <div className={classNames('question-title-box',{essential : selectedQuestion.essential})}>
                    {listStyle && <span>{listStyle}</span>}
                    <input 
                    className={"title-B"}
                    placeholder="질문" onChange={e=>changeQTitle(e, pi, qi)}
                    value={selectedQuestion.q}
                    />
                </div>
                {selectedQuestion.hasDescription && <DescriptionEditor 
                value={selectedQuestion.d}
                placeholder={'질문 설명'}
                pi={pi} qi={qi}
                handleChange={changeQDescription}/>}
    
                <QuestionForm pi={pi} qi={qi}/>
            </div>
        </FormCardWrapper>
    )
        
}

export default QuestionCard