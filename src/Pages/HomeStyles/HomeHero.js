import React from 'react';
import styled from 'styled-components';
import mainBg from '../../Imgs/main-bg.jpg'
// import mainBg from './main-board.png'
import hero from '../../Imgs/billboard-character.png'
// import hero from '../../Imgs/main-board.png'
import { useNavigate } from 'react-router-dom';
import cloud from '../../Imgs/clouds.png'

const HeroWrapper = styled.section`
    width: 100%;
    height: 90vh;
    position: relative;
    overflow: hidden;
    background-color: var(--pk-charcoal);
    
    background-image: linear-gradient(to right, #5B1FB7 55%, var(--pk-fold-point));
    /* background: linear-gradient(#444466 10%, #9A5BFF 50%, #2A2A40 100%);
    background: linear-gradient(180deg, #f06292 5%, #ffd54f 30%, #1E1E2E 100%);
    background: linear-gradient(180deg, #EDEDED 10%, #4DD0E1 40%, #7E37ED 90%); */

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
        border: solid 1px red;
        perspective: 1800px;

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

        button{
            border-radius: 55px;
            background-image: linear-gradient(to right, var(--pk-point) 0%, var(--pk-fold-point) 100%);
            padding: 15px 30px;
        }

        .hero{
            position: absolute;
            right: 0;
            top: 100vh;
            transform: scaleX(-1) translateY(-50%) rotateY(45deg);
            filter: drop-shadow(-2px 6px 16px var(--pk-silver));
            max-width: 580px;
            height: fit-content;
            animation: heroUp 1s forwards;
            animation-delay: .9s;
        }
    }

    @keyframes heroUp {
        0%{
            top: 100vh;
            transform: scaleX(-1) translateY(-50%) rotateY(45deg);
        }
        100%{
            top: 50%;
            transform: scaleX(-1) translateY(-50%) rotateY(45deg);
        }
    }
`

// function HeroSection() {
//     const navigate = useNavigate()

//     return (
//         <HeroWrapper>
            
//             {/* <div className="content">
//                 <h2 className='fade-in'>간편하게 설문조사를 만들어보세요</h2>
//                 <p className='fade-in'>고래폼을 통해 쉽고 빠르게 설문지를 제작하고 데이터를 분석하세요.</p>
//                 <button className='fade-in'
//                 onClick={() => navigate('/my-form')}>시작하기</button>
//             </div> */}
//         </HeroWrapper>
//     )
// }


function HeroSection () {
    const navigate = useNavigate()

    return (
        <HeroWrapper>
            <main>
                <div>
                    <p>여기에 로고명과 홈페이지 설명이 들어갈곳</p>
                    <h1>나만의 대시보드 <br/>
                    만들어 보아요                    
                    </h1>

                    <h4>조사, 분석, 자료정리까지 쉽고 빠르게 설문지를 만들어보세요 <br/>
                    대시보드를 사용해 응답받은 자료를 정리해보세요  
                    </h4>
                    <button onClick={()=>navigate('/my-form')}>시작하기</button>
                </div>

                <img className='hero' src={hero}/>
            </main>
        </HeroWrapper>
    )
}
export default HeroSection