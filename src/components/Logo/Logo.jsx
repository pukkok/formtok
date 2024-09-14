import React from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import logo from './logo_whale.png'

const StyledLogo = styled.div`
    font-family: "Nanum Pen Script", cursive;
    width: 280px;
    height: 90px;
    border-radius: 12px;
    overflow: hidden;
    border: solid 1px var(--first-light-purple);
    cursor: pointer;

    img{
        width: 100%;
        height: 100%;
    }

    &:hover{

    }
`

function Logo () {
    const naviate = useNavigate()
    return <StyledLogo  onClick={()=>naviate('/')}>
        <img src={logo} alt=""/>
    </StyledLogo>
}

export default Logo