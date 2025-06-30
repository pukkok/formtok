'use client'

import { useRef } from "react"
import { useFormEditStore } from "@/stores/useFormEditStore"
import { useParams, useRouter } from "next/navigation"
import MoveToLoginPageModal from "./components/MoveToLoginPageModal"
import ModalContainer from "@/components/Modal/ModalContainer"
import { useAuthStore } from "@/stores/useAuthStore"
import { useParticipateStore } from "@/stores/useParticipateStore"

const FormEditHeader = () => {
    const { id } = useParams()
    const router = useRouter()
    const moveToLoginPageModalRef = useRef(null)
    
    const userInfo = useAuthStore(s => s.userInfo)

    const title = useFormEditStore(s => s.title)
    const setTitle = useFormEditStore(s => s.setTitle)
    const saveFormAction = useFormEditStore(s => s.saveFormAction)

    const authCheckAndSaveForm = async (url) => {
      if(!userInfo) moveToLoginPageModalRef.current?.open()
      else await saveFormAction(url)
    }

    const goToPreviewPage = () => {
      const { pages, listStyle, endingMent } = useFormEditStore.getState()
      useParticipateStore.getState().setSurveyForms({pages, listStyle, endingMent})
      router.push(`/participate/${id}/preview`)
    }

    return (
      <header className={`sticky top-0 w-full flex items-center h-15 px-5 z-300
      dark:bg-dark-deep bg-bright-a
      border-b dark:border-b-dark-line-base border-b-gray-300
      `}>
          <input 
            className="w-xs text-lg mr-auto pl-2 p-1 
            overflow-hidden text-ellipsis whitespace-nowrap
            border-2 border-transparent focus:border-point rounded-xl outline-none"
            onChange={e =>setTitle(e.target.value)} placeholder="제목없는 설문지" value={title}/>
          <button 
            className="dark:bg-dark-elevated bg-gray-300 ml-2.5 px-2.5 py-1.5 font-bold rounded-md cursor-pointer"
            onClick={goToPreviewPage}>미리보기</button>
          <button 
            className="bg-point hover:bg-point-hover dark:hover:bg-dark-point-hover ml-2.5 px-2.5 py-1.5 font-bold text-light-w rounded-md cursor-pointer"
            onClick={() => authCheckAndSaveForm(id)}>저장</button>        

          <ModalContainer ref={moveToLoginPageModalRef}>
            <MoveToLoginPageModal onConfirm={() => router.push('/login')} />
          </ModalContainer>
      </header>
    )
}

export default FormEditHeader