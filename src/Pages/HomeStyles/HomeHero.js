import React from 'react';
import styled from 'styled-components';
import mainBg from '../../Imgs/main-bg.jpg'
// import mainBg from './main-board.png'
import { useNavigate } from 'react-router-dom';

const StyledHero = styled.section`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-image: url(${mainBg});
    background-size: cover;

    .fade-in{
        animation: fadeIn 1s forwards;
    }

    @keyframes fadeIn {
        0%{
            opacity: 0;
            margin-bottom: 80px;
        }
        100%{
            opacity: 1;
            margin-bottom: 0;
        }
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(30, 30, 46, 0.65);
    }

    .content {
        text-align: center;
        color: var(--pk-white);
        z-index: 1;

        h2 {
            font-size: 48px;
            padding-bottom: 20px;
        }

        p {
            font-size: 18px;
            padding-bottom: 40px;
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
            <div className="content">
                <h2 className='fade-in'>간편하게 설문조사를 만들어보세요</h2>
                <p className='fade-in'>고래폼을 통해 쉽고 빠르게 설문지를 제작하고 데이터를 분석하세요.</p>
                <button className='fade-in'
                onClick={() => navigate('/my-form')}>시작하기</button>
            </div>
        </StyledHero>
    )
}

export default HeroSection