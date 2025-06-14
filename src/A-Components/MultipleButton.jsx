import classNames from "classnames";
import React from "react";
import styled from "styled-components";

const StyledMultipleButton = styled.label`
    position: relative;
    margin: 5px 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    user-select: none;
    font-size: 15px;
    input{
        appearance: none;
        display: none;
    }
    span{
        position: relative;
        display: inline-block;
        width: 22px;
        height: 22px;
        margin-right: 15px;
        transition: .3s;

        &::before{
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: var(--pk-checkbox-color);
            box-shadow: 0 -20px 0 var(--pk-checkbox-color);
            transition: .3s;
        }
        &::after{
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 2px;
            height: 100%;
            background-color: var(--pk-checkbox-color);
            box-shadow: 20px 0 0 var(--pk-checkbox-color);
            transition: all.3s;
        }
    }

    span.check{
        transform: rotate(-45deg) translate(6px, -7px);
        &::before{
            background-color: #00ff00;
            /* background-color: var(--pk-point); */
            box-shadow: 0 0 0 transparent;
        }
        &::after{
            background-color: #00ff00;
            /* background-color: var(--pk-point); */
            box-shadow: 0 0 0 transparent;
            height: 50%;
        }

    }
`

// 단일 선택
function RadioButton ({children, pick, onClick}) {

    return (
        <StyledMultipleButton onClick={onClick}>
            <span className={classNames({check : children === pick})}></span>
            {children}
        </StyledMultipleButton>
    )
}

// 중복 선택
function CheckBoxButton({children, picks=[], onClick }) {

    return (
    <StyledMultipleButton onClick={onClick}>
        <span className={classNames({check : picks.includes(children)})}></span>
        {children}
    </StyledMultipleButton>
    )
}

export {RadioButton, CheckBoxButton}