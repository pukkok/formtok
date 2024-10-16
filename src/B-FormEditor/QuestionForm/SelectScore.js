import React, { useState } from "react";
import usePageActions from "../../C-Hooks/usePageActions";
import styled from "styled-components";
import DropDown from "../../A-Components/DropDown";
// 점수 선택형
const StyledSelcetScore = styled.div` 
    width: 80%;
    margin: 15px auto 0 auto;
    .option-input-box{
        input{
            width: 100px;
            border: solid 1px transparent;
            background-color: var(--pk-question-form-bg);
            padding: 8px 16px;
            border-radius: 8px;
            &:focus{
                border: solid 1px var(--pk-point);
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

    .minmax-box{
        margin-top: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        & > div{
            display: inline-flex;
            gap: 10px;
            align-items: center;
        }
    }
        
`

function SelectScore ({pages, pi, qi}) {
    const [percent, setPercent] = useState(0)
    // const [range, setRange] = useState({min: 1, max: 5}) // 기본 최소값 1, 최대값 5
    const range = pages[pi].questions[qi].scoreRanges

    // 선택된 범위의 점수 리스트 생성
    const scores = Array.from({ length: range.max - range.min + 1 }, (_, idx) => range.min + idx)
    const { periodSetting } = usePageActions()

    // 드롭다운에서 선택한 값을 기반으로 최소, 최대 범위 업데이트
    const minMaxChange = (minmax, value) => {
        periodSetting(pi, qi, minmax, value)
        setPercent(0)
    }

    return (
        <StyledSelcetScore>
            <div className="option-input-box">
                <input className="nbb" placeholder="왼쪽값 입력" onChange={e => periodSetting(pi, qi, 'minText', e.target.value)} value={range.minText}/>
                <input className="nbb" placeholder="오른쪽값 입력" onChange={e => periodSetting(pi, qi, 'maxText', e.target.value)} value={range.maxText}/>
            </div>

            <ul className="line">
                {scores.map((n, idx) => (
                    <li key={idx} value={n} onClick={() => setPercent(((n - range.min) / (scores.length - 1)) * 100)}>
                        {n}
                    </li>
                ))}
                <span className="ball" style={{width: percent + '%'}}></span>
            </ul>

            <div className="minmax-box">
                <div>최소 : 
                    <DropDown initialItem={range.min} style={{width: '80px'}}>
                        {Array.from({ length: 2 }, (_, idx) => idx).map((n) => (
                            <li key={n}><button onClick={() => minMaxChange('min', n)}>{n}</button></li>
                        ))}
                    </DropDown>
                </div>
                <span>~</span>
                <div>최대 :
                    <DropDown initialItem={range.max} style={{width: '80px'}}>
                        {Array.from({ length: 9 }, (_, idx) => idx + 2).map((n) => (
                            <li key={n}><button onClick={() => minMaxChange('max', n)}>{n}</button></li>
                        ))}
                    </DropDown>
                </div>
            </div>
        </StyledSelcetScore>
    )
}

export default SelectScore