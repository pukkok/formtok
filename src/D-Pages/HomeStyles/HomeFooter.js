import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
    width: 100%;
    padding: 20px 40px;
    background-color: var(--pk-dark);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    p {
        font-size: 14px;
        color: var(--pk-white);
    }

    .social-links {
        margin-top: 10px;

        a {
            margin: 0 10px;
            color: var(--pk-point-hover);
            font-size: 16px;
            transition: color 0.3s;

            &:hover {
                color: var(--pk-point);
            }
        }
    }
`

function HomeFooter() {
    return (
        <StyledFooter>
            <p>&copy; {new Date().getFullYear()} FormTok. Powered By Pukkok.</p>
            <div className="social-links">
                <a href="https://github.com/pukkok" target="_blank" rel="noopener noreferrer">Github</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
        </StyledFooter>
    )
}

export default HomeFooter