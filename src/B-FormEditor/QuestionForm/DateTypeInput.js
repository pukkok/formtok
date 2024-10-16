import React from "react";
import styled from "styled-components";
// 날짜, 시간, 날짜+시간
const StyledDateTypeInput = styled.div`
    margin-top: 15px;
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

function DateTypeInput ({style, setPeriod = false}) {

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

    return <StyledDateTypeInput>
        <div>
            <input type={changeStyleToType(style)} />
        </div>
        {setPeriod && <>
            <span>~</span>
        <div>
            <input type={changeStyleToType(style)} />
        </div>
        </>
        }
    </StyledDateTypeInput>
}

export default DateTypeInput