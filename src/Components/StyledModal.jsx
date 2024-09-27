import styled from "styled-components";

const ModalWrapper = styled.dialog`
    box-sizing: border-box;
    padding: 20px;
    border-radius: 12px;
    border: solid 2px var(--pk-point);
    background-color: var(--pk-modal-background);
    color: var(--pk-modal-font);
    
    h4{font-size: 18px;}
    p{font-size:14px;}

    .line-up{ // 정렬
        display: flex;
        align-items: center;
        gap: 10px;
        & > *{
            margin-bottom: 5px;
        }
    }
    & > div{ // 박스
        display: flex;
        flex-direction: column;
        
        min-width: 500px;
        min-height: 300px;

        header{
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            p{
                margin-left: auto;
                display: flex;
                align-items: center;
                gap: 5px;
                color: var(--pk-silver);
            }
        }

        main{
            border-top: 1px solid var(--pk-modal-border-top);
            padding: 10px 0;
            & > *{
                margin-bottom: 5px;
            }
        }

        .btns{
            border-top: 1px solid var(--pk-modal-border-top);
            padding-top: 10px;
            margin-top: auto;
            display: flex;
            justify-content: flex-end;
            gap: 16px;

            button{
                border-radius: 8px;
                padding: 6px 12px;
                color: var(--pk-light-grey);
                font-weight: bold;
                background-color: var(--pk-point);

                &:hover{
                    background-color: var(--pk-point-hover);
                }
            }
        }

        input{
            font-weight: bold;
            font-size: 18px;
            width: 100%;
            border-bottom: none;
        }
    }
    
`

export default ModalWrapper