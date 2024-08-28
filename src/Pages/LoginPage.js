import axios from "axios";
import React, { useState } from "react";
import './LoginPage.css'
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

function LoginPage () {

    const [inputs, setInputs] = useState({userId: '', password: ''})

    const login = async (e) => {
        e.preventDefault()
        const {userId, password} = inputs
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

    const typing = (e) => {
        const {name, value} = e.target
        setInputs({...inputs, [name] : value})
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
                <span class="material-symbols-outlined">home</span>
                </button>
                <h2>로그인</h2>
                <input name="userId" placeholder="ID"
                type="text"
                onChange={typing} value={inputs.userId}/>
                <input 
                name="password" placeholder="PASSWORD" 
                type="password"
                onChange={typing} value={inputs.password}/>
                <div className="btns">
                    <button>비밀번호 찾기</button>
                    <button className="round-btn" onClick={login}>로그인</button>
                </div>
            </div>
            <div className={classNames("big-form right show",
                {active: activeForm === 'join'},
                {hide: activeForm ==='login'})}>
                <button className="back" onClick={()=>navigate('/')}>
                <span class="material-symbols-outlined">home</span>
                </button>
                <h2>회원가입</h2>
                <input name="userId" placeholder="ID"
                type="text"
                onChange={typing} value={inputs.userId}/>
                <input 
                name="email" placeholder="EMAIL" 
                type="text"
                onChange={typing} value={inputs.password}/>
                <input 
                name="phone" placeholder="PHONE" 
                type="text"
                onChange={typing} value={inputs.password}/>
                <input 
                name="password" placeholder="PASSWORD" 
                type="password"
                onChange={typing} value={inputs.password}/>
                <input 
                name="confirmPassword" placeholder="CONFIRM PASSWORD" 
                type="password"
                onChange={typing} value={inputs.password}/>

                <div className="btns">
                    <button className="round-btn" onClick={login}>로그인</button>
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