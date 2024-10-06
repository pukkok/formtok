import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import useAxios from "../Hooks/useAxios";
import { LoginForms, JoinForms } from "../Datas/loginForms";
import LoginPageWrapper from "./LoginStyles/StyledLoginPageWrapper";
import { LargeBox, SmallBox, SmallBoxWrapper } from "./LoginStyles/StyledLoginBoxes";
import { LoginForm } from "./LoginStyles/StyledLoginForm";
import dayjs from "dayjs";

function LoginPage () {
    const navigate = useNavigate()
    const [loginInputs, setLoginInputs] = useState({userId: '', password: ''})
    const [joinInputs, setJoinInputs] = useState(
        {name: '', userId: '', email: '', phone: '', password: '', confirmPassword : ''}
    )
    const [capsLockActive, setCapsLockActive] = useState(false) // Caps Lock 상태
    const [focusedInput, setFocusedInput] = useState('') // 포커스 상태
    const { login, join, idDupCheck, sendOtp, verifyOtp } = useAxios()
    const [otp, setOtp] = useState('')
    const [possibleId, setPossileId] = useState('')
    const [activeForm, setActiveForm] = useState('')
    // 타이핑 입력
    const typingLogin = (e) => {
        const {name, value} = e.target
        setLoginInputs({...loginInputs, [name] : value})
    }
    const typingJoin = (e) => {
        const {name, value} = e.target
        setJoinInputs({...joinInputs, [name] : value})

        if(name === 'userId') setPossileId('') // 다시 입력할경우 취소
    }
    //마우스 클릭
    const loginAction = async (e) => {
        e.preventDefault()
        const {userId, password} = loginInputs
        const result = await login(userId, password)
        if(result) navigate('/my-form')
    }
    const idDupCheckAction = async (id) => {
        const result = await idDupCheck(id)
        if(result) setPossileId(id)
    }

    const joinAction = async (e) => {
        e.preventDefault()
        const result = await join(joinInputs)
        alert(result)
    }

    const checkCapsLock = (e) => {
        const isCapsLock = e.getModifierState("CapsLock")
        setCapsLockActive(isCapsLock)
    }

    // 비밀번호 필드 포커스
    const handleFocus = (name) => {
        setFocusedInput(name)
    }

    // 비밀번호 필드 포커스 해제
    const handleBlur = () => {
        setFocusedInput('')
        setCapsLockActive(false) // 포커스 해제 시 메시지 숨기기
    }

    return (
    <LoginPageWrapper>
        <LargeBox className={classNames(
            {show : activeForm === 'login'},
            {hide : activeForm === 'join'}
        )}>
            <h2>로그인</h2>
            <LoginForm>
            {LoginForms.map(form => {
                const {name, placeholder, type} = form  
                return (
                    <p key={name}>
                    <input name={name} 
                    onKeyUp={name === 'password' ? checkCapsLock : null}
                    onFocus={() => handleFocus(name)} // 포커스 이벤트
                    onBlur={name === 'password' ? handleBlur : null} // 블러 이벤트
                    type={type} placeholder={placeholder}
                    autoComplete={'off'}
                    onChange={typingLogin} value={loginInputs[name]}
                    />
                    {name === 'password' && <span className={classNames('option', {on : capsLockActive && focusedInput === 'password'})}>캡스락이 켜져있습니다.</span>}
                    </p>
                )
            })}
            
            <div className="btns"> 
                <div>
                    <button type="button">아이디 찾기</button> |
                    <button type="button">비밀번호 찾기</button>
                </div>
                <button className="round-btn" type="submit" 
                onClick={loginAction}>로그인</button>
            </div>
            </LoginForm>
        </LargeBox>
        <LargeBox className={classNames('right',
            {show: activeForm === 'join'},
            {hide: activeForm ==='login'}
        )}>
            <h2>회원가입</h2>
            <LoginForm>
            {JoinForms.map(form => {
                const {name, placeholder, type} = form
                return (
                    <p key={name}>
                    <input name={name}
                    onKeyUp={['password', 'confirmPassword'].includes(name) ? checkCapsLock : null}
                    onFocus={() => handleFocus(name)} // 포커스 이벤트
                    onBlur={['password', 'confirmPassword'].includes(name) ? handleBlur : null} // 블러 이벤트
                    placeholder={placeholder} type={type}
                    autoComplete={"off"}
                    onChange={typingJoin} value={joinInputs[name]}
                    />
                    {name === 'email' && <>
                    <button 
                    type="button"
                    className="option on"
                    onClick={()=>sendOtp(joinInputs[name])}
                    >이메일 인증</button>
                    <input onChange={e => setOtp(e.target.value)} placeholder="인증번호" value={otp}/>
                    <button 
                    type="button"
                    onClick={()=>verifyOtp(joinInputs[name], otp)}
                    >인증 확인</button>
                    </>
                    }
                    {name === 'userId' && 
                    <button 
                    type="button"
                    className={classNames("option on", {possible : possibleId})}
                    onClick={() => idDupCheckAction(joinInputs[name])}
                    >중복 확인</button>}
                    {['password', 'confirmPassword'].includes(name) && <span className={classNames('option', {on : capsLockActive && focusedInput === name})}>캡스락이 켜져있습니다.</span>}
                    </p>
                )
            })}
            <div className="btns">
                <button type="submit" className="round-btn" 
                onClick={joinAction}>회원가입</button>
            </div>
            </LoginForm>
        </LargeBox>

        <SmallBoxWrapper>
            <SmallBox className={classNames(
                {show: activeForm==='join'},
                {hide: activeForm==='login'}
            )}>
            <p>이미 회원이신가요?</p>
            <button onClick={()=>setActiveForm('login')}>로그인</button>
            </SmallBox>
            <SmallBox className={classNames(
                {active: activeForm === 'login'},
                {hide: activeForm==='join'}
            )}>
            <p>아직 회원이 아니신가요?</p>
            <button onClick={()=>setActiveForm('join')}>회원가입</button>
            </SmallBox>
        </SmallBoxWrapper>
    </LoginPageWrapper>
    )
}

export default LoginPage