
import ani from '@/animations/LoginLargeBox.module.css'
import LargeBox from "./components/LargeBox"
import LargeBoxInput from "./components/LargeBoxInput"
import CapsLockMessage from "./components/CapsLockMessage"
import SubmitButton from "./components/SubmitButton"
import { useRouter } from "next/navigation"
import { useLoginFormStore } from '@/stores/useLoginFormStore'
import { useLoginUiStore } from '@/stores/useLoginUiStore'

const LOGIN_FORMS = [
  {name : 'userId', placeholder: '아이디', type: 'text'},
	{name : 'password', placeholder: '패스워드', type: 'password'}
]

const LoginLargeBox = () => {
	const router = useRouter()

	const activeForm = useLoginUiStore(s => s.activeForm)
  const currentFocusedInputName = useLoginUiStore(s => s.currentFocusedInputName)
  const setCurrentFocusedInputName = useLoginUiStore(s => s.setCurrentFocusedInputName)
  const isCapsLockActive = useLoginUiStore(s => s.isCapsLockActive)
  const setIsCapsLockActive = useLoginUiStore(s => s.setIsCapsLockActive)

  const loginInputs = useLoginFormStore(s => s.loginInputs)
  const setLoginInputs = useLoginFormStore(s => s.setLoginInputs)
	const loginAction = useLoginFormStore(s => s.loginAction)

	const handleChange = (e) => {
		const { name, value } = e.target
		setLoginInputs({ ...loginInputs, [name]: value })
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
		const result = await loginAction()
		if (result) router.back()
	}

  return (
    <LargeBox className={`${activeForm === 'login' ? ani['show-large-box'] : ani['hide-large-box']}`}>
			<h3 className="text-3xl pt-28 pb-18 text-point">로그인</h3>

			<form className="text-light-w">
				{LOGIN_FORMS.map(form => {
					const {name, type} = form
					return (
						<p 
							key={name}
							className="bg-charcoal p-2.5 mb-2 border-b border-b-[#CECECE] flex items-center"
						>
							<LargeBoxInput 
								className={'flex-1 w-full outline-0'}
								onKeyUp={capsLockCheck}
								onFocus={() => setCurrentFocusedInputName(name)} // 포커스 이벤트
								onBlur={handleBlur}
								onChange={handleChange}
								value={loginInputs[name]}
								{...form}
							/>
							<CapsLockMessage active={
								type === 'password' &&
								currentFocusedInputName === 'password' &&
								isCapsLockActive}
							/>
						</p>
					)
				})}

				<div className="mt-10 flex itmes-center text-light-w">
					<div className="flex items-center">
						<button type="button" className="pr-2 mr-2 border-r border-gray-400 cursor-pointer">아이디 찾기</button>
						<button type="button" className="cursor-pointer">비밀번호 찾기</button>
					</div>
					<SubmitButton onClick={handleSubmit}>로그인</SubmitButton>
				</div>
			</form>

			<style jsx>{`
				
			`}</style>

			</LargeBox>
  )
}

export default LoginLargeBox