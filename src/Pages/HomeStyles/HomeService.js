import React from "react";
import styled from "styled-components";
import surveyIcons from './survey-icons-origin.png'

const ServiceWrapper = styled.section`
    padding: 80px 40px;
    background-color: var(--pk-dark);

    h3{
        font-size: 48px;
        text-align: center;
    }

    .feature{
        width: 800px;
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        gap: 40px;
        margin: 40px auto;
        
        & > .img-box{
            width: 300px;
            height: 300px;
            background-image: url(${surveyIcons});
            background-size: 1200px;
            background-repeat: no-repeat;
        }

        caption{
            flex: 1;
            text-align: left;
            h4{
                font-size: 28px;
                margin-bottom: 10px;
            }
            p{
                font-size: 18px;
            }
        }

    }
    

    .write{
        background-position: left -300px top -520px;
    }
    .analysis{
        background-position: left -10px top -520px;
    }
    .my-dashboard{
        background-position: left -610px top -0px;
    }

    .auto-show{
        animation: autoShow both;
        animation-timeline: view(65% 5%);
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
    }

`

function HomeService () {
    
    return(
        <ServiceWrapper>
            <h3 className="auto-show">왜 고래폼인가요?</h3>
            <div className="feature">
                <div className="write img-box"></div>
                <caption className="auto-show">
                    <h4>간편한 설문지 작성</h4>
                    <p>내가 원하는대로 </p>
                    <p>드래그 앤 드롭 방식으로 쉽게 문항의 위치를 변경해 보세요
                    설문지를 작성할 수 있습니다.</p>
                </caption>
            </div>
            <div className="feature">
                <caption className="auto-show">
                <h4>실시간 데이터 분석</h4>
                <p>설문 응답 데이터를 실시간으로 분석하고 <br/> 시각화할 수 있습니다.</p>
                </caption>
                <div className="img-box analysis"></div>
            </div>
            <div className="feature">
                <div className="img-box my-dashboard"></div>
                <caption className="auto-show">
                    <h4>나만의 대시보드 구성</h4>
                    <p>설문 응답 데이터를 내가 원하는대로 <br/> 대시보드를 꾸며보세요!</p>
                </caption>
            </div>
        </ServiceWrapper>
    )

}

export default HomeService