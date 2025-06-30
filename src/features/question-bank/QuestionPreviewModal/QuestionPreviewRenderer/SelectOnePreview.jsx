import { RadioButton } from "@/components/MultipleButtons"

const SelectOnePreview = ({ options = [], hasExtraOption }) => {
  return (
    <div>
      {options.map((opt, idx) => (
        <RadioButton key={opt.id} pick={idx === 0 && opt.answer}>
          {opt.answer}
        </RadioButton>
      ))}
      {hasExtraOption && (
        <RadioButton pick="기타">기타</RadioButton>
      )}
    </div>
  )
}

export default SelectOnePreview
