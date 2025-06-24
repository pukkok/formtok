import { useEffect, useState } from "react"
import { useFormEditStore } from "@/stores/useFormEditStore"
import ScoreCanvas from "./ScoreCanvas"
import ScoreTextInput from "./ScoreTextInput"
import ScoreRangeDropdown from "./ScoreRangeDropdown"

const SelectScore = ({ pages, pi, qi }) => {
  const range = pages[pi].questions[qi].scoreRanges
  const { min, max, minText, maxText } = range

  const updateQuestion = useFormEditStore(s => s.updateQuestion)
  const [selected, setSelected] = useState(null)

  const handleSelect = (val) => {
    setSelected(val)
    // 선택한 값을 저장하고 싶으면 아래 주석 해제
    // updateQuestion(pi, qi, { selectedScore: val })
  }

  useEffect(() => {
    setSelected(1)
  }, [min, max])

  return (
    <div className="w-4/5 mx-auto mt-4">
      <div className="mb-5 flex justify-between h-7">
        <ScoreTextInput 
          className="float-left"
          placeholder="왼쪽값 입력"
          onChange={e => updateQuestion(pi, qi, { scoreRanges: {...range, minText: e.target.value}})}
          value={minText}
        />
        <ScoreTextInput 
          className="float-right text-right"
          placeholder="오른쪽값 입력"
          onChange={e => updateQuestion(pi, qi, { scoreRanges: {...range, maxText: e.target.value}})}
          value={maxText}
        />
      </div>

      <ScoreCanvas min={min} max={max} selected={selected} onSelect={handleSelect} />

      <div className="mt-8 flex justify-center items-center gap-5">
        <ScoreRangeDropdown 
          label="최소"
          initialValue={min}
          options={[0, 1]}
          onSelectRange={(n) => updateQuestion(pi, qi, { scoreRanges: { ...range, min: n } })}
        />
        <span>~</span>
        <ScoreRangeDropdown
          label="최대"
          initialValue={max}
          options={Array.from({ length: 9 }, (_, idx) => idx + 2)} // 2부터 10까지
          onSelectRange={(n) => updateQuestion(pi, qi, { scoreRanges: { ...range, max: n } })}
        />
      </div>
    </div>
  )
}

export default SelectScore
