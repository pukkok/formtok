import React from "react";
import DropDown from "../../1-Components/DropDown";
import useAnswerActions from "../../Hooks/useAnswerActions";

function DropDownForm ({ ...props }) {

    const {answerBox, options=[], pageId, questionId} = props

    const { answerInHTML } = useAnswerActions()

    return (
        <DropDown initialItem={answerBox[pageId]?.[questionId] || '옵션을 선택해주세요'} style={{width: '260px'}}>
            <li><button onClick={e => answerInHTML(e, pageId, questionId, true)}>옵션을 선택해주세요</button></li>
            {options.map(option => {
                return (option.answer && 
                <li key={option.id}>
                    <button onClick={e => answerInHTML(e, pageId, questionId)}>{option.answer}</button>
                </li>)
            })}
        </DropDown>
    )
}

export default DropDownForm