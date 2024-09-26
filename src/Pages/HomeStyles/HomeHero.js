import React from 'react';
import styled from 'styled-components';
import hero from '../../Imgs/billboard-character - copy.png'
import { useNavigate } from 'react-router-dom';
import cloud from '../../Imgs/clouds.png'

const HeroWrapper = styled.section`
    width: 100%;
    height: 90vh;
    position: relative;
    overflow: hidden;
    background-color: var(--pk-charcoal);
    
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

        button{ // 시작하기 버튼
            border-radius: 55px;
            background-image: linear-gradient(to right, var(--pk-point) 0%, var(--pk-fold-point) 100%);
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2), 0px 6px 20px rgba(0, 0, 0, 0.1);
            padding: 12px 30px;
            font-size: 17px;
        }

        .hero{
            position: absolute;
            right: 0;
            top: 100vh;
            transform: scaleX(-1) translateY(-50%) rotateY(45deg);
            filter: drop-shadow(-2px 8px 14px var(--pk-charcoal));
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
                    <p>폼톡 - 당신의 의견을 나눠보세요. 쉽게 사용하는 오픈 설문 플랫폼</p>
                    <h1>나만의 대시보드를<br/>
                    만들어 보세요                    
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