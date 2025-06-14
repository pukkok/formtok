import styled from "styled-components";
import mainBg from '../../A-Imgs/main-bg.jpg'

function LoginSection({children}) {
	return (
		<StyledLoginPageBg>
			<ContentsBox>{children}</ContentsBox>
		</StyledLoginPageBg>
	)
}

export default LoginSection

const StyledLoginPageBg = styled.section`
	width: 100vw;
	height: 100vh;
	background-color: var(--pk-deep-dark);
	background-image: url(${mainBg});
	background-size: cover;

	&::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(30, 30, 46, 0.65);
	}
`

const ContentsBox = styled.div`
	position: relative;
	margin: 0 auto;
	height: 100vh;
	width: 1000px;
	z-index: 10;
`