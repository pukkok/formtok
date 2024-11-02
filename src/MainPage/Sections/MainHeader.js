import React from 'react';
import styled from 'styled-components';
import FormTokLogo from '../../A-Components/FormTokLogo';
import PageSwitchButton from '../../A-Components/PageSwitch/PageSwitchButton';
import NavigateButton from '../../A-Components/Buttons/NavigateButton';

function MainHeader() {
	
	return (
		<StyledHeader>
			<nav>
				<LogoButton to='/'>
					<FormTokLogo boxSize={40} modeFix={'white'}/>
					<h3>폼톡</h3>
				</LogoButton>
				<ul>
					<li><PageSwitchButton to={'/form-list'}>문의하기</PageSwitchButton></li>
					<li><RoundPageSwitchButton to={"/user/login"}>로그인</RoundPageSwitchButton></li>
				</ul>
			</nav>
		</StyledHeader>
	)
}

export default MainHeader

const StyledHeader = styled.header`
	width: 100%;
	padding: 10px 0;
	background-image: linear-gradient(to right, #5B1FB7 60%, var(--pk-fold-point));
	justify-content: space-between;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 10;
	nav{
		max-width: var(--pk-container);
		margin: 0 auto;
		display: flex;
		align-items: center;

		ul{
			margin: 0;
			margin-left: auto;
			display: flex;
			list-style: none;
		}
	}

	nav {
		ul{
			display: flex;
			gap: 16px;
			align-items: center;
		}
		li{
			font-size: 17px;
			font-weight: 700;
		}
	}
`;

const LogoButton = styled(NavigateButton)`
	display: flex;
	align-items: center;
	gap: 10px;
	cursor: pointer;
`

const RoundPageSwitchButton = styled(PageSwitchButton)`
	display: block;
	border-radius: 50px;
	padding: 8px 24px 8px;
	background-image: linear-gradient(to right, var(--pk-fold-point) 0%, var(--pk-point) 50%, #f06292);
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2), 0px 6px 20px rgba(0, 0, 0, 0.1);
	background-size: 200% 100%;
	background-position: 0% 0%; 
	transition: background-position .4s ease-in-out;
	&:hover {
		background-position: 100% 0%;
		color: var(--pk-light-grey);
	}
	&:active {
		transform: scale(0.98);  // 버튼을 살짝 줄여 눌린 느낌
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), 0px 4px 10px rgba(0, 0, 0, 0.1);  // 그림자 크기 줄이기
	}
`