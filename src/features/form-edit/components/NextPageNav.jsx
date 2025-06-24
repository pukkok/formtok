import Dropdown from "@/components/Dropdown"
import { useFormEditStore } from "@/stores/useFormEditStore"

const NextPageNav = ({ pages, pi }) => {

  const updatePage = useFormEditStore(s => s.updatePage)

  const displayText = (title) => {
    const unTitled = '제목 없음'
    let result = ''
    
    if(title) result = title 
    if(title.length > 8) result = title.slice(0, 8) + '...' 
    else result = unTitled
    
    return result
  }

  const nextPageText = (page) => {
    if(page.next === 'end') return '설문지 제출'
    if(page.next){
      const text = displayText(pages[page.next].title)
      return `${page.next+1}P. (${text})로 이동`
    } 
  }

  return (
    <nav className="flex items-center gap-2 ml-2 mb-10">
      <p className="font-bold">답변 후</p>
      <div className="min-w-xs shrink-0">
        <Dropdown initialItem={nextPageText(pages[pi]) || '다음페이지로 이동'}>
          <button 
            className="w-full text-left py-2"
            onClick={()=>{updatePage(pi, {next : null})}}
          >
            다음페이지로 이동
          </button>

          {pages.filter((_, cnt) => cnt>pi).map((page, cnt) => {
            const { title, id } = page
            
            return <button
              className="w-full text-left py-2" 
              key={id} 
              onClick={()=>updatePage(pi, {next: pi + cnt+1})}>
                {pi+1 + cnt+1}P. ({displayText(title)})로 이동
              </button>
            
          })}

          <button 
            className="w-full text-left py-2"
            onClick={()=>updatePage(pi, {next: 'end'})}
          >
            설문지 제출
          </button>
        </Dropdown>
      </div>
    </nav>
  )
}

export default NextPageNav