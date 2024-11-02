import styled from "styled-components";

const StyledLoginForm = styled.form`
    color: var(--pk-light-grey);
    input{
        display: block;
        box-sizing: border-box;
        flex: 1;
        font-weight: bold;
    }
    
    p{
        background-color: var(--pk-charcoal);
        padding: 10px 10px;
        margin-bottom: 8px;
        border-bottom: 1px solid #cecece;
        display: flex;
        align-items: center;

        &.hide{
            display: none;
        }

        .option{
            display: none;
            &.on{
                display: block;
            }
        }
        
        span{
            color: var(--pk-fold-point);
        }

        & .pass{
            width: 22px;
            height: 22px;
            transform: rotate(-45deg) translate(0px, -7px);
            &::before{
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background-color: #2adb2a;
                transition: .3s;
            }
            &::after{
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 2px;
                height: 50%;
                background-color: #2adb2a;
                transition: all.3s;
            }
        }
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
                background-color: var(--pk-point);
            }
        }
    }
`

export { StyledLoginForm as LoginForm }