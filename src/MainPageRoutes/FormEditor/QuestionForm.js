// import React, { useEffect, useState, useRef } from "react"
import React, { useState } from "react"
import { useRecoilValue } from "recoil"
import { pagesAtom, randomKey } from "../../Recoils/surveyAtoms"
import AddAnswer from '../../Components/AddAnswer'
import usePageActions from "../../Hooks/usePageActions"
import DropDown from "../../Components/DropDown"
import styled from "styled-components"
import { Icon, TableIcon } from "../../Components/Icons"

const StyledQuestionForm = styled.div`
    margin-bottom: 20px;
`

function QuestionForm ({pi, qi}){
    const pages = useRecoilValue(pagesAtom)
    const {type: style} = pages[pi].questions[qi]
    const {setPeriod} = pages[pi].questions[qi]
    return <StyledQuestionForm>
        {style === '서술형' && <LongText />}
        {style === '단답형' && <ShortText />}
        {['객관식', '객관식(복수 선택)', '드롭다운'].includes(style) && <Multiple style={style} pages={pages} pi={pi} qi={qi}/>}
        {['날짜', '시간', '날짜 + 시간'].includes(style) && <DateTypeInput style={style} setPeriod={setPeriod}/>}
        {style === '표형' && <TableEditor/>}
        {style === '점수 선택형' &&<SelectScore pages={pages} pi={pi} qi={qi}/>}
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

function Multiple ({style, pages, pi, qi}) {
    
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
        {style !== '드롭다운' ? <>
        {pages[pi].questions[qi].hasExtraOption && 
        <AddAnswer defaultValue={'기타'} disabled={true} buttonClick={()=>toggleEXtraOption(pi, qi, false)}/>}
        <div className="add-btns">
            <button className="add-answer-btn" onClick={()=>addOption(pi, qi)}>항목 추가</button>
            {!pages[pi].questions[qi].hasExtraOption && <>
                또는
            <button className="add-extra-btn"onClick={()=>toggleEXtraOption(pi, qi, true)}>'기타' 추가</button>
            </>}
        </div>
        </> :
        <div className="add-btns">
            <button className="add-answer-btn" onClick={()=>addOption(pi, qi)}>항목 추가</button>
        </div>
        }
    </StyledMultiple>)
}

// 서술형
const StyledLongText = styled.div`
    margin-top: 15px;
    width: 100%;
    height: 80px;
    padding: 8px 10px;
    border-radius: 12px;
    background-color: var(--pk-question-form-bg);
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
    background-color: var(--pk-question-form-bg);
`
function ShortText () {
    return <StyledShortText>
        <input placeholder="단답형 (100자 이내)" disabled={true}/>
    </StyledShortText>
}

// 날짜, 시간, 날짜+시간
const StyledDateTypeInput = styled.div`
    margin-top: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    & > div{
        width: fit-content;
        height: 40px;
        padding: 8px 10px;
        border-radius: 12px;
        background-color: var(--pk-question-form-bg);
    }
    input[type="date"]::-webkit-calendar-picker-indicator, 
    input[type="time"]::-webkit-calendar-picker-indicator, 
    input[type="datetime-local"]::-webkit-calendar-picker-indicator { 
        filter: var(--pk-question-date-indicater-filter);
        cursor: pointer;
    }

    input:focus{
        border: none;
    }
`

function DateTypeInput ({style, setPeriod = false}) {

    const changeStyleToType = (style) => {
        let type = ''
        switch (style) {
            case '날짜' : type = 'date'; break;
            case '시간' : type = 'time'; break;
            case '날짜 + 시간' : type = 'datetime-local'; break;
            default : type = 'date'
        }
        return type 
    }

    return <StyledDateTypeInput>
        <div>
            <input type={changeStyleToType(style)} />
        </div>
        {setPeriod && <>
            <span>~</span>
        <div>
            <input type={changeStyleToType(style)} />
        </div>
        </>
        }
    </StyledDateTypeInput>
}

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


const StyledTableEditor = styled.div`
    margin-top: 15px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    & > div{
        width: 100%;
        p{
            padding-left: 10px;
            display: flex;
            align-items: flex-end;
            gap: 5px;
            font-weight: 800;

        }
        & > div{
            display: flex;
            width: 100%;
            height: 40px;
            padding: 8px 10px;
            border-radius: 12px;
            background-color: var(--pk-question-form-bg);
            margin-top: 10px;
            input{
                width: 100%;
            }
            button{
                display: none;
            }
            &:hover button{
                display: block;
            }
        }
    }
`

const TableEditor = () => {
    const [rows, setRows] = useState([
        {id: 'R'+randomKey(), value: ''}, 
        {id: 'R'+randomKey(), value: ''}
    ])

    const [cols, setCols] = useState([
        {id: 'C'+randomKey(), value: ''}, 
        {id: 'C'+randomKey(), value: ''}
    ])

    // 행, 열 추가
    const addTable = (rowOrCol) => {
        if(rowOrCol === 'row'){
            setRows([...rows, {id: 'R'+randomKey(), value: ''}])
        }else{
            setCols([...cols, {id: 'C'+randomKey(), value: ''}])
        }
    }

    // 행 또는 열의 값 변경 처리 함수
    const tableValueChange = (e, id, rowOrCol) => {
        const { value } = e.target
        if (rowOrCol === 'row') {
        setRows(rows.map(row => row.id === id ? { ...row, value } : row))
        } else {
        setCols(cols.map(col => col.id === id ? { ...col, value } : col))
        }
    }

    return (
        <StyledTableEditor>
            <div>
                <p><TableIcon/><button onClick={() => addTable('row')}>행 추가</button></p>
                {rows.map((row, idx) => {
                    return (
                        <div key={row.id}>
                            <input 
                                onChange={(e) => tableValueChange(e, row.id, 'row')}
                                placeholder={(idx+1)+' 행'} 
                                value={row.value}/>
                            <button><Icon code={'close'}/></button>
                        </div>
                    )
                })}
            </div>
            <div>
                <p><TableIcon rowOrCol="col"/><button onClick={() => addTable('col')}>열 추가</button></p>
                {cols.map((col, idx) => {
                    return (
                        <div key={col.id}>
                            <input 
                            onChange={(e) => tableValueChange(e, col.id, 'col')}
                            placeholder={(idx+1)+' 열'} 
                            value={col.value}/>
                        </div>
                    )
                })}
            </div>
        </StyledTableEditor>
    )
}

