import React from "react";
import styled from "styled-components";


const StyledImsi = styled.section`
    width: 100vw;
    height: 100vh;
    background-color: #fdfdfd;
`

const StyledSide = styled.div`
    width: 100px;
    height: 90vh;
    background-color: #1f11fb;
    border-bottom-right-radius: 40px;
`
const StyledLogo = styled.img`
    border: solid 1px red;
    width: 200px;
    height: 100px;
`

function Imsi () {


    return <StyledImsi>
        <StyledSide>
            
        </StyledSide>
        <StyledLogo src={'./logo.png'} alt=""/>
        임시페이지</StyledImsi>
}

export default Imsi