import axios from "axios";
import React, { useState } from "react";
import './LoginPage.css'

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

    return <section className="login-page">
        <div className="login-wrapper">
            <div className="login-form show">
                <h2>로그인</h2>

                <input name="userId" placeholder="ID" onChange={typing} value={inputs.userId}/>
                <input name="password" placeholder="PASSWORD" onChange={typing} value={inputs.password}/>

                <div className="btns">
                    <button>비밀번호 찾기</button>
                    <button onClick={login}>로그인</button>
                </div>
            </div>
            <div className="join-form">
                <p>아직 회원이 아니신가요?</p>
                <button>회원가입</button>
            </div>
        </div>
    </section>
}

export default LoginPage