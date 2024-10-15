import React from "react";
import styled from "styled-components";
import { RadioButton, CheckBoxButton } from "../Components/MultipleButton";
import DropDown from "../Components/DropDown";
import useAnswerActions from "../Hooks/useAnswerActions";
import { useRecoilValue } from "recoil";
import { AnswerBoxAtom } from "../Recoils/surveyAtoms";

const StyledViewerQuestionForm = styled.div`
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .input-wrapper{
        width: 40%;
        height: 40px;
        padding: 8px 10px;
        border-radius: 12px;
        background-color: var(--pk-question-form-bg);

        display: flex;
        align-items: center;
        gap: 10px;
        input{
            width: 100%;
        }

        input[type="date"]::-webkit-calendar-picker-indicator, 
        input[type="time"]::-webkit-calendar-picker-indicator, 
        input[type="datetime-local"]::-webkit-calendar-picker-indicator { 
            filter: var(--pk-question-date-indicater-filter);
            cursor: pointer;
        }
    }

    .drop-down-wrapper{ // 커스텀
        & > button{
            background-color: var(--pk-question-form-bg);
            transition: background-color .3s;
            &.open{
                background-color: var(--pk-dropdown-bg);
            }
        }
    }

    div[contenteditable="true"]{
        outline: none;
        width: 100%;
        min-height: 80px;
        padding: 8px 10px;
        border-radius: 12px;
        background-color: var(--pk-question-form-bg);
        &:empty:before {
            content: attr(placeholder);
            color: #aaa;
            cursor: text;
        }
    }
`

function ViewerQuestionForm ({ type, options=[], hasExtraOption, scoreRanges, setPeriod, pageId, questionId }) {
    const { answerPick, extraPick, extraInValue,
         answerPicks, answerInValue, answerInHTML, answerDateType, answerPeriodValueReset } = useAnswerActions()
    const answerBox = useRecoilValue(AnswerBoxAtom)

    if (!answerBox[pageId]) { // 불러오기 전
        return <></>
    }

    return (
    <StyledViewerQuestionForm>
        {(type === '객관식' && options.length > 0) && <>
            {options.map(option => {
                return (option.answer && <RadioButton 
                    key={option.id} 
                    onClick={() => answerPick(option.answer, pageId, questionId)}
                    pick={answerBox[pageId]?.[questionId]?.answer || ''}
                    >
                    {option.answer}</RadioButton>)
            })}

            {hasExtraOption && <>
                <RadioButton
                onClick={() => extraPick(pageId, questionId)} pick={answerBox[pageId][questionId].useExtra && '기타'}
                >기타</RadioButton>
            
                {answerBox[pageId][questionId].useExtra &&
                <div className="input-wrapper">
                    <input 
                    onChange={e => extraInValue(e, pageId, questionId)} 
                    value={answerBox[pageId][questionId].extra || ''}
                    placeholder="내용을 입력해 주세요."
                    />
                </div>}
            </>}
        </>}

        {(type === '객관식(복수 선택)' && options.length > 0) && <>
            {options.map(option => {
                return (option.answer && <CheckBoxButton 
                    key={option.id}
                    onClick={() => answerPicks(option.answer, pageId, questionId)}
                    picks={answerBox[pageId]?.[questionId].answer || []}
                    >
                    {option.answer}</CheckBoxButton>)
            })}

            {hasExtraOption && <>
                <RadioButton
                onClick={() => extraPick(pageId, questionId, true)} pick={answerBox[pageId][questionId].useExtra && '기타'}
                >기타</RadioButton>
            
                {answerBox[pageId][questionId].useExtra &&
                <div className="input-wrapper">
                    <input 
                    onChange={e => extraInValue(e, pageId, questionId)} 
                    value={answerBox[pageId][questionId].extra || ''}
                    placeholder="내용을 입력해 주세요."
                    />
                </div>}
            </>}
        </>}

        {(type === '드롭다운' && options.length > 0) && 
        <DropDown initialItem={answerBox[pageId]?.[questionId] || '옵션을 선택해주세요'} style={{width: '260px'}}>
            <li><button onClick={e => answerInHTML(e, pageId, questionId, true)}>옵션을 선택해주세요</button></li>
            {options.map(option => {
                return (option.answer && 
                <li key={option.id}>
                    <button onClick={e => answerInHTML(e, pageId, questionId)}>{option.answer}</button>
                </li>)
            })}
        </DropDown>}

        {type === '단답형' && 
        <div className="input-wrapper">
            <input 
            placeholder="답변 입력" 
            onChange={e => answerInValue(e, pageId, questionId)} 
            value={answerBox[pageId]?.[questionId].answer || ""}/>
        </div>}

        {type === '서술형' && 
        <div 
            contentEditable 
            placeholder={'답변 입력(최대 1000자)'}
            onBlur={e => answerInHTML(e, pageId, questionId)} // 입력을 벗어났을때 데이터 저장
            dangerouslySetInnerHTML={{ __html : answerBox[pageId]?.[questionId].answer || ""}}
        />}
        
        {['날짜', '시간', '날짜 + 시간'].includes(type) && 
        <DateTypeInput 
            style={type}
            onChange={e => answerDateType(e, pageId, questionId, 'start')}
            secondOnChange={e => answerDateType(e, pageId, questionId, 'end')}
            secondValueCheck={() => answerPeriodValueReset(answerBox[pageId]?.[questionId]?.start, pageId, questionId, 'end')}
            setPeriod={setPeriod}
            value={answerBox[pageId]?.[questionId]?.start || ""}
            secondValue={answerBox[pageId]?.[questionId]?.end || ""}
        />}

        {type === '점수 선택형' && 
        <SelectScore 
            scoreRanges={scoreRanges} 
            pageId={pageId} 
            questionId={questionId}
            getScore={e => answerInValue(e, pageId, questionId)}
        />}
    </StyledViewerQuestionForm>)

}

export default ViewerQuestionForm

const StyledDateTypeInput = styled.div`
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

function DateTypeInput ({style, onChange, secondOnChange, secondValueCheck, setPeriod, value="", secondValue=""}) {

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

    const valueCheck = () => {
        if(secondValue === '') return
        if(value >= secondValue){
            alert('두 번째 날짜/시간은 첫 번째 날짜/시간보다 이후여야 합니다.')
            secondValueCheck && secondValueCheck()
            return // 유효하지 않은 경우 변경하지 않음
        }
    }

    return (
    <StyledDateTypeInput>
    <div>
        <input 
        type={changeStyleToType(style)} 
        onChange={onChange}
        onBlur={valueCheck}
        value={value}/>
    </div>
    {setPeriod && <>
        <span>~</span>
    <div>
        <input 
        type={changeStyleToType(style)}
        onChange={secondOnChange}
        onBlur={valueCheck}
        value={secondValue}/>
    </div>
    </>
    }
    </StyledDateTypeInput>
    )
}

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

function SelectScore ({scoreRanges, pageId, questionId, getScore}) {
    const answerBox = useRecoilValue(AnswerBoxAtom)
    const {min, max, minText, maxText} = scoreRanges
    // 선택된 범위의 점수 리스트 생성
    const scores = Array.from({ length: scoreRanges.max - scoreRanges.min + 1 }, (_, idx) => scoreRanges.min + idx)

    return (
        <StyledSelcetScore>
            <div className="option-input-box">
                <input className="nbb" placeholder="왼쪽값 입력" defaultValue={minText} readOnly={true}/>
                <input className="nbb" placeholder="오른쪽값 입력" defaultValue={maxText} readOnly={true}/>
            </div>

            <ul className="line">
                {scores.map((n, idx) => (
                    <li key={idx} value={n} onClick={getScore}>
                        {n}
                    </li>
                ))}
                <span className="ball" 
                style={{width: (answerBox[pageId]?.[questionId].answer ? ((answerBox[pageId]?.[questionId].answer - min) / (max - min) * 100) : 0) + '%'}}></span>
            </ul>
        </StyledSelcetScore>
    )
}