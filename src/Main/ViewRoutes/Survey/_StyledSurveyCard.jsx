import styled from "styled-components";

const StyledCard = styled.div`
    &.card {
        box-sizing: border-box;
        border: 2px solid var(--pk-charcoal);  // 그림자에 어두운 색상 적용
        background-color: var(--pk-dark);  // 어두운 배경색
        border-radius: 12px;
        min-height: 180px;
        margin-bottom: 16px;
        color: var(--pk-light-grey);

        input{
            padding-left: 2px;
            &::placeholder{
                color: #aaa;
            }
        }

        & > * {
            border-radius: 8px 8px 0 0;
            padding: 10px 20px;
        }

        h4 {  // 페이지 제목 부분
            background-color: var(--pk-charcoal);
            color: var(--pk-light-grey);
            font-weight: bold;
            margin-bottom: 10px;
        }

        .title-A, .title-B {
            border-bottom: 1px solid transparent;
            width: 100%;
            padding-bottom: 3px;

            &:hover {
                border-bottom: 1px solid var(--pk-silver);  // 호버 시 민트색 포인트
            }
        }

        .title-A {
            font-size: 22px;
            color: var(--pk-light-grey);  // 밝은 텍스트 색상
        }
        .title-B {
            padding-top: 5px;
            font-size: 18px;
            color: var(--pk-light-grey);  // 밝은 텍스트 색상
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

        input:focus {
            border-bottom: 2px solid var(--pk-point) !important;  // 포커스 시 민트색으로 강조
            background-color: var(--pk-dark);  // 포커스 시에도 배경색 유지
            color: var(--pk-light-grey);  // 입력 텍스트 색상
        }
    }

    &.active {
        border: 2px solid var(--pk-point);
    }

    &.ending-field {
        min-height: 120px;
    }
`;

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
            box-shadow: 0px 1px 3px 0px var(--light-grey);
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