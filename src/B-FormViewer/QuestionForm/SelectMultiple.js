import React from "react";
import useAnswerActions from "../../Hooks/useAnswerActions";
import { CheckBoxButton, RadioButton } from "../../1-Components/MultipleButton";

function SelectMultiple ({ ...props }) {

    const {answerBox, options=[], pageId, questionId, hasExtraOption} = props
    const { answerPicks, extraPick, extraInValue } = useAnswerActions()
    return (
        <>
            {options.map(option => {
                return (option.answer && <CheckBoxButton 
                    key={option.id}
                    onClick={() => answerPicks(option.answer, pageId, questionId)}
                    picks={answerBox[pageId]?.[questionId].answer || []}
                    >
                    {option.answer}</CheckBoxButton>)
            })}

            {hasExtraOption && <>
                <RadioButton
                onClick={() => extraPick(pageId, questionId, true)} pick={answerBox[pageId][questionId].useExtra && '기타'}
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
    )
}

export default SelectMultiple