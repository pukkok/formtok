import { MANAGE_WORK_COLOR_MAP } from "@/utils/workColor"

const Light = ({ work }) => {
  const color = MANAGE_WORK_COLOR_MAP[work] || 'bg-gray-200'

  return (
    <span className={`mr-auto w-2.5 h-2.5 rounded-full ${color}`} />
  )
}

export default Light