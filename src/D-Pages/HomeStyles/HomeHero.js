import React from 'react';
import styled from 'styled-components';
import hero from '../../A-Imgs/second-board.png'
import cloud from '../../A-Imgs/clouds.png'
import useSwitchPage from '../../C-Hooks/useSwitchPage';

const HeroWrapper = styled.section`
    width: 100%;
    height: 90vh;
    position: relative;
    overflow: hidden;
    background-image: linear-gradient(to right, #5B1FB7 60%, var(--pk-fold-point));

    &::before{
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: url(${cloud});
        background-size: 900px auto;
        background-repeat: no-repeat;
        background-position: bottom right;
    }

    main{
        position: relative;
        top: 50%;
        margin: 0 auto;
        transform: translateY(-50%);
        max-width: var(--pk-container);
        /* perspective: 1800px; */

        & > div{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            p{
                font-size: 16px;
            }

            h1{
                font-size: 60px;
                line-height: 1.1;
            }

            h4{
                font-size: 20px;
                color: #af7eff;
            }

        }

        button{ // 시작하기 버튼
            border-radius: 55px;
            background-image: linear-gradient(to right, var(--pk-point) 0%, var(--pk-fold-point) 50%, var(--pk-point) 100%);
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2), 0px 6px 20px rgba(0, 0, 0, 0.1);
            padding: 12px 30px;
            font-size: 17px;
            background-size: 200% 100%; // 백그라운드의 크기를 2배로 설정하여 이동 효과 적용
            background-position: 0% 0%; // 처음 위치는 0%
            transition: background-position .4s ease-in-out;

            &:hover {
                background-position: 100% 0%;
            }
            &:active {
                transform: scale(0.98);  // 버튼을 살짝 줄여 눌린 느낌
                box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), 0px 4px 10px rgba(0, 0, 0, 0.1);  // 그림자 크기 줄이기
            }
        }

        .hero{
            position: absolute;
            right: -100px;
            right: 0px;
            top: 100vh;
            /* transform: scaleX(-1) translateY(-50%) rotateY(45deg); */
            filter: drop-shadow(-2px 8px 14px var(--pk-charcoal));
            max-width: 780px;
            height: fit-content;
            animation: heroUp 1s forwards;
            animation-delay: .9s;
        }
    }

    @keyframes heroUp {
        0%{
            top: 100vh;
            transform: translateY(-50%);
        }
        100%{
            top: 30%;
            transform: translateY(-50%);
        }
    }
`

function HeroSection () {
    const { goToPage } = useSwitchPage()

    return (
        <HeroWrapper>
            <main>
                <div>
                    <p>폼톡 - 당신의 의견을 나눠 보세요. 쉽게 사용하는 오픈 설문 플랫폼</p>
                    <h1>나만의 대시보드를<br/>
                    만들어 보세요                    
                    </h1>

                    <h4>조사, 분석, 자료정리까지 쉽고 빠르게 설문지를 만들어 보세요 <br/>
                    대시보드를 사용해 응답받은 자료를 정리해보세요  
                    </h4>
                    <button onClick={()=>goToPage('/my-form/manager')}>시작하기</button>
                </div>

                <img className='hero' src={hero} alt='히어로 이미지'/>
            </main>
        </HeroWrapper>
    )
}
export default HeroSection