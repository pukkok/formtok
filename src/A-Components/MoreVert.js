import React from "react"
import useOutsideClick from "../C-Hooks/useOutsideClick"
import classNames from "classnames"
import styled from "styled-components"
import { MoreVerticalIcon } from "./Icons/Icons"

const StyledMoreVert = styled.div`
    &.more-vert-wrapper{
        z-index: 10;
        position: relative;
        display: flex;
        align-items: center;

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
                    background-color: var(--pk-more-btn-hover-bg);
                    color: var(--pk-more-btn-hover-color);
                    border-radius: 8px;
                }
            }
        }

        .options{
            position: absolute;
            right: 5px;
            top: 5px;
            background-color: var(--pk-more-options-bg);
            box-shadow: 1px 1px 4px var(--pk-charcoal);
            border-radius: 12px;
            overflow: hidden;
            height: 0;
            transition: .1s;
            font-size: 14px;
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
function MoreVert({ children, autoClose=true, addOptionClass }) {
    const { isOpen, setIsOpen, ref } = useOutsideClick(false)

    return (
        <StyledMoreVert className="more-vert-wrapper" ref={ref}>
            <button onClick={() => setIsOpen(!isOpen)}>
                {/* <Icon code={'more_vert'}/> */}
                <MoreVerticalIcon />
            </button>
            
            <div onClick={() => autoClose && setIsOpen(false)}
            className={classNames({ on: isOpen }, {[addOptionClass] : addOptionClass}, 'options')}>
                {children}
            </div>
        </StyledMoreVert>
    )
}

export default MoreVert