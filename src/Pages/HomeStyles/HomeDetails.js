import React, { useState } from "react";
import styled from "styled-components";
import darkScreen from '../../Imgs/dark-screen.JPG'
import whiteScreen from '../../Imgs/white-screen.JPG'

const HomeDetailsWrapper = styled.section`
    background-color: #fff;
    height: fit-content;
    padding: 20px 0;
    color: #333;

    .container{
        h1{
            font-size: 32px;
            span{
                margin-left: 10px;
                font-size: 16px;
            }
        }

        max-width: var(--pk-container);
        margin: 0 auto;

        input{ // 레인지 인풋
            padding-top: 40px;
            position: relative;
            top: 4px;
            width: 100%;
            height: 6px;
            outline: none; // focus일때 막기
            border-radius: 8px;
            -webkit-appearance: none;
            
            &::-webkit-slider-thumb {
                -webkit-appearance: none;
                /* background: var(--pk-point); */
                border-top: 20px solid var(--pk-point);
                border-right: 10px solid transparent;
                border-left: 10px solid transparent;
                border-bottom: 12px solid transparent;
                width: 12px;
                padding-bottom: 10px;
                cursor: pointer;
            };

            accent-color: var(--pk-point);
            cursor: pointer;
        }

    }

    .switcher{
        position: relative;
        left: 0;
        .img-box{
            overflow: hidden;
            img{
                border-radius: 24px;
            }
        }

        & > .img-box.dark{
            width: 50%;
            position: absolute;
            top: 0;
            left:0;
            img{
                width: var(--pk-container);
                height: fit-content;
            }
        }
        
    }

    /* .auto-show{
        animation: autoShow both;
        animation-timeline: view(85% 15%);
    }

    @keyframes autoShow {
        0%{
            opacity: 0;
            transform: translateY(200px) scale(0.3);
        }
        100%{
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    } */
`

function HomeDetails () {

    const [percent, setPercent] = useState(50)

    const changePercent = (e) => {
        setPercent(e.target.value)
    }

    return (
    <HomeDetailsWrapper>
        <div className="container auto-show">
            <h1>원하는 대시보드를 사용하세요<span>핀을 좌우로 움직여보세요!</span></h1>
            <input type="range" onChange={changePercent} max={100} min={0} value={percent}/>
            <div className="switcher">
                <div className="img-box white">
                    <img src={whiteScreen} alt="화이트모드 화면"/>
                </div>
                <div className="img-box dark" style={{width: percent + '%'}}>
                    <img src={darkScreen} alt="다크모드 화면"/>
                </div>
            </div>
        </div>
    </HomeDetailsWrapper>
    )
}

export default HomeDetails

