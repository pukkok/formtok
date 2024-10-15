import React from "react";
import useAnswerActions from "../../Hooks/useAnswerActions";

function LongTextAnswer ({ ...props }) {

    const { answerBox , pageId, questionId } = props
    const { answerInHTML } = useAnswerActions()
    return (
        <div 
            contentEditable 
            placeholder={'답변 입력(최대 1000자)'}
            onBlur={e => answerInHTML(e, pageId, questionId)} // 입력을 벗어났을때 데이터 저장
            dangerouslySetInnerHTML={{ __html : answerBox[pageId]?.[questionId].answer || ""}}
        />
    )
}

export default LongTextAnswer