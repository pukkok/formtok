'use client'

import { useRef } from "react"
import CardWrapper from "./components/CardWrapper"
import CreateCard from "./components/CreateCard"
import { useFormManageStore } from "@/stores/useFormManageStore"
import { CopyIcon, DeleteIcon } from "@/A-Components/Icons/Icons"
import dayjs from "dayjs"
import Light from "./components/Light"
import { useFormEditStore } from "@/stores/useFormEditStore"
import { useRouter } from "next/navigation"
import { useTokenFetch } from "@/utils/useTokenFetch"
import CreateFormModal from "@/features/form-manage/CreateFormModal"
import ModalContainer from "@/components/Modal/ModalContainer"

const TemplateBox = () => {
  const createFormModalRef = useRef(null)

  const router = useRouter()

  const searchedForms = useFormManageStore(s => s.searchedForms)
  const getMyFormListAction = useFormManageStore(s => s.getMyFormListAction)
  const copyFormAction = useFormManageStore(s => s.copyFormAction)
  const deleteFormAction = useFormManageStore(s => s.deleteFormAction)
  const settingForm = useFormEditStore(s => s.settingForm)
  const setIsLoaded = useFormEditStore(s => s.setIsLoaded)
  useTokenFetch(getMyFormListAction)

  const goToEdit = ({title, url, pages, endingMent, listStyle, options}) => {
    settingForm({title, pages, endingMent, listStyle, options})
    setIsLoaded(true)
    router.push(`/my-form/edit/${url}`)
  }

  return (
    <div className="mt-7.5 grid grid-cols-[repeat(auto-fit,_minmax(260px,_280px))] flex-wrap gap-y-4 gap-x-3">
      <CreateCard onClick={() => createFormModalRef.current?.open()}/>
      <ModalContainer ref={createFormModalRef}>
        <CreateFormModal />
      </ModalContainer>

      {searchedForms.length > 0 && 
        searchedForms.map(form => {
          const { title, url, pages, endingMent, listStyle, options, createdAt, lastModifiedAt} = form

          return (
            <CardWrapper key={url}>
              <div className={`w-full h-full p-5 flex flex-col justify-start
              dark:bg-dark-surface dark:hover:bg-dark-hover 
              bg-bright-a hover:bg-bright-b
              `}
              onClick={() => goToEdit({title, url, pages, endingMent, listStyle, options})}
              >
                <div className="flex justify-end items-start mb-2.5 gap-2.5">
                  <Light options={options}/>

                  <button className="hover:text-point cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      copyFormAction(url)
                    }}  
                  >
                    <CopyIcon />
                  </button>
                  <button className="hover:text-point cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteFormAction(url)
                    }}  
                  >
                    <DeleteIcon />
                  </button>
                </div>

                <h4 className="text-lg mb-2.5 line-clamp-2">{title || '제목없는 설문지'}</h4>

                <div className="mt-auto text-sm">
                  <p className="pb-1">생성일 | {dayjs(createdAt).format('YYYY-MM-DD')}</p>
                  <p>마지막 수정일 | {dayjs(lastModifiedAt).format('YYYY-MM-DD')}</p>
                </div>
              </div>
            </CardWrapper>
          )
        })
      }

    </div>
  )
}

export default TemplateBox