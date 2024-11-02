import React, { useState } from "react";
import styled from "styled-components";
import darkScreen from '../../A-Imgs/dark-screen.JPG'
import whiteScreen from '../../A-Imgs/white-screen.JPG'
import ImgBox from "../../A-Components/ImgBox";

function DetailSection () {

	const [percent, setPercent] = useState(50)

	const changePercent = (e) => {
		setPercent(e.target.value)
	}

	return (
	<StyledDetailSection>
		<div className="container auto-show">
			<h2>
				작업 환경에 맞춰 자유롭게 모드를 선택하세요.
				<span>핀을 좌우로 움직여보세요!</span>
			</h2>
			<RangeInput type="range" onChange={changePercent} max={100} min={0} value={percent}/>
			<CollisionBox>
				<WhiteImgBox src={whiteScreen} alt="화이트모드 화면"/>
				<DarkImgBox src={darkScreen} alt="다크모드 화면"
					boxStyle={{width: percent + '%'}}
				/>
			</CollisionBox>
		</div>
	</StyledDetailSection>
	)
}

export default DetailSection

const StyledDetailSection = styled.section`
	background-color: #fff;
	height: fit-content;
	padding: 20px 0;
	color: #333;

	.container{
		span{
			margin-left: 10px;
			font-size: 16px;
		}
		
		max-width: var(--pk-container);
		margin: 0 auto;
	}
`

const CollisionBox = styled.div`
	position: relative;
	left: 0;
`

const WhiteImgBox = styled(ImgBox)`
	img{
		border-radius: 24px;
	}
`
const DarkImgBox = styled(ImgBox)`
	width: 50%;
	position: absolute;
	top: 0;
	left:0;
	img{
		border-radius: 24px;
		width: var(--pk-container);
		height: fit-content;
	}
`

const RangeInput = styled.input`

	padding-top: 40px;
	position: relative;
	top: 4px;
	width: 100%;
	height: 6px;
	outline: none; // focus일때 막기
	border-radius: 8px;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	
	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		border-top: 20px solid var(--pk-point);
		border-right: 10px solid transparent;
		border-left: 10px solid transparent;
		border-bottom: 12px solid transparent;
		width: 12px;
		padding-bottom: 10px;
		cursor: pointer;
	};

	accent-color: var(--pk-point);
	cursor: pointer;
`