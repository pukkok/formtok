import { useMemo } from "react"
import { CheckBoxButton } from "@/components/MultipleButtons"

const SelectMultiplePreview = ({ options = [], hasExtraOption }) => {

  const picks = useMemo(() => {
    const length = options.length
    if(length === 0) return []
    if(length <= 2) return options.map(o => o.answer) // 옵션 1~2개면 다 선택 처리

    // 옵션 3개 이상이면 2~3개 랜덤 선택
    const count = Math.min(length, Math.floor(Math.random() * 2) + 2) // 2 or 3
    const shuffled = options.map(o => o.answer).sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }, [options])

  return (
    <div>
      {options.map(opt => (
        <CheckBoxButton key={opt.id} picks={picks}>
          {opt.answer}
        </CheckBoxButton>
      ))}
      {hasExtraOption && (
        <CheckBoxButton>기타</CheckBoxButton>
      )}
    </div>
  )
}

export default SelectMultiplePreview
