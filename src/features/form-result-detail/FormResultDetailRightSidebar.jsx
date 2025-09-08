import { useFormManageStore } from "@/stores/useFormManageStore"
import dayjs from "dayjs"
import SearchForm from "@/components/SearchForm"
import { filterResultForms } from "@/utils/resultFilter"

const FormResultDetailRightSidebar = () => {

  const allForms = useFormManageStore(s => s.allForms)
  const resultActiveTab = useFormManageStore(s => s.resultActiveTab)
  const searchedForms = useFormManageStore(s => s.searchedForms)
  const setSearchedForms = useFormManageStore(s => s.setSearchedForms)

  const getResultAnswersAction = useFormManageStore(s => s.getResultAnswersAction)

  const search = (word) => {
    setSearchedForms(filterResultForms(allForms, 'all', word))
  }

  const resultOpen = async (title, pages, url) => {
    await getResultAnswersAction(url, title, pages)
  }

  return (
    <div className="sticky top-0 w-sm h-screen flex flex-col py-2
  bg-[#F8F9FB] dark:bg-[#1E1F22] border-l border-l-gray-300 dark:border-l-dark-line-light">
      <div className="px-4 pb-3">
        <SearchForm width="w-full" search={search}/>
      </div>

      <div className="h-[calc(100vh-80px)] overflow-scroll scroll-hidden">
        <div className="px-4">
      {searchedForms.length > 0 ? (
        searchedForms.map(form => {
          const { title, url, options, numberOfResponses, pages } = form
          const { isOpen, isEnd, isPublic, isNeedLogin, startDate, endDate, maximumCount } = options
          
          const start = startDate ? dayjs(startDate).format('YYYY-MM-DD') : ''
          const end = endDate ? dayjs(endDate).format('YYYY-MM-DD') : ''

          return (
            <div
              key={url}
              className={`
                ${resultActiveTab === url
                ? 'bg-point text-white'
                : 'bg-[#FDFDFE] hover:bg-gray-100 dark:bg-[#2A2B2F] dark:hover:bg-[#35363B]'}
                px-4 py-4 mt-3 rounded-lg shadow-sm cursor-pointer space-y-0.5 text-sm
                 transition`}
              onClick={() => resultOpen(title, pages, url)}
            >
              <p className="text-left mb-5 text-base font-bold">{title}</p>
              <p className="flex justify-between">
                <span>로그인 : {isNeedLogin ? '필요' : '-'}</span>
                <span>응답 : {numberOfResponses.length || 0} | {maximumCount ? `최대 ${maximumCount}` : '제한 없음' }</span>
              </p>
              <p className="flex justify-between">공개 : {isPublic ? '전체' : '-'}
                <span>상태 : {isEnd ? '종료' : isOpen ? '진행 중' : '-'}</span>
              </p>
              <p className="text-left">기간 : {start ? start : '-'} {end ? `~ ${end}` : start ? '~' : ''}</p>     
            </div>
          )
        })
      ) : (
        <div className="px-4 py-8 text-center text-gray-400 dark:text-gray-500">
          진행 중이거나, 종료된 설문이 없습니다.
        </div>
      )}
      </div>
      </div>
    </div>
  )
}

export default FormResultDetailRightSidebar