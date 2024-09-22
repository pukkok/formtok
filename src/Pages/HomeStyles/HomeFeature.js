import React from 'react';
import styled from 'styled-components';
// import feature1 from '../images/feature1.png'; // 특징 이미지 경로
// import feature2 from '../images/feature2.png';
// import feature3 from '../images/feature3.png';

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

    @media (max-width: 768px) {
        .features-container {
            flex-direction: column;
            align-items: center;

            .feature {
                width: 80%;
                margin-bottom: 20px;
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
                    <img src={'feature1'} alt="간편한 설문지 작성" />
                    <h4>간편한 설문지 작성</h4>
                    <p>드래그 앤 드롭 방식으로 쉽고 빠르게 설문지를 작성할 수 있습니다.</p>
                </div>
                <div className="feature">
                    <img src={'feature2'} alt="실시간 데이터 분석" />
                    <h4>실시간 데이터 분석</h4>
                    <p>설문 응답 데이터를 실시간으로 분석하고 시각화할 수 있습니다.</p>
                </div>
                <div className="feature">
                    <img src={'feature3'} alt="다양한 템플릿 제공" />
                    <h4>다양한 템플릿 제공</h4>
                    <p>다양한 설문지 템플릿을 제공하여 필요에 맞게 선택할 수 있습니다.</p>
                </div>
            </div>
        </StyledFeatures>
    )
}

export default HomeFeatures;