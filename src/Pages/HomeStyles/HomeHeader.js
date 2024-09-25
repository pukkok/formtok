import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
    width: 100%;
    padding: 5px 30px;
    background-color: var(--pk-deep-dark);
    background-image: linear-gradient(to right, #5B1FB7 55%, var(--pk-fold-point));
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
            margin-left: auto;
            display: flex;
            list-style: none;
        }
    }

    .logo {
        display: flex;
        align-items: center;
        img {
            width: 50px;
            height: 50px;
            margin-right: 10px;
        }
        h1 {
            font-size: 24px;
            color: var(--pk-light-grey);
        }
    }

    nav {
        a {
            margin-left: 20px;
            font-size: 16px;
            color: var(--pk-white);
            transition: color 0.3s;
            cursor: pointer;
            &:hover {
                color: var(--pk-point-hover);
            }
        }
    }
`;

function HomeHeader() {
    return (
        <StyledHeader>
            <nav>
                <div className="logo">
                    {/* <img src={logo} alt="고래폼 로고" /> */}
                    <h1>고래폼</h1>
                </div>
                <ul>
                    <li><Link to="/">홈</Link></li>
                    <li><Link to="/features">깃허브</Link></li>
                    <li><Link to="/contact">문의하기</Link></li>
                    <li><Link to="/user/login">로그인</Link></li>  
                </ul>
            </nav>
        </StyledHeader>
    )
}

export default HomeHeader