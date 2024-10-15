import React from "react";
import styled from "styled-components";

// 단답형
const StyledShortText = styled.div`
    margin-top: 15px;
    width: 40%;
    height: 40px;
    padding: 8px 10px;
    border-radius: 12px;
    background-color: var(--pk-question-form-bg);
`
function ShortText () {
    return <StyledShortText>
        <input placeholder="단답형 (100자 이내)" disabled={true}/>
    </StyledShortText>
}

export default ShortText