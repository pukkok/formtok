import React, { useRef, useState } from "react";
import ToggleButton from "../../Components/ToggleButton";
import dayjs from "dayjs";
import styled from "styled-components";
import DropDown from "../../Components/DropDown";
import { useRecoilState, useSetRecoilState } from "recoil";
import { surveyListStyleAtom } from "../../Recoils/surveyAtoms";

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
    const periodRef = useRef({start:null, end: null})

    const [surveyListStyle, setSurveyListStyle] = useRecoilState(surveyListStyleAtom)
    
    const listStyles = [
        {style: 'N', text : '1. 2. 3.'}, 
        {style: 'Q', text : 'Q. Q. Q.'}, 
        {style: 'QN', text: 'Q1. Q2. Q3.'}, 
        {style: null, text: '없음'}
    ]

    return (
    <FormOptionWrapper>
        <h4>문항 스타일</h4>
        <DropDown initialItem={surveyListStyle.text}>
        {listStyles.map(item => {
            return <li key={item.text}><button onClick={() => setSurveyListStyle(item)}>{item.text}</button></li>
        })}
        </DropDown>

        <h4>설문 기간 설정</h4>
        <p>시작일 설정 <ToggleButton/></p>
        <div className="option-box">
            <input type="datetime-local" ref={el => periodRef.current.start = el} defaultValue={today}/>
        </div>
        <p>종료일 설정 <ToggleButton/></p>
        <div className="option-box">
            <input type="datetime-local" ref={el => periodRef.current.end = el}/>
        </div>

        <h4>설문 참여 설정</h4>
        <p>로그인 필수 <ToggleButton/></p>
        <p>최대 참여 수 설정 <ToggleButton/></p>
        <div className="option-box">
            <input type="number" placeholder="0"/>
        </div>
        <p>설문 대상 설정 <ToggleButton/></p>

        <h4>참여자 권한 설정</h4>
        <p>답변 확인 허용 <ToggleButton/></p>
        <p>답변 수정 허용 <ToggleButton/></p>
        <p>설문 결과 공개 <ToggleButton/></p>

    </FormOptionWrapper>)
}
export default FormOption