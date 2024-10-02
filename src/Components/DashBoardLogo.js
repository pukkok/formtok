import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { jwtDecode } from "jwt-decode";
import useAxios from "../Hooks/useAxios";

const StyledLogo = styled.div`
    width: 280px;
    height: 60px;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    gap: 10px;
    padding: 0 10px;
    align-items: center;
    position: relative;

    .img-box {
        width: 40px;
        height: 40px;
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

    &:hover .renew{
        display: flex;
    }

    .renew{
        display: none;
        position: absolute;
        justify-content: center;
        align-items: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 12px;
        width: 100px;
        height: 40px;
        /* background-image: linear-gradient(rgba(0,0,0, .8), rgba(0,0,0, .8)); */
        background-color: #000;
        cursor: pointer;
    }
`

function Logo({src}) {
    const [timeLeft, setTimeLeft] = useState("")
    const intervalRef = useRef(null) // setInterval의 ID를 저장하는 ref
    const token = localStorage.getItem('token')
    const [warningAlert, setWarningAlert] = useState(true)

    useEffect(() => {
        const startTimer = (expTime) => {
            intervalRef.current = setInterval(() => {
                const currentTime = Date.now();
                const remainingMs = expTime - currentTime;
                if(remainingMs <=1000 * 60 * 30){
                    setWarningAlert(false)
                    if(warningAlert) alert('30분 남았습니다.')
                    // 나중에 연장기능 만들기
                }
                if(remainingMs <= 0){
                    clearInterval(intervalRef.current)
                    setTimeLeft("만료 됨")
                    localStorage.clear()
                }else{
                    updateTimeLeft(remainingMs)
                }
            }, 1000)
        }

        if(token){
            const decode = jwtDecode(token)
            const exp = decode.exp * 1000
            startTimer(exp)
        }else{
            setTimeLeft('로그인 필요')
            localStorage.clear()
        }

        return () => {
            // 컴포넌트 언마운트 시 setInterval 정리
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [token, warningAlert])

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

    const { refreshAuthToken } = useAxios()
    

    return (
        <StyledLogo>
            <div className="img-box">
                <img src={src} alt="" />
            </div>
            <div>
                <h1>폼톡</h1>
                <p>만료 시간: {timeLeft}</p>
            </div>
            <div
            className="renew"
            onClick={() => refreshAuthToken(token)}>연장하기</div>
        </StyledLogo>
    )
}

export default Logo;
