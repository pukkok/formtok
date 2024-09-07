import React, { useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { LoginForms, JoinForms } from "../constants/loginForms";
import useAxios from "../hooks/useAxtios";
import { Icon } from "../components/Icons";

function LoginPage ({selectedForm = ''}) {
    const navigate = useNavigate()
    const [loginInputs, setLoginInputs] = useState({userId: '', password: ''})
    const [joinInputs, setJoinInputs] = useState(
        {name: '', userId: '', email: '', phone: '', password: '', confirmPassword : ''}
    )

    const { login, join } = useAxios()
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
    const loginAction = async () => {
        const result = await login(loginInputs)
        console.log(result)
    }
    const joinAction = async () => {
        const result = await join(joinInputs)
        console.log(result)
    }
    //엔터 클릭
    const loginEnterClick = (e) => {
        if(e.key === 'Enter') loginAction(loginInputs)
    }
    const joinEnterClick = (e) => {
        if(e.key === 'Enter') joinAction(joinInputs)
    }

    const [activeForm, setActiveForm] = useState(selectedForm)
    
    return <section className="login-page">
        <div className="login-wrapper">
            <div className={classNames("big-form show", 
                {active: activeForm === 'login'},
                {hide : activeForm === 'join'})}
                onKeyDown={loginEnterClick}
                >
                <button className="home" onClick={()=>navigate('/')}>
                <Icon code={'home'}/>
                </button>
                <h2>로그인</h2>
                {LoginForms.map(form => {
                    const {name, placeholder, type} = form
                    return <input key={name} name={name}  
                    type={type} placeholder={placeholder}
                    onChange={typingLogin} value={loginInputs[name]}
                    />
                })}
                <div className="btns">
                    <div>
                    <button>아이디 찾기</button>
                    <span> | </span>
                    <button>비밀번호 찾기</button>
                    </div>
                    <button className="round-btn" onClick={loginAction}>로그인</button>
                </div>
            </div>
            <div className={classNames("big-form right show",
                {active: activeForm === 'join'},
                {hide: activeForm ==='login'})}
                onKeyDown={joinEnterClick}
                >
                <button className="home" onClick={()=>navigate('/')}>
                <Icon code={'home'}/>
                </button>
                <h2>회원가입</h2>
                {JoinForms.map(form => {
                    const {name, placeholder, type} = form
                    return <input key={name} name={name}
                    placeholder={placeholder} type={type}
                    onChange={typingJoin} value={joinInputs[name]}
                    />
                })}
                <div className="btns">
                    <button className="round-btn" onClick={joinAction}>회원가입</button>
                </div>
            </div>
            <div className="switch-small-box">
                <div className={classNames("small-form", 
                    {active: activeForm==='join'},
                    {hide: activeForm==='login'})}>
                    <p>이미 회원이신가요?</p>
                    <button onClick={()=>setActiveForm('login')}>로그인</button>
                </div>
                <div className={classNames("small-form",
                    {active: activeForm === 'login'},
                    {hide: activeForm==='join'})}>
                    <p>아직 회원이 아니신가요?</p>
                    <button onClick={()=>setActiveForm('join')}>회원가입</button>
                </div>
            </div>
        </div>
    </section>
}

export default LoginPage