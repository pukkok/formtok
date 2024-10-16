import React from 'react';
import styled from 'styled-components';
import logo from '../../A-Imgs/formtok-logo-white.png'
import { Link, useNavigate } from 'react-router-dom';
import useSwitchPage from '../../C-Hooks/useSwitchPage';

const StyledHeader = styled.header`
    width: 100%;
    padding: 10px 0;
    background-image: linear-gradient(to right, #5B1FB7 60%, var(--pk-fold-point));
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    nav{
        max-width: var(--pk-container);
        margin: 0 auto;
        display: flex;
        align-items: center;

        ul{
            margin: 0;
            margin-left: auto;
            display: flex;
            list-style: none;
        }
    }

    .logo {
        display: flex;
        align-items: center;
        img {
            width: 40px;
            height: 40px;
            margin-right: 10px;
            filter: drop-shadow(0 0 24px var(--pk-charcoal));
        }
        h1 {
            font-size: 28px;
            color: var(--pk-light-grey);
        }
        cursor: pointer;
    }

    nav {
        ul{
            display: flex;
            gap: 16px;
            align-items: center;
        }
        li{
            a, button{
                cursor: pointer;
                padding: 8px;
                font-size: 17px;
                font-weight: 700;
                color: var(--pk-light-grey);

                &:hover {
                    color: var(--pk-point-hover);
                }
            }

            &.login{
                a, button{
                    display: block;
                    border-radius: 50px;
                    background-image: linear-gradient(to right, var(--pk-fold-point) 0%, var(--pk-point) 50%, #f06292);
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2), 0px 6px 20px rgba(0, 0, 0, 0.1);
                    background-size: 200% 100%;
                    padding: 8px 24px;
                    background-position: 0% 0%; 
                    transition: background-position .4s ease-in-out;
                    &:hover {
                        background-position: 100% 0%;
                        color: var(--pk-light-grey);
                    }
                    &:active {
                        transform: scale(0.98);  // 버튼을 살짝 줄여 눌린 느낌
                        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), 0px 4px 10px rgba(0, 0, 0, 0.1);  // 그림자 크기 줄이기
                    }
                }

            }
        
        }
    }
`;

function HomeHeader() {
    const navigate = useNavigate()
    const { goToPage } = useSwitchPage()
    return (
        <StyledHeader>
            <nav>
                <div className="logo" onClick={()=>navigate('/')}>
                    <img src={logo} alt="폼톡 로고" />
                    <h1>폼톡</h1>
                </div>
                <ul>
                    <li><button onClick={()=>goToPage("/form-list")}>문의하기</button></li>
                    <li className='login'><Link to="/user/login">로그인</Link></li>
                </ul>
            </nav>
        </StyledHeader>
    )
}

export default HomeHeader