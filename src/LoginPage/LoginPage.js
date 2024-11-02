import React, { useState } from "react";
import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";
import useAxios from "../C-Hooks/useAxios";

import { initialLoginInput, initialJoinInput, LoginForms, JoinForms, smallLoginInfos } from "../A-Datas/loginForms";

import LoginPageWrapper from "./Sections/StyledLoginPageWrapper";
import { LargeBox } from "./Sections/StyledLargeBox";
import { StyledSmallBox, StyledSmallBoxWrapper } from "./Sections/StyledSmallBox";
import { LoginForm } from "./Sections/StyledLoginForm";

function LoginPage() {
	const navigate = useNavigate()
	const location = useLocation()

	const [loginInputs, setLoginInputs] = useState(initialLoginInput)
	const [joinInputs, setJoinInputs] = useState(initialJoinInput)
	const [capsLockActive, setCapsLockActive] = useState(false) // Caps Lock 상태
	const [focusedInput, setFocusedInput] = useState('') // 포커스 상태
	const { login, join, idDupCheck, sendOtp, verifyOtp } = useAxios()
	const [pass, setPass] = useState({ userId: false, email: false })
	const [hideOtp, setHideOtp] = useState(true)
	const [activeForm, setActiveForm] = useState('')

	const changeForm = (form) => { // 폼 변형시 입력데이터 초기화
		setActiveForm(form)
		if (form === 'login') {
			setJoinInputs(initialJoinInput)
			setPass({ userId: false, email: false })
			setHideOtp(true)
		}
		if (form === 'join') setLoginInputs(initialLoginInput)
	}

	// 타이핑
	const typingLogin = (e) => {
		const { name, value } = e.target
		setLoginInputs({ ...loginInputs, [name]: value })
	}
	const typingJoin = (e) => {
		const { name, value } = e.target
		if (name === 'phone') { // 숫자만 입력 가능하게
			if (value.length > 11) return // 11자까지 입력
			let isText = /[^\d]/g.test(value)
			if (isText) {
				const onlyNums = value.replace(/[^\d]/g, '')
				setJoinInputs({ ...joinInputs, [name]: onlyNums })
				return alert('숫자만 입력 가능합니다.')
			}
		}
		setJoinInputs({ ...joinInputs, [name]: value })

		if (name === 'userId') setPass({ ...pass, userId: false })
		if (name === 'email') setPass({ ...pass, email: false })
	}

	const loginAction = async (e) => { // 로그인
		e.preventDefault()
		const { userId, password } = loginInputs
		const result = await login(userId, password)
		if (result) {
			location.state?.from ? navigate(location.state?.from) : navigate('/')
		}
	}

	const idDupCheckAction = async (id) => { // 아이디 중복체크
		const result = await idDupCheck(id)
		if (result) setPass(pass => pass = { ...pass, userId: true })
	}

	const joinAction = async (e) => { // 회원가입
		e.preventDefault()
		if (!pass.userId) return alert('아이디 중복 확인을 해주세요')
		if (!pass.email) return alert('이메일 인증이 필요합니다.')

		const result = await join(joinInputs)
		if (result) changeForm('login')
	}

	const sendOtpAction = async (email) => { // 메일 전송
		const result = await sendOtp(email)
		if (result) setHideOtp(false)
	}

	const verifyOtpAction = async (email, otp) => { // 이메일 인증
		const result = await verifyOtp(email.trim(), otp.trim())
		if (result) {
			setPass(pass => pass = { ...pass, email: true })
			setJoinInputs(prev => prev = { ...prev, otp: '' })
			setHideOtp(true)
		}
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
				{ show: activeForm === 'login' },
				{ hide: activeForm === 'join' }
			)}>
				<h3>로그인</h3>
				<LoginForm>
					{LoginForms.map(form => {
						const { name, placeholder, type } = form
						return (
							<p key={name}>
								<input name={name} autoFocus={name === 'userId'}
									onKeyUp={name === 'password' ? checkCapsLock : null}
									onFocus={() => handleFocus(name)} // 포커스 이벤트
									onBlur={name === 'password' ? handleBlur : null} // 블러 이벤트
									type={type} placeholder={placeholder}
									autoComplete={'off'}
									onChange={typingLogin} value={loginInputs[name]}
								/>
								{name === 'password' && <span className={classNames('option', { on: capsLockActive && focusedInput === 'password' })}>캡스락이 켜져있습니다.</span>}
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
				{ show: activeForm === 'join' },
				{ hide: activeForm === 'login' }
			)}>
				<h3>회원가입</h3>
				<LoginForm>
					{JoinForms.map(form => {
						const { name, placeholder, optionText, type } = form
						return (
							<p key={name} className={classNames({ hide: name === 'otp' && hideOtp })}>
								<input
									name={name}
									autoFocus={name === 'userId'}
									placeholder={placeholder} type={type}
									autoComplete={"off"}
									onChange={typingJoin} value={joinInputs[name]}
									
									onFocus={() => handleFocus(name)} // 포커스 이벤트
									// 패스워드 일때 capsLock 체크용도
									onKeyUp={['password', 'confirmPassword'].includes(name) ? checkCapsLock : null}
									onBlur={['password', 'confirmPassword'].includes(name) ? handleBlur : null} // 블러 이벤트
								/>
								{pass[name] ?
									<span className={classNames({ pass: pass[name] })}></span> :
									optionText &&
									<button type="button"
										className={"option on"}
										onClick={
											name === 'userId' ? () => idDupCheckAction(joinInputs['userId']) :
											name === 'email' ? () => sendOtpAction(joinInputs['email']) :
											name === 'otp' ? () => verifyOtpAction(joinInputs['email'], joinInputs['otp']) :
											null
										}
									>{optionText}</button>
								}
								{['password', 'confirmPassword'].includes(name) && <span className={classNames('option', { on: capsLockActive && focusedInput === name })}>캡스락이 켜져있습니다.</span>}
							</p>
						)
					})}
					<div className="btns">
						<button type="submit" className="round-btn"
							onClick={joinAction}>회원가입</button>
					</div>
				</LoginForm>
			</LargeBox>

			<StyledSmallBoxWrapper>
				{smallLoginInfos.map(info => {
					const { formType, pText, buttonText } = info
					return <StyledSmallBox
						key={buttonText}
						className={classNames(
							// 작은 박스는 현재 액티브된 타입과 반대 타입
							{ show: activeForm !== formType },
							{ hide: activeForm === formType }
						)}
					>
						<p>{pText}</p>
						<button onClick={() => changeForm(formType)}>{buttonText}</button>
					</StyledSmallBox>
				})}
			</StyledSmallBoxWrapper>
		</LoginPageWrapper>
	)
}

export default LoginPage