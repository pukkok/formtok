import React, { useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import useAxios from "../Hooks/useAxios";
import { LoginForms, JoinForms } from "../Datas/loginForms";
import LoginPageWrapper from "./LoginStyles/StyledLoginPageWrapper";
import { LargeBox, SmallBox, SmallBoxWrapper } from "./LoginStyles/StyledLoginBoxes";
import { LoginForm } from "./LoginStyles/StyledLoginForm";

function LoginPage () {
    const navigate = useNavigate()
    const [loginInputs, setLoginInputs] = useState({userId: '', password: ''})
    const [joinInputs, setJoinInputs] = useState(
        {name: '', userId: '', email: '', phone: '', password: '', confirmPassword : ''}
    )
    const [capsLockActive, setCapsLockActive] = useState(false) // Caps Lock 상태
    const [isPasswordFocused, setIsPasswordFocused] = useState(false) // 포커스 상태
    const { login, join } = useAxios()
    const [activeForm, setActiveForm] = useState('')
    // 타이핑 입력
    const typingLogin = (e) => {
        const {name, value} = e.target
        setLoginInputs({...loginInputs, [name] : value})
    }
    const typingJoin = (e) => {
        const {name, value} = e.target
        setJoinInputs({...joinInputs, [name] : value})
    }
    //마우스 클릭
    const loginAction = async (e) => {
        e.preventDefault()
        const {userId, password} = loginInputs
        const result = await login(userId, password)
        if(result) navigate('/my-form')
    }
    const joinAction = async () => {
        const result = await join(joinInputs)
        console.log(result)
    }

    const checkCapsLock = (e) => {
        const isCapsLock = e.getModifierState("CapsLock")
        setCapsLockActive(isCapsLock)
    }

    // 비밀번호 필드 포커스
    const handleFocus = () => {
        setIsPasswordFocused(true)
    }

    // 비밀번호 필드 포커스 해제
    const handleBlur = () => {
        setIsPasswordFocused(false)
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
                console.log(name)
                return <input key={name} name={name} 
                onKeyUp={name === 'password' ? checkCapsLock : null}
                onFocus={name === 'password' ? handleFocus : null} // 포커스 이벤트
                onBlur={name === 'password' ? handleBlur : null} // 블러 이벤트
                type={type} placeholder={placeholder}
                autoComplete={'off'}
                onChange={typingLogin} value={loginInputs[name]}
                />
            })}
            {capsLockActive && <p>캡스락이 켜져있습니다.</p>}
            
            <div className="btns"> 
                <div>
                    <input type="button" defaultValue={'아이디 찾기'}/>
                    |
                    <input type="button" defaultValue={'비밀번호 찾기'}/>
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
                return <input key={name} name={name}
                onKeyUp={['password', 'confirmPassword'].includes(name) ? checkCapsLock : null}
                onFocus={['password', 'confirmPassword'].includes(name) ? handleFocus : null} // 포커스 이벤트
                onBlur={['password', 'confirmPassword'].includes(name) ? handleBlur : null} // 블러 이벤트
                placeholder={placeholder} type={type}
                autoComplete="off"
                onChange={typingJoin} value={joinInputs[name]}
                />
            })}
            {capsLockActive && <p>캡스락이 켜져있습니다.</p>}
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