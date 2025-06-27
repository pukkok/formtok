'use client'

import ModalCancelButton from "@/components/Modal/ModalCancelButton.style"
import ModalConfirmButton from "@/components/Modal/ModalConfirmButton.style"
import { useFormEditStore } from "@/stores/useFormEditStore"
import { randomUrl } from "@/utils/generateKey"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const CreateFormModal = ({ onClose }) => {
  const router = useRouter()

  const title = useFormEditStore(s => s.title)
  const setTitle = useFormEditStore(s => s.setTitle)

  const setIsLoaded = useFormEditStore(s => s.setIsLoaded)
  const setUrl = useFormEditStore(s => s.setUrl)
  const createPage = useFormEditStore(s => s.createPage)
  const createSurveyOptions = useFormEditStore(s => s.createSurveyOptions)
  const createEndingMent = useFormEditStore(s => s.createEndingMent)

  const create = (e) => {
    e.preventDefault()

    const url = randomUrl()
    setUrl(url)
    const pages = createPage()
    const surveyOptions = createSurveyOptions()
    const listStyle = null
    const endingMent = createEndingMent()
    useFormEditStore.getState().settingForm({title, pages, surveyOptions, listStyle, endingMent})

    setIsLoaded(true) // INFO: 새로 만들었기 때문에 불러온 것으로 처리

    router.push(`/my-form/edit/${url}`)
  }

  useEffect(() => {
    setTitle('')
  }, [])
  
  return (
    <form 
      onSubmit={create}
      className="p-5 min-w-[500px] rounded-xl border-2 border-point dark:bg-dark-base bg-light-w dark:text-bright-c">
      <header className="w-full border-b border-b-gray-300 dark:border-b-dark-line-hover pb-2.5">
        <input 
          className="text-lg w-full"
          placeholder="설문지 제목" 
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          autoFocus
          />
      </header>

      <div className="py-2.5 min-h-[200px]">
        <h4 className="text-lg font-bold mb-2">사용 안내</h4>
        <p className="mb-1 text-[15px]">* 바로 제목을 입력하지 않아도 됩니다.</p>
        <p className="mb-1 text-[15px]">* 설문지 제목은 이후 상단 탭에서 변경이 가능합니다.</p>
        <p className="mb-1 text-[15px]">* 설문지 제작 후 상단의 저장 버튼을 이용해 주세요.</p>
        <p className="mb-1 text-[15px]">* 제목은 설문지 배포시에 사용됩니다.</p>
      </div>

      <footer className="border-t border-t-gray-300 dark:border-t-dark-line-hover w-full pt-2.5 flex justify-end gap-3">
        <ModalConfirmButton>생성하기</ModalConfirmButton>
        <ModalCancelButton onClick={onClose}>닫기</ModalCancelButton>
      </footer>
    </form>
  )
}

export default CreateFormModal