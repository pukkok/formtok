import { useState, useMemo } from "react"
import dayjs from "dayjs"

const DateBox = ({ dateType, values = [], qid }) => {
  const [sortBy, setSortBy] = useState("start") // 'start' | 'end'

  const formatDate = (start, end) => {
    if (!start) return ""

    if (dateType === "날짜")
      return `${dayjs(start).format("YYYY-MM-DD")}${end ? ` ~ ${dayjs(end).format("YYYY-MM-DD")}` : ""}`

    if (dateType === "시간")
      return `${start}${end ? ` ~ ${end}` : ""}`

    if (dateType === "날짜 + 시간")
      return `${dayjs(start).format("YYYY-MM-DD HH:mm")}${end ? ` ~ ${dayjs(end).format("YYYY-MM-DD HH:mm")}` : ""}`

    return ""
  }

  const sortedValues = useMemo(() => {
    if (!values.length) return []

    return [...values].sort((a, b) => {
      const aDate = a?.[sortBy]
      const bDate = b?.[sortBy]

      if (!aDate && !bDate) return 0
      if (!aDate) return 1
      if (!bDate) return -1

      return dayjs(aDate).isBefore(dayjs(bDate)) ? -1 : 1
    })
  }, [values, sortBy])

  if (values.length === 0) {
    return (
      <div className="bg-bright-c dark:bg-dark-hover rounded-lg p-2 text-sm text-gray-400">
        응답이 없습니다.
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-end gap-2 mb-2 text-sm text-gray-600 dark:text-gray-300">
        <p>정렬 |</p>
        <button
          className={`hover:underline ${sortBy === "start" ? "font-semibold" : ""}`}
          onClick={() => setSortBy("start")}
        >
          시작 기준
        </button>
        <button
          className={`hover:underline ${sortBy === "end" ? "font-semibold" : ""}`}
          onClick={() => setSortBy("end")}
        >
          종료 기준
        </button>
      </div>

      <div className="bg-bright-c dark:bg-dark-hover rounded-lg p-2 space-y-1 text-sm">
        {sortedValues.map(({ start, end }, idx) => (
          <div className="px-2 py-1 flex gap-2" key={`${qid}-${idx}`}>
            <span className="shrink-0 text-gray-600 dark:text-gray-400">참여 {idx + 1} |</span>
            <span className="break-words">{formatDate(start, end)}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default DateBox
