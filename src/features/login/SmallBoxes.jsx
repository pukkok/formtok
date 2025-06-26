import ani from '@/animations/SmallBoxes.module.css'
import { useLoginUiStore } from '@/stores/useLoginUiStore'

export const SMALL_LOGIN_INFOS = [
	{
		formType: 'login',
		pText : '이미 회원이신가요?',
		buttonText : '로그인',
	},
	{
		formType: 'join',
		pText : '아직 회원이 아니신가요?',
		buttonText : '회원가입'
	}
]

const SmallBoxes = () => {
  const activeForm = useLoginUiStore(s => s.activeForm)
  const changeActiveForm = useLoginUiStore(s => s.changeActiveForm)

  return (
    <div className="absolute w-full h-[580px] top-1/2 left-0 -translate-y-1/2 
    dark:bg-dark-hover bg-bright-c shadow-[0_0px_20px_rgba(22,22,22,0.1)] flex items-center justify-center">
      {SMALL_LOGIN_INFOS.map(info => {
        const { formType, pText, buttonText } = info
        return (
          <div
            key={buttonText} 
            className={`
              ${activeForm !== formType ? ani['show-small-box'] : ani['hide-small-box']}
            dark:text-[#aaa] text-black
            flex flex-col justify-center items-center gap-5 p-[30px] w-[500px] h-full`}>
            <p>{pText}</p>
            <button 
              className="rounded-[50px] px-5 py-2.5 border-2 border-[#aaa] hover:border-point font-bold cursor-pointer"
              onClick={() => changeActiveForm(formType)}>{buttonText}</button>
          </div>
        )
      })}
    </div>
  )
}

export default SmallBoxes