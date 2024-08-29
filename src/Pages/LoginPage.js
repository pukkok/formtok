import axios from "axios";
import React, { useState } from "react";
import './LoginPage.css'
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

function LoginPage () {

    const [loginInputs, setLoginInputs] = useState({userId: '', password: ''})
    const [joinInputs, setJoinInputs] = useState(
        {name: '', userId: '', email: '', phone: '', password: '', confirmPassword : ''}
    )

    const typingLogin = (e) => {
        const {name, value} = e.target
        setLoginInputs({...loginInputs, [name] : value})
    }

    const login = async (e) => {
        e.preventDefault()
        const {userId, password} = loginInputs
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
                <input name="userId" placeholder="ID"
                type="text"
                onChange={typingLogin} value={loginInputs.userId}/>
                <input 
                name="password" placeholder="PASSWORD" 
                type="password"
                onChange={typingLogin} value={loginInputs.password}/>
                <div className="btns">
                    <div>
                    <button>아이디 찾기</button>
                    <span> | </span>
                    <button>비밀번호 찾기</button>
                    </div>
                    <button className="round-btn" onClick={login}>로그인</button>
                </div>
            </div>
            <div className={classNames("big-form right show",
                {active: activeForm === 'join'},
                {hide: activeForm ==='login'})}>
                <button className="back" onClick={()=>navigate('/')}>
                <span className="material-symbols-outlined">home</span>
                </button>
                <h2>회원가입</h2>
                <input name="name" placeholder="NAME"
                type="text"
                onChange={typingJoin} value={joinInputs.name}/>
                <input name="userId" placeholder="ID"
                type="text"
                onChange={typingJoin} value={joinInputs.userId}/>
                <input 
                name="email" placeholder="EMAIL" 
                type="text"
                onChange={typingJoin} value={joinInputs.email}/>
                <input 
                name="phone" placeholder="PHONE" 
                type="text"
                onChange={typingJoin} value={joinInputs.phone}/>
                <input 
                name="password" placeholder="PASSWORD" 
                type="password"
                onChange={typingJoin} value={joinInputs.password}/>
                <input 
                name="confirmPassword" placeholder="CONFIRM PASSWORD" 
                type="password"
                onChange={typingJoin} value={joinInputs.confirmPassword}/>

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