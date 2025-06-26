import { useFormEditStore } from "@/stores/useFormEditStore"
import { useScreenStore } from "@/stores/useScreenStore"

const OptionInput = ({ option, type='datetime-local', placeholder='' }) => {
  const mode = useScreenStore(s => s.mode)
  const surveyOptions = useFormEditStore(s => s.surveyOptions)
  const updateSurveyOptions = useFormEditStore(s => s.updateSurveyOptions)
  
  const matchingOption = {
    isUseStartPeriod: 'startDate', 
    isUseEndPeriod: 'endDate',
    isUseMaximum: 'maximumCount',
  }[option]

  if(!surveyOptions[option]) return null

  const update = (e) => {
    let value = e.target.value
    if(matchingOption === 'maximumCount') value = Math.min(e.target.value, 10000)
    updateSurveyOptions({ [matchingOption] : value })
  }

  return (
    <div className="w-full h-10 rounded-xl px-2.5 py-2 dark:bg-charcoal bg-light-w mb-5">
      <input type={type}
        className={`w-full
          ${(type === 'datetime-local' && mode === 'dark') ? 'calendar-indicator-filter' : ''}
          ${type === 'number' ? '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' : ''}
        `}
        onChange={update}
        value={surveyOptions[matchingOption] || ''}
        placeholder={placeholder}
      />
    </div>
  )
  
}

export default OptionInput