import React from "react"
import styled from "styled-components"
// 서술형
const StyledLongText = styled.div`
    margin-top: 15px;
    width: 100%;
    height: 80px;
    padding: 8px 10px;
    border-radius: 12px;
    background-color: var(--pk-question-form-bg);
`
function LongText () {
    return <StyledLongText>
        <input placeholder="서술형 (1000자 이내)" disabled={true}/>
    </StyledLongText>
}

export default LongText