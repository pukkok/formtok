import styled from "styled-components";
import mainBg from '../../Imgs/main-bg.jpg'

const StyledLoginSection = styled.section`
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

    .wrapper{
        position: relative;
        margin: 0 auto;
        height: 100vh;
        width: 1000px;
        z-index: 10;
    }
`

function LoginPageWrapper({children}) {
    return (
    <StyledLoginSection>
        <div className="wrapper">{children}</div>
    </StyledLoginSection>
    )
}

export default LoginPageWrapper