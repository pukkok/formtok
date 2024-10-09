import React, { forwardRef } from "react";
import styled from "styled-components";
import { RadioButton } from "../../Components/MultipleButton";
import { Icon } from "../../Components/Icons";

const StyledModal = styled.dialog`
    box-sizing: border-box;
    padding: 20px;
    border-radius: 12px;
    border: solid 2px var(--pk-point);
    background-color: var(--pk-modal-background);
    color: var(--pk-modal-font);

    h5{
        font-size: 16px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 10px;
        & > *{
            margin-bottom: 5px;
        }
    }
    p{font-size:14px;}

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
    }
`

function ReadMoreModal ({readMore}, ref) {

    const closeModal = () => {
        ref.current.close()
    }

    return (
        <StyledModal ref={ref}>
            {readMore && <div>
                <header>Q. {readMore.q}
                    <p><Icon code={readMore.code}/>{readMore.type}</p>
                </header>
                <main>
                {readMore.options && readMore.options.map((option, key) => {
                    return <h5 key={key} className="line-up"
                    ><RadioButton disabled={true}>{option.answer}</RadioButton></h5>
                })}
                </main>
                <footer className="btns">
                    <button onClick={()=>{}}>사용</button>
                    <button style={{backgroundColor: '#c30928'}} onClick={()=>{}}>삭제</button>
                    <button onClick={closeModal}>닫기</button>
                </footer>
            </div>
            }
        </StyledModal>
    )
}

export default forwardRef(ReadMoreModal)