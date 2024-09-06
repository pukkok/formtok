import axios from "axios";
import React, { useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { LoginForms, JoinForms } from "../constants/loginForms";

function LoginPage () {

    const [loginInputs, setLoginInputs] = useState({userId: '', password: ''})
    const [joinInputs, setJoinInputs] = useState(
        {name: '', userId: '', email: '', phone: '', password: '', confirmPassword : ''}
    )
    
    const typingLogin = (e) => {
        const {name, value} = e.target
        setLoginInputs({...loginInputs, [name] : value})
    }

    const login = async (e, form) => {
        e.preventDefault()
        const {userId, password} = form
        const {data} = await axios.post(`/user/login`, {
            userId, password
        })
        if(data.code === 200){
            console.log('로그인 완료')
            console.log(data.data)
        }else{
            console.log(data.msg)
        }
    }

    const typingJoin = (e) => {
        const {name, value} = e.target
        setJoinInputs({...joinInputs, [name] : value})
    }

    const join = async (e) => {
        e.preventDefault()
        const {name, userId, email, phone, password, confirmPassword} = joinInputs
        const {data} = await axios.post(`/user/join`, {
            name, userId, email, phone, password, confirmPassword
        })
        if(data.code === 200){
            console.log(data.msg)
        }else{
            console.log(data)
        }
    }

    const [activeForm, setActiveForm] = useState('')
    const changeForm = (form) => {
        setActiveForm(form)
    }

    const navigate = useNavigate()

    return <section className="login-page">
        <div className="login-wrapper">
            <div className={classNames("big-form show", 
                {active: activeForm === 'login'},
                {hide : activeForm === 'join'})}>
                <button className="back" onClick={()=>navigate('/')}>
                <span className="material-symbols-outlined">home</span>
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
                    <button className="round-btn" onClick={e=>login(e, loginInputs)}>로그인</button>
                </div>
            </div>
            <div className={classNames("big-form right show",
                {active: activeForm === 'join'},
                {hide: activeForm ==='login'})}>
                <button className="back" onClick={()=>navigate('/')}>
                <span className="material-symbols-outlined">home</span>
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
                    <button className="round-btn" onClick={join}>회원가입</button>
                </div>
            </div>
            <div className="switch-small-box">
                <div className={classNames("small-form", 
                    {active: activeForm==='join'},
                    {hide: activeForm==='login'})}>
                    <p>이미 회원이신가요?</p>
                    <button onClick={()=>changeForm('login')}>로그인</button>
                </div>
                <div className={classNames("small-form",
                    {active: activeForm === 'login'},
                    {hide: activeForm==='join'})}>
                    <p>아직 회원이 아니신가요?</p>
                    <button onClick={()=>changeForm('join')}>회원가입</button>
                </div>
            </div>
        </div>
    </section>
}

export default LoginPage