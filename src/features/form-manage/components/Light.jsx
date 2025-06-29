import { manageWorkColorPick } from "@/utils/workColor"

const Light = ({ options }) => {
  const { color } = manageWorkColorPick({ ...options })

  return (
    <span className={`mr-auto w-2.5 h-2.5 rounded-full ${color}`}/>
  )
}

export default Light