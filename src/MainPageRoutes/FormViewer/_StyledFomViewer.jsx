import styled from "styled-components";

const FormViewerWrapper = styled.section`
    
    header{
        height: 60px;
        display: flex;
        padding: 10px 20px;
        align-items: center;
        margin-bottom: 30px;
        /* border-bottom: solid 1px var(--pk-charcoal); */
        position: relative;
        input{ // 진행 상황
            position: absolute;
            width: 100%;
            height: 2px;
            left: 0;
            bottom: 0;

            background: var(--pk-charcoal);
            border-radius: 8px;
            outline: none;
            transition: .5s ease-in;
            accent-color: var(--pk-point);
        }
    }

    main{
        max-width: 700px;
        margin: 0 auto;
    }

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

    .btns{
        button{
            text-align: center;
            min-width: 80px;
            padding: 6px 8px;
            border-radius: 8px;
        }
    
        button.prev{
            background-color: var(--pk-charcoal);
            margin-right: 12px;
        }
        button.next{
            background-color: var(--pk-point);
        }
    }
`

export default FormViewerWrapper