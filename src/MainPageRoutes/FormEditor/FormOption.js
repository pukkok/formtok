import React, { useRef, useState } from "react";
import FormOptionWrapper from "./_StyledFormOption";
import ToggleButton from "../../Components/ToggleButton";
import dayjs from "dayjs";

function FormOption () {
    const today = dayjs().format('YYYY-MM-DD')
    const periodRef = useRef({start:null, end: null})

    return (
    <FormOptionWrapper>
        <h4>설문 기간 설정</h4>
        <div className="period-box">
            <div>
                <p>시작일</p>
                <input type="date" ref={el => periodRef.current.start = el} defaultValue={today}/>
            </div>
            <div>
                <p>종료일</p>
                <input type="date" ref={el => periodRef.current.end = el}/>
            </div>

        </div>
        
        <h4>설문 참여 설정</h4>
        <p>최대 참여자수 설정 <ToggleButton/></p>
        <p>설문 대상 설정</p>

        <h4>참여자 권한 설정</h4>
        <p>답변 확인 허용</p>
        <p>답변 수정 허용</p>
        <p>설문 결과 공개</p>
    </FormOptionWrapper>)
}
export default FormOption