import React from "react";
import { RadioButton } from "../../1-Components/MultipleButton";
import useAnswerActions from "../../Hooks/useAnswerActions";

function SelectOne ({ ...props }) {

    const {answerBox, options=[], pageId, questionId, hasExtraOption} = props
    const { answerPick, extraPick, extraInValue } = useAnswerActions()
    return <>
        {options.map(option => {
            return (option.answer && <RadioButton 
                key={option.id} 
                onClick={() => answerPick(option.answer, pageId, questionId)}
                pick={answerBox[pageId]?.[questionId]?.answer || ''}
                >
                {option.answer}</RadioButton>)
        })}

        {hasExtraOption && <>
            <RadioButton
            onClick={() => extraPick(pageId, questionId)} 
            pick={answerBox[pageId][questionId].useExtra && '기타'}
            >기타</RadioButton>
        
            {answerBox[pageId][questionId].useExtra &&
            <div className="input-wrapper">
                <input 
                onChange={e => extraInValue(e, pageId, questionId)} 
                value={answerBox[pageId][questionId].extra || ''}
                placeholder="내용을 입력해 주세요."
                />
            </div>}
        </>}
    </>
}

export default SelectOne