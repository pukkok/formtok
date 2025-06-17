
import ani from '@/animations/JoinLargeBox.module.css'
import LargeBox from "./components/LargeBox"
import LargeBoxInput from "./components/LargeBoxInput"
import JoinPass from "./components/JoinPass"
import CapsLockMessage from "./components/CapsLockMessage"
import SubmitButton from "./components/SubmitButton"
import { useSignStore } from "@/stores/useSignStore"
import { toast } from "sonner"

export const JOIN_FORMS = [
  {name : 'userId', placeholder: '아이디', type: 'text', optionText: '중복확인', essentail : true},
	{name : 'name', placeholder: '이름', type: 'text', essentail : true},
	{name : 'phone', placeholder: '연락처 (숫자만 입력)', type: 'text', essentail : false},
	{name : 'email', placeholder: '이메일', type: 'email', optionText: '인증메일 발송', essentail : true},
	{name : 'otp', placeholder: '인증코드', type: 'text', optionText: '확인', essentail : true},
	{name : 'password', placeholder: '패스워드', type: 'password', essentail : true},
	{name : 'confirmPassword', placeholder: '패스워드 확인', type: 'password', essentail : true}
]

const JoinLargeBox = () => {
	const activeForm = useSignStore(s => s.activeForm)
	const changeActiveForm = useSignStore(s => s.changeActiveForm)

  const joinInputs = useSignStore(s => s.joinInputs)
  const joinTyping = useSignStore(s => s.joinTyping)

  const pass = useSignStore(s => s.pass)
	const hideOtp = useSignStore(s => s.hideOtp)

  const currentFocusedInputName = useSignStore(s => s.currentFocusedInputName)
  const setCurrentFocusedInputName = useSignStore(s => s.setCurrentFocusedInputName)

  const isCapsLockActive = useSignStore(s => s.isCapsLockActive)
  const setIsCapsLockAcive = useSignStore(s => s.setIsCapsLockAcive)

	const idDuplicateCheckAction = useSignStore(s => s.idDuplicateCheckAction)
	const sendOtpAction = useSignStore(s => s.sendOtpAction)
	const verifyOtpAction = useSignStore(s => s.verifyOtpAction)

	const joinAction = useSignStore(s => s.joinAction)

  const capsLockCheck = (e) => {
    const isCapsLock = e.getModifierState('CapsLock')
    setIsCapsLockAcive(isCapsLock)
  }

  const handleBlur = () => {
    setCurrentFocusedInputName('')
    setIsCapsLockAcive(false)
  }
	
	const handleSubmit = async () => {
		if(!pass.userId) return toast.error('아이디 중복 확인이 필요합니다.')
		if(!pass.email) return toast.error('이메일 인증이 필요합니다.')
		const result = await joinAction()
		if(result) changeActiveForm('login')
	}

  return (
    <LargeBox className={`
				left-[calc(100%-550px)] invisible
				${activeForm === 'join' ? ani['show-large-box'] : ani['hide-large-box']}
				`}>
				<h3 className="text-3xl pt-28 pb-18 text-point">회원가입</h3>
				<form className="text-light-w">
					{JOIN_FORMS.map(form => {
						const { name, optionText, type } = form
						return (
							<p 
								key={name}
								className={`
									${(hideOtp && name === 'otp') ? 'hidden' : ''}
									bg-charcoal p-2.5 mb-2 border-b border-b-[#CECECE] flex items-center`}
							>
								<LargeBoxInput
									className={'flex-1 w-full outline-0'}
									onKeyUp={capsLockCheck}
									onFocus={() => setCurrentFocusedInputName(name)}
									onBlur={handleBlur}

									onChange={joinTyping} value={joinInputs[name]}
									{...form}
								/>

								{	optionText &&
									<JoinPass 
										isComplete={pass[name]}
										onClick={
										name === 'userId' ? () => idDuplicateCheckAction() :
										name === 'email' ? () => sendOtpAction() :
										name === 'otp' ? () => verifyOtpAction() :
										null
										}
									>
									{optionText}
									</JoinPass> }

								<CapsLockMessage 
									active = {
										type === 'password' && // input의 type이 패스워드인가?
										currentFocusedInputName === name && // 지금 포커스된 input이 password 인가?
										isCapsLockActive // 캡스락이 켜져있는가?
									}
								/>
							</p>
						)
					})}
					<div className="mt-10 flex itmes-center text-light-w">
						<SubmitButton onClick={handleSubmit}>회원가입</SubmitButton>
					</div>

				</form>
			</LargeBox>
  )
}

export default JoinLargeBox