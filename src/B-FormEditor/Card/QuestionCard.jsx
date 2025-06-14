import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeCardAtom, pagesAtom, surveyListStyleSelector } from "../../C-Recoils/surveyAtoms";
import usePageActions from "../../C-Hooks/usePageActions";
import { FormCardWrapper, QuestionOptionsWrapper } from "./FormCards.styled";
import classNames from "classnames";
import DropDown from "../../A-Components/DropDown";
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
    const typeIconSelector = (type) => {
        switch(type) {
            case '서술형' : return 0
            case '단답형' : return 1
            case '객관식' : return 2
            case '객관식(복수 선택)' : return 3
            case '드롭다운' : return 4
            case '날짜' : return 5
            case '시간' : return 6
            case '날짜 + 시간' : return 7
            case '표형' : return 8
            case '점수 선택형' : return 9
            default : return 2
        }
    }

    const [typeIconIdx, setTypeIconIdx] = useState(typeIconSelector(selectedQuestion.type))

    const changeQTypeAction = (pi, qi, style, icon) => {
        changeQType(pi, qi, style)
        setTypeIconIdx(icon)
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
                <DropDown initialItem={<>{questionList[typeIconIdx].icon}{selectedQuestion.type}</>} style={{minWidth : '230px'}}>
                {questionList.map((qs, idx) => {
                    return <li key={qs.type}>
                        <button onClick={()=>changeQTypeAction(pi, qi, qs.type, idx)}>
                        {qs.icon}{qs.type}
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