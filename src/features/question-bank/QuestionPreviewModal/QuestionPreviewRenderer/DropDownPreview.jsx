import Dropdown from "@/components/Dropdown"

const DropDownPreview = ({ options = [] }) => {
  return (
    <div className="w-2xs">
      <Dropdown initialItem="옵션을 선택해주세요">
        <button className="w-full text-left px-2 py-2 rounded-md">옵션을 선택해주세요</button>
        {options.map(option => (
          option.answer && (
            <button
              key={option.id}
              className="w-full text-left px-2 py-2 rounded-md"
            >
              {option.answer}
            </button>
          )
        ))}
      </Dropdown>
    </div>
  )
}

export default DropDownPreview
