import React from "react"
import useOutsideClick from "../hooks/useOutsideClick"
import classNames from "classnames"
import { Icon } from "./Icons"
import styled from "styled-components"

const StyledMoreVertWrapper = styled.div`
    .more-vert-wrapper{
        z-index: 10;

        & > button{
            display: flex;
            align-items: center;
            justify-content: center;

            span{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 24px;
                height: 24px;
                font-size: 18px;

                &:hover{
                    background-color: #cecece;
                    color: #2f2f2f;
                    border-radius: 8px;
                }
            }
        }

        .options{
            position: absolute;
            right: 5px;
            top: 5px;
            background-color: #fff;
            border-radius: 12px;
            overflow: hidden;
            height: 0;
            transition: .1s;
            color: #000;
            font-size: 14px;
            box-shadow: 2px 2px 2px #ddd;
            display: flex;
            flex-direction: column;
            z-index: 10;

            & > * {
                flex: 1;
            }
        }
    }
`

// more-vertical
function MoreVert({ children, autoClose=true }) {
    const { isOpen, setIsOpen, ref } = useOutsideClick(false)

    return (
        <StyledMoreVertWrapper className="more-vert-wrapper" ref={ref}>
            <button onClick={() => setIsOpen(!isOpen)}>
                <Icon code={'more_vert'}/>
            </button>
            
            <div onClick={() => autoClose && setIsOpen(false)}
            className={classNames({ on: isOpen }, 'options', "modify-option")}>
                {children}
            </div>
        </StyledMoreVertWrapper>
    )
}

export default MoreVert