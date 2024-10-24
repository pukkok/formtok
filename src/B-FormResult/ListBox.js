import React from "react";
import styled from "styled-components";

const StyledListBox = styled.div`
    background-color: var(--pk-dark);
    margin-top: 10px;
    padding: 10px;
    border-radius: 8px;
    max-height: 300px;
    overflow-y: scroll;

    p:not(:nth-child(1)){
        padding-top: 3px;
    }
`


function ListBox ({ answers, pid, qid }) {

    return (
    <StyledListBox>
    {answers.length > 0 ? answers.map((result, idx) => {
        const answer = result.answers?.[pid]?.[qid].answer
        return (
            answer ? 
            <p key={qid + idx}>참여 {idx+1} | {answer}</p>
            : <React.Fragment key={qid + idx}></React.Fragment>
        )
    })
    :
    <p>응답이 없습니다.</p>
    }
    </StyledListBox>
    )
}

export default ListBox