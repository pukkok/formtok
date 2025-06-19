import { manageWorkColorPick } from "@/utils/workColor"

const Light = ({ options }) => {

  const { color } = manageWorkColorPick({...options}) 

  return (
    <span style={{ backgroundColor : color }} 
    className={`mr-auto w-2.5 h-2.5 rounded-full`}/>
  )
}

export default Light