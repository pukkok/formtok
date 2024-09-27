import classNames from "classnames";
import React from "react";
import useOutsideClick from "../Hooks/useOutsideClick";
import styled from "styled-components";
import { Icon } from "./Icons";

const DropDownWrapper = styled.div`
    position: relative;

    & > button{
        border: solid 1px var(--pk-dropdown-btn-border);
        background-color: var(--pk-dropdown-bg);
        border-radius: 12px;
        min-width: 200px;
        display: flex;
        gap: 5px;
        align-items: center;
        box-sizing: border-box;
        height: 45px;
        padding: 8px 16px;
        font-weight: bold;

        &:hover{
            border: solid 1px var(--pk-dropdown-btn-active-border);
        }

        & > span:nth-last-child(1){ 
            display: inline-block;
            font-size: 24px;
            vertical-align: middle; /* 정렬 */
            transition: .2s;
            margin-left: auto;
        }
        &.open{ 
            border: solid 1px var(--pk-dropdown-btn-active-border);

            & span:nth-last-child(1){// 애로우 버튼
                rotate: -180deg;
            }
        }
    }

    & > ul{
        margin: 0;

        display: none;
        position: absolute;
        top: 50px;
        border: solid 1px var(--pk-dropdown-btn-active-border);
        border-radius: 12px;
        background-color: var(--pk-dropdown-bg);
        width: 100%;
        padding: 8px 5px;

        &.open{
            display: block;
            z-index: 10;
        }

        li{
            list-style: none;
            box-sizing: border-box;
            width: 100%;
            padding: 0 5px;

            &:hover{
                background-color: var(--pk-dropdown-list-hover-bg);
                color: var(--pk-point);
                border-radius: 8px;
            }

            button{
                padding: 5px 20px 5px 0px;
                width: 100%;
                display: flex;
                align-items: center;
                gap: 5px;
                margin-bottom: 5px;
            }
        }
    }
`

function DropDown ({initialItem, children, initialState=false, width}) {
    const {isOpen, setIsOpen, ref} = useOutsideClick(initialState)

    return (
    <DropDownWrapper className={"drop-down-wrapper"} ref={ref}>
        <button className={classNames({open : isOpen})}
            style={{width: width+'px'}}
            onClick={()=>{setIsOpen(!isOpen)}}>{initialItem}
            <Icon code={'arrow_drop_up'}/>
        </button>
        
        <ul className={classNames({open: isOpen})} onClick={()=>setIsOpen(false)}>
            {children}
        </ul>
    </DropDownWrapper>
    )
}
export default DropDown