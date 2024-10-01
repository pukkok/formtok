import React from 'react';
import styled from 'styled-components';
import surveyIcons from '../../Imgs/coloful-business-icons.png'

const StyledFeatures = styled.section`
    padding: 20px;
    background-color: #fff;
    display: flex;
    
    flex-direction: column;
    align-items: center;
    h3 {
        font-size: 32px;
        margin-bottom: 40px;
        color: var(--pk-point);
    }

    @keyframes moveToHigh {
        0%{
            top: 100vh;
        }
        100%{
            top: -15vh;
        }
    }

    .features-container {
        position: relative;
        display: flex;
        justify-content: flex-end;
        gap: 40px;
        width: 100%;
        max-width: var(--pk-container);

        .feature {
            position: relative;
            top: 100vh;
            display: flex;
            flex-direction: column;
            gap: 20px;
            max-width: 360px;

            background-color: var(--pk-charcoal);
            background-image: linear-gradient(var(--pk-charcoal) 20%, var(--pk-dark));
            padding: 35px;
            border-radius: 12px;

            flex-basis: auto;
            flex: 1 1;

            transition: transform 0.3s;
            animation: moveToHigh 1s forwards;
            animation-delay: 1s;
            & > div{
                width: 110px;
                height: 110px;
                margin-bottom: 10px;
                background-image: url(${surveyIcons});
                background-size: 500px;
                background-repeat: no-repeat;
            }

            .write{
                background-position: left -252px top -252px;
            }
            .analysis{
                background-position: left -140px top -28px;
            }
            .my-dashboard{
                background-position: left -30px top -252px;
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
                font-size: 26px;
                margin-bottom: 10px;
            }

            p {
                font-size: 16px;
            }
        }
    }
`;

function HomeFeatures() {
    return (
        <StyledFeatures>
            <div className="features-container">
                <div className="feature">
                    <div className='write'></div>
                    <h4>간편한 설문지 작성</h4>
                    {/* <p>드래그 앤 드롭 방식으로 쉽고 빠르게 <br/> 설문지를 작성할 수 있습니다.</p> */}
                    <p>나만의 설문지를 쉽고 빠르게 작성하세요. <br/> 다양한 질문 타입을 지원하며 <br/> 사용자 경험에 맞춘 직관적인 인터페이스로 누구나 설문을 만들 수 있습니다.</p>
                </div>
                <div className="feature">
                <div className='analysis'></div>
                    <h4>실시간 데이터 분석</h4>
                    {/* <p>설문 응답 데이터를 실시간으로 분석하고 <br/> 시각화할 수 있습니다.</p> */}
                    <p>실시간으로 응답 데이터를 받아보세요. 수집된 데이터를 한눈에 확인하고, 참여자의 통찰력 있는 피드백을 통해 더욱 풍성한 분석 결과를 얻으세요.</p>
                </div>
                <div className="feature">
                <div className='my-dashboard'></div>
                    <h4>나만의 대시보드 구성</h4>
                    {/* <p>설문 응답 데이터를 내가 원하는대로 <br/> 대시보드를 꾸며보세요!</p> */}
                    <p>설문 결과를 시각적으로 커스터마이징해보세요. 그래프, 차트 등 다양한 분석 도구를 활용해 데이터를 의미 있게 정리하고 공유할 수 있습니다.</p>
                </div>
            </div>
        </StyledFeatures>
    )
}

export default HomeFeatures;