import React, { useState } from "react";
import styled from "styled-components";

const StyledMultipleButton = styled.label`
    position: relative;
    margin: 5px 0;
    cursor: pointer;
    display: flex;
    align-items: center;

    input{
        appearance: none;
        display: none;
    }
    span{
        position: relative;
        display: inline-block;
        width: 24px;
        height: 24px;
        margin-right: 15px;
        transition: .3s;

        &::before{
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #fff;
            box-shadow: 0 -22px 0 #fff;
            transition: .3s;
        }
        &::after{
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 2px;
            height: 100%;
            background-color: #fff;
            box-shadow: 22px 0 0 #fff;
            transition: all.3s;
        }
    }

    input:checked ~ span{
        transform: rotate(-45deg) translate(7px, -7px);
        &::before{
            background-color: #00ff00;
            box-shadow: 0 0 0 transparent;
        }
        &::after{
            background-color: #00ff00;
            box-shadow: 0 0 0 transparent;
            height: 50%;
        }

    }
`

// 단일 선택
function RadioButton ({children, name, onChange, disabled=false}) {
    const [checked, setChecked] = useState(false);

    const handleClick = () => {
        if (!disabled) {
            setChecked(!checked); // 토글
            onChange(!checked ? children : null); // 체크된 값(children=option.answer) 또는 해제된 값(null) 전달
        }
    };

    return (
        <StyledMultipleButton>
            <input type="radio" name={name} checked={checked}
                onChange={handleClick} disabled={disabled}/>
            <span></span>
            {children}
        </StyledMultipleButton>
    )
}

// 중복 선택
function CheckBoxButton({children, onChange }) {
    const [checked, setChecked] = useState(false);

    const handleClick = () => {
        setChecked(!checked);
        onChange(!checked ? children : null); // 체크된 값(children=option.answer) 또는 해제된 값(null) 전달
    };

    return (
    <StyledMultipleButton>
        <input type="checkbox"
            checked={checked}
            onChange={handleClick}
        />
        <span></span>
        {children}
    </StyledMultipleButton>
    )
}

export {RadioButton, CheckBoxButton}