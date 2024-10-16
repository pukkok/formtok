import React from "react";
import styled from "styled-components";
import SelectOne from "./AnswerForm/SelectOne";
import SelectMultiple from "./AnswerForm/SelectMultiple";
import DropDownForm from "./AnswerForm/DropDownAnswer";
import ShortTextAnswer from "./AnswerForm/ShortTextAnswer";
import LongTextAnswer from "./AnswerForm/LongTextForm";
import DateTypeAnswer from "./AnswerForm/DateTypeAnswer";
import SelectScoreAnswer from "./AnswerForm/SelectScoreAnswer";

const StyledViewerQuestionForm = styled.div`
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .input-wrapper{
        width: 40%;
        height: 40px;
        padding: 8px 10px;
        border-radius: 12px;
        background-color: var(--pk-question-form-bg);

        display: flex;
        align-items: center;
        gap: 10px;
        input{
            width: 100%;
        }

        input[type="date"]::-webkit-calendar-picker-indicator, 
        input[type="time"]::-webkit-calendar-picker-indicator, 
        input[type="datetime-local"]::-webkit-calendar-picker-indicator { 
            filter: var(--pk-question-date-indicater-filter);
            cursor: pointer;
        }
    }

    .drop-down-wrapper{ // 커스텀
        & > button{
            background-color: var(--pk-question-form-bg);
            transition: background-color .3s;
            &.open{
                background-color: var(--pk-dropdown-bg);
            }
        }
    }

    div[contenteditable="true"]{
        outline: none;
        width: 100%;
        min-height: 80px;
        padding: 8px 10px;
        border-radius: 12px;
        background-color: var(--pk-question-form-bg);
        &:empty:before {
            content: attr(placeholder);
            color: #aaa;
            cursor: text;
        }
    }
`
/** props answerBox, options=[], pageId, questionId, hasExtraOption, scoreRanges, setPeriod */
function ViewerQuestionForm ({ type, ...props }) {
    const {answerBox, options=[], pageId} = props
    if (!answerBox[pageId]) { // 불러오기 전
        return <></>
    }

    return (
    <StyledViewerQuestionForm>
        {(type === '객관식' && options.length > 0) && <SelectOne {...props} />}
        {(type === '객관식(복수 선택)' && options.length > 0) && <SelectMultiple {...props}/>}
        {(type === '드롭다운' && options.length > 0) && <DropDownForm {...props}/>}
        {type === '단답형' && <ShortTextAnswer {...props}/>}
        {type === '서술형' && <LongTextAnswer {...props}/>}
        {['날짜', '시간', '날짜 + 시간'].includes(type) && <DateTypeAnswer type={type} {...props}/>}
        {type === '점수 선택형' && <SelectScoreAnswer {...props}/>}
    </StyledViewerQuestionForm>)

}

export default ViewerQuestionForm