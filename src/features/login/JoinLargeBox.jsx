
import ani from '@/animations/JoinLargeBox.module.css'
import LargeBox from "./components/LargeBox"
import LargeBoxInput from "./components/LargeBoxInput"
import JoinPass from "./components/JoinPass"
import CapsLockMessage from "./components/CapsLockMessage"
import SubmitButton from "./components/SubmitButton"
import { toast } from "sonner"
import { useLoginUiStore } from '@/stores/useLoginUiStore'
import { useJoinFormStore } from '@/stores/useJoinFormStore'
import { formatPhone } from '@/utils/formatPhone'

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
	const activeForm = useLoginUiStore(s => s.activeForm)
	const changeActiveForm = useLoginUiStore(s => s.changeActiveForm)
  const currentFocusedInputName = useLoginUiStore(s => s.currentFocusedInputName)
  const setCurrentFocusedInputName = useLoginUiStore(s => s.setCurrentFocusedInputName)
  const isCapsLockActive = useLoginUiStore(s => s.isCapsLockActive)
  const setIsCapsLockActive = useLoginUiStore(s => s.setIsCapsLockActive)

  const joinInputs = useJoinFormStore(s => s.joinInputs)
	const setJoinInputs = useJoinFormStore(s => s.setJoinInputs)
  const pass = useJoinFormStore(s => s.pass)
	const setPass = useJoinFormStore(s => s.setPass)
	const hideOtp = useJoinFormStore(s => s.hideOtp)
	const idDuplicateCheckAction = useJoinFormStore(s => s.idDuplicateCheckAction)
	const sendOtpAction = useJoinFormStore(s => s.sendOtpAction)
	const verifyOtpAction = useJoinFormStore(s => s.verifyOtpAction)

	const joinAction = useJoinFormStore(s => s.joinAction)

	const handleChange = (e) => {
		const { name, value } = e.target
		const newValue = name === 'phone' ? formatPhone(value) : value

		setJoinInputs({ ...joinInputs, [name]: newValue })

		if (name === 'userId') setPass({ ...pass, userId: false })
		if (name === 'email') setPass({ ...pass, email: false })
	}

  const capsLockCheck = (e) => {
    const isCapsLock = e.getModifierState('CapsLock')
    setIsCapsLockActive(isCapsLock)
  }

  const handleBlur = () => {
    setCurrentFocusedInputName('')
    setIsCapsLockActive(false)
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
				<form className="dark:text-light-w">
					{JOIN_FORMS.map(form => {
						const { name, optionText, type } = form
						return (
							<p 
								key={name}
								className={`
									${(hideOtp && name === 'otp') ? 'hidden' : ''}
									dark:bg-dark-elevated bg-bright-b
									p-2.5 mb-2 border-b dark:border-b-[#CECECE] border-b-gray-500 flex items-center`}
							>
								<LargeBoxInput
									className={'flex-1 w-full outline-0'}
									onKeyUp={capsLockCheck}
									onFocus={() => setCurrentFocusedInputName(name)}
									onBlur={handleBlur}

									onChange={handleChange} value={joinInputs[name]}
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