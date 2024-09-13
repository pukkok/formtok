import styled from "styled-components";

const StyledCard = styled.div`
    &.card{
        box-sizing: border-box;
        border: solid 2px #d7d7d7;
        background-color: #fff;
        border-radius: 12px;
        min-height: 180px;
        margin-bottom: 10px;

        & > *{
            border-radius: 8px 8px 0 0;
            padding: 10px 20px;
        }

        h4{ // 페이지네이션
            background-color: var(--light-grey);
            background-color: var(--purple);
            color: #fff;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .title-A, .title-B{
            border-bottom: 1px solid transparent;
            width: 100%;
            padding-bottom: 3px;

            &:hover{
                border-bottom: 1px solid #cecece;
            }
        }

        .title-A{
            font-size: 22px;
        }
        .title-B{
            padding-top: 5px;
            font-size: 18px;
        }

        .essential{
            position: relative;
        }
        .essential::before{
            content: '*';
            color: red;
            position: absolute;
            left: -10px;
            top: 50%;
            transform: translateY(-50%);
        }

        input:focus{
            border-bottom: 2px solid var(--purple) !important; 
        }
    }

    &.active{
        border: solid 2px var(--purple);
    }

    &.ending-field{
        min-height: 120px;
    }
`

const StyledQuestionOptionsWrapper = styled.div`
    &.question-options-wrapper{
        padding: 10px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 16px;
        margin-bottom: 5px;
        position: relative; 

        .toggle-options{
            display: flex;
            align-items: center;
            gap: 5px;
        }
    }

    .drop-down-wrapper{
        margin-right: auto;
    }

    .more-vert-wrapper .options{
        &.on{
            width: 200px;
            transition: none;
            top: -14px;
            right: 0;

            height: 120px;
            padding: 5px;
            box-shadow: 0px 1px 4px 0px var(--deep-grey);
        }

        p{
            padding: 0 5px;
            display: flex;
            align-items: center;
        
            button{
                margin-left: auto;
                height: 24px;
            }
        }
    }
`

export {
    StyledCard as SurveyCard,
    StyledQuestionOptionsWrapper as QuestionOptionsWrapper
}