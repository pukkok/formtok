import styled from "styled-components";

const FormViewerWrapper = styled.section`
    
    header{
        position: sticky;
        top: 0;
        height: 60px;
        display: flex;
        padding: 10px 20px;
        align-items: center;
        margin-bottom: 30px;
        background-color: var(--pk-form-header-bg);
        z-index: 100;
        p{
            font-weight: 700;
        }
        a{
            margin-left: auto;
            background-color: var(--pk-point);
            color: var(--pk-light-grey);
            border-radius: 12px;
            padding: 6px 12px;
            cursor: pointer;
        }
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
        margin-bottom: 10vh;
    }

    .btns{
        button{
            text-align: center;
            min-width: 80px;
            padding: 6px 8px;
            border-radius: 8px;
        }
    
        button.prev{
            background-color: var(--pk-standard-btn-bg);
            color: var(--pk-light-grey);
            margin-right: 12px;
        }
        button.next{
            background-color: var(--pk-point);
            color: var(--pk-light-grey);
        }
    }
`

export default FormViewerWrapper