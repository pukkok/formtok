import styled from "styled-components";

const StyledSurveyForm = styled.section`
    width: 700px;
    margin: 30px auto;

    .form-card *{
        .title-A, .title-B{
            &:hover, &:disabled{
                border-bottom: none;
            }
            border-bottom: none;
        }

        .multiple{
            margin-top: 10px;
            display: flex;
            gap: 10px;
            cursor: pointer;
        }
    }
`

export { StyledSurveyForm as SurveyFormWrapper}