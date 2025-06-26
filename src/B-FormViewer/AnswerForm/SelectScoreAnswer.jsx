import React from "react";
import useAnswerActions from "../../C-Hooks/useAnswerActions";
import styled from "styled-components";

const StyledSelcetScore = styled.div`
    width: 80%;
    margin: 30px auto;
    .option-input-box{
        input{
            width: 100px;
            /* border: solid 1px var(--pk-charcoal); */
            padding: 8px 16px;
            border-radius: 8px;
            &:focus{
                /* border: solid 1px var(--pk-charcoal); */
            }
        }
        input:first-child{
            float: left;
        }
        input:last-child{
            float: right;
            text-align: right;
        }
        height: 30px;
        margin-bottom: 20px;
    }

    ul.line{
        padding: 0;
        width: 95%;
        margin: 0 auto;
        list-style: none;
        position: relative;
        display: flex;
        justify-content: space-between;
        height: fit-content;
        cursor: pointer;

        &::before{
            content: '';
            width: 100%;
            height: 3px;
            position: absolute;
            top: 30%;
            left: 0;
            right: 0;
            background-color: var(--pk-charcoal);
        }

        li{
            padding-top: 40px;
            flex: 2;
            display: flex;
            justify-content: center;
            &:first-child, &:nth-last-of-type(1){
                flex: 1;
            }
            &:first-child{
                justify-content: flex-start;
            }
            &:nth-last-of-type(1){
                justify-content: flex-end;
            }
        }
        .ball{
            display: block;
            position: absolute;
            top: 30%;
            left: 0;
            width: 50%;
            height: 3px;
            background-color: var(--pk-point);
            transition: .3s;
            &::after{
                content: '';
                position: absolute;
                top: 0;
                right: -10px;
                transform: translateY(-50%);
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: var(--pk-point);
            }
        }

        
    }
`

function SelectScoreAnswer({ ...props }) {

    const {answerBox, scoreRanges, pageId, questionId} = props
    const {min, max, minText, maxText} = scoreRanges
    // 선택된 범위의 점수 리스트 생성
    const scores = Array.from({ length: scoreRanges.max - scoreRanges.min + 1 }, (_, idx) => scoreRanges.min + idx)
    const { answerInValue } = useAnswerActions()

    return(
        <StyledSelcetScore>
            <div className="option-input-box">
                <input className="nbb" placeholder="왼쪽값 입력" defaultValue={minText} readOnly={true}/>
                <input className="nbb" placeholder="오른쪽값 입력" defaultValue={maxText} readOnly={true}/>
            </div>

            <ul className="line">
                {scores.map((n, idx) => (
                    <li key={idx} value={n} onClick={e => answerInValue(e, pageId, questionId)}>
                        {n}
                    </li>
                ))}
                <span className="ball" 
                style={{
                    width: (answerBox[pageId]?.[questionId].answer ? 
                    ((answerBox[pageId]?.[questionId].answer - min) / (max - min) * 100) : 0) + '%'}}></span>
            </ul>
        </StyledSelcetScore>
    )

}

export default SelectScoreAnswer