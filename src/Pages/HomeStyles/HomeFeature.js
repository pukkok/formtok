import React from 'react';
import styled from 'styled-components';
import surveyIcons from './survey-icons-origin.png'

const StyledFeatures = styled.section`
    padding: 80px 40px;
    background-color: var(--pk-dark);
    display: flex;
    flex-direction: column;
    align-items: center;

    h3 {
        font-size: 32px;
        margin-bottom: 40px;
        color: var(--pk-point);
    }

    .features-container {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 1200px;

        .feature {
            background-color: var(--pk-charcoal);
            padding: 20px;
            border-radius: 12px;
            width: 30%;
            text-align: center;
            transition: transform 0.3s;

            & > div{
                width: 150px;
                height: 120px;
                margin: 0 auto;
                margin-bottom: 10px;
                background-image: url(${surveyIcons});
                background-size: 600px;
                background-repeat: no-repeat;
            }

            .write{
                background-position: left -150px top -280px;
            }
            .analysis{
                background-position: left -300px top -0px;
            }
            .my-dashboard{
                background-position: left -150px top -130px;
            }

            &:hover {
                transform: translateY(-10px);
            }

            img {
                width: 80px;
                height: 80px;
                margin-bottom: 20px;
            }

            h4 {
                font-size: 20px;
                margin-bottom: 10px;
            }

            p {
                font-size: 14px;
            }
        }
    }
`;

function HomeFeatures() {
    return (
        <StyledFeatures>
            <h3>고래폼의 주요 기능</h3>
            <div className="features-container">
                <div className="feature">
                    <div className='write'></div>
                    <h4>간편한 설문지 작성</h4>
                    <p>드래그 앤 드롭 방식으로 쉽고 빠르게 <br/> 설문지를 작성할 수 있습니다.</p>
                </div>
                <div className="feature">
                <div className='analysis'></div>
                    <h4>실시간 데이터 분석</h4>
                    <p>설문 응답 데이터를 실시간으로 분석하고 <br/> 시각화할 수 있습니다.</p>
                </div>
                <div className="feature">
                <div className='my-dashboard'></div>
                    <h4>나만의 대시보드 구성</h4>
                    <p>설문 응답 데이터를 내가 원하는대로 <br/> 대시보드를 꾸며보세요!</p>
                </div>
            </div>
        </StyledFeatures>
    )
}

export default HomeFeatures;