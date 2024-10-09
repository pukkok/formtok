import React from "react";
import ToggleButton from "../../Components/ToggleButton";
import styled from "styled-components";
import DropDown from "../../Components/DropDown";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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
        position: relative;
        margin-top: 20px;
        margin-bottom: 12px;
        color: var(--pk-low-emphasis);
        & > button{
            margin-left: auto;
        }

        .option{
            cursor: help;
            &:hover ~ .script{
                display: block;
                margin-top: 10px;
                padding: 10px;
                border-radius: 8px;
                top: 100%;
                font-size: 14px;
                line-height: 1.7;
                color: inherit;
                background-color: var(--pk-option-nav-bg);
                color: #ededed;
                z-index: 100;
                &.up{
                    margin-top: 0;
                    margin-bottom: 10px;
                    top: -220%;
                    &::after{
                        top: 100%;
                        border-right: 6px solid transparent;
                        border-left: 6px solid transparent;
                        border-top: 6px solid var(--pk-option-nav-bg);
                        border-bottom: 6px solid transparent;
                    }
                }
                &::after{
                    content: '';
                    position: absolute;
                    bottom: 100%;
                    left: 20px;
                    border-right: 6px solid transparent;
                    border-left: 6px solid transparent;
                    border-bottom: 6px solid var(--pk-option-nav-bg);
                    border-top: 6px solid transparent;
                }
            }
        }

        .script{
            position: absolute;
            display: none;
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

    const setSurveyListStyle = useSetRecoilState(surveyListStyleAtom)
    const [surveyOptions, setSurveyOptions] = useRecoilState(surveyOptionsAtom)
    const surveyListStyleText = useRecoilValue(surveyListStyleTextSelector)

    const changeOptions = (option) => {
        const {isUseStartPeriod, isUseEndPeriod} = surveyOptions
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

    const maximumCountCheck = () => {
        const {maximumCount} = surveyOptions
        if(maximumCount >= 10000){
            // alert('최대 인원은 10,000명 까지 입니다.')
            setSurveyOptions(prev => prev = {...prev, maximumCount : 10000})
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

        <h4>설문지 관리</h4>
        <p>
            <span className="option">게시</span> 
            <ToggleButton onClick={() => changeOptions('isOpen')} isOn={surveyOptions.isOpen}/>
            <span className="script">
                응답 수집을 시작합니다.
            </span>
        </p>
        <p>
            <span className="option">종료</span> 
            <ToggleButton onClick={() => changeOptions('isEnd')} isOn={surveyOptions.isEnd}/>
            <span className="script">
                응답 수집을 강제로 종료합니다.
            </span>
        </p>


        <h4>설문 기간 설정</h4>
        <p> 
            <span className="option">시작일 설정</span> 
            <ToggleButton onClick={() => changeOptions('isUseStartPeriod')} isOn={surveyOptions.isUseStartPeriod}/>
            <span className="script">
                설문조사의 시작일을 입력하지 않은 경우 <br/>
                설문조사의 기간은 게시 시점부터 시작됩니다.
            </span>
        </p>
        {surveyOptions.isUseStartPeriod &&
        <div className="option-box">
            <input 
                type="datetime-local" 
                name="startDate" 
                onBlur={dateCheck}
                onChange={e => getOptionValue(e)} 
                value={surveyOptions.startDate || ''} />
        </div>}
        <p> 
            <span className="option">종료일 설정</span> 
            <ToggleButton onClick={() => changeOptions('isUseEndPeriod')} isOn={surveyOptions.isUseEndPeriod}/>
            <span className="script">
                종료일을 설정할 경우, 시간이 만료됨과 동시에 <br/>
                설문조사가 종료됩니다.    
            </span>    
        </p>

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
        <p>
            <span className="option">전체 공개 설정</span>
            <ToggleButton onClick={() => changeOptions('isPublic')} isOn={surveyOptions.isPublic}/>
            <span className="script">설문지가 참여하기에 공개 됩니다. <br/>
                설문지 전체 공개에 동의하시는 경우 버튼을 켜주세요.
            </span>
        </p>
        <p>
            <span className="option">로그인 필수</span>
            <ToggleButton onClick={() => changeOptions('isNeedLogin')} isOn={surveyOptions.isNeedLogin}/>
            <span className="script">
                로그인 한 유저만 참여 가능합니다.
            </span>
        </p>
        <p>
            <span className="option">최대 참여 수 설정</span> 
            <ToggleButton onClick={() => changeOptions('isUseMaximum')} isOn={surveyOptions.isUseMaximum}/>
            <span className="script">최대인원을 설정합니다. <br/>
                최대 인원은 10,000명 까지입니다.
            </span>
        </p>
        {surveyOptions.isUseMaximum && 
        <div className="option-box">
            <input 
            type="number" 
            name="maximumCount"
            onChange={e => getOptionValue(e)}
            onBlur={maximumCountCheck}
            value={surveyOptions.maximumCount || ''} 
            placeholder="0"/>
        </div>}
        <p>
            <span className="option">설문 대상 설정</span> 
            <ToggleButton />
            <span className="script">업데이트 예정</span>
        </p>

        <h4>참여자 권한 설정</h4>
        <p>
            <span className="option">답변 확인 허용</span> 
            <ToggleButton onClick={() => changeOptions('isAllowConfirmation')} isOn={surveyOptions.isAllowConfirmation}/>
            <span className="script up">
                설문 참여 후, 본인이 작성한 답변을 확인할 수 있습니다.
            </span>
            </p>
        <p>
            <span className="option">답변 수정 허용</span> 
            <ToggleButton onClick={() => changeOptions('isAllowModify')} isOn={surveyOptions.isAllowModify}/>
            <span className="script up">
                설문 제출 후, 본인이 작성한 답변을 수정할 수 있습니다.
            </span>
            </p>
        <p>
            <span className="option">설문 결과 공개</span> 
            <ToggleButton onClick={() => changeOptions('isRevealTheResult')} isOn={surveyOptions.isRevealTheResult}/>
            <span className="script up">
                참여자에게 설문 결과를 공개합니다.
            </span>
        </p>

    </FormOptionWrapper>)
}
export default FormOption