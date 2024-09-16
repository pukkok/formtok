import styled from "styled-components";

const StyledSurveyCreaterWrapper = styled.section`
    width: 1240px;
    margin: 60px auto;
    color: var(--pk-light-grey);  // 텍스트 색상 설정
    background-color: var(--pk-deep-dark);  // 어두운 배경 설정

    & > div {
        width: 100%;
        display: grid;
        grid-template-columns: 7fr 3fr;
        gap: 30px;
    }

    .page-move {
        display: flex;
        padding: 10px;
        align-items: center;
        gap: 20px;
        margin-bottom: 30px;
        p {
            font-weight: bold;
        }
        .drop-down-wrapper {
            max-width: 800px;
        }
    }
`;

function SurveyCreaterWrapper({ children }) {
    return (
        <StyledSurveyCreaterWrapper>
            <div>{children}</div>
        </StyledSurveyCreaterWrapper>
    );
}

export default SurveyCreaterWrapper;
