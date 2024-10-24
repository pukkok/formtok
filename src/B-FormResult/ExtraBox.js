import React from "react";
import styled from "styled-components";

const StyledExtraBox = styled.details`
    border-top: 1px solid var(--pk-charcoal);
    margin-top: 30px;
    padding: 20px 10px 0px 10px;
    summary{
        cursor: pointer;
    }

    div{
        background-color: var(--pk-dark);
        margin-top: 10px;
        padding: 10px;
        border-radius: 8px;
        max-height: 300px;
        overflow-y: scroll;

        p:not(:nth-child(1)){
            padding-top: 3px;
        }
    }
`

function ExtraBox ({ extras }) {

    return (
    <StyledExtraBox>
        <summary>기타의견 보기</summary>
        <div>
            {extras.map((extra, idx) => {
                return <p key={idx}>의견 {idx+1} - {extra}</p>
            })}
        </div>
    </StyledExtraBox>
    )
}

export default ExtraBox