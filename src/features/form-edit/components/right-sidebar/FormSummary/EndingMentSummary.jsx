import { useFormEditStore } from "@/stores/useFormEditStore"
import { useFormEditUiStore } from "@/stores/useFormEditUiStore"

const EndingMentSummary = ({ isActive }) => {

  const endingMent = useFormEditStore(s => s.endingMent)
  const setActiveCard = useFormEditUiStore(s => s.setActiveCard)

  return (
    <div 
      className={`mt-3 p-2 rounded-xl border-2 ${isActive ? 'border-point' : 'dark:border-dark-elevated border-gray-300'}`}
      onClick={()=>setActiveCard('end')}
    >
      <h4 className={`text-sm text-center px-2.5 font-bold
        relative top-[-18px] w-fit left-1/2 -translate-x-1/2
        dark:bg-dark-surface bg-bright-a ${isActive ? 'text-point' : 'text-gray-300'}`}
      >엔딩</h4>
      
      {endingMent?.title ? 
      <p className="font-bold mb-1 truncate">{endingMent.title}</p> : 
      <p className="text-[#aaa]">응답해 주셔서 감사합니다.</p>}
    </div>
  )
}

export default EndingMentSummary