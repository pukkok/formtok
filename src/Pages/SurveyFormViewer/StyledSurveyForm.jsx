import styled from "styled-components";

const StyledSurveyForm = styled.section`
    width: 700px;
    margin: 30px auto;

    .form-card * {
        .title-A, .title-B{
            &:hover, &:disabled{
                border-bottom: none;
            }
            border-bottom: none;
        }
    }
`

export { StyledSurveyForm as SurveyFormWrapper}