import React from 'react';
import styled from 'styled-components';
import mainBg from './main-bg.jpg'
// import heroImage from '../images/hero-image.jpg'; // 히어로 이미지 경로
import { useNavigate } from 'react-router-dom';

const StyledHero = styled.section`
    width: 100%;
    height: 100vh;
    background-image: url(${mainBg});
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(30, 30, 46, 0.7);
    }

    .circle{
        width: 300px;
        height: 300px;
        border: solid 1px black;
        border-radius: 50%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        overflow: hidden;
        animation: rotateCircle 2s infinite;
        .item1{
            background-color: red;
        }
        .item2{
            background-color: blue;
        }
        .item3{
            background-color: green;
        }
        .item4{
            background-color: yellow;
        }
    }

    @keyframes rotateCircle {
        0%{
            rotate: 0deg;
        }
        100%{
            rotate: 90deg;
        }
    }

    .content {
        position: relative;
        text-align: center;
        color: var(--pk-white);
        z-index: 1;

        h2 {
            font-size: 48px;
            margin-bottom: 20px;
        }

        p {
            font-size: 18px;
            margin-bottom: 40px;
        }

        button {
            padding: 15px 30px;
            font-size: 16px;
            background-color: var(--pk-point);
            border: none;
            border-radius: 8px;
            color: var(--pk-white);
            transition: background-color 0.3s;

            &:hover {
                background-color: var(--pk-point-hover);
            }
        }
    }
`;

function HeroSection() {
    const navigate = useNavigate()

    return (
        <StyledHero>
            <div className='circle'>
                <span className='item1'></span>
                <span className='item2'></span>
                <span className='item3'></span>
                <span className='item4'></span>
            </div>
            <div className="content">
                <h2>간편하게 설문조사를 만들어보세요</h2>
                <p>고래폼을 통해 쉽고 빠르게 설문지를 제작하고 데이터를 분석하세요.</p>
                <button onClick={() => navigate('/my-form')}>설문지 만들기</button>
            </div>
        </StyledHero>
    )
}

export default HeroSection