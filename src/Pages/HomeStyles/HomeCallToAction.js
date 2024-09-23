import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyledCTA = styled.section`
    padding: 80px 40px;
    background-color: var(--pk-deep-dark);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    h3 {
        font-size: 32px;
        margin-bottom: 20px;
        color: var(--pk-point);
    }

    p {
        font-size: 18px;
        margin-bottom: 40px;
    }

    button {
        padding: 15px 30px;
        font-size: 16px;
        background-color: var(--pk-point);
        border: none;
        border-radius: 8px;
        color: var(--pk-white);
        transition: background-color 0.3s;

        &:hover {
            background-color: var(--pk-point-hover);
        }
    }
`;

function CallToAction() {
    const navigate = useNavigate();

    return (
        <StyledCTA>
            <h3>설명만 듣는것 보단 한번 해보는게 빠르죠!</h3>
            <p>고래폼을 사용하여 쉽게 설문조사를 생성하고 데이터를 분석해보세요.</p>
            <button onClick={() => navigate('/signup')}>가입하기</button>
        </StyledCTA>
    );
}

export default CallToAction;