import { useFormEditStore } from "@/stores/useFormEditStore"
import { useFormEditUiStore } from "@/stores/useFormEditUiStore"
import { useEffect } from "react"

const AddPageQuestion = () => {
  const activeCard = useFormEditUiStore(s => s.activeCard)
  const setActiveCard = useFormEditUiStore(s => s.setActiveCard)
  const addQuestion = useFormEditStore(s => s.addQuestion)
  const addPage = useFormEditStore(s => s.addPage)

  const addPageAction = () => {
    const [_, pi] = activeCard.split('-')
    const numberPi = Number(pi)
    addPage(numberPi)
    setActiveCard(`P-${numberPi+1}`)
  }

  const addQuestionAction = () => {
    const [_, pi, qi] = activeCard.split('-')
    const numberPi = Number(pi)
    const numberQi = qi ? Number(qi) : -1

    addQuestion(numberPi, numberQi)
    setActiveCard(`Q-${numberPi}-${numberQi + 1}`)
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
    <footer className="flex border-t h-[50px] dark:border-t-dark-line-light border-t-gray-300">
      <button 
        className="w-1/2 h-full py-2 hover:cursor-pointer 
        dark:hover:bg-dark-hover hover:bg-gray-300 border-r dark:border-r-dark-line-light border-r-gray-300
        disabled:text-gray-300 disabled:bg-none"
        title="ctrl + ,"
        onClick={addQuestionAction} disabled={activeCard === '' || activeCard === 'end'}>
          문항 추가
      </button>
      <button 
        className="w-1/2 h-full py-2 
        hover:cursor-pointer 
        dark:hover:bg-dark-hover hover:bg-gray-300 
        disabled:text-gray-300 disabled:bg-none"
        title="ctrl + ."
        onClick={addPageAction} disabled={activeCard === '' || activeCard === 'end'}>
          페이지 추가
      </button>
    </footer>
  )
}

export default AddPageQuestion