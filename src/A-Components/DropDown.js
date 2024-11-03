import classNames from "classnames";
import React from "react";
import useOutsideClick from "../C-Hooks/useOutsideClick";
import styled from "styled-components";
import { ArrowDownIcon } from "./Icons/Icons";

const DropDownWrapper = styled.div`
	position: relative;
	& > button{
		border: solid 1px var(--pk-dropdown-btn-border);
		background-color: var(--pk-dropdown-bg);
		border-radius: 12px;
		width: 100%;
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

		& > svg:nth-last-child(1){ 
			margin-left: auto;
			display: inline-block;
			font-size: 24px;
			vertical-align: middle; /* 정렬 */
			transition: .2s;
		}
		&.open{ 
			border: solid 1px var(--pk-dropdown-btn-active-border);

			svg:nth-last-child(1){// 애로우 버튼
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
		padding: 12px 8px;

		&.open{
			display: block;
			z-index: 10;
		}

		li{
			list-style: none;
			box-sizing: border-box;
			width: 100%;
			padding: 0 8px;

			&:hover{
				background-color: var(--pk-dropdown-list-hover-bg);
				color: var(--pk-purple-font);
				border-radius: 8px;
			}

			&:nth-last-child(1){
				button{
					margin-bottom: 0;
				}
			}

			button{
				padding: 5px 20px 5px 0px;
				width: 100%;
				display: flex;
				align-items: center;
				gap: 10px;
				margin-bottom: 5px;
			}
		}
	}
`



function DropDown ({initialItem, children, initialState=false, style}) {
	const {isOpen, setIsOpen, ref} = useOutsideClick(initialState)

	return (
	<DropDownWrapper className={"drop-down-wrapper"} ref={ref} style={style}>
		<button 
			className={classNames({open : isOpen})}
			onClick={()=>{setIsOpen(!isOpen)}}>
			{initialItem}
			<ArrowDownIcon />
		</button>
		
		<ul className={classNames({open: isOpen})} onClick={()=>setIsOpen(false)}>
			{children}
		</ul>
	</DropDownWrapper>
	)
}
export default DropDown