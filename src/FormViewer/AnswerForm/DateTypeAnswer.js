import React from "react";
import DateTypeInput from "../../FormEditor/QuestionForm/DateTypeInput";
import useAnswerActions from "../../Hooks/useAnswerActions";
import styled from "styled-components";

const StyledDateTypeAnswer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    & > div{
        width: fit-content;
        height: 40px;
        padding: 8px 10px;
        border-radius: 12px;
        background-color: var(--pk-question-form-bg);
    }
    input[type="date"]::-webkit-calendar-picker-indicator, 
    input[type="time"]::-webkit-calendar-picker-indicator, 
    input[type="datetime-local"]::-webkit-calendar-picker-indicator { 
        filter: var(--pk-question-date-indicater-filter);
        cursor: pointer;
    }

    input:focus{
        border: none;
    }
`


function DateTypeAnswer ({ type, ...props }) {

    const { answerBox, pageId, questionId, setPeriod } = props
    const { answerDateType, answerPeriodValueReset} = useAnswerActions()

    const changeStyleToType = (type) => {
        switch (type) {
            case '날짜' : return 'date'
            case '시간' : return 'time'
            case '날짜 + 시간' : return 'datetime-local'
            default : return 'date'
        }
    }

    const valueCheck = () => {
        const {start, end} = answerBox[pageId][questionId]
        if(end === '') return
        if(start >= end){
            alert('두 번째 날짜/시간은 첫 번째 날짜/시간보다 이후여야 합니다.')
            answerPeriodValueReset(start, pageId, questionId, 'end')
            return // 유효하지 않은 경우 변경하지 않음
        }
    }

    return (
        <StyledDateTypeAnswer>
        <div>
            <input 
            type={changeStyleToType(type)} 
            onChange={e => answerDateType(e, pageId, questionId, 'start')}
            onBlur={valueCheck}
            value={answerBox[pageId]?.[questionId]?.start || ""}/>
        </div>
        {setPeriod && <>
            <span>~</span>
        <div>
            <input 
            type={changeStyleToType(type)}
            onChange={e => answerDateType(e, pageId, questionId, 'end')}
            onBlur={valueCheck}
            value={answerBox[pageId]?.[questionId]?.end || ""}/>
        </div>
        </>}
        </StyledDateTypeAnswer>
    )
}

export default DateTypeAnswer