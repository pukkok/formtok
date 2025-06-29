import Dropdown from "@/components/Dropdown"
import { useFormEditStore } from "@/stores/useFormEditStore"

const NextPageNav = ({ pages, pi }) => {

  const updatePage = useFormEditStore(s => s.updatePage)

  const displayText = (title) => {
    const unTitled = '제목 없음'

    if (!title) return unTitled
    if (title.length > 10) return title.slice(0, 10) + '...'
    return title
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
      <div className="min-w-2xs w-40 shrink-0">
        <Dropdown initialItem={nextPageText(pages[pi]) || '다음페이지로 이동'}>
          <button 
            className="w-full text-left py-2"
            onClick={()=>{updatePage(pi, {next : null})}}
          >
            다음페이지로 이동
          </button>

          {pages.filter((_, cnt) => cnt>pi).map((page, cnt) => (
            <button
              className="w-full text-left py-2" 
              key={page.id} 
              onClick={()=>updatePage(pi, {next: pi + cnt+1})}
            >
              {pi+1 + cnt+1}P. ({displayText(page.title)})로 이동
            </button>
            )
          )}

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