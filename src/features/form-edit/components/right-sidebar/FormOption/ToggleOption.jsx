import ToggleButton from "@/components/ToggleButton"
import HelpScript from "./HelpScript"
import { useFormEditStore } from "@/stores/useFormEditStore"

const ToggleOption = ({label, option, useUp, script}) => {

  const surveyOptions = useFormEditStore(s => s.surveyOptions)
  const updateSurveyOptions = useFormEditStore(s => s.updateSurveyOptions)

  const handleToggle = () => {
    if (!option) return

    if (option === 'isUseStartPeriod' && surveyOptions.isUseStartPeriod) {
      updateSurveyOptions({
        isUseStartPeriod: false,
        isUseEndPeriod: false,
      })
      return
    }

    if (option === 'isUseEndPeriod' && !surveyOptions.isUseEndPeriod) {
      updateSurveyOptions({
        isUseStartPeriod: true,
        isUseEndPeriod: true,
      })
      return
    }

    updateSurveyOptions({ [option]: !surveyOptions[option] })
  }

  return (
    <div className="flex items-center relative mt-2 mb-1 text-gray-600">
      <p className="cursor-help group">
        {label}
      
        <HelpScript useUp={useUp}>
          {script}
        </HelpScript>
      </p>
      <div className="ml-auto">
        <ToggleButton 
          onClick={handleToggle}
          isOn={surveyOptions[option]}
        />
      </div>
    </div>
  )
}

export default ToggleOption