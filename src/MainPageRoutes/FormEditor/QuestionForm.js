import React, { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { pagesAtom } from "../../Recoils/surveyAtoms"
import AddAnswer from '../../Components/AddAnswer'
import usePageActions from "../../Hooks/usePageActions"
import { QuestionFormWrapper } from "./_StyledQuestionForm"
import DropDown from "../../Components/DropDown"
import styled from "styled-components"

function QuestionForm ({pi, qi}){
    const pages = useRecoilValue(pagesAtom)
    const style = pages[pi].questions[qi].type || '객관식'
    
    const { addOption, toggleEXtraOption, changeOption, deleteOption } = usePageActions()

    return <QuestionFormWrapper>
        {(style === '객관식' || style === '드롭다운' || style === '체크박스') &&
        <div className="multiple">
            {pages[pi].questions[qi].options.map((option, idx3) => {
                const {id, answer} = option
                return <AddAnswer key={id} 
                inputChange={(e)=>changeOption(e, pi, qi, idx3)} placeholder={'옵션'+(idx3+1)} value={answer} 
                buttonClick={()=>deleteOption(pi, qi, idx3)}
                isNotUseBtn={pages[pi].questions[qi].options.length===1 && idx3===0}
                />
            })}
            {pages[pi].questions[qi].hasExtraOption && 
            <AddAnswer defaultValue={'기타'} disabled={true} buttonClick={()=>toggleEXtraOption(pi, qi, false)}/>}
            <div className="add-btns">
                <button className="add-answer-btn" onClick={()=>addOption(pi, qi)}>항목 추가</button>
                {!pages[pi].questions[qi].hasExtraOption && <>
                    또는
                <button className="add-extra-btn"onClick={()=>toggleEXtraOption(pi, qi, true)}>'기타' 추가</button>
                </>}
            </div>
        </div>
        }
        {style === '서술형' &&
            <p className="long-text">서술형</p>
        }
        {style === '단답형' && 
            <input className="short-text" placeholder="단답형" disabled={true}/>
        }
        {style === '날짜' &&
            <input className="short-text" type="date" disabled={true}/>
        }
        {style === '시간' &&
            <input className="short-text" type="time" disabled={true}/>
        }
        {style === '점수 선택형' &&
            <SelectScore />
        }
    </QuestionFormWrapper>
}

export default QuestionForm

const SelectScoreWrapper = styled.div` // 점수 선택형
    width: 80%;
    margin: 30px auto;
    .option-input-box{
        input{
            width: 100px;
            border: solid 1px var(--pk-charcoal);
            padding: 2px 5px;
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

    ul, li{
        margin: 0;
        padding: 0;
    }

    ul.line{
        width: 100%;
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
            top: 25%;
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
            top: 25%;
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

function SelectScore () {
    const [percent, setPercent] = useState(50)

    return (
    <SelectScoreWrapper>
        <div className="option-input-box">
            <input placeholder="왼쪽값 입력"/>
            <input placeholder="오른쪽값 입력"/>
        </div>

        <ul className="line">
            {Array(5).fill(1).map((n, idx) => {
                return <li key={idx} value={idx} onClick={()=>setPercent(idx / 4 * 100)}>{n+idx}</li>
            })}
            <span className="ball" 
            style={{width : percent + '%'}}></span>
        </ul>

        <div className="minmax-box">
            <div>
                최소 : 
                <DropDown initialItem={1} style={{width: '100px'}}>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                </DropDown>
            </div>
            <span>~</span>
            <div>최대 :
                <DropDown initialItem={5} style={{width: '100px'}}>
                    <li>10</li>
                    <li>10</li>
                    <li>10</li>
                    <li>10</li>
                    <li>10</li>
                    <li>10</li>
                </DropDown>
            </div>
        </div>
    </SelectScoreWrapper>
    )
}