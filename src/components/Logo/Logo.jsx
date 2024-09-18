import React from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
// import logo from './logo-normal.png'
import logo from './logo-check-1.png'

const StyledLogo = styled.div`
    width: 280px;
    height: 60px;
    border-radius: 12px;
    overflow: hidden;
    background-color: var(--pk-charcoal);
    transition: background-color 0.3s;  // 배경색 전환 애니메이션
    cursor: pointer;
    /* position: relative; */
    display: flex;
    align-items: center;

    .img-box{
        width: 80px;
        height: 80px;
        /* border: solid 1px blue; */
        img{
            object-fit: cover;
        }
    }

    h1{
        font-size: 20px;
    }
    p{
        font-size: 12px;
    }


    &:hover{
        background-color: var(--pk-point);
    }
`

function Logo () {
    const naviate = useNavigate()
    return <StyledLogo  onClick={()=>naviate('/')}>
        <div className="img-box">
            <img src={logo} alt=""/>
        </div>
        <div>
            <h1>고래폼</h1>
            <p>WHALE FORM</p>
        </div>
    </StyledLogo>
}

export default Logo