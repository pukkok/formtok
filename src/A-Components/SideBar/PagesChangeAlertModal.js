import React, { forwardRef } from "react";
import styled from "styled-components";

const StyledModal = styled.dialog`
  box-sizing: border-box;
  padding: 20px;
  border-radius: 12px;
  border: solid 2px var(--pk-point);
  background-color: var(--pk-modal-background);
  color: var(--pk-modal-font);
  & > div{
    width: 340px;
    height: 140px;
    display: flex;
    flex-direction: column;

    h5{
      font-size: 17px;
      line-height: 1.6;
    }

    .btns{
      border-top: 1px solid var(--pk-modal-border-top);
      padding-top: 10px;
      margin-top: auto;
      display: flex;
      justify-content: flex-end;
      gap: 8px;

      button{
        border-radius: 8px;
        padding: 6px 16px;
        color: #fff;
        font-weight: bold;
        &:nth-child(1){
            background-color: #ff6961;
        }
        background-color: var(--pk-point-hover);

        &:hover{
            background-image: linear-gradient(rgba(0,0,0, .1), rgba(0,0,0, .1));
        }
      }
    }
  }
`

function PagesChangeAlertModal ({next}, ref) {

    return (
        <StyledModal ref={ref}>
            <div>  
                <h5>작성 중 변경된 사항이 있습니다. <br/>
                저장 하지 않고 나가시겠습니까? </h5>
                <div className="btns">
                    <button onClick={() => ref.current.close()}>아니오</button>
                    <button onClick={next || null}>예</button>
                </div>
            </div>
        </StyledModal>
    )
}

export default forwardRef(PagesChangeAlertModal)