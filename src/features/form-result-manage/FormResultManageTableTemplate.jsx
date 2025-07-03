import { useFormManageStore } from "@/stores/useFormManageStore"
import { useTokenFetch } from "@/utils/useTokenFetch"
import dayjs from "dayjs"
import { useRouter } from "next/navigation"

const TABLE_HEADER = [
  '설문지', '응답 수 / 제한', '로그인 필수', '시작일', '종료일', '공개 여부', '상태'
]

const FormResultManageTableTemplate = () => {
  const router = useRouter()

  const searchedForms = useFormManageStore(s => s.searchedForms)
  const getAllMyFormsAction = useFormManageStore(s => s.getAllMyFormsAction)
  useTokenFetch(getAllMyFormsAction, { isOpen: true })

  const getResultAnswersAction = useFormManageStore(s => s.getResultAnswersAction)

  const resultOpen = async (title, pages, url) => {
    await getResultAnswersAction(url, title, pages)
    router.push(`/my-form/result/detail`)
  }

  return (
    <div className="w-full mt-7.5">
      {/* 헤더 */}
      <div className="grid [grid-template-columns:minmax(140px,1.5fr)_repeat(6,1fr)] gap-2 px-4 py-2 text-sm font-semibold text-center">
        {TABLE_HEADER.map((header, idx) => (
          <p key={header} className={`
            ${idx === 0 ? 'text-left' : ''}
            text-[17px]`}>
            {header}
          </p>
        ))}
      </div>

      {/* 데이터 */}
      {searchedForms.length > 0 ? (
        searchedForms.map(form => {
          const { title, url, options, numberOfResponses, pages } = form
          const { isOpen, isEnd, isPublic, isNeedLogin, startDate, endDate, maximumCount } = options
          
          const start = startDate ? dayjs(startDate).format('YYYY-MM-DD') : '무제한'
          const end = endDate ? dayjs(endDate).format('YYYY-MM-DD') : '-'

          return (
            <div
              key={url}
              className="grid [grid-template-columns:minmax(160px,1.5fr)_repeat(6,1fr)] gap-2 px-4 py-4 mt-3 rounded-lg shadow-sm cursor-pointer text-center
                        bg-white hover:bg-gray-50 dark:bg-dark-base dark:hover:bg-dark-hover transition"
              onClick={() => resultOpen(title, pages, url)}
            >
              <p className="text-left">{title}</p>
              <p className={`${numberOfResponses.length === maximumCount ? 'text-work-red' : ''} flex justify-center`}>
                <span className="text-right min-w-[3rem]">{numberOfResponses.length || 0}</span>
                <span className="px-1"> / </span>
                <span className="text-right min-w-[3rem]">{maximumCount || '-'}</span>
              </p>
              <p>{isNeedLogin ? '필요' : '-'}</p>
              <p>{start}</p>
              <p>{end}</p>
              <p>{isPublic ? '전체' : '-'}</p>
              <p className={isEnd ? 'text-work-red' : ''}>{isEnd ? '종료' : isOpen ? '진행 중' : '-'}</p>
            </div>
          )
        })
      ) : (
        <div className="px-4 py-8 text-center text-gray-400 dark:text-gray-500">
          진행 중이거나, 종료된 설문이 없습니다.
        </div>
      )}
    </div>
  )
}

export default FormResultManageTableTemplate
