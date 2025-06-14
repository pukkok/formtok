import React from 'react';
import styled from 'styled-components';
import NavigateButton from '../../A-Components/Buttons/NavigateButton';

function JoinCallToAction({ content }) {
    
    return (
        <StyledCTA>
            <h3>{content.headLine}</h3>
            <p>{content.content}</p>
            <NavigateButton to={content.navigate}>
                {content.navText}
            </NavigateButton>
        </StyledCTA>
    );
}

export default JoinCallToAction

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