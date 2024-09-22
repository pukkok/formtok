import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import logo from '../images/logo-check-1.png'; // 로고 이미지 경로

const StyledHeader = styled.header`
    width: 100%;
    padding: 20px 40px;
    background-color: var(--pk-deep-dark);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 1000;

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
            color: var(--pk-point);
        }
    }

    nav {
        a {
            margin-left: 20px;
            font-size: 16px;
            color: var(--pk-white);
            transition: color 0.3s;

            &:hover {
                color: var(--pk-point-hover);
            }
        }
    }
`;

function HomeHeader() {
    return (
        <StyledHeader>
            <div className="logo">
                {/* <img src={logo} alt="고래폼 로고" /> */}
                <h1>고래폼</h1>
            </div>
            <nav>
                <Link to="/">홈</Link>
                <Link to="/features">특징</Link>
                <Link to="/contact">문의하기</Link>
                <Link to="/login">로그인</Link>
            </nav>
        </StyledHeader>
    );
}

export default HomeHeader;