import styled from "styled-components";

const StyledLoginForm = styled.form`
    color: var(--pk-light-grey);
    & > input{
        display: block;
        box-sizing: border-box;
        width: 100%;
        padding: 10px 10px;
        margin-bottom: 16px;
        font-weight: bold;
        border-bottom: 1px solid #cecece;
    }

    .btns{
        margin-top: 40px;
        display: flex;
        align-items: center;
        & > div{
            display: flex;
            align-items: center;
            gap: 5px;
            input:hover{
                font-weight: bold;
                cursor: pointer;
            }
        }

        .round-btn{
            margin-left: auto;
            text-align: center;
            border-radius: 50px;
            min-width: 100px;
            padding: 8px 16px;
            border: solid 2px transparent;
            background-color: var(--pk-point);
            font-weight: bold;
            cursor: pointer;

            &:hover{
                /* border: solid 2px var(--pk-point); */
                background-color: var(--pk-point);
                background-color: #601dcd ;
            }
        }
    }
`

export { StyledLoginForm as LoginForm }