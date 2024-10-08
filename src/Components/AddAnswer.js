import React from "react";
import { Icon } from "./Icons";
import styled from "styled-components";

const StyledAddAnswerWrapper = styled.div`
    display: flex;
    margin-top: 5px;
    align-items: center;

    &:nth-child(1){
        margin-top: 15px;
    }

    input{
        min-width: 300px;
        width: 100%;

        &:hover{
            border-bottom: 1px solid #cecece;
        }
    }

    button{
        span{
            font-weight: 300;
            &:hover{
                scale: 1.05;
                font-weight: 500;
            }
        }

        margin-left: 10px;
    }
`

function AddAnswer({type, inputChange, buttonClick, placeholder, defaultValue, value, disabled, isNotUseBtn=false}){

    return <StyledAddAnswerWrapper>
        <input type={type} placeholder={placeholder} onChange={inputChange} defaultValue={defaultValue} value={value} disabled={disabled}/>
        <button 
        tabIndex={-1}
        onClick={buttonClick} style={{display: isNotUseBtn ? 'none' : 'block'}}>
            <Icon code={'close'}/>
        </button>
    </StyledAddAnswerWrapper>
}

export default AddAnswer