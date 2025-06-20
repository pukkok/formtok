import { useEffect, useState } from "react"
import CustomEditor from "@/components/CustomEditor"
import { useFormEditStore } from "@/stores/useFormEditStore"
import { useFormEditUiStore } from "@/stores/useFormEditUiStore"

const PageCard = ({pi}) => {
    const pages = useFormEditStore(s => s.pages)
    const setPages = useFormEditStore(s => s.setPages)

    const activeCard = useFormEditUiStore(s => s.activeCard)
    const setActiveCard = useFormEditUiStore(s => s.setActiveCard)

    const [pageCnt, setPageCnt] = useState('1/1')
    useEffect(() => {
      setPageCnt(`${pi+1}/${pages.length}`)
    }, [pages, pi])

    const changePageTitle = (e, pi) => {
      const modifiedPages = pages.map((page, idx) => {
        if(idx === pi) {
          page = {...page, title: e.target.value}
        }
        return page
      })
      setPages(modifiedPages)
    }

    const changePageDescription = (html) => {
      const modifiedPages = pages.map((page, idx) => {
        if(idx === pi) {
          page = {...page, description: html}
        }
        return page
      })
      setPages(modifiedPages)
    }

    useEffect(() => {
      console.log(pages)
    }, [pages])
    
    return (
      <div 
        onClick={()=>setActiveCard(`P-${pi}`)}
        className={`
          border-2 border-lgiht-w bg-bright-a rounded-xl min-h-45 mb-4 text-black
          ${activeCard === `P-${pi}` ? 'border-point-hover' : 'border-light-w'}
        `}
        >
          <h4 className="px-5 py-2.5 rounded-t-lg
          bg-light-purple text-light-w w-full font-bold mb-2.5">{pageCnt} 페이지</h4>
          <div className="px-5 py-2.5">
            <input 
            className="pl-0.5 w-full pb-1 text-2xl
            border-b border-b-transparent hover:border-b-silver 
          focus:border-b-point-hover focus:border-b-2" 
            placeholder="페이지 제목" 
            onChange={e=>changePageTitle(e, pi)} value={pages[pi].title}/>
            
            <CustomEditor
              content={pages[pi].description}
              placeholder={'페이지 설명'}
              onChange={changePageDescription}
            />
          </div>
      </div>
    )
}

export default PageCard