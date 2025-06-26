import { useEffect, useState } from "react"
import CustomEditor from "@/components/CustomEditor"
import { useFormEditStore } from "@/stores/useFormEditStore"
import { useFormEditUiStore } from "@/stores/useFormEditUiStore"

const PageCard = ({pi, ref}) => {
    const pages = useFormEditStore(s => s.pages)
    const updatePage = useFormEditStore(s => s.updatePage)

    const activeCard = useFormEditUiStore(s => s.activeCard)
    const setActiveCard = useFormEditUiStore(s => s.setActiveCard)

    const [pageCnt, setPageCnt] = useState('1/1')
    useEffect(() => {
      setPageCnt(`${pi+1}/${pages.length}`)
    }, [pages, pi])
    
    return (
      <div 
        ref={ref}
        onClick={()=>setActiveCard(`P-${pi}`)}
        className={`
          border-2 border-lgiht-w 
          dark:bg-dark-surface bg-bright-a rounded-xl min-h-45 mb-4 text-black
          ${activeCard === `P-${pi}` ? 'dark:border-point border-point-hover' : 'dark:border-dark-line-base border-light-w'}
        `}
        >
          <h4 className="px-5 py-2.5 rounded-t-lg
          dark:bg-dark-elevated bg-light-purple
          text-light-w w-full font-bold mb-2.5">{pageCnt} 페이지</h4>
          <div className="px-5 py-2.5">
            <input 
            className="pl-0.5 w-full pb-1 text-2xl dark:text-bright-a
            border-b border-b-transparent hover:border-b-silver
          focus:border-b-point-hover focus:border-b-2" 
            placeholder="페이지 제목" 
            onChange={(e)=>updatePage(pi, {title: e.target.value})} value={pages[pi].title}/>
            
            <CustomEditor
              content={pages[pi].description}
              placeholder={'페이지 설명'}
              onChange={(html) => updatePage(pi, {description : html})}
            />
          </div>
      </div>
    )
}

export default PageCard