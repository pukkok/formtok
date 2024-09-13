import classNames from "classnames";
import React from "react";
import styled from "styled-components";

const StyledRadioBtn = styled.button`
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid #777;
    display: flex;
    justify-content: center;
    align-items: center;

    &.select{
        border: 2px solid #601DCD;

        span{
            width: 14px;
            height: 14px;
            border-radius: 50%;
            border: 1px solid var(--purple);
            background-color: var(--purple);
        }
    }
`

function RadioButton ({isSelect}) {
    return <StyledRadioBtn className={classNames("radio-button", {select: isSelect})}>
        <span></span>
    </StyledRadioBtn>
}

export default RadioButton