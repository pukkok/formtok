import styled from "styled-components";

const FormCardWrapper = styled.div`
    &.card {
        box-sizing: border-box;
        border: 2px solid var(--pk-form-card-border);  // 그림자에 어두운 색상 적용
        background-color: var(--pk-form-card-bg);  // 어두운 배경색
        border-radius: 12px;
        min-height: 180px;
        margin-bottom: 16px;
        color: var(--pk-form-card-color);

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
            background-color: var(--pk-form-card-title-bg);
            color: var(--pk-light-grey);
            font-weight: bold;
            margin-bottom: 10px;
        }

        .title-A, .title-B {
            border-bottom: 1px solid transparent;
            width: 100%;
            padding-bottom: 3px;

            &:hover {
                border-bottom: 1px solid var(--pk-silver);
            }
        }

        .title-A {
            font-size: 22px;
        }
        .title-B {
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

        
    }

    &.active:not(.viewer) {
        border: 2px solid var(--pk-point);

        input:not([type='date'], [type="time"], [type="datetime-local"]):focus {
            border-bottom: 2px solid var(--pk-point) !important;  // 포커스 시 민트색으로 강조
        }
    }

    &.viewer{
        min-height: 120px;
        .title-A, .title-B {
            border-bottom: none;
            &:hover, &:disabled {
                border-bottom: none;
            }
        }

        .option{
            margin-top: 18px;
        }
        .ck-editor-wrapper{
            user-select: none;
            .ck.ck-editor__editable.ck-blurred{
                border-bottom: none;
            }
            .ck.ck-editor__editable.ck-focused{
                border-bottom: none;
                margin-bottom: 0;
            }
        }
        input:focus{
            border-bottom: none;
        }
    }

    &.ending-field {
        min-height: 120px;
    }
`;

const QuestionOptionsWrapper = styled.div`
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
        transition: none !important;
        &.on{
            width: 200px;
            top: -14px;
            right: 0;
            height: 80px;
            padding: 5px;
            &.date-type{
                height: 120px;
            }
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

export { FormCardWrapper, QuestionOptionsWrapper }