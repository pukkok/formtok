import classNames from "classnames";
import React from "react";
import styled from "styled-components";

const StyledToggleBtn = styled.button`
    
    position: relative;
    border: solid 1px var(--light-grey);
    background-color: var(--light-grey);
    width: 40px;
    height: 24px;
    border-radius: 40px;
    
    span{
        position: absolute;
        top: 50%;
        left: calc(25% + 1px);
        transform: translate(-50%, -50%);
        width: 50%;
        height: calc(100% - 2px);
        background-color: #fff;
        border-radius: 50%;
        transition: .3s;
    }

    &.on{
        border: solid 1px var(--deep-purple);
        background-color: var(--deep-purple);

        span{
            left: calc(75% - 1px);
        }
    }
`

function ToggleButton({onClick, isOn=false}) {

    return (
        <StyledToggleBtn onClick={onClick} className={classNames({on : isOn})}>            
            <span></span>
        </StyledToggleBtn>
    )
}

export default ToggleButton