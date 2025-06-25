import MoreVert from "@/components/MoreVert"
import MoreButton from "./MoreButton"
import { useFormEditUiStore } from "@/stores/useFormEditUiStore"
import { useFormEditStore } from "@/stores/useFormEditStore"

const PageSummary = ({pageMark, page, pi, isFold, isActive = false, isDragging}) => {

  const setActiveCard = useFormEditUiStore(s => s.setActiveCard)
  const toggleFoldQuestion = useFormEditUiStore(s => s.toggleFoldQuestion)
  const addPage = useFormEditStore(s => s.addPage)
  const deletePage = useFormEditStore(s => s.deletePage)

  const borderCover = (isDragging, isFold, isActive) => {
    if (isDragging) return 'border-none'
    if (isFold & isActive) return 'border-2 rounded-xl border-fold-point'
    if (isFold) return 'border-2 border-transparent border-t-fold-point hover:rounded-xl hover:border-fold-point'
    if (isActive) return 'border-2 border-point rounded-xl'
    return 'border-2 border-transparent border-t-point hover:rounded-xl hover:border-point'
  }

  return (
    <div 
      className={`${borderCover(isDragging, isFold, isActive)} mt-2 p-2`}
      onClick={() => setActiveCard(`P-${pi}`)}
    >
      <h4 className={`text-sm text-center px-2.5 font-bold
        relative top-[-15px] w-fit left-1/2 -translate-x-1/2 
        bg-bright-a ${isFold ? 'text-fold-point' : 'text-point'}`}>{pageMark} 페이지</h4>
      <div className="flex">
        {page?.title ? 
        <p className="font-bold mb-1 truncate">{page.title}</p> : 
        <p className="text-[#aaa]">페이지 제목</p>}
        {isActive && 
        <div className="ml-auto">
          <MoreVert addOptionClass={'w-20'}>
            <MoreButton onClick={()=>toggleFoldQuestion(page.id)}>{isFold ? '펼치기' : '접기'}</MoreButton>
            <MoreButton onClick={()=>addPage(pi, true)}>복사</MoreButton>
            <MoreButton onClick={()=>deletePage(pi)} className="text-red-500">삭제</MoreButton>
          </MoreVert>
        </div>
        }
      </div>
    </div>
  )
}

export default PageSummary