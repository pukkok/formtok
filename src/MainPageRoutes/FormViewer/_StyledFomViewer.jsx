import styled from "styled-components";

const FormViewerWrapper = styled.section`

    main{
        max-width: 700px;
        margin: 0 auto;
        margin-bottom: 10vh;
    }

    .btns{
        display: flex;
        button{
            display: flex;
            align-items: center;
            padding: 6px 8px;
            border-radius: 8px;
            gap: 10px
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