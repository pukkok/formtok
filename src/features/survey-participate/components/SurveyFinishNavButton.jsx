import { useRouter } from "next/navigation"
import { GoArrowRight } from "react-icons/go"

const SurveyFinishNavButton = ({path='/participate', msg='다른설문 참여'}) => {
  const router = useRouter()

  return (
    <button 
      className="mt-4 px-4 py-2 text-sm flex items-center gap-2 bg-point text-white rounded hover:opacity-90"
      onClick={() => router.push(path)}
    >{msg}<GoArrowRight /></button>
  )
}

export default SurveyFinishNavButton