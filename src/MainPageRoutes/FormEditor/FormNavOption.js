import React, { useEffect, useRef } from "react";
import ToggleButton from "../../Components/ToggleButton";
import dayjs from "dayjs";
import styled from "styled-components";
import DropDown from "../../Components/DropDown";
import { useRecoilState, useRecoilValue } from "recoil";
import { surveyListStyleAtom, surveyListStyleTextSelector, surveyOptionsAtom } from "../../Recoils/surveyAtoms";

const FormOptionWrapper = styled.div`
    width: 100%;
    height: calc(100% - 60px);
    padding: 10px 32px 10px 16px;
    overflow: scroll;
    
    h4{
        padding-top: 10px;
        margin-bottom: 18px;
        font-size: 15px;
        font-weight: 800;
        &:not(:nth-child(1)){
            padding-top: 28px;
            margin-top: 28px;
            border-top: 1px solid var(--pk-charcoal);
        }
    }

    p{
        display: flex;
        align-items: center;
        margin-top: 20px;
        margin-bottom: 12px;
        color: var(--pk-low-emphasis);
        & > button{
            margin-left: auto;
        }
    }

    & > .option-box{
        width: 100%;
        height: 40px;
        padding: 8px 10px;
        border-radius: 12px;
        background-color: var(--pk-question-form-bg);
        margin-bottom: 20px;

        input[type="datetime-local"]{
            width: 100%;
        }
        input[type="datetime-local"]::-webkit-calendar-picker-indicator { 
            filter: var(--pk-question-date-indicater-filter);
            cursor: pointer;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button { // number type 화살표 없애기
            -webkit-appearance: none;
            margin: 0;
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
`

function FormOption () {
    const today = dayjs().format('YYYY-MM-DDTHH:mm')

    const [surveyListStyle, setSurveyListStyle] = useRecoilState(surveyListStyleAtom)
    const [surveyOptions, setSurveyOptions] = useRecoilState(surveyOptionsAtom)
    const surveyListStyleText = useRecoilValue(surveyListStyleTextSelector)

    const changeOptions = (option) => {
        const {isUseStartPeriod, isUseEndPeriod, startDate, endDate} = surveyOptions
        if(option === 'isUseStartPeriod'){
            if(isUseStartPeriod){
                return setSurveyOptions(prev => prev = {...prev, isUseStartPeriod: false, startDate : '', isUseEndPeriod : false, endDate: ''})
            }
        }
        if(option === 'isUseEndPeriod'){
            if(!isUseEndPeriod){
                return setSurveyOptions(prev => prev = {...prev, isUseStartPeriod: true, startDate: '', isUseEndPeriod: true, endDate: ''})
            }
        }
        setSurveyOptions(prev => {
            return prev = {...prev, [option] : !prev[option]}
        })
    }

    useEffect(() => {
        // const {isUseStartPeriod, isUseEndPeriod, startDate, endDate} = surveyOptions
        // if(!isUseStartPeriod && startDate !== '' || isUseEndPeriod){
        //     setSurveyOptions(prev => prev = {...prev, startDate : '', isUseEndPeriod : false, endDate: ''})
        // }
        // if(!isUseEndPeriod && endDate !== '') setSurveyOptions(prev => prev = {...prev, endDate : ''})

    },[surveyOptions])
    
    const getOptionValue = (e) => {
        const {name, value} = e.target
        setSurveyOptions(prev => {
            return prev = {...prev, [name] : value}
        })
    }

    const dateCheck = () => {
        const {startDate, endDate} = surveyOptions
        if(startDate === '' || endDate === '') return
        if(endDate <= startDate){
            alert('종료일은 시작일보다 이후여야 합니다.')
            setSurveyOptions(prev => prev = {...prev, endDate : startDate})
            // return // 유효하지 않은 경우 변경하지 않음
        }
    }

    const listStyles = [
        {style: 'N', text : '1. 2. 3.'}, 
        {style: 'Q', text : 'Q. Q. Q.'}, 
        {style: 'QN', text: 'Q1. Q2. Q3.'}, 
        {style: null, text: '없음'}
    ]

    return (
    <FormOptionWrapper>
        <h4>문항 스타일</h4>
        <DropDown initialItem={surveyListStyleText}>
        {listStyles.map(item => {
            return <li key={item.text}><button onClick={() => setSurveyListStyle(item.style)}>{item.text}</button></li>
        })}
        </DropDown>

        <h4>설문 기간 설정</h4>
        <p>시작일 설정 <ToggleButton onClick={() => changeOptions('isUseStartPeriod')} isOn={surveyOptions.isUseStartPeriod}/></p>
        {surveyOptions.isUseStartPeriod &&
        <div className="option-box">
            <input 
                type="datetime-local" 
                name="startDate" 
                onBlur={dateCheck}
                onChange={e => getOptionValue(e)} 
                value={surveyOptions.startDate || ''} />
        </div>}
        <p>종료일 설정 <ToggleButton onClick={() => changeOptions('isUseEndPeriod')} isOn={surveyOptions.isUseEndPeriod}/></p>
        {surveyOptions.isUseEndPeriod &&
        <div className="option-box">
            <input 
                type="datetime-local" 
                name="endDate"
                onBlur={dateCheck}
                onChange={e => getOptionValue(e)} 
                value={surveyOptions.endDate || ''}/>
        </div>}

        <h4>설문 참여 설정</h4>
        <p>로그인 필수 <ToggleButton onClick={() => changeOptions('isNeedLogin')} isOn={surveyOptions.isNeedLogin}/></p>
        <p>최대 참여 수 설정 <ToggleButton onClick={() => changeOptions('isUseMaximum')} isOn={surveyOptions.isUseMaximum}/></p>
        {surveyOptions.isUseMaximum && 
        <div className="option-box">
            <input 
            type="number" 
            name="maximumCount"
            onChange={e => getOptionValue(e)} 
            value={surveyOptions.maximumCount || undefined} 
            placeholder="0"/>
        </div>}
        <p>설문 대상 설정 <ToggleButton /></p>

        <h4>참여자 권한 설정</h4>
        <p>답변 확인 허용 <ToggleButton onClick={() => changeOptions('isAllowConfirmation')} isOn={surveyOptions.isAllowConfirmation}/></p>
        <p>답변 수정 허용 <ToggleButton onClick={() => changeOptions('isAllowModify')} isOn={surveyOptions.isAllowModify}/></p>
        <p>설문 결과 공개 <ToggleButton onClick={() => changeOptions('isRevealTheResult')} isOn={surveyOptions.isRevealTheResult}/></p>

    </FormOptionWrapper>)
}
export default FormOption