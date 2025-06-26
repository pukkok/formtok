import { useFormEditStore } from "@/stores/useFormEditStore"
import { useFormEditUiStore } from "@/stores/useFormEditUiStore"
import { useEffect } from "react"

const AddPageQuestion = () => {
  const activeCard = useFormEditUiStore(s => s.activeCard)
  const setActiveCard = useFormEditUiStore(s => s.setActiveCard)
  const addQuestion = useFormEditStore(s => s.addQuestion)
  const addPage = useFormEditStore(s => s.addPage)

  const addPageAction = async () => {
    const pi = activeCard.split('-')[1]
    addPage(pi)
    setActiveCard(`P-${Number(pi)+1}`)
  }

  const addQuestionAction = () => {
    const [_, pi, qi] = activeCard.split('-')
    // TODO: 페이지를 선택하고 있는 경우엔 -1로 최 상단에 질문을 생성한다.
    let validQi = -1 
    if(qi) validQi = qi
    addQuestion(pi, validQi)
    setActiveCard(`Q-${Number(pi)}-${Number(validQi)+1}`)
  }

  useEffect(() => { 
    // INFO: 단축키 기능을 사용한다. 
    const keyState = { Control: false }

    const handleKeyDown = (e) => {
      if (e.key === "Control") keyState.Control = true

      // TODO: 질문 생성
      if (keyState.Control && e.key === ",") {
        e.preventDefault()
        addQuestionAction() 
      }
      
      // TODO: 페이지 생성
      if (keyState.Control && e.key === ".") {
        e.preventDefault()
        addPageAction()
      }
    }

    const handleKeyUp = (e) => {
      if (e.key === "Control") keyState.Control = false
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [activeCard])

  return (
    <footer className="flex border-t h-[50px] border-t-gray-300">
      <button 
        className="w-1/2 h-full py-2 hover:cursor-pointer 
        hover:bg-gray-300 border-r border-r-gray-300
        disabled:text-gray-300 disabled:bg-none"
        title="ctrl + ,"
        onClick={addQuestionAction} disabled={activeCard === '' || activeCard === 'end'}>
          문항 추가
      </button>
      <button 
        className="w-1/2 h-full py-2 
        hover:cursor-pointer hover:bg-gray-300 
        disabled:text-gray-300 disabled:bg-none"
        title="ctrl + ."
        onClick={addPageAction} disabled={activeCard === '' || activeCard === 'end'}>
          페이지 추가
      </button>
    </footer>
  )
}

export default AddPageQuestion