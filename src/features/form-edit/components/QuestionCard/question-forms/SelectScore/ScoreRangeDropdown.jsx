// components/ScoreRangeDropdown.jsx
import DropDown from "@/components/Dropdown"; // DropDown 컴포넌트 경로에 맞게 조정

const ScoreRangeDropdown = ({ label, initialValue, options, onSelectRange, className = '' }) => {
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <p className="shrink-0">{label} :</p>
      <DropDown initialItem={initialValue}>
        {options.map(n => (
          <button
            key={n}
            className="w-full text-left py-1 cursor-pointer"
            onClick={() => onSelectRange(n)}
          >
            {n}
          </button>
        ))}
      </DropDown>
    </div>
  )
}

export default ScoreRangeDropdown