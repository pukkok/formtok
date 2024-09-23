import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { jwtDecode } from "jwt-decode";
import logo from './logo-check-2.png';

const StyledLogo = styled.div`
    width: 280px;
    height: 60px;
    border-radius: 12px;
    overflow: hidden;
    background-color: var(--pk-charcoal);
    transition: background-color 0.3s;  // 배경색 전환 애니메이션
    cursor: pointer;
    display: flex;
    align-items: center;

    .img-box {
        width: 80px;
        height: 80px;
        img {
            object-fit: cover;
        }
    }

    h1 {
        font-size: 20px;
    }

    p {
        font-size: 12px;
    }

    &:hover {
        background-color: var(--pk-point);
    }
`

function Logo() {
    const navigate = useNavigate()
    const [timeLeft, setTimeLeft] = useState("")
    const intervalRef = useRef(null) // setInterval의 ID를 저장하는 ref

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            const decode = jwtDecode(token)
            const exp = decode.exp * 1000
            startTimer(exp)
        }else{
            localStorage.clear()
        }

        return () => {
            // 컴포넌트 언마운트 시 setInterval 정리
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [])

    const startTimer = (expTime) => {
        intervalRef.current = setInterval(() => {
            const currentTime = Date.now();
            const remainingMs = expTime - currentTime;

            if (remainingMs <= 0) {
                clearInterval(intervalRef.current)
                setTimeLeft("토큰 만료됨")
                localStorage.clear()
            } else {
                updateTimeLeft(remainingMs)
            }
        }, 1000)
    }

    const updateTimeLeft = (remainingMs) => {
        const seconds = Math.floor(remainingMs / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const remainingMinutes = minutes % 60
        const remainingSeconds = seconds % 60

        // 시간에 따른 포맷 설정
        if (hours > 0) {
            setTimeLeft(`${hours}시간 ${remainingMinutes}분`)
        } else if (remainingMinutes > 0) {
            setTimeLeft(`${remainingMinutes}분 ${remainingSeconds}초`)
        } else {
            setTimeLeft(`${remainingSeconds}초`)
        }
    }

    return (
        <StyledLogo onClick={() => navigate('/')}>
            <div className="img-box">
                <img src={logo} alt="" />
            </div>
            <div>
                <h1>고래폼</h1>
                {/* <p>WHALE FORM</p> */}
                <p>만료 시간: {timeLeft}</p>
            </div>
        </StyledLogo>
    );
}

export default Logo;
