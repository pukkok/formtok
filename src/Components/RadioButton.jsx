import classNames from "classnames";
import React from "react";
import styled from "styled-components";

const StyledRadioBtn = styled.button`
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid var(--pk-silver);
    display: flex;
    justify-content: center;
    align-items: center;

    &.select{
        border: 2px solid var(--pk-point);

        span{
            width: 14px;
            height: 14px;
            border-radius: 50%;
            border: 1px solid var(--pk-point);
            background-color: var(--pk-point);
        }
    }
`

function RadioButton ({isSelect}) {
    return <StyledRadioBtn className={classNames("radio-button", {select: isSelect})}>
        <span></span>
    </StyledRadioBtn>
}

export default RadioButton