import ScoreCanvas from "@/components/ScoreCanvas"

const SelectScorePreview = ({ scoreRanges }) => {
  const { min, max, minText, maxText } = scoreRanges

  return (
    <div className="w-4/5 mx-auto mt-4">
      <div className="flex justify-between text-[#99A1AF] dark:light-w">
        <p>{minText}</p>
        <p>{maxText}</p>
      </div>
      <ScoreCanvas min={min} max={max} selected={null} onSelect={() => {}} />
    </div>
  )
}

export default SelectScorePreview
