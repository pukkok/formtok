import dayjs from "dayjs";
import React from "react";
import styled from "styled-components";

const StyledDateBox = styled.div`
    background-color: var(--pk-dark);
    margin-top: 10px;
    padding: 10px;
    border-radius: 8px;
`

function DateBox ({ dateType, answers, pid, qid }) {

    return (
    <StyledDateBox>
    {answers.length > 0 ? answers.map((result, idx) => {
        const date = result.answers?.[pid]?.[qid]
        if(dateType === '날짜'){
            return <p key={qid + idx}>
                <span>참여 {idx+1} | </span>
                {date.start ? dayjs(date.start).format('YYYY-MM-DD') : ""} 
                {date.end ? `~ ${dayjs(date.end).format('YYYY-MM-DD')}` : ""} </p>
        }
        else if(dateType === '시간'){
            return <p key={qid + idx}>
                <span>참여 {idx+1} | </span>
                {date.start || ""} 
                {date.end ? `~ ${date.end}` : ""}</p>
        }
        if(dateType === '날짜 + 시간'){
            return (
                <p key={qid + idx}>
                <span>참여 {idx+1} | </span>
                {date.start ? dayjs(date.start).format('YYYY-MM-DD HH:mm') : ""}
                {date.end ? `~ ${dayjs(date.end).format('YYYY-MM-DD HH:mm')}` : ""}</p>
            )
        }
        
    })
        :
        <p>응답이 없습니다.</p>
    }
    </StyledDateBox>
    )
}

export default DateBox