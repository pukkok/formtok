import styled from "styled-components";

const SurveyCreaterWrapper = styled.section`
    width: calc(100% - 400px);

    .card-box{
        max-width: 800px;
        margin: 30px auto;
    }
    
    .page-move { // 답변 후
        display: flex;
        padding: 10px;
        align-items: center;
        gap: 20px;
        margin-bottom: 30px;
        p {
            font-weight: bold;
        }
    }
`

export default SurveyCreaterWrapper;
