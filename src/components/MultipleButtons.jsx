import { CheckIcon } from "@/components/icons/CommonIcons"

const RadioButton = ({ children, pick, onClick }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none my-4" onClick={onClick}>
      <span
        className={`
          w-5 h-5 rounded-full border-2
          flex items-center justify-center
          transition-colors duration-150
          ${children === pick ? 'border-point' : 'border-gray-400'}
        `}
      >
        {children === pick && (
          <span className="w-3 h-3 bg-point rounded-full" />
        )}
      </span>
      <span className="text-base text-gray-800 dark:text-gray-200">{children}</span>
    </label>
  )
}

const CheckBoxButton = ({ children, picks = [], onClick }) => {
  const isChecked = picks.includes(children)

  return (
    <label
      onClick={onClick}
      className="flex items-center gap-3 cursor-pointer text-base my-4 select-none"
    >
      <CustomCheckBox isChecked={isChecked}/>
      <span className="text-gray-800 dark:text-gray-200">{children}</span>
    </label>
  )
}

const CustomCheckBox = ({isChecked=false}) => {
  return (
    <div
      className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center transition-all ${
        isChecked ? 'bg-point border-point' : 'border-gray-400'
      }`}
    >
      {isChecked && <CheckIcon />}
    </div>
  )
}

export {RadioButton, CheckBoxButton, CustomCheckBox}