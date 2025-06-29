import { FiMoreVertical } from "react-icons/fi"
import { MdOutlineArrowDropDown } from "react-icons/md"

/** 점 3개 */ 
export const MoreVerticalIcon = (props) => <FiMoreVertical className="text-[20px]" strokeWidth={2.3} {...props}/>

/** 작은 삼각형 */
export const DropdownArrowIcon = (props) => <MdOutlineArrowDropDown className="text-[22px]" {...props}/>

export const CheckIcon = () => {
  return (
    <svg
      className="w-3 h-3 text-white"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}