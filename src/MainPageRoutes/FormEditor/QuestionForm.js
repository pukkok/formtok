import React, { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { pagesAtom } from "../../Recoils/surveyAtoms"
import AddAnswer from '../../Components/AddAnswer'
import usePageActions from "../../Hooks/usePageActions"
import DropDown from "../../Components/DropDown"
import styled from "styled-components"

const StyledQuestionForm = styled.div`
    margin-bottom: 20px;
`

function QuestionForm ({pi, qi}){
    const pages = useRecoilValue(pagesAtom)
    const style = pages[pi].questions[qi].type || '객관식'

    return <StyledQuestionForm>
        {style === '서술형' && <LongText />}
        {style === '단답형' && <ShortText />}
        {['객관식', '드롭다운', '체크박스'].includes(style) &&
            <Multiple pages={pages} pi={pi} qi={qi}/>
        }
        {['날짜', '시간', '날짜 + 시간'].includes(style) &&
            <DateTypeInput style={style}/>
        }
        {style === '점수 선택형' &&
            <SelectScore pi={pi} qi={qi}/>
        }
    </StyledQuestionForm>
}

export default QuestionForm

const StyledMultiple = styled.div`
    .add-btns{
        margin-top: 20px;

        button{
            padding: 5px 10px;
            border-radius: 12px;
            font-weight: 500;

            &.add-answer-btn{
                background-color: var(--pk-point);
                color: var(--pk-light-grey);
                margin-right: 10px;
            }
            &.add-extra-btn{
                background-color: var(--pk-add-extra-btn-bg);
                color: var(--pk-light-grey);
                margin-left: 10px;
            }
        }
    }
`

function Multiple ({pages, pi, qi}) {
    
    const { addOption, toggleEXtraOption, changeOption, deleteOption } = usePageActions()

    return (
    <StyledMultiple>
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
    </StyledMultiple>)
}

// 서술형
const StyledLongText = styled.div`
    margin-top: 15px;
    width: 100%;
    height: 80px;
    padding: 8px 10px;
    border-radius: 12px;
    background-color: var(--pk-charcoal);
`
function LongText () {
    return <StyledLongText>
        <input placeholder="서술형 (1000자 이내)" disabled={true}/>
    </StyledLongText>
}

// 단답형
const StyledShortText = styled.div`
    margin-top: 15px;
    width: 40%;
    height: 40px;
    padding: 8px 10px;
    border-radius: 12px;
    background-color: var(--pk-charcoal);
`
function ShortText () {
    return <StyledShortText>
        <input placeholder="단답형 (100자 이내)" disabled={true}/>
    </StyledShortText>
}

// 날짜, 시간, 날짜+시간
const StyledDateTypeInput = styled.div`
    margin-top: 15px;
    width: fit-content;
    height: 40px;
    padding: 8px 10px;
    border-radius: 12px;
    background-color: var(--pk-charcoal);

    input[type="date"]::-webkit-calendar-picker-indicator, 
    input[type="time"]::-webkit-calendar-picker-indicator, 
    input[type="datetime-local"]::-webkit-calendar-picker-indicator { 
        filter: invert(.8);
        cursor: pointer;
    }

    input:focus{
        border: none;
    }
`

function DateTypeInput ({style}) {

    const changeStyleToType = (style) => {
        let type = ''
        switch (style) {
            case '날짜' : type = 'date'; break;
            case '시간' : type = 'date'; break;
            case '날짜 + 시간' : type = 'datetime-local'; break;
            default : type = 'date'
        }
        return type 
    }

    return <StyledDateTypeInput>
        <input type={changeStyleToType(style)} />
    </StyledDateTypeInput>
}

// 점수 선택형
const StyledSelcetScore = styled.div` 
    width: 80%;
    margin: 30px auto;
    .option-input-box{
        input{
            width: 100px;
            border: solid 1px var(--pk-charcoal);
            padding: 4px 8px;
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
        margin: 0;
        padding: 0;
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

function SelectScore ({pi, qi}) {
    const [percent, setPercent] = useState(50)
    const [maxScore, setMaxScore] = useState(5)

    const scores = Array(maxScore).fill(1).map((n, idx) => n+idx)

    return (
    <StyledSelcetScore>
        <div className="option-input-box">
            <input placeholder="왼쪽값 입력"/>
            <input placeholder="오른쪽값 입력"/>
        </div>

        <ul className="line">
            {scores.map((n, idx) => {
                return <li key={idx} value={idx} onClick={()=>setPercent(idx / (scores.length - 1) * 100)}>{n}</li>
            })}
            <span className="ball" 
            style={{width : percent + '%'}}></span>
        </ul>

        <div className="minmax-box">
            <div>최소 : 
                <DropDown initialItem={1} style={{width: '80px'}}>
                    <li><button>1</button></li>
                    <li><button>2</button></li>
                    <li><button>3</button></li>
                    <li><button>4</button></li>
                    <li><button>5</button></li>
                </DropDown>
            </div>
            <span>~</span>
            <div>최대 :
                <DropDown initialItem={5} style={{width: '80px'}}>
                    <li>10</li>
                    <li>10</li>
                    <li>10</li>
                    <li>10</li>
                    <li>10</li>
                    <li>10</li>
                </DropDown>
            </div>
        </div>
    </StyledSelcetScore>
    )
}