import styled from "styled-components";

const StyledLoginSection = styled.section`
    width: 100vw;
    height: 100vh;
    background-color: #fff;

    .wrapper{
        position: relative;
        margin: 0 auto;
        height: 100vh;
        width: 1000px;
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