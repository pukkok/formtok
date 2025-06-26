import React from "react";
import useAnswerActions from "../../C-Hooks/useAnswerActions";

function ShortTextAnswer ({ ...props }) {
    const { answerBox, pageId, questionId } = props
    const { answerInValue } = useAnswerActions()
    return (
        <div className="input-wrapper">
            <input 
            placeholder="답변 입력" 
            onChange={e => answerInValue(e, pageId, questionId)} 
            value={answerBox[pageId][questionId].answer || ""}/>
        </div>
    )
}

export default ShortTextAnswer