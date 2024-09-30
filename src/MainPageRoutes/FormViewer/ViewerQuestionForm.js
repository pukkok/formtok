import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { RadioButton, CheckBoxButton } from "../../Components/MultipleButton";
import DropDown from "../../Components/DropDown";

const StyledViewerQuestionForm = styled.div`
    margin-top: 18px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .input-wrapper{
        width: 40%;
        height: 40px;
        padding: 8px 10px;
        border-radius: 12px;
        background-color: var(--pk-charcoal);
        input{
            width: 100%;
        }

        input[type="date"]::-webkit-calendar-picker-indicator, 
        input[type="time"]::-webkit-calendar-picker-indicator, 
        input[type="datetime-local"]::-webkit-calendar-picker-indicator { 
            filter: invert(.8);
            cursor: pointer;
        }
    }

    div[contenteditable="true"]{
        outline: none;
        width: 100%;
        min-height: 80px;
        padding: 8px 10px;
        border-radius: 12px;
        background-color: var(--pk-charcoal);
        &:empty:before {
            content: attr(placeholder);
            color: #aaa;
        }
    }
`

function ViewerQuestionForm ({ type, options=[], name }) {
    const longTextRef = useRef(null)

    useEffect(() => {
        if(longTextRef.current){
            console.log(longTextRef.current.innerText)
        }
    }, [longTextRef])

    return (
    <StyledViewerQuestionForm>
        {(type === '객관식' && options.length > 0) && 
            options.map((option, idx) => {
                return (option.answer && <RadioButton key={option.id} name={name}>{option.answer}</RadioButton>)
            })
        }
        {(type === '객관식(복수 선택)' && options.length > 0) && 
            options.map((option, idx) => {
                return (option.answer && <CheckBoxButton key={option.id} name={name}>{option.answer}</CheckBoxButton>)
            })
        }
        {(type === '드롭다운' && options.length > 0) && 
        <DropDown initialItem={'옵션을 선택해주세요'} style={{width: '260px'}}>
            {options.map((option, idx) => {
                return (option.answer && <li key={option.id}>
                    <button>{option.answer}</button>
                </li>)
            })}
        </DropDown>
        }
        {type === '단답형' && <div className="input-wrapper"><input placeholder="답변 입력"/></div>}
        {type === '서술형' && <div contentEditable placeholder={'답변 입력(최대 1000자)'} ref={longTextRef}></div>}
        {['날짜', '시간', '날짜 + 시간'].includes(type) && <DateTypeInput style={type} />}
    </StyledViewerQuestionForm>)

}

export default ViewerQuestionForm

function DateTypeInput ({style}) {

    const changeStyleToType = (style) => {
        let type = ''
        switch (style) {
            case '날짜' : type = 'date'; break;
            case '시간' : type = 'time'; break;
            case '날짜 + 시간' : type = 'datetime-local'; break;
            default : type = 'date'
        }
        return type 
    }

    return <div className="input-wrapper">
        <input type={changeStyleToType(style)} />
    </div>
}