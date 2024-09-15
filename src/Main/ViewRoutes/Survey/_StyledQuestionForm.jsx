import styled from "styled-components";

const StyledQuestionFormWrapper = styled.div`
    margin-bottom: 20px;

    .multiple{
        
        .add-btns{
            margin-top: 20px;

            button{
                padding: 5px 10px;
                border-radius: 12px;
                font-weight: 500;

                &.add-answer-btn{
                    background-color: var(--purple-box);
                    color: #fff;
                    margin-right: 10px;
                }
                &.add-extra-btn{
                    background-color: #f3f3f3;
                    margin-left: 10px;
                }
            }
        }
    }

    .long-text{
    margin-top: 15px;
    width: 80%;
    padding-bottom: 5px;
    border-bottom: 1px dotted var(--deep-grey);
    }
    .short-text{
        margin-top: 15px;
        width: 40%;
        padding-bottom: 5px;
        border-bottom: 1px dotted var(--deep-grey);
    }
`

export {StyledQuestionFormWrapper as QuestionFormWrapper}