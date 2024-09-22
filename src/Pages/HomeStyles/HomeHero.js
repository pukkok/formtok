import React from 'react';
import styled from 'styled-components';
import surveyIamge from './surveyImage.jpg'
// import heroImage from '../images/hero-image.jpg'; // 히어로 이미지 경로
import { useNavigate } from 'react-router-dom';

const StyledHero = styled.section`
    width: 100%;
    height: 100vh;
    background-image: url(${surveyIamge});
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-top: 80px; // 헤더 높이 만큼 마진

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(30, 30, 46, 0.7);
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
    const navigate = useNavigate();

    return (
        <StyledHero>
            <div className="content">
                <h2>간편하게 설문조사를 만들어보세요</h2>
                <p>고래폼을 통해 쉽고 빠르게 설문지를 제작하고 데이터를 분석하세요.</p>
                <button onClick={() => navigate('/create-survey')}>설문지 만들기</button>
            </div>
        </StyledHero>
    );
}

export default HeroSection;