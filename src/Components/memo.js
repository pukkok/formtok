import styled from "styled-components";
import React, { useRef, useState } from "react";
import classNames from "classnames";
import { useRecoilState } from "recoil";
import { modeAtom } from "../Recoils/screenAtom";

const SwitchScreenModeBtnWrapper = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

    --main-color: #bf94fb;
    --light-color: #aaabb7;
    --lighter-color: #f7f7ff;
    --bg-color: #fbfaff;

    /* scale: 0.55; */

    &.dark-mode{
        --main-color: #1c2028;
        --light-color: #727597;
        --bg-color: #31357a;

        span:first-child{
            opacity: .25;
        }
        span:last-child{
            opacity: 1;
        }
    }

    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.8;
    background-color: var(--bg-color);

    position: relative;
    width: 230px;
    height: 120px;
    border-radius: 60px;
    background-color: var(--main-color);
    & > span{
        position: absolute;
        font-size: 2em;
        font-weight: 600;
        top: 50%;
        margin-top: -26px;
        &:first-child{
            left: -40%;
        }
        &:last-child{
            right: -40%;
            opacity: .25;
        }
    }

    button{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        cursor: pointer;
        z-index: 5;
    }

    .switcher{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .circle, .circle::before{
        content: '';
        position: absolute;
        width: 80px;
        height: 80px;
        left: 20px;
        top: 20px;
        background-color: var(--lighter-color);
        border-radius: 50%;
        z-index: 1;
        transition: transform .5s, background-color .3s;
    }

    .circle::before{
        top: 0;
        left: 0;
        transform: translate3d(-30px, -40px, 0) scale(0.2);
        background-color: var(--main-color);
    }

    .dots{
        &::before, &::after, .dot-b{
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            background-color: var(--lighter-color);
            top: 25px;
            right: 50px;
            border-radius: 50%;
            z-index: 0;
            transition: transform .5s;
        }

        &::after{
            top: 55%;
            right: 38%;
            transform: scale(0.4);
        }

        .dot-b{
            opacity: 0;
            transform: scale(0);
            transition: opacity .3s, transform .5s;
        }
    }

    .star{
        position: absolute;
        width: 0;
        height: 0;
        border-right: 0.3em solid transparent;
        border-bottom: 0.7em solid var(--lighter-color);
        border-left: 0.3em solid transparent;
        transform: translate3d(190px, 90px, 0);
        font-size: 10px;
        opacity: 0;
        transition: opacity .5s, transform .5s;

        &::before, &::after{
            content: '';
            display: block;
            width: 0;
            height: 0;
            position: absolute;
            top: 0.6em;
            left: -1em;
            border-right: 1em solid transparent;
            border-bottom: 0.7em solid var(--lighter-color);
            border-left: 1em solid transparent;
            transform: rotate(-35deg);
        }
        &::after{
            transform: rotate(35deg);
        }
    }

    .dark{
        .circle{
            transform: translateX(110px);
    
            &::before{
                transform: translate3d(-20px, -10px, 0) scale(0.8);
            }
        }

        .dots{
            &::before, &::after, .dot-b{
                transform: translateX(-80px) scale(0.25);
            }

            &::after{
                top: 60%;
                right: 40%;
                transform: translateX(-80px) scale(0.15);
            }

            .dot-b{
                top: 50%;
                right: 50%;
                opacity: 1;
                transform: scale(0.5);
            }
        }

        .star{
            opacity: 1;
            transform: translate3d(43px, 25px, 0);
        }
    } 
`

function SwitchScreenModeBtn () {
    const [mode, setMode] = useRecoilState(modeAtom)

    const toggleMode = () => {
        mode === 'dark' ? setMode('') : setMode('dark')
    }

    return (
    <SwitchScreenModeBtnWrapper className={classNames({'dark-mode': mode === 'dark'})}>
        <span>Light</span>
        <button onClick={toggleMode}></button>
        <div className={classNames("switcher", {dark : mode === 'dark' })}>
            <div className="circle"></div>
            <div className="dots">
                <span className="dot-b"></span>
                <span className="star"></span>
            </div>
        </div>
        <span>Dark</span>
    </SwitchScreenModeBtnWrapper>)
}

export default SwitchScreenModeBtn