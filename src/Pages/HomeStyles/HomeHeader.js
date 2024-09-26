import React from 'react';
import styled from 'styled-components';
import logo from '../../Imgs/formtok-logo-white.png'
import { Link, useNavigate } from 'react-router-dom';

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
    z-index: 1000;
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
            a{
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
                a{
                    display: block;
                    border-radius: 50px;
                    background-image: linear-gradient(to right, var(--pk-fold-point) 0%, var(--pk-point) 100%);
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2), 0px 6px 20px rgba(0, 0, 0, 0.1);
                    padding: 8px 24px;
                    transition: color 0.3s;

                    
                }

            }
        
        }
    }
`;

function HomeHeader() {
    const navigate = useNavigate()
    return (
        <StyledHeader>
            <nav>
                <div className="logo" onClick={()=>navigate('/')}>
                    <img src={logo} alt="폼톡 로고" />
                    <h1>폼톡</h1>
                </div>
                <ul>
                    <li><Link to="/contact">문의하기</Link></li>
                    <li className='login'><Link to="/user/login">로그인</Link></li>
                </ul>
            </nav>
        </StyledHeader>
    )
}

export default HomeHeader