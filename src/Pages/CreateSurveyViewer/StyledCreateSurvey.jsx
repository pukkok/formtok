import styled from "styled-components";

const StyledCreateSurveyWrapper = styled.section`
    width: 1240px;
    margin: 60px auto;

    & > div{
        width: 100%;
        display: grid;
        grid-template-columns: 7fr 3fr;
        gap: 20px;
    }

    .page-move{
        display: flex;
        padding: 10px;
        align-items: center;
        gap: 20px;
        margin-bottom: 30px;
        p{
            font-weight: bold;
        }
        .drop-down-wrapper{
            max-width: 800px;
        }
    }

`

function CreateSurveyWrapper ({children}) {
    return (
    <StyledCreateSurveyWrapper>
        <div>
            {children}
        </div>
    </StyledCreateSurveyWrapper>
    )
}

export default CreateSurveyWrapper