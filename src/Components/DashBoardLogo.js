import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { jwtDecode } from "jwt-decode";
import useAxios from "../Hooks/useAxios";
import { Icon } from "./Icons";
import { useNavigate } from "react-router-dom";

const StyledLogo = styled.div`
    width: 280px;
    height: 60px;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    gap: 10px;
    padding: 0 10px;
    align-items: flex-end;
    position: relative;
    margin-bottom: 40px;

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
        flex: 1;
        font-size: 12px;
    }

    .renew{
        font-size: 15px;
        margin-left: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--pk-charcoal);
        color: #fff;
        padding: 4px 4px;
        font-weight: bold;
        border-radius: 6px;
        cursor: pointer;
        &:hover {
            background-color: var(--pk-point-hover);
            span{
                transform: rotate(180deg);
            }
        }
        span{
            transition: transform .5s;
            font-size: 18px;
        }
    }
`

function Logo({src, isExpiredToken}) {
    const [timeLeft, setTimeLeft] = useState("0시간 00분")
    const intervalRef = useRef(null) // setInterval의 ID를 저장하는 ref
    const token = localStorage.getItem('token')
    const [warningAlert, setWarningAlert] = useState(true)
    const navigate = useNavigate()


    useEffect(() => {
        const startTimer = (expTime) => {
            intervalRef.current = setInterval(() => {
                const currentTime = Date.now()
                const remainingMs = expTime - currentTime
                if(remainingMs <=1000 * 60 * 30){
                    if(warningAlert) alert('30분 남았습니다.')
                    setWarningAlert(false)
                }

                if(remainingMs <= 0){
                    clearInterval(intervalRef.current)
                    setTimeLeft("만료 됨")
                    isExpiredToken(true)
                    localStorage.clear()
                    navigate('/')
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
    }, [token, warningAlert, isExpiredToken, navigate])

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
            <div className="timer">
                <h1>폼톡</h1>
                <p>만료 시간: {timeLeft}
                </p>
            </div>
            <button className="renew" onClick={() => refreshAuthToken(token)}>
            <Icon code={'cached'}/>    
            </button>
        </StyledLogo>
    )
}

export default Logo
